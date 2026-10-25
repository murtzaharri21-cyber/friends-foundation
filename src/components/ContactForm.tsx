"use client";

import { useState } from "react";
import { site } from "@/lib/nav";

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string };

const topics = [
  "General enquiry",
  "Partnership",
  "Volunteering",
  "Media",
  "Jobs and tenders",
  "Feedback or complaint",
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      form.reset();
      setStatus({ state: "sent" });
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  if (status.state === "sent") {
    return (
      <div className="mt-6 rounded-[16px] border-l-4 border-brand-bright bg-mist p-5" role="status">
        <p className="font-semibold text-deep-2">Thank you — your message has reached us.</p>
        <p className="mt-1 text-[15px] text-slate-600">A member of our team will get back to you by email.</p>
        <button type="button" onClick={() => setStatus({ state: "idle" })} className="link mt-3 text-[15px]">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">Your name</label>
          <input id="name" name="name" required autoComplete="name" className="field" />
        </div>
        <div>
          <label htmlFor="email" className="label">Email address</label>
          <input id="email" name="email" type="email" required autoComplete="email" className="field" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="label">
            Phone <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className="field" />
        </div>
        <div>
          <label htmlFor="topic" className="label">What is it about?</label>
          <select id="topic" name="topic" className="field" defaultValue={topics[0]}>
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="label">Message</label>
        <textarea id="message" name="message" required rows={6} className="field" />
      </div>

      {status.state === "error" && (
        <p className="border-l-4 border-red-500 bg-red-50 px-4 py-3 text-[15px] text-red-800" role="alert">
          {status.message} You can also email us at{" "}
          <a href={`mailto:${site.email}`} className="underline">{site.email}</a>.
        </p>
      )}

      <button type="submit" disabled={status.state === "sending"} className="btn btn-primary disabled:opacity-60">
        {status.state === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
