export const img = (file: string) => `/images/ff/${file}`;

export type Figure = { value: string; label: string };
export type Photo = { src: string; caption: string };

export type Area = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  imageCaption: string;
  body: string[];
  figures: Figure[];
  lists: { title: string; items: string[] }[];
  partners: string[];
  photos: Photo[];
};

/* ---------- Headline numbers (from ffpak.org.pk) ---------- */

export const stats: Figure[] = [
  { value: "14.25M+", label: "total beneficiaries reached over 24 years" },
  { value: "2.45M+", label: "direct community outreach beneficiaries" },
  { value: "122.7K+", label: "people provided with clean water and sanitation" },
  { value: "72,000", label: "electoral & polling officers trained (UNDP/ECP)" },
];

export const hpvCampaign2025 = {
  title: "Pakistan's First-Ever HPV Vaccination Campaign (2025)",
  subtitle: "Reaching out-of-school girls in underserved communities of South Punjab",
  partner: "Federal Directorate for Immunization (FDI) & Gavi, The Vaccine Alliance",
  targetGroup: "Adolescent girls aged 9–14 years",
  location: "District Multan (UC Gulshan-e-5 Faiz and UC Dera Muhammadi)",
  totalReached: "3,746",
  vaccinatedGulshan: "1,045",
  vaccinatedDera: "687",
  refusalsReversed: "300+",
  description:
    "In 2025, the Government of Pakistan's Federal Directorate for Immunization (FDI), in collaboration with Gavi, the Vaccine Alliance, launched Pakistan's first-ever HPV vaccination campaign for girls aged 9–14 years. As an implementing partner, Friends Foundation identified and mobilized out-of-school girls from underserved communities in District Multan, reversing over 300 vaccine hesitancy cases and supporting equitable access to life-saving prevention.",
};

export const cumulativeImpact24Yr = {
  totalBeneficiaries: "14.25M+",
  directOutreach: "2.45M+",
  indirectOutreach: "9.80M+",
  communityHealthAwareness: "1.20M+",
  youthEngagement: "800,000+",
  medicalCampsPatients: "139,500+",
  electoralOfficersTrained: "72,000",
  hivAidsMobilization: "300,000+",
  dietaryAssessments: "13,104",
  tbaTrainings: "1,200+",
  trainersTrained: "1,140+",
  washHumanitarianTrainings: "480",
  latrinesBuilt: "200+",
  handPumpsBuilt: "250+",
  waterTests: "250",
  phcAnnualMothersChildren: "100,000",
};

export const unSdgs = [
  { number: 3, name: "Good Health & Well-being", color: "#4c9f38", logo: "/images/sdgs/goal-03.svg" },
  { number: 4, name: "Quality Education", color: "#c5192d", logo: "/images/sdgs/goal-04.svg" },
  { number: 5, name: "Gender Equality", color: "#ff3a21", logo: "/images/sdgs/goal-05.svg" },
  { number: 6, name: "Clean Water & Sanitation", color: "#26bde2", logo: "/images/sdgs/goal-06.svg" },
  { number: 13, name: "Climate Action", color: "#3f7e44", logo: "/images/sdgs/goal-13.svg" },
  { number: 16, name: "Peace, Justice & Strong Institutions", color: "#00689d", logo: "/images/sdgs/goal-16.svg" },
  { number: 17, name: "Partnerships for the Goals", color: "#19486a", logo: "/images/sdgs/goal-17.svg" },
];

export const keyPolicies = [
  { name: "HR Policy", desc: "Merit-based recruitment, staff welfare, code of ethics, and equal opportunity." },
  { name: "Financial Policy", desc: "Rigorous accounting standards, multi-tier authorizations, and third-party annual audits." },
  { name: "Child Protection Policy", desc: "Zero tolerance for abuse or exploitation; child-safe programming standards." },
  { name: "Grievance Policy", desc: "Independent and confidential reporting mechanisms for beneficiaries, partners, and staff." },
  { name: "Procurement Policy", desc: "Transparent bidding, conflict-of-interest prevention, and cost-effective purchasing." },
  { name: "Gender Policy (PSEA)", desc: "Protection from Sexual Exploitation and Abuse, gender mainstreaming across all programs." },
  { name: "Security Policy", desc: "Field security protocols, disaster risk management, and duty of care." },
  { name: "Program Development Policy", desc: "Participatory community needs assessments, evidence-based design, and sustainability." },
  { name: "IT Policy", desc: "Data protection, secure communications, and beneficiary information privacy." },
  { name: "Monitoring & Evaluation Policy", desc: "Five-stage M&E cycle ensuring measurable results, accountability, and continuous learning." },
];

export const vision =
  "A just and inclusive society where all individuals, regardless of gender or ethnicity, have equal opportunities to exercise their social, economic, and political rights—supported by sustainable development, social welfare, and quality healthcare.";

export const mission =
  "To empower underprivileged and vulnerable communities, with a special focus on women, children, transgender community, persons with disabilities, and marginalized groups, by ensuring equitable access to quality social services, healthcare, education, and sustainable livelihood opportunities.";

/* ---------- Thematic areas ---------- */

