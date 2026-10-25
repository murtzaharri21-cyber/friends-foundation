import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { MailIcon, MapPinIcon, PhoneIcon, SocialIcon } from "@/components/Icons";
import { getSiteCms, phoneToHref } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Phone, email and office details for Friends Foundation Pakistan, or send us a message.",
};

export default async function ContactPage() {
  const { siteInfo } = await getSiteCms();

  return (
    <>
      <Header />
      <main>
        <PageHeader
          title="Contact us"
          intro="Questions about our work, ideas for a partnership, media requests or feedback — we would like to hear from you."
          crumbs={[{ label: "Home", href: "/" }, { label: "Contact us" }]}
        />

        <section className="py-14 md:py-20">
          <div className="container-ff grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-9 lg:col-span-5">
              <div className="flex gap-4">
                <PhoneIcon className="mt-1.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <h2 className="text-xl">Phone</h2>
                  <p className="mt-1.5 text-[16.5px]">
                    <a href={phoneToHref(siteInfo.phoneLabel)} className="link">{siteInfo.phoneLabel}</a>
                    <br />
                    <a href={phoneToHref(siteInfo.phoneAltLabel)} className="link">{siteInfo.phoneAltLabel}</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <MailIcon className="mt-1.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <h2 className="text-xl">Email</h2>
                  <p className="mt-1.5 text-[16.5px]">
                    <a href={`mailto:${siteInfo.email}`} className="link break-all">{siteInfo.email}</a>
                    <br />
                    <a href={`mailto:${siteInfo.emailAlt}`} className="link break-all">{siteInfo.emailAlt}</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPinIcon className="mt-1.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <h2 className="text-xl">Offices</h2>
                  <ul className="mt-1.5 text-[16.5px] text-slate-700">
                    {siteInfo.offices.map((o) => (
                      <li key={o.label}>
                        {o.label} — {o.place}
                      </li>
                    ))}
                  </ul>
                  <h3 className="mt-5 font-sans text-[15px] font-semibold text-ink">Health centres, Rawalpindi</h3>
                  <p className="mt-1 text-[16px] text-slate-700">{siteInfo.healthCentres.join(" · ")}</p>
                </div>
              </div>

              <div className="border-t border-line pt-8">
                <h2 className="text-xl">Follow us</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {siteInfo.socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[15px] text-ink/75 hover:border-brand-bright hover:text-brand"
                    >
                      <SocialIcon name={s.name} /> {s.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-[18px] bg-mist p-5 text-[15.5px] text-ink/75">
                <strong className="text-deep-2">Jobs and tenders.</strong> For current vacancies and tenders, please get in
                touch by email or phone, or choose “Jobs and tenders” in the form.
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="card p-6 md:p-9">
                <h2 className="text-2xl md:text-3xl">Send us a message</h2>
                <p className="mt-2 text-slate-600">Fill in the form and a member of our team will get back to you.</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
