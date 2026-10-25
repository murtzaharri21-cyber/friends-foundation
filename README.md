# Friends Foundation website

## Media storage

New admin uploads are written to the filesystem, while PostgreSQL stores their filename, MIME type, and storage path. Donor receipt images are stored directly in PostgreSQL. Existing media rows that contain Base64 data remain readable.

By default, admin-uploaded files are saved under `storage/media` in the application directory. For production, set `MEDIA_STORAGE_DIR` to a persistent directory mounted or provisioned for the app. The directory must be writable by the Node.js process and included in your backup plan. Do not use a temporary deployment/build directory: files there may be removed when the app is redeployed. If your Hostinger plan does not provide persistent writable storage for the Node.js app, use an S3-compatible object storage service for admin-uploaded media.

## PostgreSQL migration

The `uploaded_media` table needs a nullable `storage_path` column, and `data_base64` must allow NULL. For an existing database, apply:

```sql
ALTER TABLE uploaded_media ADD COLUMN IF NOT EXISTS storage_path varchar(1000);
ALTER TABLE uploaded_media ALTER COLUMN data_base64 DROP NOT NULL;
```

For an existing PostgreSQL database, run [`migrations/20261023000000_create_donations.sql`](./migrations/20261023000000_create_donations.sql) against that database to create or update the `donations` table, including the country, city, and sender-account fields used by manual donation submissions. The migration also ensures `uploaded_media.data_base64` can store receipt images directly in PostgreSQL. Donor receipt links are restricted to authenticated administrators. Configure the app's server-side `DATABASE_URL` to point to the same PostgreSQL database. Keep the connection string private; do not expose it in client-side code or commit it.

Deploy the application with `DATABASE_URL`, `ADMIN_PASSWORD`, and (in production) `MEDIA_STORAGE_DIR` configured. Back up the database and media directory together. Existing Base64 media can be moved to filesystem storage later; this code continues serving it from the database in the meantime.
