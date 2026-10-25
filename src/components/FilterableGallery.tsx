"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./Icons";

export type GalleryItem = {
  src: string;
  caption?: string;
  category?: string;
  credit?: string;
  place?: string;
};

export default function FilterableGallery({
  items,
  columns = 4,
  showCredit = false,
}: {
  items: GalleryItem[];
  columns?: 3 | 4;
  showCredit?: boolean;
}) {
  const categories = useMemo(() => {
    const set = new Map<string, number>();
    for (const item of items) {
      const key = item.category ?? "Other";
      set.set(key, (set.get(key) ?? 0) + 1);
    }
    return [...set.entries()];
  }, [items]);

  const [filter, setFilter] = useState<string>("All");
  const [index, setIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? items : items.filter((i) => (i.category ?? "Other") === filter)),
    [items, filter],
  );

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + visible.length) % visible.length)),
    [visible.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [index, close, prev, next]);

  const current = index === null ? null : visible[index];
  const gridCols = columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <div>
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-line" role="tablist" aria-label="Filter photos">
          {["All", ...categories.map(([label]) => label)].map((label) => {
            const active = filter === label;
            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setFilter(label);
                  setIndex(null);
                }}
                className={`-mb-px border-b-2 pb-3 text-[15px] font-bold transition-colors ${
                  active
                    ? "border-brand text-brand"
                    : "border-transparent text-muted hover:border-line hover:text-deep-2"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      <ul className={`mt-8 grid grid-cols-2 gap-x-4 gap-y-7 ${gridCols}`}>
        {visible.map((item, i) => (
          <li key={`${item.src}-${i}`}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full overflow-hidden rounded-[16px] bg-mist ring-1 ring-line transition-shadow hover:shadow-[0_18px_40px_rgba(44,117,165,0.16)]"
              aria-label={`Open photo${item.caption ? `: ${item.caption}` : ""}`}
            >
              <img
                src={item.src}
                alt={item.caption ?? "Photograph"}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              />
            </button>
            {item.caption && <p className="mt-2.5 text-[14.5px] leading-snug text-ink/80">{item.caption}</p>}
            {(item.place || (showCredit && item.credit)) && (
              <p className="mt-1 text-[13px] text-muted">
                {item.place}
                {showCredit && item.credit ? ` · Photo: ${item.credit} / Pexels` : ""}
              </p>
            )}
          </li>
        ))}
      </ul>

      {visible.length === 0 && <p className="mt-8 text-muted">No photos in this category yet.</p>}

      {current && index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-deep-2/95 p-4 sm:p-10"
        >
          <figure className="max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={current.src}
              alt={current.caption ?? ""}
              className="mx-auto max-h-[74vh] w-auto max-w-full rounded-[14px] object-contain"
            />
            <figcaption className="mt-4 text-center">
              {current.caption && <p className="text-[15.5px] text-white/90">{current.caption}</p>}
              {(current.place || current.credit) && (
                <p className="mt-1 text-[13.5px] text-white/60">
                  {[current.place, current.credit && `Photo: ${current.credit} / Pexels`].filter(Boolean).join(" · ")}
                </p>
              )}
              <p className="mt-1 text-[13px] text-white/45">
                {index + 1} of {visible.length}
              </p>
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={close}
            aria-label="Close photo viewer"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full text-white/80 hover:bg-white/10 hover:text-white"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
          {visible.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-white/80 hover:bg-white/10 hover:text-white sm:left-4"
              >
                <ChevronLeftIcon className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-white/80 hover:bg-white/10 hover:text-white sm:right-4"
              >
                <ChevronRightIcon className="h-7 w-7" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
