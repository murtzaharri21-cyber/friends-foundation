import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { ArrowRightIcon } from "@/components/Icons";
import { ImpactStatIcon } from "@/components/ImpactStatsBand";
import { img } from "@/lib/content";
import { getSiteCms } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "How you can help",
  description:
    "Eight ways to support vulnerable families across Pakistan — donate in PKR or USD, give monthly, direct Zakat, fund a village water point, give in kind, or volunteer.",
};

const ways = [
  {
    title: "Give once",
    text: "Make a one-time contribution in Pakistani rupees, US dollars, pounds or euro. Every pledge is logged and acknowledged by our team.",
    cta: { label: "Donate now", href: "/donate" },
    image: "/images/appeal/pk-balochistan-child.jpg",
    imageAlt: "Close-up portrait of a child in rural Balochistan, Pakistan",
    credit: "Balochistan · Hanif Ali Baluch / Pexels",
  },
  {
    title: "Give every month",
    text: "Monthly gifts keep our three family health centres in Rawalpindi’s slums running all year — around PKR 22 million in annual care.",
    cta: { label: "Start a monthly gift", href: "/donate" },
    image: img("n28.jpg"),
    imageAlt: "A child receiving polio immunisation drops at a Friends Foundation clinic",
    credit: "Rawalpindi · Friends Foundation",
  },
  {
    title: "Zakat and Sadaqah",
    text: "Direct your Zakat or Sadaqah strictly to eligible families in Pakistan for healthcare, safe drinking water or winter relief.",
    cta: { label: "Give Zakat / Sadaqah", href: "/donate" },
    image: "/images/appeal/pk-elder-and-children.jpg",
    imageAlt: "An elderly Pakistani man sitting outdoors with two children",
    credit: "Pakistan · pierre matile / Pexels",
  },
  {
    title: "Fund a village project",
    text: "Sponsor a community hand pump, a water filtration plant, a mobile medical camp, or a non-formal girls’ classroom with full reporting.",
    cta: { label: "Sponsor a project", href: "/contact" },
    image: img("pl62.jpeg"),
    imageAlt: "A community hand pump installed by Friends Foundation",
    credit: "WASH Programme · Friends Foundation",
  },
  {
    title: "Give medicines & supplies",
    text: "Essential medicines, clean delivery kits, winter blankets, food rations, school books and water storage tanks for field relief.",
    cta: { label: "Offer in-kind goods", href: "/contact" },
    image: "/images/appeal/pk-karachi-grain-workers.jpg",
    imageAlt: "Workers carrying sacks of grain in Karachi, Pakistan",
    credit: "Karachi, Sindh · Wasif Mujahid / Pexels",
  },
  {
    title: "Volunteer your skills",
    text: "Doctors, nurses, Lady Health Visitors, teachers, WASH engineers, photographers and MEAL specialists are needed across Pakistan.",
    cta: { label: "Join as volunteer", href: "/contact" },
    image: img("n5.jpg"),
    imageAlt: "Friends Foundation staff and community volunteers in Rawalpindi",
    credit: "Rawalpindi · Friends Foundation",
  },
  {
    title: "Institutional & CSR partners",
    text: "Partner with an EAD-certified Category ‘A’ charity trusted by UNDP, UNICEF, WHO, USAID, the World Bank, Save the Children and WASA.",
    cta: { label: "Discuss partnership", href: "/contact" },
    image: "/images/appeal/pk-kp-chamtalai-hujra.jpg",
    imageAlt: "Traditional community elders consultation in Chamtalai, Khyber Pakhtunkhwa",
    credit: "Chamtalai, KP · Amjad ali / Pexels",
  },
  {
    title: "Share stories from Pakistan",
    text: "Share our field updates, organise a community or diaspora fundraiser abroad, or invite our team to speak at your institution.",
    cta: { label: "Explore photo stories", href: "/media" },
    image: "/images/appeal/pk-kp-doorway-girls.jpg",
    imageAlt: "Two young village girls standing in a wooden doorway in Khyber Pakhtunkhwa",
    credit: "Khyber Pakhtunkhwa · Amjad ali / Pexels",
  },
];

const whereItGoes = [
  {
    title: "Primary health centres",
    text: "Free and low-cost care for mothers, newborns and children in Akal Garh, Mohan Pura and Mohallah Raja Sultan, Rawalpindi.",
    stat: "140,000",
    statLabel: "patients treated yearly",
  },
  {
    title: "Clean drinking water",
    text: "Filtration plants, 265 hand pumps, 86 water tanks and community water committees keeping safe water flowing.",
    stat: "122.7K",
    statLabel: "people with clean water",
  },
  {
    title: "Flood & winter relief",
    text: "Hygiene kits, safe water jerry cans, winter kits and mobile medical camps across flood-hit districts of Pakistan.",
    stat: "6,564",
    statLabel: "emergency kits delivered",
  },
  {
    title: "Girls’ education & safety",
    text: "Non-formal schooling and income skills for girls who missed school, plus 48 community rescue and first-aid trainings.",
    stat: "48",
    statLabel: "community rescue trainings",
  },
];

