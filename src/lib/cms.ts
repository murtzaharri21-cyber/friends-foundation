import { cache } from "react";
import { cookies } from "next/headers";
import crypto from "node:crypto";
import { db } from "@/db";
import { siteCms } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import {
  appealPhotos,
  areas,
  featureUpdates,
  heroSlides,
  img,
  mission,
  thematicSlides,
  vision,
  type AppealPhoto,
  type Area,
  type HeroSlide,
  type ThematicSlide,
} from "./content";
import { areaLinks, site } from "./nav";
import { HEADLINE_IMPACT_STATS, type ImpactStatCard, type StatIconName } from "@/components/ImpactStatsBand";
import { DEFAULT_PAYMENT_CONFIG, type PaymentSystemConfig } from "./banking";
import { CMS_SECTION_KEYS } from "./cms-keys";

export type SiteInfoConfig = {
  name: string;
  logo: string;
  headerTagline?: string;
  footerDonateLabel?: string;
  footerProgrammesHeading?: string;
  footerOrganizationHeading?: string;
  footerContactHeading?: string;
  footerBottomTagline?: string;
  donationButtonLabel?: string;
  donationButtonColor?: "green" | "blue" | "red" | "purple";
  phoneLabel: string;
  phoneAltLabel: string;
  email: string;
  emailAlt: string;
  offices: { label: string; place: string }[];
  healthCentres: string[];
  socials: { name: string; href: string }[];
  footerSummary: string;
  registrationLine: string;
};

export type ImpactBandConfig = {
  kicker: string;
  heading: string;
  subtitle: string;
  stats: ImpactStatCard[];
};

export type StorySectionConfig = {
  heading: string;
  paragraphs: string[];
  vision: string;
  mission: string;
  image: string;
};

export type HealthSectionConfig = {
  heading: string;
  description: string;
  image: string;
  imageCaption: string;
  services: string[];
  patientStats: { icon: StatIconName; value: string; label: string }[];
};

export type FeatureUpdateItem = {
  image: string;
  tag: string;
  title: string;
  text: string;
  href: string;
};

export type CareerJob = {
  title: string;
  location: string;
  employmentType: string;
  deadline: string;
  description: string;
  applicationUrl: string;
};

export type CareerTender = {
  title: string;
  reference: string;
  deadline: string;
  description: string;
  documentUrl: string;
};

export type CareersSectionConfig = {
  overviewTitle: string;
  overviewIntro: string;
  overviewEyebrow: string;
  overviewHeading: string;
  overviewDescription: string;
  sectors: string[];
  applicationEmail: string;
  applicationButtonLabel: string;
  applicationNote: string;
  recentJobsCardDescription: string;
  recentJobsCardAction: string;
  recentJobsTitle: string;
  recentJobsIntro: string;
  recentJobsEyebrow: string;
  recentJobsHeading: string;
  noJobsMessage: string;
  jobs: CareerJob[];
  tendersCardDescription: string;
  tendersCardAction: string;
  tendersTitle: string;
  tendersIntro: string;
  tendersEyebrow: string;
  tendersHeading: string;
  noTendersMessage: string;
  tenders: CareerTender[];
  tenderContactEmail: string;
  tenderContactButtonLabel: string;
};

export type CmsState = {
  siteInfo: SiteInfoConfig;
  heroSlides: HeroSlide[];
  impactBand: ImpactBandConfig;
  storySection: StorySectionConfig;
  thematicSlides: ThematicSlide[];
  areas: Area[];
  healthSection: HealthSectionConfig;
  featureUpdates: FeatureUpdateItem[];
  pakistanGallery: AppealPhoto[];
  paymentConfig: PaymentSystemConfig;
  donationWhatsappNumber: string;
  careersSection: CareersSectionConfig;
};

