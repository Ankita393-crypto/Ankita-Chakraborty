// Government exam directory — the knowledge base behind the /exams page.
//
// ACCURACY POLICY (owner's direction: "perfect to the T, no assumptions"):
// - Conducting bodies and official websites are stable, verifiable facts.
// - Exam patterns below were cross-checked against multiple current sources
//   in August 2026 and agree with the latest official notifications.
// - Patterns DO change between recruitment cycles, so every entry links to
//   the official website and the page tells learners to confirm there.
// - Nothing in this file is guessed; anything unverifiable was left out.

export type ExamEntry = {
  id: string;
  name: string;
  body: string; // conducting body (full name)
  officialSite: string;
  level: "central" | "banking" | "railways" | "state";
  eligibility: string;
  stages: string;
  pattern: string[]; // verified pattern facts for the first/screening stage
  subjects: string[]; // course slugs on Bodhi that prepare for it
  verifiedOn: string;
};

export const EXAM_DIRECTORY: ExamEntry[] = [
  {
    id: "ssc-cgl",
    name: "SSC CGL (Combined Graduate Level)",
    body: "Staff Selection Commission",
    officialSite: "https://ssc.gov.in",
    level: "central",
    eligibility: "Graduates (age limits vary by post, generally 18–32)",
    stages: "Tier 1 (qualifying) → Tier 2 (merit) → document verification",
    pattern: [
      "Tier 1: 100 questions, 200 marks, 60 minutes, computer-based",
      "Four sections of 25 questions / 50 marks each: General Intelligence & Reasoning, General Awareness, Quantitative Aptitude, English Comprehension",
      "15-minute sectional timer per section; each section closes automatically",
      "Negative marking: 0.50 marks per wrong answer",
      "Tier 1 is qualifying only; final merit comes from Tier 2",
    ],
    subjects: ["ssc-general-awareness", "quantitative-aptitude-govt-exams", "reasoning-govt-exams", "english-govt-exams"],
    verifiedOn: "August 2026",
  },
  {
    id: "ssc-chsl",
    name: "SSC CHSL (Combined Higher Secondary Level)",
    body: "Staff Selection Commission",
    officialSite: "https://ssc.gov.in",
    level: "central",
    eligibility: "Class 12 pass (generally ages 18–27)",
    stages: "Tier 1 (objective) → Tier 2 (including skill/typing test)",
    pattern: [
      "Tier 1: 100 questions, 200 marks, 60 minutes, computer-based",
      "Same four sections as CGL Tier 1: 25 questions / 50 marks each",
      "Negative marking: 0.50 marks per wrong answer",
    ],
    subjects: ["ssc-general-awareness", "quantitative-aptitude-govt-exams", "reasoning-govt-exams", "english-govt-exams"],
    verifiedOn: "August 2026",
  },
  {
    id: "upsc-cse",
    name: "UPSC Civil Services Examination (IAS/IPS/IFS and allied)",
    body: "Union Public Service Commission",
    officialSite: "https://upsc.gov.in",
    level: "central",
    eligibility: "Graduates, ages 21–32 (relaxations per rules), limited attempts",
    stages: "Prelims (qualifying) → Mains (written, merit) → Personality Test (interview)",
    pattern: [
      "Prelims Paper I (General Studies): 100 questions, 200 marks, 2 hours",
      "Prelims Paper II (CSAT): 80 questions, 200 marks, 2 hours — qualifying at 33%",
      "Negative marking: one-third of the question's marks per wrong answer",
      "Mains: nine descriptive papers; final merit from Mains + Interview",
    ],
    subjects: ["ssc-general-awareness", "quantitative-aptitude-govt-exams", "reasoning-govt-exams"],
    verifiedOn: "August 2026",
  },
  {
    id: "ibps-po",
    name: "IBPS PO (Probationary Officer, public sector banks)",
    body: "Institute of Banking Personnel Selection",
    officialSite: "https://www.ibps.in",
    level: "banking",
    eligibility: "Graduates, generally ages 20–30",
    stages: "Prelims (qualifying) → Mains + descriptive → Interview",
    pattern: [
      "Prelims: 100 questions, 100 marks, 60 minutes, computer-based",
      "English Language 30 questions / 30 marks; Quantitative Aptitude 35 questions / 30 marks; Reasoning Ability 35 questions / 40 marks",
      "Strict 20-minute timer per section; sectional and overall cut-offs apply",
      "Negative marking: 0.25 marks per wrong answer",
      "Prelims marks are not counted in final merit",
    ],
    subjects: ["quantitative-aptitude-govt-exams", "reasoning-govt-exams", "english-govt-exams"],
    verifiedOn: "August 2026",
  },
  {
    id: "ibps-clerk",
    name: "IBPS Clerk (Customer Service Associate)",
    body: "Institute of Banking Personnel Selection",
    officialSite: "https://www.ibps.in",
    level: "banking",
    eligibility: "Graduates, generally ages 20–28",
    stages: "Prelims (qualifying) → Mains (merit); no interview",
    pattern: [
      "Prelims: 100 questions, 100 marks, 60 minutes",
      "English 30 questions, Numerical Ability 35, Reasoning Ability 35 — 20 minutes per section",
      "Negative marking: 0.25 marks per wrong answer",
    ],
    subjects: ["quantitative-aptitude-govt-exams", "reasoning-govt-exams", "english-govt-exams"],
    verifiedOn: "August 2026",
  },
  {
    id: "sbi-po",
    name: "SBI PO (Probationary Officer)",
    body: "State Bank of India",
    officialSite: "https://sbi.co.in/web/careers",
    level: "banking",
    eligibility: "Graduates, generally ages 21–30",
    stages: "Prelims (qualifying) → Mains + descriptive → Psychometric/GD/Interview",
    pattern: [
      "Prelims: 100 questions, 100 marks, 60 minutes with 20-minute sectional timers (English, Quantitative Aptitude, Reasoning)",
      "Negative marking: 0.25 marks (one-fourth) per wrong answer",
      "Pattern details can change per notification — always confirm on the SBI careers site",
    ],
    subjects: ["quantitative-aptitude-govt-exams", "reasoning-govt-exams", "english-govt-exams"],
    verifiedOn: "August 2026",
  },
  {
    id: "rrb-ntpc",
    name: "RRB NTPC (Non-Technical Popular Categories, Indian Railways)",
    body: "Railway Recruitment Boards",
    officialSite: "https://www.rrbapply.gov.in",
    level: "railways",
    eligibility: "Class 12 pass or graduate depending on post, generally ages 18–33",
    stages: "CBT 1 (screening) → CBT 2 → skill test (for some posts) → document verification",
    pattern: [
      "CBT 1: 100 questions, 100 marks, 90 minutes",
      "General Awareness 40 questions; Mathematics 30; General Intelligence & Reasoning 30",
      "Negative marking: one-third mark per wrong answer",
    ],
    subjects: ["ssc-general-awareness", "quantitative-aptitude-govt-exams", "reasoning-govt-exams"],
    verifiedOn: "August 2026",
  },
  {
    id: "state-psc",
    name: "State PSC exams (WBPSC, UPPSC, BPSC, MPSC and others)",
    body: "Each state's Public Service Commission",
    officialSite: "https://wbpsc.gov.in",
    level: "state",
    eligibility: "Varies by state and post; typically graduates",
    stages: "Generally Prelims → Mains → Interview, modelled on the UPSC pattern",
    pattern: [
      "Patterns differ by state and change between cycles — no single pattern applies",
      "Core subjects are consistent: general studies/awareness, aptitude, reasoning, and language",
      "Always use the specific state commission's official website for the current notification",
    ],
    subjects: ["ssc-general-awareness", "quantitative-aptitude-govt-exams", "reasoning-govt-exams", "english-govt-exams"],
    verifiedOn: "August 2026",
  },
];
