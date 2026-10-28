"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { mainNav } from "@/lib/nav";
import { ChevronDownIcon, CloseIcon, MailIcon, MenuIcon, PhoneIcon, SocialIcon } from "./Icons";
import { useSiteConfig } from "./SiteConfigContext";

export default function Header() {
  const pathname = usePathname();
  const siteInfo = useSiteConfig();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const phoneHref = `tel:${siteInfo.phoneLabel.replace(/[^+\d]/g, "")}`;
  const matchesPath = (href: string) => {
    const path = href.split("#")[0];
    return path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);
  };
  const isItemActive = (item: (typeof mainNav)[number]) =>
    matchesPath(item.href) || Boolean(item.children?.some((child) => matchesPath(child.href)));

  return (
    <>
      {/* Utility bar */}
      <div className="bg-brand-bright text-white">
        <div className="container-ff flex min-h-10 flex-wrap items-center justify-between gap-x-6 gap-y-1 py-1.5 text-[13px]">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <a href={phoneHref} className="inline-flex items-center gap-2 font-semibold hover:text-cream-deep">
              <PhoneIcon className="h-3.5 w-3.5" />
              {siteInfo.phoneLabel}
            </a>
            <a href={`mailto:${siteInfo.email}`} className="hidden items-center gap-2 hover:text-cream-deep sm:inline-flex">
              <MailIcon className="h-3.5 w-3.5" />
              {siteInfo.email}
            </a>
          </div>
          <p className="hidden text-[11.5px] font-bold uppercase tracking-[0.12em] text-white/80 lg:block">
            Working across Pakistan since 2001
          </p>
          <div className="flex items-center">
            {siteInfo.socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15"
              >
                <SocialIcon name={s.name} className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Floating header card */}
      <header className="sticky top-0 z-50 py-2.5">
        <div className="container-ff">
          <div className="rounded-[24px] border border-line/70 bg-white/92 px-4 py-2.5 shadow-[0_16px_38px_rgba(7,18,42,0.08)] backdrop-blur-md sm:px-5">
            <div className="flex items-center justify-between gap-5">
              <Link href="/" className="flex shrink-0 items-center" aria-label={`${siteInfo.name}, home`}>
                <img
                  src={siteInfo.logo}
                  alt={siteInfo.name}
                  width={215}
                  height={70}
                  className="h-[52px] w-auto object-contain sm:h-[62px]"
                />
              </Link>

              <nav aria-label="Main" className="hidden xl:block">
                <ul className="flex items-center gap-1">
                  {mainNav.map((item) => {
                    const active = isItemActive(item);
                    return (
                      <li key={item.href} className="group relative">
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={`flex items-center gap-1 rounded-2xl px-3.5 py-2.5 text-[14.5px] font-extrabold tracking-[0.01em] transition-colors ${
                            active
                              ? "bg-mist text-brand"
                              : "text-ink/85 hover:bg-mist hover:text-brand"
                          }`}
                        >
                          {item.label}
                          {item.children && <ChevronDownIcon className="h-3.5 w-3.5 opacity-55" />}
                        </Link>
                        {item.children && (
                          <div className="invisible absolute left-0 top-full z-50 w-72 pt-2 opacity-0 transform translate-y-1 transition-all duration-200 ease-out group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0">
                            <div className="overflow-hidden rounded-[18px] border border-line bg-white py-2 shadow-[0_24px_48px_rgba(44,117,165,0.16)]">
                              {item.children.map((child) => (
                                <Link
                                  key={`${child.label}-${child.href}`}
                                  href={child.href}
                                  className="block px-5 py-2.5 text-[14.5px] font-semibold text-ink/80 transition-colors hover:bg-mist hover:text-brand"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="flex items-center gap-2.5">
                <Link href="/donate" className={`btn donate-pill donate-pill-${donationButtonColor(siteInfo.donationButtonColor)} btn-sm hidden xl:inline-flex`}>
                  <DonateButtonContent label={siteInfo.donationButtonLabel || "Donate"} />
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                  aria-label={open ? "Close menu" : "Open menu"}
                  className="grid h-11 w-11 place-items-center rounded-2xl border border-line bg-white text-deep xl:hidden"
                >
                  {open ? <CloseIcon /> : <MenuIcon />}
                </button>
              </div>
            </div>

            {open && (
              <div id="mobile-menu" className="mt-3 max-h-[70vh] overflow-y-auto border-t border-line pt-2 xl:hidden">
                <ul>
                  {mainNav.map((item) => (
                    <li key={item.href} className="border-b border-mist last:border-0">
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={`flex-1 py-3 text-[15.5px] font-extrabold ${isItemActive(item) ? "text-brand" : "text-ink"}`}
                        >
                          {item.label}
                        </Link>
                        {item.children && (
                          <button
                            type="button"
                            onClick={() => setExpanded((e) => (e === item.href ? null : item.href))}
                            aria-label={`Show ${item.label} pages`}
                            aria-expanded={expanded === item.href}
                            className="grid h-10 w-10 place-items-center rounded-full text-brand"
                          >
                            <ChevronDownIcon
                              className={`h-4 w-4 transition-transform ${expanded === item.href ? "rotate-180" : ""}`}
                            />
                          </button>
                        )}
                      </div>
                      {item.children && expanded === item.href && (
                        <ul className="pb-3 pl-2">
                          {item.children.map((child) => (
                            <li key={`${child.label}-${child.href}`}>
                              <Link
                                href={child.href}
                                onClick={() => setOpen(false)}
                                className="block rounded-xl px-3 py-2 text-[14.5px] font-semibold text-muted hover:bg-mist hover:text-brand"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
                <Link href="/donate" onClick={() => setOpen(false)} className={`btn donate-pill donate-pill-${donationButtonColor(siteInfo.donationButtonColor)} mt-4 w-full`}>
                  <DonateButtonContent label={siteInfo.donationButtonLabel || "Donate"} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

function donationButtonColor(value: string | undefined) {
  return ["green", "blue", "red", "purple"].includes(value || "") ? value : "red";
}

function DonateButtonContent({ label }: { label: string }) {
  return (
    <>
      <span className="donate-heart" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M12 21s-8.25-4.76-8.25-11.1A4.65 4.65 0 0 1 12 7.16a4.65 4.65 0 0 1 8.25 2.74C20.25 16.24 12 21 12 21Z" />
        </svg>
      </span>
      <span className="tracking-[0.08em]">{label}</span>
    </>
  );
}
