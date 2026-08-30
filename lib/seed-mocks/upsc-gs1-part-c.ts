import type { MockQuestion } from "../seed-types";

// UPSC GS Paper I mock — Part C: Environment & Ecology (18),
// Science & Technology (10), International Relations & Misc (9).

const ENV = "Environment & Ecology";
const SCI = "Science & Technology";
const IR = "International Relations & Misc";

export const partC: MockQuestion[] = [
  {
    q: "Project Tiger, India's flagship tiger conservation programme, was launched in:",
    options: ["1969", "1973", "1980", "1986"],
    correct: 1,
    subject: ENV,
    explanation: "Project Tiger was launched on 1 April 1973, beginning with nine tiger reserves including Jim Corbett.",
  },
  {
    q: "The Ramsar Convention, to which India is a party, deals with the conservation of:",
    options: ["Tropical forests", "Wetlands", "Migratory birds only", "Coral reefs only"],
    correct: 1,
    subject: ENV,
    explanation:
      "Signed at Ramsar, Iran in 1971, the convention protects wetlands of international importance; India's Ramsar sites include Chilika and Keoladeo.",
  },
  {
    q: "The Montreal Protocol (1987) is an international agreement to:",
    options: [
      "Reduce greenhouse-gas emissions",
      "Phase out ozone-depleting substances",
      "Protect endangered species from trade",
      "Prevent marine oil pollution",
    ],
    correct: 1,
    subject: ENV,
    explanation:
      "The Montreal Protocol phases out ozone-depleting substances such as CFCs; it is widely considered the most successful environmental treaty.",
  },
  {
    q: "Under the Paris Agreement (2015), countries aim to hold the rise in global average temperature to:",
    options: [
      "Well below 2°C above pre-industrial levels, pursuing efforts for 1.5°C",
      "Below 3°C above pre-industrial levels",
      "Below 1°C above pre-industrial levels",
      "Zero warming by 2030",
    ],
    correct: 0,
    subject: ENV,
    explanation:
      "The Paris Agreement's goal is to keep warming well below 2°C above pre-industrial levels while pursuing efforts to limit it to 1.5°C.",
  },
  {
    q: "How many of the world's recognised biodiversity hotspots extend into India?",
    options: ["Two", "Three", "Four", "Six"],
    correct: 2,
    subject: ENV,
    explanation:
      "Four hotspots touch India: the Himalaya, Indo-Burma, the Western Ghats–Sri Lanka, and Sundaland (represented by the Nicobar Islands).",
  },
  {
    q: "The principal law for the protection of wild animals and plants in India is the:",
    options: [
      "Environment (Protection) Act, 1986",
      "Wildlife (Protection) Act, 1972",
      "Forest (Conservation) Act, 1980",
      "Biological Diversity Act, 2002",
    ],
    correct: 1,
    subject: ENV,
    explanation:
      "The Wildlife (Protection) Act, 1972 provides for national parks, sanctuaries, and schedules of protected species.",
  },
  {
    q: "Kaziranga National Park in Assam is best known for the conservation of the:",
    options: ["Asiatic lion", "Greater one-horned rhinoceros", "Snow leopard", "Nilgiri tahr"],
    correct: 1,
    subject: ENV,
    explanation:
      "Kaziranga, a UNESCO World Heritage Site on the Brahmaputra floodplains, holds the world's largest population of the greater one-horned rhinoceros.",
  },
  {
    q: "The only wild population of the Asiatic lion is found in:",
    options: ["Sundarbans, West Bengal", "Gir forest, Gujarat", "Ranthambore, Rajasthan", "Bandipur, Karnataka"],
    correct: 1,
    subject: ENV,
    explanation: "Gir National Park and the surrounding landscape in Gujarat hold the world's only wild Asiatic lions.",
  },
  {
    q: "Which of the following is NOT a greenhouse gas?",
    options: ["Carbon dioxide", "Methane", "Nitrous oxide", "Nitrogen"],
    correct: 3,
    subject: ENV,
    explanation:
      "Molecular nitrogen (N2), though 78% of the atmosphere, does not absorb infrared radiation and is not a greenhouse gas; CO2, CH4, and N2O all are.",
  },
  {
    q: "Eutrophication of a water body refers to:",
    options: [
      "Cooling of surface water",
      "Nutrient over-enrichment causing algal blooms and oxygen depletion",
      "Increase in salinity",
      "Accumulation of plastic waste",
    ],
    correct: 1,
    subject: ENV,
    explanation:
      "Excess nutrients (mainly nitrates and phosphates from sewage and fertilisers) trigger algal blooms whose decay exhausts dissolved oxygen, killing aquatic life.",
  },
  {
    q: "According to the 'ten per cent law' of ecology, about 10% of energy is transferred:",
    options: [
      "From one trophic level to the next",
      "From plants to the soil",
      "From the sun to producers",
      "From decomposers to producers",
    ],
    correct: 0,
    subject: ENV,
    explanation:
      "Lindeman's ten per cent law: only about a tenth of the energy at one trophic level passes to the next; the rest is lost, mainly as heat.",
  },
  {
    q: "Pneumatophores — roots that grow upward for breathing — are characteristic of:",
    options: ["Alpine meadows", "Mangrove vegetation", "Desert scrub", "Coniferous forests"],
    correct: 1,
    subject: ENV,
    explanation:
      "Mangroves growing in waterlogged, saline, intertidal mud develop pneumatophores (breathing roots) to obtain oxygen, as in the Sundarbans.",
  },
  {
    q: "Coral bleaching occurs primarily when corals:",
    options: [
      "Are attacked by starfish",
      "Expel their symbiotic algae (zooxanthellae) under heat stress",
      "Grow too fast for their skeletons",
      "Absorb excess nutrients",
    ],
    correct: 1,
    subject: ENV,
    explanation:
      "Elevated sea temperatures make corals expel the zooxanthellae that give them colour and food; prolonged bleaching kills the coral.",
  },
  {
    q: "The first Biosphere Reserve established in India (1986) was:",
    options: ["Sundarbans", "Nanda Devi", "Nilgiri", "Gulf of Mannar"],
    correct: 2,
    subject: ENV,
    explanation:
      "The Nilgiri Biosphere Reserve, spanning Tamil Nadu, Kerala, and Karnataka, was India's first, designated in 1986.",
  },
  {
    q: "The UN Framework Convention on Climate Change (UNFCCC) was adopted at:",
    options: ["The Stockholm Conference, 1972", "The Rio Earth Summit, 1992", "The Kyoto Conference, 1997", "COP21, Paris, 2015"],
    correct: 1,
    subject: ENV,
    explanation:
      "The UNFCCC was opened for signature at the Rio Earth Summit in 1992; its parties meet annually at the Conference of the Parties (COP).",
  },
  {
    q: "A species found naturally in only one geographic area and nowhere else is called:",
    options: ["A keystone species", "An endemic species", "An exotic species", "An indicator species"],
    correct: 1,
    subject: ENV,
    explanation:
      "Endemic species are confined to a particular region — for example, the lion-tailed macaque of the Western Ghats.",
  },
  {
    q: "A species whose impact on its ecosystem is disproportionately large relative to its abundance is called:",
    options: ["A pioneer species", "A keystone species", "An invasive species", "A climax species"],
    correct: 1,
    subject: ENV,
    explanation:
      "Keystone species (like sea otters or elephants) hold ecosystems together; removing them causes changes far beyond their numbers.",
  },
  {
    q: "PM2.5, a key measure of air pollution, refers to particulate matter with a diameter of:",
    options: ["2.5 centimetres or less", "2.5 millimetres or less", "2.5 micrometres or less", "2.5 nanometres or less"],
    correct: 2,
    subject: ENV,
    explanation:
      "PM2.5 particles measure 2.5 micrometres or less — small enough to penetrate deep into the lungs and enter the bloodstream.",
  },

  // ---------------- Science & Technology ----------------
  {
    q: "The double-helix structure of DNA was proposed by:",
    options: ["Watson and Crick", "Darwin and Wallace", "Mendel and Morgan", "Pasteur and Koch"],
    correct: 0,
    subject: SCI,
    explanation:
      "James Watson and Francis Crick described DNA's double helix in 1953, building on X-ray data from Rosalind Franklin and Maurice Wilkins.",
  },
  {
    q: "Vaccines protect against disease primarily by:",
    options: [
      "Killing pathogens directly in the bloodstream",
      "Training the immune system to recognise a pathogen and produce antibodies",
      "Blocking all foreign substances from entering cells",
      "Replacing damaged cells with healthy ones",
    ],
    correct: 1,
    subject: SCI,
    explanation:
      "A vaccine presents a harmless form or fragment of a pathogen so the immune system builds antibodies and memory cells before real infection occurs.",
  },
  {
    q: "A light year is a unit of:",
    options: ["Time", "Distance", "Speed", "Brightness"],
    correct: 1,
    subject: SCI,
    explanation:
      "A light year is the distance light travels in one year — about 9.46 trillion kilometres.",
  },
  {
    q: "India's Chandrayaan-3 mission (August 2023) achieved:",
    options: [
      "The first Indian crewed spaceflight",
      "A soft landing near the lunar south pole region",
      "A sample return from the Moon",
      "An orbit around Mars",
    ],
    correct: 1,
    subject: SCI,
    explanation:
      "On 23 August 2023 the Vikram lander touched down in the Moon's south polar region and deployed the Pragyan rover — the first landing in that region by any nation.",
  },
  {
    q: "India's first satellite, launched in 1975, was named:",
    options: ["Bhaskara", "Rohini", "Aryabhata", "INSAT-1A"],
    correct: 2,
    subject: SCI,
    explanation: "Aryabhata, named after the ancient Indian astronomer, was launched on 19 April 1975 by a Soviet rocket.",
  },
  {
    q: "The element most widely used to make semiconductor chips is:",
    options: ["Copper", "Silicon", "Aluminium", "Iron"],
    correct: 1,
    subject: SCI,
    explanation:
      "Silicon's semiconductor properties and abundance make it the base material of almost all modern chips.",
  },
  {
    q: "Antibiotics are effective against:",
    options: ["Viruses only", "Bacteria only", "Both bacteria and viruses", "All micro-organisms including fungi"],
    correct: 1,
    subject: SCI,
    explanation:
      "Antibiotics target bacterial structures and processes; they do nothing against viruses, which is why they cannot cure colds or influenza.",
  },
  {
    q: "Sound waves cannot travel through:",
    options: ["Water", "Steel", "Air", "A vacuum"],
    correct: 3,
    subject: SCI,
    explanation:
      "Sound is a mechanical wave and needs a medium; in the vacuum of space there are no particles to carry it.",
  },
  {
    q: "Scurvy is caused by the deficiency of:",
    options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
    correct: 2,
    subject: SCI,
    explanation:
      "Vitamin C (ascorbic acid) deficiency causes scurvy — bleeding gums and poor wound healing. Vitamin D deficiency causes rickets.",
  },
  {
    q: "In computing, 'machine learning' refers to systems that:",
    options: [
      "Follow only fixed, hand-written rules",
      "Learn patterns from data and improve with experience",
      "Physically assemble other machines",
      "Translate programs into machine code",
    ],
    correct: 1,
    subject: SCI,
    explanation:
      "Machine learning algorithms infer patterns from data rather than relying solely on explicitly programmed rules, improving as they see more examples.",
  },

  // ---------------- International Relations & Misc ----------------
  {
    q: "Which of the following is NOT a permanent member of the UN Security Council?",
    options: ["France", "Germany", "Russia", "China"],
    correct: 1,
    subject: IR,
    explanation:
      "The five permanent members are China, France, Russia, the United Kingdom, and the United States. Germany is not among them.",
  },
  {
    q: "The national song 'Vande Mataram' was composed by:",
    options: ["Rabindranath Tagore", "Bankim Chandra Chattopadhyay", "Sarojini Naidu", "Subramania Bharati"],
    correct: 1,
    subject: IR,
    explanation:
      "'Vande Mataram' comes from Bankim Chandra Chattopadhyay's novel Anandamath (1882); the national anthem 'Jana Gana Mana' is by Rabindranath Tagore.",
  },
  {
    q: "The first Asian to win a Nobel Prize was:",
    options: ["C. V. Raman", "Rabindranath Tagore", "Mother Teresa", "Har Gobind Khorana"],
    correct: 1,
    subject: IR,
    explanation:
      "Rabindranath Tagore won the Nobel Prize in Literature in 1913 for Gitanjali — the first Nobel awarded to an Asian.",
  },
  {
    q: "The International Court of Justice has its seat at:",
    options: ["Geneva", "New York", "The Hague", "Vienna"],
    correct: 2,
    subject: IR,
    explanation:
      "The ICJ, the principal judicial organ of the UN, sits at the Peace Palace in The Hague, Netherlands.",
  },
  {
    q: "The SAARC Secretariat is located in:",
    options: ["New Delhi", "Colombo", "Dhaka", "Kathmandu"],
    correct: 3,
    subject: IR,
    explanation:
      "The South Asian Association for Regional Cooperation, founded in 1985, has its secretariat in Kathmandu, Nepal.",
  },
  {
    q: "India hosted the G20 Leaders' Summit in 2023 in:",
    options: ["Mumbai", "New Delhi", "Bengaluru", "Hyderabad"],
    correct: 1,
    subject: IR,
    explanation:
      "Under India's G20 presidency, the summit was held in New Delhi in September 2023 and adopted the New Delhi Leaders' Declaration.",
  },
  {
    q: "The Human Development Index (HDI) is published by:",
    options: ["The World Bank", "The IMF", "UNDP", "The WTO"],
    correct: 2,
    subject: IR,
    explanation:
      "The UN Development Programme's HDI combines life expectancy, education, and per-capita income into one measure of development.",
  },
  {
    q: "The first complete, synchronous Census of India was conducted in:",
    options: ["1872", "1881", "1901", "1951"],
    correct: 1,
    subject: IR,
    explanation:
      "A partial census took place in 1872, but 1881 marked the first complete synchronous census; it has been decennial since.",
  },
  {
    q: "The 'Panchsheel' principles of peaceful coexistence were first formally set out in a 1954 agreement between India and:",
    options: ["The Soviet Union", "China", "Pakistan", "The United States"],
    correct: 1,
    subject: IR,
    explanation:
      "The five principles — including mutual respect for sovereignty and non-interference — were enshrined in the 1954 India–China agreement on Tibet.",
  },
];
