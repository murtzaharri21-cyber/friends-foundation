"use client";

import { useState } from "react";
import { CheckIcon } from "./Icons";

export default function FooterFeedbackTab() {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("General Feedback");
  const [rating, setRating] = useState(5);
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
    setRating(5);
    setSubmitted(false);
    setIsOpen(false);
  };

  return (
    <div className="w-full border-b border-white/15 bg-[#174663]">
      <div className="container-ff py-3.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cream-deep/20 text-cream-deep">
              💬
            </span>
            <span className="text-[14.5px] font-medium text-white/90">
              We value your opinion: Share suggestions, report issues, or tell us about your experience with our field work.
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[13px] font-bold text-white transition-all hover:border-white hover:bg-white/20 hover:text-white"
          >
            <span>{isOpen ? "Close Feedback Tab" : "💬 Open Feedback Tab"}</span>
            <svg
              className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Collapsible Feedback Panel */}
        {isOpen && (
          <div className="mt-4 rounded-2xl border border-white/20 bg-deep p-5 text-white shadow-xl transition-all duration-300 sm:p-6">
            {submitted ? (
              <div className="flex flex-col items-center py-6 text-center">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckIcon className="h-6 w-6" />
                </span>
                <h3 className="mt-3 text-lg font-bold text-white">Thank You for Your Feedback!</h3>
                <p className="mt-1.5 max-w-md text-sm text-white/80">
                  Your feedback helps us continuously improve our community health centres, clean water delivery, and field interventions.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-white/25"
                >
                  Send another response
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">Feedback &amp; Grievance Redressal</h3>
                    <p className="text-xs text-white/70">
                      In line with our Grievance &amp; PSEA policies, all submissions are reviewed by our Monitoring &amp; Evaluation team.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-white/70 mr-1">Experience:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="text-lg transition-transform hover:scale-125 focus:outline-none"
                        aria-label={`${star} star`}
                      >
                        {star <= rating ? "★" : "☆"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                      Feedback Type
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-white/20 bg-[#163850] px-3 py-2 text-sm text-white focus:border-brand-soft focus:outline-none"
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
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tariq Mehmood"
                      className="mt-1 w-full rounded-lg border border-white/20 bg-[#163850] px-3 py-2 text-sm text-white placeholder-white/40 focus:border-brand-soft focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                      Email or Phone (Optional)
                    </label>
                    <input
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="e.g. 0300-1234567 or email"
                      className="mt-1 w-full rounded-lg border border-white/20 bg-[#163850] px-3 py-2 text-sm text-white placeholder-white/40 focus:border-brand-soft focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                    Your Comments / Suggestions *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you think or how we can improve our services and community programmes..."
                    className="mt-1 w-full rounded-lg border border-white/20 bg-[#163850] px-3 py-2 text-sm text-white placeholder-white/40 focus:border-brand-soft focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <p className="text-[11.5px] text-white/60">
                    Need confidential assistance? You can also email{" "}
                    <a href="mailto:friendsfoundation@ffpak.org.pk" className="underline hover:text-white">
                      friendsfoundation@ffpak.org.pk
                    </a>{" "}
                    or call +92-51-4444394.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting || !message.trim()}
                    className="btn btn-donation py-2 px-5 text-sm font-bold shadow-md disabled:opacity-50"
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

