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
