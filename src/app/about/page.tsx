import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ImpactStatsBand from "@/components/ImpactStatsBand";
import FaqAccordion from "@/components/FaqAccordion";
import { board, certificates, facts, img, keyPolicies, memberships, registration, staff, unSdgs } from "@/lib/content";
import { getSiteCms } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About us",
  description:
    "How a flood in Rawalpindi in 2001 led to Friends Foundation Pakistan — our story, vision and mission, registration, board and team.",
};

function initials(name: string) {
  return name
    .replace(/^(Dr|Adv|Mr|Mrs|Ms)\.?\s+/i, "")
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default async function AboutPage() {
  const { impactBand, storySection } = await getSiteCms();
  const { vision, mission } = storySection;
  return (
    <>
      <Header />
      <main>
        <PageHeader
          title="About us"
          intro="Friends Foundation was started in 2001 by people who had just lived through a flood. More than twenty years on, the idea is the same: help should reach people where they live."
          image={img("n5.jpg")}
          crumbs={[{ label: "Home", href: "/" }, { label: "About us" }]}
        />

        {/* Story */}
        <section id="story" className="py-16 md:py-24">
          <div className="container-ff grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-3xl md:text-4xl">Our story</h2>
              <div className="prose-ff mt-6 text-[17.5px] leading-[1.75] text-slate-700">
                <p>
                  In 2001, flash floods hit Rawalpindi. The Nullah Lai overflowed and destroyed hundreds of homes along its
                  banks. Muhammad Abbas Gondal, who was among those affected, and a group of friends set up free medical
                  camps in the hardest-hit areas and kept them running around the clock.
                </p>
                <p>
                  When the water went down, the need did not. The camps grew into three primary health centres in the
                  city’s slums — in Akal Garh, Mohan Pura and Mohallah Raja Sultan — which have since become
                  self-sustaining and still serve those neighbourhoods today.
                </p>
                <p>
                  Working there showed us problems a clinic alone could not solve: unsafe water, poor sanitation, girls out
                  of school, weak local institutions and families with no protection against the next disaster. So our work
                  widened to maternal and child health, water and sanitation, education and behaviour change, democratic
                  governance and advocacy, and emergency response.
                </p>
                <p>
                  When people were displaced by conflict, we worked in the camps, providing health care, hygiene supplies,
                  food, safe drinking water and care for mothers. We have supported communities through dengue, malaria and
                  COVID-19, and when acute watery diarrhoea spread through slums in Punjab and Khyber Pakhtunkhwa, we
                  installed filtration plants and set up community committees to keep them working.
                </p>
                <p>
                  Our projects now reach underserved communities in several provinces. What has not changed is how we work:
                  through social mobilisation — organising communities, building on local resources and working with public
                  and private partners — so that change lasts after a project ends.
                </p>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="rounded-[18px] border border-line bg-mist p-6 md:p-8 lg:sticky lg:top-28">
                <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-slate-500">At a glance</h3>
                <dl className="mt-4 divide-y divide-line text-[15.5px]">
                  {facts.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-5 gap-4 py-3">
                      <dt className="col-span-2 text-slate-500">{k}</dt>
                      <dd className="col-span-3 font-semibold text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
                <figure className="mt-6">
                  <img src={img("pl67.jpeg")} alt="A community water filtration plant" loading="lazy" className="aspect-[4/3] w-full object-cover" />
                  <figcaption className="mt-2 text-sm text-slate-500">A community water filtration plant.</figcaption>
                </figure>
              </div>
            </aside>
          </div>
        </section>

        {/* Deep-blue impact numbers band */}
        <ImpactStatsBand
          kicker={impactBand.kicker}
          heading={impactBand.heading}
          subtitle={impactBand.subtitle}
          items={impactBand.stats}
        />

        {/* Vision & mission */}
        <section id="vision" className="bg-mist/60 py-16 md:py-20">
          <div className="container-ff grid gap-10 md:grid-cols-2 md:gap-14">
            <div>
              <h2 className="text-2xl">Our vision</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-700">{vision}</p>
            </div>
            <div>
              <h2 className="text-2xl">Our mission</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-700">{mission}</p>
            </div>
          </div>
        </section>

        {/* UN Sustainable Development Goals (SDGs) Alignment */}
        <section className="border-y border-line bg-white py-14">
          <div className="container-ff">
            <div className="max-w-2xl">
              <p className="font-sans text-[12px] font-extrabold uppercase tracking-[0.14em] text-brand">
                Global Commitments
              </p>
              <h2 className="mt-1 text-2xl md:text-3xl">Aligned with UN Sustainable Development Goals</h2>
              <p className="mt-2 text-[15.5px] text-slate-600">
                Our interventions across health, education, climate, and community governance contribute directly to the 2030 Agenda for Sustainable Development.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
              {unSdgs.map((sdg) => (
                <div
                  key={sdg.number}
                  className="card card-hover group overflow-hidden"
                  style={{ borderTopColor: sdg.color, borderTopWidth: 4 }}
                >
                  <Image
                    src={sdg.logo}
                    alt={`United Nations Sustainable Development Goal ${sdg.number}: ${sdg.name}`}
                    width={200}
                    height={200}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="p-3.5">
                    <p className="text-[13.5px] font-bold leading-snug text-ink">{sdg.name}</p>
                    <span className="mt-1 block text-[11.5px] font-semibold text-slate-500">SDG Goal {sdg.number}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="policies" className="bg-mist/60 py-16 md:py-20">
          <div className="container-ff">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="font-sans text-[12px] font-extrabold uppercase tracking-[0.14em] text-brand">
                  Governance &amp; Safeguards
                </p>
                <h2 className="mt-1 text-2xl md:text-3xl">Our policies and safeguards</h2>
                <p className="mt-2 text-[15.5px] text-slate-600">
                  Open any policy to learn how we protect people, manage donor resources, and ensure transparency. Each policy is formalized in our institutional manual.
                </p>
              </div>

              <div className="shrink-0">
                <a
                  href="/docs/friends-foundation-profile-and-policies.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary inline-flex items-center gap-2"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download Policy Document (PDF)
                </a>
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <FaqAccordion
                allowMultiple
                defaultOpenIndex={null}
                items={keyPolicies.slice(0, 5).map((p) => ({
                  category: "Institutional Safeguard",
                  question: p.name,
                  answer: p.desc,
                  link: {
                    label: "View in Official PDF (Page 8)",
                    href: "/docs/friends-foundation-profile-and-policies.pdf#page=8",
                    external: true,
                  },
                }))}
              />
              <FaqAccordion
                allowMultiple
                defaultOpenIndex={null}
                items={keyPolicies.slice(5).map((p) => ({
                  category: "Governance & Operations",
                  question: p.name,
                  answer: p.desc,
                  link: {
                    label: "View in Official PDF (Page 8)",
                    href: "/docs/friends-foundation-profile-and-policies.pdf#page=8",
                    external: true,
                  },
                }))}
              />
            </div>
          </div>
        </section>

        {/* Registration & memberships */}
        <section id="registration" className="py-16 md:py-24">
          <div className="container-ff">
            <h2 className="text-3xl md:text-4xl">Registration and memberships</h2>
            <p className="mt-3 max-w-2xl text-lg text-slate-600">
              We are a registered non-profit, and our finances are open to scrutiny by the authorities that oversee us.
            </p>

            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {registration.map((r) => (
                <li key={r.title} className="card flex gap-4 p-5">
                  <img src={img(r.logo)} alt="" loading="lazy" className="h-16 w-16 shrink-0 object-contain" />
                  <div>
                    <h3 className="text-lg">{r.title}</h3>
                    <p className="mt-1 text-[15px] text-slate-600">{r.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-14 grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h3 className="text-2xl">Networks we belong to</h3>
                <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {memberships.map((m) => (
                    <li key={m} className="border-b border-slate-100 pb-2.5 text-[15.5px]">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-5">
                <h3 className="text-2xl">Certificates</h3>
                <div className="mt-5 grid grid-cols-2 gap-4">
                  {certificates.map((c) => (
                    <a key={c.src} href={img(c.src)} target="_blank" rel="noopener noreferrer" className="group block">
                      <img src={img(c.src)} alt={c.caption} loading="lazy" className="aspect-[3/4] w-full rounded-[14px] border border-line bg-white object-contain p-2 transition group-hover:border-brand-bright" />
                      <span className="mt-2 block text-sm text-slate-600">{c.caption}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Board & team */}
        <section id="team" className="bg-mist/70 py-16 md:py-24">
          <div className="container-ff">
            <h2 className="text-3xl md:text-4xl">Board of directors</h2>
            <ul className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {board.map((b) => (
                <li key={b.name} className="border-b border-line py-4">
                  <p className="font-display text-lg font-semibold text-deep-2">{b.name}</p>
                  <p className="text-[15px] text-slate-600">{b.role}</p>
                </li>
              ))}
            </ul>

            <h2 className="mt-16 text-3xl md:text-4xl">Head office team</h2>
            <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4">
              {staff.map((s) => (
                <li key={s.name}>
                  {s.photo ? (
                    <img src={img(s.photo)} alt={s.name} loading="lazy" className="aspect-[4/5] w-full bg-white object-cover object-top" />
                  ) : (
                    <div className="grid aspect-[4/5] w-full place-items-center bg-white" aria-hidden="true">
                      <span className="font-display text-4xl font-bold text-brand-bright">{initials(s.name)}</span>
                    </div>
                  )}
                  <p className="mt-3 font-semibold leading-snug text-ink">{s.name}</p>
                  <p className="text-[15px] text-slate-600">{s.role}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-14">
          <div className="container-ff flex flex-col items-start justify-between gap-6 border-l-4 border-brand-bright pl-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl">Want to see how we work?</h2>
              <p className="mt-1 text-slate-600">Our approach to social mobilisation, monitoring and evaluation, and where we work.</p>
            </div>
            <Link href="/how-we-work" className="btn btn-primary shrink-0">
              How we work
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
