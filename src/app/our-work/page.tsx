import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ThematicAccordionSlider from "@/components/ThematicAccordionSlider";
import { ImpactStatIcon } from "@/components/ImpactStatsBand";
import { img } from "@/lib/content";
import { getSiteCms } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "What we do",
  description:
    "Integrated health, water and sanitation, women empowerment, education, climate resilience, governance and humanitarian response.",
};

export default async function OurWorkPage() {
  const { areas, thematicSlides } = await getSiteCms();
  const resolveImg = (s: string) => (s.startsWith("/") || s.startsWith("http") ? s : img(s));
  return (
    <>
      <Header />
      <main>
        <PageHeader
          title="What we do"
          intro="Our work covers seven connected areas. A family that gets clean water, a health centre nearby and a voice in local decisions is far better placed to cope with the next flood."
          image={img("pl41.jpg")}
          crumbs={[{ label: "Home", href: "/" }, { label: "What we do" }]}
        />

        <section className="bg-[#e8f6ee] py-14 md:py-18">
          <div className="container-ff">
            <h2 className="mb-8">Explore our seven thematic areas</h2>
            <ThematicAccordionSlider slides={thematicSlides} />
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container-ff space-y-16 md:space-y-24">
            {areas.map((a, i) => (
              <article key={a.slug} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                <Link href={`/our-work/${a.slug}`} className={`group block overflow-hidden rounded-[18px] bg-slate-100 ${i % 2 ? "md:order-2" : ""}`}>
                  <img
                    src={resolveImg(a.image)}
                    alt={a.imageCaption}
                    loading={i < 2 ? "eager" : "lazy"}
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </Link>
                <div>
                  <h2 className="text-3xl">
                    <Link href={`/our-work/${a.slug}`} className="hover:text-brand">
                      {a.title}
                    </Link>
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-slate-700">{a.summary}</p>
                  {a.figures.length > 0 && (
                    <ul className="impact-band-surface mt-6 grid gap-3 rounded-[18px] p-3.5 sm:grid-cols-3">
                      {a.figures.slice(0, 3).map((f, idx) => (
                        <li key={f.label} className="stat-dark-card grid grid-cols-[34px_1fr] items-center gap-x-2.5 px-3 py-3">
                          <ImpactStatIcon
                            name={(["people", "calendar", "water"] as const)[idx % 3]}
                            className="h-6 w-6"
                          />
                          <div className="min-w-0">
                            <strong className="block font-sans text-xl leading-none font-extrabold text-white tabular-nums">
                              {f.value}
                            </strong>
                            <span className="mt-1 block text-[12px] leading-snug text-slate-200/75">{f.label}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link href={`/our-work/${a.slug}`} className="btn btn-ghost mt-7">
                    Learn more
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
