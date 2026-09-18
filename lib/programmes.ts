export interface ProgrammeItem {
  name: string;
  opened: boolean;
  sub?: boolean;
  list: string[] | { name: string; list: string[] }[];
}

export interface SubProgramme {
  slug: string;
  title: string;
  university: string;
  items: ProgrammeItem[];
}

export interface ProgrammeData {
  title: string;
  slug: string;             // URL segment
  items: ProgrammeItem[];
  subProgrammes?: SubProgramme[];
}

export interface ProgrammeGroup {
  label: string;            // e.g. "Foundation Programme"
  prefix: string;           // e.g. "foundation"
  programmes: ProgrammeData[];
}

// ─── Foundation ──────────────────────────────────────────────────────────────
const foundation: ProgrammeGroup = {
  label: 'Foundation Programme',
  prefix: 'foundation',
  programmes: [
    {
      title: 'Academic English',
      slug: 'academic-english',
      items: [
        { name: 'Programme Duration', list: ['6 months'], opened: false },
        { name: 'Programme Details', list: [], opened: false },
        {
          name: 'Requirements',
          list: [
            'High School Completion Certificate',
            '3 copies of License Photos (35 mm × 45 mm)',
            'National ID (Copy)',
            'Family Household Certificate (Copy)',
            '<strong>FREE COURSE</strong>',
          ],
          opened: false,
        },
      ],
    },
    {
      title: 'Fundamental of Engineering',
      slug: 'fundamental-of-engineering',
      items: [
        { name: 'Programme Duration', list: ['6 months'], opened: false },
        {
          name: 'Programme Details',
          list: [
            'Academic English',
            'Engineering Science',
            'Engineering Mathematics',
            'Basic Civil Engineering',
            'Civil Workshop',
            'Basic Mechanical Engineering',
            'Electrical Workshop',
          ],
          opened: false,
        },
        {
          name: 'Requirements',
          list: [
            'High School Completion Certificate',
            '3 copies of License Photos (35 mm × 45 mm)',
            'National ID (Copy)',
            'Family Household Certificate (Copy)',
            '<strong>FREE COURSE</strong>',
          ],
          opened: false,
        },
      ],
    },
    {
      title: 'Business and Marketing Management',
      slug: 'business-and-marketing-management',
      items: [
        { name: 'Programme Duration', list: ['6 months'], opened: false },
        { name: 'Programme Details', list: [], opened: false },
        {
          name: 'Requirements',
          list: [
            'High School Completion Certificate',
            '3 copies of License Photos (35 mm × 45 mm)',
            'National ID (Copy)',
            'Family Household Certificate (Copy)',
            '<strong>FREE COURSE</strong>',
          ],
          opened: false,
        },
      ],
    },
  ],
};

// ─── BTEC ─────────────────────────────────────────────────────────────────────
const btec: ProgrammeGroup = {
  label: 'BTEC International Programme',
  prefix: 'btec',
  programmes: [
    {
      title: 'Level 3 Programme',
      slug: 'level-3',
      items: [
        { name: 'Duration', list: ['2 years'], opened: false },
        {
          name: 'Requirement',
          list: [
            'Minimum age of 14 years',
            'Matriculation or IGCSE O Level Completion Certificate',
          ],
          opened: false,
        },
      ],
    },
    {
      title: 'Level 5 Programme',
      slug: 'level-5',
      items: [
        { name: 'Duration', list: ['18 months'], opened: false },
        {
          name: 'Requirement',
          list: ['Matriculation or IGCSE A Level Passed Certificate'],
          opened: false,
        },
      ],
    },
  ],
};

// ─── Diploma ──────────────────────────────────────────────────────────────────
const diplomaReqs: ProgrammeItem = {
  name: 'Requirements',
  list: [
    'High School Passed Certificate',
    'National ID (Copy)',
    'Family Household Certificate (Copy)',
    '4 copies of License Photo',
  ],
  opened: false,
};

