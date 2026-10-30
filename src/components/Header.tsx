"use client";

import Link from "next/link";
import Image from "next/image";
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
            {siteInfo.headerTagline || "Working across Pakistan since 2001"}
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
      <header className="sticky top-0 z-50">
        {/* Animated ECG lifeline above the navigation */}
        <div className="header-lifeline-wrap" aria-hidden="true">
          <svg
            viewBox="0 0 720 32"
            preserveAspectRatio="none"
            className="header-lifeline-wave"
            fill="none"
            aria-hidden="true"
          >
            <g className="header-lifeline-trace">
              <g stroke="#ff2525" strokeWidth="4.5" opacity=".58">
                <path d="M0 16 H34 C39 16 40 13 43 11 C46 9 48 15 51 16 H56 L61 6 C63 1 65 1 66 6 L71 27 C72 31 74 31 76 26 L81 14 C83 10 85 11 87 14 C89 17 91 17 95 16 H120 M120 16 H154 C159 16 160 13 163 11 C166 9 168 15 171 16 H176 L181 6 C183 1 185 1 186 6 L191 27 C192 31 194 31 196 26 L201 14 C203 10 205 11 207 14 C209 17 211 17 215 16 H240 M240 16 H274 C279 16 280 13 283 11 C286 9 288 15 291 16 H296 L301 6 C303 1 305 1 306 6 L311 27 C312 31 314 31 316 26 L321 14 C323 10 325 11 327 14 C329 17 331 17 335 16 H360 M360 16 H394 C399 16 400 13 403 11 C406 9 408 15 411 16 H416 L421 6 C423 1 425 1 426 6 L431 27 C432 31 434 31 436 26 L441 14 C443 10 445 11 447 14 C449 17 451 17 455 16 H480 M480 16 H514 C519 16 520 13 523 11 C526 9 528 15 531 16 H536 L541 6 C543 1 545 1 546 6 L551 27 C552 31 554 31 556 26 L561 14 C563 10 565 11 567 14 C569 17 571 17 575 16 H600 M600 16 H634 C639 16 640 13 643 11 C646 9 648 15 651 16 H656 L661 6 C663 1 665 1 666 6 L671 27 C672 31 674 31 676 26 L681 14 C683 10 685 11 687 14 C689 17 691 17 695 16 H720" />
              </g>
              <g stroke="#ff3535" strokeWidth="2.4">
                <path d="M0 16 H34 C39 16 40 13 43 11 C46 9 48 15 51 16 H56 L61 6 C63 1 65 1 66 6 L71 27 C72 31 74 31 76 26 L81 14 C83 10 85 11 87 14 C89 17 91 17 95 16 H120 M120 16 H154 C159 16 160 13 163 11 C166 9 168 15 171 16 H176 L181 6 C183 1 185 1 186 6 L191 27 C192 31 194 31 196 26 L201 14 C203 10 205 11 207 14 C209 17 211 17 215 16 H240 M240 16 H274 C279 16 280 13 283 11 C286 9 288 15 291 16 H296 L301 6 C303 1 305 1 306 6 L311 27 C312 31 314 31 316 26 L321 14 C323 10 325 11 327 14 C329 17 331 17 335 16 H360 M360 16 H394 C399 16 400 13 403 11 C406 9 408 15 411 16 H416 L421 6 C423 1 425 1 426 6 L431 27 C432 31 434 31 436 26 L441 14 C443 10 445 11 447 14 C449 17 451 17 455 16 H480 M480 16 H514 C519 16 520 13 523 11 C526 9 528 15 531 16 H536 L541 6 C543 1 545 1 546 6 L551 27 C552 31 554 31 556 26 L561 14 C563 10 565 11 567 14 C569 17 571 17 575 16 H600 M600 16 H634 C639 16 640 13 643 11 C646 9 648 15 651 16 H656 L661 6 C663 1 665 1 666 6 L671 27 C672 31 674 31 676 26 L681 14 C683 10 685 11 687 14 C689 17 691 17 695 16 H720" />
              </g>
              <g stroke="#fff1f1" strokeWidth="1">
                <path d="M0 16 H34 C39 16 40 13 43 11 C46 9 48 15 51 16 H56 L61 6 C63 1 65 1 66 6 L71 27 C72 31 74 31 76 26 L81 14 C83 10 85 11 87 14 C89 17 91 17 95 16 H120 M120 16 H154 C159 16 160 13 163 11 C166 9 168 15 171 16 H176 L181 6 C183 1 185 1 186 6 L191 27 C192 31 194 31 196 26 L201 14 C203 10 205 11 207 14 C209 17 211 17 215 16 H240 M240 16 H274 C279 16 280 13 283 11 C286 9 288 15 291 16 H296 L301 6 C303 1 305 1 306 6 L311 27 C312 31 314 31 316 26 L321 14 C323 10 325 11 327 14 C329 17 331 17 335 16 H360 M360 16 H394 C399 16 400 13 403 11 C406 9 408 15 411 16 H416 L421 6 C423 1 425 1 426 6 L431 27 C432 31 434 31 436 26 L441 14 C443 10 445 11 447 14 C449 17 451 17 455 16 H480 M480 16 H514 C519 16 520 13 523 11 C526 9 528 15 531 16 H536 L541 6 C543 1 545 1 546 6 L551 27 C552 31 554 31 556 26 L561 14 C563 10 565 11 567 14 C569 17 571 17 575 16 H600 M600 16 H634 C639 16 640 13 643 11 C646 9 648 15 651 16 H656 L661 6 C663 1 665 1 666 6 L671 27 C672 31 674 31 676 26 L681 14 C683 10 685 11 687 14 C689 17 691 17 695 16 H720" />
              </g>
            </g>
          </svg>
        </div>
        <div className="py-2.5">
          <div className="container-ff">
            <div className="rounded-[24px] border border-line/70 bg-white/92 px-4 py-2.5 shadow-[0_16px_38px_rgba(7,18,42,0.08)] backdrop-blur-md sm:px-5">
            <div className="flex items-center justify-between gap-5">
              <Link href="/" className="flex shrink-0 items-center" aria-label={`${siteInfo.name}, home`}>
                <Image
                  src={siteInfo.logo}
                  alt={siteInfo.name}
                  width={215}
                  height={70}
                  priority
                  unoptimized={/^https?:\/\//i.test(siteInfo.logo)}
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
