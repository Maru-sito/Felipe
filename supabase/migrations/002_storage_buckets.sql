-- Storage bucket for session files
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'session-files',
  'session-files',
  false,
  52428800, -- 50MB per file
  array['image/jpeg', 'image/png', 'image/webp', 'image/tiff', 'application/zip']
)
on conflict (id) do nothing;

-- RLS for storage: admins can upload, clients can read their own files
create policy "Admins can upload session files"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'session-files'
    and (select role from profiles where id = auth.uid()) = 'admin'
  );

create policy "Admins can manage all session files"
  on storage.objects for all
  to authenticated
  using (
    bucket_id = 'session-files'
    and (select role from profiles where id = auth.uid()) = 'admin'
  );

create policy "Clients can read their session files"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'session-files'
    and exists (
      select 1 from files f
      join bookings b on b.id = f.booking_id
      where f.storage_path = name
        and b.client_id = auth.uid()
    )
  );
