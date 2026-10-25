export type BankCurrency = "PKR" | "USD" | "GBP" | "EUR" | "MULTI";

export type BankAccountCategory =
  | "General & Sadaqah"
  | "Zakat Only"
  | "International Wire (USD / GBP / EUR)";

export type BankAccountConfig = {
  id: string;
  enabled: boolean;
  bankName: string;
  shortCode: string;
  accountTitle: string;
  accountNumber: string;
  iban: string;
  branchName: string;
  branchCode: string;
  swiftCode: string;
  raastId: string;
  currency: BankCurrency;
  category: BankAccountCategory;
  qrImageUrl: string;
  instructions: string;
};

export type MobileWalletConfig = {
  id: string;
  enabled: boolean;
  provider: string;
  accountTitle: string;
  walletNumber: string;
  iban: string;
  qrImageUrl: string;
  instructions: string;
};

export type OnlineGatewayConfig = {
  enabled: boolean;
  provider:
    | "PayFast Pakistan"
    | "Safepay"
    | "Stripe"
    | "JazzCash Gateway"
    | "PayPal / Donorbox"
    | "Custom Payment Link";
  checkoutUrl: string;
  merchantId: string;
  publicKey: string;
  buttonLabel: string;
  instructions: string;
};

export type PaymentSystemConfig = {
  bankTransferEnabled: boolean;
  mobileWalletEnabled: boolean;
  pledgeLaterEnabled: boolean;
  allowReceiptUpload: boolean;
  requireTransactionRef: boolean;
  taxExemptionNote: string;
  confirmationNote: string;
  bankAccounts: BankAccountConfig[];
  mobileWallets: MobileWalletConfig[];
  onlineGateway: OnlineGatewayConfig;
};

export type BankPreset = {
  name: string;
  shortCode: string;
  swiftCode: string;
  ibanBankCode: string;
};

export const PAKISTAN_BANK_PRESETS: BankPreset[] = [
  { name: "Meezan Bank Limited", shortCode: "MEBL", swiftCode: "MEZNPKKXXXX", ibanBankCode: "MEZN" },
  { name: "Habib Bank Limited (HBL)", shortCode: "HBL", swiftCode: "HABBPKKAXXX", ibanBankCode: "HABB" },
  { name: "United Bank Limited (UBL)", shortCode: "UBL", swiftCode: "UNILPKKAXXX", ibanBankCode: "UNIL" },
  { name: "MCB Bank Limited", shortCode: "MCB", swiftCode: "MUCBPKKXXXX", ibanBankCode: "MUCB" },
  { name: "Allied Bank Limited (ABL)", shortCode: "ABL", swiftCode: "ABPAPKKAXXX", ibanBankCode: "ABPA" },
  { name: "Bank Alfalah Limited", shortCode: "BAFL", swiftCode: "ALFHPKKAXXX", ibanBankCode: "ALFH" },
  { name: "Faysal Bank Limited", shortCode: "FBL", swiftCode: "FAYSPKKAXXX", ibanBankCode: "FAYS" },
  { name: "Askari Bank Limited", shortCode: "AKBL", swiftCode: "ASCMPKKAXXX", ibanBankCode: "ASCM" },
  { name: "National Bank of Pakistan (NBP)", shortCode: "NBP", swiftCode: "NBPAPKKAXXX", ibanBankCode: "NBPA" },
  { name: "Bank of Punjab (BOP)", shortCode: "BOP", swiftCode: "BPUNPKKAXXX", ibanBankCode: "BPUN" },
  { name: "BankIslami Pakistan Limited", shortCode: "BIPL", swiftCode: "BKIPPKKAXXX", ibanBankCode: "BKIP" },
  { name: "Dubai Islamic Bank Pakistan", shortCode: "DIB", swiftCode: "DUIBPKKAXXX", ibanBankCode: "DUIB" },
  { name: "Standard Chartered Bank Pakistan", shortCode: "SCB", swiftCode: "SCBLPKKX001", ibanBankCode: "SCBL" },
  { name: "JS Bank Limited", shortCode: "JSBL", swiftCode: "JSBLPKKAXXX", ibanBankCode: "JSBL" },
  { name: "Soneri Bank Limited", shortCode: "SNBL", swiftCode: "SONEPKKAXXX", ibanBankCode: "SONE" },
  { name: "HabibMetro Bank", shortCode: "HMB", swiftCode: "MPBLPKKAXXX", ibanBankCode: "MPBL" },
  { name: "Wise / International Bank Account", shortCode: "INTL", swiftCode: "TRWIBEB1XXX", ibanBankCode: "" },
  { name: "Custom Bank", shortCode: "BANK", swiftCode: "", ibanBankCode: "" },
];

