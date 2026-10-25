"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PhoneIcon, MailIcon } from "@/components/Icons";

export default function AdminLoginGate({ siteName, logo }: { siteName: string; logo: string }) {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", passcode }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(json.error || "Invalid passcode.");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#ffffff",
        backgroundImage:
          "linear-gradient(178deg, #eef5fb 0%, #ffffff 55%), radial-gradient(circle at 88% 8%, rgba(54,143,201,0.12), transparent 44%)",
      }}
    >
      {/* Matching Main Website Sky-Blue Utility Bar */}
      <div className="bg-brand-bright text-white">
        <div className="container-ff flex min-h-10 items-center justify-between py-1.5 text-[13px]">
          <span className="inline-flex items-center gap-2 font-semibold">
            <PhoneIcon className="h-3.5 w-3.5" />
            {siteName} · Admin Access
          </span>
          <Link href="/?view=site" className="inline-flex items-center gap-1.5 font-semibold hover:underline">
            <MailIcon className="h-3.5 w-3.5" />
            Public Website →
          </Link>
        </div>
      </div>

      <div className="container-ff flex min-h-[calc(100vh-44px)] items-center justify-center py-12">
        <div className="card w-full max-w-md p-8">
          <div className="flex items-center gap-3.5 border-b border-line pb-5">
            <img src={logo} alt={siteName} className="h-12 w-auto object-contain" />
            <div>
              <h1 className="text-xl text-deep-2">Website Admin</h1>
              <p className="text-xs text-muted">{siteName}</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="admin-passcode" className="label">
                Admin Passcode
              </label>
              <input
                id="admin-passcode"
                type="password"
                required
                autoFocus
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter your passcode"
                className="field"
              />
            </div>

            {error && (
              <p className="rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-3 text-xs font-bold text-accent-dark">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className="btn btn-primary w-full disabled:opacity-60">
              {loading ? "Signing in…" : "Open Admin Dashboard"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/?view=site" className="text-xs font-bold text-brand hover:underline">
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