export const areas: Area[] = [
  {
    slug: "integrated-health",
    title: "Integrated Health",
    summary:
      "Three family health centres in Rawalpindi’s low-income neighbourhoods, plus medical camps and outbreak response wherever families need them.",
    image: "pl41.jpg",
    imageCaption: "Orientation session for traditional birth attendants",
    body: [
      "Health care is where Friends Foundation began. After the 2001 flood in Rawalpindi we ran free medical camps in the worst-hit streets, and those camps became three family health centres — in Akal Garh, Mohan Pura and Mohallah Raja Sultan — that still serve these neighbourhoods on the edge of the city.",
      "The centres concentrate on reproductive, maternal, newborn and child health, with a particular focus on nutrition for young children and for pregnant and breastfeeding women. Around 50,000 women, 50,000 children and 40,000 men are seen directly each year, and our health education sessions reach many more people in the surrounding communities.",
      "Beyond Rawalpindi, our teams have run medical camps for families displaced to Kohat and Swat, and for flood-affected communities in Charsadda, Kohistan and Muzaffargarh. When acute watery diarrhoea broke out, we worked with WHO to run treatment centres at the district headquarters hospital in Muzaffargarh, at RHC Kohistan and in the Togh Sarai camp for displaced families in Hangu.",
      "Under PAIMAN, the Pakistan Initiative for Mothers and Newborns, we trained traditional birth attendants, held mobile health camps, vaccinated pregnant women against tetanus, handed out clean delivery kits and built referral links in rural parts of Rawalpindi district. We have also worked with the GAVI Alliance and CRS on a low-cost model for raising immunisation coverage, and with APACHA and ActionAid on an HIV and AIDS awareness campaign that reached 300,000 people in Rawalpindi.",
    ],
    figures: [
      { value: "140,000", label: "people treated each year at our three centres" },
      { value: "160", label: "medical and mobile health camps" },
      { value: "30", label: "trainings for traditional birth attendants" },
      { value: "300,000", label: "people reached with HIV and AIDS awareness" },
    ],
    lists: [
      {
        title: "Care for mothers",
        items: [
          "Nutrition counselling during pregnancy",
          "Advice on a balanced diet and micronutrients",
          "Iron-folic acid and calcium supplements",
          "Deworming tablets",
        ],
      },
      {
        title: "Care for children",
        items: [
          "Growth monitoring — weight, height and MUAC",
          "Counselling on breastfeeding and complementary feeding",
          "Vitamin A, zinc and iron supplements",
          "Deworming twice a year for children aged 12–59 months",
          "Nutrition screening and referrals",
        ],
      },
      {
        title: "In the community",
        items: [
          "Health and nutrition education sessions",
          "Immunisation support linked to the EPI programme",
          "Hygiene and safe food counselling",
          "Nutrition days and weeks",
          "Links to food support during emergencies",
        ],
      },
    ],
    partners: ["WHO", "GAVI Alliance", "CRS", "APACHA", "ActionAid"],
    photos: [
      { src: "n28.jpg", caption: "Oral polio drops at an EPI centre" },
      { src: "pl43.jpg", caption: "Traditional birth attendants at an orientation session" },
      { src: "pl31.jpg", caption: "PAIMAN awareness session on key health messages" },
      { src: "n9.jpg", caption: "A health awareness session" },
    ],
  },
  {
    slug: "wash",
    title: "Water, Sanitation & Hygiene",
    summary:
      "Filtration plants, hand pumps, latrines and hygiene training — in city slums and in villages recovering from floods.",
    image: "pl62.jpeg",
    imageCaption: "A community hand pump",
    body: [
      "Diarrhoeal disease is a constant threat in the crowded neighbourhoods where we work, in Punjab and Khyber Pakhtunkhwa alike. Our answer has been safe drinking water that lasts: we install filtration plants together with WASA, so the public utility owns them, while local community organisations form water management committees that look after repairs and maintenance.",
      "We have installed plants in Rawalpindi and Mansehra. In Rawalpindi’s slums we have rehabilitated 10 filtration plants, repaired 10 waste-collection vehicles and run 15 trainings with WASA and local officials on managing filtration systems. We also carried out WASH research in five union councils of the city.",
      "After floods, we work in villages that have lost their water and sanitation. In Muzaffargarh we handed out 300 hygiene kits and 300 jerry cans and held 150 mobile health camps. In Dera Ghazi Khan we repaired latrines, installed hand pumps, ran hygiene sessions and gave winter kits to 3,096 families. In Rajanpur we held 20 training-of-trainers sessions, tested 250 hand pumps, built 200 latrines and helped put in 250 hand pumps. For displaced families in Bannu we provided 2,968 hygiene kits, 50 latrines, 86 water tanks and 150 hygiene sessions.",
      "Women are part of the decisions. One project in Rawalpindi’s slums focused entirely on building women’s skills so they could take an active role in how water and sanitation are run in their neighbourhoods.",
    ],
    figures: [
      { value: "122.7K", label: "people reached with clean water and sanitation" },
      { value: "265", label: "hand pumps installed" },
      { value: "250", label: "water quality tests" },
      { value: "3,468", label: "hygiene kits distributed" },
    ],
    lists: [
      {
        title: "Where we have worked",
        items: [
          "Rawalpindi — urban slums",
          "Mansehra",
          "Muzaffargarh",
          "Dera Ghazi Khan",
          "Rajanpur",
          "Bannu",
        ],
      },
    ],
    partners: ["WASA", "The Asia Foundation", "Aurat Foundation"],
    photos: [
      { src: "pl67.jpeg", caption: "A community water filtration plant" },
      { src: "pl35.jpg", caption: "Interactive theatre training, Pakistan Safe Drinking Water and Hygiene Promotion Project" },
      { src: "pl11.jpeg", caption: "Global Handwashing Day, 15 October 2017" },
      { src: "pl60.jpg", caption: "Training religious teachers in hygiene promotion" },
      { src: "gal15.jpg", caption: "Contents of a hygiene kit" },
      { src: "pl65.jpeg", caption: "A water and sanitation facility" },
    ],
  },
  {
    slug: "women-empowerment",
    title: "Women Empowerment",
    summary:
      "Making sure women have a voice in the decisions that affect them — starting with water — and the skills to earn an income.",
    image: "pl68.jpg",
    imageCaption: "A Women Development Programme session",
    body: [
      "Gender inclusion runs through all of our programmes, but it matters most in water and sanitation. Women and girls carry most of the burden of fetching and managing water, yet they rarely have a say in how it is run. We make sure they do.",
      "In Muzaffargarh, working with The Asia Foundation and Aurat Foundation, we ran a project that tied women’s empowerment to water supply. It installed 15 hand pumps, built 15 latrines and tested the water at 20 water plants.",
      "In Rawalpindi we have supported non-formal education and skills training for young girls, helping them earn an income and play a bigger part in their households and communities.",
    ],
    figures: [
      { value: "15", label: "hand pumps installed in Muzaffargarh" },
      { value: "15", label: "latrines built" },
      { value: "20", label: "water plants tested" },
    ],
    lists: [
      {
        title: "What this work includes",
        items: [
          "Women on water and sanitation committees",
          "Water supply schemes planned with women",
          "Non-formal education for girls",
          "Skills training that leads to an income",
          "Gender inclusion across all our projects",
        ],
      },
    ],
    partners: ["The Asia Foundation", "Aurat Foundation"],
    photos: [
      { src: "pl70.jpg", caption: "Women Development Programme" },
      { src: "pl69.jpg", caption: "International Women’s Day" },
    ],
  },
  {
    slug: "education",
    title: "Education",
    summary:
      "Non-formal learning for girls, health and hygiene lessons in schools, and awareness of children’s rights.",
    image: "pl33.jpg",
    imageCaption: "Awareness session on child rights and protection",
    body: [
      "With FPAP and UNICEF we have run non-formal education and skills development for young girls who missed out on school.",
      "In schools, we teach children and teachers about nutrition, hygiene and safe drinking water, immunisation and adolescent health. International days such as World Health Day, World Water Day and Global Handwashing Day give us a chance to take those messages home to families.",
      "We also run awareness programmes on children’s rights, including events such as the Race for Survival in Islamabad and Rawalpindi. Our voter education work with UNDP and the Election Commission of Pakistan is described under Governance.",
    ],
    figures: [],
    lists: [
      {
        title: "In schools",
        items: [
          "Nutrition education for students and teachers",
          "Water, sanitation and hygiene sessions",
          "Safe drinking water promotion",
          "Immunisation awareness",
          "Adolescent health education",
        ],
      },
      {
        title: "Days we mark",
        items: [
          "World Health Day",
          "Nutrition Day",
          "World Water Day",
          "World Hepatitis Day",
          "Immunisation Day",
          "Global Handwashing Day",
        ],
      },
    ],
    partners: ["FPAP", "UNICEF"],
    photos: [
      { src: "pl10.jpeg", caption: "Global Handwashing Day session" },
      { src: "pl11.jpeg", caption: "Global Handwashing Day, 15 October 2017" },
    ],
  },
  {
    slug: "climate-resilience",
    title: "Climate Resilience",
    summary:
      "Training communities to prepare for floods and other disasters, and responding quickly when they strike.",
    image: "pl63.jpeg",
    imageCaption: "Community disaster preparedness planning training",
    body: [
      "Many of the districts we work in flood again and again. Alongside relief, we help communities get ready. In Muzaffargarh we have trained local people in first aid, firefighting and rescue, so that the first responders in a disaster are people who live there.",
      "When disasters do hit, we respond. Our teams have run flood relief in Muzaffargarh, Dera Ghazi Khan, Rajanpur and Tando Allah Yar, supported families affected by heavy rains in Sindh, and helped people displaced from Khyber Agency.",
    ],
    figures: [{ value: "48", label: "first aid, firefighting and rescue trainings" }],
    lists: [
      {
        title: "Flood and disaster response",
        items: [
          "Muzaffargarh",
          "Dera Ghazi Khan",
          "Rajanpur",
          "Tando Allah Yar",
          "Rain-affected districts of Sindh",
          "Families displaced from Khyber Agency",
        ],
      },
    ],
    partners: [],
    photos: [
      { src: "gal34.jpg", caption: "A relief tent" },
      { src: "pl38.jpg", caption: "A community session under a camp tent" },
    ],
  },
  {
    slug: "governance",
    title: "Governance",
    summary:
      "Voter education, election training and community-led decision-making that makes local institutions more accountable.",
    image: "n1.jpg",
    imageCaption: "District review workshop",
    body: [
      "With UNDP, UNOPS and the Election Commission of Pakistan we have run voter education programmes and trained presiding and polling officers in Rawalpindi, Jhelum, Chakwal, Attock, Mandi Bahauddin and Islamabad.",
      "Locally, we promote community-based governance: village and neighbourhood organisations that plan and monitor their own development, include women in decisions and hold local institutions to account.",
      "We also take part in district forums — such as the District Nutrition Addressing Committee — and sit on the advisory board of the District Health Department in Rawalpindi. Through networks, research and advocacy we push for the rights of marginalised groups to be protected at provincial and national level.",
    ],
    figures: [],
    lists: [
      {
        title: "Key activities",
        items: [
          "Voter education programmes",
          "Training for presiding and polling officers",
          "Community-based governance models",
          "Including women in local decision-making",
          "Accountability mechanisms for local institutions",
        ],
      },
    ],
    partners: ["UNDP", "UNOPS", "Election Commission of Pakistan"],
    photos: [
      { src: "n13.jpg", caption: "Monthly meeting of the District Nutrition Addressing Committee" },
      { src: "n3.jpg", caption: "District review workshop" },
      { src: "pl52.jpg", caption: "Training of community organisations" },
      { src: "pl54.jpg", caption: "Training of community organisations" },
    ],
  },
  {
    slug: "humanitarian",
    title: "Humanitarian Response",
    summary:
      "Health care, food, shelter and clean water for families hit by floods, earthquakes, displacement and disease outbreaks.",
    image: "pl36.jpg",
    imageCaption: "A community session under a camp tent",
    body: [
      "We have been a frontline responder since our first day. After floods in Charsadda, Kohistan, Dera Ghazi Khan and Rajanpur we provided emergency health care, food and non-food items. For families displaced to Kohat and Swat we ran primary health care services, and in the camps we supplied hygiene items, food, safe drinking water and care for mothers.",
      "We responded to the earthquake in Azad Jammu & Kashmir and to floods in South Punjab, helping families with shelter, health services and water and sanitation as they rebuilt. We have also supported communities through dengue, malaria and COVID-19 outbreaks.",
      "Partnerships with Concern Worldwide, WHO and USAID have strengthened our ability to respond quickly and at scale.",
    ],
    figures: [
      { value: "3,468", label: "hygiene kits distributed" },
      { value: "3,096", label: "families given winter kits in Dera Ghazi Khan" },
      { value: "160", label: "medical and mobile health camps" },
    ],
    lists: [
      {
        title: "What we provide",
        items: [
          "Emergency health care",
          "Food and non-food items",
          "Shelter for displaced families",
          "Primary health care for displaced people",
          "Safe water, sanitation and hygiene",
        ],
      },
    ],
    partners: ["Concern Worldwide", "WHO", "USAID"],
    photos: [
      { src: "gal34.jpg", caption: "A relief tent" },
      { src: "gal15.jpg", caption: "Contents of a hygiene kit" },
      { src: "pl39.jpg", caption: "Health awareness in a camp" },
      { src: "pl38.jpg", caption: "A community session under a camp tent" },
    ],
  },
];

