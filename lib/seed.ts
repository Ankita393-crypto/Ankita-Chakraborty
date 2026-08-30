import type { Database } from "better-sqlite3";
import bcrypt from "bcryptjs";

type SeedCourse = {
  slug: string;
  title: string;
  description: string;
  category: "general" | "certprep";
  tier: number;
  price_inr: number;
  lessons: { title: string; content: string }[];
  questions: { q: string; options: string[]; correct: number }[];
};

const courses: SeedCourse[] = [
  {
    slug: "class-10-maths-foundations",
    title: "Class 10 Mathematics Foundations",
    description:
      "Core concepts of Class 10 maths: real numbers, polynomials, and linear equations, explained step by step for board exam preparation.",
    category: "general",
    tier: 1,
    price_inr: 249,
    lessons: [
      {
        title: "Real Numbers and Euclid's Division Lemma",
        content: `Real numbers include all rational and irrational numbers. Rational numbers can be written as p/q where q is not zero, while irrational numbers such as the square root of 2 cannot.

Euclid's Division Lemma states that for any two positive integers a and b, there exist unique integers q and r such that a = bq + r, where 0 <= r < b. This simple idea is the basis of the Euclidean algorithm for finding the highest common factor (HCF) of two numbers.

Example: to find the HCF of 56 and 72, divide 72 by 56 to get remainder 16, then divide 56 by 16 to get remainder 8, then divide 16 by 8 to get remainder 0. The last non-zero remainder, 8, is the HCF.`,
      },
      {
        title: "Polynomials and Their Zeroes",
        content: `A polynomial is an expression made of variables and coefficients using addition, subtraction, and multiplication, such as p(x) = 2x^2 - 3x + 1. The degree of a polynomial is the highest power of the variable.

A zero of a polynomial is a value of x for which p(x) = 0. A quadratic polynomial ax^2 + bx + c has at most two zeroes. For zeroes alpha and beta: their sum equals -b/a and their product equals c/a.

Example: for p(x) = x^2 - 5x + 6, the zeroes are 2 and 3, since (x-2)(x-3) = x^2 - 5x + 6. Check: sum 2+3 = 5 = -(-5)/1 and product 2*3 = 6 = 6/1.`,
      },
      {
        title: "Pair of Linear Equations in Two Variables",
        content: `A pair of linear equations in two variables has the form a1x + b1y + c1 = 0 and a2x + b2y + c2 = 0. Graphically each equation is a straight line.

If the lines intersect at one point there is a unique solution; if they are parallel there is no solution; if they coincide there are infinitely many solutions. Compare the ratios a1/a2, b1/b2, and c1/c2 to decide which case applies.

Algebraic methods of solving include substitution (express one variable in terms of the other) and elimination (add or subtract equations to remove one variable). Example: x + y = 5 and x - y = 1 give x = 3, y = 2 by elimination.`,
      },
    ],
    questions: [
      { q: "Using Euclid's algorithm, what is the HCF of 56 and 72?", options: ["6", "8", "12", "16"], correct: 1 },
      { q: "Which of these is an irrational number?", options: ["22/7", "0.75", "Square root of 2", "3.141414... (repeating)"], correct: 2 },
      { q: "For p(x) = x^2 - 5x + 6, the zeroes are:", options: ["1 and 6", "2 and 3", "-2 and -3", "5 and 6"], correct: 1 },
      { q: "The sum of zeroes of ax^2 + bx + c equals:", options: ["c/a", "-c/a", "b/a", "-b/a"], correct: 3 },
      { q: "Two lines with a1/a2 = b1/b2 but not equal to c1/c2 are:", options: ["Intersecting", "Coincident", "Parallel", "Perpendicular"], correct: 2 },
      { q: "The degree of the polynomial 4x^3 - 2x + 7 is:", options: ["1", "2", "3", "4"], correct: 2 },
      { q: "Solving x + y = 5 and x - y = 1 gives:", options: ["x=3, y=2", "x=2, y=3", "x=4, y=1", "x=1, y=4"], correct: 0 },
      { q: "In a = bq + r (Euclid's Division Lemma), r must satisfy:", options: ["r > b", "0 <= r < b", "r = b", "r < 0"], correct: 1 },
    ],
  },
  {
    slug: "oceanography-basics",
    title: "Oceanography Basics",
    description:
      "An introduction to the science of oceans: ocean structure, currents, and marine ecosystems, for curious learners of any background.",
    category: "general",
    tier: 3,
    price_inr: 499,
    lessons: [
      {
        title: "The Structure of the Ocean",
        content: `Oceans cover about 71 percent of the Earth's surface and hold roughly 97 percent of its water. The five oceans are the Pacific, Atlantic, Indian, Southern, and Arctic, with the Pacific being the largest and deepest.

Scientists divide the ocean vertically into zones. The sunlight (euphotic) zone reaches about 200 metres deep and supports photosynthesis. Below it lie the twilight (dysphotic) zone to about 1,000 metres and the midnight (aphotic) zone beyond, where no sunlight penetrates.

The ocean floor has its own geography: the continental shelf, the continental slope, vast abyssal plains, mid-ocean ridges where new crust forms, and deep trenches. The Mariana Trench, at nearly 11,000 metres, is the deepest known point on Earth.`,
      },
      {
        title: "Ocean Currents and Circulation",
        content: `Ocean currents are continuous movements of seawater driven by wind, differences in water density, and the Earth's rotation. Surface currents, driven mainly by wind, affect roughly the top 400 metres of water.

The Coriolis effect, caused by Earth's rotation, deflects currents to the right in the Northern Hemisphere and to the left in the Southern Hemisphere, producing large circular systems called gyres.

Deep-water circulation, called thermohaline circulation, is driven by density differences due to temperature (thermo) and salinity (haline). This "global conveyor belt" moves water around the planet over centuries and plays a major role in regulating climate. The Gulf Stream, for example, carries warm water from the Gulf of Mexico toward Europe, keeping western Europe milder than its latitude suggests.`,
      },
      {
        title: "Marine Ecosystems and Life Zones",
        content: `Marine ecosystems range from sunlit coral reefs to deep-sea hydrothermal vents. Coral reefs, often called the rainforests of the sea, occupy less than 1 percent of the ocean floor yet support about 25 percent of all marine species.

Life in the ocean is organized by light and depth. Phytoplankton in the sunlight zone perform roughly half of all photosynthesis on Earth, forming the base of most marine food webs. Zooplankton, fish, and larger predators depend on this production.

In the deep sea, organisms survive without sunlight. Around hydrothermal vents, bacteria perform chemosynthesis, converting chemicals from the vents into energy, supporting unique communities of tube worms, crabs, and fish. These discoveries changed our understanding of where life can exist.`,
      },
    ],
    questions: [
      { q: "Approximately what fraction of Earth's surface is covered by oceans?", options: ["50%", "61%", "71%", "85%"], correct: 2 },
      { q: "The sunlight (euphotic) zone extends to about:", options: ["50 metres", "200 metres", "1,000 metres", "4,000 metres"], correct: 1 },
      { q: "The deepest known point on Earth is in the:", options: ["Java Trench", "Puerto Rico Trench", "Tonga Trench", "Mariana Trench"], correct: 3 },
      { q: "Surface ocean currents are driven mainly by:", options: ["Tides", "Wind", "Earthquakes", "River inflow"], correct: 1 },
      { q: "Thermohaline circulation is driven by differences in:", options: ["Wind and waves", "Temperature and salinity", "Depth and pressure", "Sunlight and plankton"], correct: 1 },
      { q: "Coral reefs support about what share of marine species?", options: ["5%", "10%", "25%", "60%"], correct: 2 },
      { q: "Around hydrothermal vents, the base of the food web is:", options: ["Photosynthesis by algae", "Chemosynthesis by bacteria", "Falling organic debris only", "Coral polyps"], correct: 1 },
      { q: "The Coriolis effect deflects currents in the Northern Hemisphere to the:", options: ["Left", "Right", "North", "South"], correct: 1 },
    ],
  },
  {
    slug: "aws-cloud-practitioner-prep",
    title: "AWS Cloud Practitioner — Exam Prep",
    description:
      "Preparation material for the AWS Certified Cloud Practitioner (CLF-C02) external exam: cloud concepts, core services, and pricing. Learnzy prepares you for the exam; the certification itself is awarded by AWS.",
    category: "certprep",
    tier: 8,
    price_inr: 1499,
    lessons: [
      {
        title: "Cloud Concepts and the AWS Global Infrastructure",
        content: `Cloud computing is the on-demand delivery of IT resources over the internet with pay-as-you-go pricing. Instead of buying and maintaining physical servers, you rent compute, storage, and other services from a provider such as AWS.

The main benefits tested in the exam are: trading capital expense for variable expense, economies of scale, no capacity guessing, increased speed and agility, no data-centre maintenance, and global reach in minutes.

AWS infrastructure is organized into Regions (geographic areas such as Mumbai, ap-south-1), Availability Zones (isolated data centres within a region), and Edge Locations (used by CloudFront to cache content close to users). A region has multiple Availability Zones, and deploying across zones is the standard way to achieve high availability.`,
      },
      {
        title: "Core Services: Compute, Storage, and Databases",
        content: `Amazon EC2 provides resizable virtual servers. Purchasing options matter for the exam: On-Demand (no commitment), Reserved Instances and Savings Plans (1 or 3 year commitment, cheaper), and Spot Instances (up to 90 percent discount, can be interrupted). AWS Lambda runs code without servers, billed per invocation and duration.

Amazon S3 is object storage with classes from Standard to Glacier Deep Archive for cold data. Amazon EBS provides block storage volumes for EC2, and EFS provides shared file storage.

For databases, RDS offers managed relational databases (MySQL, PostgreSQL, and others), Aurora is the AWS-built high-performance relational option, and DynamoDB is the managed NoSQL key-value database with single-digit-millisecond performance.`,
      },
      {
        title: "Security, Pricing, and Support",
        content: `The Shared Responsibility Model is heavily tested: AWS is responsible for security OF the cloud (hardware, facilities, managed service infrastructure), while the customer is responsible for security IN the cloud (data, identity and access management, guest operating systems, and network configuration).

IAM manages users, groups, roles, and policies. Best practices include enabling multi-factor authentication on the root account, using roles instead of long-lived keys, and granting least privilege.

For pricing, know the AWS Free Tier, the Pricing Calculator, Cost Explorer, and Budgets. Support plans in increasing order are Basic (free), Developer, Business, and Enterprise, which adds a dedicated Technical Account Manager.`,
      },
    ],
    questions: [
      { q: "In the Shared Responsibility Model, AWS is responsible for:", options: ["Customer data", "IAM user permissions", "Security OF the cloud", "Guest OS patching"], correct: 2 },
      { q: "Which EC2 purchasing option can be interrupted by AWS but offers the largest discount?", options: ["On-Demand", "Reserved", "Spot", "Dedicated Host"], correct: 2 },
      { q: "An Availability Zone is best described as:", options: ["A geographic area with many regions", "One or more isolated data centres within a region", "A content-caching site", "A billing boundary"], correct: 1 },
      { q: "Which service is a managed NoSQL key-value database?", options: ["RDS", "Aurora", "Redshift", "DynamoDB"], correct: 3 },
      { q: "Amazon S3 is what type of storage?", options: ["Block storage", "File storage", "Object storage", "Tape storage"], correct: 2 },
      { q: "Which support plan includes a dedicated Technical Account Manager?", options: ["Basic", "Developer", "Business", "Enterprise"], correct: 3 },
      { q: "AWS Lambda is billed primarily on:", options: ["Instance hours", "Invocations and duration", "Provisioned storage", "Number of users"], correct: 1 },
      { q: "Edge Locations are used primarily by which service?", options: ["EC2", "CloudFront", "RDS", "VPC"], correct: 1 },
    ],
  },
  {
    slug: "ssc-general-awareness",
    title: "SSC Exams — General Awareness Prep",
    description:
      "Preparation material for the General Awareness section of SSC recruitment exams (CGL/CHSL): Indian polity, history, and geography essentials.",
    category: "certprep",
    tier: 4,
    price_inr: 499,
    lessons: [
      {
        title: "Indian Polity: The Constitution at a Glance",
        content: `The Constitution of India came into force on 26 January 1950, drafted by the Constituent Assembly with Dr. B. R. Ambedkar as chairman of the Drafting Committee. It is the longest written constitution of any sovereign country.

Frequently asked basics: the Preamble declares India a Sovereign, Socialist, Secular, Democratic Republic. Fundamental Rights are in Part III (Articles 12 to 35), Directive Principles in Part IV, and Fundamental Duties in Part IVA (added by the 42nd Amendment, 1976).

The President is the constitutional head of state, elected by an electoral college; executive power is exercised by the Council of Ministers headed by the Prime Minister. Parliament consists of the President, the Lok Sabha (house of the people), and the Rajya Sabha (council of states).`,
      },
      {
        title: "Modern Indian History: Key Milestones",
        content: `The Revolt of 1857 was the first large-scale uprising against British rule; after it, the British Crown took direct control from the East India Company through the Government of India Act 1858.

The Indian National Congress was founded in 1885 by A. O. Hume. Landmark movements: Swadeshi Movement (1905, after the Partition of Bengal), Non-Cooperation Movement (1920), Civil Disobedience Movement with the Dandi Salt March (1930), and Quit India Movement (1942).

India gained independence on 15 August 1947. Sardar Vallabhbhai Patel led the integration of princely states. The Constitution was adopted on 26 November 1949 and enforced on 26 January 1950, chosen to honour Purna Swaraj Day (26 January 1930).`,
      },
      {
        title: "Indian Geography: Physical Features",
        content: `India spans about 3.28 million square kilometres, the seventh-largest country in the world. The Tropic of Cancer passes through eight states, and the Standard Meridian (82.5 degrees East) passes through Mirzapur, Uttar Pradesh.

Physical divisions include the Himalayan mountains in the north, the Northern Plains formed by the Indus, Ganga, and Brahmaputra river systems, the Peninsular Plateau (the oldest landmass), the Thar Desert, the coastal plains, and the island groups (Andaman and Nicobar in the Bay of Bengal, Lakshadweep in the Arabian Sea).

Kanchenjunga is the highest peak located within India. The Ganga is India's longest river; the Godavari is the longest river of peninsular India, often called the Dakshin Ganga.`,
      },
    ],
    questions: [
      { q: "The Constitution of India came into force on:", options: ["15 August 1947", "26 November 1949", "26 January 1950", "26 January 1930"], correct: 2 },
      { q: "Fundamental Duties were added by which amendment?", options: ["24th", "42nd", "44th", "52nd"], correct: 1 },
      { q: "The Indian National Congress was founded in:", options: ["1857", "1885", "1905", "1920"], correct: 1 },
      { q: "The Dandi Salt March is associated with which movement?", options: ["Non-Cooperation", "Swadeshi", "Civil Disobedience", "Quit India"], correct: 2 },
      { q: "India's Standard Meridian passes through:", options: ["Delhi", "Mirzapur", "Bhopal", "Nagpur"], correct: 1 },
      { q: "The longest river of peninsular India is the:", options: ["Krishna", "Kaveri", "Narmada", "Godavari"], correct: 3 },
      { q: "Fundamental Rights are contained in which Part of the Constitution?", options: ["Part II", "Part III", "Part IV", "Part V"], correct: 1 },
      { q: "Who chaired the Drafting Committee of the Constitution?", options: ["Jawaharlal Nehru", "Rajendra Prasad", "B. R. Ambedkar", "Sardar Patel"], correct: 2 },
    ],
  },
];

