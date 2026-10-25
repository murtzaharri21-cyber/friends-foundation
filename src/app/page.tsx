import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import ImpactStatsBand, { ImpactStatIcon } from "@/components/ImpactStatsBand";
import ThematicAccordionSlider from "@/components/ThematicAccordionSlider";
import StoriesCarousel from "@/components/StoriesCarousel";
import ImpactExplorer from "@/components/ImpactExplorer";
import CampaignSpotlight from "@/components/CampaignSpotlight";
import { ArrowRightIcon, CheckIcon } from "@/components/Icons";
import { devPartners, govPartners, img, regions } from "@/lib/content";
import { getSiteCms } from "@/lib/cms";

export const dynamic = "force-dynamic";

const allPartners = [...devPartners, ...govPartners];

export default async function Home() {
  const cms = await getSiteCms();
  const { heroSlides, impactBand, storySection, thematicSlides, healthSection, featureUpdates } = cms;

  return (
    <>
      <Header />
      <main>
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
            <div className="lg:col-span-7">
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

            <div className="lg:col-span-5">
              <div className="card overflow-hidden">
                <img
                  src={storySection.image}
                  alt="A community water filtration plant run with local residents"
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="p-6">
                  <h3>Our mission</h3>
                  <p className="mt-3 text-[1.02rem] leading-relaxed text-ink/80">{storySection.mission}</p>
                  <Link
                    href="/about#vision"
                    className="mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-bold text-brand hover:text-deep"
                  >
                    Vision &amp; mission <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AKRSP-style Expanding Vertical-Tab Thematic Slider */}
        <section className="bg-[#e8f6ee] py-16 md:py-22">
          <div className="container-ff">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h2>Thematic Areas</h2>
                <p className="mt-3 text-[1.06rem] text-ink/75">
                  Hover or tap any panel to explore our seven interconnected programmes — all delivered with local
                  community organisations across Pakistan.
                </p>
              </div>
              <Link href="/our-work" className="btn btn-primary">
                All programmes <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            <ThematicAccordionSlider slides={thematicSlides} />
          </div>
        </section>

        {/* Health centres */}
        <section className="py-16 md:py-24">
          <div className="container-ff grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <figure>
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

            <div>
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
                        {stat.value}
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

        {/* Feature Updates Carousel */}
        <section className="bg-mist/60 py-16 md:py-24">
          <div className="container-ff">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h2>Stories &amp; work from the field</h2>
                <p className="mt-3 text-[1.06rem] text-ink/75">
                  Health camps, safe water committees, flood recovery and girls’ schooling across Pakistan.
                </p>
              </div>
              <Link href="/media" className="btn btn-ghost">
                Full photo gallery <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8">
              <StoriesCarousel items={featureUpdates} />
            </div>
          </div>
        </section>

        {/* How could you help — 100% Pakistan photography */}
        <section className="py-16 md:py-24">
          <div className="container-ff grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="space-y-4 lg:col-span-6">
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

            <div className="lg:col-span-6">
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
            <div className="mx-auto mb-10 max-w-2xl text-center">
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

            <ImpactExplorer />

            <div className="mt-9 text-center">
              <Link href="/how-we-work#accomplishments" className="btn btn-light">
                See all 12 accomplishments <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Partners marquee */}
        <section className="border-y border-line bg-white py-14 md:py-16">
          <div className="container-ff">
            <h2 className="text-center">Current &amp; past partners</h2>
          </div>
          <div className="marquee-wrap mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
            <div className="marquee-track gap-4 pr-4">
              {[...allPartners, ...allPartners].map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  className="flex h-24 w-44 shrink-0 items-center justify-center rounded-[16px] border border-line bg-white p-4"
                  title={p.name}
                >
                  <img src={img(p.logo)} alt={p.name} loading="lazy" className="max-h-14 w-auto max-w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
          <p className="container-ff mt-8 text-center text-[15px] text-muted">
            Government departments, UN agencies, international NGOs and universities — including UNDP, UNICEF, WHO, USAID,
            the World Bank, Concern Worldwide, Save the Children, Aurat Foundation and WASA.
          </p>
        </section>

        {/* Where we work */}
        <section className="py-16 md:py-24">
          <div className="container-ff grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
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

            <figure className="lg:col-span-7">
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
            <div className="max-w-xl">
              <h2 className="text-white">Give families health care, clean water and hope</h2>
              <p className="mt-4 text-[1.08rem] leading-relaxed text-white/85">
                Give in Pakistani rupees or US dollars, direct your Zakat, sponsor a village water point, or volunteer your
                skills with our field teams.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
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