export const DEFAULT_CMS_STATE: CmsState = {
  siteInfo: {
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
      "Empowering Communities. Transforming Lives. A registered Pakistani non-profit working across 41 districts in 4 provinces for over 24 years.",
    registrationLine:
      "Registered under Societies Registration Act 1860 · Punjab Charity Commission Category 'A' · Economic Affairs Division (EAD) NOC Holder",
  },
  heroSlides,
  impactBand: {
    kicker: "OUR 24-YEAR IMPACT",
    heading: "14.25 Million+ Lives Reached Across Pakistan",
    subtitle:
      "Over 24 years of sustainable, inclusive, and community-first development spanning 41 districts in Punjab, Khyber Pakhtunkhwa, Sindh, and Balochistan.",
    stats: HEADLINE_IMPACT_STATS,
  },
  storySection: {
    heading: "It started with a flood in Rawalpindi",
    paragraphs: [
      "In 2001 the Nullah Lai burst its banks and tore through the low-lying neighbourhoods of Rawalpindi. Muhammad Abbas Gondal, who was among those affected, and a group of his friends set up free medical camps in the worst-hit streets and kept them going day and night.",
      "Those camps never really closed. They became three health centres that still serve the same communities, and Friends Foundation grew into a registered Pakistani non-profit working on health, clean water, education, women’s empowerment, climate resilience and emergency relief across the country.",
    ],
    vision,
    mission,
    image: img("pl67.jpeg"),
  },
  thematicSlides,
  areas,
  healthSection: {
    heading: "Three clinics, open since the flood",
    description:
      "Our family health centres in Akal Garh, Mohan Pura and Mohallah Raja Sultan give free and affordable care in neighbourhoods on the edge of Rawalpindi where little else is available. Most of the work is with mothers, newborns and young children.",
    image: img("pl43.jpg"),
    imageCaption: "Traditional birth attendants at a Friends Foundation orientation session.",
    services: [
      "Antenatal care and nutrition counselling",
      "Growth monitoring for children under five",
      "Immunisation alongside the EPI programme",
      "Vitamin A, zinc, iron and deworming",
      "Breastfeeding and infant feeding advice",
      "Health education and referrals",
    ],
    patientStats: [
      { icon: "people", value: "50K", label: "Women treated / yr" },
      { icon: "team", value: "50K", label: "Children treated / yr" },
      { icon: "shield", value: "40K", label: "Men treated / yr" },
    ],
  },
  featureUpdates,
  pakistanGallery: appealPhotos,
  paymentConfig: DEFAULT_PAYMENT_CONFIG,
  donationWhatsappNumber: process.env.DONATION_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "",
  careersSection: {
    overviewTitle: "Job Opportunities",
    overviewIntro: "Explore career and procurement updates from Friends Foundation Pakistan. Current openings and notices are listed in the sections below.",
    overviewEyebrow: "Work with us",
    overviewHeading: "Community-centred work across Pakistan",
    overviewDescription: "Friends Foundation works across health, clean water and sanitation, education, women’s empowerment, climate resilience, governance, and humanitarian response. Roles and procurement notices are announced as opportunities become available.",
    sectors: ["Health", "Clean water & sanitation", "Education", "Women’s empowerment", "Climate resilience", "Governance", "Humanitarian response"],
    applicationEmail: "jobs@ffpak.org",
    applicationButtonLabel: "Email your CV",
    applicationNote: "For future job consideration: jobs@ffpak.org",
    recentJobsCardDescription: "See whether Friends Foundation is currently advertising an open position.",
    recentJobsCardAction: "View recent jobs",
    recentJobsTitle: "Recent Jobs",
    recentJobsIntro: "Current vacancies at Friends Foundation Pakistan.",
    recentJobsEyebrow: "Vacancy update",
    recentJobsHeading: "No current vacancies are listed",
    noJobsMessage: "The linked Friends Foundation Recent Jobs page reports that there are currently no jobs available. You may email your resume to the HR team; if a suitable position becomes available, they may contact you.",
    jobs: [],
    tendersCardDescription: "Check this section for procurement and tender notices when they are published.",
    tendersCardAction: "View tenders",
    tendersTitle: "Tenders",
    tendersIntro: "Procurement and tender notices from Friends Foundation Pakistan.",
    tendersEyebrow: "Procurement notices",
    tendersHeading: "No tender notices are currently listed",
    noTendersMessage: "The linked Tenders page does not provide any active notice details. Please check this page again for updates, or contact the Friends Foundation office with procurement enquiries.",
    tenders: [],
    tenderContactEmail: site.email,
    tenderContactButtonLabel: "Contact Friends Foundation",
  },
};

export type CmsSectionKey = keyof CmsState;

