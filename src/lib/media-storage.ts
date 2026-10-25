import crypto from "node:crypto";
import path from "node:path";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const storageRoot = path.resolve(
  process.env.MEDIA_STORAGE_DIR ||
    (process.env.VERCEL ? path.join("/tmp", "storage", "media") : path.join(process.cwd(), "storage", "media"))
);

export async function saveMedia(bytes: Buffer, originalName: string): Promise<string> {
  const extension = path.extname(originalName).toLowerCase().replace(/[^.a-z0-9]/g, "").slice(0, 12);
  const filename = `${crypto.randomUUID()}${extension}`;
  await mkdir(storageRoot, { recursive: true });
  await writeFile(path.join(storageRoot, filename), bytes, { flag: "wx" });
  return filename;
}

export async function readMedia(storagePath: string): Promise<Buffer> {
  // Only accept generated basename paths; never allow a DB value to escape the storage root.
  if (!/^[a-f0-9-]{36}(?:\.[a-z0-9]{1,12})?$/i.test(storagePath)) {
    throw new Error("Invalid media storage path");
  }
  return readFile(path.join(storageRoot, storagePath));
}
