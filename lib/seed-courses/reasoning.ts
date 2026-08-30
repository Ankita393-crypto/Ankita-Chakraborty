import type { SeedCourse } from "../seed-types";

// General Intelligence & Reasoning for government exams.
// Every example and question has been worked through and checked by hand.
export const reasoningGovtExams: SeedCourse = {
  slug: "reasoning-govt-exams",
  title: "Reasoning for Govt Exams",
  description:
    "General Intelligence and Reasoning for SSC, banking, and railway exams: analogies, series, coding–decoding, blood relations, directions, ranking, syllogisms, and non-verbal reasoning, with solved exam-style examples.",
  category: "certprep",
  tier: 4,
  price_inr: 499,
  lessons: [
    {
      title: "Analogy and Classification",
      content: `Analogy questions ask you to find the same relationship in a new pair: "Doctor is to Hospital as Teacher is to ___" — a doctor works in a hospital, a teacher works in a school, so the answer is School. The discipline is to name the relationship in words BEFORE looking at the options: worker–workplace, tool–user, animal–young, country–capital, unit–quantity, cause–effect, part–whole. If you can state the link precisely, wrong options eliminate themselves.

Number analogies use arithmetic relationships: 8 : 64 :: 12 : 144 (each number maps to its square); 5 : 30 :: 7 : 56 (n maps to n² + n, i.e. n × (n + 1)); 3 : 27 :: 4 : 64 (cubes). Always test your rule on BOTH given numbers before applying it — many wrong answers come from a rule that fits only the first pair by coincidence.

Classification ("odd one out") reverses the game: three items share a property, one does not. Among Rose, Lotus, Marigold, and Mango, the first three are flowers and Mango is a fruit. Among 121, 144, 169, and 190, the first three are perfect squares (11², 12², 13²) and 190 is not. In letter groups, check alphabetical gaps: in the group ACE, BDF, CEG, each letter steps by 2, so any triplet breaking that gap pattern is the odd one.

SSC asks several analogy and classification questions in every paper, and they should take under 30 seconds each. Build speed by memorising squares to 30, cubes to 15, and the alphabet with positions (A=1 … Z=26), including reverse positions (Z=1 … A=26). Those three tables power half of the reasoning section.`,
    },
    {
      title: "Number and Letter Series",
      content: `A series question gives a sequence and asks for the next term. Attack number series in a fixed order: (1) differences — 2, 6, 12, 20, 30, ? has differences 4, 6, 8, 10, so the next difference is 12 and the answer is 42; (2) ratios — 5, 10, 20, 40, ? doubles each time, giving 80; (3) squares/cubes — 1, 4, 9, 16, 25 are squares; 2, 5, 10, 17, 26 are squares plus one; (4) alternating or mixed series where odd-position and even-position terms follow separate rules.

Second-order patterns hide inside first differences. In 3, 4, 7, 12, 19, 28 the differences are 1, 3, 5, 7, 9 — consecutive odd numbers. In 2, 3, 5, 8, 13, 21 each term is the sum of the previous two (the Fibonacci rule). If differences and ratios both fail, test sums of neighbours, products, and digit patterns before guessing.

Letter series run on alphabet positions. A, C, F, J, O, ? steps by +2, +3, +4, +5, so the next step is +6: O(15) + 6 = U(21). Series like AZ, BY, CX pair the nth letter from the start with the nth from the end (opposite letters). For skip patterns such as B, E, H, K (step +3), write positions 2, 5, 8, 11 and the rule is obvious. Keep a margin column with A=1 to Z=26 written out during practice until you no longer need it.

Mixed alphanumeric series (K2, M4, O8, Q16 — letters +2, numbers ×2) simply run two series in parallel; solve each strand separately. Speed target: 20–40 seconds per series question. If a pattern refuses to appear within that time, mark the question for review and move on — series questions are plentiful but never worth two minutes.`,
    },
    {
      title: "Coding and Decoding",
      content: `Coding questions state that one word is written as another and ask you to encode a new word by the same rule. The most common rule is a constant alphabet shift. If DELHI is coded as CDKGH, compare letter by letter: D→C, E→D, L→K, H→G, I→H — every letter moves one step back. Apply the same shift to MUMBAI: M→L, U→T, M→L, B→A, A→Z (the alphabet wraps around), I→H, giving LTLAZH.

Number-coding rules usually add letter positions. If PEN is coded as 35, test the position sum: P(16) + E(5) + N(14) = 35 — confirmed. Then INK is I(9) + N(14) + K(11) = 34. Other frequent rules: multiply the sum by the number of letters, use reverse positions (Z=1), or code each letter as its own position with digits joined. Always verify your rule against every letter of the given word before using it.

Letter-rearrangement codes reverse the word, swap adjacent pairs, or exchange halves. Substitution codes replace whole words: if "sky is blue" is coded as "pa ro ta" and "blue means calm" as "ta mi su", the common word blue must match the common code ta. Solving these is pure intersection — match the repeated word across sentences to the repeated code.

Conditional symbol questions redefine operators: if '+' means '×' and '×' means '+', then 6 + 4 × 2 becomes 6 × 4 + 2 = 26. Substitute mechanically and then apply the normal order of operations (brackets, then division/multiplication, then addition/subtraction) to the rewritten expression. Never apply the order of operations to the original symbols — that is precisely the trap being set.`,
    },
    {
      title: "Blood Relations",
      content: `Blood-relation questions describe family links in deliberately tangled language and ask for the relationship between two people. The reliable method is to translate the sentence from the inside out. Take the classic: a man points to a photograph and says, "She is the daughter of my mother's only son." Work inward: "my mother's only son" — since the speaker is a man and the son is the ONLY one, that son is the speaker himself. So the girl is the speaker's own daughter.

Fix the vocabulary first, because every question depends on it: your mother's or father's brother is your uncle (maternal uncle specifically for the mother's side in Indian usage); their sister is your aunt; your brother's or sister's son is your nephew and daughter is your niece; your spouse's siblings and your siblings' spouses are brothers- and sisters-in-law; "only son of my grandfather" is my father (if the grandfather has one son); cousins are children of uncles and aunts.

For longer chains, draw a quick family tree with three symbol conventions: a horizontal double line for marriage, a vertical line for parent–child, and initials with (m)/(f) for gender. Note that gender is never assumed — "P is the child of Q" does not reveal P's gender, and many questions are answerable only up to "niece or nephew" unless a pronoun settles it. If an option asserts a gender the data cannot support, it is wrong.

Coded family questions (common in banking exams) use symbols: "A # B means A is the father of B; A $ B means A is the sister of B", then ask what P # Q $ R implies. Decode symbol by symbol into the tree. Accuracy here is typically high for prepared candidates, so treat blood relations as guaranteed marks: two minutes of careful tree-drawing beats thirty seconds of mental juggling that collapses halfway.`,
    },
    {
      title: "Direction Sense and Ranking",
      content: `Direction questions track a walker through turns and ask the final direction or the straight-line distance home. Always draw the compass first: North up, East right. A person walks 3 km north, turns right, and walks 4 km (now heading east). The displacement from the start is the hypotenuse of a right triangle with legs 3 and 4, so by the Pythagorean theorem the person is √(3² + 4²) = 5 km from the start. Memorise the common triples: 3-4-5, 6-8-10, 5-12-13, 8-15-17.

Turning rules: from any facing, "turn right" is 90° clockwise and "turn left" is 90° anticlockwise; "turn back" or "about turn" is 180°. Facing north, right leads east; facing east, right leads south; and so on around the compass. Shadow questions use sunrise geometry: in the morning the sun is in the east so shadows fall west; in the evening shadows fall east. At noon shadows point north in India (the sun is to the south for locations north of the Tropic of Cancer for most of the year).

Ranking questions place a person in a line or class. The master formula: total = (rank from top) + (rank from bottom) − 1. If Ram is 10th from the top and 15th from the bottom, the class has 10 + 15 − 1 = 24 students. The −1 corrects for Ram being counted twice. Variants ask for people between two positions: between the 10th and 15th students from the same end sit 15 − 10 − 1 = 4 people.

Simple seating arrangements combine both skills. In a row of five friends, if C sits exactly in the middle, C is 3rd from either end and exactly 2 people sit on each side. For circular arrangements, fix one person's seat first and place the others relative to that anchor; note that "left" and "right" in a circle depend on whether people face the centre (clockwise = left) or face outward (clockwise = right). Read the facing direction before placing anyone.`,
    },
    {
      title: "Syllogisms and Logical Venn Diagrams",
      content: `A syllogism gives statements ("All cats are animals. Some animals are dogs.") and asks which conclusions follow. The golden rule: a conclusion follows only if it MUST be true in every possible diagram consistent with the statements, not merely in one convenient drawing. From the two statements above, "Some cats are dogs" does NOT follow — the animals that are dogs may be entirely different animals from the cats. Draw the circles: cats inside animals, dogs overlapping animals; nothing forces cats and dogs to touch.

Learn the four statement types and what they permit. "All A are B": circle A inside circle B (possibly identical). "No A is B": disjoint circles. "Some A are B": at least one common element — and importantly it does NOT imply that some A are not B. "Some A are not B": at least one A outside B — and it does not imply that some A are B. Treating "some" as "some but not all" is the single most common error in this topic.

The practical method under time pressure: draw the MINIMAL diagram that satisfies the statements, test each conclusion, then actively try to REDRAW the diagram to break any conclusion that passed. If a conclusion survives every legal redrawing, it follows. For "either/or" answer patterns: when two conclusions are individually not certain but together cover all possibilities (for example "Some A are B" and "No A is B"), the correct answer is "either conclusion I or conclusion II follows".

Logical Venn diagram questions ask which picture best represents three classes. Standard cases: Doctors, Men, Fathers — three mutually overlapping circles (a person can be any combination); Vegetables, Potatoes, Carrots — two separate circles inside a larger one (potatoes and carrots are distinct vegetables); Seconds, Minutes, Hours — concentric relationships expressed as circles inside circles. Classify the relationship between each pair (inclusion, exclusion, or partial overlap) and the diagram chooses itself.`,
    },
    {
      title: "Puzzles: Age, Calendar, and Arrangement Basics",
      content: `Age problems convert English into equations. "A father is three times as old as his son; the sum of their ages is 48" gives F = 3S and F + S = 48, so 4S = 48, S = 12 and F = 36. The most common trap is time-shifting: "five years ago the father was four times as old" must be written (F − 5) = 4(S − 5), subtracting five from BOTH ages. Set the present ages as variables, translate each clause with its own time shift, and the algebra is rarely harder than two linear equations.

Calendar questions rest on the fact that days cycle every 7. To find the day after N days, take N modulo 7 and count forward. If today is Monday, then after 61 days: 61 = 8 × 7 + 5, so count 5 days past Monday — Saturday. An ordinary year has 365 days = 52 weeks + 1 odd day, so the same date next year falls one weekday later; a leap year adds two odd days. February has 29 days in years divisible by 4, except century years, which must be divisible by 400 (2000 was a leap year; 1900 was not).

Clock questions use two speeds: the minute hand moves 6° per minute, the hour hand 0.5° per minute, so the minute hand gains 5.5° per minute on the hour hand. The hands overlap 11 times every 12 hours (not 12), and are opposite 11 times every 12 hours. At 3:00 the angle between the hands is exactly 90°; at 3:30 the minute hand is at 180° and the hour hand at 105°, so the angle is 75°.

Linear arrangement puzzles ("five people in a row, A is to the left of B but right of C…") reward a fixed procedure: draw the positions as boxes, place the most constrained person first, branch when a clue allows two placements, and eliminate branches as later clues arrive. In banking prelims, puzzles and seating occupy a third or more of the reasoning section, so this procedural discipline — boxes, anchor, branch, eliminate — is the highest-value habit you can build.`,
    },
    {
      title: "Non-Verbal and Miscellaneous Reasoning",
      content: `Mirror-image questions reflect a figure across a vertical mirror: left and right swap, top and bottom stay. A clock seen in a mirror shows the time that, added to the real time, completes 12 hours — a clock reading 3:00 appears as 9:00 in the mirror (3 + 9 = 12). Water images reflect across a horizontal line instead: top and bottom swap. For letters, remember which survive reflection: A, H, I, M, O, T, U, V, W, X, Y are symmetric about a vertical axis, so they look unchanged in a mirror.

Paper-folding questions punch holes in a folded sheet and ask for the unfolded pattern; the rule is that each unfolding reflects the holes across the fold line. Embedded-figure questions hide a simple shape inside a complex one — trace the target shape's outline mentally and scan for its corners. Figure-series questions rotate or add elements step by step; track ONE element at a time (the dot, then the arrow, then the shading) instead of judging the whole picture at once.

Counting-figure questions ask how many triangles or squares a composite figure contains. Count systematically by size: first the smallest units, then shapes made of 2 units, then 4, and so on, and never skip a size class. Word-based counting also appears: in the word EXAMINATION, the letter A appears twice, I twice, N twice — such letter-frequency questions are free marks if you tally carefully with your pen rather than by eye.

Mathematical-operations questions (covered again from coding) swap symbols; dice questions give two views of a die and ask for the face opposite a given number — on a standard die, opposite faces sum to 7 (1–6, 2–5, 3–4). Cube-cutting: a cube painted outside and cut into 27 small cubes yields 8 corner cubes with three painted faces, 12 edge cubes with two, 6 face-centre cubes with one, and 1 hidden centre cube with none — the counts 8, 12, 6, 1 always total 27. These recur every exam season; learn the fixed results once and collect the marks.`,
    },
  ],
  questions: [
    { q: "Doctor : Hospital :: Teacher : ?", options: ["Office", "School", "Court", "Library"], correct: 1 },
    { q: "Find the odd one out: Rose, Lotus, Marigold, Mango", options: ["Rose", "Lotus", "Marigold", "Mango"], correct: 3 },
    { q: "What comes next in the series: 2, 6, 12, 20, 30, ?", options: ["36", "40", "42", "44"], correct: 2 },
    { q: "What comes next in the series: A, C, F, J, O, ?", options: ["S", "T", "U", "V"], correct: 2 },
    { q: "If DELHI is coded as CDKGH, how is MUMBAI coded?", options: ["LTLAZH", "NTLAZH", "LTLZAH", "LTMAZH"], correct: 0 },
    { q: "A man points to a photograph and says, \"She is the daughter of my mother's only son.\" How is the girl related to the man?", options: ["Sister", "Niece", "Daughter", "Cousin"], correct: 2 },
    { q: "A person walks 3 km north, turns right, and walks 4 km. How far is he from the starting point?", options: ["4 km", "5 km", "6 km", "7 km"], correct: 1 },
    { q: "Ram is 10th from the top and 15th from the bottom of his class. How many students are in the class?", options: ["23", "24", "25", "26"], correct: 1 },
    { q: "Statements: All cats are animals. Some animals are dogs. Does the conclusion \"Some cats are dogs\" follow?", options: ["Yes, it follows", "No, it does not follow", "Only if dogs are cats", "Cannot be determined from any diagram"], correct: 1 },
    { q: "A clock shows 3:00. What time does it appear to show in a mirror?", options: ["6:00", "9:00", "12:00", "3:00"], correct: 1 },
    { q: "Find the odd one out: 121, 144, 169, 190", options: ["121", "144", "169", "190"], correct: 3 },
    { q: "What comes next in the series: 5, 10, 20, 40, ?", options: ["60", "70", "80", "100"], correct: 2 },
    { q: "If PEN is coded as 35 (using letter positions), what is the code for INK?", options: ["32", "33", "34", "36"], correct: 2 },
    { q: "Five friends sit in a row and C sits exactly in the middle. How many friends sit to the right of C?", options: ["1", "2", "3", "4"], correct: 1 },
    { q: "If today is Monday, what day will it be after 61 days?", options: ["Friday", "Saturday", "Sunday", "Monday"], correct: 1 },
    { q: "8 : 64 :: 12 : ?", options: ["120", "132", "144", "156"], correct: 2 },
    { q: "How many times does the letter A appear in the word EXAMINATION?", options: ["1", "2", "3", "4"], correct: 1 },
    { q: "If '+' means '×' and '×' means '+', what is the value of 6 + 4 × 2?", options: ["16", "22", "26", "48"], correct: 2 },
    { q: "Which Venn diagram best represents Doctors, Men, Fathers?", options: ["Three separate circles", "Three concentric circles", "Three mutually overlapping circles", "Two circles inside a third"], correct: 2 },
    { q: "A father is three times as old as his son, and the sum of their ages is 48 years. How old is the son?", options: ["10", "12", "14", "16"], correct: 1 },
  ],
};
