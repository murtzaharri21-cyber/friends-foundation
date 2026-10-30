"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { ThematicSlide } from "@/lib/content";
import { ArrowRightIcon } from "./Icons";

function ThemeGlyph({ icon, className = "h-5 w-5" }: { icon: ThematicSlide["icon"]; className?: string }) {
  switch (icon) {
    case "health":
      return (
        <svg viewBox="0 0 512 512" fill="currentColor" className={className} aria-hidden="true">
          <path d="M447.1 112c-34.2.5-62.3 28.4-63 62.6-.5 24.3 12.5 45.6 32 56.8V344c0 57.3-50.2 104-112 104-60 0-109.2-44.1-111.9-99.2C265 333.8 320 269.2 320 192V36.6c0-11.4-8.1-21.3-19.3-23.5L237.8.5c-13-2.6-25.6 5.8-28.2 18.8L206.4 35c-2.6 13 5.8 25.6 18.8 28.2l30.7 6.1v121.4c0 52.9-42.2 96.7-95.1 97.2-53.4.5-96.9-42.7-96.9-96V69.4l30.7-6.1c13-2.6 21.4-15.2 18.8-28.2l-3.1-15.7C107.7 6.4 95.1-2 82.1.6L19.3 13C8.1 15.3 0 25.1 0 36.6V192c0 77.3 55.1 142 128.1 156.8C130.7 439.2 208.6 512 304 512c97 0 176-75.4 176-168V231.4c19.1-11.1 32-31.7 32-55.4 0-35.7-29.2-64.5-64.9-64zm.9 80c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16z" />
        </svg>
      );
    case "governance":
      return (
        <svg viewBox="0 0 576 512" fill="currentColor" className={className} aria-hidden="true">
          <path d="M576 240c0-23.6-13-44-32-55.1V32c0-8.7-7-32-32-32-7.1 0-14.2 2.4-20 7l-85 68C364.3 109.2 310.7 128 256 128H64c-35.4 0-64 28.7-64 64v96c0 35.4 28.6 64 64 64h33.7c-1.4 10.5-2.2 21.1-2.2 32 0 39.8 9.3 77.4 25.6 110.9 5.2 10.7 16.5 17.1 28.4 17.1h74.3c26 0 41.7-29.8 25.9-50.6-16.4-21.5-26.2-48.4-26.2-77.4 0-11.1 1.6-21.8 4.4-32H256c54.7 0 108.3 18.8 151 53l85 68a32 32 0 0 0 20 7c24.9 0 32-22.8 32-32V295.1c19-11.1 32-31.5 32-55.1z" />
        </svg>
      );
    case "climate":
      return (
        <svg viewBox="0 0 496 512" fill="currentColor" className={className} aria-hidden="true">
          <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm82.3 357.6c-3.9 3.9-8 8-11.3 11.3-3 3-5.1 6.7-6.2 10.7-1.5 5.7-2.7 11.4-4.8 16.9l-17.4 46.9c-13.8 3-28 4.7-42.7 4.7v-27.4c1.7-12.6-7.6-36.3-22.6-51.3-6-6-9.4-14.1-9.4-22.6v-32c0-11.6-6.3-22.3-16.5-28-14.4-8-34.8-19.1-48.8-26.1-11.5-5.8-22.1-13.1-31.7-21.8l-.8-.7a114.8 114.8 0 0 1-18.1-20.7c-9.4-13.8-24.7-36.4-34.6-51.1 20.5-45.5 57.4-82 103.2-101.9l24 12c11.1 5.5 23.6-2.2 23.6-14.1v-11.3c8-1.3 16.1-2.1 24.4-2.4l28.3 28.3c6.3 6.3 6.3 16.4 0 22.6L264 112l-10.3 10.3c-3.1 3.1-3.1 8.2 0 11.3l4.7 4.7c3.1 3.1 3.1 8.2 0 11.3l-8 8a8 8 0 0 1-5.7 2.3h-9c-2.1 0-4.1.8-5.6 2.3l-9.9 9.7a8 8 0 0 0-1.6 9.3l15.6 31.2c2.7 5.3-1.2 11.6-7.2 11.6h-5.6c-1.9 0-3.8-.7-5.2-2l-9.3-8.1a16 16 0 0 0-15.6-3.1l-31.2 10.4a12 12 0 0 0-8.2 11.3c0 4.5 2.6 8.7 6.6 10.7l11.1 5.5c9.4 4.7 19.8 7.2 30.3 7.2s22.6 27.3 32 32h66.8c8.5 0 16.6 3.4 22.6 9.4l13.7 13.7a30.5 30.5 0 0 1 8.9 21.6 46.5 46.5 0 0 1-13.7 33z" />
        </svg>
      );
    case "women":
      return (
        <svg viewBox="0 0 384 512" fill="currentColor" className={className} aria-hidden="true">
          <path d="M120 72c0-39.8 32.2-72 72-72s72 32.2 72 72-32.2 72-72 72-72-32.2-72-72zm254.6 1.4c-12.5-12.5-32.8-12.5-45.3 0L242.7 160H141.3L54.6 73.4c-12.5-12.5-32.8-12.5-45.3 0-12.5 12.5-12.5 32.8 0 45.3L104 213.3V480c0 17.7 14.3 32 32 32h16c17.7 0 32-14.3 32-32V368h16v112c0 17.7 14.3 32 32 32h16c17.7 0 32-14.3 32-32V213.3l94.6-94.6c12.5-12.5 12.5-32.8 0-45.3z" />
        </svg>
      );
    case "education":
      return (
        <svg viewBox="0 0 576 512" fill="currentColor" className={className} aria-hidden="true">
          <path d="M542.2 32.1c-54.8 3.1-163.7 14.4-231 55.6-4.6 2.8-7.3 7.9-7.3 13.2v363.9c0 11.6 12.6 18.9 23.3 13.5 69.2-34.8 169.2-44.3 218.7-46.9 16.9-.9 30-14.4 30-30.7V62.8c0-17.7-15.4-31.7-33.8-30.7zM264.7 87.6C197.5 46.5 88.6 35.2 33.8 32.1 15.4 31 0 45 0 62.8v337.8c0 16.2 13.1 29.8 30 30.7 49.5 2.6 149.6 12.1 218.8 47 10.6 5.4 23.2-1.9 23.2-13.5V100.6c0-5.3-2.6-10.1-7.3-13z" />
        </svg>
      );
    case "water":
      return (
        <svg viewBox="0 0 384 512" fill="currentColor" className={className} aria-hidden="true">
          <path d="M192 512C86 512 0 426 0 320 0 228.8 130.2 57.7 166.6 11.7c12.5-15.6 38.3-15.6 50.8 0C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zm-96-176c0 53 43 96 96 96 13.3 0 24-10.7 24-24s-10.7-24-24-24c-26.5 0-48-21.5-48-48 0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
        </svg>
      );
    case "relief":
      return (
        <svg viewBox="0 0 512 512" fill="currentColor" className={className} aria-hidden="true">
          <path d="M320 336c0 8.8-7.2 16-16 16h-96c-8.8 0-16-7.2-16-16v-48H0v144c0 25.6 22.4 48 48 48h416c25.6 0 48-22.4 48-48V288H320v48zm144-208h-80V80c0-25.6-22.4-48-48-48H176c-25.6 0-48 22.4-48 48v48H48c-25.6 0-48 22.4-48 48v80h512v-80c0-25.6-22.4-48-48-48zm-144 0H192V96h128v32z" />
        </svg>
      );
  }
}

