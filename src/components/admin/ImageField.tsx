"use client";

import { useState } from "react";

export type MediaLibraryItem = {
  url: string;
  label: string;
  group: string;
};

export default function ImageField({
  label,
  value,
  onChange,
  library,
  onUploaded,
}: {
  label: string;
  value: string;
  onChange: (nextUrl: string) => void;
  library: MediaLibraryItem[];
  onUploaded?: (item: MediaLibraryItem) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const previewSrc =
    value.startsWith("/") || value.startsWith("http") ? value : `/images/ff/${value}`;

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = (await res.json()) as { url?: string; filename?: string; error?: string };
      if (!res.ok || !json.url) {
        throw new Error(json.error || "Upload failed.");
      }
      onChange(json.url);
      onUploaded?.({
        url: json.url,
        label: `Uploaded: ${json.filename || file.name}`,
        group: "Uploaded",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not upload image.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="label">{label}</label>
      <div className="flex flex-col gap-3.5 rounded-[16px] border border-line bg-mist/45 p-3.5 sm:flex-row sm:items-center">
        <div className="h-20 w-32 shrink-0 overflow-hidden rounded-xl border border-line bg-white">
          {value ? (
            <img src={previewSrc} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center text-xs text-muted">No image</div>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-2.5">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/appeal/... or https://..."
            className="field py-2 text-[14px]"
          />

          <div className="flex flex-wrap items-center gap-2">
            <label className="btn btn-primary btn-sm cursor-pointer">
              {uploading ? "Uploading…" : "Upload from computer"}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="sr-only"
              />
            </label>

            <button
              type="button"
              onClick={() => setPickerOpen((v) => !v)}
              className="btn btn-ghost btn-sm"
            >
              {pickerOpen ? "Close library" : "Choose from site library"}
            </button>
          </div>

          {error && <p className="text-xs font-bold text-accent">{error}</p>}
        </div>
      </div>

      {pickerOpen && (
        <div className="max-h-64 overflow-y-auto rounded-[16px] border border-line bg-white p-3.5 shadow-inner">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-xs font-bold text-muted">Click any photo to select ({library.length})</span>
            <button
              type="button"
              onClick={() => setPickerOpen(false)}
              className="text-xs font-bold text-brand hover:underline"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5 md:grid-cols-6">
            {library.map((item) => (
              <button
                key={item.url}
                type="button"
                onClick={() => {
                  onChange(item.url);
                  setPickerOpen(false);
                }}
                title={item.label}
                className={`group overflow-hidden rounded-xl border text-left transition ${
                  value === item.url
                    ? "border-2 border-brand ring-2 ring-brand-bright/25"
                    : "border-line hover:border-brand-bright"
                }`}
              >
                <img src={item.url} alt={item.label} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <span className="block truncate px-2 py-1 text-[11px] text-muted">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
