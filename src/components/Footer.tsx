import Link from "next/link";
import Image from "next/image";
import { areaLinks } from "@/lib/nav";
import { getSiteCms, phoneToHref } from "@/lib/cms";
import { MailIcon, MapPinIcon, PhoneIcon, SocialIcon } from "./Icons";
import FooterFeedbackTab from "./FooterFeedbackTab";

const orgLinks = [
  { label: "About us", href: "/about" },
  { label: "Board & team", href: "/about#team" },
  { label: "How we work", href: "/how-we-work" },
  { label: "Media & gallery", href: "/media" },
  { label: "How you can help", href: "/help" },
  { label: "Donate (PKR & USD)", href: "/donate" },
  { label: "Contact", href: "/contact" },
];

const officialSocialHandles = [
  { name: "Instagram", handle: "@friendsfoundation.org.pk", href: "https://www.instagram.com/friendsfoundation.org.pk/" },
  { name: "LinkedIn", handle: "friendsfoundation@ffpak.org", href: "https://pk.linkedin.com/company/friendsfoundationpk" },
  { name: "Facebook", handle: "Friends Foundation Pakistan", href: "https://www.facebook.com/p/Friends-Foundation-100065538630350/" },
  { name: "X", handle: "@FriendsFoundPK", href: "https://x.com/friendsfoundationpk" },
];

export default async function Footer() {
  const { siteInfo } = await getSiteCms();

  return (
    <footer className="mt-20 bg-brand text-white/90">
      {/* Interactive feedback tab & suggestion drawer */}
      <FooterFeedbackTab />

      <div className="container-ff grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-4">
          <Link href="/" className="inline-block rounded-2xl bg-white px-3.5 py-2.5">
            <Image
              src={siteInfo.logo}
              alt={siteInfo.name}
              width={215}
              height={70}
              loading="lazy"
              unoptimized={/^https?:\/\//i.test(siteInfo.logo)}
              className="h-14 w-auto object-contain"
            />
          </Link>
          <p className="mt-5 max-w-sm text-[15.5px] leading-relaxed">{siteInfo.footerSummary}</p>
          <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-white/55">{siteInfo.registrationLine}</p>
          <Link href="/donate" className="btn btn-donation mt-6">
            {siteInfo.footerDonateLabel || "Donate"}
          </Link>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-sans text-[12.5px] font-extrabold uppercase tracking-[0.12em] text-cream-deep">{siteInfo.footerProgrammesHeading || "What we do"}</h2>
          <ul className="mt-4 space-y-2 text-[15px]">
            {areaLinks.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/our-work/${a.slug}`}
                  className="inline-block transition-all duration-200 hover:translate-x-1.5 hover:text-white"
                >
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="font-sans text-[12.5px] font-extrabold uppercase tracking-[0.12em] text-cream-deep">{siteInfo.footerOrganizationHeading || "Organisation"}</h2>
          <ul className="mt-4 space-y-2 text-[15px]">
            {orgLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-block transition-all duration-200 hover:translate-x-1.5 hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-sans text-[12.5px] font-extrabold uppercase tracking-[0.12em] text-cream-deep">{siteInfo.footerContactHeading || "Get in touch"}</h2>
          <ul className="mt-4 space-y-3.5 text-[15px]">
            <li className="flex gap-3">
              <PhoneIcon className="mt-1 h-4 w-4 shrink-0 text-brand-soft" />
              <span>
                <a href={phoneToHref(siteInfo.phoneLabel)} className="hover:text-white">{siteInfo.phoneLabel}</a>
                <br />
                <a href={phoneToHref(siteInfo.phoneAltLabel)} className="hover:text-white">{siteInfo.phoneAltLabel}</a>
              </span>
            </li>
            <li className="flex gap-3">
              <MailIcon className="mt-1 h-4 w-4 shrink-0 text-brand-soft" />
              <a href={`mailto:${siteInfo.email}`} className="break-all hover:text-white">{siteInfo.email}</a>
            </li>
            <li className="flex gap-3">
              <MapPinIcon className="mt-1 h-4 w-4 shrink-0 text-brand-soft" />
              <span>
                {siteInfo.offices.map((o) => (
                  <span key={o.label} className="block">
                    {o.label}: {o.place}
                  </span>
                ))}
              </span>
            </li>
          </ul>

          {/* Social media handles with icons */}
          <div className="mt-6 border-t border-white/15 pt-4">
            <h3 className="font-sans text-[11.5px] font-extrabold uppercase tracking-[0.14em] text-cream-deep">
              Official Social Media Handles
            </h3>
            <ul className="mt-3 space-y-2">
              {officialSocialHandles.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 text-[13px] text-white/80 transition-colors hover:text-white"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 transition-all duration-200 group-hover:border-cream-deep group-hover:bg-cream-deep/20 group-hover:text-cream-deep">
                      <SocialIcon name={s.name} />
                    </span>
                    <span className="truncate">
                      <strong className="font-semibold text-white/90 group-hover:text-cream-deep">{s.name}:</strong>{" "}
                      <span className="font-mono text-xs text-white/75 group-hover:text-white group-hover:underline">{s.handle}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 bg-[#205d80]">
        <div className="container-ff flex flex-col gap-1 py-5 text-[13.5px] text-white/75 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteInfo.name}. All rights reserved.</p>
          <p>{siteInfo.footerBottomTagline || "Health · Clean water · Education · Women’s rights · Emergency relief"}</p>
        </div>
      </div>
    </footer>
  );
}
