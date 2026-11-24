// B3: Edge Function "ai-describe"
// Kontrak (lihat PANDUAN_PENGERJAAN.md): foto produk -> { deskripsi, motif, warna, pola, keyakinan }
//
// Vendor AI Vision belum difiksin tim (lihat project-context.md §Technology Stack:
// "Google Cloud Vision / OpenAI Vision — konfirmasi sebelum implementasi").
// Function ini dibikin dengan pola adapter supaya gampang ganti vendor tanpa
// ubah kontrak di sisi frontend. Default: pakai Gemini (GOOGLE_AI_API_KEY) karena
// free tier paling gampang buat kebutuhan tugas kuliah.
//
// FR-01 AC: timeout AI <=10 detik -> kalau lewat/gagal, fallback ke deskripsi manual
// (frontend yang handle UI fallback; function ini WAJIB tetap balikin response yang
// jelas statusnya, bukan hang atau 500 polos).

import { corsHeaders } from '../_shared/cors.ts'

const TIMEOUT_MS = 10_000
const CONFIDENCE_THRESHOLD = 0.6

interface DescribeResult {
  deskripsi: string
  motif: string
  warna: string[]
  pola: string
  keyakinan: number
  perlu_ditinjau: boolean
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Hanya admin (sudah login) yang boleh panggil ini — verifikasi lewat Authorization
    // header yang diteruskan Supabase client dari sesi admin.
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return jsonResponse({ error: 'UNAUTHORIZED' }, 401)
    }

    const formData = await req.formData()
    const file = formData.get('foto')

    if (!(file instanceof File)) {
      return jsonResponse({ error: 'FOTO_REQUIRED', message: 'Field "foto" wajib berupa file gambar.' }, 400)
    }

    if (!file.type.startsWith('image/')) {
      return jsonResponse({ error: 'INVALID_FILE_TYPE', message: 'File harus berupa gambar.' }, 400)
    }

    const maxBytes = 5 * 1024 * 1024
    if (file.size > maxBytes) {
      return jsonResponse({ error: 'FILE_TOO_LARGE', message: 'Ukuran foto maksimal 5MB.' }, 400)
    }

    const result = await analyzeWithTimeout(file)

    return jsonResponse(result, 200)
  } catch (err) {
    console.error('ai-describe error:', err)

    if (err instanceof Error && err.message === 'AI_TIMEOUT') {
      // FR-01 fallback: tetap balas 200 dengan flag fallback, bukan error keras,
      // biar frontend bisa langsung tampilkan form deskripsi manual.
      return jsonResponse({
        fallback: true,
        reason: 'TIMEOUT',
        message: 'Deteksi AI melebihi batas waktu. Silakan isi deskripsi secara manual.',
      }, 200)
    }

    return jsonResponse({
      fallback: true,
      reason: 'AI_ERROR',
      message: 'Deteksi AI gagal. Silakan isi deskripsi secara manual.',
    }, 200)
  }
})

async function analyzeWithTimeout(file: File): Promise<DescribeResult> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const result = await callVisionProvider(file, controller.signal)
    return result
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error('AI_TIMEOUT')
    }
    throw err
  } finally {
    clearTimeout(timeout)
  }
}

// --- Adapter vendor AI Vision ---------------------------------------------
// Ganti isi fungsi ini kalau tim pindah vendor (OpenAI Vision / Google Cloud Vision),
// kontrak DescribeResult di atas jangan diubah supaya frontend tidak perlu tahu.
async function callVisionProvider(file: File, signal: AbortSignal): Promise<DescribeResult> {
  const apiKey = Deno.env.get('GOOGLE_AI_API_KEY')

  if (!apiKey) {
    throw new Error('AI_VISION_API_KEY_NOT_CONFIGURED')
  }

  const bytes = new Uint8Array(await file.arrayBuffer())
  const base64 = base64Encode(bytes)

  const prompt = `Kamu adalah pakar motif batik Indonesia. Amati foto ini dan balas HANYA dengan JSON
(tanpa markdown, tanpa penjelasan tambahan) dengan struktur persis:
{
  "motif": "<nama kategori motif: parang | kawung | mega-mendung | truntum | sogan | kontemporer>",
  "warna": ["<warna dominan 1>", "<warna dominan 2>"],
  "pola": "<geometris | organik | abstrak>",
  "deskripsi": "<2-3 kalimat deskripsi produk dalam Bahasa Indonesia, menarik untuk katalog>",
  "keyakinan": <angka 0-1, seberapa yakin kamu pada deteksi motif ini>
}`

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { inline_data: { mime_type: file.type, data: base64 } },
          ],
        }],
        generationConfig: { responseMimeType: 'application/json' },
      }),
    },
  )

  if (!response.ok) {
    throw new Error(`VISION_PROVIDER_ERROR_${response.status}`)
  }

  const json = await response.json()
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text

  if (!text) {
    throw new Error('VISION_PROVIDER_EMPTY_RESPONSE')
  }

  const parsed = JSON.parse(text)
  const keyakinan = typeof parsed.keyakinan === 'number' ? parsed.keyakinan : 0

  return {
    deskripsi: String(parsed.deskripsi ?? ''),
    motif: String(parsed.motif ?? ''),
    warna: Array.isArray(parsed.warna) ? parsed.warna.map(String) : [],
    pola: String(parsed.pola ?? ''),
    keyakinan,
    perlu_ditinjau: keyakinan < CONFIDENCE_THRESHOLD,
  }
}

function base64Encode(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