export default function ThematicAccordionSlider({ slides }: { slides: ThematicSlide[] }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Desktop horizontal expanding vertical-tab slider (modeled on AKRSP) */}
      <div
        className="hidden h-[520px] w-full overflow-hidden rounded-[14px] bg-white shadow-[0_20px_44px_rgba(12,28,46,0.14)] md:flex"
        role="tablist"
        aria-label="Friends Foundation thematic areas"
      >
        {slides.map((slide, i) => {
          const isOpen = i === active;
          return (
            <div
              key={slide.slug}
              role="tab"
              tabIndex={0}
              aria-selected={isOpen}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") setActive((i + 1) % slides.length);
                if (e.key === "ArrowLeft") setActive((i - 1 + slides.length) % slides.length);
              }}
              style={{
                flex: isOpen ? 3.4 : 1,
                backgroundColor: slide.color,
                transition: "flex 620ms cubic-bezier(0.25, 1, 0.5, 1)",
              }}
              className="group relative flex h-full min-w-[68px] cursor-pointer select-none overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
            >
              {/* Full-bleed background photo when expanded */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="(min-width: 768px) 25vw, 100vw"
                quality={75}
                loading="lazy"
                className={`pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ${
                  isOpen ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
              />

              {/* Subtle bottom scrim so photography stays vibrant on top and legible at bottom */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                  isOpen ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background:
                    "linear-gradient(to top, rgba(8,16,28,0.84) 0%, rgba(8,16,28,0.34) 48%, rgba(8,16,28,0.08) 100%)",
                }}
              />

              {/* Collapsed strip state: rotated vertical uppercase title + bottom white circular icon */}
              <div
                aria-hidden={isOpen}
                className={`relative z-10 flex h-full w-full flex-col items-center justify-between py-7 transition-opacity duration-300 ${
                  isOpen ? "pointer-events-none opacity-0" : "opacity-100"
                }`}
              >
                <span className="h-6" aria-hidden="true" />
                <span
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  className="font-sans text-[15px] font-semibold uppercase tracking-[0.09em] text-white/95"
                >
                  {slide.tabLabel}
                </span>
                <span
                  style={{ color: slide.color }}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.13)] transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_8px_18px_rgba(0,0,0,0.18)]"
                >
                  <ThemeGlyph icon={slide.icon} className="h-[19px] w-[19px]" />
                </span>
              </div>

              {/* Expanded state: white icon circle + large title + subtitle + direct programme link */}
              <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-start p-7 lg:p-8 transition-all duration-500 ${
                  isOpen ? "translate-y-0 opacity-100 delay-150" : "translate-y-5 opacity-0"
                }`}
              >
                <span
                  style={{ color: slide.color }}
                  className="grid h-[58px] w-[58px] shrink-0 place-items-center rounded-full bg-white shadow-[0_6px_18px_rgba(0,0,0,0.18)]"
                >
                  <ThemeGlyph icon={slide.icon} className="h-6 w-6" />
                </span>

                <h3 className="mt-4 max-w-md font-display text-[1.65rem] leading-[1.15] font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] lg:text-[1.9rem]">
                  {slide.title}
                </h3>

                <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                  {slide.subtitle}
                </p>

                <Link
                  href={`/our-work/${slide.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="pointer-events-auto mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13.5px] font-bold text-deep-2 shadow-sm transition hover:bg-brand hover:text-white"
                >
                  Explore programme <ArrowRightIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile responsive stack accordion */}
      <div className="flex flex-col overflow-hidden rounded-[14px] shadow-[0_16px_36px_rgba(12,28,46,0.12)] md:hidden">
        {slides.map((slide, i) => {
          const isOpen = i === active;
          return (
            <div key={slide.slug} className="overflow-hidden">
              {isOpen ? (
                <div className="relative flex min-h-[360px] flex-col justify-end p-6">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="100vw"
                    quality={75}
                    loading="lazy"
                    className="object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(8,16,28,0.85) 0%, rgba(8,16,28,0.34) 55%, rgba(8,16,28,0.1) 100%)",
                    }}
                  />
                  <div className="relative z-10">
                    <span
                      style={{ color: slide.color }}
                      className="grid h-13 w-13 place-items-center rounded-full bg-white shadow-md"
                    >
                      <ThemeGlyph icon={slide.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-3.5 font-display text-2xl font-bold text-white">{slide.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-white/90">{slide.subtitle}</p>
                    <Link
                      href={`/our-work/${slide.slug}`}
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13.5px] font-bold text-deep-2"
                    >
                      Explore programme <ArrowRightIcon className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  style={{ backgroundColor: slide.color }}
                  className="flex w-full items-center gap-4 px-5 py-3.5 text-left transition-opacity hover:opacity-95"
                >
                  <span
                    style={{ color: slide.color }}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white shadow-sm"
                  >
                    <ThemeGlyph icon={slide.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <span className="font-sans text-[15px] font-bold uppercase tracking-[0.06em] text-white">
                    {slide.tabLabel}
                  </span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
