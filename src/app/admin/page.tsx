import type { Metadata } from "next";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { contacts, donations, uploadedMedia } from "@/db/schema";
import { DEFAULT_CMS_STATE, getSiteCms, isAdminAuthorized } from "@/lib/cms";
import { appealPhotos, galleryPhotos, img } from "@/lib/content";
import AdminLoginGate from "@/components/admin/AdminLoginGate";
import AdminDashboard, { type AdminTab } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<{ tab?: string }>;
}) {
  const [sp, auth, cms] = await Promise.all([searchParams, isAdminAuthorized(), getSiteCms()]);

  if (!auth.authorized) {
    return <AdminLoginGate siteName={cms.siteInfo.name} logo={cms.siteInfo.logo} />;
  }

  const [donationResult, contactRows, uploadRows] = await Promise.all([
    db
      .select()
      .from(donations)
      .orderBy(desc(donations.id))
      .limit(300)
      .then((rows) => ({ rows, error: null as string | null }))
      .catch((err: unknown) => {
        console.error("Failed to load donations for admin dashboard", err);
        return {
          rows: [],
          error: "The database query failed. Check the server logs and confirm the donations migration is applied.",
        };
      }),
    db.select().from(contacts).orderBy(desc(contacts.id)).limit(300).catch(() => []),
    db
      .select({ id: uploadedMedia.id, filename: uploadedMedia.filename })
      .from(uploadedMedia)
      .orderBy(desc(uploadedMedia.id))
      .limit(60)
      .catch(() => []),
  ]);

  const initialLibrary = [
    ...uploadRows.map((u) => ({
      url: `/api/media/${u.id}`,
      label: `Uploaded: ${u.filename}`,
      group: "Uploaded",
    })),
    ...appealPhotos.map((p) => ({
      url: p.src,
      label: `${p.place} — ${p.caption.slice(0, 40)}`,
      group: "Pakistan Appeal",
    })),
    ...galleryPhotos.slice(0, 20).map((g) => ({
      url: img(g.src),
      label: g.caption,
      group: "Field Archive",
    })),
  ];

  return (
    <AdminDashboard
      initialState={cms}
      defaults={DEFAULT_CMS_STATE}
      initialDonations={donationResult.rows}
      initialDonationError={donationResult.error}
      initialContacts={contactRows}
      initialLibrary={initialLibrary}
      initialPasswordEnabled={auth.passwordEnabled}
      envPasswordLocked={Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.trim().length > 0)}
      initialTab={
        sp?.tab &&
        ["overview", "banks", "hero", "impact", "story", "programmes", "stories", "gallery", "careers", "donations", "contacts", "settings"].includes(
          sp.tab,
        )
          ? (sp.tab as AdminTab)
          : "overview"
      }
    />
  );
}
