import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteConfigProvider } from "@/components/SiteConfigContext";
import { getSiteCms } from "@/lib/cms";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ffpak.org.pk"),
  title: {
    default: "Friends Foundation Pakistan — Health, Clean Water, Education & Emergency Relief",
    template: "%s | Friends Foundation Pakistan",
  },
  description:
    "Friends Foundation Pakistan has worked since 2001 to bring health care, clean water, education and emergency relief to underserved communities across Pakistan.",
  icons: { icon: "/images/ff/favicon.png" },
  openGraph: {
    title: "Friends Foundation Pakistan",
    description:
      "Health care, clean water, education and emergency relief for underserved communities across Pakistan, since 2001.",
    images: ["/images/ff/n28.jpg"],
    type: "website",
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cms = await getSiteCms();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&family=Archivo:wght@500;600;700;800&family=Libre+Baskerville:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteConfigProvider value={cms.siteInfo}>
          {children}
        </SiteConfigProvider>
      </body>
    </html>
  );
}
