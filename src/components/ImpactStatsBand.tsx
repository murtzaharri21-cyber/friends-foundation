export type StatIconName = "pin" | "calendar" | "funds" | "people" | "home" | "team" | "water" | "shield";

export type ImpactStatCard = {
  icon: StatIconName;
  value: string;
  label: string;
};

export function ImpactStatIcon({ name, className = "h-8 w-8" }: { name: StatIconName; className?: string }) {
  const strokeProps = {
    fill: "none",
    stroke: "#8abee0",
    strokeWidth: 2.15,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "pin":
      return (
        <svg viewBox="0 0 24 24" {...strokeProps} className={className} aria-hidden="true">
          <path d="M12 21s-6.5-5.6-6.5-10.8a6.5 6.5 0 1 1 13 0C18.5 15.4 12 21 12 21z" />
          <circle cx="12" cy="10.2" r="2.3" />
        </svg>
      );
    case "calendar":
      return (
        <svg viewBox="0 0 24 24" {...strokeProps} className={className} aria-hidden="true">
          <rect x="3" y="4.5" width="18" height="16.5" rx="2.5" />
          <path d="M8 2.8v3.4M16 2.8v3.4M3 9.5h18" />
          <path d="m9.2 14.8 2 2 4-4" />
        </svg>
      );
    case "funds":
      return (
        <svg viewBox="0 0 24 24" {...strokeProps} className={className} aria-hidden="true">
          <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
          <circle cx="12" cy="12" r="2.8" />
          <path d="M6 9.2h.01M18 14.8h.01" />
        </svg>
      );
    case "people":
      return (
        <svg viewBox="0 0 24 24" {...strokeProps} className={className} aria-hidden="true">
          <circle cx="9" cy="8.5" r="3" />
          <path d="M3.5 19c.6-2.9 2.8-4.6 5.5-4.6s4.9 1.7 5.5 4.6" />
          <circle cx="16.8" cy="9.5" r="2.3" />
          <path d="M16.2 14.6c2.2.2 3.8 1.6 4.3 4.1" />
        </svg>
      );
    case "home":
      return (
        <svg viewBox="0 0 24 24" {...strokeProps} className={className} aria-hidden="true">
          <path d="M3 10.8 12 3.5l9 7.3" />
          <path d="M5.5 9.2V20h13V9.2" />
          <rect x="9.8" y="13.5" width="4.4" height="6.5" rx="0.6" />
        </svg>
      );
    case "team":
      return (
        <svg viewBox="0 0 24 24" {...strokeProps} className={className} aria-hidden="true">
          <circle cx="8.5" cy="8" r="2.6" />
          <circle cx="15.5" cy="8" r="2.6" />
          <path d="M3.5 19.2c.5-2.7 2.4-4.2 5-4.2 1.5 0 2.8.5 3.5 1.4.7-.9 2-1.4 3.5-1.4 2.6 0 4.5 1.5 5 4.2" />
        </svg>
      );
    case "water":
      return (
        <svg viewBox="0 0 24 24" {...strokeProps} className={className} aria-hidden="true">
          <path d="M12 21a6.5 6.5 0 0 0 6.5-6.5C18.5 10 12 3.2 12 3.2S5.5 10 5.5 14.5A6.5 6.5 0 0 0 12 21z" />
          <path d="M9.5 14.8a2.5 2.5 0 0 0 2.5 2.2" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" {...strokeProps} className={className} aria-hidden="true">
          <path d="M12 3 4.5 6.2v5.4c0 4.8 3.2 8.2 7.5 9.6 4.3-1.4 7.5-4.8 7.5-9.6V6.2L12 3z" />
          <path d="m9 12.2 2.1 2.1 4-4.2" />
        </svg>
      );
  }
}

export const HEADLINE_IMPACT_STATS: ImpactStatCard[] = [
  {
    icon: "people",
    value: "14.25M+",
    label: "Total beneficiaries reached",
  },
  {
    icon: "pin",
    value: "41",
    label: "Districts across 4 provinces",
  },
  {
    icon: "calendar",
    value: "24+",
    label: "Years of grassroots impact",
  },
  {
    icon: "team",
    value: "100K",
    label: "Women & children in PHC / yr",
  },
  {
    icon: "shield",
    value: "72,000",
    label: "Electoral officers trained",
  },
  {
    icon: "water",
    value: "122.7K+",
    label: "Clean water & WASH beneficiaries",
  },
];

export default function ImpactStatsBand({
  kicker = "OUR IMPACT",
  heading = "Reach across Pakistan",
  subtitle = "Twenty-four years of community-first programmes spanning Punjab, Khyber Pakhtunkhwa, Sindh, AJK, and ICT.",
  items = HEADLINE_IMPACT_STATS,
  topOverlap = false,
}: {
  kicker?: string;
  heading?: string;
  subtitle?: string;
  items?: ImpactStatCard[];
  topOverlap?: boolean;
}) {
  return (
    <section
      aria-label={heading}
      className={`impact-band-surface ${topOverlap ? "-mt-10 pt-20 pb-14 md:pt-22 md:pb-16" : "py-14 md:py-16"}`}
    >
      <div className="container-ff">
        <div className="mx-auto max-w-2xl text-center">
          {kicker && (
            <p className="font-sans text-[12px] font-extrabold tracking-[0.14em] text-brand-soft">
              {kicker}
            </p>
          )}
          <h2
            style={{ fontFamily: "var(--font-serif-title)" }}
            className="mt-2.5 text-[2rem] leading-[1.15] font-bold tracking-[-0.015em] text-white sm:text-[2.6rem] md:text-[2.95rem]"
          >
            {heading}
          </h2>
          <p className="mx-auto mt-3.5 max-w-xl text-[15.5px] leading-relaxed text-slate-200/80 sm:text-[16.5px]">
            {subtitle}
          </p>
        </div>

        {/* Single horizontal row of 6 dark glass cards on desktop, 2-col / 3-col responsive grid on smaller viewports */}
        <ul className="mt-10 grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {items.map((item) => (
            <li
              key={item.label}
              className="stat-dark-card grid grid-cols-[44px_minmax(0,1fr)] items-center gap-x-3.5 px-4 py-4 text-left xl:grid-cols-[32px_minmax(0,1fr)] xl:gap-x-2 xl:px-3"
            >
              <span className="flex items-center justify-center">
                <ImpactStatIcon name={item.icon} className="h-[31px] w-[31px]" />
              </span>
              <span className="min-w-0">
                <strong className="block font-sans text-[1.55rem] leading-[1.12] font-extrabold tracking-[-0.02em] text-white tabular-nums sm:text-[1.7rem] xl:text-[1.3rem]">
                  {item.value}
                </strong>
                <span className="mt-1 block text-[13px] leading-[1.32] text-slate-200/75">
                  {item.label}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
