import type { MockQuestion } from "../seed-types";

// UPSC GS Paper I mock — Part A: Indian Polity (18) + History & Culture (18).
// Every fact is a stable, standard reference fact; explanations cite the
// specific article, date, or source so answers can be independently checked.

const POLITY = "Indian Polity";
const HISTORY = "History & Culture";

export const partA: MockQuestion[] = [
  {
    q: "The Constituent Assembly of India held its first meeting on:",
    options: ["15 August 1947", "9 December 1946", "26 January 1950", "26 November 1949"],
    correct: 1,
    subject: POLITY,
    explanation:
      "The Constituent Assembly first met on 9 December 1946 with Dr. Sachchidananda Sinha as interim President; Dr. Rajendra Prasad was elected President on 11 December 1946.",
  },
  {
    q: "Consider the following statements about the Preamble: 1. The words 'Socialist' and 'Secular' were part of the Preamble as adopted in 1949. 2. These words were inserted by the 42nd Constitutional Amendment. Which of the statements is/are correct?",
    options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
    correct: 1,
    subject: POLITY,
    explanation:
      "The original Preamble did not contain 'Socialist' and 'Secular'; both were inserted (along with 'Integrity') by the 42nd Amendment Act, 1976.",
  },
  {
    q: "Fundamental Rights are contained in which Part and Articles of the Constitution?",
    options: ["Part III, Articles 12–35", "Part IV, Articles 36–51", "Part II, Articles 5–11", "Part IVA, Article 51A"],
    correct: 0,
    subject: POLITY,
    explanation:
      "Fundamental Rights occupy Part III (Articles 12–35). Part IV holds the Directive Principles and Part IVA the Fundamental Duties.",
  },
  {
    q: "Which Article did Dr. B. R. Ambedkar describe as the 'heart and soul of the Constitution'?",
    options: ["Article 14", "Article 19", "Article 21", "Article 32"],
    correct: 3,
    subject: POLITY,
    explanation:
      "Article 32, the Right to Constitutional Remedies, lets citizens move the Supreme Court directly to enforce Fundamental Rights; Ambedkar called it the heart and soul of the Constitution.",
  },
  {
    q: "Consider the following statements about a Money Bill: 1. It can be introduced only in the Lok Sabha. 2. The Rajya Sabha can amend it. 3. The Rajya Sabha must return it within 14 days. Which statements are correct?",
    options: ["1 and 2 only", "1 and 3 only", "2 and 3 only", "1, 2 and 3"],
    correct: 1,
    subject: POLITY,
    explanation:
      "Under Article 110, a Money Bill is introduced only in the Lok Sabha; the Rajya Sabha can only recommend changes (not amend) and must return the bill within 14 days.",
  },
  {
    q: "The electoral college for the election of the President of India consists of:",
    options: [
      "All members of both Houses of Parliament",
      "Elected members of both Houses of Parliament only",
      "Elected MPs and elected MLAs of states and of union territories with legislatures",
      "Elected MPs, all MLAs, and all members of state legislative councils",
    ],
    correct: 2,
    subject: POLITY,
    explanation:
      "Article 54: the President is elected by an electoral college of the elected members of both Houses of Parliament and the elected members of the legislative assemblies of states and of union territories having legislatures. Nominated members do not vote.",
  },
  {
    q: "Which one of the following statements about the Rajya Sabha is INCORRECT?",
    options: [
      "It is a permanent body and is not subject to dissolution",
      "One-third of its members retire every two years",
      "Its maximum strength is 250",
      "It can be dissolved by the President",
    ],
    correct: 3,
    subject: POLITY,
    explanation:
      "The Rajya Sabha is a continuing chamber that cannot be dissolved; only the Lok Sabha is subject to dissolution.",
  },
  {
    q: "National Emergency under Article 352 has been proclaimed in India:",
    options: ["Once", "Twice", "Three times", "Never"],
    correct: 2,
    subject: POLITY,
    explanation: "Three proclamations: 1962 (China war), 1971 (Pakistan war), and 1975 (internal disturbance).",
  },
  {
    q: "Financial Emergency under Article 360:",
    options: [
      "Has been proclaimed once, in 1991",
      "Has been proclaimed twice",
      "Has never been proclaimed",
      "Was proclaimed along with the 1975 Emergency",
    ],
    correct: 2,
    subject: POLITY,
    explanation: "A Financial Emergency under Article 360 has never been proclaimed in India.",
  },
  {
    q: "The Directive Principles of State Policy were borrowed from the Constitution of:",
    options: ["The United States", "Ireland", "Canada", "Australia"],
    correct: 1,
    subject: POLITY,
    explanation: "The Directive Principles (Part IV) were inspired by the Irish Constitution, which itself drew on the Spanish Constitution.",
  },
  {
    q: "How many Fundamental Duties does the Constitution currently list?",
    options: ["9", "10", "11", "12"],
    correct: 2,
    subject: POLITY,
    explanation:
      "The 42nd Amendment (1976) added ten duties on the Swaran Singh Committee's recommendation; the 86th Amendment (2002) added the eleventh (education of children aged 6–14).",
  },
  {
    q: "The 73rd Constitutional Amendment Act, 1992 relates to:",
    options: ["Urban local bodies", "Panchayati Raj institutions", "The anti-defection law", "The Goods and Services Tax"],
    correct: 1,
    subject: POLITY,
    explanation:
      "The 73rd Amendment gave constitutional status to Panchayati Raj, adding Part IX and the Eleventh Schedule (29 subjects). The 74th Amendment covered urban local bodies.",
  },
  {
    q: "Judges of the Supreme Court of India hold office until the age of:",
    options: ["60 years", "62 years", "65 years", "70 years"],
    correct: 2,
    subject: POLITY,
    explanation: "Supreme Court judges retire at 65; High Court judges at 62.",
  },
  {
    q: "The writ of habeas corpus is a remedy against:",
    options: ["Unlawful detention", "Excess of jurisdiction by a lower court", "Failure to perform a public duty", "Usurpation of a public office"],
    correct: 0,
    subject: POLITY,
    explanation:
      "Habeas corpus ('to have the body') orders a detaining authority to produce the detained person and justify the detention; it protects personal liberty against unlawful detention.",
  },
  {
    q: "Consider the following statements about the Vice-President of India: 1. He is the ex-officio Chairman of the Rajya Sabha. 2. He is elected by an electoral college consisting of members of both Houses of Parliament. Which is/are correct?",
    options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
    correct: 2,
    subject: POLITY,
    explanation:
      "Both are correct (Articles 64 and 66). Unlike the President's election, nominated MPs also vote for the Vice-President, and state legislatures play no part.",
  },
  {
    q: "The Ninth Schedule was added to the Constitution by the:",
    options: ["First Amendment, 1951", "24th Amendment, 1971", "42nd Amendment, 1976", "44th Amendment, 1978"],
    correct: 0,
    subject: POLITY,
    explanation:
      "The First Constitutional Amendment (1951) added the Ninth Schedule to protect land-reform laws from judicial review.",
  },
  {
    q: "The anti-defection law is contained in which Schedule of the Constitution?",
    options: ["Eighth Schedule", "Ninth Schedule", "Tenth Schedule", "Twelfth Schedule"],
    correct: 2,
    subject: POLITY,
    explanation: "The 52nd Amendment Act, 1985 inserted the Tenth Schedule, commonly called the anti-defection law.",
  },
  {
    q: "The Goods and Services Tax (GST) was introduced by which Constitutional Amendment, and who chairs the GST Council?",
    options: [
      "100th Amendment; the Prime Minister",
      "101st Amendment; the Union Finance Minister",
      "102nd Amendment; the RBI Governor",
      "101st Amendment; the President",
    ],
    correct: 1,
    subject: POLITY,
    explanation:
      "The 101st Constitutional Amendment Act (2016) introduced GST; Article 279A establishes the GST Council chaired by the Union Finance Minister.",
  },

  // ---------------- History & Culture ----------------
  {
    q: "The 'Great Bath' of the Indus Valley Civilisation was discovered at:",
    options: ["Harappa", "Mohenjo-daro", "Lothal", "Kalibangan"],
    correct: 1,
    subject: HISTORY,
    explanation: "The Great Bath, a large watertight public bathing structure, is the best-known monument of Mohenjo-daro (in present-day Sindh, Pakistan).",
  },
  {
    q: "Which is the oldest of the four Vedas?",
    options: ["Samaveda", "Yajurveda", "Rigveda", "Atharvaveda"],
    correct: 2,
    subject: HISTORY,
    explanation: "The Rigveda, a collection of 1,028 hymns in ten mandalas, is the oldest Veda and the earliest major text of India.",
  },
  {
    q: "Gautama Buddha delivered his first sermon, the Dhammachakkappavattana, at:",
    options: ["Bodh Gaya", "Sarnath", "Lumbini", "Kushinagar"],
    correct: 1,
    subject: HISTORY,
    explanation:
      "The first sermon ('Turning of the Wheel of Law') was delivered at Sarnath near Varanasi. Buddha was born at Lumbini, enlightened at Bodh Gaya, and died at Kushinagar.",
  },
  {
    q: "The Kalinga War, which transformed Emperor Ashoka, is described in:",
    options: ["The Arthashastra", "Major Rock Edict XIII", "The Indica of Megasthenes", "The Allahabad Pillar inscription"],
    correct: 1,
    subject: HISTORY,
    explanation:
      "Ashoka's remorse after the Kalinga War (c. 261 BCE) and his turn to dhamma are recorded in his own Major Rock Edict XIII.",
  },
  {
    q: "The Arthashastra, an ancient treatise on statecraft and economy, was written by:",
    options: ["Kalidasa", "Banabhatta", "Kautilya", "Vishakhadatta"],
    correct: 2,
    subject: HISTORY,
    explanation:
      "The Arthashastra is attributed to Kautilya (also called Chanakya or Vishnugupta), minister of Chandragupta Maurya.",
  },
  {
    q: "The Chinese pilgrim Fa-Hien visited India during the reign of:",
    options: ["Ashoka", "Kanishka", "Chandragupta II", "Harshavardhana"],
    correct: 2,
    subject: HISTORY,
    explanation:
      "Fa-Hien (Faxian) travelled in India in the early fifth century CE, during the reign of Chandragupta II of the Gupta dynasty. Hiuen Tsang came later, under Harsha.",
  },
  {
    q: "The construction of the Qutub Minar in Delhi was begun by:",
    options: ["Iltutmish", "Qutb-ud-din Aibak", "Alauddin Khalji", "Balban"],
    correct: 1,
    subject: HISTORY,
    explanation:
      "Qutb-ud-din Aibak, founder of the Delhi Sultanate's Mamluk (Slave) dynasty in 1206, began the Qutub Minar; his successor Iltutmish completed it.",
  },
  {
    q: "Din-i Ilahi, a syncretic religious order, was promulgated by:",
    options: ["Babur", "Humayun", "Akbar", "Aurangzeb"],
    correct: 2,
    subject: HISTORY,
    explanation: "Akbar promulgated Din-i Ilahi in 1582 after his religious discussions in the Ibadat Khana at Fatehpur Sikri.",
  },
  {
    q: "The Battle of Plassey (1757) was fought between the East India Company under Robert Clive and:",
    options: ["Tipu Sultan", "Siraj-ud-Daulah", "Mir Qasim", "Shuja-ud-Daulah"],
    correct: 1,
    subject: HISTORY,
    explanation:
      "Clive defeated Siraj-ud-Daulah, the Nawab of Bengal, at Plassey in June 1757, laying the foundation of British political power in India.",
  },
  {
    q: "The Revolt of 1857 began at Meerut on:",
    options: ["10 May 1857", "13 April 1857", "15 August 1857", "1 November 1858"],
    correct: 0,
    subject: HISTORY,
    explanation:
      "Sepoys at Meerut rose on 10 May 1857 and marched to Delhi, proclaiming Bahadur Shah Zafar their symbolic leader.",
  },
  {
    q: "Who presided over the first session of the Indian National Congress in 1885?",
    options: ["Allan Octavian Hume", "Dadabhai Naoroji", "W. C. Bonnerjee", "Surendranath Banerjea"],
    correct: 2,
    subject: HISTORY,
    explanation:
      "The first session met in Bombay in December 1885 under the presidency of W. C. Bonnerjee; A. O. Hume was the founder-organiser, not the president.",
  },
  {
    q: "The Partition of Bengal in 1905, which sparked the Swadeshi Movement, was carried out by:",
    options: ["Lord Ripon", "Lord Curzon", "Lord Minto", "Lord Hardinge"],
    correct: 1,
    subject: HISTORY,
    explanation: "Viceroy Lord Curzon partitioned Bengal in 1905; the decision ignited the Swadeshi and Boycott movements and was annulled in 1911.",
  },
  {
    q: "The Jallianwala Bagh massacre took place on:",
    options: ["13 April 1919", "13 April 1920", "10 May 1919", "23 March 1919"],
    correct: 0,
    subject: HISTORY,
    explanation:
      "On 13 April 1919 (Baisakhi day), troops under General Dyer fired on an unarmed gathering at Jallianwala Bagh, Amritsar.",
  },
  {
    q: "Gandhi's Dandi March of 1930 was undertaken to protest against:",
    options: ["The Rowlatt Act", "The salt tax", "The Simon Commission", "The Partition of Bengal"],
    correct: 1,
    subject: HISTORY,
    explanation:
      "Gandhi marched from Sabarmati Ashram to Dandi (12 March – 6 April 1930) and broke the salt law, launching the Civil Disobedience Movement.",
  },
  {
    q: "The Quit India Movement was launched on:",
    options: ["26 January 1930", "8 August 1942", "15 August 1947", "9 August 1925"],
    correct: 1,
    subject: HISTORY,
    explanation:
      "The Quit India resolution was passed in Bombay on 8 August 1942, with Gandhi's call of 'Do or Die'; the leadership was arrested within hours.",
  },
  {
    q: "The Ajanta caves, famous for ancient Buddhist paintings, are located in:",
    options: ["Madhya Pradesh", "Maharashtra", "Karnataka", "Odisha"],
    correct: 1,
    subject: HISTORY,
    explanation: "The Ajanta caves in Maharashtra, a UNESCO World Heritage Site, preserve Buddhist rock-cut architecture and murals from roughly the 2nd century BCE to the 6th century CE.",
  },
  {
    q: "The Great Stupa at Sanchi, originally commissioned by Emperor Ashoka, stands in the present-day state of:",
    options: ["Bihar", "Uttar Pradesh", "Madhya Pradesh", "Gujarat"],
    correct: 2,
    subject: HISTORY,
    explanation: "Sanchi, near Bhopal in Madhya Pradesh, houses the Great Stupa begun under Ashoka in the 3rd century BCE; it is a UNESCO World Heritage Site.",
  },
  {
    q: "The classical dance form Kathakali belongs to the state of:",
    options: ["Tamil Nadu", "Kerala", "Odisha", "Andhra Pradesh"],
    correct: 1,
    subject: HISTORY,
    explanation:
      "Kathakali is Kerala's classical dance-drama. Bharatanatyam belongs to Tamil Nadu, Odissi to Odisha, and Kuchipudi to Andhra Pradesh.",
  },
];
