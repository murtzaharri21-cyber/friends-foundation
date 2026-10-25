"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccessibilityWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState<0 | 1 | 2>(0);
  const [contrast, setContrast] = useState(false);
  const [spacing, setSpacing] = useState(false);
  const [underline, setUnderline] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.style.fontSize = scale === 1 ? "108%" : scale === 2 ? "116%" : "";
    html.style.filter = contrast ? "contrast(1.18)" : "";
    document.body.style.letterSpacing = spacing ? "0.025em" : "";
    document.body.style.lineHeight = spacing ? "1.8" : "";

    let styleEl = document.getElementById("ff-a11y-links") as HTMLStyleElement | null;
    if (underline) {
      if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = "ff-a11y-links";
        styleEl.textContent = "a { text-decoration: underline !important; text-underline-offset: 3px !important; }";
        document.head.appendChild(styleEl);
      }
    } else if (styleEl) {
      styleEl.remove();
    }
  }, [scale, contrast, spacing, underline]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const activeCount = (scale > 0 ? 1 : 0) + (contrast ? 1 : 0) + (spacing ? 1 : 0) + (underline ? 1 : 0);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div
          role="dialog"
          aria-label="Reading and accessibility options"
          className="mb-3 w-72 rounded-[20px] border border-line bg-white p-5 shadow-[0_24px_54px_rgba(12,28,46,0.2)]"
        >
          <div className="flex items-center justify-between border-b border-line pb-3">
            <p className="font-display text-base font-bold text-deep-2">Reading tools</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full px-2.5 py-1 text-xs font-bold text-muted hover:bg-mist hover:text-ink"
            >
              Close
            </button>
          </div>

          <div className="mt-4 space-y-2.5 text-[14px]">
            <button
              type="button"
              onClick={() => setScale((s) => ((s + 1) % 3) as 0 | 1 | 2)}
              aria-pressed={scale > 0}
              className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 font-semibold transition ${
                scale > 0 ? "border-brand bg-mist text-brand" : "border-line text-ink hover:border-brand"
              }`}
            >
              <span>Larger text</span>
              <span className="text-xs font-extrabold">{scale === 0 ? "100%" : scale === 1 ? "108%" : "116%"}</span>
            </button>

            <button
              type="button"
              onClick={() => setSpacing((v) => !v)}
              aria-pressed={spacing}
              className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 font-semibold transition ${
                spacing ? "border-brand bg-mist text-brand" : "border-line text-ink hover:border-brand"
              }`}
            >
              <span>Readable spacing</span>
              <span className="text-xs font-extrabold">{spacing ? "On" : "Off"}</span>
            </button>

            <button
              type="button"
              onClick={() => setUnderline((v) => !v)}
              aria-pressed={underline}
              className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 font-semibold transition ${
                underline ? "border-brand bg-mist text-brand" : "border-line text-ink hover:border-brand"
              }`}
            >
              <span>Highlight all links</span>
              <span className="text-xs font-extrabold">{underline ? "On" : "Off"}</span>
            </button>

            <button
              type="button"
              onClick={() => setContrast((v) => !v)}
              aria-pressed={contrast}
              className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 font-semibold transition ${
                contrast ? "border-brand bg-mist text-brand" : "border-line text-ink hover:border-brand"
              }`}
            >
              <span>Higher contrast</span>
              <span className="text-xs font-extrabold">{contrast ? "On" : "Off"}</span>
            </button>
          </div>

          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => {
                setScale(0);
                setContrast(false);
                setSpacing(false);
                setUnderline(false);
              }}
              className="mt-4 w-full rounded-full bg-mist py-2 text-xs font-bold text-brand hover:bg-brand hover:text-white"
            >
              Reset reading settings
            </button>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Open accessibility and reading options"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-deep text-white shadow-[0_14px_30px_rgba(20,60,87,0.32)] ring-2 ring-white transition hover:scale-105 hover:bg-brand"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden="true">
          <circle cx="12" cy="4.5" r="2" fill="currentColor" stroke="none" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 8.5h14M12 8.5v5.5m0 0-3 6m3-6 3 6" />
        </svg>
      </button>
    </div>
  );
}