export const WALLET_PRESETS = [
  "JazzCash",
  "EasyPaisa",
  "SadaPay",
  "NayaPay",
  "UPaisa",
  "Zindigi",
];

export function formatIbanDisplay(rawIban: string): string {
  const clean = rawIban.replace(/\s+/g, "").toUpperCase();
  return clean.replace(/(.{4})/g, "$1 ").trim();
}

export const DEFAULT_PAYMENT_CONFIG: PaymentSystemConfig = {
  bankTransferEnabled: true,
  mobileWalletEnabled: true,
  pledgeLaterEnabled: true,
  allowReceiptUpload: true,
  requireTransactionRef: false,
  taxExemptionNote:
    "Registered non-profit under the Societies Registration Act 1860 · Punjab Charity Commission Category ‘A’ · Valid EAD NOC for receiving international remittances.",
  confirmationNote:
    "Transfer via IBFT, Raast, mobile banking or international SWIFT wire, then enter your reference ID or upload your transfer receipt below for instant verification.",
  bankAccounts: [
    {
      id: "bank-pkr-main",
      enabled: true,
      bankName: "Meezan Bank Limited",
      shortCode: "MEBL",
      accountTitle: "Friends Foundation Pakistan",
      accountNumber: "0101-0100000000",
      iban: "PK00MEZN0001010100000000",
      branchName: "Islamabad Main Branch",
      branchCode: "0101",
      swiftCode: "MEZNPKKXXXX",
      raastId: "PK00MEZN0001010100000000",
      currency: "PKR",
      category: "General & Sadaqah",
      qrImageUrl: "",
      instructions:
        "Supports instant IBFT & fee-free Raast transfer from any banking app in Pakistan (HBL, UBL, Meezan, MCB, Alfalah, SadaPay, NayaPay, JazzCash, EasyPaisa).",
    },
    {
      id: "bank-pkr-zakat",
      enabled: true,
      bankName: "Habib Bank Limited (HBL)",
      shortCode: "HBL",
      accountTitle: "Friends Foundation Pakistan — Zakat Account",
      accountNumber: "0042-7900000003",
      iban: "PK00HABB0000427900000003",
      branchName: "Rawalpindi / Islamabad Branch",
      branchCode: "0042",
      swiftCode: "HABBPKKAXXX",
      raastId: "",
      currency: "PKR",
      category: "Zakat Only",
      qrImageUrl: "",
      instructions:
        "Dedicated Shariah-separated account exclusively for Zakat funds supporting eligible healthcare, clean drinking water and relief families.",
    },
    {
      id: "bank-intl-swift",
      enabled: true,
      bankName: "Habib Bank Limited (HBL)",
      shortCode: "HBL",
      accountTitle: "Friends Foundation Pakistan",
      accountNumber: "0042-7990000001",
      iban: "PK00HABB0000427990000001",
      branchName: "Foreign Exchange Branch, Islamabad",
      branchCode: "0042",
      swiftCode: "HABBPKKAXXX",
      raastId: "",
      currency: "MULTI",
      category: "International Wire (USD / GBP / EUR)",
      qrImageUrl: "",
      instructions:
        "For overseas donors sending USD, GBP or EUR via international bank wire, Wise, Remitly or Western Union direct-to-bank (EAD NOC approved).",
    },
  ],
  mobileWallets: [
    {
      id: "wallet-jazzcash",
      enabled: true,
      provider: "JazzCash",
      accountTitle: "Friends Foundation Pakistan",
      walletNumber: "0300-0000000",
      iban: "",
      qrImageUrl: "",
      instructions: "Send via JazzCash App, *786#, or IBFT to JazzCash.",
    },
    {
      id: "wallet-easypaisa",
      enabled: true,
      provider: "EasyPaisa",
      accountTitle: "Friends Foundation Pakistan",
      walletNumber: "0345-0000000",
      iban: "",
      qrImageUrl: "",
      instructions: "Send via EasyPaisa App or *786# instant transfer.",
    },
  ],
  onlineGateway: {
    enabled: false,
    provider: "PayFast Pakistan",
    checkoutUrl: "",
    merchantId: "",
    publicKey: "",
    buttonLabel: "Pay Instantly by Debit / Credit Card",
    instructions:
      "Complete instant Visa / Mastercard / UnionPay checkout via our secure payment gateway.",
  },
};
