import type { MockQuestion } from "../seed-types";

// UPSC GS Paper I mock — Part B: Geography (12) + Indian Economy (15).

const GEO = "Geography";
const ECON = "Indian Economy";

export const partB: MockQuestion[] = [
  {
    q: "The Tropic of Cancer does NOT pass through which of the following states?",
    options: ["Gujarat", "Rajasthan", "Bihar", "Mizoram"],
    correct: 2,
    subject: GEO,
    explanation:
      "The Tropic of Cancer crosses eight states — Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram. Bihar lies wholly north of it.",
  },
  {
    q: "Indian Standard Time is based on the meridian 82°30'E, which passes close to:",
    options: ["Allahabad region (Mirzapur), Uttar Pradesh", "Bhopal, Madhya Pradesh", "Nagpur, Maharashtra", "Ranchi, Jharkhand"],
    correct: 0,
    subject: GEO,
    explanation:
      "IST (GMT +5:30) is reckoned from the 82°30'E meridian, which passes through Mirzapur in Uttar Pradesh.",
  },
  {
    q: "The highest mountain peak lying entirely within Indian territory is:",
    options: ["Kanchenjunga", "Nanda Devi", "Kamet", "Trisul"],
    correct: 1,
    subject: GEO,
    explanation:
      "Nanda Devi (7,816 m) in Uttarakhand is the highest peak entirely within India; Kanchenjunga (8,586 m), though higher, stands on the India–Nepal border.",
  },
  {
    q: "Anamudi, the highest peak of peninsular India, is located in the:",
    options: ["Eastern Ghats", "Western Ghats", "Aravalli Range", "Satpura Range"],
    correct: 1,
    subject: GEO,
    explanation: "Anamudi (2,695 m) rises in the Anaimalai Hills of the Western Ghats, in Kerala.",
  },
  {
    q: "The river Ganga is formed by the confluence of the Bhagirathi and the Alaknanda at:",
    options: ["Rudraprayag", "Devprayag", "Haridwar", "Rishikesh"],
    correct: 1,
    subject: GEO,
    explanation:
      "The Bhagirathi (rising from Gangotri glacier) meets the Alaknanda at Devprayag in Uttarakhand; downstream of this confluence the river is called the Ganga.",
  },
  {
    q: "The Brahmaputra is known in Tibet as the:",
    options: ["Indus", "Sutlej", "Yarlung Tsangpo", "Teesta"],
    correct: 2,
    subject: GEO,
    explanation:
      "The river rises near Mansarovar and flows through Tibet as the Yarlung Tsangpo, entering India in Arunachal Pradesh as the Siang/Dihang.",
  },
  {
    q: "Which place receives the highest average annual rainfall in India?",
    options: ["Cherrapunji (Sohra)", "Mawsynram", "Agumbe", "Pasighat"],
    correct: 1,
    subject: GEO,
    explanation:
      "Mawsynram in the Khasi Hills of Meghalaya records the highest average annual rainfall in India (roughly 11,000–12,000 mm), slightly ahead of nearby Cherrapunji.",
  },
  {
    q: "Black soil (regur), formed from Deccan basalt, is best suited for the cultivation of:",
    options: ["Tea", "Cotton", "Jute", "Saffron"],
    correct: 1,
    subject: GEO,
    explanation:
      "Regur soil's moisture retention and self-ploughing character make it ideal for cotton — hence the name 'black cotton soil'.",
  },
  {
    q: "Chilika, the largest brackish-water lagoon in India, lies in the state of:",
    options: ["West Bengal", "Andhra Pradesh", "Odisha", "Tamil Nadu"],
    correct: 2,
    subject: GEO,
    explanation:
      "Chilika Lake in Odisha is Asia's largest brackish-water lagoon and a Ramsar wetland famous for migratory birds and Irrawaddy dolphins.",
  },
  {
    q: "The Sundarbans delta is formed by which river system?",
    options: ["Godavari–Krishna", "Ganga–Brahmaputra", "Mahanadi–Brahmani", "Narmada–Tapi"],
    correct: 1,
    subject: GEO,
    explanation:
      "The Sundarbans, the world's largest mangrove forest and home of the Royal Bengal tiger, is the seaward part of the Ganga–Brahmaputra delta shared by India and Bangladesh.",
  },
  {
    q: "On 21 June (summer solstice), the midday sun is directly overhead at:",
    options: ["The Equator", "The Tropic of Cancer", "The Tropic of Capricorn", "The Arctic Circle"],
    correct: 1,
    subject: GEO,
    explanation:
      "At the June solstice the sun's vertical rays fall on the Tropic of Cancer (23.5°N), giving the northern hemisphere its longest day.",
  },
  {
    q: "The longest river of peninsular India, often called the 'Dakshin Ganga', is the:",
    options: ["Krishna", "Kaveri", "Godavari", "Narmada"],
    correct: 2,
    subject: GEO,
    explanation:
      "The Godavari (about 1,465 km), rising at Trimbakeshwar in Maharashtra and flowing to the Bay of Bengal, is peninsular India's longest river.",
  },

  // ---------------- Indian Economy ----------------
  {
    q: "The Reserve Bank of India commenced operations in 1935 and was nationalised in:",
    options: ["1947", "1949", "1955", "1969"],
    correct: 1,
    subject: ECON,
    explanation:
      "The RBI, established under the RBI Act 1934, began operations on 1 April 1935 and was nationalised on 1 January 1949.",
  },
  {
    q: "The 'repo rate' is best described as the rate at which:",
    options: [
      "Banks lend to their best customers",
      "The RBI lends short-term funds to commercial banks against securities",
      "Banks park surplus funds with the RBI",
      "The government borrows from the public",
    ],
    correct: 1,
    subject: ECON,
    explanation:
      "The repo rate is the RBI's short-term lending rate to banks against government securities; the reverse repo is the rate at which banks park funds with the RBI.",
  },
  {
    q: "Under India's flexible inflation-targeting framework, the Monetary Policy Committee targets CPI inflation of:",
    options: ["2%, with a band of 1–3%", "4%, with a band of 2–6%", "5%, with a band of 4–6%", "6%, with a band of 5–7%"],
    correct: 1,
    subject: ECON,
    explanation:
      "The statutory target is 4% CPI inflation with a tolerance band of ±2 percentage points (2–6%), pursued by the six-member Monetary Policy Committee.",
  },
  {
    q: "Gross Domestic Product (GDP) measures the market value of:",
    options: [
      "All goods and services traded in an economy",
      "Final goods and services produced within a country's domestic territory in a period",
      "Goods and services produced by a country's citizens anywhere in the world",
      "Total exports minus total imports",
    ],
    correct: 1,
    subject: ECON,
    explanation:
      "GDP counts final goods and services produced within the domestic territory, regardless of who produces them; production by citizens worldwide is GNP.",
  },
  {
    q: "Fiscal deficit is defined as:",
    options: [
      "Total expenditure minus total receipts excluding borrowings",
      "Revenue expenditure minus revenue receipts",
      "Total expenditure minus tax revenue",
      "Government borrowing from the RBI alone",
    ],
    correct: 0,
    subject: ECON,
    explanation:
      "Fiscal deficit = total expenditure − total receipts excluding borrowings; it indicates the government's total borrowing requirement. Option 2 defines the revenue deficit.",
  },
  {
    q: "NITI Aayog, established on 1 January 2015, replaced which body?",
    options: ["The Finance Commission", "The Planning Commission", "The National Development Council", "The Economic Advisory Council"],
    correct: 1,
    subject: ECON,
    explanation:
      "NITI Aayog replaced the Planning Commission (set up in 1950) as the government's policy think tank; the Finance Commission is a separate constitutional body that continues.",
  },
  {
    q: "The Green Revolution in India is most closely associated with:",
    options: [
      "High-yielding varieties of wheat and rice in the 1960s",
      "Expansion of dairy production",
      "Growth of the software industry",
      "Nationalisation of banks",
    ],
    correct: 0,
    subject: ECON,
    explanation:
      "The Green Revolution introduced high-yielding seed varieties, irrigation, and fertilisers — led in India by M. S. Swaminathan, building on Norman Borlaug's work. Dairy expansion was the White Revolution (Operation Flood).",
  },
  {
    q: "Which body regulates the securities market in India?",
    options: ["RBI", "SEBI", "IRDAI", "NABARD"],
    correct: 1,
    subject: ECON,
    explanation:
      "The Securities and Exchange Board of India (statutory since 1992) regulates stock exchanges and protects investors. IRDAI covers insurance and NABARD agricultural credit.",
  },
  {
    q: "The Cash Reserve Ratio (CRR) is the share of a bank's deposits that must be:",
    options: [
      "Invested in government securities",
      "Held as cash with the RBI",
      "Lent to priority sectors",
      "Kept as gold reserves",
    ],
    correct: 1,
    subject: ECON,
    explanation:
      "CRR is the fraction of net demand and time liabilities banks must maintain as cash balances with the RBI. Holding in approved securities is the Statutory Liquidity Ratio (SLR).",
  },
  {
    q: "Agriculture, forestry, and fishing belong to which sector of the economy?",
    options: ["Primary", "Secondary", "Tertiary", "Quaternary"],
    correct: 0,
    subject: ECON,
    explanation:
      "Activities that draw products directly from nature form the primary sector; manufacturing is secondary and services tertiary.",
  },
  {
    q: "In 1969, the Government of India nationalised:",
    options: ["The Reserve Bank of India", "14 major commercial banks", "The Life Insurance Corporation", "The coal industry"],
    correct: 1,
    subject: ECON,
    explanation:
      "Fourteen major commercial banks were nationalised in July 1969 (six more in 1980). The RBI was nationalised in 1949, LIC formed in 1956, and coal nationalised in the early 1970s.",
  },
  {
    q: "Other things equal, a depreciation of the rupee tends to make:",
    options: [
      "Exports cheaper for foreign buyers and imports costlier",
      "Exports costlier and imports cheaper",
      "Both exports and imports cheaper",
      "Both exports and imports costlier",
    ],
    correct: 0,
    subject: ECON,
    explanation:
      "A weaker rupee lowers the foreign-currency price of Indian goods (helping exports) and raises the rupee cost of foreign goods (hurting imports).",
  },
  {
    q: "The International Monetary Fund and the World Bank were established following which conference?",
    options: ["Yalta Conference", "Bretton Woods Conference, 1944", "Geneva Convention", "Doha Round"],
    correct: 1,
    subject: ECON,
    explanation:
      "The Bretton Woods Conference (New Hampshire, 1944) created the IMF and the International Bank for Reconstruction and Development (World Bank); both are headquartered in Washington, D.C.",
  },
  {
    q: "The World Trade Organization (WTO) came into existence in 1995 as the successor to:",
    options: ["The League of Nations", "GATT", "UNCTAD", "The Bretton Woods system"],
    correct: 1,
    subject: ECON,
    explanation:
      "The WTO, headquartered in Geneva, replaced the General Agreement on Tariffs and Trade (GATT, 1948) after the Uruguay Round.",
  },
  {
    q: "Which of the following is a DIRECT tax?",
    options: ["Goods and Services Tax", "Customs duty", "Income tax", "Excise duty"],
    correct: 2,
    subject: ECON,
    explanation:
      "Income tax is paid directly by the person on whom it is levied. GST, customs, and excise are indirect taxes whose burden is passed on in prices.",
  },
];
