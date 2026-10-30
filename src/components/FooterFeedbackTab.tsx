"use client";

import { useState } from "react";
import { CheckIcon } from "./Icons";

export default function FooterFeedbackTab() {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("General Feedback");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    // Simulate brief sending transition
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    setMessage("");
    setName("");
    setContact("");
    setRating(0);
    setHoverRating(0);
    setSubmitted(false);
    setIsOpen(false);
  };

  return (
    <div className="w-full border-y border-white/10 bg-gradient-to-r from-deep via-brand to-[#205d80]">
      <div className="container-ff py-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3.5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-cream-deep/30 bg-white/10 text-cream-deep shadow-inner">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H6l-3 2v-5.5A7.5 7.5 0 1 1 20 11.5Z" />
                <path d="M8 11h8M8 14.5h5" />
              </svg>
            </span>
            <div>
              <p className="text-sm font-bold tracking-wide text-white">Your voice matters</p>
              <p className="mt-0.5 max-w-2xl text-[13px] leading-relaxed text-white/75 sm:text-[13.5px]">
                Share a suggestion, report an issue, or tell us about your experience with our field work.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cream-deep px-4 py-2 text-[13px] font-extrabold text-deep shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_9px_22px_rgba(0,0,0,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream-deep"
          >
            <span>{isOpen ? "Close feedback" : "Share feedback"}</span>
            <svg
              className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Collapsible Feedback Panel */}
        {isOpen && (
          <div className="mt-4 rounded-2xl border border-line bg-white p-5 text-ink shadow-[0_18px_48px_rgba(7,18,42,0.18)] transition-all duration-300 sm:p-6">
            {submitted ? (
              <div className="flex flex-col items-center py-6 text-center">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-mist text-brand">
                  <CheckIcon className="h-6 w-6" />
                </span>
                <h3 className="mt-3 text-lg font-bold text-deep">Thank You for Your Feedback!</h3>
                <p className="mt-1.5 max-w-md text-sm text-muted">
                  Your feedback helps us continuously improve our community health centres, clean water delivery, and field interventions.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 rounded-full bg-mist px-4 py-1.5 text-xs font-bold text-brand transition hover:bg-line/60"
                >
                  Send another response
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
                  <div>
                    <h3 className="text-base font-bold text-deep">Feedback &amp; Grievance Redressal</h3>
                    <p className="text-xs text-muted">
                      In line with our Grievance &amp; PSEA policies, all submissions are reviewed by our Monitoring &amp; Evaluation team.{" "}
                      <a
                        href="/docs/friends-foundation-profile-and-policies.pdf#page=8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-brand underline underline-offset-2 hover:text-deep"
                      >
                        Read the policies (PDF)
                      </a>
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-1.5"
                    role="group"
                    aria-label="Rate your experience"
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <span className="mr-1 text-xs text-muted">Experience:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          setRating(star);
                          setHoverRating(0);
                        }}
                        onMouseEnter={() => setHoverRating(star)}
                        onFocus={() => setHoverRating(star)}
                        onBlur={() => setHoverRating(0)}
                        aria-pressed={rating === star}
                        className={`text-lg transition-transform hover:scale-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-bright ${
                          star <= (hoverRating || rating) ? "text-amber-500" : "text-ink/25"
                        }`}
                        aria-label={`${star} ${star === 1 ? "star" : "stars"}`}
                      >
                        {star <= (hoverRating || rating) ? "★" : "☆"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-deep/75">
                      Feedback Type
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-line bg-mist px-3 py-2 text-sm text-ink focus:border-brand-bright focus:outline-none focus:ring-2 focus:ring-brand-bright/20"
                    >
                      <option value="General Feedback">General Feedback</option>
                      <option value="Health Centres Experience">Health Centres Experience</option>
                      <option value="Clean Water & WASH">Clean Water &amp; WASH</option>
                      <option value="Disaster Relief (Flood 2025)">Disaster Relief (Flood 2025)</option>
                      <option value="Website & Transparency">Website &amp; Transparency</option>
                      <option value="Confidential Grievance">Confidential Grievance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-deep/75">
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tariq Mehmood"
                      className="mt-1 w-full rounded-lg border border-line bg-mist px-3 py-2 text-sm text-ink placeholder-muted/70 focus:border-brand-bright focus:outline-none focus:ring-2 focus:ring-brand-bright/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-deep/75">
                      Email or Phone (Optional)
                    </label>
                    <input
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="e.g. 0300-1234567 or email"
                      className="mt-1 w-full rounded-lg border border-line bg-mist px-3 py-2 text-sm text-ink placeholder-muted/70 focus:border-brand-bright focus:outline-none focus:ring-2 focus:ring-brand-bright/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-deep/75">
                    Your Comments / Suggestions *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you think or how we can improve our services and community programmes..."
                    className="mt-1 w-full rounded-lg border border-line bg-mist px-3 py-2 text-sm text-ink placeholder-muted/70 focus:border-brand-bright focus:outline-none focus:ring-2 focus:ring-brand-bright/20"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <p className="text-[11.5px] text-muted">
                    Need confidential assistance? You can also email{" "}
                    <a href="mailto:friendsfoundation@ffpak.org.pk" className="font-semibold text-brand underline hover:text-deep">
                      friendsfoundation@ffpak.org.pk
                    </a>{" "}
                    or call +92-51-4444394.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting || !message.trim()}
                    className="btn btn-primary px-5 py-2 text-sm font-bold shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
