import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import FilterableGallery from "@/components/FilterableGallery";
import { SocialIcon } from "@/components/Icons";
import {
  archivePhotos,
  caseStudies,
  categoriseCaption,
  galleryPhotos,
  img,
  pressClippings,
  suppliedProgrammePhotos,
} from "@/lib/content";
import { getSiteCms } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Media & photo gallery",
  description:
    "Photos from Friends Foundation’s health, water, education and relief work, together with press coverage and case studies.",
};

const ownPhotos = galleryPhotos.map((p) => ({
  src: img(p.src),
  caption: p.caption,
  category: categoriseCaption(p.caption),
}));
ownPhotos.push(...suppliedProgrammePhotos);

const archive = archivePhotos.map((p) => ({ src: img(p.src), caption: p.caption, category: "Archive" }));

const press = pressClippings.map((p) => ({ src: img(p.src), caption: p.caption }));

export default async function MediaPage() {
  const { pakistanGallery, siteInfo } = await getSiteCms();
  return (
    <>
      <Header />
      <main>
        <PageHeader
          eyebrow="Media"
          title="Photo gallery"
          intro="Photographs from our health camps, trainings, water projects, relief distributions and community sessions — plus press coverage and case studies."
          image={img("n13.jpg")}
          imageCaption="Monthly meeting of the District Nutrition Addressing Committee."
          crumbs={[{ label: "Home", href: "/" }, { label: "Media" }]}
        />

        <section className="py-14 md:py-20">
          <div className="container-ff">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2>Our programmes</h2>
                <p className="mt-3 max-w-2xl text-[15.5px] text-ink/75">
                  Field photographs from our programme archive, including health, clean water, education, women’s
                  empowerment, climate resilience, governance and humanitarian response.
                </p>
              </div>
              <p className="text-[14.5px] text-muted">
                {ownPhotos.length} photos · filter by theme · click any photo to enlarge
              </p>
            </div>
            <div className="mt-8">
              <FilterableGallery items={ownPhotos} />
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-white py-14 md:py-20">
          <div className="container-ff">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2>Earlier years</h2>
                <p className="mt-3 max-w-2xl text-[15.5px] text-ink/75">
                  Awareness walks, hygiene kit distributions, medical camps and community sessions from our earlier
                  programmes. Many of these are low-resolution scans from the field.
                </p>
              </div>
              <p className="text-[14.5px] text-muted">{archive.length} photos</p>
            </div>
            <div className="mt-8">
              <FilterableGallery items={archive} />
            </div>
          </div>
        </section>

        <section className="bg-mist/60 py-14 md:py-20">
          <div className="container-ff">
            <div className="max-w-3xl">
              <h2>The Pakistani communities behind the numbers</h2>
              <p className="mt-4 text-[1.06rem] leading-relaxed text-ink/75">
                From flood-hit valleys in Swat and brick-lined alleys in South Punjab to rural Sindh, Gwadar and
                Karachi’s working-class quarters — these documentary photographs from across Pakistan show the everyday
                realities of families working without a safety net.
              </p>
              <p className="mt-3 text-[14.5px] text-muted">
                Documentary photography from Punjab, Sindh, Balochistan &amp; Khyber Pakhtunkhwa (licensed via Pexels, with
                photographer and location credits on every frame).
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="card card-hover overflow-hidden md:col-span-2">
                <img
                  src="/images/appeal/pk-madyan-flood-child.jpg"
                  alt="A child looks across flood boulders and a wrecked van after flash floods in Madyan, Swat, Pakistan"
                  className="aspect-[16/9] w-full object-cover"
                />
                <div className="p-6">
                  <h3>When monsoon floods rewrite a child’s world</h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-ink/75">
                    Flash floods tear away roads, hand pumps, clinics and homes in minutes. Our mobile medical camps,
                    clean drinking water systems and winter relief kits help families survive the aftermath and rebuild.
                  </p>
                  <p className="mt-3 text-[13px] text-muted">Madyan, Swat, Khyber Pakhtunkhwa · Photo: Amjad ali / Pexels</p>
                </div>
              </div>
              <div className="card card-hover overflow-hidden">
                <img
                  src="/images/appeal/pk-balochistan-child.jpg"
                  alt="Close-up portrait of a young child in rural Balochistan, Pakistan"
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="p-6">
                  <h3>A childhood spent working instead of learning</h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-ink/75">
                    Across rural Balochistan, Sindh, Punjab and KP, children herd livestock or work street carts when
                    schools and safe water are out of reach. Non-formal classrooms give them a second chance.
                  </p>
                  <p className="mt-3 text-[13px] text-muted">Balochistan, Pakistan · Photo: Hanif Ali Baluch / Pexels</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <FilterableGallery items={pakistanGallery} showCredit />
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-[20px] border border-line bg-white p-7">
              <div>
                <h3 className="text-2xl">Help change the next photograph</h3>
                <p className="mt-2 max-w-xl text-[15.5px] text-ink/75">
                  Give in Pakistani rupees or US dollars, support a specific project, volunteer your skills or give in kind.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/donate" className="btn btn-donation">
                  Donate
                </Link>
                <Link href="/help" className="btn btn-ghost">
                  Other ways to help
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container-ff grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2>In the newspapers</h2>
              <p className="mt-3 text-[15.5px] text-ink/75">Coverage of our work in the Pakistani press.</p>
              <ul className="mt-6 grid grid-cols-3 gap-3">
                {press.map((p) => (
                  <li key={p.src}>
                    <a href={p.src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-[14px] ring-1 ring-line">
                      <img src={p.src} alt={p.caption} loading="lazy" className="aspect-[3/4] w-full bg-white object-contain p-1.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <h2>Forming community organisations</h2>
              <p className="mt-3 text-[15.5px] text-ink/75">
                Ten case studies document how community organisations were formed in District Muzaffargarh. To request a
                copy, email <a href={`mailto:${siteInfo.email}`} className="link">{siteInfo.email}</a>.
              </p>
              <ol className="mt-6 divide-y divide-line border-y border-line">
                {caseStudies.map((c, i) => (
                  <li key={c} className="flex gap-4 py-3.5 text-[15.5px]">
                    <span className="w-6 shrink-0 font-display font-bold text-brand">{i + 1}</span>
                    <span>{c}, District Muzaffargarh</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-mist/60 py-12">
          <div className="container-ff flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl">Follow our work</h2>
              <p className="mt-1 text-[15.5px] text-muted">We share updates from the field on social media.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {siteInfo.socials.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                  <SocialIcon name={s.name} /> {s.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
