export type SeedCourse = {
  slug: string;
  title: string;
  description: string;
  category: "general" | "certprep";
  tier: number;
  price_inr: number;
  lessons: { title: string; content: string }[];
  questions: { q: string; options: string[]; correct: number }[];
};

export type MockQuestion = {
  q: string;
  options: string[];
  correct: number;
  subject: string;
  explanation: string;
};

export type SeedMock = {
  slug: string;
  title: string;
  description: string;
  price_inr: number; // one-time price unlocking the whole series
  exam_minutes: number;
  marks_correct: number;
  marks_wrong: number; // deducted per wrong answer
  paper_count: number; // papers in the series, e.g. 1000
  paper_size: number; // questions per paper, e.g. 100
  subject_quota: Record<string, number>; // real paper's per-subject question mix
  questions: MockQuestion[]; // the question BANK papers are composed from
};