const diploma: ProgrammeGroup = {
  label: 'Diploma Programme',
  prefix: 'diploma',
  programmes: [
    {
      title: 'Diploma in Civil Engineering',
      slug: 'dip-in-civil-engineering',
      items: [
        { name: 'Duration', list: ['2 years (4 semesters)'], opened: false },
        {
          name: 'Programme Details',
          sub: true,
          list: [
            { name: 'Semester – 1', list: ['English', 'Engineering Mathematics', 'Engineering Science', 'Building Drawing', 'Building Construction', 'Mechanics of Materials', 'Surveying', 'Building Services', 'Workshop Practices'] },
            { name: 'Semester – 2', list: ['English', 'Engineering Mathematics', 'Engineering Science', 'Building Drawing', 'Building Construction', 'Mechanics of Materials', 'Building Services', 'Estimating and Specification of Buildings', 'Workshop Practices'] },
            { name: 'Semester – 3', list: ['English', 'Engineering Mathematics', 'Building Drawing (Auto CAD)', 'Estimating and Specification of Bridges', 'Structure', 'Concrete Structures', 'Timber Structures', 'Transportation Engineering', 'Workshop Practices'] },
            { name: 'Semester – 4', list: ['English', 'Engineering Mathematics', 'Building Drawing (Revit)', 'Structures', 'Steel Structures', 'Transportation Engineering', 'Fluid Mechanics', 'Building Projects', 'Workshop Practices'] },
          ],
          opened: false,
        },
        diplomaReqs,
      ],
    },
    {
      title: 'Diploma in Mechanical Engineering',
      slug: 'dip-in-mechanical-engineering',
      items: [
        { name: 'Duration', list: ['2 years (4 semesters)'], opened: false },
        { name: 'Programme Details', list: [], opened: false },
        diplomaReqs,
      ],
    },
    {
      title: 'Diploma in Management',
      slug: 'dip-in-management',
      items: [
        { name: 'Duration', list: ['2 years (4 semesters)'], opened: false },
        {
          name: 'Programme Details',
          sub: true,
          list: [
            { name: 'Semester – 1', list: ['Business English', 'Business Mathematics', 'Introduction to Management', 'Fundamentals of Statistics I', 'Business Organization'] },
            { name: 'Semester – 2', list: ['Business English', 'New Economics Geography', 'Introduction to Management', 'Fundamental of Statistics II', 'Business Accounting'] },
            { name: 'Semester – 3', list: ['Business English', 'General Management', 'Financial Accounting I', 'Decision Sciences', 'Principle of Marketing', 'Life Development Skills'] },
            { name: 'Semester – 4', list: ['Business English', 'Financial Accounting I', 'Managerial Accounting I', 'Production and Operations Management', 'Fundamentals of HR Management', 'Introduction to Public Administration'] },
          ],
          opened: false,
        },
        diplomaReqs,
      ],
    },
  ],
};

// ─── Bachelor ─────────────────────────────────────────────────────────────────
const bachelorReqs: ProgrammeItem = {
  name: 'Requirement',
  list: [
    'BTEC level-3 Diploma (or) MCU Foundation Certificate (or) GED (or) Grade 12 Passed (or) IGCSE-O level',
    'Three license photos with blue background',
    'NRC (copy)',
    'Family Household Certificate (copy)',
    'Matriculation Passed Certificate (or) Equivalent level Certificate for year 1 and 2',
    'MCU Diploma Holder (or) Government University 2nd Degree Holder',
    'English language Proficiency IELTS 5.0 for year 3 and 4',
  ],
  opened: false,
};

const bachelor: ProgrammeGroup = {
  label: 'Bachelor Programme',
  prefix: 'bachelor',
  programmes: [
    {
      title: 'Bachelor of Engineering in Civil',
      slug: 'ba-of-engineering-in-civil',
      items: [
        { name: 'KMITL School of Engineering', list: ['2 years at MCU + 2 years at KMITL programme', '4 years at KMITL University'], opened: false },
        { name: 'Duration', list: ['24 months for year 1 & 2, 24 months for year 3 & 4', 'Monday to Friday'], opened: false },
        bachelorReqs,
      ],
    },
    {
      title: 'Bachelor of Engineering in Mechanical',
      slug: 'ba-of-engineering-in-mechanical',
      items: [
        { name: 'Thaksin University Thailand', list: ['2 years at MCU + 1 year at Thaksin University', '3 years at Thaksin University Thailand'], opened: false },
        { name: 'Duration', list: ['24 months for year 1 & 2, 12 months for year 3', 'Monday to Saturday'], opened: false },
        bachelorReqs,
      ],
    },
    {
      title: 'Bachelor of Management',
      slug: 'ba-of-management',
      items: [
        { name: 'Thaksin University Thailand', list: ['3 years at MCU + 1 year at Thaksin University', '4 years at Thaksin University Thailand'], opened: false },
        { name: 'Duration', list: ['36 months for year 1, 2 & 3, 12 months for year 4', 'Monday to Friday'], opened: false },
        bachelorReqs,
      ],
    },
    {
      title: 'Bachelor of Business Administration',
      slug: 'ba-of-business-administration',
      items: [
        { name: 'Durakij Pundit University – DPU Thailand', list: ['Awarded from University of Sunderland, UK', 'Final Year at DPU (1 year)'], opened: false },
        {
          name: 'Requirement',
          list: [
            'Any 3rd year graduate from any University or 3rd year university equivalent Diploma holder (BTEC level 5 etc.)',
            'Three license photos with blue background color',
            'Passport',
            'National ID (Copy)',
            'Family Household Certificate (Copy)',
            '4 copies of Passport Photo (51 mm × 51 mm)',
            'Transcript Letter',
          ],
          opened: false,
        },
      ],
    },
  ],
};

