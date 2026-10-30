# Friends Foundation website

## Media storage

New admin uploads are written to the filesystem, while PostgreSQL stores their filename, MIME type, and storage path. Existing donor receipt images stored in PostgreSQL remain available to administrators; new donations no longer upload receipts. Existing media rows that contain Base64 data remain readable.

By default, admin-uploaded files are saved under `storage/media` in the application directory. For production, set `MEDIA_STORAGE_DIR` to a persistent directory mounted or provisioned for the app. The directory must be writable by the Node.js process and included in your backup plan. Do not use a temporary deployment/build directory: files there may be removed when the app is redeployed. If your Hostinger plan does not provide persistent writable storage for the Node.js app, use an S3-compatible object storage service for admin-uploaded media.

## PostgreSQL migration

The `uploaded_media` table needs a nullable `storage_path` column, and `data_base64` must allow NULL. For an existing database, apply:

```sql
ALTER TABLE uploaded_media ADD COLUMN IF NOT EXISTS storage_path varchar(1000);
ALTER TABLE uploaded_media ALTER COLUMN data_base64 DROP NOT NULL;
```

For an existing PostgreSQL database, run [`migrations/20261023000000_create_donations.sql`](./migrations/20261023000000_create_donations.sql) against that database to create or update the `donations` table, including the country, city, and sender-account fields used by manual donation submissions. The migration also ensures `uploaded_media.data_base64` can store receipt images directly in PostgreSQL. Donor receipt links are restricted to authenticated administrators. Configure the app's server-side `DATABASE_URL` to point to the same PostgreSQL database. Keep the connection string private; do not expose it in client-side code or commit it.

Deploy the application with `DATABASE_URL`, `ADMIN_ID`, `ADMIN_PASSWORD`, and (in production) `MEDIA_STORAGE_DIR` configured. `ADMIN_ID` defaults to `Friendsfoundation`; set a strong `ADMIN_PASSWORD` of at least 12 characters. The environment credentials provide the initial admin login and recovery path. After an admin changes credentials in the dashboard, the database-stored account takes precedence and its password is stored as a salted scrypt hash. Back up the database and media directory together. Existing Base64 media can be moved to filesystem storage later; this code continues serving it from the database in the meantime.

Admins can update their ID or password under **Admin → Settings → Admin ID & Password**. Leaving the new-password field blank changes only the ID. Removing the admin account disables all admin sign-ins; to recover, configure `ADMIN_ID` and `ADMIN_PASSWORD` and delete the disabled `__admin_credentials__` row from the `site_cms` table.

Set `DONATION_WHATSAPP_NUMBER` to provide the initial donation contact's international WhatsApp number, using digits only and including the country code. Admins can update or delete it in **Admin → Settings → Donation WhatsApp Number**; a saved admin value overrides the environment default, including when cleared. After a donor submits the form, the donation is saved as pending and WhatsApp opens with the donor and transfer details prefilled. The donor can attach their payment receipt directly in WhatsApp; the website no longer uploads receipts.
