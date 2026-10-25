import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DonateForm from "@/components/DonateForm";
import { img, registration } from "@/lib/content";
import { site } from "@/lib/nav";
import { getSiteCms } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Friends Foundation Pakistan’s health centres, clean water projects, emergency relief and girls’ education.",
};

const uses = [
  {
    title: "Health centres",
    text: "Care for mothers, newborns and children at our three centres in Rawalpindi, which see around 140,000 people a year.",
  },
  {
    title: "Clean water",
    text: "Filtration plants, hand pumps and latrines — and the community committees that keep them working.",
  },
  {
    title: "Emergency relief",
    text: "Hygiene kits, medical camps and winter kits for families when floods and other disasters strike.",
  },
  {
    title: "Girls’ education",
    text: "Non-formal education and skills training for girls who have missed out on school.",
  },
];

export default async function DonatePage() {
  const { paymentConfig } = await getSiteCms();
  return (
    <>
      <Header />
      <main>
        <PageHeader
          eyebrow="Donate"
          title="Donate by bank or mobile wallet"
          intro="Transfer your donation through a bank account, JazzCash or Easypaisa, then submit your details for payment verification."
          image={img("pl43.jpg")}
          crumbs={[{ label: "Home", href: "/" }, { label: "Donate" }]}
        />

        <section className="donate-section py-10 md:py-16">
          <div className="container-ff grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-8">
              <div className="donate-card">
                <div className="donate-card-heading">
                  <span className="donate-step">Your donation</span>
                  <h2 className="mt-2 text-2xl md:text-3xl">Make a manual donation</h2>
                  <p className="mt-2 text-slate-600">
                    Choose a transfer account, enter your donation details, and submit for verification.
                  </p>
                </div>
                <DonateForm paymentConfig={paymentConfig} />
              </div>
            </div>

            <aside className="donate-aside min-w-0 space-y-7 lg:col-span-4">
              <figure className="donate-photo">
                <img
                  src="/images/appeal/pk-balochistan-child.jpg"
                  alt="Close-up portrait of a child in rural Balochistan, Pakistan"
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-[18px] object-cover ring-1 ring-line"
                />
                <figcaption className="mt-3 text-[13px] leading-relaxed text-muted">
                  Balochistan, Pakistan · Photo: Hanif Ali Baluch / Pexels. Your gift in PKR, USD, GBP or EUR supports
                  families across urban slums and rural villages in Pakistan.
                </figcaption>
              </figure>

              <div className="donate-impact">
                <span className="donate-step">Your impact</span>
                <h2 className="mt-2 text-2xl">A gift that reaches further</h2>
                <ul className="mt-5 space-y-4">
                  {uses.map((u) => (
                    <li key={u.title} className="donate-impact-item">
                      <span className="donate-impact-dot" aria-hidden="true" />
                      <div>
                        <h3 className="text-base">{u.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">{u.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="donate-contact">
                <h2 className="text-xl">Prefer to talk to someone?</h2>
                <p className="mt-2 text-[15.5px] text-slate-700">
                  To give by bank transfer or discuss a larger gift, call{" "}
                  <a href={site.phone.href} className="link">{site.phone.label}</a> or email{" "}
                  <a href={`mailto:${site.email}`} className="link break-all">{site.email}</a>.
                </p>
              </div>

              <div className="card p-6">
                <h2 className="text-xl">Registered and accountable</h2>
                <ul className="mt-4 space-y-4">
                  {registration.map((r) => (
                    <li key={r.title} className="flex items-center gap-4">
                      <img src={img(r.logo)} alt="" loading="lazy" className="h-12 w-12 shrink-0 object-contain" />
                      <div className="text-[15px]">
                        <p className="font-semibold text-ink">{r.title}</p>
                        <p className="text-slate-600">{r.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
