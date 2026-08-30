// Book recommendations per subject — the affiliate revenue stream.
//
// We never host or sell book files. Weak subjects link to REAL, widely used
// standard books on third-party stores (Amazon, Flipkart). Links are search
// links, so they keep working as editions change. When the owner registers
// for Amazon Associates / Flipkart Affiliate, setting the env vars
// AMAZON_AFFILIATE_TAG and FLIPKART_AFFILIATE_ID adds the commission
// tracking automatically — no code change needed.
//
// Every title listed is a long-standing standard reference for the exam; no
// invented books.

export type BookRec = { title: string; author: string };

export const SUBJECT_BOOKS: Record<string, BookRec[]> = {
  "Indian Polity": [
    { title: "Indian Polity", author: "M. Laxmikanth" },
    { title: "Introduction to the Constitution of India", author: "D. D. Basu" },
  ],
  "History & Culture": [
    { title: "A Brief History of Modern India", author: "Rajiv Ahir (Spectrum)" },
    { title: "Indian Art and Culture", author: "Nitin Singhania" },
  ],
  Geography: [
    { title: "Certificate Physical and Human Geography", author: "G. C. Leong" },
    { title: "Oxford Student Atlas for India", author: "Oxford University Press" },
  ],
  "Indian Economy": [
    { title: "Indian Economy", author: "Ramesh Singh" },
    { title: "Indian Economy Key Concepts", author: "Sankarganesh Karuppiah" },
  ],
  "Environment & Ecology": [
    { title: "Environment", author: "Shankar IAS Academy" },
  ],
  "Science & Technology": [
    { title: "Science and Technology in India", author: "Ravi P. Agrahari" },
  ],
  "International Relations & Misc": [
    { title: "International Relations", author: "Pavneet Singh" },
  ],
  Comprehension: [
    { title: "CSAT Paper 2 (General Studies Manual)", author: "TMH / McGraw Hill" },
    { title: "Word Power Made Easy", author: "Norman Lewis" },
  ],
  "Logical Reasoning & Analytical Ability": [
    { title: "A Modern Approach to Verbal & Non-Verbal Reasoning", author: "R. S. Aggarwal" },
    { title: "Analytical Reasoning", author: "M. K. Pandey" },
  ],
  "Basic Numeracy & Data Interpretation": [
    { title: "Quantitative Aptitude for Competitive Examinations", author: "R. S. Aggarwal" },
    { title: "Magical Book on Quicker Maths", author: "M. Tyra" },
  ],
  // Subjects from the govt-exam courses, reused wherever weakness reports appear.
  "Quantitative Aptitude": [
    { title: "Quantitative Aptitude for Competitive Examinations", author: "R. S. Aggarwal" },
  ],
  Reasoning: [
    { title: "A Modern Approach to Verbal & Non-Verbal Reasoning", author: "R. S. Aggarwal" },
  ],
  English: [
    { title: "Objective General English", author: "S. P. Bakshi" },
    { title: "Word Power Made Easy", author: "Norman Lewis" },
  ],
};

export function amazonLink(book: BookRec): string {
  const q = encodeURIComponent(`${book.title} ${book.author}`);
  const tag = process.env.AMAZON_AFFILIATE_TAG;
  return `https://www.amazon.in/s?k=${q}${tag ? `&tag=${encodeURIComponent(tag)}` : ""}`;
}

export function flipkartLink(book: BookRec): string {
  const q = encodeURIComponent(`${book.title} ${book.author}`);
  const affid = process.env.FLIPKART_AFFILIATE_ID;
  return `https://www.flipkart.com/search?q=${q}${affid ? `&affid=${encodeURIComponent(affid)}` : ""}`;
}

export function booksFor(subject: string): BookRec[] {
  return SUBJECT_BOOKS[subject] ?? [];
}
