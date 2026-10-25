import Link from "next/link";
import CareersPageShell from "@/components/CareersPageShell";
import { ArrowRightIcon, MailIcon } from "@/components/Icons";
import { getSiteCms } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function CareersPage() {
  const { careersSection } = await getSiteCms();
  const careers = careersSection;

  return (
    <CareersPageShell title={careers.overviewTitle} intro={careers.overviewIntro}>
      <section className="py-14 md:py-20">
        <div className="container-ff">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow eyebrow-blue">{careers.overviewEyebrow}</p>
            <h2 className="mt-3">{careers.overviewHeading}</h2>
            <p className="mt-4 text-[1.06rem] leading-relaxed text-ink/75">{careers.overviewDescription}</p>
            {careers.sectors.length > 0 && (
              <ul className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Areas of work">
                {careers.sectors.map((sector) => (
                  <li key={sector} className="rounded-full bg-mist px-3 py-1.5 text-sm font-semibold text-deep">
                    {sector}
                  </li>
                ))}
              </ul>
            )}
            <a href={`mailto:${careers.applicationEmail}`} className="btn btn-primary mt-7">
              <MailIcon className="h-4 w-4" /> {careers.applicationButtonLabel}
            </a>
            <p className="mt-2 text-sm text-muted">{careers.applicationNote}</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <article className="card card-hover p-6 sm:p-8">
              <h3>Recent jobs</h3>
              <p className="mt-3 leading-relaxed text-ink/75">{careers.recentJobsCardDescription}</p>
              <Link href="/careers/recent-jobs" className="mt-5 inline-flex items-center gap-2 font-bold text-brand hover:text-deep">
                {careers.recentJobsCardAction} <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </article>
            <article className="card card-hover p-6 sm:p-8">
              <h3>Tenders</h3>
              <p className="mt-3 leading-relaxed text-ink/75">{careers.tendersCardDescription}</p>
              <Link href="/careers/tenders" className="mt-5 inline-flex items-center gap-2 font-bold text-brand hover:text-deep">
                {careers.tendersCardAction} <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </article>
          </div>
        </div>
      </section>
    </CareersPageShell>
  );
}
