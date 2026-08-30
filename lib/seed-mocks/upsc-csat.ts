import type { SeedMock } from "../seed-types";

// UPSC Prelims CSAT (GS Paper II) mock series — starter question bank.
// Real pattern (stable for years): 80 questions, 200 marks (2.5 each),
// 2 hours, one-third negative marking (−0.833 per wrong), QUALIFYING at 33%.
// Comprehension answers here depend ONLY on the passage text (CSAT style);
// passages are original Learnzy text, so there is no copyright issue.

const COMP = "Comprehension";
const REAS = "Logical Reasoning & Analytical Ability";
const NUM = "Basic Numeracy & Data Interpretation";

const PASSAGE_1 = `Read the passage: "India draws more groundwater every year than any other country, and most of it irrigates farms. When extraction outpaces natural recharge, water tables fall, wells run deeper and costlier, and small farmers suffer first. Studies of drip irrigation in water-scarce districts show that delivering water directly to plant roots can cut water use sharply without reducing yields. Yet adoption remains low, because the upfront equipment cost is high even where subsidies exist." — `;

const PASSAGE_2 = `Read the passage: "Digital payments have spread rapidly in India because they solved a real problem: small transactions needed exact change, and cash handling carried costs for shopkeepers. Once smartphone QR codes made accepting payment free and instant, even roadside vendors joined. However, the same convenience creates a new risk — users who cannot read warning messages carefully can be tricked into approving transfers they did not intend. Convenience and caution must grow together." — `;

