import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import ImpactStatsBand, { ImpactStatIcon } from "@/components/ImpactStatsBand";
import ThematicAccordionSlider from "@/components/ThematicAccordionSlider";
import StoriesCarousel from "@/components/StoriesCarousel";
import ImpactExplorer from "@/components/ImpactExplorer";
import CampaignSpotlight from "@/components/CampaignSpotlight";
import AnimatedNumber from "@/components/AnimatedNumber";
import PartnerMarquee from "@/components/PartnerMarquee";
import AllianceDonorsBand from "@/components/AllianceDonorsBand";
import FaqAccordion from "@/components/FaqAccordion";
import ScrollRevealObserver from "@/components/ScrollRevealObserver";
import { ArrowRightIcon, CheckIcon } from "@/components/Icons";
import { devPartners, govPartners, img, regions } from "@/lib/content";
import { getSiteCms } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function Home() {
  const cms = await getSiteCms();
  const { heroSlides, impactBand, storySection, thematicSlides, healthSection, featureUpdates } = cms;

  return (
    <>
      <Header />
      <main>
        <ScrollRevealObserver />
        {/* Full-bleed Alkhidmat-style Auto-Crossfading Hero Banner + Quick Appeal Bar */}
        <HeroSlider slides={heroSlides} />

        {/* Dark Midnight-Navy Impact Numbers Band */}
        <ImpactStatsBand
          kicker={impactBand.kicker}
          heading={impactBand.heading}
          subtitle={impactBand.subtitle}
          items={impactBand.stats}
          topOverlap
        />

        {/* Story + mission */}
        <section className="py-16 md:py-24">
          <div className="container-ff grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="scroll-reveal scroll-reveal-from-left lg:col-span-7">
              <h2>{storySection.heading}</h2>
              <div className="prose-ff mt-6 text-[1.08rem] leading-[1.78] text-ink/80">
                {storySection.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
              <Link href="/about#story" className="btn btn-ghost mt-8">
                Read our story <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            <div className="scroll-reveal scroll-reveal-from-right lg:col-span-5">
              <figure className="overflow-hidden rounded-[24px] border border-line bg-white p-3 shadow-[0_20px_50px_rgba(44,117,165,0.1)]">
                <img
                  src={storySection.image}
                  alt="A community water filtration plant run with local residents"
                  loading="lazy"
                  className="aspect-[16/11] w-full rounded-[18px] object-cover"
                />
                <figcaption className="p-4 pt-3.5">
                  <span className="font-display text-lg font-bold text-deep-2">Grassroots Community Presence</span>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    Over 24 years of trusted grassroots partnerships delivering maternal healthcare, clean water, and disaster resilience across Pakistan.
                  </p>
                  <Link
                    href="/about#story"
                    className="mt-3.5 inline-flex items-center gap-1.5 text-[14px] font-bold text-brand hover:text-deep"
                  >
                    Learn more about our journey <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* AKRSP-style Expanding Vertical-Tab Thematic Slider */}
        <section className="bg-[#e8f6ee] py-16 md:py-22">
          <div className="container-ff">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
              <div className="scroll-reveal max-w-2xl">
                <h2>Thematic Areas &amp; Key Interventions</h2>
                <p className="mt-3 text-[1.06rem] text-ink/75">
                  Hover or tap any panel to explore our seven interconnected programmes — all delivered with local
                  community organisations across Pakistan.
                </p>
              </div>
              <Link href="/our-work" className="btn btn-primary">
                All programmes <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            <div className="scroll-reveal scroll-reveal-scale">
              <ThematicAccordionSlider slides={thematicSlides} />
            </div>
          </div>
        </section>

        {/* Health centres */}
        <section className="py-16 md:py-24">
          <div className="container-ff grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <figure className="scroll-reveal scroll-reveal-from-left">
              <div className="overflow-hidden rounded-[22px] border border-line bg-white p-2.5 shadow-[0_24px_60px_rgba(44,117,165,0.12)]">
                <img
                  src={healthSection.image}
                  alt={healthSection.imageCaption}
                  loading="lazy"
                  className="aspect-[6/5] w-full rounded-[16px] object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-muted">{healthSection.imageCaption}</figcaption>
            </figure>

            <div className="scroll-reveal scroll-reveal-from-right">
              <h2>{healthSection.heading}</h2>
              <p className="mt-5 text-[1.08rem] leading-relaxed text-ink/80">{healthSection.description}</p>
              <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {healthSection.services.map((s) => (
                  <li key={s} className="flex gap-3 text-[15.5px] text-ink/80">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-bright" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <div className="impact-band-surface mt-8 grid grid-cols-1 gap-3 rounded-[20px] p-4 sm:grid-cols-3">
                {healthSection.patientStats.map((stat) => (
                  <div key={stat.label} className="stat-dark-card grid grid-cols-[36px_1fr] items-center gap-x-3 px-3.5 py-3.5">
                    <ImpactStatIcon name={stat.icon} className="h-7 w-7" />
                    <div>
                      <strong className="block font-sans text-xl leading-none font-extrabold text-white tabular-nums">
                        <AnimatedNumber value={stat.value} />
                      </strong>
                      <span className="mt-1 block text-[12.5px] leading-snug text-slate-200/75">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/our-work/integrated-health" className="btn btn-primary mt-8">
                About our health work <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <CampaignSpotlight />

        {/* Latest Projects & Field Interventions (with Flood 2025 Spotlight) */}
        <section className="border-y border-line/60 bg-gradient-to-b from-mist/70 to-white py-16 md:py-24">
          <div className="container-ff">
            {/* Flood 2025 Priority Alert Banner */}
            <div className="scroll-reveal mb-10 overflow-hidden rounded-2xl border border-red-200 bg-gradient-to-r from-white via-white to-red-50 p-6 text-ink shadow-[0_14px_36px_rgba(127,29,29,0.08)]">
              <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div className="flex min-w-0 items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-700 ring-1 ring-inset ring-red-200">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v10M7 12h10" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="inline-block rounded-full bg-red-100 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-red-800">
                        Priority Relief Intervention
                      </span>
                      <span className="text-xs text-muted">Emergency Field Response · 2025</span>
                    </div>
                    <h3 className="mt-1 text-xl font-bold text-ink sm:text-2xl">
                      Flood 2025: Emergency Medical Camps &amp; Clean Water
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-ink/75">
                      Frontline disaster response across flood-affected union councils in South Punjab, Khyber Pakhtunkhwa, and Sindh: providing emergency medical care, 3,468 hygiene kits, and emergency safe water supplies.
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap gap-3">
                  <Link href="/donate?purpose=Emergency+relief" className="btn btn-donation shadow-lg">
                    Support Flood 2025 Relief
                  </Link>
                  <Link href="/our-work/humanitarian" className="btn btn-ghost">
                    Humanitarian Work
                  </Link>
                </div>
              </div>
            </div>

            <div className="scroll-reveal flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-brand">Field Operations &amp; Impact</span>
                <h2 className="mt-1">Latest Projects &amp; Field Interventions</h2>
                <p className="mt-3 text-[1.06rem] text-ink/75">
                  Health camps, safe water systems, Flood 2025 recovery, maternal healthcare, and girls’ schooling across Pakistan.
                </p>
              </div>
              <Link href="/media" className="btn btn-ghost">
                Full photo gallery <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            <div className="scroll-reveal scroll-reveal-scale mt-8">
              <StoriesCarousel items={featureUpdates} />
            </div>
          </div>
        </section>

        {/* How could you help — 100% Pakistan photography */}
        <section className="py-16 md:py-24">
          <div className="container-ff grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="scroll-reveal scroll-reveal-from-left space-y-4 lg:col-span-6">
              <figure>
                <div className="overflow-hidden rounded-[24px] ring-1 ring-line">
                  <img
                    src="/images/appeal/pk-gwadar-girl.jpg"
                    alt="A young girl sitting against a weathered mud-plaster wall in Gwadar, Balochistan, Pakistan"
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-[13px] text-muted">
                  Gwadar, Balochistan · Photo: Hanif Ali Baluch / Pexels
                </figcaption>
              </figure>

              <div className="grid grid-cols-2 gap-4">
                <figure>
                  <img
                    src="/images/appeal/pk-swat-shepherd-boy.jpg"
                    alt="A young shepherd boy resting on a rock in Swat Valley, Pakistan"
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-[18px] object-cover ring-1 ring-line"
                  />
                  <figcaption className="mt-1.5 text-[12.5px] text-muted">Swat Valley, KP · Amjad ali</figcaption>
                </figure>
                <figure>
                  <img
                    src="/images/appeal/pk-punjab-jalalpur-children.jpg"
                    alt="Children outside brick homes in Jalalpur Pirwala, South Punjab, Pakistan"
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-[18px] object-cover ring-1 ring-line"
                  />
                  <figcaption className="mt-1.5 text-[12.5px] text-muted">Jalalpur Pirwala, Punjab · Kashif Shah</figcaption>
                </figure>
              </div>
            </div>

            <div className="scroll-reveal scroll-reveal-from-right lg:col-span-6">
              <h2>How could you help families in Pakistan?</h2>
              <p className="mt-4 text-[1.08rem] leading-relaxed text-ink/80">
                From Gwadar and rural Sindh to South Punjab and Swat, millions of Pakistani families live one illness or
                one monsoon flood away from crisis. Your contribution puts a doctor, a working hand pump or a classroom
                within reach.
              </p>

              <ul className="mt-7 divide-y divide-line border-y border-line">
                {[
                  {
                    title: "Give once or every month (PKR, USD, GBP, EUR)",
                    text: "Overseas and local donors welcome — monthly gifts keep our three Rawalpindi health centres open all year.",
                    href: "/donate",
                  },
                  {
                    title: "Direct your Zakat, Sadaqah or fund a project",
                    text: "Sponsor a village hand pump, a mobile health camp, flood winter kits, or a girls’ literacy class.",
                    href: "/help",
                  },
                  {
                    title: "Give medicines & relief supplies in kind",
                    text: "Essential medicines, clean delivery kits, winter blankets, food parcels, school books and water tanks.",
                    href: "/help",
                  },
                  {
                    title: "Volunteer or partner across Pakistan",
                    text: "Doctors, Lady Health Visitors, teachers, WASH engineers, CSR teams and development partners.",
                    href: "/contact",
                  },
                ].map((w) => (
                  <li key={w.title}>
                    <Link href={w.href} className="group flex gap-4 py-4">
                      <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mist text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                        <ArrowRightIcon className="h-3.5 w-3.5" />
                      </span>
                      <span>
                        <span className="block font-display text-[1.05rem] font-bold text-deep-2 group-hover:text-brand">
                          {w.title}
                        </span>
                        <span className="mt-0.5 block text-[15px] leading-relaxed text-ink/70">{w.text}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/donate" className="btn btn-donation">
                  Donate in PKR or USD
                </Link>
                <Link href="/help" className="btn btn-ghost">
                  All 8 ways to help
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Key Achievements interactive explorer */}
        <section className="impact-band-surface py-16 md:py-22">
          <div className="container-ff">
            <div className="scroll-reveal mx-auto mb-10 max-w-2xl text-center">
              <h2
                style={{ fontFamily: "var(--font-serif-title)" }}
                className="text-[2rem] leading-[1.15] font-bold text-white sm:text-[2.5rem]"
              >
                Verified results across our work
              </h2>
              <p className="mt-3 text-[16px] text-slate-200/80">
                Select any programme area below to explore clinics, clean water points, trainings and emergency kits delivered.
              </p>
            </div>

            <div className="scroll-reveal scroll-reveal-scale">
              <ImpactExplorer />
            </div>

            <div className="scroll-reveal mt-9 text-center">
              <Link href="/how-we-work#accomplishments" className="btn btn-light">
                See all 12 accomplishments <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <AllianceDonorsBand />

        {/* Two distinct full-width partner scrolling rows */}
        {/* Government Partners Section (Green) */}
        <PartnerMarquee
          theme="green"
          eyebrow="Institutional Collaboration"
          heading="Governmental Partners"
          description="Working alongside federal, provincial, and municipal authorities, health secretariats, and disaster management bodies across Pakistan."
          partners={govPartners.map((partner) => ({ ...partner, logo: img(partner.logo) }))}
        />

        {/* NGO & INGO Partners Section (Blue) */}
        <PartnerMarquee
          theme="blue"
          eyebrow="Multilateral Alliances"
          heading="Partner NGO & INGOs"
          description="Trusted long-term partnerships with leading international development agencies, multilateral donors, and national humanitarian networks."
          partners={devPartners.map((partner) => ({ ...partner, logo: img(partner.logo) }))}
        />

        {/* Where we work */}
        <section className="py-16 md:py-24">
          <div className="container-ff grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="scroll-reveal scroll-reveal-from-left lg:col-span-5">
              <h2>Where we work across Pakistan</h2>
              <p className="mt-5 text-[1.08rem] leading-relaxed text-ink/80">
                From Rawalpindi’s low-income neighbourhoods to flood-prone villages in South Punjab, displacement camps in
                Khyber Pakhtunkhwa and earthquake-hit Azad Jammu &amp; Kashmir.
              </p>
              <dl className="mt-7 space-y-3.5">
                {regions.map((r) => (
                  <div key={r.name} className="rounded-[14px] border border-line bg-white px-4 py-3">
                    <dt className="font-sans text-[14.5px] font-extrabold text-deep-2">{r.name}</dt>
                    <dd className="mt-0.5 text-[14px] text-muted">{r.places.join(" · ")}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/how-we-work#where-we-work" className="btn btn-primary mt-8">
                Geographical outreach <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            <figure className="scroll-reveal scroll-reveal-from-right lg:col-span-7">
              <div className="overflow-hidden rounded-[24px] border border-line bg-white p-3 shadow-[0_24px_60px_rgba(44,117,165,0.12)]">
                <a href={img("geomap.jpeg")} target="_blank" rel="noopener noreferrer">
                  <img
                    src={img("geomap.jpeg")}
                    alt="Map of the districts across Pakistan where Friends Foundation has worked"
                    loading="lazy"
                    className="w-full rounded-[16px] bg-mist"
                  />
                </a>
              </div>
              <figcaption className="mt-3 text-sm text-muted">
                Friends Foundation’s footprint across Pakistan. Click to enlarge.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Frequently Asked Questions Accordion */}
        <section className="border-t border-line bg-mist/50 py-16 md:py-24">
          <div className="container-ff">
            <div className="scroll-reveal mx-auto mb-10 max-w-2xl text-center">
              <span className="eyebrow eyebrow-blue">Questions &amp; Answers</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-deep-2 md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-[1.05rem] text-slate-600">
                Learn more about how we work, how donations are utilised, and how we reach families across Pakistan.
              </p>
            </div>

            <div className="scroll-reveal scroll-reveal-scale mx-auto max-w-3xl">
              <FaqAccordion
                items={[
                  {
                    category: "Outreach & Footprint",
                    question: "Where does Friends Foundation work across Pakistan?",
                    answer:
                      "Founded in Rawalpindi after the 2001 flash floods, Friends Foundation operates across Punjab, Khyber Pakhtunkhwa, Sindh, Balochistan, and Azad Jammu & Kashmir. We run three permanent family health centres in Rawalpindi slums (Akal Garh, Mohan Pura, and Mohallah Raja Sultan) and active field programmes for clean water, flood relief, non-formal girls' education, and democratic empowerment.",
                  },
                  {
                    category: "Governance & Registration",
                    question: "Is Friends Foundation an officially registered and audited non-profit?",
                    answer:
                      "Yes. Friends Foundation is officially registered under the Societies Registration Act XXI of 1860, holds Category 'A' certification from the Punjab Charity Commission, and maintains approved Economic Affairs Division (EAD) clearances for international collaborations. Our accounts undergo independent annual statutory audits by reputable chartered accountancy firms.",
                  },
                  {
                    category: "Donations & Zakat",
                    question: "Can I direct my donation to a specific cause or Zakat?",
                    answer:
                      "Absolutely. You can designate your support for where it is needed most, our three maternal & child health centres, community clean water filtration & hand pumps, crisis relief kits, or non-formal girls’ schools. We also maintain a dedicated, Shariah-separated Zakat bank account exclusively for eligible recipients.",
                  },
                  {
                    category: "Payment Methods",
                    question: "What currencies and payment methods can I use?",
                    answer:
                      "We accept local donations in PKR via direct bank transfer, fee-free Raast instant transfers, JazzCash, EasyPaisa, SadaPay, and NayaPay. For overseas donors in the UK, US, Europe, Canada, and the Gulf, we accept USD, GBP, and EUR via international SWIFT bank wire, Wise, and Remitly directly into our official foreign currency accounts.",
                  },
                  {
                    category: "Sustainability",
                    question: "How does Friends Foundation ensure projects last after delivery?",
                    answer:
                      "Social mobilisation is our core methodology. Rather than delivering outside handouts, we establish community committees composed of local elders, women activists, and youth. They receive hands-on training to operate, maintain, and protect community assets (such as water filtration plants, hand pumps, and clinic services) for long-term sustainability.",
                  },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Get involved CTA */}
        <section className="relative overflow-hidden bg-deep text-white">
          <img
            src="/images/appeal/pk-madyan-flood-child.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(17,50,73,0.92) 0%, rgba(20,60,87,0.78) 100%)",
            }}
            aria-hidden="true"
          />
          <div className="container-ff relative flex flex-col items-start gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
            <div className="scroll-reveal scroll-reveal-from-left max-w-xl">
              <h2 className="text-white">Give families health care, clean water and hope</h2>
              <p className="mt-4 text-[1.08rem] leading-relaxed text-white/85">
                Give in Pakistani rupees or US dollars, direct your Zakat, sponsor a village water point, or volunteer your
                skills with our field teams.
              </p>
            </div>
            <div className="scroll-reveal scroll-reveal-from-right flex shrink-0 flex-wrap gap-3">
              <Link href="/donate" className="btn btn-donation">
                Donate in PKR or USD
              </Link>
              <Link href="/help" className="btn btn-light">
                Other ways to help
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
