"use client";

import type { CareerJob, CareerTender, CareersSectionConfig } from "@/lib/cms";

export default function CareersEditor({
  config,
  onChange,
  onSave,
  onReset,
  saving,
}: {
  config: CareersSectionConfig;
  onChange: (next: CareersSectionConfig) => void;
  onSave: () => void;
  onReset: () => void;
  saving: boolean;
}) {
  function update<K extends keyof CareersSectionConfig>(key: K, value: CareersSectionConfig[K]) {
    onChange({ ...config, [key]: value });
  }

  function updateJob(index: number, changes: Partial<CareerJob>) {
    update("jobs", config.jobs.map((job, i) => (i === index ? { ...job, ...changes } : job)));
  }

  function updateTender(index: number, changes: Partial<CareerTender>) {
    update("tenders", config.tenders.map((tender, i) => (i === index ? { ...tender, ...changes } : tender)));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl text-deep-2 sm:text-3xl">Careers, Vacancies &amp; Tenders</h1>
          <p className="mt-1 text-sm text-ink/75">Manage every public careers page, application contact, job listing and tender notice.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onReset} className="btn btn-ghost btn-sm">Reset Defaults</button>
          <button type="button" onClick={onSave} disabled={saving} className="btn btn-accent btn-sm disabled:opacity-60">
            {saving ? "Saving…" : "Save & Publish Careers"}
          </button>
        </div>
      </div>

      <section className="card space-y-5 p-5 sm:p-6">
        <div className="border-b border-line pb-3">
          <h2 className="text-xl text-deep-2">Careers overview</h2>
          <p className="mt-1 text-sm text-muted">Copy shown on /careers and its links.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Page title" value={config.overviewTitle} onChange={(v) => update("overviewTitle", v)} />
          <Field label="Section eyebrow" value={config.overviewEyebrow} onChange={(v) => update("overviewEyebrow", v)} />
          <Field label="Section heading" value={config.overviewHeading} onChange={(v) => update("overviewHeading", v)} />
          <Field label="Application email" type="email" value={config.applicationEmail} onChange={(v) => update("applicationEmail", v)} />
        </div>
        <TextField label="Page introduction" value={config.overviewIntro} onChange={(v) => update("overviewIntro", v)} />
        <TextField label="Section description" value={config.overviewDescription} onChange={(v) => update("overviewDescription", v)} />
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Programme areas (one per line)" value={config.sectors.join("\n")} onChange={(v) => update("sectors", lines(v))} rows={5} />
          <div className="space-y-4">
            <Field label="CV button label" value={config.applicationButtonLabel} onChange={(v) => update("applicationButtonLabel", v)} />
            <TextField label="Application note" value={config.applicationNote} onChange={(v) => update("applicationNote", v)} rows={2} />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Recent jobs card description" value={config.recentJobsCardDescription} onChange={(v) => update("recentJobsCardDescription", v)} rows={2} />
          <Field label="Recent jobs card link label" value={config.recentJobsCardAction} onChange={(v) => update("recentJobsCardAction", v)} />
          <TextField label="Tenders card description" value={config.tendersCardDescription} onChange={(v) => update("tendersCardDescription", v)} rows={2} />
          <Field label="Tenders card link label" value={config.tendersCardAction} onChange={(v) => update("tendersCardAction", v)} />
        </div>
      </section>

      <section className="card space-y-5 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
          <div>
            <h2 className="text-xl text-deep-2">Recent jobs</h2>
            <p className="mt-1 text-sm text-muted">Edit the page and add or remove active vacancies.</p>
          </div>
          <button
            type="button"
            onClick={() => update("jobs", [...config.jobs, { title: "", location: "", employmentType: "", deadline: "", description: "", applicationUrl: "" }])}
            className="btn btn-ghost btn-sm"
          >
            + Add Job
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Page title" value={config.recentJobsTitle} onChange={(v) => update("recentJobsTitle", v)} />
          <Field label="Status eyebrow" value={config.recentJobsEyebrow} onChange={(v) => update("recentJobsEyebrow", v)} />
        </div>
        <TextField label="Page introduction" value={config.recentJobsIntro} onChange={(v) => update("recentJobsIntro", v)} rows={2} />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Empty-list heading" value={config.recentJobsHeading} onChange={(v) => update("recentJobsHeading", v)} />
          <TextField label="Empty-list message" value={config.noJobsMessage} onChange={(v) => update("noJobsMessage", v)} rows={3} />
        </div>
        {config.jobs.length === 0 && <p className="rounded-xl bg-mist p-4 text-sm text-muted">No job listings added. The public page shows the empty-list message above.</p>}
        {config.jobs.map((job, index) => (
          <article key={`job-${index}`} className="space-y-4 rounded-2xl border border-line bg-mist/35 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base text-deep-2">Job listing {index + 1}</h3>
              <button type="button" onClick={() => update("jobs", config.jobs.filter((_, i) => i !== index))} className="text-sm font-bold text-accent hover:underline">Remove</button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Position title" value={job.title} onChange={(v) => updateJob(index, { title: v })} />
              <Field label="Location" value={job.location} onChange={(v) => updateJob(index, { location: v })} />
              <Field label="Employment type" value={job.employmentType} onChange={(v) => updateJob(index, { employmentType: v })} />
              <Field label="Application deadline" value={job.deadline} onChange={(v) => updateJob(index, { deadline: v })} />
              <Field label="Application link (optional)" value={job.applicationUrl} onChange={(v) => updateJob(index, { applicationUrl: v })} />
            </div>
            <TextField label="Job description / requirements" value={job.description} onChange={(v) => updateJob(index, { description: v })} rows={4} />
          </article>
        ))}
      </section>

      <section className="card space-y-5 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
          <div>
            <h2 className="text-xl text-deep-2">Tenders</h2>
            <p className="mt-1 text-sm text-muted">Edit the public tender page and add or remove notices.</p>
          </div>
          <button
            type="button"
            onClick={() => update("tenders", [...config.tenders, { title: "", reference: "", deadline: "", description: "", documentUrl: "" }])}
            className="btn btn-ghost btn-sm"
          >
            + Add Tender
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Page title" value={config.tendersTitle} onChange={(v) => update("tendersTitle", v)} />
          <Field label="Status eyebrow" value={config.tendersEyebrow} onChange={(v) => update("tendersEyebrow", v)} />
          <Field label="Contact email" type="email" value={config.tenderContactEmail} onChange={(v) => update("tenderContactEmail", v)} />
          <Field label="Contact button label" value={config.tenderContactButtonLabel} onChange={(v) => update("tenderContactButtonLabel", v)} />
          <Field label="Empty-list heading" value={config.tendersHeading} onChange={(v) => update("tendersHeading", v)} />
        </div>
        <TextField label="Page introduction" value={config.tendersIntro} onChange={(v) => update("tendersIntro", v)} rows={2} />
        <TextField label="Empty-list message" value={config.noTendersMessage} onChange={(v) => update("noTendersMessage", v)} rows={3} />
        {config.tenders.length === 0 && <p className="rounded-xl bg-mist p-4 text-sm text-muted">No tender notices added. The public page shows the empty-list message above.</p>}
        {config.tenders.map((tender, index) => (
          <article key={`tender-${index}`} className="space-y-4 rounded-2xl border border-line bg-mist/35 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base text-deep-2">Tender notice {index + 1}</h3>
              <button type="button" onClick={() => update("tenders", config.tenders.filter((_, i) => i !== index))} className="text-sm font-bold text-accent hover:underline">Remove</button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Notice title" value={tender.title} onChange={(v) => updateTender(index, { title: v })} />
              <Field label="Reference number" value={tender.reference} onChange={(v) => updateTender(index, { reference: v })} />
              <Field label="Submission deadline" value={tender.deadline} onChange={(v) => updateTender(index, { deadline: v })} />
              <Field label="Document URL (optional)" value={tender.documentUrl} onChange={(v) => updateTender(index, { documentUrl: v })} />
            </div>
            <TextField label="Notice details" value={tender.description} onChange={(v) => updateTender(index, { description: v })} rows={3} />
          </article>
        ))}
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="field" />
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <textarea rows={rows} value={value} onChange={(event) => onChange(event.target.value)} className="field" />
    </label>
  );
}

function lines(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}
