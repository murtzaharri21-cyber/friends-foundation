"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CmsSectionKey, CmsState } from "@/lib/cms";
import { CMS_SECTION_KEYS } from "@/lib/cms-keys";
import { ImpactStatIcon, type StatIconName } from "@/components/ImpactStatsBand";
import { ArrowRightIcon, CloseIcon, MailIcon, MenuIcon, PhoneIcon } from "@/components/Icons";
import { formatIbanDisplay, type BankAccountConfig, type MobileWalletConfig } from "@/lib/banking";
import BankSystemPanel from "./BankSystemPanel";
import ImageField, { type MediaLibraryItem } from "./ImageField";
import CareersEditor from "./CareersEditor";

export type AdminDonationRow = {
  id: number;
  donorName: string;
  email: string;
  phone: string | null;
  country?: string | null;
  city?: string | null;
  senderAccountNumber?: string | null;
  amount: number;
  currency: string;
  purpose: string | null;
  frequency: string;
  paymentMethod?: string | null;
  bankAccountLabel?: string | null;
  transactionRef?: string | null;
  receiptUrl?: string | null;
  status: string;
  message: string | null;
  createdAt: string | Date | null;
};

export type AdminContactRow = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string | Date | null;
};

export type AdminTab =
  | "overview"
  | "banks"
  | "hero"
  | "impact"
  | "story"
  | "programmes"
  | "stories"
  | "gallery"
  | "careers"
  | "donations"
  | "contacts"
  | "settings";

const NAV_ITEMS: { key: AdminTab; label: string; shortLabel: string; group: string }[] = [
  { key: "overview", label: "Dashboard Overview", shortLabel: "Overview", group: "Control" },
  { key: "banks", label: "Bank & Payment System", shortLabel: "Bank System", group: "Control" },
  { key: "hero", label: "Hero Banner Slider", shortLabel: "Hero Slider", group: "Website Sections" },
  { key: "impact", label: "Impact Numbers Band", shortLabel: "Numbers", group: "Website Sections" },
  { key: "story", label: "Story, Vision & Clinics", shortLabel: "Story & Clinics", group: "Website Sections" },
  { key: "programmes", label: "Programmes & Vertical Slider", shortLabel: "Programmes", group: "Website Sections" },
  { key: "stories", label: "Field Stories Carousel", shortLabel: "Field Stories", group: "Website Sections" },
  { key: "gallery", label: "Media & Photo Gallery", shortLabel: "Gallery", group: "Website Sections" },
  { key: "careers", label: "Careers & Tenders", shortLabel: "Careers", group: "Website Sections" },
  { key: "donations", label: "Donations & Pledges", shortLabel: "Donations", group: "Records & Inbox" },
  { key: "contacts", label: "Contact Messages", shortLabel: "Messages", group: "Records & Inbox" },
  { key: "settings", label: "Site Info & Security", shortLabel: "Settings", group: "System" },
];

const TOP_BAR_TABS: AdminTab[] = ["overview", "banks", "hero", "impact", "programmes", "careers", "donations", "contacts", "settings"];

const STAT_ICON_OPTIONS: { value: StatIconName; label: string }[] = [
  { value: "pin", label: "Location Pin" },
  { value: "calendar", label: "Calendar Check" },
  { value: "funds", label: "Funds / Banknote" },
  { value: "people", label: "Beneficiaries / People" },
  { value: "home", label: "Households / Home" },
  { value: "team", label: "Staff / Community" },
  { value: "water", label: "Clean Water Drop" },
  { value: "shield", label: "Protection Shield" },
];

const TINT_PRESETS: { label: string; rgb: string }[] = [
  { label: "Deep Navy", rgb: "8, 48, 102" },
  { label: "Humanitarian Teal", rgb: "10, 74, 96" },
  { label: "Royal Blue", rgb: "11, 56, 114" },
  { label: "Zakat Emerald", rgb: "12, 92, 54" },
  { label: "Deep Slate", rgb: "24, 42, 74" },
  { label: "Warm Crimson", rgb: "122, 22, 28" },
];

function swapItems<T>(arr: T[], a: number, b: number): T[] {
  const next = [...arr];
  const tmp = next[a];
  next[a] = next[b];
  next[b] = tmp;
  return next;
}