/* ---------- Home page: from the field ---------- */

export const fieldNotes = [
  {
    image: "n28.jpg",
    tag: "Health · Immunisation",
    title: "Polio drops at an EPI centre",
    text: "Immunisation runs alongside routine care at our health centres, so children in these neighbourhoods do not miss their vaccinations.",
  },
  {
    image: "n13.jpg",
    tag: "Nutrition",
    title: "District Nutrition Addressing Committee",
    text: "Monthly meetings bring together government departments and civil society organisations working on nutrition in the district.",
  },
  {
    image: "pl11.jpeg",
    tag: "WASH · October 2017",
    title: "Global Handwashing Day",
    text: "Sessions on handwashing with soap, held on 15 October 2017 under the theme “Our hands, our future”.",
  },
];

/* ---------- Accomplishments ---------- */

export const accomplishments: Figure[] = [
  { value: "160", label: "medical and mobile health camps" },
  { value: "30", label: "trainings for traditional birth attendants" },
  { value: "3,468", label: "hygiene kits distributed" },
  { value: "265", label: "hand pumps installed" },
  { value: "250", label: "water quality tests" },
  { value: "86", label: "water tanks installed" },
  { value: "10", label: "water filtration plants rehabilitated" },
  { value: "48", label: "first aid, firefighting and rescue trainings" },
  { value: "140,000", label: "people a year at our primary health centres" },
  { value: "80", label: "clean delivery kits distributed" },
  { value: "300", label: "jerry cans for safe water storage" },
  { value: "20", label: "training-of-trainers sessions" },
];

