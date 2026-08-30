import type { SeedMock } from "../seed-types";
import { partA } from "./upsc-gs1-part-a";
import { partB } from "./upsc-gs1-part-b";
import { partC } from "./upsc-gs1-part-c";

// UPSC Civil Services Prelims — General Studies Paper I, full mock.
// Real pattern (verified Aug 2026): 100 questions, 200 marks, 2 hours,
// +2 per correct answer, one-third of the marks (2/3) deducted per wrong
// answer, unattempted questions score zero.
//
// Subject mix mirrors the paper's static-syllabus areas: Polity 18,
// History & Culture 18, Geography 12, Economy 15, Environment 18,
// Science & Tech 10, IR & Misc 9. (The real paper also carries heavy
// current-affairs weighting, which a static mock cannot reproduce —
// this is disclosed on the mock's page.)
export const upscGs1Mock: SeedMock = {
  slug: "upsc-prelims-gs1-mock-series",
  title: "UPSC Prelims GS Paper I — Mock Series (1000 papers)",
  description:
    "One payment, one thousand full-length simulations of UPSC Civil Services Prelims GS Paper I: 100 questions in 2 hours with real negative marking (+2 / −0.67). Every paper comes with a complete answer paper — every question explained — and a subject-wise weakness report with book recommendations.",
  price_inr: 249,
  exam_minutes: 120,
  marks_correct: 2,
  marks_wrong: 2 / 3,
  paper_count: 1000,
  paper_size: 100,
  // Real paper's static-syllabus mix (sums to 100).
  subject_quota: {
    "Indian Polity": 18,
    "History & Culture": 18,
    Geography: 12,
    "Indian Economy": 15,
    "Environment & Ecology": 18,
    "Science & Technology": 10,
    "International Relations & Misc": 9,
  },
  questions: [...partA, ...partB, ...partC],
};
