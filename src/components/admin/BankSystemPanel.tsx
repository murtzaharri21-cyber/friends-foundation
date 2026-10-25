"use client";

import Link from "next/link";
import {
  formatIbanDisplay,
  PAKISTAN_BANK_PRESETS,
  WALLET_PRESETS,
  type BankAccountCategory,
  type BankAccountConfig,
  type BankCurrency,
  type OnlineGatewayConfig,
  type PaymentSystemConfig,
} from "@/lib/banking";
import ImageField, { type MediaLibraryItem } from "./ImageField";

export default function BankSystemPanel({
  config,
  onChange,
  onSave,
  onReset,
  saving,
  library,
  onUploaded,
}: {
  config: PaymentSystemConfig;
  onChange: (next: PaymentSystemConfig) => void;
  onSave: () => void;
  onReset: () => void;
  saving: boolean;
  library: MediaLibraryItem[];
  onUploaded: (item: MediaLibraryItem) => void;
}) {
  function addBankAccount() {
    const preset = PAKISTAN_BANK_PRESETS[0];
    const newBank: BankAccountConfig = {
      id: `bank-${Date.now()}`,
      enabled: true,
      bankName: preset.name,
      shortCode: preset.shortCode,
      accountTitle: "Friends Foundation Pakistan",
      accountNumber: "",
      iban: `PK00${preset.ibanBankCode}`,
      branchName: "",
      branchCode: "",
      swiftCode: preset.swiftCode,
      raastId: "",
      currency: "PKR",
      category: "General & Sadaqah",
      qrImageUrl: "",
      instructions: "Transfer via IBFT, Raast or mobile banking app.",
    };
    onChange({ ...config, bankAccounts: [newBank, ...config.bankAccounts] });
  }

  function updateBank(idx: number, patch: Partial<BankAccountConfig>) {
    const next = [...config.bankAccounts];
    next[idx] = { ...next[idx], ...patch };
    onChange({ ...config, bankAccounts: next });
  }

  function handlePresetSelect(idx: number, presetName: string) {
    const preset = PAKISTAN_BANK_PRESETS.find((p) => p.name === presetName);
    if (!preset) return;
    const current = config.bankAccounts[idx];
    updateBank(idx, {
      bankName: preset.name === "Custom Bank" ? "" : preset.name,
      shortCode: preset.shortCode,
      swiftCode: preset.swiftCode || current.swiftCode,
    });
  }

  function addWallet() {
    onChange({
      ...config,
      mobileWallets: [
        ...config.mobileWallets,
        {
          id: `wallet-${Date.now()}`,
          enabled: true,
          provider: "JazzCash",
          accountTitle: "Friends Foundation Pakistan",
          walletNumber: "",
          iban: "",
          qrImageUrl: "",
          instructions: "Send instant transfer via mobile wallet app.",
        },
      ],
    });
  }

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl text-deep-2 sm:text-3xl">Bank Accounts &amp; Payment System</h1>
          <p className="mt-1 max-w-2xl text-sm text-ink/75">
            Attach your Pakistani &amp; international bank accounts (IBAN, IBFT, Raast, SWIFT), JazzCash / EasyPaisa
            wallets, QR codes, or an online card payment gateway. Changes appear immediately on{" "}
            <Link href="/donate" className="link">
              /donate
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link href="/donate" className="btn btn-ghost btn-sm">
            Preview /donate →
          </Link>
          <button type="button" onClick={onReset} className="btn btn-ghost btn-sm">
            Reset Defaults
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={onSave}
            className="btn btn-accent btn-sm disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save & Attach Bank System"}
          </button>
        </div>
      </div>

      {/* Payment Channels Master Switches */}
      <div className="card p-6">
        <h2 className="text-lg text-deep-2">Active Payment Channels &amp; Donor Verification Rules</h2>
        <div className="mt-4 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              key: "bankTransferEnabled" as const,
              title: "Direct Bank Transfer (IBFT / Raast / Wire)",
              desc: "Show your attached Pakistani & SWIFT bank accounts on /donate",
            },
            {
              key: "mobileWalletEnabled" as const,
              title: "Mobile Wallets (JazzCash / EasyPaisa)",
              desc: "Allow instant transfers to mobile wallet accounts",
            },
            {
              key: "allowReceiptUpload" as const,
              title: "Receipt / Screenshot Upload",
              desc: "Allow donors to attach bank slip screenshots for instant verification",
            },
            {
              key: "requireTransactionRef" as const,
              title: "Require Transaction ID (TID)",
              desc: "Require donors to type their IBFT / Raast reference ID",
            },
            {
              key: "pledgeLaterEnabled" as const,
              title: "Pledge Now · Pay Later Option",
              desc: "Allow institutional donors to request invoice/wire instructions",
            },
          ].map((rule) => (
            <label
              key={rule.key}
              className="flex cursor-pointer items-start gap-3 rounded-[16px] border border-line bg-mist/40 p-4 transition hover:border-brand"
            >
              <input
                type="checkbox"
                checked={config[rule.key]}
                onChange={(e) => onChange({ ...config, [rule.key]: e.target.checked })}
                className="mt-1 h-4 w-4 accent-[#2c75a5]"
              />
              <div>
                <span className="block text-sm font-bold text-deep-2">{rule.title}</span>
                <span className="mt-0.5 block text-xs text-muted">{rule.desc}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* ==================== 1. ATTACHED BANK ACCOUNTS ==================== */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl text-deep-2">
              1. Attached Bank Accounts ({config.bankAccounts.length})
            </h2>
            <p className="text-xs text-muted">
              Select your bank from the preset dropdown to auto-fill SWIFT/BIC codes, then enter your Account Title,
              Account Number and 24-character IBAN.
            </p>
          </div>
          <button type="button" onClick={addBankAccount} className="btn btn-primary btn-sm">
            + Attach New Bank Account
          </button>
        </div>

        <div className="space-y-5">
          {config.bankAccounts.map((bank, idx) => (
            <div key={bank.id} className="card space-y-5 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-deep-2">
                    <input
                      type="checkbox"
                      checked={bank.enabled}
                      onChange={(e) => updateBank(idx, { enabled: e.target.checked })}
                      className="h-4 w-4 accent-[#2c75a5]"
                    />
                    <span>{bank.enabled ? "Active on Website" : "Hidden"}</span>
                  </label>
                  <span className="text-sm font-bold text-brand">
                    {bank.bankName || "Unnamed Bank"} · {bank.category}
                  </span>
                </div>

                {config.bankAccounts.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      onChange({
                        ...config,
                        bankAccounts: config.bankAccounts.filter((_, i) => i !== idx),
                      })
                    }
                    className="rounded-full border border-accent/30 px-3 py-1 text-xs font-bold text-accent hover:bg-accent-soft"
                  >
                    Remove Bank
                  </button>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="label text-xs">Quick Select Pakistani / Intl Bank</label>
                  <select
                    value={
                      PAKISTAN_BANK_PRESETS.some((p) => p.name === bank.bankName)
                        ? bank.bankName
                        : "Custom Bank"
                    }
                    onChange={(e) => handlePresetSelect(idx, e.target.value)}
                    className="field py-2 text-sm font-semibold"
                  >
                    {PAKISTAN_BANK_PRESETS.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label text-xs">Bank Display Name</label>
                  <input
                    type="text"
                    value={bank.bankName}
                    placeholder="e.g. Meezan Bank Limited"
                    onChange={(e) => updateBank(idx, { bankName: e.target.value })}
                    className="field py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="label text-xs">Account Purpose Category</label>
                  <select
                    value={bank.category}
                    onChange={(e) => updateBank(idx, { category: e.target.value as BankAccountCategory })}
                    className="field py-2 text-sm font-semibold"
                  >
                    <option value="General & Sadaqah">General &amp; Sadaqah</option>
                    <option value="Zakat Only">Zakat Only</option>
                    <option value="International Wire (USD / GBP / EUR)">
                      International Wire (USD / GBP / EUR)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="label text-xs">Account Title (Beneficiary Name)</label>
                  <input
                    type="text"
                    value={bank.accountTitle}
                    placeholder="e.g. Friends Foundation Pakistan"
                    onChange={(e) => updateBank(idx, { accountTitle: e.target.value })}
                    className="field py-2 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="label text-xs">Account Number</label>
                  <input
                    type="text"
                    value={bank.accountNumber}
                    placeholder="e.g. 0101-0105829401"
                    onChange={(e) => updateBank(idx, { accountNumber: e.target.value })}
                    className="field py-2 font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="label text-xs">Account Currency</label>
                  <select
                    value={bank.currency}
                    onChange={(e) => updateBank(idx, { currency: e.target.value as BankCurrency })}
                    className="field py-2 text-sm font-semibold"
                  >
                    <option value="PKR">PKR (Pakistani Rupee)</option>
                    <option value="MULTI">Multi-Currency (USD / GBP / EUR)</option>
                    <option value="USD">USD (US Dollar)</option>
                    <option value="GBP">GBP (British Pound)</option>
                    <option value="EUR">EUR (Euro)</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="label text-xs">
                    IBAN Number{" "}
                    {bank.iban && (
                      <span className="font-mono font-normal text-brand">
                        Preview: {formatIbanDisplay(bank.iban)}
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={bank.iban}
                    placeholder="PK36MEZN0001010105829401"
                    onChange={(e) => updateBank(idx, { iban: e.target.value.toUpperCase() })}
                    className="field py-2 font-mono text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="label text-xs">SWIFT / BIC Code (for Intl Wire)</label>
                  <input
                    type="text"
                    value={bank.swiftCode}
                    placeholder="e.g. MEZNPKKXXXX"
                    onChange={(e) => updateBank(idx, { swiftCode: e.target.value.toUpperCase() })}
                    className="field py-2 font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="label text-xs">Branch Name &amp; City</label>
                  <input
                    type="text"
                    value={bank.branchName}
                    placeholder="e.g. Blue Area Branch, Islamabad"
                    onChange={(e) => updateBank(idx, { branchName: e.target.value })}
                    className="field py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="label text-xs">Branch Code</label>
                  <input
                    type="text"
                    value={bank.branchCode}
                    placeholder="e.g. 0101"
                    onChange={(e) => updateBank(idx, { branchCode: e.target.value })}
                    className="field py-2 font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="label text-xs">Raast ID (Optional — 0% fee instant PKR)</label>
                  <input
                    type="text"
                    value={bank.raastId}
                    placeholder="IBAN or Raast merchant ID"
                    onChange={(e) => updateBank(idx, { raastId: e.target.value })}
                    className="field py-2 font-mono text-sm"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="label text-xs">Donor Transfer Instructions</label>
                  <input
                    type="text"
                    value={bank.instructions}
                    onChange={(e) => updateBank(idx, { instructions: e.target.value })}
                    className="field py-2 text-sm"
                  />
                </div>

                <div className="md:col-span-3">
                  <ImageField
                    label="Bank / Raast QR Code Image (Optional — donors scan from banking app)"
                    value={bank.qrImageUrl}
                    library={library}
                    onUploaded={onUploaded}
                    onChange={(url) => updateBank(idx, { qrImageUrl: url })}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==================== 2. MOBILE WALLETS ==================== */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl text-deep-2">
              2. Mobile Wallets — JazzCash, EasyPaisa, SadaPay &amp; NayaPay ({config.mobileWallets.length})
            </h2>
            <p className="text-xs text-muted">
              Attach mobile wallet accounts for instant local donations across Pakistan.
            </p>
          </div>
          <button type="button" onClick={addWallet} className="btn btn-primary btn-sm">
            + Add Mobile Wallet
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {config.mobileWallets.map((wallet, idx) => (
            <div key={wallet.id} className="card space-y-4 p-5">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-deep-2">
                  <input
                    type="checkbox"
                    checked={wallet.enabled}
                    onChange={(e) => {
                      const next = [...config.mobileWallets];
                      next[idx] = { ...wallet, enabled: e.target.checked };
                      onChange({ ...config, mobileWallets: next });
                    }}
                    className="h-4 w-4 accent-[#2c75a5]"
                  />
                  <span>{wallet.provider}</span>
                </label>

                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...config,
                      mobileWallets: config.mobileWallets.filter((_, i) => i !== idx),
                    })
                  }
                  className="text-xs font-bold text-accent hover:underline"
                >
                  Remove
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="label text-xs">Wallet Provider</label>
                  <select
                    value={wallet.provider}
                    onChange={(e) => {
                      const next = [...config.mobileWallets];
                      next[idx] = { ...wallet, provider: e.target.value };
                      onChange({ ...config, mobileWallets: next });
                    }}
                    className="field py-2 text-sm font-semibold"
                  >
                    {WALLET_PRESETS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label text-xs">Account Title</label>
                  <input
                    type="text"
                    value={wallet.accountTitle}
                    onChange={(e) => {
                      const next = [...config.mobileWallets];
                      next[idx] = { ...wallet, accountTitle: e.target.value };
                      onChange({ ...config, mobileWallets: next });
                    }}
                    className="field py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="label text-xs">Wallet Mobile Number</label>
                  <input
                    type="text"
                    value={wallet.walletNumber}
                    placeholder="0300-1234567"
                    onChange={(e) => {
                      const next = [...config.mobileWallets];
                      next[idx] = { ...wallet, walletNumber: e.target.value };
                      onChange({ ...config, mobileWallets: next });
                    }}
                    className="field py-2 font-mono text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="label text-xs">Wallet IBAN (optional)</label>
                  <input
                    type="text"
                    value={wallet.iban}
                    placeholder="PK..."
                    onChange={(e) => {
                      const next = [...config.mobileWallets];
                      next[idx] = { ...wallet, iban: e.target.value.toUpperCase() };
                      onChange({ ...config, mobileWallets: next });
                    }}
                    className="field py-2 font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==================== 3. ONLINE CARD / GATEWAY INTEGRATION ==================== */}
      <div className="card space-y-5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <div>
            <h2 className="text-xl text-deep-2">
              3. Online Debit / Credit Card Gateway (PayFast, Safepay, Stripe, PayPal)
            </h2>
            <p className="text-xs text-muted">
              Attach a hosted payment link or gateway merchant credentials to accept Visa / Mastercard online alongside
              bank transfers.
            </p>
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-mist px-4 py-1.5 text-xs font-extrabold text-deep-2">
            <input
              type="checkbox"
              checked={config.onlineGateway.enabled}
              onChange={(e) =>
                onChange({
                  ...config,
                  onlineGateway: { ...config.onlineGateway, enabled: e.target.checked },
                })
              }
              className="h-4 w-4 accent-[#2c75a5]"
            />
            <span>{config.onlineGateway.enabled ? "Card Gateway Enabled" : "Card Gateway Disabled"}</span>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label text-xs">Payment Gateway Provider</label>
            <select
              value={config.onlineGateway.provider}
              onChange={(e) =>
                onChange({
                  ...config,
                  onlineGateway: {
                    ...config.onlineGateway,
                    provider: e.target.value as OnlineGatewayConfig["provider"],
                  },
                })
              }
              className="field py-2 text-sm font-semibold"
            >
              <option value="PayFast Pakistan">PayFast Pakistan</option>
              <option value="Safepay">Safepay</option>
              <option value="Stripe">Stripe (Payment Link / Checkout)</option>
              <option value="JazzCash Gateway">JazzCash Merchant Gateway</option>
              <option value="PayPal / Donorbox">PayPal / Donorbox</option>
              <option value="Custom Payment Link">Custom Hosted Checkout URL</option>
            </select>
          </div>

          <div>
            <label className="label text-xs">Hosted Payment / Checkout Link URL</label>
            <input
              type="url"
              value={config.onlineGateway.checkoutUrl}
              placeholder="https://buy.stripe.com/... or https://ipg1.apps.net.pk/..."
              onChange={(e) =>
                onChange({
                  ...config,
                  onlineGateway: { ...config.onlineGateway, checkoutUrl: e.target.value },
                })
              }
              className="field py-2 text-sm"
            />
          </div>

          <div>
            <label className="label text-xs">Merchant ID (Optional)</label>
            <input
              type="text"
              value={config.onlineGateway.merchantId}
              placeholder="Merchant ID"
              onChange={(e) =>
                onChange({
                  ...config,
                  onlineGateway: { ...config.onlineGateway, merchantId: e.target.value },
                })
              }
              className="field py-2 font-mono text-sm"
            />
          </div>

          <div>
            <label className="label text-xs">Publishable / Public Key (Optional)</label>
            <input
              type="text"
              value={config.onlineGateway.publicKey}
              placeholder="pk_live_... or merchant public key"
              onChange={(e) =>
                onChange({
                  ...config,
                  onlineGateway: { ...config.onlineGateway, publicKey: e.target.value },
                })
              }
              className="field py-2 font-mono text-sm"
            />
          </div>
        </div>
      </div>

      {/* Bottom Save Button */}
      <div className="flex justify-end gap-3">
        <button type="button" onClick={onReset} className="btn btn-ghost">
          Reset Defaults
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={onSave}
          className="btn btn-accent disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save & Attach Bank System"}
        </button>
      </div>
    </div>
  );
}