export const otherAccomplishments = [
  "Tetanus toxoid (TT) vaccination for pregnant women",
  "Training of presiding and polling officers",
  "Voter education programmes",
  "Non-formal education and skills development",
];

/* ---------- Partners (logos from ffpak.org.pk) ---------- */

export const devPartners = [
  { name: "Save the Children", logo: "l1.jpg" },
  { name: "The World Bank", logo: "l2.png" },
  { name: "UNDP", logo: "l3.png" },
  { name: "USAID", logo: "l6.jpg" },
  { name: "Concern Worldwide", logo: "l7.jpeg" },
  { name: "CARE", logo: "l8.jpg" },
  { name: "Aurat Foundation", logo: "l9.jpg" },
  { name: "UN Emergency Response Fund Pakistan", logo: "l10.png" },
];

export const govPartners = [
  { name: "WASA Rawalpindi", logo: "tg5.png" },
  { name: "FAST National University", logo: "tg6.png" },
  { name: "Tehsil Municipal Administration", logo: "tg7.png" },
  { name: "National Disaster Management Authority", logo: "tg8.png" },
  { name: "PDMA Khyber Pakhtunkhwa", logo: "tg10.png" },
  { name: "Government of Sindh", logo: "tg1.png" },
  { name: "Government of Khyber Pakhtunkhwa", logo: "tg2.png" },
  { name: "Barani Institute of Information Technology", logo: "tg3.png" },
  { name: "Government of Punjab", logo: "tg9.png" },
];

/* ---------- About ---------- */

export const facts: [string, string][] = [
  ["Founded", "2001, after the Rawalpindi flood"],
  ["Founder & CEO", "Muhammad Abbas Gondal"],
  ["Head office", "Islamabad"],
  ["Field office", "Multan"],
  ["Health centres", "Akal Garh, Mohan Pura and Mohallah Raja Sultan, Rawalpindi"],
  ["Legal status", "Registered society · Punjab Charity Commission Category ‘A’ · EAD NOC"],
];

export const registration = [
  {
    title: "Societies Registration Act, 1860",
    text: "Registered as a not-for-profit society since we began.",
    logo: "legal1.png",
  },
  {
    title: "Punjab Charity Commission",
    text: "Registered as a Category ‘A’ charity.",
    logo: "legal2.png",
  },
  {
    title: "Economic Affairs Division",
    text: "Holds a valid no-objection certificate, which allows us to receive funding from abroad.",
    logo: "legal3.png",
  },
];

export const certificates: Photo[] = [
  { src: "2.jpg", caption: "Membership certificate — SUN Civil Society Alliance" },
  { src: "3.jpg", caption: "Membership certificate — PCCHI" },
];

export const memberships = [
  "Scaling Up Nutrition (SUN) Civil Society Alliance",
  "Pakistan CSO Coalition for Health & Immunization (PCCHI)",
  "APACHA Network",
  "Child Rights Movement (national chapter)",
  "Older People’s Rights Network",
  "Nutrition Cluster — executive member",
  "National Health and WASH Cluster",
  "Divisional Monitoring Committee on Hospital Waste, Rawalpindi Division",
  "District Support Group",
  "Advisory and Selection Board, District Health Department Rawalpindi",
];

export const board = [
  { name: "Muhammad Abbas Gondal", role: "President" },
  { name: "Zameer ul Hassan", role: "Senior Vice President" },
  { name: "Nazia Kiran", role: "Vice President" },
  { name: "Kiran", role: "General Secretary" },
  { name: "Nabeela Kauser", role: "Finance Secretary" },
  { name: "Naveed Iqbal", role: "Joint Secretary" },
  { name: "Muhammad Ali Fareedon Baig", role: "Information Secretary" },
];

export const staff: { name: string; role: string; photo?: string }[] = [
  { name: "Muhammad Abbas Gondal", role: "Chief Executive Officer & Founder", photo: "h1.png" },
  { name: "Muhammad Ibraheem", role: "Manager Programmes", photo: "h2.jpeg" },
  { name: "Adv. Zumer-ul-Hassan", role: "MEAL Manager & Legal Advisor", photo: "h3.jpg" },
  { name: "Syed Shahbaz Ghous Bukhari", role: "Project Manager (Field)", photo: "h4.jpg" },
  { name: "Dr. Fatima Chaudry", role: "Public Health Specialist" },
  { name: "Muhammad Haseeb", role: "Finance Manager" },
  { name: "Waleed Abbas Gondal", role: "HR Manager" },
  { name: "Sohail Akhter", role: "IT & Network Administrator", photo: "h8.jpg" },
];

/* ---------- How we work ---------- */

export const principles = [
  { title: "Adaptable", text: "We fit our work to each community’s needs and build relationships that outlast a single project." },
  { title: "Participatory", text: "Communities take part in every stage — planning, design, delivery and evaluation." },
  { title: "Community-driven", text: "Local activists lead service delivery and awareness, so ownership stays in the community." },
  { title: "Culturally appropriate", text: "We work with local norms and through trusted people: elders, teachers and religious leaders." },
  { title: "Inclusive", text: "Women, men, children, transgender people and persons with disabilities all have a say. No one is left behind." },
  { title: "Replicable and low-cost", text: "Modest resources and trained local people, in a model other communities can copy." },
];

export const gateways = [
  {
    title: "Community-based institutions",
    text: "Community and village organisations, youth groups, welfare societies, mohallah committees, school management committees, local government representatives and women’s support groups. They help plan, run and monitor projects — and take them over when we leave.",
  },
  {
    title: "Key community individuals",
    text: "Elders, social activists, teachers, Lady Health Workers and Visitors, community midwives, artists and young volunteers who carry messages and mobilise their neighbours.",
  },
  {
    title: "Channels for information",
    text: "FM radio spots, robocalls, cable TV, posters, flyers, banners and stickers, alongside Facebook, WhatsApp and TikTok.",
  },
];

export const meStages = [
  { title: "Planning", text: "We assess needs, consult communities and other stakeholders, run baseline surveys and agree measurable indicators." },
  { title: "Design", text: "We build intervention models that fit the local context, with clear indicators, data collection methods and reporting — and gender inclusion built in from the start." },
  { title: "Implementation", text: "Field teams, community activists and partners deliver the work while ongoing monitoring flags problems early." },
  { title: "Evaluation", text: "Mid-term and final evaluations use both numbers and people’s own accounts, together with independent reviews and stakeholder feedback." },
  { title: "Learning & sharing", text: "We record what worked and what did not, and feed those lessons into new projects through review meetings and workshops." },
];