// ─── Master ───────────────────────────────────────────────────────────────────
const masterReqs: ProgrammeItem = {
  name: 'Requirements',
  list: [
    'Copy of passport',
    'Copy of high school certificate',
    'Certified translation of the diploma and the passport',
    'Completed application form',
    'Other diplomas and certificates proving achievements (if any)',
    'Motivation letter',
    'Entrance exams / Interview',
  ],
  opened: false,
};

const master: ProgrammeGroup = {
  label: 'Master Programme',
  prefix: 'master',
  programmes: [
    {
      title: 'Master of Business Administration (MBA)',
      slug: 'mstr-of-business-administration',
      items: [masterReqs],
      subProgrammes: [
        {
          slug: 'king-monguk',
          title: "King Mongkut's Institute of Technology – KMIT Business School, Thailand",
          university: 'KMIT Business School',
          items: [masterReqs],
        },
        {
          slug: 'durakij-pundit',
          title: 'Durakij Pundit University, Thailand',
          university: 'Durakij Pundit University',
          items: [masterReqs],
        },
        {
          slug: 'lampang-rajabhat',
          title: 'Lampang Rajabhat University, Thailand',
          university: 'Lampang Rajabhat University',
          items: [masterReqs],
        },
      ],
    },
    {
      title: 'Master of Management',
      slug: 'mstr-of-management',
      items: [masterReqs],
    },
    {
      title: 'Master of Public Administration (MPA)',
      slug: 'mstr-of-public-administration',
      items: [masterReqs],
      subProgrammes: [
        {
          slug: 'thaksin',
          title: 'Thaksin University, Thailand',
          university: 'Thaksin University',
          items: [masterReqs],
        },
        {
          slug: 'lampang-rajabhat',
          title: 'Lampang Rajabhat University, Thailand',
          university: 'Lampang Rajabhat University',
          items: [masterReqs],
        },
      ],
    },
    {
      title: 'KMITL School of Engineering (Master)',
      slug: 'kmitl-school',
      items: [masterReqs],
    },
    {
      title: 'Tomsk State University (Master)',
      slug: 'tomsk-state',
      items: [masterReqs],
    },
  ],
};

// ─── Doctor ───────────────────────────────────────────────────────────────────
const doctor: ProgrammeGroup = {
  label: 'Doctoral Programme',
  prefix: 'doctor',
  programmes: [
    {
      title: 'Doctor of Public Administration',
      slug: 'dr-of-public-administration',
      items: [masterReqs],
      subProgrammes: [
        {
          slug: 'tomsk-state',
          title: 'Tomsk State University, Russia',
          university: 'Tomsk State University',
          items: [masterReqs],
        },
        {
          slug: 'kmitl-school',
          title: 'KMITL School of Engineering, Thailand',
          university: 'KMITL School of Engineering',
          items: [masterReqs],
        },
        {
          slug: 'lampang-rajabhat',
          title: 'Lampang Rajabhat University, Thailand',
          university: 'Lampang Rajabhat University',
          items: [masterReqs],
        },
      ],
    },
    {
      title: 'Doctor of Business Administration',
      slug: 'dr-of-business-administration',
      items: [masterReqs],
      subProgrammes: [
        {
          slug: 'durakij-pundit',
          title: 'Durakij Pundit University, Thailand',
          university: 'Durakij Pundit University',
          items: [masterReqs],
        },
        {
          slug: 'lampang-rajabhat',
          title: 'Lampang Rajabhat University, Thailand',
          university: 'Lampang Rajabhat University',
          items: [masterReqs],
        },
        {
          slug: 'kmitl-school',
          title: 'KMITL Business School, Thailand',
          university: 'KMITL Business School',
          items: [masterReqs],
        },
        {
          slug: 'tomsk-state',
          title: 'Tomsk State University, Russia',
          university: 'Tomsk State University',
          items: [masterReqs],
        },
      ],
    },
    {
      title: 'KMITL School of Engineering (Doctoral)',
      slug: 'kmitl-school',
      items: [masterReqs],
    },
    {
      title: 'Tomsk State University (Doctoral)',
      slug: 'tomsk-state',
      items: [masterReqs],
    },
  ],
};

// ─── All groups export ────────────────────────────────────────────────────────
export const ALL_PROGRAMME_GROUPS: ProgrammeGroup[] = [
  foundation,
  btec,
  diploma,
  bachelor,
  master,
  doctor,
];

export function findProgramme(prefix: string, slug: string): ProgrammeData | undefined {
  const group = ALL_PROGRAMME_GROUPS.find(g => g.prefix === prefix);
  return group?.programmes.find(p => p.slug === slug);
}

export function findSubProgramme(
  prefix: string,
  slug: string,
  subSlug: string,
): SubProgramme | undefined {
  const programme = findProgramme(prefix, slug);
  return programme?.subProgrammes?.find(s => s.slug === subSlug);
}
