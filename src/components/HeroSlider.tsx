"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { HeroSlide } from "@/lib/content";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "./Icons";

type QuickCurrency = "PKR" | "USD" | "GBP" | "EUR";

const QUICK_PRESETS: Record<QuickCurrency, number[]> = {
  PKR: [2500, 5000, 10000, 25000],
  USD: [25, 50, 100, 250],
  GBP: [20, 50, 100, 250],
  EUR: [20, 50, 100, 250],
};

const QUICK_SYM: Record<QuickCurrency, string> = {
  PKR: "Rs",
  USD: "$",
  GBP: "£",
  EUR: "€",
};

const PURPOSES = [
  "Emergency relief",
  "Clean water and sanitation",
  "Health centres",
  "Zakat / Sadaqah",
  "Girls’ education",
  "Where it is needed most",
];

export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  // Quick Appeal Donation Bar state
  const [currency, setCurrency] = useState<QuickCurrency>("PKR");
  const [amount, setAmount] = useState<number>(5000);
  const [custom, setCustom] = useState("");
  const [purpose, setPurpose] = useState<string>("Emergency relief");

  const goTo = useCallback(
    (nextIdx: number) => {
      setIndex((curr) => {
        const resolved = ((nextIdx % slides.length) + slides.length) % slides.length;
        if (resolved !== curr) {
          setPrevIndex(curr);
        }
        return resolved;
      });
    },
    [slides.length],
  );

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setZoomed(true));
    return () => window.cancelAnimationFrame(raf);
  }, []);

  // Automatic Alkhidmat-style continuous crossfade every 4.2s
  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => {
      goTo(index + 1);
    }, 4200);
    return () => window.clearInterval(id);
  }, [slides.length, index, goTo]);

  const effectiveAmount = custom ? Number(custom) : amount;

  function pickCurrency(c: QuickCurrency) {
    setCurrency(c);
    setCustom("");
    setAmount(QUICK_PRESETS[c][1]);
  }

  function onQuickSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("currency", currency);
    if (Number.isFinite(effectiveAmount) && effectiveAmount > 0) {
      params.set("amount", String(Math.round(effectiveAmount)));
    }
    params.set("purpose", purpose);
    router.push(`/donate?${params.toString()}`);
  }

  return (
    <div className="relative xl:-mt-[86px]">
      <section
        aria-label="Featured humanitarian appeals across Pakistan"
        className="relative flex h-[580px] w-full items-center overflow-hidden bg-[#08223d] pt-28 pb-24 sm:h-[630px] lg:h-[670px]"
      >
        {/* 3-layer flicker-free 1000ms crossfade + gentle Ken Burns zoom */}
        {slides.map((s, i) => {
          const isCurrent = i === index;
          const isPrev = i === prevIndex && prevIndex !== index;
          const shouldScale = isPrev || (isCurrent && zoomed);

          return (
            <div
              key={s.image}
              aria-hidden={!isCurrent}
              style={{
                zIndex: isCurrent ? 3 : isPrev ? 2 : 1,
                opacity: isCurrent || isPrev ? 1 : 0,
                transition: isCurrent ? "opacity 1000ms ease-in-out" : "none",
              }}
              className="pointer-events-none absolute inset-0"
            >
              <img
                src={s.image}
                alt={s.imageAlt}
                loading="eager"
                decoding="async"
                style={{
                  transform: shouldScale ? "scale(1.06)" : "scale(1)",
                  transition: isCurrent || isPrev ? "transform 5400ms ease-out" : "none",
                }}
                className={`h-full w-full object-cover will-change-transform ${s.focalClass}`}
              />

              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(95deg, rgba(${s.tintRgb}, 0.95) 0%, rgba(${s.tintRgb}, 0.85) 34%, rgba(${s.tintRgb}, 0.32) 60%, rgba(${s.tintRgb}, 0.08) 100%)`,
                }}
              />

              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(6,16,30,0.34) 0%, rgba(6,16,30,0) 24%, rgba(6,16,30,0) 72%, rgba(6,16,30,0.48) 100%)",
                }}
              />
            </div>
          );
        })}

        {/* Left & Right edge carousel arrows */}
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous slide"
          className="absolute left-2.5 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/25 text-white backdrop-blur-xs transition hover:bg-white hover:text-deep-2 sm:left-5"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next slide"
          className="absolute right-2.5 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/25 text-white backdrop-blur-xs transition hover:bg-white hover:text-deep-2 sm:right-5"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>

        {/* Clean headline + lead + actions (stable stacked layers to prevent any layout shift or page scroll glitch) */}
        <div className="container-ff relative z-10 py-6">
          <div className="relative max-w-xl min-h-[300px] sm:min-h-[330px] lg:min-h-[350px]">
            {slides.map((s, i) => {
              const isActive = i === index;
              return (
                <div
                  key={s.shortTab}
                  aria-hidden={!isActive}
                  className={`transition-opacity duration-700 ease-in-out ${
                    isActive
                      ? "relative z-10 opacity-100"
                      : "pointer-events-none absolute inset-0 z-0 opacity-0"
                  }`}
                >
                  <h1 className="font-display text-[2.35rem] leading-[1.06] font-extrabold tracking-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.32)] sm:text-[3.2rem] lg:text-[3.65rem]">
                    <span className="block">{s.headlineTop}</span>
                    <span className="mt-1 block" style={{ color: s.accentHex }}>
                      {s.headlineAccent}
                    </span>
                  </h1>

                  <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)] sm:text-[1.12rem]">
                    {s.lead}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3.5">
                    <Link href={s.primaryHref} className="btn btn-donation">
                      {s.primaryLabel} <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                    <Link href={s.secondaryHref} className="btn btn-light">
                      {s.secondaryLabel}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Minimal slim slide indicator lines */}
          <div className="mt-6 flex items-center gap-2" role="tablist" aria-label="Slide navigation">
            {slides.map((s, i) => {
              const isActive = i === index;
              return (
                <button
                  key={s.shortTab}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Slide ${i + 1}: ${s.headlineTop} ${s.headlineAccent}`}
                  onClick={() => goTo(i)}
                  className="group py-2"
                >
                  <span
                    className={`relative block h-1 overflow-hidden rounded-full transition-all ${
                      isActive ? "w-11 bg-white/35" : "w-6 bg-white/30 group-hover:bg-white/60"
                    }`}
                  >
                    {isActive && (
                      <span
                        key={`prog-${index}`}
                        aria-hidden="true"
                        className="hero-progress-bar block h-full w-full bg-white"
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Docked Quick Appeal Donation Bar */}
      <div className="container-ff relative z-30 -mt-10">
        <form
          onSubmit={onQuickSubmit}
          aria-label="Quick donation appeal bar"
          className="rounded-[22px] border border-line bg-white p-4 shadow-[0_22px_54px_rgba(11,28,48,0.14)] sm:p-5"
        >
          <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[13px] font-bold text-deep-2">Currency:</span>
              {(["PKR", "USD", "GBP", "EUR"] as QuickCurrency[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => pickCurrency(c)}
                  aria-pressed={currency === c}
                  className={`rounded-full px-3 py-1.5 text-[13px] font-extrabold transition ${
                    currency === c
                      ? "bg-brand text-white shadow-xs"
                      : "bg-mist text-ink/75 hover:bg-brand/15 hover:text-brand"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="lg:w-56">
              <label htmlFor="quick-purpose" className="sr-only">
                Select cause
              </label>
              <select
                id="quick-purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full rounded-full border border-line bg-mist/40 px-4 py-2 text-[13.5px] font-bold text-deep-2 focus:border-brand focus:outline-none"
              >
                {PURPOSES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-1 flex-wrap items-center gap-1.5">
              {QUICK_PRESETS[currency].map((preset) => {
                const selected = !custom && amount === preset;
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setAmount(preset);
                      setCustom("");
                    }}
                    aria-pressed={selected}
                    className={`rounded-full border px-3 py-1.5 text-[13px] font-bold transition ${
                      selected
                        ? "border-deep bg-deep text-white"
                        : "border-line bg-white text-ink hover:border-brand hover:text-brand"
                    }`}
                  >
                    {QUICK_SYM[currency]} {preset.toLocaleString()}
                  </button>
                );
              })}

              <label htmlFor="quick-custom" className="sr-only">
                Custom amount
              </label>
              <input
                id="quick-custom"
                inputMode="numeric"
                placeholder={`Other (${currency})`}
                value={custom}
                onChange={(e) => setCustom(e.target.value.replace(/[^0-9]/g, ""))}
                className="w-28 rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink focus:border-brand focus:outline-none"
              />
            </div>

            <button type="submit" className="btn btn-donation shrink-0 py-2.5 px-5 text-[14px]">
              Donate Now <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