function sortByThematicOrder<T extends { slug: string }>(items: T[]): T[] {
  const orderBySlug = new Map(areaLinks.map(({ slug }, index) => [slug, index]));
  return [...items].sort(
    (a, b) =>
      (orderBySlug.get(a.slug) ?? Number.MAX_SAFE_INTEGER) -
      (orderBySlug.get(b.slug) ?? Number.MAX_SAFE_INTEGER),
  );
}

export const CMS_KEYS: CmsSectionKey[] = [...CMS_SECTION_KEYS];

export function phoneToHref(phone: string): string {
  const cleaned = phone.replace(/[^+\d]/g, "");
  return `tel:${cleaned || phone}`;
}

export const getSiteCms = cache(async (): Promise<CmsState> => {
  const merged: CmsState = structuredClone(DEFAULT_CMS_STATE);
  try {
    const rows = await db.select().from(siteCms);
    for (const row of rows) {
      if ((CMS_KEYS as string[]).includes(row.key)) {
        try {
          const parsed = JSON.parse(row.value);
          if (parsed !== null && parsed !== undefined) {
            (merged as Record<string, unknown>)[row.key] =
              row.key === "siteInfo" && typeof parsed === "object" && !Array.isArray(parsed)
                ? { ...merged.siteInfo, ...parsed }
                : parsed;
          }
        } catch {
          // Ignore malformed row and keep default
        }
      }
    }
  } catch {
    // Fallback cleanly to defaults if DB is unreachable during static build
  }
  if (Array.isArray(merged.thematicSlides)) {
    merged.thematicSlides = sortByThematicOrder(merged.thematicSlides);
  }
  if (Array.isArray(merged.areas)) {
    merged.areas = sortByThematicOrder(merged.areas);
  }
  return merged;
});

/* ---------- Optional Admin Passcode Lock Helpers ---------- */

export const ADMIN_COOKIE_NAME = "ff_admin_session";
export const ADMIN_PASSWORD_DB_KEY = "__admin_passcode__";
export const ADMIN_CREDENTIALS_DB_KEY = "__admin_credentials__";

export type AdminCredentialRecord = {
  username: string;
  salt: string;
  passwordHash: string;
  disabled?: boolean;
};

type AdminCredentialSource = {
  record: AdminCredentialRecord;
  legacyPassword?: string;
};

function safeEqual(left: string, right: string): boolean {
  const leftDigest = crypto.createHash("sha256").update(left).digest();
  const rightDigest = crypto.createHash("sha256").update(right).digest();
  return crypto.timingSafeEqual(leftDigest, rightDigest);
}

function derivePasswordHash(password: string, salt: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) reject(error);
      else resolve(derivedKey);
    });
  });
}

async function createCredentialRecord(username: string, password: string): Promise<AdminCredentialRecord> {
  const salt = crypto.randomBytes(16).toString("hex");
  return {
    username,
    salt,
    passwordHash: (await derivePasswordHash(password, salt)).toString("hex"),
  };
}

async function getAdminCredentialSource(): Promise<AdminCredentialSource | null> {
  let rows: { key: string; value: string }[];
  try {
    rows = await db
      .select({ key: siteCms.key, value: siteCms.value })
      .from(siteCms)
      .where(inArray(siteCms.key, [ADMIN_CREDENTIALS_DB_KEY, ADMIN_PASSWORD_DB_KEY]));
  } catch (error) {
    if (process.env.ADMIN_PASSWORD?.trim()) {
      console.error("Could not read stored admin credentials; checking environment credentials", error);
    } else {
      throw error;
    }
    rows = [];
  }

  const stored = rows.find((row) => row.key === ADMIN_CREDENTIALS_DB_KEY);
  if (stored) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(stored.value);
    } catch (error) {
      console.error("Stored admin credentials are invalid JSON", error);
      throw new Error("Stored admin credentials are invalid.");
    }
    if (typeof parsed !== "object" || parsed === null) {
      throw new Error("Stored admin credentials are invalid.");
    }
    const record = parsed as Partial<AdminCredentialRecord>;
    if (record.disabled === true) return null;
    if (
      typeof record.username === "string" &&
      typeof record.salt === "string" &&
      typeof record.passwordHash === "string" &&
      /^[a-f0-9]{32}$/i.test(record.salt) &&
      /^[a-f0-9]{128}$/i.test(record.passwordHash)
    ) {
      return { record: record as AdminCredentialRecord };
    }
    throw new Error("Stored admin credentials are invalid.");
  }

  const legacy = rows.find((row) => row.key === ADMIN_PASSWORD_DB_KEY);
  if (legacy) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(legacy.value);
    } catch (error) {
      console.error("Stored legacy admin passcode is invalid JSON", error);
      throw new Error("Stored admin credentials are invalid.");
    }
    if (typeof parsed === "string" && parsed.length > 0) {
      const username = process.env.ADMIN_ID?.trim() || "Friendsfoundation";
      const record = await createCredentialRecord(username, parsed);
      return { record, legacyPassword: parsed };
    }
  }

  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  const username = process.env.ADMIN_ID?.trim() || "Friendsfoundation";
  const salt = crypto.createHash("sha256").update(`ff-admin:${username.toLowerCase()}`).digest("hex").slice(0, 32);
  return {
    record: {
      username,
      salt,
      passwordHash: (await derivePasswordHash(password, salt)).toString("hex"),
    },
  };
}

