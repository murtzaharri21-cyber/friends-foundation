"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteInfoConfig } from "@/lib/cms";
import { site } from "@/lib/nav";

const FALLBACK_SITE_INFO: SiteInfoConfig = {
  name: site.name,
  logo: "/images/ff/FFPAk.logo.png",
  headerTagline: "Working across Pakistan since 2001",
  footerDonateLabel: "Donate",
  footerProgrammesHeading: "What we do",
  footerOrganizationHeading: "Organisation",
  footerContactHeading: "Get in touch",
  footerBottomTagline: "Health · Clean water · Education · Women’s rights · Emergency relief",
  donationButtonLabel: "Donate",
  donationButtonColor: "red",
  phoneLabel: site.phone.label,
  phoneAltLabel: site.phoneAlt.label,
  email: site.email,
  emailAlt: site.emailAlt,
  offices: site.offices,
  healthCentres: site.healthCentres,
  socials: site.socials,
  footerSummary:
    "A Pakistani non-profit founded in 2001, working on health, clean water, education, women’s rights, disaster preparedness and emergency relief.",
  registrationLine:
    "Registered under the Societies Registration Act 1860 · Punjab Charity Commission Category ‘A’ · EAD NOC holder",
};

const SiteConfigContext = createContext<SiteInfoConfig>(FALLBACK_SITE_INFO);

export function SiteConfigProvider({ value, children }: { value: SiteInfoConfig; children: ReactNode }) {
  return <SiteConfigContext.Provider value={value}>{children}</SiteConfigContext.Provider>;
}

export function useSiteConfig(): SiteInfoConfig {
  return useContext(SiteConfigContext);
}
