import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { CheckIcon } from "@/components/Icons";
import { ImpactStatIcon, type StatIconName } from "@/components/ImpactStatsBand";
import { accomplishments, gateways, img, meStages, otherAccomplishments, principles, regions } from "@/lib/content";

const ACCOMPLISHMENT_ICONS: StatIconName[] = [
  "calendar",
  "team",
  "shield",
  "water",
  "shield",
  "home",
  "water",
  "shield",
  "people",
  "calendar",
  "water",
  "team",
];
import { getSiteCms } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "How we work",
  description:
    "Social mobilisation, monitoring and evaluation, where we work and what we have delivered — the way Friends Foundation Pakistan runs its programmes.",
};

export default async function HowWeWorkPage() {
  const { siteInfo } = await getSiteCms();
  return (
    <>
      <Header />
      <main>
        <PageHeader
          title="How we work"
          intro="Everything we do runs through the communities themselves. Local people help decide what is needed, take part in delivering it and look after it once we have gone."
          image={img("n1.jpg")}
          crumbs={[{ label: "Home", href: "/" }, { label: "How we work" }]}
        />

        {/* Social mobilisation */}
        <section id="social-mobilisation" className="py-16 md:py-24">
          <div className="container-ff">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <h2 className="text-3xl md:text-4xl">Social mobilisation</h2>
                <p className="mt-5 text-[17.5px] leading-relaxed text-slate-700">
                  Social mobilisation is the backbone of our strategy. Before any project starts, we connect with the people
                  a community already trusts — activists, elders, religious leaders and opinion makers — and work through
                  them. That trust is what lets a small team reach a whole district.
                </p>
              </div>
              <ol className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-7">
                {principles.map((p, i) => (
                  <li key={p.title} className="flex gap-4">
                    <span className="font-display text-2xl font-bold text-brand">{i + 1}</span>
                    <div>
                      <h3 className="text-lg">{p.title}</h3>
                      <p className="mt-1 text-[15.5px] leading-relaxed text-slate-600">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <h3 className="mt-16 text-2xl md:text-3xl">Three ways into a community</h3>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {gateways.map((g) => (
                <div key={g.title} className="rounded-[18px] border border-line border-t-4 border-t-brand-bright bg-white p-6">
                  <h4 className="text-xl">{g.title}</h4>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-slate-700">{g.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* M&E */}
        <section id="monitoring-evaluation" className="bg-mist/70 py-16 md:py-24">
          <div className="container-ff">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl">Monitoring and evaluation</h2>
              <p className="mt-4 text-lg text-slate-600">
                We follow every programme through five stages, so we can show what it achieved, fix what is not working and
                carry the lessons into the next project.
              </p>
            </div>
            <ol className="mt-12 grid gap-8 md:grid-cols-5 md:gap-6">
              {meStages.map((s, i) => (
                <li key={s.title} className="relative">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-bright font-display text-lg font-bold text-white">
                      {i + 1}
                    </span>
                    {i < meStages.length - 1 && <span className="hidden h-px flex-1 bg-line md:block" aria-hidden="true" />}
                  </div>
                  <h3 className="mt-4 text-lg">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Where we work */}
        <section id="where-we-work" className="py-16 md:py-24">
          <div className="container-ff grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-4xl">Where we work</h2>
              <p className="mt-4 text-[17.5px] leading-relaxed text-slate-700">
                From the slums of Rawalpindi to flood-prone villages in South Punjab, displacement camps in Khyber
                Pakhtunkhwa and earthquake-hit Azad Jammu &amp; Kashmir. Our head office is in{" "}
                {siteInfo.offices[0]?.place || "Islamabad"}, with a field office in{" "}
                {siteInfo.offices[1]?.place || "Multan"}.
              </p>
              <dl className="mt-8 space-y-5">
                {regions.map((r) => (
                  <div key={r.name}>
                    <dt className="font-semibold text-deep-2">{r.name}</dt>
                    <dd className="mt-1 text-[15.5px] text-slate-600">{r.places.join(" · ")}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <figure className="lg:col-span-7">
              <a href={img("geomap.jpeg")} target="_blank" rel="noopener noreferrer" className="block rounded-[20px] border border-line bg-white p-2.5">
                <img src={img("geomap.jpeg")} alt="Map of the districts where Friends Foundation has worked" loading="lazy" className="w-full" />
              </a>
              <figcaption className="mt-3 text-sm text-slate-500">Friends Foundation’s footprint across Pakistan. Click to enlarge.</figcaption>
            </figure>
          </div>
        </section>

        {/* Accomplishments — deep-blue icon stat cards */}
        <section id="accomplishments" className="impact-band-surface py-16 text-white md:py-24">
          <div className="container-ff">
            <div className="mx-auto max-w-2xl text-center">
              <h2
                style={{ fontFamily: "var(--font-serif-title)" }}
                className="text-[2.1rem] leading-[1.15] font-bold text-white md:text-[2.75rem]"
              >
                Accomplishments across Pakistan
              </h2>
              <p className="mt-3.5 text-[16.5px] text-slate-200/80">
                Totals delivered across community clinics, clean water schemes, training sessions and disaster response.
              </p>
            </div>
            <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {accomplishments.map((a, i) => (
                <li
                  key={a.label}
                  className="stat-dark-card grid grid-cols-[44px_1fr] items-center gap-x-3.5 px-4.5 py-5 text-left"
                >
                  <span className="flex items-center justify-center">
                    <ImpactStatIcon name={ACCOMPLISHMENT_ICONS[i % ACCOMPLISHMENT_ICONS.length]} className="h-8 w-8" />
                  </span>
                  <span className="min-w-0">
                    <strong className="block font-sans text-[1.65rem] leading-[1.12] font-extrabold tracking-[-0.02em] text-white tabular-nums">
                      {a.value}
                    </strong>
                    <span className="mt-1 block text-[13.5px] leading-[1.34] text-slate-200/75">{a.label}</span>
                  </span>
                </li>
              ))}
            </ul>
            <ul className="mt-10 grid gap-3 border-t border-white/14 pt-8 sm:grid-cols-2">
              {otherAccomplishments.map((o) => (
                <li key={o} className="flex gap-3 text-slate-200/85">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-soft" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-14">
          <div className="container-ff flex flex-col items-start justify-between gap-6 border-l-4 border-brand-bright pl-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl">Explore our programmes</h2>
              <p className="mt-1 text-slate-600">Read about each of our seven areas of work in detail.</p>
            </div>
            <Link href="/our-work" className="btn btn-primary shrink-0">
              What we do
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