export const upscCsatMock: SeedMock = {
  slug: "upsc-prelims-csat-mock-series",
  title: "UPSC Prelims CSAT (Paper II) — Mock Series",
  description:
    "Simulation of UPSC Prelims CSAT: comprehension, logical reasoning, and basic numeracy on the real pattern — 80 questions, 2 hours, +2.5 / −0.83 marking (qualifying paper: 33% needed in the real exam). One payment unlocks the full series; papers are composed from a growing verified question bank.",
  price_inr: 249,
  exam_minutes: 120,
  marks_correct: 2.5,
  marks_wrong: 2.5 / 3,
  paper_count: 1000,
  paper_size: 80,
  subject_quota: { [COMP]: 26, [REAS]: 30, [NUM]: 24 },
  questions: [
    // ---------------- Basic Numeracy (14) ----------------
    { q: "What is the HCF of 24 and 36?", options: ["6", "8", "12", "18"], correct: 2, subject: NUM, explanation: "24 = 2³×3, 36 = 2²×3²; common factors give 2²×3 = 12." },
    { q: "What is 15% of 240?", options: ["30", "32", "36", "40"], correct: 2, subject: NUM, explanation: "10% of 240 is 24 and 5% is 12; together 36." },
    { q: "₹75 is divided between two people in the ratio 2 : 3. The smaller share is:", options: ["₹25", "₹30", "₹35", "₹45"], correct: 1, subject: NUM, explanation: "Five equal parts of ₹15 each; the smaller share is 2 × 15 = ₹30." },
    { q: "The average of 12, 18, and 24 is:", options: ["16", "17", "18", "20"], correct: 2, subject: NUM, explanation: "Sum 54 divided by 3 gives 18 (also the middle value of an evenly spaced list)." },
    { q: "A 120 m long train travelling at 36 km/h passes a pole in:", options: ["10 seconds", "12 seconds", "15 seconds", "18 seconds"], correct: 1, subject: NUM, explanation: "36 km/h = 10 m/s; time = 120/10 = 12 seconds." },
    { q: "A finishes a work in 10 days and B in 15 days. Together they finish it in:", options: ["5 days", "6 days", "7 days", "8 days"], correct: 1, subject: NUM, explanation: "1/10 + 1/15 = 1/6 of the work per day, so 6 days." },
    { q: "Simple interest on ₹4,000 at 6% per annum for 2 years is:", options: ["₹440", "₹460", "₹480", "₹500"], correct: 2, subject: NUM, explanation: "SI = 4000 × 6 × 2 / 100 = ₹480." },
    { q: "The smallest three-digit number divisible by 7 is:", options: ["100", "102", "105", "112"], correct: 2, subject: NUM, explanation: "7 × 15 = 105; 7 × 14 = 98 has only two digits." },
    { q: "The probability of getting a head in a single toss of a fair coin is:", options: ["1/4", "1/3", "1/2", "1"], correct: 2, subject: NUM, explanation: "Two equally likely outcomes, one favourable: probability 1/2." },
    { q: "In how many different orders can 4 distinct books be arranged on a shelf?", options: ["12", "16", "24", "32"], correct: 2, subject: NUM, explanation: "4! = 4 × 3 × 2 × 1 = 24 arrangements." },
    { q: "An article bought for ₹250 is sold for ₹300. The profit percentage is:", options: ["15%", "18%", "20%", "25%"], correct: 2, subject: NUM, explanation: "Profit ₹50 on cost ₹250 = 50/250 = 20%." },
    { q: "If 5 pens cost ₹60, what do 8 such pens cost?", options: ["₹90", "₹92", "₹96", "₹100"], correct: 2, subject: NUM, explanation: "One pen costs ₹12, so 8 pens cost ₹96." },
    { q: "A 40-litre mixture has milk and water in the ratio 3 : 1. The quantity of milk is:", options: ["25 litres", "28 litres", "30 litres", "32 litres"], correct: 2, subject: NUM, explanation: "Milk is 3/4 of 40 litres = 30 litres." },
    { q: "Successive increases of 10% and 20% are equivalent to a single increase of:", options: ["30%", "31%", "32%", "33%"], correct: 2, subject: NUM, explanation: "1.10 × 1.20 = 1.32, a 32% overall increase — not 30%." },

    // ---------------- Logical Reasoning (14) ----------------
    { q: "What comes next in the series: 3, 6, 11, 18, 27, ?", options: ["36", "38", "40", "42"], correct: 1, subject: REAS, explanation: "Differences are 3, 5, 7, 9 — consecutive odd numbers — so the next difference is 11 and the answer is 38." },
    { q: "What comes next in the series: B, D, G, K, ?", options: ["N", "O", "P", "Q"], correct: 2, subject: REAS, explanation: "Steps of +2, +3, +4, +5: B(2), D(4), G(7), K(11), P(16)." },
    { q: "If CAT is coded as DBU, how is DOG coded?", options: ["EPH", "EPI", "FPH", "EQH"], correct: 0, subject: REAS, explanation: "Each letter moves one step forward: D→E, O→P, G→H." },
    { q: "A is the brother of B. B is the mother of C. How is A related to C?", options: ["Father", "Uncle", "Brother", "Grandfather"], correct: 1, subject: REAS, explanation: "A is the brother of C's mother, which makes A the maternal uncle of C." },
    { q: "A man walks 5 km east, turns left and walks 3 km, then turns left and walks 5 km. Where is he relative to his start?", options: ["3 km east", "3 km north", "3 km west", "At the start"], correct: 1, subject: REAS, explanation: "The two 5-km legs (east, then west) cancel; the middle leg after the first left turn from east heads north, leaving him 3 km north." },
    { q: "In a row, Sita is 12th from the left end and 8th from the right end. How many people are in the row?", options: ["18", "19", "20", "21"], correct: 1, subject: REAS, explanation: "Total = 12 + 8 − 1 = 19 (Sita is counted from both ends)." },
    { q: "Find the odd one out: circle, triangle, square, cube.", options: ["Circle", "Triangle", "Square", "Cube"], correct: 3, subject: REAS, explanation: "Circle, triangle, and square are plane (2-D) figures; a cube is a solid (3-D)." },
    { q: "Statements: All roses are flowers. Some flowers fade quickly. Does the conclusion 'Some roses fade quickly' follow?", options: ["Yes", "No", "Only in summer", "The statements contradict each other"], correct: 1, subject: REAS, explanation: "The quickly-fading flowers need not include any roses, so the conclusion does not necessarily follow." },
    { q: "What is the angle between the two hands of a clock at exactly 6:00?", options: ["90°", "120°", "150°", "180°"], correct: 3, subject: REAS, explanation: "At 6:00 the hour hand points at 6 and the minute hand at 12 — exactly opposite, 180°." },
    { q: "What comes next: 1, 1, 2, 3, 5, 8, ?", options: ["11", "12", "13", "15"], correct: 2, subject: REAS, explanation: "Each term is the sum of the previous two (Fibonacci): 5 + 8 = 13." },
    { q: "If MONDAY is coded as 123456 (M=1, O=2, N=3, D=4, A=5, Y=6), what is the code for DAY?", options: ["456", "465", "546", "645"], correct: 0, subject: REAS, explanation: "D=4, A=5, Y=6, so DAY = 456." },
    { q: "Among five people, D is the tallest and E is the shortest. A is taller than B, and B is taller than C. Who is exactly in the middle by height?", options: ["A", "B", "C", "Cannot be determined"], correct: 1, subject: REAS, explanation: "The order is D > A > B > C > E, so B is third of five — the middle." },
    { q: "On a standard die, opposite faces add up to 7. If 2 is on top, which number is at the bottom?", options: ["3", "4", "5", "6"], correct: 2, subject: REAS, explanation: "Opposite faces sum to 7, so the face opposite 2 is 5." },
    { q: "How many times does the letter S appear in the word STATISTICS?", options: ["2", "3", "4", "5"], correct: 1, subject: REAS, explanation: "S-T-A-T-I-S-T-I-C-S: the letter S occurs at positions 1, 6, and 10 — three times." },

    // ---------------- Comprehension (8): answers come ONLY from the passages ----------------
    { q: PASSAGE_1 + "What is the main concern of the passage?", options: ["India imports too much water", "Groundwater extraction exceeding recharge and its consequences", "Farmers refuse to irrigate their fields", "Urban water parks waste water"], correct: 1, subject: COMP, explanation: "The passage centres on over-extraction of groundwater, falling water tables, and a possible remedy." },
    { q: PASSAGE_1 + "According to the passage, when extraction outpaces recharge:", options: ["Yields immediately rise", "Water tables fall and wells become deeper and costlier", "Rainfall decreases", "Subsidies are withdrawn"], correct: 1, subject: COMP, explanation: "The passage states this directly: water tables fall, wells run deeper and costlier." },
    { q: PASSAGE_1 + "What does the passage say about drip irrigation?", options: ["It reduces yields", "It cuts water use sharply without reducing yields", "It is banned in water-scarce districts", "It increases recharge of aquifers"], correct: 1, subject: COMP, explanation: "Studies cited in the passage show sharp water savings with no yield loss." },
    { q: PASSAGE_1 + "Which of the following can be inferred as the main barrier to drip-irrigation adoption?", options: ["Farmers do not trust studies", "High upfront equipment cost", "Government prohibition", "Lack of smartphones"], correct: 1, subject: COMP, explanation: "The passage attributes low adoption to high upfront cost, 'even where subsidies exist'." },
    { q: PASSAGE_2 + "According to the passage, digital payments spread rapidly in India because they:", options: ["Were made legally compulsory", "Solved real problems of exact change and cash-handling costs", "Offered high interest rates", "Were free of all risk"], correct: 1, subject: COMP, explanation: "The passage names the exact-change problem and shopkeepers' cash-handling costs as the solved problems." },
    { q: PASSAGE_2 + "What role did QR codes play, as per the passage?", options: ["They made accepting payment free and instant", "They increased the cost of transactions", "They replaced bank accounts", "They eliminated all fraud"], correct: 0, subject: COMP, explanation: "The passage says smartphone QR codes made accepting payment free and instant, bringing in even roadside vendors." },
    { q: PASSAGE_2 + "The new risk described in the passage is that users may:", options: ["Lose network connectivity", "Be tricked into approving unintended transfers if they do not read warnings carefully", "Pay higher taxes", "Forget their passwords"], correct: 1, subject: COMP, explanation: "The passage warns that careless reading of warning messages can lead to approving unintended transfers." },
    { q: PASSAGE_2 + "The concluding sentence 'convenience and caution must grow together' most nearly means:", options: ["Convenience should be abandoned", "Safety awareness must keep pace with ease of use", "Caution makes payments slower and should be reduced", "Only cash is safe"], correct: 1, subject: COMP, explanation: "The author argues that as payments get easier, users' carefulness must increase alongside — not that convenience is bad." },
  ],
};
