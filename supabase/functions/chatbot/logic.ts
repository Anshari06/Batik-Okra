// B4: Logic inti chatbot (scope-check + smart recommender), dipisah dari index.ts
// (Deno.serve handler) supaya bisa di-unit-test langsung (B5) tanpa menjalankan server.
// Kontrak & aturan dari PRD FR-04/FR-05 dan project-context.md:
// - Scope HANYA: katalog, stok, motif batik. Di luar itu -> ditolak sopan.
// - Rekomendasi HANYA dipicu kalau produk yang ditanya berstatus TERJUAL.
// - Rekomendasi HANYA produk TERSEDIA, maksimal 3, diurutkan skor kemiripan tertinggi.
// - Kemiripan dihitung dari atribut terstruktur (kategori, warna, pola), bukan teks bebas.

export interface Product {
  id: string
  kode: string
  nama: string
  kategori: string
  warna: string[]
  pola: string | null
  asal: string | null
  harga: number
  status: 'TERSEDIA' | 'TERJUAL'
  deskripsi: string | null
  image_url: string | null
}

export interface Recommendation {
  kode: string
  nama: string
  link: string
}

// --- Scope check -----------------------------------------------------------
// Keyword-based check dulu (cepat, gratis, cukup buat MVP). Kalau butuh lebih pintar,
// bisa upgrade ke LLM classifier, tapi jaga supaya fungsi ini tetap pure & testable.
const IN_SCOPE_KEYWORDS = [
  'motif', 'batik', 'kain', 'produk', 'stok', 'tersedia', 'terjual',
  'katalog', 'harga', 'warna', 'pola', 'kategori', 'parang', 'kawung',
  'mega mendung', 'mega-mendung', 'truntum', 'sogan', 'kontemporer',
  'asal', 'ada ga', 'ada gak', 'ada nggak', 'masih ada', 'rekomendasi',
  'alternatif', 'mirip', 'serupa',
]

const OUT_OF_SCOPE_OVERRIDE = [
  // Pertanyaan yang jelas-jelas di luar domain walau kebetulan mengandung kata umum.
  'politik', 'presiden', 'pemilu', 'agama', 'obat', 'dokter', 'resep masakan',
  'cuaca', 'saham', 'kripto', 'pemrograman', 'kode program',
  'abaikan instruksi', 'ignore previous', 'system prompt', 'jailbreak',
]

export function isInScope(question: string): boolean {
  const q = question.toLowerCase()

  if (OUT_OF_SCOPE_OVERRIDE.some((kw) => q.includes(kw))) {
    return false
  }

  return IN_SCOPE_KEYWORDS.some((kw) => q.includes(kw))
}

export const OUT_OF_SCOPE_REPLY =
  'Maaf, saya hanya dapat membantu seputar katalog, stok, dan motif batik Kampung Batik Okra. ' +
  'Ada motif tertentu yang ingin Anda tanyakan?'

// --- Smart recommender -------------------------------------------------------
// Skor kemiripan: kategori exact match (bobot 0.4) + Jaccard similarity warna (0.3)
// + pola exact match (0.3). Nilai antara 0-1.
const WEIGHTS = { kategori: 0.4, warna: 0.3, pola: 0.3 }
const MIN_SCORE = 0.3
const MAX_RECOMMENDATIONS = 3

function jaccard(a: string[], b: string[]): number {
  const setA = new Set(a.map((s) => s.toLowerCase()))
  const setB = new Set(b.map((s) => s.toLowerCase()))
  if (setA.size === 0 && setB.size === 0) return 0

  const intersection = [...setA].filter((x) => setB.has(x)).length
  const union = new Set([...setA, ...setB]).size

  return union === 0 ? 0 : intersection / union
}

export function similarityScore(target: Product, candidate: Product): number {
  const kategoriScore = target.kategori.toLowerCase() === candidate.kategori.toLowerCase() ? 1 : 0
  const warnaScore = jaccard(target.warna, candidate.warna)
  const polaScore = target.pola && candidate.pola && target.pola.toLowerCase() === candidate.pola.toLowerCase() ? 1 : 0

  return (
    kategoriScore * WEIGHTS.kategori +
    warnaScore * WEIGHTS.warna +
    polaScore * WEIGHTS.pola
  )
}

// RB-09/RB-10/RB-11: rekomendasi cuma dipicu produk TERJUAL, hanya kandidat TERSEDIA,
// maksimal 3, terurut skor tertinggi, dan tidak diisi produk tidak relevan kalau kurang dari 3.
export function findRecommendations(target: Product, catalog: Product[]): Product[] {
  if (target.status !== 'TERJUAL') {
    return []
  }

  return catalog
    .filter((p) => p.status === 'TERSEDIA' && p.id !== target.id)
    .map((p) => ({ product: p, score: similarityScore(target, p) }))
    .filter(({ score }) => score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_RECOMMENDATIONS)
    .map(({ product }) => product)
}

export function toRecommendationLinks(products: Product[]): Recommendation[] {
  return products.map((p) => ({
    kode: p.kode,
    nama: p.nama,
    link: `/produk/${p.kode}`,
  }))
}

// --- Pencarian produk dari pertanyaan ---------------------------------------
// Simple fuzzy match berdasarkan nama/kategori yang disebut di pertanyaan.
// Dipakai index.ts sebelum query DB (atau bisa dipindah jadi query ILIKE di DB langsung).
export function findMentionedProduct(question: string, catalog: Product[]): Product | null {
  const q = question.toLowerCase()

  const matches = catalog.filter((p) =>
    q.includes(p.nama.toLowerCase()) || q.includes(p.kategori.toLowerCase())
  )

  if (matches.length === 0) return null

  // Prioritaskan match nama penuh (lebih spesifik) daripada cuma match kategori.
  const nameMatch = matches.find((p) => q.includes(p.nama.toLowerCase()))
  return nameMatch ?? matches[0]
}
