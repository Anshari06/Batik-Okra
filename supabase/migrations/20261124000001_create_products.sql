-- B1: Tabel products sesuai kontrak PANDUAN_PENGERJAAN.md Step 2
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  kode text unique not null,
  nama text not null,
  kategori text not null,
  warna text[] not null default '{}',
  pola text,
  asal text,
  harga integer not null,
  status text not null default 'TERSEDIA' check (status in ('TERSEDIA','TERJUAL')),
  deskripsi text,
  image_url text,
  created_at timestamptz not null default now()
);

create index if not exists idx_products_status on products(status);
create index if not exists idx_products_kategori on products(kategori);
create index if not exists idx_products_created_at on products(created_at);

alter table products enable row level security;

-- publik hanya boleh membaca
create policy "public read products" on products
  for select using (true);

-- hanya admin (user login) yang boleh menulis
create policy "admin write products" on products
  for all to authenticated using (true) with check (true);

-- Aktifkan Realtime (setara toggle di Database > Replication)
alter publication supabase_realtime add table products;
