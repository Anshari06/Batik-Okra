-- B1: Storage bucket "produk" (public read), sesuai PANDUAN_PENGERJAAN.md Step 2
insert into storage.buckets (id, name, public)
values ('produk', 'produk', true)
on conflict (id) do nothing;

create policy "public read produk photos" on storage.objects
  for select using (bucket_id = 'produk');

create policy "admin upload produk photos" on storage.objects
  for insert to authenticated with check (bucket_id = 'produk');

create policy "admin update produk photos" on storage.objects
  for update to authenticated using (bucket_id = 'produk');

create policy "admin delete produk photos" on storage.objects
  for delete to authenticated using (bucket_id = 'produk');
