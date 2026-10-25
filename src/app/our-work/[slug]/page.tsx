import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Gallery from "@/components/Gallery";
import { ArrowRightIcon, CheckIcon, ChevronLeftIcon } from "@/components/Icons";
import { ImpactStatIcon } from "@/components/ImpactStatsBand";
import { img } from "@/lib/content";
import { getSiteCms } from "@/lib/cms";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

const resolveImg = (s: string) => (s.startsWith("/") || s.startsWith("http") ? s : img(s));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { areas } = await getSiteCms();
  const area = areas.find((a) => a.slug === slug);
  if (!area) return { title: "Not found" };
  return { title: area.title, description: area.summary };
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const { areas, siteInfo } = await getSiteCms();
  const index = areas.findIndex((a) => a.slug === slug);
  if (index === -1) notFound();

  const area = areas[index];
  const prev = areas[(index - 1 + areas.length) % areas.length];
  const next = areas[(index + 1) % areas.length];

  return (
    <>
      <Header />
      <main>
        <PageHeader
          title={area.title}
          intro={area.summary}
          crumbs={[{ label: "Home", href: "/" }, { label: "What we do", href: "/our-work" }, { label: area.title }]}
        />

        <div className="container-ff grid gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
          <article className="lg:col-span-8">
            <figure>
              <img src={resolveImg(area.image)} alt={area.imageCaption} className="aspect-[16/10] w-full object-cover" />
              <figcaption className="mt-3 text-sm text-slate-500">{area.imageCaption}</figcaption>
            </figure>

            <div className="prose-ff mt-10 text-[17.5px] leading-[1.8] text-slate-700">
              {area.body.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>

            {area.figures.length > 0 && (
              <section className="impact-band-surface mt-14 rounded-[22px] p-6 sm:p-8">
                <h2
                  style={{ fontFamily: "var(--font-serif-title)" }}
                  className="text-2xl font-bold text-white md:text-3xl"
                >
                  In numbers
                </h2>
                <ul className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {area.figures.map((f, idx) => (
                    <li
                      key={f.label}
                      className="stat-dark-card grid grid-cols-[42px_1fr] items-center gap-x-3.5 px-4 py-4"
                    >
                      <ImpactStatIcon
                        name={(["people", "water", "calendar", "shield"] as const)[idx % 4]}
                        className="h-7 w-7"
                      />
                      <div>
                        <strong className="block font-sans text-2xl leading-none font-extrabold text-white tabular-nums">
                          {f.value}
                        </strong>
                        <span className="mt-1.5 block text-[13.5px] leading-snug text-slate-200/75">{f.label}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {area.lists.map((list) => (
              <section key={list.title} className="mt-14">
                <h2 className="text-2xl md:text-3xl">{list.title}</h2>
                <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {list.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[16px]">
                      <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            {area.photos.length > 0 && (
              <section className="mt-14">
                <h2 className="text-2xl md:text-3xl">Photos</h2>
                <div className="mt-6">
                  <Gallery layout="three" photos={area.photos.map((p) => ({ src: resolveImg(p.src), caption: p.caption }))} />
                </div>
              </section>
            )}

            <nav aria-label="More programmes" className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
              <Link href={`/our-work/${prev.slug}`} className="group">
                <span className="flex items-center gap-1 text-sm text-slate-500">
                  <ChevronLeftIcon className="h-4 w-4" /> Previous
                </span>
                <span className="mt-1 block font-display text-lg font-semibold text-deep-2 group-hover:text-brand">{prev.title}</span>
              </Link>
              <Link href={`/our-work/${next.slug}`} className="group sm:text-right">
                <span className="flex items-center gap-1 text-sm text-slate-500 sm:justify-end">
                  Next <ArrowRightIcon className="h-4 w-4" />
                </span>
                <span className="mt-1 block font-display text-lg font-semibold text-deep-2 group-hover:text-brand">{next.title}</span>
              </Link>
            </nav>
          </article>

          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="card p-6">
                <h2 className="font-sans text-sm font-bold uppercase tracking-wider text-slate-500">What we do</h2>
                <ul className="mt-3 divide-y divide-slate-100">
                  {areas.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/our-work/${a.slug}`}
                        aria-current={a.slug === area.slug ? "page" : undefined}
                        className={`block py-2.5 text-[15.5px] ${
                          a.slug === area.slug ? "font-semibold text-brand" : "text-slate-700 hover:text-brand"
                        }`}
                      >
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {area.partners.length > 0 && (
                <div className="rounded-[18px] border border-line bg-mist p-6">
                  <h2 className="font-sans text-sm font-bold uppercase tracking-wider text-slate-500">Worked with</h2>
                  <ul className="mt-3 space-y-1.5 text-[15.5px] text-ink">
                    {area.partners.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-[18px] bg-deep p-6 text-white">
                <h2 className="text-xl text-white">Support this work</h2>
                <p className="mt-2 text-[15px] text-white/80">
                  Give online, or talk to us about partnering on {area.title.toLowerCase()} projects.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/donate" className="btn btn-donation">
                    Donate
                  </Link>
                  <a href={`mailto:${siteInfo.email}`} className="btn btn-light">
                    Email us
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
