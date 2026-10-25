"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "./Icons";

export type StorySlide = {
  image: string;
  tag: string;
  title: string;
  text: string;
  href: string;
};

export default function StoriesCarousel({ items }: { items: StorySlide[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  function step(dir: -1 | 1) {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.getBoundingClientRect().width ?? 360;
    el.scrollBy({ left: dir * (cardWidth + 24), behavior: "smooth" });
    setPage((p) => (p + dir + items.length) % items.length);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous field updates"
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-deep-2 shadow-xs transition hover:border-brand hover:text-brand"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next field updates"
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-deep-2 shadow-xs transition hover:border-brand hover:text-brand"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      <div
        ref={trackRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          const cardWidth = el.firstElementChild?.getBoundingClientRect().width ?? 360;
          setPage(Math.min(items.length - 1, Math.round(el.scrollLeft / (cardWidth + 24))));
        }}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <article
            key={item.title}
            className="card card-hover flex w-[86vw] shrink-0 snap-start flex-col overflow-hidden sm:w-[46vw] lg:w-[calc((100%-3rem)/3)]"
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="flex flex-1 flex-col p-6">
              <h3>{item.title}</h3>
              <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-ink/70">{item.text}</p>
              <Link
                href={item.href}
                className="mt-4 inline-flex items-center gap-1.5 text-[14.5px] font-bold text-brand hover:text-deep"
              >
                Read more <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2" aria-hidden="true">
        {items.map((item, i) => (
          <span
            key={item.title}
            className={`h-2 rounded-full transition-all ${i === page ? "w-7 bg-brand" : "w-2 bg-line"}`}
          />
        ))}
      </div>
    </div>
  );
}
