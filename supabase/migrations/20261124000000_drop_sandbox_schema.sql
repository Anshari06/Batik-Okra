-- Bersihin skema lama dari sandbox testing minggu lalu (sebelum kontrak final
-- di PANDUAN_PENGERJAAN.md disepakati). Skema lama pakai nama kolom/tipe beda
-- (nama_motif, kategori_motif, warna jsonb, dst) dan nggak dipakai frontend.
-- HANYA jalanin ini di project Supabase sandbox yang mau dipakai lanjut jadi
-- project production/shared. Kalau mau bikin project Supabase baru dari nol,
-- skip file ini (tabelnya memang belum ada).

drop table if exists audit_logs cascade;
drop table if exists chat_logs cascade;
drop table if exists uploaded_images cascade;
drop table if exists products cascade;
drop sequence if exists product_kode_seq;
drop type if exists product_status;
