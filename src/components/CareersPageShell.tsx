import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

export default function CareersPageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main>
        <PageHeader
          eyebrow="Careers"
          title={title}
          intro={intro}
          crumbs={[{ label: "Home", href: "/" }, { label: "Careers", href: "/careers" }, { label: title }]}
        />
        {children}
      </main>
      <Footer />
    </>
  );
}
