import Link from "next/link";
import CareersPageShell from "@/components/CareersPageShell";
import { MailIcon } from "@/components/Icons";
import { getSiteCms } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function TendersPage() {
  const { careersSection: careers } = await getSiteCms();

  return (
    <CareersPageShell title={careers.tendersTitle} intro={careers.tendersIntro}>
      <section className="py-14 md:py-20">
        <div className="container-prose space-y-5">
          {careers.tenders.length === 0 ? (
            <div className="card border-l-4 border-l-brand-bright p-6 sm:p-9" role="status">
              <p className="eyebrow eyebrow-blue">{careers.tendersEyebrow}</p>
              <h2 className="mt-3 text-2xl">{careers.tendersHeading}</h2>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-ink/75">{careers.noTendersMessage}</p>
              <a href={`mailto:${careers.tenderContactEmail}`} className="btn btn-primary mt-6">
                <MailIcon className="h-4 w-4" /> {careers.tenderContactButtonLabel}
              </a>
              <p className="mt-3 text-sm text-muted">{careers.tenderContactEmail}</p>
            </div>
          ) : (
            careers.tenders.map((tender, index) => (
              <article key={`${tender.reference || tender.title}-${index}`} className="card border-l-4 border-l-brand-bright p-6 sm:p-9">
                <p className="eyebrow eyebrow-blue">{careers.tendersEyebrow}</p>
                <h2 className="mt-3 text-2xl">{tender.title || `Tender notice ${index + 1}`}</h2>
                <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                  {tender.reference && <div><dt className="inline font-bold">Reference: </dt><dd className="inline">{tender.reference}</dd></div>}
                  {tender.deadline && <div><dt className="inline font-bold">Submission deadline: </dt><dd className="inline">{tender.deadline}</dd></div>}
                </dl>
                {tender.description && <p className="mt-4 whitespace-pre-line leading-relaxed text-ink/75">{tender.description}</p>}
                {tender.documentUrl && (
                  <a href={tender.documentUrl} className="btn btn-primary mt-6" target="_blank" rel="noreferrer">
                    View tender documents
                  </a>
                )}
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
