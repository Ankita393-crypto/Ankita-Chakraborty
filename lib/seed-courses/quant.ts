import type { SeedCourse } from "../seed-types";

// Quantitative Aptitude for government exams (SSC, banking, railways).
// All formulas are standard arithmetic identities; every worked example
// has been computed and checked by hand — no unverified claims.
export const quantitativeAptitude: SeedCourse = {
  slug: "quantitative-aptitude-govt-exams",
  title: "Quantitative Aptitude for Govt Exams",
  description:
    "Complete arithmetic preparation for SSC CGL/CHSL, IBPS PO/Clerk, SBI, and RRB NTPC: number system, percentages, ratios, averages, profit and loss, interest, time and work, and speed–distance, with exam-style solved examples in every chapter.",
  category: "certprep",
  tier: 4,
  price_inr: 499,
  lessons: [
    {
      title: "Number System and Divisibility",
      content: `Every government exam opens its quantitative section with the number system, because fast mental arithmetic depends on it. Natural numbers start from 1; whole numbers include 0; integers include negatives. Prime numbers have exactly two factors (1 and themselves) — 2 is the only even prime, and 1 is neither prime nor composite. The primes below 20 are 2, 3, 5, 7, 11, 13, 17, and 19.

Divisibility rules save enormous time. A number is divisible by 2 if its last digit is even; by 3 if the sum of its digits is divisible by 3; by 4 if its last two digits form a number divisible by 4; by 5 if it ends in 0 or 5; by 6 if it is divisible by both 2 and 3; by 8 if its last three digits are divisible by 8; by 9 if its digit sum is divisible by 9; by 10 if it ends in 0; and by 11 if the difference between the sum of digits in odd places and even places is 0 or a multiple of 11. Example: 729 has digit sum 7 + 2 + 9 = 18, which is divisible by 9, so 729 is divisible by 9 (indeed 729 = 81 × 9).

HCF (highest common factor) is the largest number dividing all given numbers; LCM (lowest common multiple) is the smallest number divisible by all of them. For 36 and 60: 36 = 2² × 3² and 60 = 2² × 3 × 5, so HCF = 2² × 3 = 12 and LCM = 2² × 3² × 5 = 180. The key identity for two numbers is HCF × LCM = product of the numbers; check: 12 × 180 = 2160 = 36 × 60. For 12 and 18, HCF = 6 and LCM = 36.

Two exam patterns to memorise: (1) if two numbers are in ratio a : b with HCF h, the numbers are ah and bh, and their LCM is a × b × h; (2) the largest number that divides x, y, z leaving the same remainder r divides the differences (x − y), (y − z) exactly. Practise until factorising two-digit and three-digit numbers takes seconds, not minutes.`,
    },
    {
      title: "Percentages",
      content: `A percentage is a fraction with denominator 100, so x% of N equals (x/100) × N. Example: 25% of 480 = 480/4 = 120, and 40% of 160 = 64 (so if 40% of a number is 64, the number is 64 × 100/40 = 160). Learn the fraction equivalents cold: 50% = 1/2, 25% = 1/4, 20% = 1/5, 12.5% = 1/8, 33⅓% = 1/3, 16⅔% = 1/6, 66⅔% = 2/3. They convert slow division into instant multiplication.

Percentage change = (change ÷ original) × 100, always on the ORIGINAL value. If a value rises from 80 to 100, the increase is 20 on an original of 80, so the rise is 25% — but falling from 100 back to 80 is only a 20% fall, because the base changed. This asymmetry is a favourite trap: a 25% increase is undone by a 20% decrease, not by 25%.

Successive percentage changes multiply. Two changes of a% and b% combine to a + b + ab/100 (use negative signs for decreases). Example: a 20% discount followed by a 10% discount is −20 − 10 + (20 × 10)/100 = −28, a single 28% discount; verified directly, 0.80 × 0.90 = 0.72 of the price, a 28% reduction. A 10% rise followed by a 10% fall gives −1% overall (0.99 of the original) — never zero.

In exams, percentages appear inside every other topic: profit and loss, interest, data interpretation, and population growth. If a town of 40,000 grows 5% a year, after one year it has 40,000 × 1.05 = 42,000 people; after two years, 42,000 × 1.05 = 44,100. Multiplying factors (×1.05 per year) are faster and safer than adding percentages.`,
    },
    {
      title: "Ratio, Proportion, and Partnership",
      content: `A ratio compares quantities of the same kind: a : b means a/b. Ratios are unchanged when both terms are multiplied or divided by the same number, so 12 : 20 = 3 : 5. To split an amount in the ratio a : b, the shares are a/(a+b) and b/(a+b) of the total. Example: 96 split 3 : 5 gives 8 equal parts of 12 each, so the shares are 36 and 60 — the larger share is 60.

Four numbers are in proportion when a : b = c : d, written a : b :: c : d; then the product of extremes equals the product of means, ad = bc. The fourth proportional to 4, 8, 10 is x where 4/8 = 10/x, so x = 20. The mean proportional between a and b is √(ab): between 4 and 25 it is √100 = 10.

Partnership problems divide profit in the ratio of capital × time. If A invests ₹5,000 for 12 months and B invests ₹6,000 for 10 months, their profit ratio is 5,000 × 12 : 6,000 × 10 = 60,000 : 60,000 = 1 : 1 — equal shares despite unequal capital, because time differs. When times are equal, profit ratio is simply the capital ratio.

Mixture problems are ratios in disguise. A 50-litre mixture with milk and water in ratio 7 : 3 contains 50 × 7/10 = 35 litres of milk and 15 litres of water. The rule of alligation finds mixing ratios: to make a 60-rupee blend from 50-rupee and 75-rupee varieties, mix them in ratio (75 − 60) : (60 − 50) = 15 : 10 = 3 : 2. Alligation also solves average-speed, average-wage, and interest-mix questions, so master the diagram once and reuse it everywhere.`,
    },
    {
      title: "Averages",
      content: `The average (arithmetic mean) is the sum of observations divided by their count: Average = Sum ÷ n, and equally usefully Sum = Average × n. The average of 10, 20, 30, 40, 50 is 150/5 = 30 — for any evenly spaced list, the average is the middle value, or the mean of the first and last: (10 + 50)/2 = 30. The average of the first 10 natural numbers is (1 + 10)/2 = 5.5, and in general the first n natural numbers average (n + 1)/2.

When one member joins or leaves a group, work with total sums. If 30 students average 40 kg and the teacher joins making the average 41 kg for 31 people, the teacher weighs 31 × 41 − 30 × 40 = 1,271 − 1,200 = 71 kg. Most "new member" questions are exactly this: new total minus old total.

A classic pattern: the average of a batsman after n innings. If his average after 10 innings is 32, and he scores 76 in the 11th, his new average is (10 × 32 + 76)/11 = 396/11 = 36. Conversely, exams ask what score raises the average by a given amount — set up the same equation and solve.

Weighted averages handle unequal group sizes. If a class of 20 boys averages 60 marks and 30 girls average 70, the class average is (20 × 60 + 30 × 70)/50 = (1,200 + 2,100)/50 = 66 — closer to the girls' average because they are the larger group. Never average two averages directly unless the groups are equal in size; that single habit prevents the most common averages mistake in the exam hall.`,
    },
    {
      title: "Profit, Loss, and Discount",
      content: `Cost price (CP) is what an article costs the seller; selling price (SP) is what the buyer pays. Profit = SP − CP and Loss = CP − SP, and both percentages are always calculated on CP: Profit% = Profit × 100/CP. Example: bought at ₹400, sold at ₹500 → profit ₹100 on ₹400 = 25% profit. To go the other way, SP = CP × (100 + Profit%)/100; a 15% profit on ₹400 means SP = 400 × 1.15 = ₹460.

The marked price (MP) is the label price; discount is always calculated on MP. SP = MP × (100 − Discount%)/100. Example: MP ₹800 with 15% discount gives SP = 800 × 0.85 = ₹680. Successive discounts multiply exactly as successive percentage changes do: 20% then 10% equals a single 28% discount, never 30%. A shopkeeper who marks up 40% over cost and then gives 20% discount earns 1.40 × 0.80 = 1.12, i.e. 12% profit — mark-up and discount do not cancel.

Two staple traps: (1) equal percentage profit and loss on two articles sold at the SAME selling price always produces an overall loss of (x²/100)% — selling two items at ₹600 each, one at 20% profit and one at 20% loss, loses 4% overall; (2) "profit on selling price" questions must be converted back to cost-price base before comparing.

Dishonest-dealer questions combine these ideas: a trader who sells at cost price but uses a 900-gram weight for a kilogram gives 900 g while charging for 1,000 g, so his gain is 100/900 = 11.11% (one-ninth), not 10%. The gain formula is (error)/(true value − error) × 100. Work each example with actual numbers until the formulas feel obvious rather than memorised.`,
    },
    {
      title: "Simple and Compound Interest",
      content: `Simple interest grows linearly: SI = P × R × T/100, where P is principal, R the annual rate, and T the time in years. Example: ₹5,000 at 8% for 3 years earns 5,000 × 8 × 3/100 = ₹1,200. The amount is A = P + SI = ₹6,200. Simple-interest money adds the same interest every year, so a sum that becomes 3 times itself in 20 years earns 2P in 20 years — a rate of 10%.

Compound interest grows by multiplying: A = P(1 + R/100)^T when compounded annually, and CI = A − P. Example: ₹10,000 at 10% for 2 years grows to 10,000 × 1.1 = 11,000 after one year, then 11,000 × 1.1 = 12,100 after two — compound interest ₹2,100, against simple interest of only ₹2,000. The ₹100 difference is interest on the first year's interest.

The difference between CI and SI is an exam staple. For 2 years, CI − SI = P(R/100)²; check with the example above: 10,000 × (0.1)² = ₹100. For 3 years, CI − SI = P(R/100)²(3 + R/100). If a question gives you the 2-year difference, the principal follows in one line.

For half-yearly compounding, halve the rate and double the periods: ₹8,000 at 10% per annum compounded half-yearly for one year is 8,000 × 1.05 × 1.05 = ₹8,820. Also remember doubling behaviour: at 10% compound interest money roughly doubles in about 7.3 years (the "rule of 72" estimates doubling time as 72 ÷ rate). Banking exams love these; SSC prefers exact 2- and 3-year calculations, so practise both forms.`,
    },
    {
      title: "Time and Work",
      content: `The foundation of time-and-work is the unit-work idea: a person who finishes a job in n days does 1/n of it per day. If A completes a job in 12 days and B in 24 days, together they do 1/12 + 1/24 = 2/24 + 1/24 = 3/24 = 1/8 per day, so they finish in 8 days. The general two-person formula is xy/(x + y): here 12 × 24/36 = 8.

The LCM method avoids fractions. Take the total work as the LCM of the given days — for 12 and 24, total work 24 units. A does 2 units/day, B does 1 unit/day, together 3 units/day, so 24/3 = 8 days. The LCM method shines in three-person problems and in "A and B together, B and C together" puzzles where fractions get messy.

Efficiency questions translate speed ratios into time ratios inversely. If A is twice as efficient as B, A takes half the time; if A is 50% more efficient, times are in ratio 2 : 3. "A alone finishes in 6 fewer days than B" plus a combined time yields a quadratic — practise a few so the setup is automatic. Wages divide in the ratio of work done, which equals the ratio of efficiencies when time worked is the same.

Pipes and cisterns follow identical arithmetic with one twist: an outlet pipe does negative work. A filling pipe that fills in 10 hours contributes +1/10 per hour; a drain that empties in 15 hours contributes −1/15. Together: 1/10 − 1/15 = 3/30 − 2/30 = 1/30, so the tank fills in 30 hours. Watch for pipes opened at different times — compute the work already done before the second pipe joins, then finish the remainder at the combined rate.`,
    },
    {
      title: "Time, Speed, and Distance",
      content: `Distance = Speed × Time is the whole chapter; everything else is unit discipline and special cases. At 60 km/h for 2.5 hours you cover 60 × 2.5 = 150 km. The critical conversion: km/h to m/s multiply by 5/18, m/s to km/h multiply by 18/5. So 54 km/h = 54 × 5/18 = 15 m/s and 20 m/s = 72 km/h.

Average speed over equal DISTANCES is the harmonic mean 2xy/(x + y), not the simple mean. Travelling somewhere at 40 km/h and returning at 60 km/h averages 2 × 40 × 60/100 = 48 km/h — the answer is always below the simple mean of 50 because more time is spent at the slower speed. Only when TIMES are equal does the simple mean apply.

Train questions measure distance by what the train must clear. Passing a pole or a standing person, the train covers its own length: a 150 m train at 54 km/h (15 m/s) passes a pole in 150/15 = 10 seconds. Passing a platform, it covers train length + platform length. For two trains, speeds add when they move toward each other and subtract when they move the same way, and the distance is the sum of both lengths.

Boats and streams: downstream speed = boat speed + stream speed, upstream = boat − stream. Given both, boat speed = (down + up)/2 and stream speed = (down − up)/2. Example: downstream 12 km/h and upstream 8 km/h means the boat does 10 km/h in still water and the stream flows at 2 km/h. Relative-speed thinking — one object's speed measured from the other — solves races, circular tracks, and the police-thief chases that appear every year.`,
    },
  ],
  questions: [
    { q: "What is 25% of 480?", options: ["96", "110", "120", "125"], correct: 2 },
    { q: "A value increases from 80 to 100. What is the percentage increase?", options: ["20%", "25%", "30%", "12.5%"], correct: 1 },
    { q: "₹96 is divided between two people in the ratio 3 : 5. What is the larger share?", options: ["₹36", "₹48", "₹56", "₹60"], correct: 3 },
    { q: "What is the average of 10, 20, 30, 40, and 50?", options: ["25", "30", "35", "40"], correct: 1 },
    { q: "An article bought for ₹400 is sold for ₹500. What is the profit percentage?", options: ["20%", "25%", "30%", "15%"], correct: 1 },
    { q: "What is the simple interest on ₹5,000 at 8% per annum for 3 years?", options: ["₹1,000", "₹1,100", "₹1,200", "₹1,300"], correct: 2 },
    { q: "What is the compound interest on ₹10,000 at 10% per annum for 2 years, compounded annually?", options: ["₹2,000", "₹2,100", "₹2,200", "₹1,900"], correct: 1 },
    { q: "A can do a piece of work in 12 days and B in 24 days. Working together, they finish it in:", options: ["6 days", "8 days", "9 days", "10 days"], correct: 1 },
    { q: "A car travels at 60 km/h for 2.5 hours. How far does it go?", options: ["120 km", "140 km", "150 km", "160 km"], correct: 2 },
    { q: "A 150 m long train moving at 54 km/h passes a pole in:", options: ["8 seconds", "10 seconds", "12 seconds", "15 seconds"], correct: 1 },
    { q: "Successive discounts of 20% and 10% are equivalent to a single discount of:", options: ["30%", "28%", "27%", "25%"], correct: 1 },
    { q: "What is the LCM of 12 and 18?", options: ["24", "36", "48", "72"], correct: 1 },
    { q: "What is the HCF of 36 and 60?", options: ["6", "9", "12", "18"], correct: 2 },
    { q: "Which of these numbers is divisible by 9?", options: ["725", "727", "729", "731"], correct: 2 },
    { q: "A 50-litre mixture has milk and water in the ratio 7 : 3. How much milk does it contain?", options: ["30 litres", "32 litres", "35 litres", "38 litres"], correct: 2 },
    { q: "The marked price of an item is ₹800 and the shop offers 15% discount. What is the selling price?", options: ["₹640", "₹660", "₹680", "₹700"], correct: 2 },
    { q: "What is the average of the first 10 natural numbers?", options: ["5", "5.5", "6", "6.5"], correct: 1 },
    { q: "If 40% of a number is 64, the number is:", options: ["140", "150", "160", "180"], correct: 2 },
    { q: "A boat goes 12 km/h downstream and 8 km/h upstream. What is the speed of the stream?", options: ["1 km/h", "2 km/h", "3 km/h", "4 km/h"], correct: 1 },
    { q: "Two numbers are in the ratio 4 : 5 and their HCF is 6. What is their LCM?", options: ["60", "90", "120", "180"], correct: 2 },
  ],
};
