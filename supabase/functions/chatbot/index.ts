// B4: Edge Function "chatbot"
// Kontrak (PANDUAN_PENGERJAAN.md): { pertanyaan } -> { jawaban, rekomendasi: [{kode, nama, link}] }
//
// Alur sesuai PRD §6.2:
// 1. Scope check -> kalau di luar domain, balas penolakan sopan, SELESAI (tidak panggil DB/LLM).
// 2. Cari produk yang disebut di pertanyaan.
// 3. Kalau TERSEDIA -> jawab tersedia + link produk.
// 4. Kalau TERJUAL -> jalankan smart recommender, tawarkan alternatif.
// 5. Kalau tidak ditemukan produknya -> jawab informatif, bukan karangan (RB-13 no hallucination).

import { createClient } from 'jsr:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'
import {
  findMentionedProduct,
  findRecommendations,
  isInScope,
  OUT_OF_SCOPE_REPLY,
  toRecommendationLinks,
  type Product,
} from './logic.ts'

const MAX_QUESTION_LENGTH = 500 // asumsi FSD: batas panjang pesan chatbot

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json().catch(() => null)
    const pertanyaan = body?.pertanyaan

    if (typeof pertanyaan !== 'string' || pertanyaan.trim().length === 0) {
      return jsonResponse({ error: 'PERTANYAAN_REQUIRED' }, 400)
    }

    if (pertanyaan.length > MAX_QUESTION_LENGTH) {
      return jsonResponse({
        jawaban: `Pertanyaan terlalu panjang (maksimal ${MAX_QUESTION_LENGTH} karakter). Coba persingkat ya.`,
        rekomendasi: [],
      }, 200)
    }

    // RB-15: chatbot tidak membuka instruksi sistem / menuruti upaya mengubah perilakunya.
    // isInScope() sudah menangani ini di layer keyword (lihat logic.ts OUT_OF_SCOPE_OVERRIDE).
    if (!isInScope(pertanyaan)) {
      await logChat(req, pertanyaan, OUT_OF_SCOPE_REPLY, false)
      return jsonResponse({ jawaban: OUT_OF_SCOPE_REPLY, rekomendasi: [] }, 200)
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const { data: catalog, error } = await supabase
      .from('products')
      .select('id, kode, nama, kategori, warna, pola, asal, harga, status, deskripsi, image_url')

    if (error) {
      console.error('Gagal query produk:', error)
      return jsonResponse({
        jawaban: 'Maaf, terjadi kendala saat mengambil data katalog. Coba lagi sebentar lagi.',
        rekomendasi: [],
      }, 200)
    }

    const products = (catalog ?? []) as Product[]
    const target = findMentionedProduct(pertanyaan, products)

    if (!target) {
      // RB-13: tidak boleh mengarang. Kalau produk tidak dikenali, bilang terus terang.
      const jawaban = 'Maaf, saya tidak menemukan motif tersebut di katalog kami. ' +
        'Coba sebutkan nama motif atau kategorinya (misal: kawung, parang, sogan).'
      await logChat(req, pertanyaan, jawaban, true)
      return jsonResponse({ jawaban, rekomendasi: [] }, 200)
    }

    if (target.status === 'TERSEDIA') {
      const jawaban = `${target.nama} saat ini berstatus Tersedia, harga Rp${target.harga.toLocaleString('id-ID')}. ` +
        `Lihat detailnya di /produk/${target.kode}, atau hubungi Admin via WhatsApp untuk pemesanan.`
      await logChat(req, pertanyaan, jawaban, true)
      return jsonResponse({
        jawaban,
        rekomendasi: toRecommendationLinks([target]),
      }, 200)
    }

    // target.status === 'TERJUAL' -> smart recommender (FR-05)
    const recommendations = findRecommendations(target, products)

    const jawaban = recommendations.length > 0
      ? `Mohon maaf, ${target.nama} sudah terjual karena produk kami eksklusif (1 motif = 1 produk). ` +
        `Berikut motif serupa yang masih Tersedia, mungkin Anda tertarik:`
      : `Mohon maaf, ${target.nama} sudah terjual dan saat ini belum ada motif serupa yang Tersedia. ` +
        `Silakan cek kembali katalog kami secara berkala, ya.`

    await logChat(req, pertanyaan, jawaban, true)

    return jsonResponse({
      jawaban,
      rekomendasi: toRecommendationLinks(recommendations),
    }, 200)
  } catch (err) {
    console.error('chatbot error:', err)
    return jsonResponse({
      jawaban: 'Maaf, terjadi kendala teknis. Silakan coba lagi.',
      rekomendasi: [],
    }, 200)
  }
})

// Logging opsional buat analisis (PRD §9 masih "open question" soal retensi riwayat).
// Dibikin best-effort & non-blocking supaya gagal log tidak pernah menggagalkan jawaban chatbot.
// Kalau tim memutuskan TIDAK perlu retensi riwayat, cukup hapus pemanggilan logChat() di atas
// dan tabel chat_logs tidak perlu dibuat sama sekali.
async function logChat(_req: Request, _pertanyaan: string, _jawaban: string, _inScope: boolean) {
  // Sengaja no-op dulu sampai tim konfirmasi "Open Questions" PRD §9 soal retensi riwayat chatbot.
  // Kalau nanti diputuskan perlu, tinggal isi insert ke tabel chat_logs di sini.
  return
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