export function seed(db: Database) {
  const adminEmail = "admin@learnzy.test";
  const adminPass = process.env.ADMIN_PASSWORD || "admin123";
  db.prepare(
    "INSERT INTO users (email, password_hash, name, phone, phone_verified, id_status, is_admin) VALUES (?, ?, ?, ?, 1, 'approved', 1)"
  ).run(adminEmail, bcrypt.hashSync(adminPass, 10), "Learnzy Admin", "+910000000000");

  const insertCourse = db.prepare(
    "INSERT INTO courses (slug, title, description, category, tier, price_inr, created_by) VALUES (?, ?, ?, ?, ?, ?, 'seed')"
  );
  const insertLesson = db.prepare(
    "INSERT INTO lessons (course_id, position, language, title, content) VALUES (?, ?, 'en', ?, ?)"
  );
  const insertQuestion = db.prepare(
    "INSERT INTO quiz_questions (course_id, question, options, correct_index) VALUES (?, ?, ?, ?)"
  );

  for (const c of courses) {
    const res = insertCourse.run(c.slug, c.title, c.description, c.category, c.tier, c.price_inr);
    const courseId = Number(res.lastInsertRowid);
    c.lessons.forEach((l, i) => insertLesson.run(courseId, i + 1, l.title, l.content));
    c.questions.forEach((qq) => insertQuestion.run(courseId, qq.q, JSON.stringify(qq.options), qq.correct));
  }
}