function signToken(username: string, passwordHash: string): string {
  return crypto
    .createHmac("sha256", process.env.ADMIN_SESSION_SECRET || process.env.DATABASE_URL || passwordHash)
    .update(`ffpak:${username.toLowerCase()}:${passwordHash}`)
    .digest("hex");
}

export async function getAdminCredentialState(): Promise<{
  credential: AdminCredentialRecord | null;
  enabled: boolean;
}> {
  const source = await getAdminCredentialSource();
  return {
    credential: source?.record ?? null,
    enabled: source !== null,
  };
}

export async function verifyAdminCredentials(username: string, password: string): Promise<{
  credential: AdminCredentialRecord | null;
  valid: boolean;
  legacy: boolean;
}> {
  const source = await getAdminCredentialSource();
  if (!source) return { credential: null, valid: false, legacy: false };

  const userMatches = safeEqual(username.trim().toLowerCase(), source.record.username.toLowerCase());
  const passwordMatches = source.legacyPassword !== undefined
    ? safeEqual(password, source.legacyPassword)
    : safeEqual(
        (await derivePasswordHash(password, source.record.salt)).toString("hex"),
        source.record.passwordHash,
      );
  return {
    credential: source.record,
    valid: userMatches && passwordMatches,
    legacy: source.legacyPassword !== undefined,
  };
}

export async function storeAdminCredential(record: AdminCredentialRecord): Promise<void> {
  const value = JSON.stringify(record);
  await db.transaction(async (tx) => {
    await tx
      .insert(siteCms)
      .values({ key: ADMIN_CREDENTIALS_DB_KEY, value, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: siteCms.key,
        set: { value, updatedAt: new Date() },
      });
    await tx.delete(siteCms).where(eq(siteCms.key, ADMIN_PASSWORD_DB_KEY));
  });
}

export async function disableAdminCredential(): Promise<void> {
  const value = JSON.stringify({ disabled: true });
  await db.transaction(async (tx) => {
    await tx
      .insert(siteCms)
      .values({ key: ADMIN_CREDENTIALS_DB_KEY, value, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: siteCms.key,
        set: { value, updatedAt: new Date() },
      });
    await tx.delete(siteCms).where(eq(siteCms.key, ADMIN_PASSWORD_DB_KEY));
  });
}

export async function hashAdminPassword(username: string, password: string): Promise<AdminCredentialRecord> {
  return createCredentialRecord(username, password);
}

export function computeSessionCookieValue(username: string, passwordHash: string): string {
  return signToken(username, passwordHash);
}

export async function isAdminAuthorized(): Promise<{
  authorized: boolean;
  passwordEnabled: boolean;
  username: string | null;
}> {
  const { credential, enabled } = await getAdminCredentialState();
  if (!credential) {
    return { authorized: false, passwordEnabled: enabled, username: null };
  }
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE_NAME)?.value;
  const expected = computeSessionCookieValue(credential.username, credential.passwordHash);
  return {
    authorized: Boolean(token && safeEqual(token, expected)),
    passwordEnabled: true,
    username: credential.username,
  };
}
