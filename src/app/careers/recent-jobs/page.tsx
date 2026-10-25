import Link from "next/link";
import CareersPageShell from "@/components/CareersPageShell";
import { MailIcon } from "@/components/Icons";
import { getSiteCms } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function RecentJobsPage() {
  const { careersSection: careers } = await getSiteCms();

  return (
    <CareersPageShell title={careers.recentJobsTitle} intro={careers.recentJobsIntro}>
      <section className="py-14 md:py-20">
        <div className="container-prose space-y-5">
          {careers.jobs.length === 0 ? (
            <div className="card border-l-4 border-l-brand-bright p-6 sm:p-9" role="status">
              <p className="eyebrow eyebrow-blue">{careers.recentJobsEyebrow}</p>
              <h2 className="mt-3 text-2xl">{careers.recentJobsHeading}</h2>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-ink/75">{careers.noJobsMessage}</p>
              <a href={`mailto:${careers.applicationEmail}?subject=${encodeURIComponent("CV for future opportunities")}`} className="btn btn-primary mt-6">
                <MailIcon className="h-4 w-4" /> {careers.applicationButtonLabel}
              </a>
              <p className="mt-3 text-sm text-muted">{careers.applicationEmail}</p>
            </div>
          ) : (
            careers.jobs.map((job, index) => (
              <article key={`${job.title}-${index}`} className="card border-l-4 border-l-brand-bright p-6 sm:p-9">
                <p className="eyebrow eyebrow-blue">{careers.recentJobsEyebrow}</p>
                <h2 className="mt-3 text-2xl">{job.title || `Position ${index + 1}`}</h2>
                <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                  {job.location && <div><dt className="inline font-bold">Location: </dt><dd className="inline">{job.location}</dd></div>}
                  {job.employmentType && <div><dt className="inline font-bold">Type: </dt><dd className="inline">{job.employmentType}</dd></div>}
                  {job.deadline && <div><dt className="inline font-bold">Deadline: </dt><dd className="inline">{job.deadline}</dd></div>}
                </dl>
                {job.description && <p className="mt-4 whitespace-pre-line leading-relaxed text-ink/75">{job.description}</p>}
                <a
                  href={job.applicationUrl || `mailto:${careers.applicationEmail}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
                  className="btn btn-primary mt-6"
                  target={job.applicationUrl?.startsWith("http") ? "_blank" : undefined}
                  rel={job.applicationUrl?.startsWith("http") ? "noreferrer" : undefined}
                >
                  Apply for this position
                </a>
              </article>
            ))
          )}
          <p className="pt-1 text-sm text-muted">
            Return to <Link href="/careers" className="link">Job Opportunities</Link> for the careers overview.
          </p>
        </div>
      </section>
    </CareersPageShell>
  );
}