export const regions = [
  {
    name: "Punjab (20 Districts / Tehsils)",
    places: [
      "Rawalpindi",
      "Rajan Pur",
      "Jam Pur",
      "Rakhfazilpur",
      "Noorpur",
      "Manjowala",
      "Nowshera Gharbi",
      "Shahpur",
      "Muzaffar Garh",
      "Kot Addu",
      "Ghazi Ghat",
      "Mandi Bahauddin",
      "Layyah",
      "Jhelum",
      "Gujrat",
      "Palgan",
      "Shah Sadar Din",
      "Basti Malana",
      "D.G. Khan",
      "Attock",
      "Chakwal",
    ],
  },
  {
    name: "Khyber Pakhtunkhwa (19 Districts / Tehsils)",
    places: [
      "Peshawar",
      "Takal Payan",
      "Takal Bala",
      "Palosai",
      "Bannu",
      "Shamai Khel",
      "Nar Jafar Khan",
      "Ghoriwala",
      "Kala Khel Masti Khan",
      "Buner",
      "Charsadda",
      "Hangu",
      "Kohat",
      "Ali Zai",
      "Kohistan",
      "Mansehra",
      "Mardan",
      "Swat",
      "Orakzai Agency",
    ],
  },
  {
    name: "Sindh (1 District)",
    places: ["Tando Allah Yar", "Rain-affected districts"],
  },
  {
    name: "Balochistan (1 District)",
    places: ["Quetta"],
  },
  {
    name: "Federal & Special Areas",
    places: ["Islamabad (Head Office)", "Azad Jammu & Kashmir (Earthquake Relief)"],
  },
];

/* ---------- Media ---------- */

export const galleryPhotos: Photo[] = [
  { src: "n28.jpg", caption: "Oral polio drops at an EPI centre" },
  { src: "n5.jpg", caption: "Awareness walk, Mother & Child Health Week, February 2018" },
  { src: "pl41.jpg", caption: "Orientation session for traditional birth attendants" },
  { src: "n13.jpg", caption: "Monthly meeting of the District Nutrition Addressing Committee" },
  { src: "pl63.jpeg", caption: "Community disaster preparedness planning training" },
  { src: "pl33.jpg", caption: "Awareness session on child rights and protection" },
  { src: "pl11.jpeg", caption: "Global Handwashing Day, 15 October 2017" },
  { src: "pl67.jpeg", caption: "A community water filtration plant" },
  { src: "n1.jpg", caption: "District review workshop" },
  { src: "pl35.jpg", caption: "Interactive theatre training, Pakistan Safe Drinking Water and Hygiene Promotion Project" },
  { src: "pl31.jpg", caption: "PAIMAN awareness session on key health messages" },
  { src: "pl68.jpg", caption: "Women Development Programme session" },
  { src: "pl43.jpg", caption: "Traditional birth attendants at an orientation session" },
  { src: "pl62.jpeg", caption: "A community hand pump" },
  { src: "pl69.jpg", caption: "International Women’s Day" },
  { src: "pl60.jpg", caption: "Training religious teachers in hygiene promotion" },
  { src: "n3.jpg", caption: "District review workshop" },
  { src: "pl14.jpg", caption: "Pakistan Safe Drinking Water and Hygiene Promotion Project" },
  { src: "pl52.jpg", caption: "Training of community organisations" },
  { src: "pl36.jpg", caption: "A community session under a camp tent" },
  { src: "gal31.jpg", caption: "Nutrition awareness event" },
  { src: "pl66.jpg", caption: "Experience sharing workshop" },
  { src: "pl10.jpeg", caption: "Global Handwashing Day session" },
  { src: "gal15.jpg", caption: "Contents of a hygiene kit" },
  { src: "gal34.jpg", caption: "A relief tent" },
  { src: "pl45.jpg", caption: "Orientation session for traditional birth attendants" },
  { src: "pl38.jpg", caption: "A community session under a camp tent" },
  { src: "n9.jpg", caption: "A health awareness session" },
  { src: "pl70.jpg", caption: "Women Development Programme" },
  { src: "pl54.jpg", caption: "Training of community organisations" },
  { src: "pl7.jpg", caption: "Seminar" },
  { src: "pl39.jpg", caption: "Health awareness in a camp" },
];

export type SuppliedProgrammePhoto = {
  src: string;
  caption: string;
  category: string;
};

export const suppliedProgrammePhotos: SuppliedProgrammePhoto[] = [
  {
    src: "/images/attached-programmes/gallery/health/community-health-camp.jpg",
    caption: "Community members meet with a health worker at an outreach camp",
    category: "Health & immunization",
  },
  {
    src: "/images/attached-programmes/gallery/health/medical-camp-supplies.jpg",
    caption: "Medical supplies prepared for a community health camp",
    category: "Health & immunization",
  },
  {
    src: "/images/attached-programmes/gallery/health/hpv-awareness-session.jpg",
    caption: "Health educators lead an HPV awareness session",
    category: "Health & immunization",
  },
  {
    src: "/images/attached-programmes/gallery/health/hpv-community-session.jpg",
    caption: "Community members take part in an HPV information session",
    category: "Health & immunization",
  },
  {
    src: "/images/attached-programmes/gallery/wash/world-water-day.jpg",
    caption: "Community participants gather for a World Water Day event",
    category: "Water & hygiene",
  },
  {
    src: "/images/attached-programmes/gallery/wash/water-filtration.jpg",
    caption: "A technician checks water filtration equipment",
    category: "Water & hygiene",
  },
  {
    src: "/images/attached-programmes/gallery/women-empowerment/community-learning.jpg",
    caption: "Women participate in a community learning session",
    category: "Women & girls",
  },
  {
    src: "/images/attached-programmes/gallery/women-empowerment/community-meeting.jpg",
    caption: "Women gather for a community programme",
    category: "Women & girls",
  },
  {
    src: "/images/attached-programmes/gallery/education/community-session.jpg",
    caption: "Community members gather for an education session",
    category: "Education",
  },
  {
    src: "/images/attached-programmes/gallery/education/hygiene-learning.jpg",
    caption: "Women and children take part in a community learning session",
    category: "Education",
  },
  {
    src: "/images/attached-programmes/gallery/climate-resilience/community-preparedness.jpg",
    caption: "Community members gather for a resilience programme",
    category: "Climate resilience",
  },
  {
    src: "/images/attached-programmes/gallery/climate-resilience/resilience-session.jpg",
    caption: "Participants attend a community resilience session",
    category: "Climate resilience",
  },
  {
    src: "/images/attached-programmes/gallery/governance/community-governance-workshop.jpg",
    caption: "A participant receives recognition at a governance workshop",
    category: "Governance",
  },
  {
    src: "/images/attached-programmes/gallery/governance/community-workshop.jpg",
    caption: "Community members attend a governance and civic learning session",
    category: "Governance",
  },
  {
    src: "/images/attached-programmes/gallery/humanitarian/medical-relief-camp.jpg",
    caption: "A temporary medical camp serves families in the community",
    category: "Humanitarian response",
  },
  {
    src: "/images/attached-programmes/gallery/humanitarian/relief-community.jpg",
    caption: "Families gather at a humanitarian assistance site",
    category: "Humanitarian response",
  },
];

