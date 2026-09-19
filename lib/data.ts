// Static site data for mcu-website-next.
// Replaces the CMS API (services/api.ts) from the original Vite app.
// All content below mirrors the static fallbacks baked into the original
// frontend so the layout renders identically with no backend.

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  thumbnail?: string;
  createdAt: string;
  category?: { name: string };
  author?: { username: string; firstName?: string; lastName?: string };
}

export interface Category {
  id: number;
  name: string;
}

export const STATIC_CATEGORIES: Category[] = [
  { id: 1, name: "News" },
  { id: 2, name: "Events" },
  { id: 3, name: "Announcements" },
];

export const STATIC_ARTICLES: Article[] = [
  {
    id: 1,
    title: "Welcome to Myanmar Creative University",
    slug: "welcome-to-myanmar-creative-university",
    excerpt:
      "MCU began with charity migrant education on the Thai-Myanmar border in 2009 and has been serving for over 15 years.",
    content: `<p>Myanmar Creative University (MCU) is a non-profit higher educational institute established with the aim of enabling the youths to live prosperous lives with knowledge.</p><p>MCU was opened and established in 2016 at Yangon, building on charity migrant education on the Thai-Myanmar border since 2009.</p>`,
    thumbnail: "/assets/1.jpg",
    createdAt: "2026-01-15T00:00:00.000Z",
    category: { name: "News" },
    author: { username: "admin" },
  },
  {
    id: 2,
    title: "Admissions Open: Foundation Programme",
    slug: "admissions-open-foundation-programme",
    excerpt:
      "Applications are now open for the Academic English, Fundamental of Engineering and Business foundation courses.",
    content: `<p>MCU invites applications for its Foundation Programme including Academic English, Fundamental of Engineering, and Business and Marketing Management.</p><p>Foundation courses run for 6 months. Contact the admissions office to register.</p>`,
    thumbnail: "/assets/2.jpg",
    createdAt: "2026-02-10T00:00:00.000Z",
    category: { name: "Announcements" },
    author: { username: "admin" },
  },
  {
    id: 3,
    title: "MCU Partners with International Universities",
    slug: "mcu-partners-with-international-universities",
    excerpt:
      "MCU collaborates with partner universities in Thailand and Russia to offer bachelor, master and doctoral pathways.",
    content: `<p>MCU provides quality in teaching, research and learning in collaboration with partnership international universities around the world, including Tomsk State University, Thak­sin University, KMITL and Metha­rath University.</p>`,
    thumbnail: "/assets/3.jpg",
    createdAt: "2026-03-05T00:00:00.000Z",
    category: { name: "News" },
    author: { username: "admin" },
  },
  {
    id: 4,
    title: "Graduation Ceremony Highlights",
    slug: "graduation-ceremony-highlights",
    excerpt: "Celebrating the achievements of MCU graduates across diploma and degree programmes.",
    content: `<p>MCU proudly celebrates its graduates. Photos from recent graduation ceremonies are available in the Gallery.</p>`,
    thumbnail: "/assets/4.jpg",
    createdAt: "2026-04-20T00:00:00.000Z",
    category: { name: "Events" },
    author: { username: "admin" },
  },
  {
    id: 5,
    title: "BTEC International Programme Intake",
    slug: "btec-international-programme-intake",
    excerpt: "Level 3 and Level 5 BTEC pathways now enrolling for the new academic term.",
    content: `<p>The BTEC International Programme at MCU offers Level 3 (2 years) and Level 5 (18 months) pathways for students continuing to bachelor programmes.</p>`,
    thumbnail: "/assets/mcu_university.jpg",
    createdAt: "2026-05-12T00:00:00.000Z",
    category: { name: "Announcements" },
    author: { username: "admin" },
  },
  {
    id: 6,
    title: "Campus Life at MCU Yangon",
    slug: "campus-life-at-mcu-yangon",
    excerpt: "A glimpse into student life, workshops and activities at the Yangon campus.",
    content: `<p>Located at No. (44), 2nd Floor, Bishop Home, Pyay Road, Dagon Township, Yangon, MCU offers vocational and university education in collaboration with international universities.</p>`,
    thumbnail: "/assets/contact.jpg",
    createdAt: "2026-06-01T00:00:00.000Z",
    category: { name: "Events" },
    author: { username: "admin" },
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return STATIC_ARTICLES.find((a) => a.slug === slug);
}

/* ── Hero ─────────────────────────────────────────────────────────────── */
export const HERO_SLIDES = [
  { src: "/assets/1.jpg", title: "Myanmar Creative University", subtitle: "" },
  { src: "/assets/2.jpg", title: "Myanmar Creative University", subtitle: "" },
  { src: "/assets/3.jpg", title: "Myanmar Creative University", subtitle: "" },
  { src: "/assets/4.jpg", title: "Myanmar Creative University", subtitle: "" },
];

export const HERO_DEFAULT_TEXT =
  "The MCU began with charity migrant education on the Thai-Myanmar border in 2009 and has been serving for over 15 years. MCU was opened and established in 2016 at Yangon with the aim of enabling the youths to live prosperous lives with knowledge.";

/* ── About page ───────────────────────────────────────────────────────── */
export interface AboutSection {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  imagePosition: "left" | "right";
}

export const STATIC_ABOUT_SECTIONS: AboutSection[] = [
  {
    id: 1,
    title: "ABOUT MCU",
    content:
      "Myanmar Creative University (MCU) is a non-profit higher educational institute and Christian Mis­sion­ary College of MCMC for the youth ethnic occupational development towards the national development and peace. MCU was started as a migrant education center since 2009 and upgraded into a university located at No. (44), 2nd Floor, Bishop Home, Pyay Road, Dagon Township, Yangon, Myanmar. Since its inception, youth from undeveloped areas in border regions and migrant students have been able to learn vocational and university education in collaboration with international universities, carrying out international education opportunities and research activities.\n\nIn 2020, MCU Founder, staffs and students were involved in COVID-19 prevention and treatment activities as volunteers, and were awarded by the Myanmar government. In 2023, MCU won the Best Social Project Towards Education award by Asia Education Conclave.",
    imageUrl: "/assets/mcu_university.jpg",
    imagePosition: "right",
  },
  {
    id: 2,
    title: "ABOUT TSU",
    content:
      "Tomsk State University is one of the top public universities in World rankings and is located in Tomsk, Russia. The university, which opened in 1888, was the first university in the Asian part of Russia and, in practice, the first Russian university east of the Volga.\n\nTomsk State University has received many awards for achievements in the establishment and development of the nation's science, education, and culture. In 2010, TSU deservedly won 'national research' status.",
    imageUrl: "/assets/tomsk_university.jpg",
    imagePosition: "left",
  },
  {
    id: 3,
    title: "ABOUT KMITL",
    content:
      "King Mong­kut's Institute of Technology Lad­kra­bang is an institute established under the King Mong­kut's Institute of Technology Lad­kra­bang, King Mong­kut's Institute of Technology Thon­buri, and King Mong­kut's Institute of Technology North Bang­kok Act of 1985. As a legal entity, it is classified as a university affairs office, with the goals of studying, analysing, enriching, and providing services in technology, science, and technical education, including maintaining the art and culture of the country. On 8th March 2008, King Mong­kut's Institute of Technology Lad­kra­bang changed its status to an autonomous university, as announced in the Royal Thai Government Gazette, Book 125, Part 45, Series A, published on 7 March 2008.",
    imageUrl: "/assets/kmitl_university.jpg",
    imagePosition: "right",
  },
  {
    id: 4,
    title: "ABOUT THAKSIN UNIVERSITY",
    content:
      "Thak­sin University is a public university in Southern Thailand, located in Maung Song­khla District, Song­khla Province. Previously a branch campus of Sri­nakha­rin­wirot University, it grew and became a separate institution, established as an independent public university on 1 September 1996.\n\nThe university offers undergraduate, and doctoral degrees in Sciences, Medical Sciences, Social Sciences and Humanities. It has a special International Graduate Program offering research-based Ph.D. programs under the supervision of senior academics from international universities.",
    imageUrl: "/assets/thaksin_university.jpg",
    imagePosition: "left",
  },
  {
    id: 5,
    title: "ABOUT MRU",
    content:
      "Metha­rath University, formerly Shina­watra University, is a private international university in Thailand, established by Thak­sin Shina­watra and his colleagues. The campus was designed and developed by Soon­torn Boon­yati­karn in 1997. The Ministry of University Affairs granted the license for operation in 1999.\n\nMetha­rath University stands as a testament to the power of unity in diversity, where students and educators collaborate to create an inclusive and nurturing environment. You will find yourself surrounded by supportive mentors and fellow students, all eager to exchange ideas and experiences, enriching each other's understanding of the world.",
    imageUrl: "/assets/mru_university.jpg",
    imagePosition: "right",
  },
];

export const STATIC_MAP_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d954.9567585915742!2d96.14276586440654!3d16.785278840889756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c19378538d6eab%3A0x51304cce76bccbcb!2sMyanmar%20Creative%20University!5e0!3m2!1sen!2smm!4v1709389647251!5m2!1sen!2smm";

/* ── Home: Why MCU + partnerships + boards ────────────────────────────── */
export interface WhyItem {
  id: number;
  title: string;
  content: string;
}

export const WHY_MCU_ITEMS: WhyItem[] = [
  {
    id: 1,
    title: "Why MCU",
    content:
      "Myanmar Creative University, MCU is a learner centred, creative college, building intellectual inquiry and discovery into undergraduate, graduate and professional programs in a way that fosters knowledge and innovation, transforms wisdom into action.\n\nMCU provides quality in teaching, research and learning in collaborating with our partnership international universities around the world.",
  },
  {
    id: 2,
    title: "The Educational Purpose of MCU",
    content:
      "The purpose of education at MCU is not only to fulfil the knowledge and skills of our students. Our education will create humans with intelligence and heart, ready for any challenges — which is the goal of our practice education.",
  },
];

export const WHY_MCU_IMAGE = "/assets/mcu_university.jpg";

export interface Partnership {
  title: string;
  linkUrl: string;
  imageUrl?: string;
}

export const STATIC_PARTNERSHIPS: Partnership[] = [
  { title: "Myanmar Christ's Mission Co-operation Board", linkUrl: "", imageUrl: "/logo/mcmcb_logo.svg" },
  { title: "International Organization for Migration", linkUrl: "https://www.iom.int/", imageUrl: "/logo/iom_logo.svg" },
  { title: "Tomsk State University", linkUrl: "https://en.tsu.ru/", imageUrl: "/logo/tomsk_logo.svg" },
  { title: "Thak­sin University", linkUrl: "https://www.tsu.ac.th/en/", imageUrl: "/logo/thaksin_logo.svg" },
  { title: "King Mong­kut's Institute of Technology Lad­kra­bang", linkUrl: "https://www.kmitl.ac.th/en/", imageUrl: "/logo/kmitl.svg" },
  { title: "Rajamangala University of Technology, Krungthep", linkUrl: "https://www.rmutk.ac.th/", imageUrl: "/logo/rmutk.svg" },
  { title: "Metha­rath University", linkUrl: "https://www.metharath.com/", imageUrl: "/logo/mru_logo.svg" },
  { title: "Pathumthani University", linkUrl: "https://internationalcollege.ptu.ac.th/", imageUrl: "/logo/pathumthani_logo.svg" },
  { title: "Australian Prime Institute", linkUrl: "https://www.prime.edu.au/", imageUrl: "/logo/api_logo.svg" },
  { title: "Burmese Migrant Workers' Education Committee", linkUrl: "https://www.bmwec.org/", imageUrl: "/logo/bmwec_logo.svg" },
  { title: "K'Paw Htaw Health, Education & Development Foundation", linkUrl: "", imageUrl: "/logo/kph_logo.svg" },
  { title: "Health Education and Literacy Project", linkUrl: "", imageUrl: "/logo/help_logo.svg" },
];

export interface BoardMember {
  name: string;
  honor?: string;
  bishop?: string;
  position: string;
  chanc?: string;
  imageUrl?: string;
}

export interface BoardGroup {
  title: string;
  members: BoardMember[];
}

export const STATIC_BOARD_GROUPS: BoardGroup[] = [
  {
    title: "University's Council",
    members: [
      { imageUrl: "/avatars/council-01.svg", name: "Dr Somkiat Saithanoo", honor: "Prof:", chanc: "Honored Chancellor", position: "Myanmar Creative University" },
      { imageUrl: "/avatars/council-02.svg", name: "Stephen Than Myint Oo", bishop: "Archbishop", honor: "The Most Rev", position: "Church of the province of Myanmar", chanc: "Honor Chancellor" },
      { imageUrl: "/avatars/council-03.svg", name: "U Aung Thet Nyunt", honor: "Rev", position: "President of MCMC", chanc: "Honor Chancellor" },
      { imageUrl: "/avatars/council-04.svg", name: "Dr. Kyaw Myint", honor: "H.E Prof", position: "Retired Minister of MOH", chanc: "Honor Chancellor" },
      { imageUrl: "/avatars/council-05.svg", name: "U Nay Oak", honor: "Hon: Prof", position: "Chairperson, Private School Association, Myanmar", chanc: "Honor Chancellor" },
      { imageUrl: "/avatars/council-06.svg", name: "Daw Mya Kywe", honor: "Hon: Prof", position: "Retired Chief of Nursing Services", chanc: "Honor Chancellor" },
      { imageUrl: "/avatars/council-07.svg", name: "Dr. Aung Myint Oo", honor: "Prof", position: "Retired Professor and Head, YU", chanc: "Honor Chancellor" },
      { imageUrl: "/avatars/council-08.svg", name: "Daw Mi Tin Tin Soe Aye", honor: "Hon: Prof", position: "Retired Head, UMI", chanc: "Honor Chancellor" },
      { imageUrl: "/avatars/council-09.svg", name: "Dr. Min Thant", honor: "Hon: Prof", position: "Retired Principal, NYRDDC", chanc: "Honor Chancellor" },
    ],
  },
  {
    title: "Admin and Academic Board",
    members: [
      { imageUrl: "/avatars/admin-01.svg", name: "Dr. Saw Htay Myint", honor: "Prof:", position: "Founder and President" },
      { imageUrl: "/avatars/admin-02.svg", name: "Naw Hsa Eh Saw Poe", honor: "Honf: Prof:", position: "President of BMWEC", chanc: "Honor Chancellor" },
      { imageUrl: "/avatars/admin-03.svg", name: "Saw Win Thant Oo", position: "Director" },
      { imageUrl: "/avatars/admin-04.svg", name: "U Kaung Kyaw Linn", position: "Head of Admin" },
      { imageUrl: "/avatars/admin-05.svg", name: "Dr. Kyaw Swe", honor: "Prof", position: "Dean Faculty of Engineering" },
      { imageUrl: "/avatars/admin-06.svg", name: "Dr. Kyin Yee", honor: "Prof:", position: "Dean Faculty of arts, Humanity and Science" },
      { imageUrl: "/avatars/admin-07.svg", name: "Dr. Nyi Nyi Zaw", honor: "Prof:", position: "Department of Mechanical Engineering" },
      { imageUrl: "/avatars/admin-08.svg", name: "Daw Htet Htet Khaing", honor: "Assoc. Prof:", position: "Head Department of International Relation(IR)" },
    ],
  },
];

/* ── Gallery (uses bundled /assets images so the static export has no
   broken image requests; same group layout as the original) ───────────── */
export interface GalleryImage {
  imageUrl: string;
  caption?: string;
}

export interface GalleryGroup {
  id: number;
  name: string;
  assets: GalleryImage[];
}

export const STATIC_GALLERIES: GalleryGroup[] = [
  {
    id: 1,
    name: "Campus Activities",
    assets: [
      { imageUrl: "/assets/1.jpg" },
      { imageUrl: "/assets/2.jpg" },
      { imageUrl: "/assets/3.jpg" },
      { imageUrl: "/assets/4.jpg" },
      { imageUrl: "/assets/mcu_university.jpg" },
    ],
  },
  {
    id: 2,
    name: "Partner Universities",
    assets: [
      { imageUrl: "/assets/tomsk_university.jpg" },
      { imageUrl: "/assets/kmitl_university.jpg" },
      { imageUrl: "/assets/thaksin_university.jpg" },
      { imageUrl: "/assets/mru_university.jpg" },
    ],
  },
  {
    id: 3,
    name: "MCU at a Glance",
    assets: [
      { imageUrl: "/assets/contact.jpg" },
      { imageUrl: "/assets/programme-bg.jpg" },
      { imageUrl: "/assets/mcu_university.jpg" },
    ],
  },
];

/* ── Student registration levels ──────────────────────────────────────── */
export interface StudentLevel {
  name: string;
  majors: string[];
}

export const STATIC_STUDENT_LEVELS: StudentLevel[] = [
  { name: "Level I", majors: ["Engineering", "Business Focus"] },
  { name: "Level II", majors: ["Engineering", "Business Focus"] },
  { name: "Level III", majors: ["Civil", "Mechanical", "IE", "Business Administration"] },
  { name: "Level IV", majors: ["Civil", "Mechanical", "IE", "Business Administration"] },
  { name: "BE", majors: ["IE"] },
  { name: "BBA", majors: ["International Business Management"] },
];

/* ── Site chrome ──────────────────────────────────────────────────────── */
export const SITE_NAME = "Myanmar Creative University";
export const SITE_DESCRIPTION = "Myanmar Creative University – Official Website";
export const CONTACT_ADDRESS =
  "No. (44), 2nd Floor, Bishop Home, Pyay Road, Dagon Township, Yangon, Myanmar";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/article" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Programmes", href: "/programme/foundation/academic-english" },
  { label: "Blog", href: "/article" },
  { label: "Contact", href: "/contact" },
];
