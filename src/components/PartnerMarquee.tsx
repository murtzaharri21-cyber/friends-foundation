type Partner = { name: string; logo: string };

export default function PartnerMarquee({
  heading,
  eyebrow,
  description,
  partners,
  theme = "green",
}: {
  heading: string;
  eyebrow?: string;
  description?: string;
  partners: Partner[];
  theme?: "green" | "blue";
}) {
  const isGreen = theme === "green";

  // Create a continuous sequence of logos (repeat 3x to ensure seamless scrolling on all screen widths)
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section
      className={`relative w-full overflow-hidden py-16 md:py-20 ${
        isGreen
          ? "bg-gradient-to-br from-[#0c3823] via-[#125d3a] to-[#0a2f1d] text-white"
          : "bg-gradient-to-br from-[#0a233f] via-[#144272] to-[#07192d] text-white"
      }`}
      aria-label={heading}
    >
      {/* Subtle ambient radial highlights */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: isGreen
            ? "radial-gradient(circle at 15% 20%, rgba(74, 222, 128, 0.4) 0%, transparent 50%), radial-gradient(circle at 85% 80%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)"
            : "radial-gradient(circle at 15% 20%, rgba(56, 189, 248, 0.4) 0%, transparent 50%), radial-gradient(circle at 85% 80%, rgba(96, 165, 250, 0.3) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="container-ff scroll-reveal relative mb-10 text-center">
        {eyebrow && (
          <span
            className={`inline-block rounded-full px-3.5 py-1 text-xs font-extrabold uppercase tracking-[0.14em] ${
              isGreen
                ? "border border-emerald-400/30 bg-emerald-500/20 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                : "border border-sky-400/30 bg-sky-500/20 text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.2)]"
            }`}
          >
            {eyebrow}
          </span>
        )}
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          {heading}
        </h2>
        {description && (
          <p
            className={`mx-auto mt-3 max-w-2xl text-[15.5px] leading-relaxed ${
              isGreen ? "text-emerald-100/80" : "text-sky-100/80"
            }`}
          >
            {description}
          </p>
        )}
      </div>

      {/* Full-width scrolling row with edge fade masks */}
      <div className="partner-flow-container scroll-reveal scroll-reveal-scale group relative w-full overflow-hidden py-3">
        {/* Left & Right gradient fade masks */}
        <div
          className={`pointer-events-none absolute left-0 top-0 z-10 h-full w-16 sm:w-28 ${
            isGreen
              ? "bg-gradient-to-r from-[#0c3823] to-transparent"
              : "bg-gradient-to-r from-[#0a233f] to-transparent"
          }`}
          aria-hidden="true"
        />
        <div
          className={`pointer-events-none absolute right-0 top-0 z-10 h-full w-16 sm:w-28 ${
            isGreen
              ? "bg-gradient-to-l from-[#0a2f1d] to-transparent"
              : "bg-gradient-to-l from-[#07192d] to-transparent"
          }`}
          aria-hidden="true"
        />

        {/* Marquee track */}
        <div className="partner-flow-track flex gap-4 sm:gap-6">
          {duplicatedPartners.map((partner, idx) => (
            <div
              key={`${partner.name}-${idx}`}
              className="flex h-24 w-40 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white p-3.5 shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-1 hover:border-white hover:shadow-[0_14px_30px_rgba(0,0,0,0.3)] sm:h-28 sm:w-48 sm:p-4"
              title={partner.name}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                draggable={false}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