const used = new Set(["gal15.jpg", "gal31.jpg", "gal34.jpg"]);
export const archivePhotos: Photo[] = Array.from({ length: 40 }, (_, i) => `gal${i + 1}.jpg`)
  .filter((f) => !used.has(f))
  .map((src) => ({ src, caption: "From the Friends Foundation archive" }));

export const pressClippings: Photo[] = [
  { src: "pl21.jpg", caption: "Press coverage" },
  { src: "pl24.jpg", caption: "Press coverage" },
  { src: "pl27.jpg", caption: "Press coverage" },
];

/* ---------- Representative photography across Pakistan ----------
   Licensed documentary photographs shot exclusively across Pakistan (Punjab,
   Sindh, Balochistan & Khyber Pakhtunkhwa) via Pexels, always credited with
   the photographer and Pakistani location alongside FFPak's own field photos. */

export type AppealPhoto = {
  src: string;
  caption: string;
  category: string;
  credit: string;
  place: string;
};

const appeal = (file: string, caption: string, category: string, credit: string, place: string): AppealPhoto => ({
  src: `/images/appeal/${file}`,
  caption,
  category,
  credit,
  place,
});

export const appealPhotos: AppealPhoto[] = [
  appeal("pk-balochistan-child.jpg", "A young boy in a rural settlement in Balochistan looks straight at the camera", "Children", "Hanif Ali Baluch", "Balochistan, Pakistan"),
  appeal("pk-madyan-flood-child.jpg", "A child stands beside flood boulders and a wrecked vehicle after flash floods", "Flood & Relief", "Amjad ali", "Madyan, Swat, KP"),
  appeal("pk-gwadar-girl.jpg", "A young girl sits beside a weathered mud-plaster wall", "Children", "Hanif Ali Baluch", "Gwadar, Balochistan"),
  appeal("pk-kp-doorway-girls.jpg", "Two young sisters look out from the wooden doorway of their village home", "Girls & Women", "Amjad ali", "Khyber Pakhtunkhwa"),
  appeal("pk-swat-shepherd-boy.jpg", "A young shepherd boy rests on a rock with his grazing stick instead of sitting in school", "Children", "Amjad ali", "Swat Valley, KP"),
  appeal("pk-sindh-kandiaro-goat-herder.jpg", "A child herds goats along an earth canal bank in rural Sindh", "Water & Rural Life", "Saeed Ahmed Abbasi", "Kandiāro, Sindh"),
  appeal("pk-sindh-talhar-elder-farmer.jpg", "An elderly farmer harvests wheat by hand under the afternoon sun", "Livelihoods", "Hashim Khan", "Talhar, Badin, Sindh"),
  appeal("pk-punjab-jalalpur-boys.jpg", "Boys walk down an unpaved brick lane in South Punjab", "Children", "Kashif Shah", "Jalalpur Pirwala, Multan"),
  appeal("pk-punjab-jalalpur-children.jpg", "Village children play with pebbles outside brick homes in South Punjab", "Children", "Kashif Shah", "Jalalpur Pirwala, Punjab"),
  appeal("pk-village-girls-wall.jpg", "Young girls in traditional shalwar kameez gather beside a stone wall", "Girls & Women", "Imad Clicks", "Northern Pakistan"),
  appeal("pk-elder-and-children.jpg", "An elder sits outdoors with two young children in his community", "Community", "pierre matile", "Rural Pakistan"),
  appeal("pk-banjot-elder-children.jpg", "A grandfather sits with village children on a woven charpai", "Community", "Amjad ali", "Banjot, KP"),
  appeal("pk-kp-bishgram-children.jpg", "Children stand outside stone homes in a mountain village", "Children", "Amjad ali", "Bishgram, Swat, KP"),
  appeal("pk-faisalabad-children.jpg", "Two young children share a quiet moment on a street in Punjab", "Children", "Aa Dil", "Faisalabad, Punjab"),
  appeal("pk-lahore-candle-boy.jpg", "A boy holds a single candle inside a darkened home", "Children", "Aa Dil", "Lahore, Punjab"),
  appeal("pk-sindh-water-boy.jpg", "A boy wades through standing water in rural Sindh", "Water & Rural Life", "Saeed Ahmed Abbasi", "Kandiāro, Sindh"),
  appeal("pk-karachi-cobbler.jpg", "A street cobbler repairs shoes by hand on a roadside pavement", "Livelihoods", "Imtiaz Ahmed", "Karachi, Sindh"),
  appeal("pk-karachi-grain-workers.jpg", "Daily-wage labourers haul heavy grain sacks in a wholesale market", "Livelihoods", "Wasif Mujahid", "Lyari, Karachi"),
  appeal("pk-karachi-young-vendors.jpg", "Young street vendors sell potatoes from a cart to earn for their family", "Livelihoods", "Tahamie Farooqui", "Karachi, Sindh"),
  appeal("pk-swat-gabin-fodder.jpg", "A villager carries a heavy bundle of fodder across steep mountain terrain", "Water & Rural Life", "Amjad ali", "Gabin Jabba, KP"),
  appeal("pk-swat-manglor-village.jpg", "Children guide sheep along an unpaved lane between village walls", "Water & Rural Life", "Amjad ali", "Manglor, Swat, KP"),
  appeal("pk-kp-chamtalai-hujra.jpg", "Village elders gather in a traditional hujra consultation — how local decisions begin", "Community", "Amjad ali", "Chamtalai, KP"),
];

/* ---------- AKRSP-style Expanding Vertical-Tab Thematic Slider ---------- */

export type ThematicSlide = {
  slug: string;
  title: string;
  tabLabel: string;
  color: string;
  icon: "health" | "water" | "climate" | "women" | "education" | "governance" | "relief";
  image: string;
  stat: string;
  subtitle: string;
};

