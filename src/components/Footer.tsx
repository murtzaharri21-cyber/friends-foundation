import Link from "next/link";
import { areaLinks } from "@/lib/nav";
import { getSiteCms, phoneToHref } from "@/lib/cms";
import { MailIcon, MapPinIcon, PhoneIcon, SocialIcon } from "./Icons";

const orgLinks = [
  { label: "About us", href: "/about" },
  { label: "Board & team", href: "/about#team" },
  { label: "How we work", href: "/how-we-work" },
  { label: "Media & gallery", href: "/media" },
  { label: "How you can help", href: "/help" },
  { label: "Donate (PKR & USD)", href: "/donate" },
  { label: "Contact", href: "/contact" },
];

export default async function Footer() {
  const { siteInfo } = await getSiteCms();

  return (
    <footer className="mt-20 bg-deep text-white/75">
      <div className="container-ff grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-4">
          <Link href="/" className="inline-block rounded-2xl bg-white px-3.5 py-2.5">
            <img src={siteInfo.logo} alt={siteInfo.name} width={215} height={70} className="h-11 w-auto object-contain" />
          </Link>
          <p className="mt-5 max-w-sm text-[15.5px] leading-relaxed">{siteInfo.footerSummary}</p>
          <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-white/55">{siteInfo.registrationLine}</p>
          <Link href="/donate" className="btn btn-donation mt-6">
            Donate
          </Link>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-sans text-[12.5px] font-extrabold uppercase tracking-[0.12em] text-cream-deep">What we do</h2>
          <ul className="mt-4 space-y-2 text-[15px]">
            {areaLinks.map((a) => (
              <li key={a.slug}>
                <Link href={`/our-work/${a.slug}`} className="hover:text-white">
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="font-sans text-[12.5px] font-extrabold uppercase tracking-[0.12em] text-cream-deep">Organisation</h2>
          <ul className="mt-4 space-y-2 text-[15px]">
            {orgLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-sans text-[12.5px] font-extrabold uppercase tracking-[0.12em] text-cream-deep">Get in touch</h2>
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
          <div className="mt-5 flex gap-2">
            {siteInfo.socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 hover:border-brand-soft hover:text-white"
              >
                <SocialIcon name={s.name} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-deep-2">
        <div className="container-ff flex flex-col gap-1 py-5 text-[13.5px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteInfo.name}. All rights reserved.</p>
          <p>Health · Clean water · Education · Women’s rights · Emergency relief</p>
        </div>
      </div>
    </footer>
  );
}
