export const site = {
  name: "Friends Foundation Pakistan",
  tagline: "Empowering Communities. Transforming Lives.",
  founded: 2001,
  phone: { label: "+92-051-4444394/5", href: "tel:+92514444394" },
  phoneAlt: { label: "+92-51-4444395", href: "tel:+92514444395" },
  email: "friendsfoundation@ffpak.org.pk",
  emailAlt: "friendsfoundation@ffpak.org",
  website: "www.ffpak.org.pk",
  offices: [
    { label: "Head Office", place: "House #64-S, Service Road East, I-10/4, Islamabad, Pakistan" },
    { label: "Regional Office", place: "Multan, Punjab, Pakistan" },
  ],
  healthCentres: ["Akal Garh", "Mohan Pura", "Mohallah Raja Sultan"],
  socials: [
    { name: "Facebook", href: "https://www.facebook.com/p/Friends-Foundation-100065538630350/" },
    { name: "Instagram", href: "https://www.instagram.com/friendsfoundation.org.pk/" },
    { name: "LinkedIn", href: "https://pk.linkedin.com/company/friendsfoundationpk" },
    { name: "X", href: "https://x.com/friendsfoundationpk" },
    { name: "YouTube", href: "https://www.youtube.com/watch?v=9No-FiEInLA" },
  ],
};

export const areaLinks = [
  { slug: "integrated-health", title: "Integrated Health" },
  { slug: "wash", title: "Water, Sanitation & Hygiene" },
  { slug: "women-empowerment", title: "Women Empowerment" },
  { slug: "climate-resilience", title: "Climate Resilience" },
  { slug: "education", title: "Education" },
  { slug: "governance", title: "Governance" },
  { slug: "humanitarian", title: "Humanitarian Response" },
];

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const mainNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our story", href: "/about#story" },
      { label: "Vision & mission", href: "/about#vision" },
      { label: "Registration & memberships", href: "/about#registration" },
      { label: "Board & team", href: "/about#team" },
    ],
  },
  {
    label: "Our Work",
    href: "/our-work",
    children: [
      ...areaLinks.map((a) => ({ label: a.title, href: `/our-work/${a.slug}` })),
      { label: "All programmes", href: "/our-work" },
    ],
  },
  {
    label: "Get Involved",
    href: "/help",
    children: [
      { label: "How you can help", href: "/help" },
      { label: "Donate (PKR, USD, GBP, EUR)", href: "/donate" },
      { label: "Volunteer & in-kind", href: "/help" },
    ],
  },
  {
    label: "Careers",
    href: "/careers",
    children: [
      { label: "Job Opportunities", href: "/careers" },
      { label: "Recent Jobs", href: "/careers/recent-jobs" },
      { label: "Tenders", href: "/careers/tenders" },
    ],
  },
  { label: "Contact", href: "/contact" },
  {
    label: "More",
    href: "/how-we-work",
    children: [
      { label: "How we work", href: "/how-we-work" },
      { label: "Media & gallery", href: "/media" },
    ],
  },
];