export const thematicSlides: ThematicSlide[] = [
  {
    slug: "integrated-health",
    title: "Reproductive, Maternal, Newborn & Child Health Care & Immunization",
    tabLabel: "Reproductive & Maternal Health",
    color: "#95BC69",
    icon: "health",
    image: "/images/attached-programmes/health/thematic.jpg",
    stat: "140,000 patients / year",
    subtitle: "Three self-sustaining family health centres in Rawalpindi slums plus 160 mobile medical camps across Pakistan.",
  },
  {
    slug: "wash",
    title: "WASH: Water, Sanitation & Hygiene",
    tabLabel: "WASH",
    color: "#DAA283",
    icon: "water",
    image: "/images/attached-programmes/wash/thematic.jpg",
    stat: "122,700 people reached",
    subtitle: "265 hand pumps, 10 rehabilitated WASA filtration plants, 86 water tanks and community water committees.",
  },
  {
    slug: "women-empowerment",
    title: "Women Empowerment",
    tabLabel: "Women Empowerment",
    color: "#CC9BD5",
    icon: "women",
    image: "/images/attached-programmes/women-empowerment/thematic.jpg",
    stat: "50,000 mothers & girls / yr",
    subtitle: "Women leading neighbourhood water committees, maternal nutrition care and income-generating skills for girls.",
  },
  {
    slug: "education",
    title: "Education",
    tabLabel: "Education",
    color: "#75B3CF",
    icon: "education",
    image: "/images/attached-programmes/education/thematic.jpg",
    stat: "Non-formal & school programmes",
    subtitle: "Second-chance schooling for out-of-school girls with UNICEF & FPAP, school hygiene lessons and child rights.",
  },
  {
    slug: "climate-resilience",
    title: "Climate Resilience",
    tabLabel: "Climate Resilience",
    color: "#66C6BD",
    icon: "climate",
    image: "/images/attached-programmes/climate-resilience/thematic.jpg",
    stat: "48 rescue & DRR trainings",
    subtitle: "Training local first responders in flood-prone districts of Muzaffargarh, Dera Ghazi Khan, Rajanpur and Sindh.",
  },
  {
    slug: "governance",
    title: "Governance",
    tabLabel: "Governance",
    color: "#EAD164",
    icon: "governance",
    image: "/images/attached-programmes/governance/thematic.jpg",
    stat: "Community-led committees",
    subtitle: "Village organisations, district nutrition committees and voter education across Punjab, KP and Islamabad.",
  },
  {
    slug: "humanitarian",
    title: "Emergency Response & Rehabilitation",
    tabLabel: "Emergency Response & Rehabilitation",
    color: "#A1A7DB",
    icon: "relief",
    image: "/images/attached-programmes/humanitarian/thematic.jpg",
    stat: "3,468 hygiene & 3,096 winter kits",
    subtitle: "Frontline medical camps, clean water, winter kits and recovery support for flood- and conflict-displaced families.",
  },
];

/* ---------- Alkhidmat-style Full-Bleed Auto-Changing Hero Banners (100% Pakistan) ---------- */

export type HeroSlide = {
  shortTab: string;
  eyebrow: string;
  headlineTop: string;
  headlineAccent: string;
  lead: string;
  image: string;
  imageAlt: string;
  focalClass: string;
  tintRgb: string;
  accentHex: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  defaultPurpose: string;
  credit: string;
};

export const heroSlides: HeroSlide[] = [
  {
    shortTab: "1. Health & Nutrition",
    eyebrow: "Thematic Area 01 · 140,000 Patients / Year",
    headlineTop: "INTEGRATED HEALTH &",
    headlineAccent: "MATERNAL NUTRITION",
    lead: "Three permanent family health centres in Rawalpindi slums caring for 50,000 mothers and 50,000 children annually, plus 160 mobile medical camps and EPI immunization across Pakistan.",
    image: "/images/attached-programmes/health/hero.jpg",
    imageAlt: "A doctor providing care to women and children during a community health camp in Pakistan",
    focalClass: "object-[58%_36%]",
    tintRgb: "11, 56, 114",
    accentHex: "#fbbf24",
    primaryLabel: "Support Health Centres",
    primaryHref: "/donate?purpose=Health+centres",
    secondaryLabel: "Integrated Health",
    secondaryHref: "/our-work/integrated-health",
    defaultPurpose: "Health centres",
    credit: "Rawalpindi & Multan, Pakistan",
  },
  {
    shortTab: "2. Clean Water (WASH)",
    eyebrow: "Thematic Area 02 · 122,700 Reached",
    headlineTop: "EVERY DROP BRINGS",
    headlineAccent: "LIFE & SAFE WATER",
    lead: "265 village hand pumps, 10 rehabilitated WASA filtration plants, and 86 community water storage tanks delivering clean water across Punjab, KP, Sindh & Balochistan.",
    image: "/images/attached-programmes/wash/hero.jpg",
    imageAlt: "A technician inspecting a community water filtration unit",
    focalClass: "object-[72%_30%]",
    tintRgb: "10, 74, 96",
    accentHex: "#fde047",
    primaryLabel: "Fund Clean Water",
    primaryHref: "/donate?purpose=Clean+water+and+sanitation",
    secondaryLabel: "Explore WASH Work",
    secondaryHref: "/our-work/wash",
    defaultPurpose: "Clean water and sanitation",
    credit: "Punjab & KP, Pakistan",
  },
  {
    shortTab: "3. Women Empowerment",
    eyebrow: "Thematic Area 03 · Women & Child Care",
    headlineTop: "EMPOWERING WOMEN,",
    headlineAccent: "TRANSFORMING HOMES",
    lead: "Women-led Water User Committees, vocational skill development, leadership trainings, and maternal nutrition advocacy across urban slums and rural communities.",
    image: "/images/attached-programmes/women-empowerment/hero.jpg",
    imageAlt: "Women taking part in a community learning and discussion session in Pakistan",
    focalClass: "object-[56%_28%]",
    tintRgb: "58, 28, 76",
    accentHex: "#f472b6",
    primaryLabel: "Empower Women",
    primaryHref: "/donate?purpose=Where+it+is+needed+most",
    secondaryLabel: "Women's Programme",
    secondaryHref: "/our-work/women-empowerment",
    defaultPurpose: "Where it is needed most",
    credit: "Khyber Pakhtunkhwa, Pakistan",
  },
  {
    shortTab: "4. Education",
    eyebrow: "Thematic Area 04 · UNICEF & FPAP Partner",
    headlineTop: "OPEN THE DOOR TO",
    headlineAccent: "A GIRL’S CLASSROOM",
    lead: "Non-formal education, life skills, school-based nutrition, and adolescent health sessions for out-of-school girls across underprivileged communities.",
    image: "/images/attached-programmes/education/hero.jpg",
    imageAlt: "Community members gathered for an education session in Pakistan",
    focalClass: "object-[50%_35%]",
    tintRgb: "24, 42, 74",
    accentHex: "#fbbf24",
    primaryLabel: "Support Girls' Education",
    primaryHref: "/donate?purpose=Girls%E2%80%99+education",
    secondaryLabel: "Education Programme",
    secondaryHref: "/our-work/education",
    defaultPurpose: "Girls’ education",
    credit: "Northern Pakistan",
  },
  {
    shortTab: "5. Climate Resilience",
    eyebrow: "Thematic Area 05 · Disaster Risk Reduction",
    headlineTop: "COMMUNITY-LED",
    headlineAccent: "CLIMATE RESILIENCE & DRR",
    lead: "Disaster preparedness training, firefighting, first aid rescue, and flood risk mitigation across vulnerable riverine belts in Muzaffargarh, DG Khan, Rajanpur, and Sindh.",
    image: "/images/attached-programmes/climate-resilience/hero.jpg",
    imageAlt: "Community members attending a resilience and preparedness gathering",
    focalClass: "object-[65%_42%]",
    tintRgb: "12, 74, 68",
    accentHex: "#34d399",
    primaryLabel: "Support Climate DRR",
    primaryHref: "/donate?purpose=Emergency+relief",
    secondaryLabel: "Climate Work",
    secondaryHref: "/our-work/climate-resilience",
    defaultPurpose: "Emergency relief",
    credit: "Swat & South Punjab, Pakistan",
  },
  {
    shortTab: "6. Governance",
    eyebrow: "Thematic Area 06 · Civic Accountability",
    headlineTop: "TRANSPARENCY &",
    headlineAccent: "CIVIL SOCIETY GOVERNANCE",
    lead: "Electoral support programmes with UNDP & ECP, presiding officer training, voter awareness, and district nutrition addressing committees across Pakistan.",
    image: "/images/attached-programmes/governance/hero.jpg",
    imageAlt: "Community representatives attend a governance and civic education workshop in Pakistan",
    focalClass: "object-[50%_50%]",
    tintRgb: "84, 62, 14",
    accentHex: "#fbbf24",
    primaryLabel: "Civic Empowerment",
    primaryHref: "/donate?purpose=Where+it+is+needed+most",
    secondaryLabel: "Governance Work",
    secondaryHref: "/our-work/governance",
    defaultPurpose: "Where it is needed most",
    credit: "Chamtalai, KP, Pakistan",
  },
  {
    shortTab: "7. Emergency Relief",
    eyebrow: "Thematic Area 07 · Rapid Crisis Response",
    headlineTop: "STAND WITH FAMILIES:",
    headlineAccent: "FLOOD & DISASTER RELIEF",
    lead: "Frontline mobile clinics, safe water, hygiene packs, and winter survival kits for families struck by monsoon floods and disasters in South Punjab, KP & Sindh.",
    image: "/images/attached-programmes/humanitarian/hero.jpg",
    imageAlt: "A community medical and relief camp serving families in Pakistan",
    focalClass: "object-[62%_35%]",
    tintRgb: "8, 48, 102",
    accentHex: "#facc15",
    primaryLabel: "Donate Emergency Relief",
    primaryHref: "/donate?purpose=Emergency+relief",
    secondaryLabel: "Humanitarian Response",
    secondaryHref: "/our-work/humanitarian",
    defaultPurpose: "Emergency relief",
    credit: "KP & South Punjab, Pakistan",
  },
];

