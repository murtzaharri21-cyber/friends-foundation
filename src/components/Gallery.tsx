"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./Icons";

export type GalleryPhoto = { src: string; caption?: string };

const grids = {
  four: "grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4",
  three: "grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3",
  compact: "grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-8",
};

export default function Gallery({
  photos,
  layout = "four",
  showCaptions = true,
}: {
  photos: GalleryPhoto[];
  layout?: keyof typeof grids;
  showCaptions?: boolean;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const count = photos.length;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(() => setIndex((i) => (i === null ? i : (i - 1 + count) % count)), [count]);
  const next = useCallback(() => setIndex((i) => (i === null ? i : (i + 1) % count)), [count]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [index, close, prev, next]);

  const compact = layout === "compact";
  const current = index === null ? null : photos[index];

  return (
    <>
      <ul className={grids[layout]}>
        {photos.map((p, i) => (
          <li key={`${p.src}-${i}`}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full overflow-hidden rounded-[16px] bg-mist"
              aria-label={`Open photo${p.caption ? `: ${p.caption}` : ""}`}
            >
              <img
                src={p.src}
                alt={p.caption ?? "Friends Foundation field photo"}
                loading="lazy"
                decoding="async"
                className={`${compact ? "aspect-square" : "aspect-[4/3]"} w-full object-cover transition duration-300 group-hover:scale-[1.03]`}
              />
            </button>
            {showCaptions && !compact && p.caption && (
              <p className="mt-2 text-sm leading-snug text-slate-600">{p.caption}</p>
            )}
          </li>
        ))}
      </ul>

      {current && index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-10"
          onClick={close}
        >
          <figure className="max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={current.src} alt={current.caption ?? ""} className="mx-auto max-h-[78vh] w-auto max-w-full object-contain" />
            <figcaption className="mt-4 text-center text-sm text-white/80">
              {current.caption}
              <span className="ml-2 text-white/50">
                {index + 1} / {count}
              </span>
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded text-white/80 hover:bg-white/10 hover:text-white"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded text-white/80 hover:bg-white/10 hover:text-white sm:left-4"
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
                className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded text-white/80 hover:bg-white/10 hover:text-white sm:right-4"
              >
                <ChevronRightIcon className="h-7 w-7" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
