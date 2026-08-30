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
  price_inr: number;
  exam_minutes: number;
  marks_correct: number;
  marks_wrong: number; // deducted per wrong answer
  questions: MockQuestion[];
};