/* ---------- AKRSP-style Feature Updates Carousel ---------- */

export const featureUpdates = [
  {
    image: "/images/appeal/pk-madyan-flood-child.jpg",
    tag: "Active Project 2025 · Emergency Relief",
    title: "Flood 2025: Emergency Medical Camps & Clean Water for Displaced Families",
    text: "In response to the 2025 flash floods in South Punjab, KP and Sindh, Friends Foundation deployed emergency mobile medical camps, distributed 3,468 hygiene kits, and repaired community hand pumps to prevent waterborne disease outbreaks.",
    href: "/our-work/humanitarian",
  },
  {
    image: "/images/appeal/pk-banjot-elder-children.jpg",
    tag: "Latest Project 2025 · Multan",
    title: "Pakistan's First-Ever HPV Vaccination Campaign 2025 with Gavi & FDI",
    text: "Working alongside the Federal Directorate for Immunization, Friends Foundation teams mobilized out-of-school girls aged 9–14 in District Multan, reversing over 300 refusal cases and protecting thousands of adolescent girls.",
    href: "/our-work/integrated-health",
  },
  {
    image: img("n28.jpg"),
    tag: "Health · Rawalpindi",
    title: "Oral polio & routine immunisation at our family health centres",
    text: "Alongside daily maternal and child consultations, our clinics run EPI vaccination sessions so children in low-income neighbourhoods never miss critical doses.",
    href: "/our-work/integrated-health",
  },
  {
    image: "/images/appeal/pk-punjab-jalalpur-boys.jpg",
    tag: "WASH · South Punjab & KP",
    title: "Solar-Powered Water Systems & Hand Pumps Rehabilitation (2024–2025)",
    text: "Local water management committees test water quality across 250 points and keep village hand pumps and filtration systems running year after year.",
    href: "/our-work/wash",
  },
  {
    image: img("n13.jpg"),
    tag: "Nutrition Governance",
    title: "District Nutrition Addressing Committee monthly review",
    text: "Government health officers and civil society partners coordinate stunting prevention, micronutrient supplementation and maternal nutrition referrals.",
    href: "/our-work/governance",
  },
  {
    image: img("pl11.jpeg"),
    tag: "School Hygiene · WASH",
    title: "Global Handwashing Day — teaching lifelong health habits in schools",
    text: "Practical handwashing and safe drinking water sessions with students, teachers and mothers across Rawalpindi and rural union councils.",
    href: "/our-work/education",
  },
  {
    image: "/images/appeal/pk-kp-doorway-girls.jpg",
    tag: "Women & Girls · Pakistan",
    title: "Non-formal schooling and vocational skills for adolescent girls",
    text: "Working with UNICEF, FPAP and Aurat Foundation to help out-of-school girls gain literacy, confidence and independent income.",
    href: "/our-work/women-empowerment",
  },
];

/* Sort our own programme photos into the same filter categories */
export function categoriseCaption(caption: string): string {
  const c = caption.toLowerCase();
  if (/water|hand pump|filtration|handwashing|hygiene|jerry|sanitation|latrine/.test(c)) return "Water & hygiene";
  if (/women|girls|international women/.test(c)) return "Women & girls";
  if (/tent|relief|camp|disaster|preparedness/.test(c)) return "Relief & emergencies";
  if (/workshop|training|committee|seminar|orientation|theatre|walk|event|day/.test(c)) return "Training & events";
  if (/child rights|education|school/.test(c)) return "Education & rights";
  return "Health & nutrition";
}

export const caseStudies = [
  "Basti Arisharki, Mouza Waan, UC Waan Patafi",
  "Basti Shahwala, Mouza Waan, UC Waan Patafi",
  "Basti Chak Kalanger, Mouza Waan, UC Waan Patafi",
  "Basti Kholar Mojohta, Mouza Waan, UC Waan Patafi",
  "Basti Noor Deen, Mouza Waan Patafi",
  "Basti Gamhon, Mouza Waan Patafi, UC Waan Patafi",
  "Basti Chandia, Mouza Chanwala, UC Ghazi Ghat",
  "Basti Ghat Gharbi, Mouza Bait Sohni, UC Ghazi Ghat",
];
