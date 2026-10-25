"use client";

import Image from "next/image";
import { useState } from "react";
import {
  DEFAULT_PAYMENT_CONFIG,
  formatIbanDisplay,
  type BankAccountConfig,
  type MobileWalletConfig,
  type PaymentSystemConfig,
} from "@/lib/banking";
import { useSiteConfig } from "./SiteConfigContext";

function PaymentBrandMark({ name, shortCode }: { name: string; shortCode?: string }) {
  const normalizedName = name.toLowerCase();
  const normalizedCode = shortCode?.toUpperCase() ?? "";
  const logo = normalizedName.includes("jazzcash")
    ? "/images/payments/jazzcash.png"
    : normalizedName.includes("easypaisa")
      ? "/images/payments/easypaisa.png"
      : normalizedCode === "MEBL" || normalizedName.includes("meezan")
        ? "/images/payments/meezan.png"
        : normalizedCode === "HBL" || normalizedName.includes("habib bank")
          ? "/images/payments/hbl.png"
          : undefined;

  if (logo) {
    return <Image src={logo} alt={`${name} logo`} width={144} height={48} className="bank-brand-image" />;
  }

  const code = normalizedCode || name.split(/\s+/).map((part) => part[0]).join("").slice(0, 3).toUpperCase();
  const colors: Record<string, string> = {
    UBL: "#087b4c",
    MCB: "#1b4d91",
    ABL: "#008f70",
    BAFL: "#9d7628",
    FBL: "#7c1744",
    AKBL: "#294b8e",
    NBP: "#087a4d",
    BOP: "#6b286f",
    BIPL: "#29814b",
    DIB: "#208553",
    SCB: "#008b83",
    JSBL: "#e04436",
    SNBL: "#244b84",
    HMB: "#b10f32",
    INTL: "#365e7b",
  };

  return (
    <span
      className="bank-brand-fallback"
      style={{ "--bank-brand-color": colors[code] ?? "#466777" } as React.CSSProperties}
      aria-label={`${name} logo`}
    >
      <b>{code}</b>
    </span>
  );
}

function CopyChip({ value, label }: { value: string; label: string }) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value.replace(/\s+/g, ""));
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      setCopyState("failed");
    }
  }

  return (
    <span className="inline-flex shrink-0 items-center gap-2">
      <button
        type="button"
        onClick={onCopy}
        className="copy-chip rounded-full border border-line bg-white px-3 py-1 text-xs font-bold text-brand transition hover:border-brand hover:bg-mist"
      >
        {copyState === "copied" ? "Copied" : label}
      </button>
      {copyState === "failed" && (
        <span className="text-xs text-red-700" role="status">
          Could not copy
        </span>
      )}
    </span>
  );
}