export default async function HelpPage() {
  const { siteInfo } = await getSiteCms();
  return (
    <>
      <Header />
      <main>
        <PageHeader
          eyebrow="Get involved"
          title="How could you help?"
          intro="Behind every statistic on this site is a family in Pakistan — in Rawalpindi’s slums, flood-hit villages of Swat and Muzaffargarh, or rural Sindh and Balochistan. Here is how your support reaches them."
          image="/images/appeal/pk-swat-shepherd-boy.jpg"
          imageAlt="A young shepherd boy resting on a rock with his staff in Swat Valley, Pakistan"
          imageCaption="Swat Valley, Khyber Pakhtunkhwa, Pakistan · Photo: Amjad ali / Pexels"
          crumbs={[{ label: "Home", href: "/" }, { label: "How you can help" }]}
        />

        <section className="py-14 md:py-20">
          <div className="container-ff">
            <div className="max-w-3xl">
              <h2>Choose how you want to help</h2>
              <p className="mt-4 text-[1.06rem] leading-relaxed text-ink/75">
                Give in PKR or foreign currency, fund a village water point, donate medicines in kind, or volunteer your
                profession. Unsure where to begin? Write to{" "}
                <a href={`mailto:${siteInfo.email}`} className="link">
                  {siteInfo.email}
                </a>{" "}
                and our team in Islamabad will guide you.
              </p>
            </div>

            <div className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {ways.map((w) => (
                <article key={w.title} className="card card-hover flex flex-col overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden bg-mist">
                    <img src={w.image} alt={w.imageAlt} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3>{w.title}</h3>
                    <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-ink/75">{w.text}</p>
                    <p className="mt-3 text-[12px] text-muted">{w.credit}</p>
                    <Link
                      href={w.cta.href}
                      className="mt-3.5 inline-flex items-center gap-1.5 text-[14.5px] font-bold text-brand hover:text-deep"
                    >
                      {w.cta.label} <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-deep text-white">
          <img
            src="/images/appeal/pk-madyan-flood-child.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, rgba(17,50,73,0.92) 0%, rgba(20,60,87,0.72) 100%)" }}
            aria-hidden="true"
          />
          <div className="container-ff relative py-16 md:py-20">
            <div className="max-w-2xl">
              <h2 className="text-white">When floods hit Pakistan, vulnerable families lose everything overnight</h2>
              <p className="mt-5 text-[1.08rem] leading-relaxed text-white/85">
                From the 2001 Nullah Lai flash flood in Rawalpindi to monsoon floods across Swat, Charsadda, Kohistan,
                Muzaffargarh, Rajanpur and Sindh — Friends Foundation stays long after emergency headlines fade, turning
                relief camps into permanent clinics and community-owned water systems.
              </p>
              <p className="mt-3 text-[13.5px] text-white/60">
                Background photograph: Madyan, Swat, Pakistan · Amjad ali / Pexels
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/donate" className="btn btn-donation">
                  Donate in PKR or USD
                </Link>
                <Link href="/contact" className="btn btn-light">
                  Talk to our team
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container-ff">
            <div className="impact-band-surface rounded-[26px] p-7 sm:p-10">
              <div className="mx-auto max-w-2xl text-center">
                <h2
                  style={{ fontFamily: "var(--font-serif-title)" }}
                  className="text-[2rem] leading-[1.15] font-bold text-white sm:text-[2.45rem]"
                >
                  Four direct outcomes across Pakistan
                </h2>
                <p className="mt-3 text-[15.5px] text-slate-200/80">
                  Every contribution supports community-run clinics, clean water points, emergency kits and girls’ education.
                </p>
              </div>
              <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {(["people", "water", "shield", "team"] as const).map((iconName, idx) => {
                  const w = whereItGoes[idx];
                  return (
                    <div key={w.title} className="stat-dark-card p-5">
                      <div className="grid grid-cols-[40px_1fr] items-center gap-x-3.5">
                        <ImpactStatIcon name={iconName} className="h-8 w-8" />
                        <div>
                          <strong className="block font-sans text-[1.65rem] leading-none font-extrabold text-white tabular-nums">
                            {w.stat}
                          </strong>
                          <span className="mt-1 block text-[12.5px] text-slate-200/75">{w.statLabel}</span>
                        </div>
                      </div>
                      <h3 className="mt-4 text-lg text-white">{w.title}</h3>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-200/80">{w.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <figure>
                <img
                  src="/images/appeal/pk-gwadar-girl.jpg"
                  alt="A young girl in Gwadar, Balochistan, Pakistan"
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-[16px] object-cover ring-1 ring-line"
                />
                <figcaption className="mt-2 text-[13px] text-muted">Gwadar, Balochistan · Hanif Ali Baluch / Pexels</figcaption>
              </figure>
              <figure>
                <img
                  src="/images/appeal/pk-sindh-kandiaro-goat-herder.jpg"
                  alt="A young child herding goats beside a canal in Kandiāro, Sindh, Pakistan"
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-[16px] object-cover ring-1 ring-line"
                />
                <figcaption className="mt-2 text-[13px] text-muted">Kandiāro, Sindh · Saeed Ahmed Abbasi / Pexels</figcaption>
              </figure>
              <figure>
                <img
                  src={img("pl43.jpg")}
                  alt="Traditional birth attendants at an orientation session run by Friends Foundation in Rawalpindi"
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-[16px] object-cover ring-1 ring-line"
                />
                <figcaption className="mt-2 text-[13px] text-muted">Rawalpindi · Friends Foundation field archive</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="bg-mist/60 py-14">
          <div className="container-ff flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl">Ready to support a family in Pakistan?</h2>
              <p className="mt-1 max-w-xl text-[15.5px] text-ink/75">
                Pledge online in PKR, USD, GBP or EUR — our team responds promptly with verified bank transfer details.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/donate" className="btn btn-donation">
                Donate now
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
