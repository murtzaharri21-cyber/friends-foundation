import Link from "next/link";
import { ArrowRightIcon } from "./Icons";
import { hpvCampaign2025 } from "@/lib/content";

const vaccinatedCounts = [
  { label: "UC Gulshan-e-5 Faiz", value: Number(hpvCampaign2025.vaccinatedGulshan.replaceAll(",", "")) },
  { label: "UC Dera Muhammadi", value: Number(hpvCampaign2025.vaccinatedDera.replaceAll(",", "")) },
];

const chartMax = Math.max(...vaccinatedCounts.map((item) => item.value));

export default function CampaignSpotlight() {
  return (
    <section className="bg-[#eaf7f6] py-16 md:py-20" aria-labelledby="hpv-campaign-heading">
      <div className="container-ff grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow eyebrow-blue">Campaign spotlight · 2025 · Multan</p>
          <h2 id="hpv-campaign-heading" className="mt-3">
            Taking HPV vaccination outreach into underserved communities
          </h2>
          <p className="mt-5 text-[1.06rem] leading-relaxed text-ink/80">
            {hpvCampaign2025.description}
          </p>
          <p className="mt-4 text-sm font-semibold text-deep-2">
            In partnership with {hpvCampaign2025.partner}.
          </p>
          <Link href="/our-work/integrated-health" className="btn btn-primary mt-7">
            Explore our health work <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="card p-5 sm:p-7">
          <figure aria-labelledby="hpv-chart-title">
            <figcaption id="hpv-chart-title" className="font-display text-lg font-bold text-deep-2">
              Girls vaccinated by union council
            </figcaption>
            <p className="mt-1 text-sm text-muted">Reported 2025 campaign figures · girls aged 9–14</p>

            <ul className="mt-6 space-y-5">
              {vaccinatedCounts.map((item) => (
                <li key={item.label}>
                  <div className="mb-2 flex items-baseline justify-between gap-3">
                    <span className="text-sm font-semibold text-ink">{item.label}</span>
                    <strong className="shrink-0 text-lg font-extrabold tabular-nums text-brand">
                      {item.value.toLocaleString()}
                    </strong>
                  </div>
                  <div
                    className="h-3 overflow-hidden rounded-full bg-mist"
                    role="progressbar"
                    aria-label={`${item.label}: ${item.value.toLocaleString()} girls vaccinated`}
                    aria-valuemin={0}
                    aria-valuemax={chartMax}
                    aria-valuenow={item.value}
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand to-brand-bright"
                      style={{ width: `${(item.value / chartMax) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </figure>

          <dl className="mt-7 grid grid-cols-2 gap-3 border-t border-line pt-5">
            <div className="rounded-2xl bg-mist/70 p-4">
              <dt className="text-xs font-bold leading-snug text-muted">People reached through outreach</dt>
              <dd className="mt-1 text-2xl font-extrabold tabular-nums text-deep-2">{hpvCampaign2025.totalReached}</dd>
            </div>
            <div className="rounded-2xl bg-mist/70 p-4">
              <dt className="text-xs font-bold leading-snug text-muted">School refusals reversed</dt>
              <dd className="mt-1 text-2xl font-extrabold tabular-nums text-deep-2">{hpvCampaign2025.refusalsReversed}</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-muted">Figures reported in the Friends Foundation 2025 profile.</p>
        </div>
      </div>
    </section>
  );
}
