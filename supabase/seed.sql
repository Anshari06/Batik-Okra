-- B2: Seed 12 produk. image_url pakai placeholder sementara —
-- ganti ke URL asli di bucket Storage "produk" begitu foto dari Figma di-upload.
-- "Parang Okra" dan "Kawung Biru" sengaja dipakai karena jadi nama produk
-- di frame Figma Detail Produk (829:550 Tersedia, 829:700 Terjual).

insert into products (kode, nama, kategori, warna, pola, asal, harga, status, deskripsi, image_url) values
('parang-okra', 'Parang Okra', 'parang', array['coklat','krem'], 'geometris', 'Surabaya', 850000, 'TERSEDIA',
  'Motif parang klasik dengan sentuhan warna khas Kampung Batik Okra, melambangkan kekuatan dan kesinambungan.',
  'https://placehold.co/600x600?text=Parang+Okra'),

('kawung-biru', 'Kawung Biru', 'kawung', array['biru','putih'], 'geometris', 'Surabaya', 920000, 'TERJUAL',
  'Motif kawung dengan pewarnaan biru indigo, terinspirasi filosofi kesucian dan keadilan.',
  'https://placehold.co/600x600?text=Kawung+Biru'),

('mega-mendung-cirebon', 'Mega Mendung Cirebon', 'mega-mendung', array['biru','merah'], 'organik', 'Cirebon', 1100000, 'TERSEDIA',
  'Motif awan bergradasi khas Cirebon, melambangkan kesabaran dalam menghadapi masalah.',
  'https://placehold.co/600x600?text=Mega+Mendung'),

('truntum-sogan', 'Truntum Sogan', 'truntum', array['coklat','emas'], 'organik', 'Solo', 780000, 'TERSEDIA',
  'Motif truntum dengan warna sogan tradisional, sering dipakai dalam acara pernikahan adat Jawa.',
  'https://placehold.co/600x600?text=Truntum+Sogan'),

('sogan-klasik', 'Sogan Klasik', 'sogan', array['coklat','hitam'], 'geometris', 'Solo', 690000, 'TERSEDIA',
  'Batik sogan dengan warna coklat kehitaman khas keraton, elegan dan timeless.',
  'https://placehold.co/600x600?text=Sogan+Klasik'),

('kontemporer-senja', 'Kontemporer Senja', 'kontemporer', array['jingga','ungu'], 'abstrak', 'Surabaya', 1250000, 'TERSEDIA',
  'Perpaduan warna senja modern dengan teknik pewarnaan kontemporer, cocok untuk gaya kasual formal.',
  'https://placehold.co/600x600?text=Kontemporer+Senja'),

('parang-rusak-pekalongan', 'Parang Rusak Pekalongan', 'parang', array['merah','krem'], 'geometris', 'Pekalongan', 980000, 'TERJUAL',
  'Varian parang rusak dengan pengaruh warna cerah khas Pekalongan.',
  'https://placehold.co/600x600?text=Parang+Rusak'),

('kawung-hijau', 'Kawung Hijau', 'kawung', array['hijau','putih'], 'geometris', 'Yogyakarta', 870000, 'TERSEDIA',
  'Motif kawung dengan nuansa hijau segar, melambangkan keseimbangan alam.',
  'https://placehold.co/600x600?text=Kawung+Hijau'),

('mega-mendung-monokrom', 'Mega Mendung Monokrom', 'mega-mendung', array['hitam','putih'], 'organik', 'Cirebon', 1050000, 'TERSEDIA',
  'Mega mendung versi monokrom untuk tampilan yang lebih minimalis dan modern.',
  'https://placehold.co/600x600?text=Mega+Mendung+Mono'),

('truntum-emas', 'Truntum Emas', 'truntum', array['emas','coklat'], 'organik', 'Yogyakarta', 1400000, 'TERSEDIA',
  'Truntum dengan aksen prada emas, pilihan istimewa untuk acara formal.',
  'https://placehold.co/600x600?text=Truntum+Emas'),

('kontemporer-biru-laut', 'Kontemporer Biru Laut', 'kontemporer', array['biru','putih'], 'abstrak', 'Surabaya', 1150000, 'TERJUAL',
  'Motif abstrak terinspirasi gelombang laut dengan gradasi biru yang menenangkan.',
  'https://placehold.co/600x600?text=Biru+Laut'),

('sogan-pekalongan', 'Sogan Pekalongan', 'sogan', array['coklat','jingga'], 'geometris', 'Pekalongan', 760000, 'TERSEDIA',
  'Sogan dengan sentuhan warna cerah khas pesisir Pekalongan.',
  'https://placehold.co/600x600?text=Sogan+Pekalongan');
