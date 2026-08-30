import type { SeedCourse } from "../seed-types";

// Content aligned with the NCERT Class 10 mathematics syllabus. All facts,
// formulas, and worked examples are standard textbook material.
export const class10Maths: SeedCourse = {
  slug: "class-10-maths-foundations",
  title: "Class 10 Mathematics Foundations",
  description:
    "A full foundation course aligned with the Class 10 board syllabus: real numbers, polynomials, equations, progressions, triangles, trigonometry, and statistics — with worked examples in every chapter.",
  category: "general",
  tier: 1,
  price_inr: 249,
  lessons: [
    {
      title: "Real Numbers",
      content: `Real numbers include all rational numbers (numbers expressible as p/q with q not zero, such as 3/4 or -7) and all irrational numbers (numbers that cannot be written as such a fraction, like the square root of 2 or pi). Together they fill the entire number line without gaps.

Euclid's Division Lemma states that for any two positive integers a and b, there exist unique whole numbers q and r such that a = bq + r, where 0 <= r < b. Repeatedly applying this — dividing and passing the remainder along — is the Euclidean algorithm for finding the highest common factor (HCF). Example: for 72 and 56, we get 72 = 56×1 + 16, then 56 = 16×3 + 8, then 16 = 8×2 + 0. The last non-zero remainder, 8, is the HCF.

The Fundamental Theorem of Arithmetic says every composite number can be written as a product of primes in exactly one way, apart from the order of factors. For example, 3825 = 3 × 3 × 5 × 5 × 17. This gives a second route to HCF and LCM: the HCF is the product of the smallest powers of common primes, and the LCM is the product of the greatest powers of all primes involved. A useful check: for any two numbers, HCF × LCM = product of the numbers.

Proofs of irrationality follow a contradiction pattern. To show the square root of 2 is irrational, assume it equals a/b in lowest terms; squaring gives a² = 2b², so a is even, say a = 2c; then b² = 2c², so b is also even — contradicting "lowest terms". A decimal expansion terminates exactly when the denominator (in lowest terms) has no prime factors other than 2 and 5; otherwise the decimal is non-terminating repeating.`,
    },
    {
      title: "Polynomials",
      content: `A polynomial in x is an expression built from constants and non-negative integer powers of x, such as p(x) = 2x³ - x + 5. The degree is the highest power with a non-zero coefficient: linear polynomials have degree 1, quadratics degree 2, cubics degree 3.

A zero (or root) of p(x) is a value k with p(k) = 0. Geometrically, real zeroes are the x-coordinates where the graph of y = p(x) crosses the x-axis. A quadratic's graph is a parabola: it can cross the axis at two points (two distinct real zeroes), touch it at one point (one repeated zero), or miss it entirely (no real zeroes). A polynomial of degree n has at most n real zeroes.

For a quadratic ax² + bx + c with zeroes α and β, two relationships always hold: α + β = -b/a and αβ = c/a. Example: x² - 7x + 10 has zeroes 2 and 5; indeed 2 + 5 = 7 = -(-7)/1 and 2 × 5 = 10 = 10/1. Conversely, a quadratic with given zero-sum S and zero-product P is x² - Sx + P (times any non-zero constant). For a cubic ax³ + bx² + cx + d with zeroes α, β, γ: α + β + γ = -b/a, αβ + βγ + γα = c/a, and αβγ = -d/a.

The division algorithm for polynomials mirrors long division of numbers: for any polynomials p(x) and g(x) (g ≠ 0), there are unique q(x) and r(x) with p(x) = g(x)·q(x) + r(x), where r(x) is zero or has degree less than g(x). It is used to find remaining zeroes once some are known: divide out the known factors and solve what remains.`,
    },
    {
      title: "Pair of Linear Equations in Two Variables",
      content: `A pair of linear equations has the general form a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0. Each equation's graph is a straight line, and solving the pair means finding the point(s) the lines share.

Three situations are possible, diagnosed by comparing ratios. If a₁/a₂ ≠ b₁/b₂ the lines intersect at exactly one point: a unique solution (consistent pair). If a₁/a₂ = b₁/b₂ = c₁/c₂ the lines coincide: infinitely many solutions (consistent, dependent). If a₁/a₂ = b₁/b₂ ≠ c₁/c₂ the lines are parallel and distinct: no solution (inconsistent pair).

The substitution method expresses one variable from one equation and substitutes into the other. The elimination method scales the equations so one variable's coefficients match, then adds or subtracts to eliminate it. Example by elimination: from x + y = 5 and x - y = 1, adding gives 2x = 6 so x = 3, and then y = 2.

Many word problems reduce to such pairs: ages ("five years ago, twice as old"), two-digit numbers and reversed digits, speeds of boats in still water versus stream, and fixed-plus-per-unit pricing (like a hostel charging a fixed mess fee plus a daily rate). The discipline is always the same — name the unknowns, translate each sentence into an equation, then solve the pair.`,
    },
    {
      title: "Quadratic Equations",
      content: `A quadratic equation has the standard form ax² + bx + c = 0 with a ≠ 0. Its solutions are the zeroes of the quadratic polynomial, and real-world settings that produce them include areas ("a rectangular plot of 528 m² whose length is one more than twice its breadth"), projectile heights, and speed–time–distance problems.

Factorisation solves a quadratic when the middle term can be split: for x² - 5x + 6 = 0, write x² - 2x - 3x + 6 = 0, group to (x-2)(x-3) = 0, so x = 2 or x = 3. This relies on the zero-product principle: if a product of factors is zero, at least one factor is zero.

The quadratic formula solves every case: x = (-b ± √(b² - 4ac)) / 2a. The expression D = b² - 4ac is the discriminant, and it classifies the roots without solving: D > 0 gives two distinct real roots, D = 0 gives exactly one repeated real root (x = -b/2a), and D < 0 gives no real roots.

Example with the formula: 2x² - 7x + 3 = 0 has D = 49 - 24 = 25, so x = (7 ± 5)/4, giving x = 3 or x = 1/2. When a problem asks for conditions ("for what k does kx² + 4x + 1 = 0 have equal roots?"), set the discriminant to the required sign: here 16 - 4k = 0, so k = 4.`,
    },
    {
      title: "Arithmetic Progressions",
      content: `An arithmetic progression (AP) is a sequence where each term differs from the previous one by a fixed number d, the common difference. Examples: 3, 7, 11, 15, … (d = 4) and 10, 8, 6, … (d = -2). APs model evenly spaced growth: monthly savings increased by a fixed amount, seats per row in an auditorium, or depreciation by equal steps.

The nth term is aₙ = a + (n-1)d, where a is the first term. Example: for 21, 18, 15, …, the 10th term is 21 + 9×(-3) = -6. The same formula answers "which term equals zero?": set a + (n-1)d = 0 and solve for n; if n comes out a positive integer, that term exists.

The sum of the first n terms is Sₙ = n/2 × [2a + (n-1)d], or equivalently Sₙ = n/2 × (first term + last term) when the last term is known. Example: the sum of the first 100 natural numbers is 100/2 × (1 + 100) = 5050 — the famous schoolboy computation attributed to Gauss.

Two habits prevent most AP mistakes. First, verify a sequence is genuinely an AP by checking that consecutive differences are equal — not just the first pair. Second, remember that Sₙ - Sₙ₋₁ = aₙ: the nth term can always be recovered from consecutive sums, which examiners use to build reverse problems.`,
    },
    {
      title: "Triangles and Similarity",
      content: `Two figures are similar when they have the same shape but possibly different sizes: corresponding angles are equal and corresponding sides are in the same ratio. All congruent figures are similar, but similar figures need not be congruent. For triangles, three criteria establish similarity: AAA (or AA — two equal angle pairs suffice), SSS (all three side ratios equal), and SAS (one equal angle between sides in proportion).

The Basic Proportionality Theorem (Thales' theorem) states: a line drawn parallel to one side of a triangle, intersecting the other two sides, divides those sides in the same ratio. Its converse also holds — if a line divides two sides of a triangle in the same ratio, it is parallel to the third side. This theorem underlies most "find the length" problems involving parallel lines inside triangles.

Areas of similar triangles are related by the square of the side ratio: if two triangles are similar with sides in ratio k, their areas are in ratio k². So doubling every side of a triangle quadruples its area — a frequent source of exam questions ("the ratio of areas of two similar triangles is 16:25; find the ratio of their sides", answer 4:5).

The Pythagoras theorem — in a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides — can be proved using similarity: the altitude to the hypotenuse splits the triangle into two triangles each similar to the whole. Its converse is equally testable: if a² + b² = c² for a triangle's sides, the angle opposite c is a right angle. Example: 7, 24, 25 form a right triangle because 49 + 576 = 625.`,
    },
    {
      title: "Introduction to Trigonometry",
      content: `Trigonometry begins with ratios of sides in a right triangle, defined for an acute angle θ: sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent. Their reciprocals are cosecant, secant, and cotangent respectively, and tan θ = sin θ / cos θ.

The standard-angle table must be memorised: sin takes the values 0, 1/2, 1/√2, √3/2, 1 at 0°, 30°, 45°, 60°, 90°, and cos takes the same values in reverse order. tan is 0, 1/√3, 1, √3 at 0°, 30°, 45°, 60°, and is not defined at 90°. Example: sin 30° + cos 60° = 1/2 + 1/2 = 1.

Three identities generate all others in this syllabus: sin²θ + cos²θ = 1; 1 + tan²θ = sec²θ; and 1 + cot²θ = cosec²θ. Typical proofs ask you to transform one side of an equation into the other using these plus the ratio definitions — the reliable strategy is to convert everything into sines and cosines first.

Heights-and-distances problems apply these ratios to real measurements using the angle of elevation (looking up from the horizontal) or depression (looking down). Example: from a point 30 m from a tower's base, the top is seen at a 60° elevation; the height is 30 × tan 60° = 30√3 ≈ 51.96 m. Drawing the right triangle first, and marking which side is known, prevents nearly all errors.`,
    },
    {
      title: "Statistics and Probability",
      content: `For grouped data, three measures of central tendency are examined. The mean can be computed by the direct method (Σfᵢxᵢ / Σfᵢ using class midpoints xᵢ), or the assumed-mean method which subtracts a convenient constant to keep numbers small. Each class's midpoint represents all observations that fall inside it.

The mode of grouped data lies in the modal class — the class with the highest frequency — and is estimated by the formula mode = l + [(f₁ - f₀) / (2f₁ - f₀ - f₂)] × h, where l is the modal class's lower boundary, f₁ its frequency, f₀ and f₂ the neighbouring frequencies, and h the class width. The median uses cumulative frequencies: locate the class containing the (n/2)th observation, then apply median = l + [(n/2 - cf) / f] × h.

An empirical relationship links the three measures for moderately skewed data: 3 × median ≈ mode + 2 × mean. It lets you estimate any one measure when the other two are known, and appears regularly as a one-mark question.

Theoretical probability of an event E is P(E) = (favourable outcomes) / (total equally likely outcomes). It always lies between 0 (impossible) and 1 (certain), and P(not E) = 1 - P(E). Standard settings: one die (six outcomes), two dice (36 ordered outcomes), a 52-card pack (four suits of thirteen; jacks, queens, kings are the twelve face cards). Example: the probability of drawing a red face card is 6/52 = 3/26.`,
    },
  ],
  questions: [
    { q: "Using Euclid's algorithm, the HCF of 56 and 72 is:", options: ["6", "8", "12", "16"], correct: 1 },
    { q: "For any two positive integers, HCF × LCM equals:", options: ["Their sum", "Their difference", "Their product", "Their quotient"], correct: 2 },
    { q: "Which of these is an irrational number?", options: ["22/7", "0.75", "√2", "0.373737… (repeating)"], correct: 2 },
    { q: "The decimal expansion of 17/8 is:", options: ["Non-terminating repeating", "Terminating", "Non-terminating non-repeating", "Cannot be determined"], correct: 1 },
    { q: "For p(x) = x² - 5x + 6, the zeroes are:", options: ["1 and 6", "2 and 3", "-2 and -3", "5 and 6"], correct: 1 },
    { q: "The sum of the zeroes of ax² + bx + c equals:", options: ["c/a", "-c/a", "b/a", "-b/a"], correct: 3 },
    { q: "A quadratic polynomial whose zeroes sum to 3 and multiply to 2 is:", options: ["x² + 3x + 2", "x² - 3x + 2", "x² - 2x + 3", "x² + 2x - 3"], correct: 1 },
    { q: "The maximum number of real zeroes of a cubic polynomial is:", options: ["1", "2", "3", "4"], correct: 2 },
    { q: "If a₁/a₂ = b₁/b₂ ≠ c₁/c₂, the pair of linear equations has:", options: ["A unique solution", "Two solutions", "Infinitely many solutions", "No solution"], correct: 3 },
    { q: "Solving x + y = 5 and x - y = 1 gives:", options: ["x = 3, y = 2", "x = 2, y = 3", "x = 4, y = 1", "x = 1, y = 4"], correct: 0 },
    { q: "The discriminant of ax² + bx + c = 0 is:", options: ["b² + 4ac", "b² - 4ac", "4ac - b²", "-b² - 4ac"], correct: 1 },
    { q: "If the discriminant of a quadratic equation is zero, the equation has:", options: ["Two distinct real roots", "One repeated real root", "No real roots", "Three roots"], correct: 1 },
    { q: "For what value of k does kx² + 4x + 1 = 0 have equal roots?", options: ["2", "4", "8", "16"], correct: 1 },
    { q: "The 10th term of the AP 21, 18, 15, … is:", options: ["-6", "-3", "0", "3"], correct: 0 },
    { q: "The sum of the first 100 natural numbers is:", options: ["4950", "5000", "5050", "5100"], correct: 2 },
    { q: "In an AP, Sₙ - Sₙ₋₁ equals:", options: ["The common difference", "The nth term", "The first term", "n times the mean"], correct: 1 },
    { q: "If two similar triangles have sides in ratio 4:5, their areas are in ratio:", options: ["4:5", "8:10", "16:25", "2:√5"], correct: 2 },
    { q: "Which side lengths form a right triangle?", options: ["5, 12, 14", "7, 24, 25", "8, 14, 17", "6, 9, 12"], correct: 1 },
    { q: "sin 30° + cos 60° equals:", options: ["0", "1/2", "1", "√3/2"], correct: 2 },
    { q: "The probability of drawing a red face card from a standard 52-card pack is:", options: ["3/26", "1/13", "3/52", "1/4"], correct: 0 },
  ],
};
