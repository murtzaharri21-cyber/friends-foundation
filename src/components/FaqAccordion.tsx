"use client";

import { useState, useId } from "react";

export type AccordionItem = {
  question: string;
  answer: string;
  category?: string;
};

export default function FaqAccordion({
  items,
  allowMultiple = false,
  defaultOpenIndex = 0,
}: {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIndex?: number | null;
}) {
  const baseId = useId();
  const [openIndices, setOpenIndices] = useState<number[]>(
    defaultOpenIndex !== null && defaultOpenIndex !== undefined ? [defaultOpenIndex] : []
  );

  const toggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="space-y-3.5">
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        const headerId = `${baseId}-header-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div
            key={item.question}
            className={`group rounded-2xl border bg-white transition-all duration-200 ${
              isOpen
                ? "border-brand-bright/50 shadow-[0_12px_28px_rgba(44,117,165,0.09)] ring-1 ring-brand-bright/20"
                : "border-line hover:border-brand-bright/40 hover:shadow-md"
            }`}
          >
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-brand sm:px-6 sm:py-5"
              >
                <div className="min-w-0 flex-1">
                  {item.category && (
                    <span className="mb-1.5 inline-block rounded-full bg-mist px-2.5 py-0.5 text-[11.5px] font-extrabold uppercase tracking-wider text-brand">
                      {item.category}
                    </span>
                  )}
                  <span
                    className={`block font-display text-[1.05rem] font-bold tracking-tight transition-colors duration-200 sm:text-[1.12rem] ${
                      isOpen ? "text-brand" : "text-deep-2 group-hover:text-brand"
                    }`}
                  >
                    {item.question}
                  </span>
                </div>

                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                    isOpen
                      ? "rotate-180 border-brand bg-brand text-white shadow-sm"
                      : "border-line bg-mist/60 text-brand group-hover:border-brand group-hover:bg-brand group-hover:text-white"
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m5 7.5 5 5 5-5" />
                  </svg>
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-line/70 px-5 pb-5 pt-3 text-[15px] leading-relaxed text-slate-700 sm:px-6 sm:pb-6">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