export default function AdminDashboard({
  initialState,
  defaults,
  initialDonations,
  initialDonationError,
  initialContacts,
  initialLibrary,
  initialAdminUsername,
  initialTab = "overview",
}: {
  initialState: CmsState;
  defaults: CmsState;
  initialDonations: AdminDonationRow[];
  initialDonationError?: string | null;
  initialContacts: AdminContactRow[];
  initialLibrary: MediaLibraryItem[];
  initialAdminUsername: string;
  initialTab?: AdminTab;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<AdminTab>(initialTab);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [cms, setCms] = useState<CmsState>(initialState);
  const [donations, setDonations] = useState<AdminDonationRow[]>(initialDonations);
  const [contacts, setContacts] = useState<AdminContactRow[]>(initialContacts);
  const [library, setLibrary] = useState<MediaLibraryItem[]>(initialLibrary);

  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [toast, setToast] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const previousCms = useRef(cms);
  const saveTimers = useRef(new Map<CmsSectionKey, number>());
  const saveQueues = useRef(new Map<CmsSectionKey, Promise<void>>());

  // Sub-views
  const [progMode, setProgMode] = useState<"slider" | "pages">("slider");
  const [selectedAreaIdx, setSelectedAreaIdx] = useState(0);
  const [donationFilter, setDonationFilter] = useState<string>("all");
  const [contactFilter, setContactFilter] = useState<string>("all");

  // Manual offline donation form state
  const [showAddDonation, setShowAddDonation] = useState(false);
  const [newDon, setNewDon] = useState({
    donorName: "",
    email: "",
    phone: "",
    amount: "5000",
    currency: "PKR",
    purpose: "Where it is needed most",
    frequency: "once",
    status: "confirmed",
    message: "",
  });

  const [galleryUploading, setGalleryUploading] = useState(false);
  const [adminUsername, setAdminUsername] = useState(initialAdminUsername);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(t);
  }, [toast]);

  function notify(kind: "ok" | "err", text: string) {
    setToast({ kind, text });
  }

  function addUploadedToLibrary(item: MediaLibraryItem) {
    setLibrary((prev) => [item, ...prev.filter((x) => x.url !== item.url)]);
  }

  const saveSection = useCallback(async <K extends CmsSectionKey,>(
    section: K,
    data?: CmsState[K],
    autoSave = false,
  ) => {
    const pendingTimer = saveTimers.current.get(section);
    if (pendingTimer !== undefined) {
      window.clearTimeout(pendingTimer);
      saveTimers.current.delete(section);
    }

    const payload = data ?? cms[section];
    const previousSave = saveQueues.current.get(section) ?? Promise.resolve();
    const queuedSave = previousSave.catch(() => undefined).then(async () => {
      setSavingKey(section);
      const res = await fetch("/api/admin/cms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, data: payload }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Could not save changes.");
      if (!autoSave) {
        setToast({ kind: "ok", text: "Saved & published live on website." });
        router.refresh();
      }
    });
    saveQueues.current.set(section, queuedSave);

    try {
      await queuedSave;
    } catch (err) {
      setToast({
        kind: "err",
        text: err instanceof Error ? err.message : "Save failed.",
      });
    } finally {
      if (saveQueues.current.get(section) === queuedSave) {
        saveQueues.current.delete(section);
        setSavingKey(null);
      }
    }
  }, [cms, router]);

  useEffect(() => {
    for (const section of CMS_SECTION_KEYS) {
      if (previousCms.current[section] === cms[section]) continue;

      const pendingTimer = saveTimers.current.get(section);
      if (pendingTimer !== undefined) window.clearTimeout(pendingTimer);

      if (
        section === "donationWhatsappNumber" &&
        cms.donationWhatsappNumber !== "" &&
        !/^\d{7,15}$/.test(cms.donationWhatsappNumber.replace(/\D/g, ""))
      ) {
        saveTimers.current.delete(section);
        continue;
      }

      const timer = window.setTimeout(() => {
        saveTimers.current.delete(section);
        void saveSection(section, cms[section], true);
      }, 700);
      saveTimers.current.set(section, timer);
    }

    previousCms.current = cms;
  }, [cms, saveSection]);

  useEffect(
    () => () => {
      for (const timer of saveTimers.current.values()) window.clearTimeout(timer);
    },
    [],
  );

  async function resetSection(section: CmsSectionKey) {
    if (!window.confirm("Restore this section back to its original default content?")) return;
    const pendingTimer = saveTimers.current.get(section);
    if (pendingTimer !== undefined) {
      window.clearTimeout(pendingTimer);
      saveTimers.current.delete(section);
    }
    setSavingKey(section);
    try {
      const res = await fetch(`/api/admin/cms?section=${section}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Could not reset section.");
      setCms((prev) => ({ ...prev, [section]: structuredClone(defaults[section]) }));
      notify("ok", "Restored default content and updated live site.");
      router.refresh();
    } catch (err) {
      notify("err", err instanceof Error ? err.message : "Reset failed.");
    } finally {
      setSavingKey(null);
    }
  }

  const currencyTotals = useMemo(() => {
    const map: Record<string, { total: number; count: number }> = {};
    for (const d of donations) {
      const c = d.currency || "PKR";
      if (!map[c]) map[c] = { total: 0, count: 0 };
      map[c].total += Number(d.amount) || 0;
      map[c].count += 1;
    }
    return map;
  }, [donations]);

  const unreadContactsCount = useMemo(
    () => contacts.filter((c) => c.status === "unread").length,
    [contacts],
  );

  const pendingDonationsCount = useMemo(
    () => donations.filter((d) => d.status === "pending").length,
    [donations],
  );

  const filteredDonations = useMemo(
    () => (donationFilter === "all" ? donations : donations.filter((d) => d.status === donationFilter)),
    [donations, donationFilter],
  );

  const filteredContacts = useMemo(
    () => (contactFilter === "all" ? contacts : contacts.filter((c) => c.status === contactFilter)),
    [contacts, contactFilter],
  );

  async function updateDonationStatus(id: number, status: string) {
    const prev = donations;
    setDonations((list) => list.map((d) => (d.id === id ? { ...d, status } : d)));
    const res = await fetch("/api/admin/donations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) {
      setDonations(prev);
      notify("err", "Could not update donation status.");
    } else {
      notify("ok", `Marked pledge #${id} as ${status}.`);
    }
  }

  async function removeDonation(id: number) {
    if (!window.confirm("Delete this donation record permanently?")) return;
    const res = await fetch(`/api/admin/donations?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setDonations((list) => list.filter((d) => d.id !== id));
      notify("ok", "Donation record deleted.");
    }
  }

  async function handleAddOfflineDonation(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newDon, amount: Number(newDon.amount) }),
    });
    const json = (await res.json()) as { donation?: AdminDonationRow; error?: string };
    if (!res.ok || !json.donation) {
      notify("err", json.error || "Could not record donation.");
      return;
    }
    setDonations((list) => [json.donation!, ...list]);
    setShowAddDonation(false);
    setNewDon({
      donorName: "",
      email: "",
      phone: "",
      amount: "5000",
      currency: "PKR",
      purpose: "Where it is needed most",
      frequency: "once",
      status: "confirmed",
      message: "",
    });
    notify("ok", "Recorded offline / bank donation.");
  }

  function exportDonationsCsv() {
    const header = [
      "ID",
      "Donor Name",
      "Email",
      "Phone",
      "Country",
      "City",
      "Sender Account Number",
      "Amount",
      "Currency",
      "Frequency",
      "Purpose",
      "Payment Method",
      "Bank / Wallet",
      "Transaction Ref (TID)",
      "Status",
      "Note",
      "Created At",
    ];
    const rows = donations.map((d) => [
      d.id,
      d.donorName,
      d.email,
      d.phone ?? "",
      d.country ?? "",
      d.city ?? "",
      d.senderAccountNumber ?? "",
      d.amount,
      d.currency,
      d.frequency,
      d.purpose ?? "",
      d.paymentMethod ?? "",
      d.bankAccountLabel ?? "",
      d.transactionRef ?? "",
      d.status,
      (d.message ?? "").replace(/\r?\n/g, " "),
      d.createdAt ? new Date(d.createdAt).toISOString() : "",
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ffpak-donations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function updateContactStatus(id: number, status: string) {
    const prev = contacts;
    setContacts((list) => list.map((c) => (c.id === id ? { ...c, status } : c)));
    const res = await fetch("/api/admin/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) {
      setContacts(prev);
      notify("err", "Could not update message status.");
    }
  }

  async function removeContact(id: number) {
    if (!window.confirm("Delete this contact inquiry permanently?")) return;
    const res = await fetch(`/api/admin/contacts?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setContacts((list) => list.filter((c) => c.id !== id));
      notify("ok", "Message deleted.");
    }
  }

  async function handleGalleryQuickUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    setGalleryUploading(true);
    try {
      const added = [];
      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const json = (await res.json()) as { url?: string; filename?: string; error?: string };
        if (!res.ok || !json.url) throw new Error(json.error || "Upload failed.");
        addUploadedToLibrary({
          url: json.url,
          label: `Uploaded: ${json.filename || file.name}`,
          group: "Uploaded",
        });
        added.push({
          src: json.url,
          caption: file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
          category: "Community",
          credit: "Friends Foundation",
          place: "Pakistan",
        });
      }
      const nextGallery = [...added, ...cms.pakistanGallery];
      setCms((prev) => ({ ...prev, pakistanGallery: nextGallery }));
      await saveSection("pakistanGallery", nextGallery);
    } catch (err) {
      notify("err", err instanceof Error ? err.message : "Gallery upload failed.");
    } finally {
      setGalleryUploading(false);
    }
  }

  async function updateAdminCredentials() {
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update-credentials",
          username: adminUsername,
          password: adminPasswordInput,
        }),
      });
      const json = (await res.json()) as { ok?: boolean; username?: string; error?: string };
      if (!res.ok) {
        notify("err", json.error || "Could not update admin credentials.");
        return;
      }
      setAdminUsername(json.username || adminUsername);
      setAdminPasswordInput("");
      notify("ok", "Admin credentials updated. Other existing sessions have been signed out.");
      router.refresh();
    } catch (error) {
      notify("err", error instanceof Error ? error.message : "Could not update admin credentials.");
    }
  }

  async function removeAdminAccount() {
    if (!window.confirm("Remove this admin account? This will immediately lock everyone out of /admin. To restore access, delete the __admin_credentials__ row from the site_cms table after configuring ADMIN_ID and ADMIN_PASSWORD on the server.")) {
      return;
    }
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "remove-account" }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        notify("err", json.error || "Could not remove the admin account.");
        return;
      }
      router.refresh();
    } catch (error) {
      notify("err", error instanceof Error ? error.message : "Could not remove the admin account.");
    }
  }

  async function logoutAdmin() {
    await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    router.refresh();
  }

  function openLiveWebsite() {
    document.cookie = "ff_view=site; path=/; max-age=86400; SameSite=Lax";
    router.push("/?view=site");
  }

  const groups = ["Control", "Website Sections", "Records & Inbox", "System"];

  return (
    <div
      className="min-h-screen text-ink"
      style={{
        backgroundColor: "#ffffff",
        backgroundImage:
          "linear-gradient(180deg, #f2f8fd 0%, #ffffff 340px, #f7fbfe 100%)",
      }}
    >
      {/* Toast Notification (matching clean light & sky-blue aesthetic) */}
      {toast && (
        <div
          role="status"
          className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-[18px] border px-5 py-3.5 text-sm font-bold shadow-[0_18px_40px_rgba(44,117,165,0.18)] ${
            toast.kind === "ok"
              ? "border-line bg-white text-deep-2"
              : "border-accent/30 bg-accent-soft text-accent-dark"
          }`}
        >
          <span
            className={`grid h-6 w-6 place-items-center rounded-full text-xs font-extrabold text-white ${
              toast.kind === "ok" ? "bg-brand-bright" : "bg-accent"
            }`}
          >
            {toast.kind === "ok" ? "✓" : "!"}
          </span>
          <span>{toast.text}</span>
        </div>
      )}

      {/* ==================== MATCHING TOP UTILITY BAR ==================== */}
      <div className="bg-brand-bright text-white">
        <div className="container-ff flex min-h-10 flex-wrap items-center justify-between gap-x-6 gap-y-1 py-1.5 text-[13px]">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span className="inline-flex items-center gap-2 font-semibold">
              <PhoneIcon className="h-3.5 w-3.5" />
              {cms.siteInfo.phoneLabel}
            </span>
            <span className="hidden items-center gap-2 sm:inline-flex">
              <MailIcon className="h-3.5 w-3.5" />
              {cms.siteInfo.email}
            </span>
          </div>
          <p className="hidden text-[12px] font-bold tracking-wide text-white/90 md:block">
            Website Admin Control · Changes publish immediately
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={logoutAdmin}
              className="text-[12px] font-bold text-white/90 hover:text-white hover:underline"
            >
              Sign out
            </button>
            <button
              type="button"
              onClick={openLiveWebsite}
              className="rounded-full bg-white px-3.5 py-1 text-[12px] font-extrabold text-brand transition hover:bg-mist"
            >
              View Live Website →
            </button>
          </div>
        </div>
      </div>

      {/* ==================== MATCHING FLOATING GLASS NAVBAR ==================== */}
      <header className="sticky top-0 z-50 py-2.5">
        <div className="container-ff">
          <div className="rounded-[24px] border border-line/80 bg-white/92 px-4 py-2.5 shadow-[0_16px_38px_rgba(44,117,165,0.09)] backdrop-blur-md sm:px-5">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setTab("overview")}
                className="flex shrink-0 items-center gap-3 text-left"
              >
                <img
                  src={cms.siteInfo.logo}
                  alt={cms.siteInfo.name}
                  width={215}
                  height={70}
                  className="h-[44px] w-auto object-contain"
                />
              </button>

              {/* Horizontal Section Navigation matching main website nav */}
              <nav aria-label="Admin top navigation" className="hidden xl:block">
                <ul className="flex items-center gap-1">
                  {TOP_BAR_TABS.map((key) => {
                    const item = NAV_ITEMS.find((i) => i.key === key)!;
                    const active = tab === key;
                    return (
                      <li key={key}>
                        <button
                          type="button"
                          onClick={() => setTab(key)}
                          className={`rounded-2xl px-3.5 py-2 text-[14px] font-extrabold tracking-[0.01em] transition-colors ${
                            active
                              ? "bg-mist text-brand"
                              : "text-ink/80 hover:bg-mist hover:text-brand"
                          }`}
                        >
                          {item.shortLabel}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={openLiveWebsite}
                  className="btn btn-accent btn-sm hidden sm:inline-flex"
                >
                  Live Website <ArrowRightIcon className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((v) => !v)}
                  aria-expanded={mobileMenuOpen}
                  aria-label={mobileMenuOpen ? "Close admin menu" : "Open admin menu"}
                  className="grid h-11 w-11 place-items-center rounded-2xl border border-line bg-white text-deep xl:hidden"
                >
                  {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
              </div>
            </div>

            {/* Mobile / Tablet Dropdown Menu */}
            {mobileMenuOpen && (
              <div className="mt-3 max-h-[70vh] overflow-y-auto border-t border-line pt-2.5 xl:hidden">
                <ul className="grid gap-1 sm:grid-cols-2">
                  {NAV_ITEMS.map((item) => {
                    const active = tab === item.key;
                    return (
                      <li key={item.key}>
                        <button
                          type="button"
                          onClick={() => {
                            setTab(item.key);
                            setMobileMenuOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[14.5px] font-bold ${
                            active ? "bg-mist text-brand" : "text-ink/80 hover:bg-mist/60"
                          }`}
                        >
                          <span>{item.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <button
                  type="button"
                  onClick={openLiveWebsite}
                  className="btn btn-accent mt-3 w-full"
                >
                  Open Live Public Website →
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ==================== MAIN CONTENT CONTAINER WITH CLEAN WHITE SIDEBAR ==================== */}
      <div className="container-ff py-6 lg:py-9">
        <div className="grid items-start gap-7 lg:grid-cols-12">
          {/* Clean Airy White Sidebar Card (zero dark navy) */}
          <aside className="hidden lg:col-span-3 lg:sticky lg:top-26 lg:block">
            <div className="card p-4">
              <nav className="space-y-5" aria-label="Admin sections sidebar">
                {groups.map((grp) => (
                  <div key={grp}>
                    <p className="px-3 text-[11.5px] font-extrabold text-muted">{grp}</p>
                    <ul className="mt-1.5 space-y-1">
                      {NAV_ITEMS.filter((i) => i.group === grp).map((item) => {
                        const active = tab === item.key;
                        const count =
                          item.key === "donations"
                            ? pendingDonationsCount
                            : item.key === "contacts"
                              ? unreadContactsCount
                              : 0;
                        return (
                          <li key={item.key}>
                            <button
                              type="button"
                              onClick={() => setTab(item.key)}
                              className={`flex w-full items-center justify-between rounded-2xl px-3.5 py-2.5 text-left text-[14px] font-bold transition-colors ${
                                active
                                  ? "bg-mist text-brand"
                                  : "text-ink/80 hover:bg-mist/60 hover:text-brand"
                              }`}
                            >
                              <span>{item.label}</span>
                              {count > 0 && (
                                <span className="text-xs font-extrabold text-brand">{count}</span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>

              <div className="mt-5 border-t border-line pt-4">
                <button
                  type="button"
                  onClick={openLiveWebsite}
                  className="btn btn-primary w-full text-sm"
                >
                  Switch to Live Website <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </aside>

          {/* Main Workspace Column */}
          <main className="min-w-0 lg:col-span-9">
            <p className="mb-5 text-xs font-semibold text-muted" role="status" aria-live="polite">
              {savingKey ? "Saving your changes…" : "Website edits save automatically as you make them."}
            </p>
            {/* ==================== 1. OVERVIEW ==================== */}
            {tab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-deep-2">Website Control Dashboard</h1>
                  <p className="mt-2 max-w-2xl text-[1.03rem] text-ink/75">
                    Website text, numbers, banners, photos, branding and contact details save automatically as you edit.
                  </p>
                </div>

                {/* Clean Light Stat Summary Cards matching main site cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    {
                      target: "donations" as AdminTab,
                      value: String(donations.length),
                      label: "Donation pledges",
                      sub: `${pendingDonationsCount} awaiting confirmation`,
                    },
                    {
                      target: "contacts" as AdminTab,
                      value: String(contacts.length),
                      label: "Contact inquiries",
                      sub: `${unreadContactsCount} unread messages`,
                    },
                    {
                      target: "hero" as AdminTab,
                      value: String(cms.heroSlides.length),
                      label: "Hero slides",
                      sub: "Auto-rotating banners",
                    },
                    {
                      target: "gallery" as AdminTab,
                      value: String(cms.pakistanGallery.length),
                      label: "Gallery photos",
                      sub: "Pakistan photography",
                    },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setTab(item.target)}
                      className="card card-hover p-5 text-left"
                    >
                      <p className="font-display text-3xl font-extrabold text-brand tabular-nums">
                        {item.value}
                      </p>
                      <p className="mt-1 font-display text-[15.5px] font-bold text-deep-2">{item.label}</p>
                      <p className="mt-0.5 text-xs text-muted">{item.sub}</p>
                    </button>
                  ))}
                </div>

                {/* Attached Bank Accounts Quick Card right on Overview */}
                <div className="card p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl text-deep-2">
                        Attached Bank Accounts &amp; Payment Channels (
                        {cms.paymentConfig.bankAccounts.filter((b: BankAccountConfig) => b.enabled).length} Banks ·{" "}
                        {cms.paymentConfig.mobileWallets.filter((w: MobileWalletConfig) => w.enabled).length} Wallets)
                      </h2>
                      <p className="mt-1 text-sm text-muted">
                        Connect or update your IBAN, Account Number, Branch Code, Raast QR, SWIFT or Card Gateway.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTab("banks")}
                      className="btn btn-accent btn-sm"
                    >
                      Attach / Configure Bank <ArrowRightIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="mt-4 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                    {cms.paymentConfig.bankAccounts.map((bank: BankAccountConfig) => (
                      <button
                        key={bank.id}
                        type="button"
                        onClick={() => setTab("banks")}
                        className="rounded-[16px] border border-line bg-mist/45 p-4 text-left transition hover:border-brand hover:bg-mist"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-display text-sm font-bold text-deep-2">{bank.bankName}</span>
                          <span className="text-xs font-bold text-brand">
                            {bank.currency === "MULTI" ? "USD/GBP/EUR" : bank.currency}
                          </span>
                        </div>
                        <p className="mt-1 text-xs font-semibold text-ink/80">{bank.accountTitle}</p>
                        <p className="mt-1 truncate font-mono text-xs font-bold text-deep-2">
                          {formatIbanDisplay(bank.iban)}
                        </p>
                        <p className="mt-1 text-[11px] text-muted">{bank.category}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Front-Page Hero Banners Visual Strip */}
                <div className="card p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl text-deep-2">
                        Active Front-Page Hero Banners ({cms.heroSlides.length})
                      </h2>
                      <p className="mt-1 text-sm text-muted">
                        Click any banner card below to edit its photo, headline, colors or buttons.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTab("hero")}
                      className="btn btn-primary btn-sm"
                    >
                      Edit Hero Banners <ArrowRightIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="mt-5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                    {cms.heroSlides.map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setTab("hero")}
                        className="group relative h-36 overflow-hidden rounded-[18px] border border-line bg-mist text-left transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <img
                          src={s.image}
                          alt={s.imageAlt}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                        <div
                          className="absolute inset-0 flex flex-col justify-end p-4"
                          style={{
                            background: `linear-gradient(180deg, rgba(${s.tintRgb}, 0.22) 0%, rgba(${s.tintRgb}, 0.9) 100%)`,
                          }}
                        >
                          <span className="text-[11px] font-bold text-white/80">Slide {idx + 1}</span>
                          <span className="line-clamp-2 font-display text-sm leading-tight font-extrabold text-white">
                            {s.headlineTop}{" "}
                            <span style={{ color: s.accentHex }}>{s.headlineAccent}</span>
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Website Section Cards */}
                <div>
                  <h2 className="text-xl text-deep-2">Manage Website Sections</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      {
                        target: "banks" as AdminTab,
                        title: "Bank & Payment System",
                        desc: "Attach your HBL, Meezan, UBL, MCB, SWIFT, Raast, JazzCash, EasyPaisa & Card accounts.",
                      },
                      {
                        target: "hero" as AdminTab,
                        title: "Front-Page Auto Slider",
                        desc: "Edit headlines, colors, buttons and photos on the rotating hero banner.",
                      },
                      {
                        target: "impact" as AdminTab,
                        title: "Impact Numbers Band",
                        desc: "Update the 6 statistics and gold icons shown on the Home and About pages.",
                      },
                      {
                        target: "story" as AdminTab,
                        title: "Story, Vision & Clinics",
                        desc: "Update the founding story, Vision & Mission, and Rawalpindi clinics.",
                      },
                      {
                        target: "programmes" as AdminTab,
                        title: "Programmes & Vertical Slider",
                        desc: "Customize the 7 expanding vertical strips and full programme pages.",
                      },
                      {
                        target: "stories" as AdminTab,
                        title: "Field Stories Carousel",
                        desc: "Add new field stories, swap photos, or reorder cards on the homepage.",
                      },
                      {
                        target: "careers" as AdminTab,
                        title: "Careers, Vacancies & Tenders",
                        desc: "Edit careers page copy, add or remove job listings, and manage tender notices and contact details.",
                      },
                      {
                        target: "settings" as AdminTab,
                        title: "Logo, Phones, Emails & Lock",
                        desc: "Update header/footer phones, emails, logo, social links and passcode.",
                      },
                    ].map((q) => (
                      <button
                        key={q.target}
                        type="button"
                        onClick={() => setTab(q.target)}
                        className="card card-hover flex flex-col justify-between p-5 text-left"
                      >
                        <div>
                          <h3 className="text-lg text-deep-2">{q.title}</h3>
                          <p className="mt-2 text-[14.5px] leading-relaxed text-ink/70">{q.desc}</p>
                        </div>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-brand">
                          Open editor <ArrowRightIcon className="h-3.5 w-3.5" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Pledges & Recent Contact Messages */}
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="card p-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg text-deep-2">Recent Donation Pledges</h2>
                      <button
                        type="button"
                        onClick={() => setTab("donations")}
                        className="text-xs font-bold text-brand hover:underline"
                      >
                        View all →
                      </button>
                    </div>
                    {donations.length === 0 ? (
                      <p className="mt-4 text-sm text-muted">No donation pledges recorded yet.</p>
                    ) : (
                      <ul className="mt-4 divide-y divide-line">
                        {donations.slice(0, 5).map((d) => (
                          <li key={d.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                            <div className="min-w-0">
                              <p className="truncate font-bold text-deep-2">{d.donorName}</p>
                              <p className="truncate text-xs text-muted">
                                {d.purpose || "General"} · {d.frequency}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-brand tabular-nums">
                                {d.currency} {Number(d.amount).toLocaleString()}
                              </p>
                              <p className="text-[11.5px] text-muted capitalize">{d.status}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="card p-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg text-deep-2">Recent Contact Messages</h2>
                      <button
                        type="button"
                        onClick={() => setTab("contacts")}
                        className="text-xs font-bold text-brand hover:underline"
                      >
                        Open inbox →
                      </button>
                    </div>
                    {contacts.length === 0 ? (
                      <p className="mt-4 text-sm text-muted">No contact inquiries received yet.</p>
                    ) : (
                      <ul className="mt-4 divide-y divide-line">
                        {contacts.slice(0, 5).map((c) => (
                          <li key={c.id} className="py-3 text-sm">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-bold text-deep-2">{c.name}</p>
                              <span className="text-xs text-muted capitalize">{c.status}</span>
                            </div>
                            <p className="mt-0.5 truncate text-xs text-ink/70">
                              {c.subject}: {c.message}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ==================== BANK & PAYMENT SYSTEM ==================== */}
            {tab === "banks" && (
              <BankSystemPanel
                config={cms.paymentConfig}
                onChange={(next) => setCms({ ...cms, paymentConfig: next })}
                onSave={() => saveSection("paymentConfig")}
                onReset={() => resetSection("paymentConfig")}
                saving={savingKey === "paymentConfig"}
                library={library}
                onUploaded={addUploadedToLibrary}
              />
            )}

            {/* ==================== 2. HERO BANNERS ==================== */}
            {tab === "hero" && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl text-deep-2 sm:text-3xl">Front-Page Auto-Changing Hero Banners</h1>
                    <p className="mt-1 text-sm text-ink/75">
                      Slides rotate automatically every 4.2 seconds with a smooth 1000ms crossfade on the homepage.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    <button
                      type="button"
                      onClick={() =>
                        setCms((prev) => ({
                          ...prev,
                          heroSlides: [
                            ...prev.heroSlides,
                            {
                              shortTab: `Appeal ${prev.heroSlides.length + 1}`,
                              eyebrow: "Friends Foundation Pakistan",
                              headlineTop: "SUPPORT VULNERABLE",
                              headlineAccent: "FAMILIES IN PAKISTAN",
                              lead: "Provide free healthcare, clean drinking water and emergency relief to communities in need.",
                              image: "/images/appeal/pk-madyan-flood-child.jpg",
                              imageAlt: "Humanitarian support across Pakistan",
                              focalClass: "object-center",
                              tintRgb: "8, 48, 102",
                              accentHex: "#facc15",
                              primaryLabel: "Donate Now",
                              primaryHref: "/donate",
                              secondaryLabel: "Our Work",
                              secondaryHref: "/our-work",
                              defaultPurpose: "Where it is needed most",
                              credit: "Pakistan",
                            },
                          ],
                        }))
                      }
                      className="btn btn-ghost btn-sm"
                    >
                      + Add Slide
                    </button>
                    <button
                      type="button"
                      onClick={() => resetSection("heroSlides")}
                      className="btn btn-ghost btn-sm"
                    >
                      Reset Default
                    </button>
                    <button
                      type="button"
                      disabled={savingKey === "heroSlides"}
                      onClick={() => saveSection("heroSlides")}
                      className="btn btn-accent btn-sm disabled:opacity-60"
                    >
                      {savingKey === "heroSlides" ? "Saving…" : "Save & Publish Live"}
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {cms.heroSlides.map((slide, idx) => (
                    <div key={idx} className="card p-6">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3.5">
                        <span className="font-display text-base font-bold text-deep-2">
                          Slide {idx + 1} — {slide.headlineTop} {slide.headlineAccent}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() =>
                              setCms((p) => ({ ...p, heroSlides: swapItems(p.heroSlides, idx, idx - 1) }))
                            }
                            className="rounded-full border border-line px-3 py-1 text-xs font-bold text-ink hover:border-brand disabled:opacity-35"
                          >
                            ↑ Up
                          </button>
                          <button
                            type="button"
                            disabled={idx === cms.heroSlides.length - 1}
                            onClick={() =>
                              setCms((p) => ({ ...p, heroSlides: swapItems(p.heroSlides, idx, idx + 1) }))
                            }
                            className="rounded-full border border-line px-3 py-1 text-xs font-bold text-ink hover:border-brand disabled:opacity-35"
                          >
                            ↓ Down
                          </button>
                          {cms.heroSlides.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                setCms((p) => ({
                                  ...p,
                                  heroSlides: p.heroSlides.filter((_, i) => i !== idx),
                                }))
                              }
                              className="rounded-full border border-accent/30 px-3 py-1 text-xs font-bold text-accent hover:bg-accent-soft"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Live Mini Banner Preview */}
                      <div className="relative mb-5 h-44 overflow-hidden rounded-[16px] bg-mist">
                        <img src={slide.image} alt="" className="h-full w-full object-cover object-center" />
                        <div
                          className="absolute inset-0 flex flex-col justify-center p-5"
                          style={{
                            background: `linear-gradient(95deg, rgba(${slide.tintRgb}, 0.94) 0%, rgba(${slide.tintRgb}, 0.78) 40%, rgba(${slide.tintRgb}, 0.15) 100%)`,
                          }}
                        >
                          <p className="font-display text-lg leading-tight font-extrabold text-white">
                            <span className="block">{slide.headlineTop}</span>
                            <span style={{ color: slide.accentHex }}>{slide.headlineAccent}</span>
                          </p>
                          <p className="mt-1 line-clamp-2 max-w-md text-xs text-white/85">{slide.lead}</p>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="label">Headline Top Line (White)</label>
                          <input
                            type="text"
                            value={slide.headlineTop}
                            onChange={(e) => {
                              const next = [...cms.heroSlides];
                              next[idx] = { ...slide, headlineTop: e.target.value };
                              setCms({ ...cms, heroSlides: next });
                            }}
                            className="field"
                          />
                        </div>
                        <div>
                          <label className="label">Headline Second Line (Highlighted)</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={slide.headlineAccent}
                              onChange={(e) => {
                                const next = [...cms.heroSlides];
                                next[idx] = { ...slide, headlineAccent: e.target.value };
                                setCms({ ...cms, heroSlides: next });
                              }}
                              className="field flex-1"
                            />
                            <input
                              type="color"
                              value={slide.accentHex}
                              aria-label="Highlight color"
                              onChange={(e) => {
                                const next = [...cms.heroSlides];
                                next[idx] = { ...slide, accentHex: e.target.value };
                                setCms({ ...cms, heroSlides: next });
                              }}
                              className="h-12 w-14 cursor-pointer rounded-xl border border-line bg-white p-1"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <label className="label">Subtitle / Description</label>
                          <textarea
                            rows={2}
                            value={slide.lead}
                            onChange={(e) => {
                              const next = [...cms.heroSlides];
                              next[idx] = { ...slide, lead: e.target.value };
                              setCms({ ...cms, heroSlides: next });
                            }}
                            className="field"
                          />
                        </div>

                        <div>
                          <label className="label">Primary Button Text &amp; Link</label>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={slide.primaryLabel}
                              onChange={(e) => {
                                const next = [...cms.heroSlides];
                                next[idx] = { ...slide, primaryLabel: e.target.value };
                                setCms({ ...cms, heroSlides: next });
                              }}
                              className="field"
                            />
                            <input
                              type="text"
                              value={slide.primaryHref}
                              onChange={(e) => {
                                const next = [...cms.heroSlides];
                                next[idx] = { ...slide, primaryHref: e.target.value };
                                setCms({ ...cms, heroSlides: next });
                              }}
                              className="field"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="label">Left Color Overlay Tint</label>
                          <select
                            value={slide.tintRgb}
                            onChange={(e) => {
                              const next = [...cms.heroSlides];
                              next[idx] = { ...slide, tintRgb: e.target.value };
                              setCms({ ...cms, heroSlides: next });
                            }}
                            className="field"
                          >
                            {TINT_PRESETS.map((t) => (
                              <option key={t.rgb} value={t.rgb}>
                                {t.label} ({t.rgb})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="md:col-span-2">
                          <ImageField
                            label="Banner Background Photograph (2400px widescreen recommended)"
                            value={slide.image}
                            library={library}
                            onUploaded={addUploadedToLibrary}
                            onChange={(url) => {
                              const next = [...cms.heroSlides];
                              next[idx] = { ...slide, image: url };
                              setCms({ ...cms, heroSlides: next });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================== 3. IMPACT NUMBERS ==================== */}
            {tab === "impact" && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl text-deep-2 sm:text-3xl">Impact Numbers Band (Home &amp; About)</h1>
                    <p className="mt-1 text-sm text-ink/75">
                      Edit the headline figures, captions and icons displayed in the statistics section.
                    </p>
                  </div>
                  <div className="flex gap-2.5">
                    <button
                      type="button"
                      onClick={() => resetSection("impactBand")}
                      className="btn btn-ghost btn-sm"
                    >
                      Reset Default
                    </button>
                    <button
                      type="button"
                      disabled={savingKey === "impactBand"}
                      onClick={() => saveSection("impactBand")}
                      className="btn btn-accent btn-sm disabled:opacity-60"
                    >
                      {savingKey === "impactBand" ? "Saving…" : "Save & Publish Live"}
                    </button>
                  </div>
                </div>

                {/* Live Section Preview */}
                <div className="impact-band-surface rounded-[22px] p-6">
                  <div className="mx-auto max-w-xl text-center">
                    {cms.impactBand.kicker && (
                      <p className="text-[11px] font-extrabold tracking-[0.14em] text-[#fbbf24]">
                        {cms.impactBand.kicker}
                      </p>
                    )}
                    <h2
                      style={{ fontFamily: "var(--font-serif-title)" }}
                      className="mt-2 text-2xl font-bold text-white"
                    >
                      {cms.impactBand.heading}
                    </h2>
                    <p className="mt-2 text-sm text-slate-300">{cms.impactBand.subtitle}</p>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                    {cms.impactBand.stats.map((st, idx) => (
                      <div key={idx} className="stat-dark-card grid grid-cols-[36px_1fr] items-center gap-2.5 p-3.5">
                        <ImpactStatIcon name={st.icon} className="h-7 w-7" />
                        <div className="min-w-0">
                          <strong className="block text-xl leading-none font-extrabold text-white tabular-nums">
                            {st.value}
                          </strong>
                          <span className="mt-1 block text-xs leading-snug text-slate-300">{st.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card space-y-5 p-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="label">Top Label (optional)</label>
                      <input
                        type="text"
                        value={cms.impactBand.kicker}
                        onChange={(e) =>
                          setCms({ ...cms, impactBand: { ...cms.impactBand, kicker: e.target.value } })
                        }
                        className="field"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label">Main Section Heading</label>
                      <input
                        type="text"
                        value={cms.impactBand.heading}
                        onChange={(e) =>
                          setCms({ ...cms, impactBand: { ...cms.impactBand, heading: e.target.value } })
                        }
                        className="field"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="label">Subtitle</label>
                      <input
                        type="text"
                        value={cms.impactBand.subtitle}
                        onChange={(e) =>
                          setCms({ ...cms, impactBand: { ...cms.impactBand, subtitle: e.target.value } })
                        }
                        className="field"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <h3 className="text-lg text-deep-2">Stat Cards</h3>
                    <button
                      type="button"
                      onClick={() =>
                        setCms({
                          ...cms,
                          impactBand: {
                            ...cms.impactBand,
                            stats: [...cms.impactBand.stats, { icon: "people", value: "100+", label: "New metric" }],
                          },
                        })
                      }
                      className="btn btn-ghost btn-sm"
                    >
                      + Add Card
                    </button>
                  </div>

                  <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
                    {cms.impactBand.stats.map((st, idx) => (
                      <div key={idx} className="space-y-2.5 rounded-[16px] border border-line bg-mist/40 p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-brand">Card #{idx + 1}</span>
                          {cms.impactBand.stats.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                setCms({
                                  ...cms,
                                  impactBand: {
                                    ...cms.impactBand,
                                    stats: cms.impactBand.stats.filter((_, i) => i !== idx),
                                  },
                                })
                              }
                              className="text-xs font-bold text-accent hover:underline"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                        <select
                          value={st.icon}
                          onChange={(e) => {
                            const stats = [...cms.impactBand.stats];
                            stats[idx] = { ...st, icon: e.target.value as StatIconName };
                            setCms({ ...cms, impactBand: { ...cms.impactBand, stats } });
                          }}
                          className="field py-2 text-xs font-semibold"
                        >
                          {STAT_ICON_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              Icon: {opt.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={st.value}
                          placeholder="Number (e.g. 3M+)"
                          onChange={(e) => {
                            const stats = [...cms.impactBand.stats];
                            stats[idx] = { ...st, value: e.target.value };
                            setCms({ ...cms, impactBand: { ...cms.impactBand, stats } });
                          }}
                          className="field py-2 text-sm font-bold"
                        />
                        <input
                          type="text"
                          value={st.label}
                          placeholder="Caption label"
                          onChange={(e) => {
                            const stats = [...cms.impactBand.stats];
                            stats[idx] = { ...st, label: e.target.value };
                            setCms({ ...cms, impactBand: { ...cms.impactBand, stats } });
                          }}
                          className="field py-2 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ==================== 4. STORY, VISION & CLINICS ==================== */}
            {tab === "story" && (
              <div className="space-y-8">
                <div className="card space-y-5 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                    <div>
                      <h2 className="text-xl text-deep-2">Founding Story, Vision &amp; Mission</h2>
                      <p className="text-xs text-muted">Shown on the Home page and About Us page.</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => resetSection("storySection")}
                        className="btn btn-ghost btn-sm"
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        disabled={savingKey === "storySection"}
                        onClick={() => saveSection("storySection")}
                        className="btn btn-accent btn-sm"
                      >
                        {savingKey === "storySection" ? "Saving…" : "Save Story & Mission"}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="label">Story Heading</label>
                    <input
                      type="text"
                      value={cms.storySection.heading}
                      onChange={(e) =>
                        setCms({ ...cms, storySection: { ...cms.storySection, heading: e.target.value } })
                      }
                      className="field"
                    />
                  </div>

                  <div>
                    <label className="label">Story Paragraphs (separate paragraphs with a blank line)</label>
                    <textarea
                      rows={6}
                      value={cms.storySection.paragraphs.join("\n\n")}
                      onChange={(e) =>
                        setCms({
                          ...cms,
                          storySection: {
                            ...cms.storySection,
                            paragraphs: e.target.value.split(/\n\s*\n/).filter(Boolean),
                          },
                        })
                      }
                      className="field leading-relaxed"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="label">Vision Statement</label>
                      <textarea
                        rows={4}
                        value={cms.storySection.vision}
                        onChange={(e) =>
                          setCms({ ...cms, storySection: { ...cms.storySection, vision: e.target.value } })
                        }
                        className="field"
                      />
                    </div>
                    <div>
                      <label className="label">Mission Statement</label>
                      <textarea
                        rows={4}
                        value={cms.storySection.mission}
                        onChange={(e) =>
                          setCms({ ...cms, storySection: { ...cms.storySection, mission: e.target.value } })
                        }
                        className="field"
                      />
                    </div>
                  </div>

                  <ImageField
                    label="Mission Card Photograph"
                    value={cms.storySection.image}
                    library={library}
                    onUploaded={addUploadedToLibrary}
                    onChange={(url) =>
                      setCms({ ...cms, storySection: { ...cms.storySection, image: url } })
                    }
                  />
                </div>

                {/* Health Centres Section */}
                <div className="card space-y-5 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                    <div>
                      <h2 className="text-xl text-deep-2">Primary Health Centres Section (Homepage)</h2>
                      <p className="text-xs text-muted">
                        Controls the Rawalpindi family clinics showcase and annual patient figures.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => resetSection("healthSection")}
                        className="btn btn-ghost btn-sm"
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        disabled={savingKey === "healthSection"}
                        onClick={() => saveSection("healthSection")}
                        className="btn btn-accent btn-sm"
                      >
                        {savingKey === "healthSection" ? "Saving…" : "Save Clinics Section"}
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="label">Heading</label>
                      <input
                        type="text"
                        value={cms.healthSection.heading}
                        onChange={(e) =>
                          setCms({ ...cms, healthSection: { ...cms.healthSection, heading: e.target.value } })
                        }
                        className="field"
                      />
                    </div>
                    <div>
                      <label className="label">Photo Caption</label>
                      <input
                        type="text"
                        value={cms.healthSection.imageCaption}
                        onChange={(e) =>
                          setCms({ ...cms, healthSection: { ...cms.healthSection, imageCaption: e.target.value } })
                        }
                        className="field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label">Description</label>
                    <textarea
                      rows={3}
                      value={cms.healthSection.description}
                      onChange={(e) =>
                        setCms({ ...cms, healthSection: { ...cms.healthSection, description: e.target.value } })
                      }
                      className="field"
                    />
                  </div>

                  <div>
                    <label className="label">Services Checklist (one item per line)</label>
                    <textarea
                      rows={5}
                      value={cms.healthSection.services.join("\n")}
                      onChange={(e) =>
                        setCms({
                          ...cms,
                          healthSection: {
                            ...cms.healthSection,
                            services: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                          },
                        })
                      }
                      className="field"
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {cms.healthSection.patientStats.map((ps, idx) => (
                      <div key={idx} className="space-y-2 rounded-[16px] border border-line bg-mist/40 p-3.5">
                        <input
                          type="text"
                          value={ps.value}
                          onChange={(e) => {
                            const patientStats = [...cms.healthSection.patientStats];
                            patientStats[idx] = { ...ps, value: e.target.value };
                            setCms({ ...cms, healthSection: { ...cms.healthSection, patientStats } });
                          }}
                          className="field py-1.5 text-sm font-bold"
                        />
                        <input
                          type="text"
                          value={ps.label}
                          onChange={(e) => {
                            const patientStats = [...cms.healthSection.patientStats];
                            patientStats[idx] = { ...ps, label: e.target.value };
                            setCms({ ...cms, healthSection: { ...cms.healthSection, patientStats } });
                          }}
                          className="field py-1.5 text-xs"
                        />
                      </div>
                    ))}
                  </div>

                  <ImageField
                    label="Health Centres Photograph"
                    value={cms.healthSection.image}
                    library={library}
                    onUploaded={addUploadedToLibrary}
                    onChange={(url) =>
                      setCms({ ...cms, healthSection: { ...cms.healthSection, image: url } })
                    }
                  />
                </div>
              </div>
            )}

            {tab === "careers" && (
              <CareersEditor
                config={cms.careersSection}
                onChange={(careersSection) => setCms((prev) => ({ ...prev, careersSection }))}
                onSave={() => saveSection("careersSection")}
                onReset={() => resetSection("careersSection")}
                saving={savingKey === "careersSection"}
              />
            )}

            {/* ==================== 5. PROGRAMMES & VERTICAL SLIDER ==================== */}
            {tab === "programmes" && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl text-deep-2 sm:text-3xl">Programmes &amp; Vertical Slider</h1>
                    <p className="mt-1 text-sm text-ink/75">
                      Manage both the 7-panel interactive accordion slider and full programme pages (`/our-work/...`).
                    </p>
                  </div>

                  <div className="flex gap-1.5 rounded-full border border-line bg-white p-1">
                    <button
                      type="button"
                      onClick={() => setProgMode("slider")}
                      className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                        progMode === "slider" ? "bg-brand text-white" : "text-muted hover:text-deep-2"
                      }`}
                    >
                      7-Panel Vertical Slider
                    </button>
                    <button
                      type="button"
                      onClick={() => setProgMode("pages")}
                      className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                        progMode === "pages" ? "bg-brand text-white" : "text-muted hover:text-deep-2"
                      }`}
                    >
                      Detailed Programme Pages ({cms.areas.length})
                    </button>
                  </div>
                </div>

                {progMode === "slider" ? (
                  <div className="space-y-5">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => resetSection("thematicSlides")}
                        className="btn btn-ghost btn-sm"
                      >
                        Reset Slider
                      </button>
                      <button
                        type="button"
                        disabled={savingKey === "thematicSlides"}
                        onClick={() => saveSection("thematicSlides")}
                        className="btn btn-accent btn-sm"
                      >
                        {savingKey === "thematicSlides" ? "Saving…" : "Save Vertical Slider"}
                      </button>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-2">
                      {cms.thematicSlides.map((s, idx) => (
                        <div key={s.slug} className="card space-y-3.5 p-5">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              <input
                                type="color"
                                value={s.color}
                                aria-label="Strip color"
                                onChange={(e) => {
                                  const next = [...cms.thematicSlides];
                                  next[idx] = { ...s, color: e.target.value };
                                  setCms({ ...cms, thematicSlides: next });
                                }}
                                className="h-8 w-10 cursor-pointer rounded-lg border border-line bg-white p-0.5"
                              />
                              <span className="font-display text-sm font-bold text-deep-2">{s.title}</span>
                            </div>
                            <span className="text-xs text-muted">/our-work/{s.slug}</span>
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                              <label className="label text-xs">Vertical Strip Label</label>
                              <input
                                type="text"
                                value={s.tabLabel}
                                onChange={(e) => {
                                  const next = [...cms.thematicSlides];
                                  next[idx] = { ...s, tabLabel: e.target.value };
                                  setCms({ ...cms, thematicSlides: next });
                                }}
                                className="field py-2 text-sm"
                              />
                            </div>
                            <div>
                              <label className="label text-xs">Expanded Heading</label>
                              <input
                                type="text"
                                value={s.title}
                                onChange={(e) => {
                                  const next = [...cms.thematicSlides];
                                  next[idx] = { ...s, title: e.target.value };
                                  setCms({ ...cms, thematicSlides: next });
                                }}
                                className="field py-2 text-sm"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="label text-xs">Description</label>
                            <textarea
                              rows={2}
                              value={s.subtitle}
                              onChange={(e) => {
                                const next = [...cms.thematicSlides];
                                next[idx] = { ...s, subtitle: e.target.value };
                                setCms({ ...cms, thematicSlides: next });
                              }}
                              className="field py-2 text-sm"
                            />
                          </div>

                          <ImageField
                            label="Panel Photo"
                            value={s.image}
                            library={library}
                            onUploaded={addUploadedToLibrary}
                            onChange={(url) => {
                              const next = [...cms.thematicSlides];
                              next[idx] = { ...s, image: url };
                              setCms({ ...cms, thematicSlides: next });
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-x-5 gap-y-2 border-b border-line">
                        {cms.areas.map((a, i) => (
                          <button
                            key={a.slug}
                            type="button"
                            onClick={() => setSelectedAreaIdx(i)}
                            className={`-mb-px border-b-2 pb-2.5 text-sm font-bold transition ${
                              selectedAreaIdx === i
                                ? "border-brand text-brand"
                                : "border-transparent text-muted hover:text-deep-2"
                            }`}
                          >
                            {a.title}
                          </button>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => resetSection("areas")}
                          className="btn btn-ghost btn-sm"
                        >
                          Reset Pages
                        </button>
                        <button
                          type="button"
                          disabled={savingKey === "areas"}
                          onClick={() => saveSection("areas")}
                          className="btn btn-accent btn-sm"
                        >
                          {savingKey === "areas" ? "Saving…" : "Save Programme Pages"}
                        </button>
                      </div>
                    </div>

                    {cms.areas[selectedAreaIdx] && (() => {
                      const area = cms.areas[selectedAreaIdx];
                      const updateArea = (patch: Partial<typeof area>) => {
                        const next = [...cms.areas];
                        next[selectedAreaIdx] = { ...area, ...patch };
                        setCms({ ...cms, areas: next });
                      };
                      return (
                        <div className="card space-y-4 p-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg text-deep-2">{area.title}</h3>
                            <Link
                              href={`/our-work/${area.slug}`}
                              className="text-xs font-bold text-brand hover:underline"
                            >
                              Open /our-work/{area.slug} →
                            </Link>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <label className="label text-xs">Page Title</label>
                              <input
                                type="text"
                                value={area.title}
                                onChange={(e) => updateArea({ title: e.target.value })}
                                className="field"
                              />
                            </div>
                            <div>
                              <label className="label text-xs">Main Photo Caption</label>
                              <input
                                type="text"
                                value={area.imageCaption}
                                onChange={(e) => updateArea({ imageCaption: e.target.value })}
                                className="field"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="label text-xs">Lead Summary</label>
                            <textarea
                              rows={2}
                              value={area.summary}
                              onChange={(e) => updateArea({ summary: e.target.value })}
                              className="field"
                            />
                          </div>

                          <div>
                            <label className="label text-xs">
                              Full Article Paragraphs (separate paragraphs with a blank line)
                            </label>
                            <textarea
                              rows={8}
                              value={area.body.join("\n\n")}
                              onChange={(e) =>
                                updateArea({ body: e.target.value.split(/\n\s*\n/).filter(Boolean) })
                              }
                              className="field leading-relaxed"
                            />
                          </div>

                          <div>
                            <label className="label text-xs">Partner Organisations (comma-separated)</label>
                            <input
                              type="text"
                              value={area.partners.join(", ")}
                              onChange={(e) =>
                                updateArea({
                                  partners: e.target.value.split(",").map((p) => p.trim()).filter(Boolean),
                                })
                              }
                              className="field"
                            />
                          </div>

                          <ImageField
                            label="Main Programme Image"
                            value={area.image}
                            library={library}
                            onUploaded={addUploadedToLibrary}
                            onChange={(url) => updateArea({ image: url })}
                          />
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}

            {/* ==================== 6. FIELD STORIES CAROUSEL ==================== */}
            {tab === "stories" && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl text-deep-2 sm:text-3xl">Field Stories Carousel (Homepage)</h1>
                    <p className="mt-1 text-sm text-ink/75">
                      Add, edit, upload images for, or reorder stories in the horizontal carousel on the homepage.
                    </p>
                  </div>
                  <div className="flex gap-2.5">
                    <button
                      type="button"
                      onClick={() =>
                        setCms((p) => ({
                          ...p,
                          featureUpdates: [
                            {
                              image: "/images/appeal/pk-gwadar-girl.jpg",
                              tag: "",
                              title: "New field update from Pakistan",
                              text: "Describe how your field teams supported local families and communities.",
                              href: "/our-work",
                            },
                            ...p.featureUpdates,
                          ],
                        }))
                      }
                      className="btn btn-ghost btn-sm"
                    >
                      + Add Story Card
                    </button>
                    <button
                      type="button"
                      onClick={() => resetSection("featureUpdates")}
                      className="btn btn-ghost btn-sm"
                    >
                      Reset Default
                    </button>
                    <button
                      type="button"
                      disabled={savingKey === "featureUpdates"}
                      onClick={() => saveSection("featureUpdates")}
                      className="btn btn-accent btn-sm"
                    >
                      {savingKey === "featureUpdates" ? "Saving…" : "Save Stories Live"}
                    </button>
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  {cms.featureUpdates.map((item, idx) => (
                    <div key={idx} className="card space-y-3.5 p-5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-brand">Story Card #{idx + 1}</span>
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() =>
                              setCms((p) => ({
                                ...p,
                                featureUpdates: swapItems(p.featureUpdates, idx, idx - 1),
                              }))
                            }
                            className="rounded-full border border-line px-2.5 py-0.5 text-xs font-bold disabled:opacity-35"
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            disabled={idx === cms.featureUpdates.length - 1}
                            onClick={() =>
                              setCms((p) => ({
                                ...p,
                                featureUpdates: swapItems(p.featureUpdates, idx, idx + 1),
                              }))
                            }
                            className="rounded-full border border-line px-2.5 py-0.5 text-xs font-bold disabled:opacity-35"
                          >
                            ↓
                          </button>
                          {cms.featureUpdates.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                setCms((p) => ({
                                  ...p,
                                  featureUpdates: p.featureUpdates.filter((_, i) => i !== idx),
                                }))
                              }
                              className="rounded-full border border-accent/30 px-2.5 py-0.5 text-xs font-bold text-accent"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="label text-xs">Headline</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const next = [...cms.featureUpdates];
                            next[idx] = { ...item, title: e.target.value };
                            setCms({ ...cms, featureUpdates: next });
                          }}
                          className="field py-2 text-sm"
                        />
                      </div>

                      <div>
                        <label className="label text-xs">Summary</label>
                        <textarea
                          rows={3}
                          value={item.text}
                          onChange={(e) => {
                            const next = [...cms.featureUpdates];
                            next[idx] = { ...item, text: e.target.value };
                            setCms({ ...cms, featureUpdates: next });
                          }}
                          className="field py-2 text-sm"
                        />
                      </div>

                      <div>
                        <label className="label text-xs">Read More Link</label>
                        <input
                          type="text"
                          value={item.href}
                          onChange={(e) => {
                            const next = [...cms.featureUpdates];
                            next[idx] = { ...item, href: e.target.value };
                            setCms({ ...cms, featureUpdates: next });
                          }}
                          className="field py-1.5 text-sm"
                        />
                      </div>

                      <ImageField
                        label="Story Card Image"
                        value={item.image}
                        library={library}
                        onUploaded={addUploadedToLibrary}
                        onChange={(url) => {
                          const next = [...cms.featureUpdates];
                          next[idx] = { ...item, image: url };
                          setCms({ ...cms, featureUpdates: next });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================== 7. MEDIA GALLERY ==================== */}
            {tab === "gallery" && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl text-deep-2 sm:text-3xl">Media &amp; Photo Gallery (`/media`)</h1>
                    <p className="mt-1 text-sm text-ink/75">
                      Upload new photos straight from your computer (stored permanently in PostgreSQL) or edit captions and locations.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    <label className="btn btn-primary btn-sm cursor-pointer">
                      {galleryUploading ? "Uploading…" : "+ Upload Photos"}
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        disabled={galleryUploading}
                        onChange={handleGalleryQuickUpload}
                        className="sr-only"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => resetSection("pakistanGallery")}
                      className="btn btn-ghost btn-sm"
                    >
                      Reset Gallery
                    </button>

                    <button
                      type="button"
                      disabled={savingKey === "pakistanGallery"}
                      onClick={() => saveSection("pakistanGallery")}
                      className="btn btn-accent btn-sm"
                    >
                      {savingKey === "pakistanGallery" ? "Saving…" : "Save Gallery"}
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cms.pakistanGallery.map((photo, idx) => (
                    <div key={`${photo.src}-${idx}`} className="card overflow-hidden">
                      <img src={photo.src} alt={photo.caption} className="aspect-[4/3] w-full object-cover" />
                      <div className="space-y-2.5 p-4">
                        <input
                          type="text"
                          value={photo.caption}
                          placeholder="Caption"
                          onChange={(e) => {
                            const next = [...cms.pakistanGallery];
                            next[idx] = { ...photo, caption: e.target.value };
                            setCms({ ...cms, pakistanGallery: next });
                          }}
                          className="field py-1.5 text-xs font-semibold"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={photo.place}
                            placeholder="Location in Pakistan"
                            onChange={(e) => {
                              const next = [...cms.pakistanGallery];
                              next[idx] = { ...photo, place: e.target.value };
                              setCms({ ...cms, pakistanGallery: next });
                            }}
                            className="field py-1.5 text-xs"
                          />
                          <input
                            type="text"
                            value={photo.category}
                            placeholder="Category"
                            onChange={(e) => {
                              const next = [...cms.pakistanGallery];
                              next[idx] = { ...photo, category: e.target.value };
                              setCms({ ...cms, pakistanGallery: next });
                            }}
                            className="field py-1.5 text-xs"
                          />
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <span className="truncate text-[11px] text-muted">{photo.credit}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setCms({
                                ...cms,
                                pakistanGallery: cms.pakistanGallery.filter((_, i) => i !== idx),
                              })
                            }
                            className="text-xs font-bold text-accent hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================== 8. DONATIONS & PLEDGES ==================== */}
            {tab === "donations" && (
              <div className="space-y-6">
                {initialDonationError && (
                  <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
                    Donation records could not be loaded from PostgreSQL: {initialDonationError}
                  </p>
                )}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl text-deep-2 sm:text-3xl">Donations &amp; Pledges Ledger</h1>
                    <p className="mt-1 text-sm text-ink/75">
                      Track pledges in PKR, USD, GBP and EUR, record offline bank transfers, or download CSV reports.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    <button
                      type="button"
                      onClick={() => setShowAddDonation((v) => !v)}
                      className="btn btn-primary btn-sm"
                    >
                      {showAddDonation ? "Close Form" : "+ Record Bank / Offline Donation"}
                    </button>
                    <button
                      type="button"
                      onClick={exportDonationsCsv}
                      className="btn btn-ghost btn-sm"
                    >
                      Export CSV
                    </button>
                  </div>
                </div>

                {/* Clean Light Currency Totals Row */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {(["PKR", "USD", "GBP", "EUR"] as const).map((cur) => {
                    const entry = currencyTotals[cur] || { total: 0, count: 0 };
                    return (
                      <div key={cur} className="card p-4">
                        <p className="font-display text-2xl font-extrabold text-brand tabular-nums">
                          {cur} {entry.total.toLocaleString()}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-muted">{entry.count} pledges recorded</p>
                      </div>
                    );
                  })}
                </div>

                {showAddDonation && (
                  <form onSubmit={handleAddOfflineDonation} className="card space-y-4 p-6">
                    <h2 className="text-lg text-deep-2">Record Bank / Offline Donation</h2>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                      <input
                        type="text"
                        required
                        placeholder="Donor full name"
                        value={newDon.donorName}
                        onChange={(e) => setNewDon({ ...newDon, donorName: e.target.value })}
                        className="field py-2 text-sm"
                      />
                      <input
                        type="email"
                        placeholder="Email (optional)"
                        value={newDon.email}
                        onChange={(e) => setNewDon({ ...newDon, email: e.target.value })}
                        className="field py-2 text-sm"
                      />
                      <input
                        type="number"
                        required
                        min={1}
                        placeholder="Amount"
                        value={newDon.amount}
                        onChange={(e) => setNewDon({ ...newDon, amount: e.target.value })}
                        className="field py-2 text-sm"
                      />
                      <select
                        value={newDon.currency}
                        onChange={(e) => setNewDon({ ...newDon, currency: e.target.value })}
                        className="field py-2 text-sm font-bold"
                      >
                        <option value="PKR">PKR</option>
                        <option value="USD">USD</option>
                        <option value="GBP">GBP</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <input
                        type="text"
                        placeholder="Purpose (e.g. Zakat / Clean Water)"
                        value={newDon.purpose}
                        onChange={(e) => setNewDon({ ...newDon, purpose: e.target.value })}
                        className="field py-2 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Phone number"
                        value={newDon.phone}
                        onChange={(e) => setNewDon({ ...newDon, phone: e.target.value })}
                        className="field py-2 text-sm"
                      />
                      <button type="submit" className="btn btn-accent py-2 text-sm">
                        Save Donation Record
                      </button>
                    </div>
                  </form>
                )}

                {/* Underlined Filter Tabs matching main website */}
                <div className="flex gap-6 border-b border-line">
                  {["all", "pending", "confirmed", "completed"].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setDonationFilter(st)}
                      className={`-mb-px border-b-2 pb-2.5 text-sm font-bold capitalize transition ${
                        donationFilter === st
                          ? "border-brand text-brand"
                          : "border-transparent text-muted hover:text-deep-2"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div className="card overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-line bg-mist/60 text-xs font-bold text-deep-2">
                      <tr>
                        <th className="px-4 py-3.5">Donor</th>
                        <th className="px-4 py-3.5">Amount</th>
                        <th className="px-4 py-3.5">Bank / Channel &amp; Ref</th>
                        <th className="px-4 py-3.5">Purpose</th>
                        <th className="px-4 py-3.5">Status</th>
                        <th className="px-4 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {filteredDonations.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-8 text-center text-muted">
                            No matching donation records found.
                          </td>
                        </tr>
                      ) : (
                        filteredDonations.map((d) => (
                          <tr key={d.id}>
                            <td className="px-4 py-3.5">
                              <p className="font-bold text-deep-2">{d.donorName}</p>
                              <p className="text-xs text-muted">
                                {d.email} {d.phone ? `· ${d.phone}` : ""}
                              </p>
                              {(d.country || d.city) && (
                                <p className="text-xs text-muted">
                                  {[d.city, d.country].filter(Boolean).join(", ")}
                                </p>
                              )}
                              {d.message && <p className="mt-1 text-xs text-ink/70 italic">“{d.message}”</p>}
                            </td>
                            <td className="px-4 py-3.5 font-bold text-brand tabular-nums">
                              {d.currency} {Number(d.amount).toLocaleString()}
                              <span className="block text-[11px] font-normal text-muted capitalize">{d.frequency}</span>
                            </td>
                            <td className="px-4 py-3.5 text-xs text-ink/85">
                              <span className="block font-semibold text-deep-2">
                                {d.bankAccountLabel || d.paymentMethod || "Bank Transfer"}
                              </span>
                              {d.transactionRef && (
                                <span className="mt-0.5 block font-mono text-[11.5px] text-muted">
                                  TID: {d.transactionRef}
                                </span>
                              )}
                              {d.senderAccountNumber && (
                                <span className="mt-0.5 block font-mono text-[11.5px] text-muted">
                                  Sender account: {d.senderAccountNumber}
                                </span>
                              )}
                              {d.receiptUrl && (
                                <a
                                  href={d.receiptUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-1 inline-block font-bold text-brand hover:underline"
                                >
                                  View Transfer Slip ↗
                                </a>
                              )}
                            </td>
                            <td className="px-4 py-3.5 text-ink/80">
                              <span className="block font-semibold">{d.purpose || "General"}</span>
                            </td>
                            <td className="px-4 py-3.5">
                              <select
                                value={d.status || "pending"}
                                onChange={(e) => updateDonationStatus(d.id, e.target.value)}
                                className="rounded-xl border border-line bg-white px-3 py-1.5 text-xs font-bold text-deep-2 capitalize"
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                              </select>
                            </td>
                            <td className="px-4 py-3.5 text-right">
                              <div className="inline-flex gap-3">
                                <a
                                  href={`mailto:${d.email}?subject=Thank%20you%20for%20supporting%20Friends%20Foundation%20Pakistan`}
                                  className="text-xs font-bold text-brand hover:underline"
                                >
                                  Email
                                </a>
                                <button
                                  type="button"
                                  onClick={() => removeDonation(d.id)}
                                  className="text-xs font-bold text-accent hover:underline"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ==================== 9. CONTACT MESSAGES INBOX ==================== */}
            {tab === "contacts" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl text-deep-2 sm:text-3xl">Contact Messages Inbox</h1>
                  <p className="mt-1 text-sm text-ink/75">
                    Inquiries submitted through the public Contact Us form (`/contact`).
                  </p>
                </div>

                <div className="flex gap-6 border-b border-line">
                  {["all", "unread", "read", "resolved"].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setContactFilter(st)}
                      className={`-mb-px border-b-2 pb-2.5 text-sm font-bold capitalize transition ${
                        contactFilter === st
                          ? "border-brand text-brand"
                          : "border-transparent text-muted hover:text-deep-2"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  {filteredContacts.length === 0 ? (
                    <div className="card p-8 text-center text-sm text-muted">
                      No messages in this view.
                    </div>
                  ) : (
                    filteredContacts.map((c) => (
                      <div key={c.id} className="card p-6">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h3 className="text-base text-deep-2">
                              {c.name} <span className="font-sans text-xs font-normal text-muted">({c.email})</span>
                            </h3>
                            <p className="mt-0.5 text-xs font-bold text-brand">{c.subject}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={c.status || "unread"}
                              onChange={(e) => updateContactStatus(c.id, e.target.value)}
                              className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-bold text-deep-2 capitalize"
                            >
                              <option value="unread">Unread</option>
                              <option value="read">Read</option>
                              <option value="resolved">Resolved</option>
                            </select>
                            <a
                              href={`mailto:${c.email}?subject=Re:%20${encodeURIComponent(c.subject)}`}
                              className="btn btn-primary btn-sm"
                            >
                              Reply
                            </a>
                            <button
                              type="button"
                              onClick={() => removeContact(c.id)}
                              className="btn btn-ghost btn-sm text-accent border-accent/30 hover:bg-accent-soft"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink/80">{c.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ==================== 10. SITE INFO & SECURITY ==================== */}
            {tab === "settings" && (
              <div className="space-y-8">
                <section className="card space-y-5 p-6">
                  <div className="border-b border-line pb-4">
                    <h1 className="text-xl text-deep-2">Donation WhatsApp Number</h1>
                    <p className="mt-1 text-sm text-muted">
                      Set the international WhatsApp number donors should message, including the country code.
                    </p>
                  </div>
                  <div className="max-w-xl">
                    <label htmlFor="donationWhatsappNumber" className="label text-xs">
                      WhatsApp number
                    </label>
                    <input
                      id="donationWhatsappNumber"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      maxLength={24}
                      placeholder="+92 300 1234567"
                      value={cms.donationWhatsappNumber}
                      onChange={(e) =>
                        setCms({ ...cms, donationWhatsappNumber: e.target.value })
                      }
                      className="field"
                    />
                    <p className="mt-2 text-xs text-muted">
                      Include the country code. Spaces, parentheses, dashes, and a leading plus are accepted.
                      Leave blank and delete the saved number to disable WhatsApp donations.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={savingKey === "donationWhatsappNumber"}
                      onClick={() => saveSection("donationWhatsappNumber")}
                      className="btn btn-accent btn-sm"
                    >
                      {savingKey === "donationWhatsappNumber" ? "Saving…" : "Save WhatsApp Number"}
                    </button>
                    <button
                      type="button"
                      disabled={savingKey === "donationWhatsappNumber" || !cms.donationWhatsappNumber}
                      onClick={() => {
                        if (!window.confirm("Delete the donation WhatsApp number? Donors will no longer be able to submit donations through WhatsApp.")) {
                          return;
                        }
                        setCms({ ...cms, donationWhatsappNumber: "" });
                        void saveSection("donationWhatsappNumber", "");
                      }}
                      className="btn btn-ghost btn-sm text-red-700"
                    >
                      {savingKey === "donationWhatsappNumber" ? "Saving…" : "Delete Number"}
                    </button>
                  </div>
                </section>

                <div className="card space-y-5 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                    <div>
                      <h1 className="text-xl text-deep-2">Organization Info, Contacts &amp; Branding</h1>
                      <p className="text-xs text-muted">
                        Updates the top bar, sticky navbar logo, footer, and `/contact` page simultaneously.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => resetSection("siteInfo")}
                        className="btn btn-ghost btn-sm"
                      >
                        Reset Info
                      </button>
                      <button
                        type="button"
                        disabled={savingKey === "siteInfo"}
                        onClick={() => saveSection("siteInfo")}
                        className="btn btn-accent btn-sm"
                      >
                        {savingKey === "siteInfo" ? "Saving…" : "Save Site Settings"}
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="label text-xs">Header Tagline</label>
                      <input
                        type="text"
                        value={cms.siteInfo.headerTagline || "Working across Pakistan since 2001"}
                        onChange={(e) => setCms({ ...cms, siteInfo: { ...cms.siteInfo, headerTagline: e.target.value } })}
                        className="field"
                      />
                    </div>
                    <div>
                      <label className="label text-xs">Header Donation Button Label</label>
                      <input
                        type="text"
                        value={cms.siteInfo.donationButtonLabel || "Donate"}
                        onChange={(e) => setCms({ ...cms, siteInfo: { ...cms.siteInfo, donationButtonLabel: e.target.value } })}
                        className="field"
                      />
                    </div>
                    <div>
                      <label className="label text-xs">Header Donation Button Color</label>
                      <select
                        value={cms.siteInfo.donationButtonColor || "red"}
                        onChange={(e) => setCms({ ...cms, siteInfo: { ...cms.siteInfo, donationButtonColor: e.target.value as "green" | "blue" | "red" | "purple" } })}
                        className="field"
                      >
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                        <option value="red">Red</option>
                        <option value="purple">Purple</option>
                      </select>
                    </div>
                    <div>
                      <label className="label text-xs">Organization Name</label>
                      <input
                        type="text"
                        value={cms.siteInfo.name}
                        onChange={(e) => setCms({ ...cms, siteInfo: { ...cms.siteInfo, name: e.target.value } })}
                        className="field"
                      />
                    </div>
                    <div>
                      <label className="label text-xs">Primary Phone Number</label>
                      <input
                        type="text"
                        value={cms.siteInfo.phoneLabel}
                        onChange={(e) =>
                          setCms({ ...cms, siteInfo: { ...cms.siteInfo, phoneLabel: e.target.value } })
                        }
                        className="field"
                      />
                    </div>
                    <div>
                      <label className="label text-xs">Secondary Phone Number</label>
                      <input
                        type="text"
                        value={cms.siteInfo.phoneAltLabel}
                        onChange={(e) =>
                          setCms({ ...cms, siteInfo: { ...cms.siteInfo, phoneAltLabel: e.target.value } })
                        }
                        className="field"
                      />
                    </div>
                    <div>
                      <label className="label text-xs">Primary Email Address</label>
                      <input
                        type="email"
                        value={cms.siteInfo.email}
                        onChange={(e) => setCms({ ...cms, siteInfo: { ...cms.siteInfo, email: e.target.value } })}
                        className="field"
                      />
                    </div>
                    <div>
                      <label className="label text-xs">Secondary Email Address</label>
                      <input
                        type="email"
                        value={cms.siteInfo.emailAlt}
                        onChange={(e) => setCms({ ...cms, siteInfo: { ...cms.siteInfo, emailAlt: e.target.value } })}
                        className="field"
                      />
                    </div>
                    <div>
                      <label className="label text-xs">Health Centres (comma-separated)</label>
                      <input
                        type="text"
                        value={cms.siteInfo.healthCentres.join(", ")}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            siteInfo: {
                              ...cms.siteInfo,
                              healthCentres: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                            },
                          })
                        }
                        className="field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label text-xs">Footer Summary</label>
                    <textarea
                      rows={2}
                      value={cms.siteInfo.footerSummary}
                      onChange={(e) =>
                        setCms({ ...cms, siteInfo: { ...cms.siteInfo, footerSummary: e.target.value } })
                      }
                      className="field"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="label text-xs">Footer Programmes Heading</label>
                      <input
                        type="text"
                        value={cms.siteInfo.footerProgrammesHeading || "What we do"}
                        onChange={(e) => setCms({ ...cms, siteInfo: { ...cms.siteInfo, footerProgrammesHeading: e.target.value } })}
                        className="field"
                      />
                    </div>
                    <div>
                      <label className="label text-xs">Footer Organization Heading</label>
                      <input
                        type="text"
                        value={cms.siteInfo.footerOrganizationHeading || "Organisation"}
                        onChange={(e) => setCms({ ...cms, siteInfo: { ...cms.siteInfo, footerOrganizationHeading: e.target.value } })}
                        className="field"
                      />
                    </div>
                    <div>
                      <label className="label text-xs">Footer Contact Heading</label>
                      <input
                        type="text"
                        value={cms.siteInfo.footerContactHeading || "Get in touch"}
                        onChange={(e) => setCms({ ...cms, siteInfo: { ...cms.siteInfo, footerContactHeading: e.target.value } })}
                        className="field"
                      />
                    </div>
                    <div>
                      <label className="label text-xs">Footer Donation Button Label</label>
                      <input
                        type="text"
                        value={cms.siteInfo.footerDonateLabel || "Donate"}
                        onChange={(e) => setCms({ ...cms, siteInfo: { ...cms.siteInfo, footerDonateLabel: e.target.value } })}
                        className="field"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label text-xs">Footer Bottom Tagline</label>
                      <input
                        type="text"
                        value={cms.siteInfo.footerBottomTagline || "Health · Clean water · Education · Women’s rights · Emergency relief"}
                        onChange={(e) => setCms({ ...cms, siteInfo: { ...cms.siteInfo, footerBottomTagline: e.target.value } })}
                        className="field"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="label text-xs">Social Media Links</label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {cms.siteInfo.socials.map((soc, idx) => (
                        <div key={soc.name} className="flex items-center gap-2">
                          <span className="w-20 shrink-0 text-xs font-bold text-muted">{soc.name}</span>
                          <input
                            type="url"
                            value={soc.href}
                            onChange={(e) => {
                              const socials = [...cms.siteInfo.socials];
                              socials[idx] = { ...soc, href: e.target.value };
                              setCms({ ...cms, siteInfo: { ...cms.siteInfo, socials } });
                            }}
                            className="field flex-1 py-1.5 text-xs"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <ImageField
                    label="Website Logo (Header & Footer)"
                    value={cms.siteInfo.logo}
                    library={library}
                    onUploaded={addUploadedToLibrary}
                    onChange={(url) => setCms({ ...cms, siteInfo: { ...cms.siteInfo, logo: url } })}
                  />
                </div>

                {/* Admin account security */}
                <div className="card space-y-4 p-6">
                  <h2 className="text-lg text-deep-2">Admin ID &amp; Password</h2>
                  <p className="text-sm text-ink/75">
                    Change the sign-in ID or set a new password. Leave the password blank to keep the current one.
                    Passwords must be at least 12 characters. Changes replace any server bootstrap credentials.
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="admin-account-id" className="label text-xs">Admin ID</label>
                      <input
                        id="admin-account-id"
                        type="text"
                        autoComplete="username"
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        className="field"
                      />
                    </div>
                    <div>
                      <label htmlFor="admin-account-password" className="label text-xs">New password (optional)</label>
                      <input
                        id="admin-account-password"
                        type="password"
                        autoComplete="new-password"
                        minLength={12}
                        value={adminPasswordInput}
                        onChange={(e) => setAdminPasswordInput(e.target.value)}
                        placeholder="Leave blank to keep current password"
                        className="field"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => void updateAdminCredentials()}
                      className="btn btn-primary btn-sm"
                    >
                      Save Admin Credentials
                    </button>
                    <button
                      type="button"
                      onClick={() => void removeAdminAccount()}
                      className="btn btn-ghost btn-sm text-accent"
                    >
                      Remove Admin Account
                    </button>
                  </div>
                  <p className="text-xs text-muted">
                    Removing this account disables admin sign-in and signs out all sessions. To restore access, configure
                    ADMIN_ID and ADMIN_PASSWORD on the server, then remove the disabled __admin_credentials__ row from
                    the site_cms table.
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