function BankAccountCard({ account }: { account: BankAccountConfig }) {
  return (
    <article className="rounded-[18px] border border-line bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="provider-card-logo">
            <PaymentBrandMark name={account.bankName} shortCode={account.shortCode} />
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-lg font-bold text-deep-2">{account.bankName}</h3>
            <p className="text-xs font-semibold text-brand">{account.category}</p>
          </div>
        </div>
        <span className="shrink-0 rounded-lg bg-mist px-2.5 py-1 text-xs font-extrabold text-deep-2">
          {account.currency === "MULTI" ? "USD / GBP / EUR" : account.currency}
        </span>
      </div>

      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <dt className="text-xs text-muted">Account Title</dt>
            <dd className="break-words font-bold text-deep-2">{account.accountTitle}</dd>
          </div>
          <CopyChip value={account.accountTitle} label="Copy Title" />
        </div>

        {account.iban && (
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-mist/60 px-3.5 py-2.5">
            <div className="min-w-0">
              <dt className="text-xs text-muted">IBAN</dt>
              <dd className="break-all font-mono text-[14.5px] font-extrabold text-deep-2">
                {formatIbanDisplay(account.iban)}
              </dd>
            </div>
            <CopyChip value={account.iban} label="Copy IBAN" />
          </div>
        )}

        {account.accountNumber && (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <dt className="text-xs text-muted">Account Number</dt>
              <dd className="break-all font-mono font-bold text-deep-2">{account.accountNumber}</dd>
            </div>
            <CopyChip value={account.accountNumber} label="Copy Number" />
          </div>
        )}

        <div className="grid gap-3 pt-1 sm:grid-cols-2">
          {(account.branchName || account.branchCode) && (
            <div>
              <dt className="text-xs text-muted">Branch &amp; Code</dt>
              <dd className="break-words font-semibold text-ink/85">
                {account.branchName}
                {account.branchCode ? ` (${account.branchCode})` : ""}
              </dd>
            </div>
          )}
          {account.swiftCode && (
            <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
              <div className="min-w-0">
                <dt className="text-xs text-muted">SWIFT / BIC Code</dt>
                <dd className="break-all font-mono font-bold text-deep-2">{account.swiftCode}</dd>
              </div>
              <CopyChip value={account.swiftCode} label="Copy SWIFT" />
            </div>
          )}
        </div>

        {account.raastId && (
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-2.5">
            <div className="min-w-0 flex-1">
              <dt className="text-xs text-muted">Raast Instant ID</dt>
              <dd className="break-all font-mono font-bold text-deep-2">{account.raastId}</dd>
            </div>
            <CopyChip value={account.raastId} label="Copy Raast ID" />
          </div>
        )}
      </dl>

      {account.qrImageUrl && (
        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-line pt-4">
          <img
            src={account.qrImageUrl}
            alt={`${account.bankName} transfer QR code`}
            className="h-28 w-28 rounded-xl border border-line bg-white object-contain p-1.5"
          />
          <p className="max-w-xs text-xs leading-relaxed text-muted">
            Scan this QR code in your banking app to fill in the transfer details.
          </p>
        </div>
      )}

      {account.instructions && (
        <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">{account.instructions}</p>
      )}
    </article>
  );
}

function MobileWalletDetails({ wallet }: { wallet: MobileWalletConfig }) {
  return (
    <article className="rounded-[18px] border border-line bg-white p-4 sm:p-5">
      <h3 className="font-display text-lg font-bold text-deep-2">{wallet.provider} transfer details</h3>
      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <dt className="text-xs text-muted">Account Title</dt>
            <dd className="break-words font-bold text-deep-2">{wallet.accountTitle}</dd>
          </div>
          <CopyChip value={wallet.accountTitle} label="Copy Title" />
        </div>
        {wallet.walletNumber && (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <dt className="text-xs text-muted">Wallet Number</dt>
              <dd className="break-all font-mono font-bold text-deep-2">{wallet.walletNumber}</dd>
            </div>
            <CopyChip value={wallet.walletNumber} label="Copy Number" />
          </div>
        )}
        {wallet.iban && (
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-mist/60 px-3.5 py-2.5">
            <div className="min-w-0">
              <dt className="text-xs text-muted">IBAN</dt>
              <dd className="break-all font-mono font-extrabold text-deep-2">{formatIbanDisplay(wallet.iban)}</dd>
            </div>
            <CopyChip value={wallet.iban} label="Copy IBAN" />
          </div>
        )}
      </dl>

      {wallet.qrImageUrl && (
        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-line pt-4">
          <img
            src={wallet.qrImageUrl}
            alt={`${wallet.provider} payment QR code`}
            className="h-28 w-28 rounded-xl border border-line bg-white object-contain p-1.5"
          />
          <p className="max-w-xs text-xs leading-relaxed text-muted">
            Scan this QR code in the {wallet.provider} app to fill in the transfer details.
          </p>
        </div>
      )}

      {wallet.instructions && (
        <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">{wallet.instructions}</p>
      )}
    </article>
  );
}

