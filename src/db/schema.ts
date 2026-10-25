import { pgTable, serial, varchar, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 300 }).notNull(),
  thematicArea: varchar("thematic_area", { length: 100 }).notNull(),
  description: text("description").notNull(),
  location: varchar("location", { length: 200 }).notNull(),
  donor: varchar("donor", { length: 200 }).notNull(),
  budget: integer("budget"),
  reach: varchar("reach", { length: 200 }),
  period: varchar("period", { length: 100 }),
  image: varchar("image", { length: 500 }),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 300 }).notNull().unique(),
  title: varchar("title", { length: 400 }).notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  image: varchar("image", { length: 600 }).notNull(),
  publishedAt: timestamp("published_at").defaultNow(),
  featured: boolean("featured").default(false),
});

export const partners = pgTable("partners", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  logo: varchar("logo", { length: 600 }),
  website: varchar("website", { length: 300 }),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 300 }).notNull(),
  subject: varchar("subject", { length: 300 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status", { length: 24 }).notNull().default("unread"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  donorName: varchar("donor_name", { length: 200 }).notNull(),
  email: varchar("email", { length: 300 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  country: varchar("country", { length: 100 }),
  city: varchar("city", { length: 100 }),
  senderAccountNumber: varchar("sender_account_number", { length: 100 }),
  amount: integer("amount").notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("PKR"),
  purpose: varchar("purpose", { length: 160 }),
  frequency: varchar("frequency", { length: 20 }).notNull().default("once"),
  paymentMethod: varchar("payment_method", { length: 40 }).notNull().default("bank_transfer"),
  bankAccountLabel: varchar("bank_account_label", { length: 220 }),
  transactionRef: varchar("transaction_ref", { length: 160 }),
  receiptUrl: varchar("receipt_url", { length: 500 }),
  status: varchar("status", { length: 24 }).notNull().default("pending"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const siteCms = pgTable("site_cms", {
  key: varchar("key", { length: 120 }).primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const uploadedMedia = pgTable("uploaded_media", {
  id: serial("id").primaryKey(),
  filename: varchar("filename", { length: 260 }).notNull(),
  mimeType: varchar("mime_type", { length: 100 }).notNull(),
  storagePath: varchar("storage_path", { length: 1000 }),
  // Kept nullable so legacy rows with database-backed files remain readable.
  dataBase64: text("data_base64"),
  createdAt: timestamp("created_at").defaultNow(),
});
