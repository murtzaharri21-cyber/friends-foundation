"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon } from "./Icons";
import { ImpactStatIcon, type StatIconName } from "./ImpactStatsBand";

const PILLARS: {
  key: string;
  label: string;
  headline: string;
  headlineUnit: string;
  summary: string;
  href: string;
  metrics: { icon: StatIconName; value: string; label: string }[];
}[] = [
  {
    key: "health",
    label: "Health & Nutrition",
    headline: "140,000",
    headlineUnit: "patients treated every year",
    summary:
      "Three self-sustaining family health centres in Akal Garh, Mohan Pura and Mohallah Raja Sultan plus mobile camps for rural and displaced families.",
    href: "/our-work/integrated-health",
    metrics: [
      { icon: "calendar", value: "160", label: "Medical & mobile health camps" },
      { icon: "team", value: "30", label: "Birth attendant trainings" },
      { icon: "shield", value: "80", label: "Clean delivery kits distributed" },
      { icon: "people", value: "300K", label: "Reached on HIV awareness" },
    ],
  },
  {
    key: "wash",
    label: "Clean Water & WASH",
    headline: "122.7K",
    headlineUnit: "people with safe water & sanitation",
    summary:
      "WASA-partnered filtration plants, village hand pumps and community water committees across Rawalpindi, Mansehra, South Punjab and KP.",
    href: "/our-work/wash",
    metrics: [
      { icon: "water", value: "265", label: "Hand pumps installed" },
      { icon: "shield", value: "250", label: "Water quality tests completed" },
      { icon: "home", value: "86", label: "Community water tanks built" },
      { icon: "pin", value: "10", label: "Filtration plants rehabilitated" },
    ],
  },
  {
    key: "relief",
    label: "Flood & Crisis Relief",
    headline: "6,564",
    headlineUnit: "emergency hygiene & winter kits delivered",
    summary:
      "Rapid emergency response in flood-hit Muzaffargarh, Dera Ghazi Khan, Rajanpur, Charsadda, Kohistan, Sindh and earthquake-affected AJK.",
    href: "/our-work/humanitarian",
    metrics: [
      { icon: "shield", value: "3,468", label: "Hygiene kits distributed" },
      { icon: "home", value: "3,096", label: "Winter kits for flood families" },
      { icon: "water", value: "300", label: "Safe water jerry cans" },
      { icon: "team", value: "48", label: "First aid & rescue trainings" },
    ],
  },
  {
    key: "community",
    label: "Women, Education & Civic",
    headline: "3M+",
    headlineUnit: "citizens reached across Pakistan",
    summary:
      "Women on water committees, non-formal schooling for out-of-school girls with UNICEF & FPAP, and voter education with UNDP & ECP.",
    href: "/our-work/women-empowerment",
    metrics: [
      { icon: "calendar", value: "20", label: "Training-of-trainers sessions" },
      { icon: "water", value: "15", label: "Women-led water supply schemes" },
      { icon: "pin", value: "20+", label: "Districts across Pakistan" },
      { icon: "funds", value: "375M", label: "Invested in community welfare (PKR)" },
    ],
  },
];

export default function ImpactExplorer() {
  const [selected, setSelected] = useState(0);
  const current = PILLARS[selected];

  return (
    <div>
      {/* Clean underlined tabs on the deep-blue impact surface */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 border-b border-white/14" role="tablist" aria-label="Key achievement categories">
        {PILLARS.map((p, i) => {
          const isCurrent = i === selected;
          return (
            <button
              key={p.key}
              type="button"
              role="tab"
              aria-selected={isCurrent}
              onClick={() => setSelected(i)}
              className={`-mb-px border-b-2 pb-3 text-[15px] font-bold transition-colors ${
                isCurrent
                  ? "border-brand-soft text-brand-soft"
                  : "border-transparent text-slate-300/75 hover:border-white/40 hover:text-white"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Focal dark glass card + 4 dark glass icon stat cards */}
      <div className="mt-9 grid items-center gap-6 lg:grid-cols-12">
        <div className="stat-dark-card p-7 lg:col-span-5">
          <p className="font-sans text-4xl font-extrabold tracking-[-0.02em] text-white tabular-nums md:text-5xl">
            {current.headline}
          </p>
          <p className="mt-1.5 text-base font-bold text-brand-soft">{current.headlineUnit}</p>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-200/80">{current.summary}</p>
          <Link
            href={current.href}
            className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-bold text-white hover:text-brand-soft"
          >
            View full programme <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
          {current.metrics.map((m) => (
            <li
              key={m.label}
              className="stat-dark-card grid grid-cols-[44px_1fr] items-center gap-x-4 px-5 py-5 text-left"
            >
              <span className="flex items-center justify-center">
                <ImpactStatIcon name={m.icon} className="h-8 w-8" />
              </span>
              <span className="min-w-0">
                <strong className="block font-sans text-[1.65rem] leading-[1.12] font-extrabold tracking-[-0.02em] text-white tabular-nums">
                  {m.value}
                </strong>
                <span className="mt-1 block text-[13.5px] leading-[1.34] text-slate-200/75">
                  {m.label}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