export default function DonateForm({
  paymentConfig = DEFAULT_PAYMENT_CONFIG,
}: {
  paymentConfig?: PaymentSystemConfig;
}) {
  const siteInfo = useSiteConfig();
  const bankAccounts = paymentConfig.bankTransferEnabled
    ? paymentConfig.bankAccounts.filter((account) => account.enabled)
    : [];
  const mobileWallets = paymentConfig.mobileWalletEnabled
    ? paymentConfig.mobileWallets.filter((wallet) => wallet.enabled)
    : [];
  const initialPaymentOption =
    bankAccounts[0] ? `bank:${bankAccounts[0].id}` : mobileWallets[0] ? `wallet:${mobileWallets[0].id}` : "";
  const initialBank = bankAccounts.find((account) => initialPaymentOption === `bank:${account.id}`);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(initialPaymentOption);
  const [currency, setCurrency] = useState<"PKR" | "USD" | "GBP" | "EUR">(
    initialBank?.currency === "MULTI" ? "USD" : initialBank?.currency ?? "PKR",
  );
  const [submission, setSubmission] = useState<
    | { state: "idle" }
    | { state: "sending" }
    | { state: "sent"; referenceCode: string }
    | { state: "error"; message: string }
  >({ state: "idle" });
  const [receiptUrl, setReceiptUrl] = useState("");
  const [receiptFileName, setReceiptFileName] = useState("");
  const [receiptError, setReceiptError] = useState("");
  const [receiptUploading, setReceiptUploading] = useState(false);

  const selectedBank = bankAccounts.find((account) => selectedPaymentOption === `bank:${account.id}`);
  const selectedWallet = mobileWallets.find((wallet) => selectedPaymentOption === `wallet:${wallet.id}`);

  async function handleReceiptChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    setReceiptError("");
    setReceiptUrl("");
    setReceiptFileName("");
    setReceiptUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/donate/receipt", { method: "POST", body });
      const result = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!response.ok || !result.url) {
        throw new Error(result.error || "Could not upload receipt image.");
      }
      setReceiptUrl(result.url);
      setReceiptFileName(file.name);
    } catch (error) {
      setReceiptError(error instanceof Error ? error.message : "Could not upload receipt image.");
      input.value = "";
    } finally {
      setReceiptUploading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const amount = Number(formData.get("amount"));

    if (!Number.isSafeInteger(amount) || amount <= 0) {
      setSubmission({ state: "error", message: "Enter a valid donation amount." });
      return;
    }

    if (!selectedBank && !selectedWallet) {
      setSubmission({ state: "error", message: "Choose a bank account or mobile wallet." });
      return;
    }

    if (receiptUploading) {
      setSubmission({ state: "error", message: "Wait for the receipt upload to finish before submitting." });
      return;
    }

    if (selectedBank && selectedBank.currency !== "MULTI" && selectedBank.currency !== currency) {
      setSubmission({
        state: "error",
        message: `The selected account accepts ${selectedBank.currency}. Choose a matching currency or another account.`,
      });
      return;
    }

    const receiverLabel = selectedBank
      ? `${selectedBank.bankName} (${selectedBank.accountNumber || formatIbanDisplay(selectedBank.iban)})`
      : `${selectedWallet?.provider} (${selectedWallet?.walletNumber})`;

    setSubmission({ state: "sending" });
    try {
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName: formData.get("donorName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          country: formData.get("country"),
          city: formData.get("city"),
          senderAccountNumber: formData.get("senderAccountNumber"),
          amount,
          currency,
          purpose: formData.get("purpose"),
          paymentMethod: selectedWallet ? "mobile_wallet" : "bank_transfer",
          bankAccountLabel: receiverLabel,
          transactionRef: formData.get("transactionRef"),
          receiptUrl,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
        referenceCode?: string;
      };
      if (!response.ok) {
        throw new Error(result.error || "Could not submit your donation. Please try again.");
      }
      setSubmission({ state: "sent", referenceCode: result.referenceCode || "FFP-RECEIVED" });
      form.reset();
      setReceiptUrl("");
      setReceiptFileName("");
    } catch (error) {
      setSubmission({
        state: "error",
        message: error instanceof Error ? error.message : "Could not submit your donation. Please try again.",
      });
    }
  }

  if (bankAccounts.length === 0 && mobileWallets.length === 0) {
    return (
      <div className="mt-6 rounded-[18px] border border-line bg-mist/60 p-5 text-sm text-ink/80">
        Bank account details are not available right now. Please contact{" "}
        <a href={`mailto:${siteInfo.email}`} className="link">
          {siteInfo.email}
        </a>
        .
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <p className="text-sm leading-relaxed text-slate-600">
        Select where you sent your transfer, then provide your details and transaction reference. Donations are recorded
        as pending until the transfer is verified.
      </p>
      <form onSubmit={handleSubmit} className="donate-form donate-manual-form space-y-6">
        <section className="donate-form-section min-w-0" aria-labelledby="donation-payment-title">
          <h3 id="donation-payment-title" className="mb-3 text-lg font-bold text-deep-2">
            1. Select payment account
          </h3>
          <fieldset className="grid gap-3 sm:grid-cols-2">
            <legend className="sr-only">Choose a bank or wallet account</legend>
            {bankAccounts.map((account) => (
              <label
                key={account.id}
                className={`flex min-w-0 flex-wrap items-center gap-3 rounded-2xl border bg-white p-4 transition ${
                  selectedPaymentOption === `bank:${account.id}`
                    ? "border-brand ring-2 ring-brand/20"
                    : "border-line hover:border-brand/60"
                }`}
              >
                <input
                  type="radio"
                  name="payment-account"
                  value={`bank:${account.id}`}
                  checked={selectedPaymentOption === `bank:${account.id}`}
                  onChange={() => {
                    setSelectedPaymentOption(`bank:${account.id}`);
                    setCurrency(account.currency === "MULTI" ? "USD" : account.currency);
                    setSubmission({ state: "idle" });
                  }}
                  className="h-4 w-4 accent-brand"
                />
                <span className="provider-card-logo">
                  <PaymentBrandMark name={account.bankName} shortCode={account.shortCode} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-deep-2">{account.bankName}</span>
                  <span className="block text-xs text-muted">{account.category}</span>
                </span>
              </label>
            ))}
            {mobileWallets.map((wallet) => {
              const normalizedProvider = wallet.provider.toLowerCase();
              const logo = normalizedProvider.includes("jazzcash")
                ? "/images/payments/jazzcash.png"
                : normalizedProvider.includes("easypaisa")
                  ? "/images/payments/easypaisa.png"
                  : undefined;
              const option = `wallet:${wallet.id}`;

              return (
                <label
                  key={wallet.id}
                  className={`flex min-w-0 flex-wrap items-center gap-3 rounded-2xl border bg-white p-4 transition ${
                    selectedPaymentOption === option
                      ? "border-brand ring-2 ring-brand/20"
                      : "border-line hover:border-brand/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment-account"
                    value={option}
                    checked={selectedPaymentOption === option}
                    onChange={() => {
                      setSelectedPaymentOption(option);
                      setCurrency("PKR");
                      setSubmission({ state: "idle" });
                    }}
                    className="h-4 w-4 accent-brand"
                  />
                  {logo ? (
                    <Image
                      src={logo}
                      alt={`${wallet.provider} logo`}
                      width={120}
                      height={54}
                      className="h-12 w-28 object-contain"
                    />
                  ) : (
                    <span className="font-bold text-deep-2">{wallet.provider}</span>
                  )}
                  <span className="min-w-0 flex-1 font-semibold text-deep-2">Pay by {wallet.provider}</span>
                </label>
              );
            })}
          </fieldset>
          {selectedBank && <div className="mt-4"><BankAccountCard account={selectedBank} /></div>}
          {selectedWallet && <div className="mt-4"><MobileWalletDetails wallet={selectedWallet} /></div>}
        </section>

        <fieldset className="donate-form-section min-w-0 space-y-4">
          <legend className="text-lg font-bold text-deep-2">2. Your details</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="donorName" className="label">Full name *</label>
              <input id="donorName" name="donorName" autoComplete="name" maxLength={200} required className="field" />
            </div>
            <div>
              <label htmlFor="donorEmail" className="label">Email *</label>
              <input id="donorEmail" name="email" type="email" autoComplete="email" maxLength={300} required className="field" />
            </div>
            <div>
              <label htmlFor="donorPhone" className="label">Contact number *</label>
              <input id="donorPhone" name="phone" type="tel" autoComplete="tel" maxLength={40} required className="field" />
            </div>
            <div>
              <label htmlFor="donorCountry" className="label">Country *</label>
              <input id="donorCountry" name="country" autoComplete="country-name" maxLength={100} required className="field" />
            </div>
            <div>
              <label htmlFor="donorCity" className="label">City *</label>
              <input id="donorCity" name="city" autoComplete="address-level2" maxLength={100} required className="field" />
            </div>
            <div>
              <label htmlFor="donationPurpose" className="label">Donation purpose *</label>
              <select id="donationPurpose" name="purpose" required className="field">
                <option value="Where it is needed most">Where it is needed most</option>
                <option value="Health centres">Health centres</option>
                <option value="Clean water and sanitation">Clean water and sanitation</option>
                <option value="Emergency relief">Emergency relief</option>
                <option value="Girls’ education">Girls’ education</option>
                <option value="Zakat / Sadaqah">Zakat / Sadaqah</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset className="donate-form-section min-w-0 space-y-4">
          <legend className="text-lg font-bold text-deep-2">3. Donation details</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="donationAmount" className="label">Donation amount ({currency}) *</label>
              <input
                id="donationAmount"
                name="amount"
                type="number"
                min={currency === "PKR" ? 100 : 5}
                max={currency === "PKR" ? 100000000 : 1000000}
                step="1"
                inputMode="numeric"
                required
                className="field"
              />
            </div>
            <div>
              <label htmlFor="senderAccountNumber" className="label">Your sending bank / wallet number *</label>
              <input
                id="senderAccountNumber"
                name="senderAccountNumber"
                autoComplete="off"
                maxLength={100}
                required
                className="field"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="transactionRef" className="label">Transaction reference / TID *</label>
              <input
                id="transactionRef"
                name="transactionRef"
                autoComplete="off"
                maxLength={160}
                required
                className="field"
              />
            </div>
          </div>
        </fieldset>

        {paymentConfig.allowReceiptUpload && (
          <fieldset className="donate-form-section min-w-0 space-y-3">
            <legend className="text-lg font-bold text-deep-2">4. Attach payment receipt (optional)</legend>
            <label htmlFor="donationReceipt" className="label">
              Upload a transfer screenshot or receipt
            </label>
            <input
              id="donationReceipt"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleReceiptChange}
              disabled={receiptUploading || submission.state === "sending"}
              className="field file:mr-3 file:rounded-full file:border-0 file:bg-mist file:px-4 file:py-2 file:text-sm file:font-semibold file:text-deep-2"
            />
            <p className="text-xs text-muted">JPG, PNG, or WebP. Maximum file size: 5 MB.</p>
            {receiptUploading && (
              <p className="text-sm text-muted" role="status">Uploading receipt…</p>
            )}
            {receiptError && (
              <p className="text-sm text-red-700" role="alert">{receiptError}</p>
            )}
            {receiptUrl && receiptFileName && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-green-200 bg-green-50 p-3">
                <p className="min-w-0 break-all text-sm font-medium text-green-900">
                  Receipt attached: {receiptFileName}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setReceiptUrl("");
                    setReceiptFileName("");
                    const fileInput = document.getElementById("donationReceipt");
                    if (fileInput instanceof HTMLInputElement) fileInput.value = "";
                  }}
                  className="text-sm font-bold text-red-700 hover:underline"
                >
                  Remove
                </button>
              </div>
            )}
          </fieldset>
        )}

        {submission.state === "error" && (
          <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">
            {submission.message}
          </p>
        )}
        {submission.state === "sent" && (
          <p className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-900" role="status">
            Thank you. Your donation details were submitted for verification. Reference:{" "}
            <strong>{submission.referenceCode}</strong>. The payment remains pending until confirmed.
          </p>
        )}
        <button
          type="submit"
          disabled={submission.state === "sending" || receiptUploading}
          className="btn btn-primary w-full sm:w-auto"
        >
          {receiptUploading ? "Uploading receipt…" : submission.state === "sending" ? "Submitting…" : "Donate Now"}
        </button>
        <p className="text-xs leading-relaxed text-muted">
          Your sending account number and transfer reference are used to verify this payment. Do not enter a PIN,
          password, card number, or security code.
        </p>
      </form>
    </div>
  );
}
