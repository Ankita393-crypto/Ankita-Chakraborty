import type { SeedCourse } from "../seed-types";

// English Language & Comprehension for government exams.
// Grammar rules follow standard reference grammars; vocabulary meanings
// match standard dictionaries. No invented rules or meanings.
export const englishGovtExams: SeedCourse = {
  slug: "english-govt-exams",
  title: "English for Govt Exams",
  description:
    "English Language and Comprehension for SSC CGL/CHSL, IBPS, and SBI exams: grammar rules for error spotting, vocabulary, idioms, one-word substitutions, voice and narration, and reading strategy, with exam-style practice.",
  category: "certprep",
  tier: 4,
  price_inr: 499,
  lessons: [
    {
      title: "Subject–Verb Agreement",
      content: `The verb must agree with its subject in number: a singular subject takes a singular verb, a plural subject a plural verb. "The quality of the mangoes WAS poor" — the subject is quality (singular), not mangoes; ignore the prepositional phrase between subject and verb. This "attractor noun" trap accounts for a large share of error-spotting questions.

Special singular subjects: each, every, either, neither, anyone, everyone, and nobody all take singular verbs — "Each of the boys HAS a bat", "Neither of the answers IS correct". Two subjects joined by "and" normally take a plural verb, but when they name one idea or person they stay singular: "Bread and butter IS my breakfast", "The poet and philosopher HAS arrived" (one person holds both roles).

With "either…or" and "neither…nor", the verb agrees with the NEARER subject: "Neither the captain nor the players WERE ready", but "Neither the players nor the captain WAS ready". Collective nouns (team, committee, jury, family) take a singular verb when acting as one body ("The jury HAS reached its verdict") and a plural verb when members act separately ("The jury WERE divided in their opinions").

Watch four repeat offenders: "news", "physics", "mathematics", and "economics" are singular despite the -s ("No news IS good news"); "scissors", "trousers", and "spectacles" are plural; amounts of money, distance, and time are singular as single units ("Five kilometres IS a long walk"); and "one of the + plural noun" takes a singular verb because the true subject is "one" ("One of my friends IS a doctor"). Master this chapter first — it feeds directly into error spotting, sentence improvement, and fill-in-the-blanks.`,
    },
    {
      title: "Tenses and the Sequence of Tenses",
      content: `English has three times (past, present, future), each with four aspects (simple, continuous, perfect, perfect continuous). The exam cares most about the boundaries between them. Present perfect ("has finished") connects past action to the present and NEVER sits with a finished-time adverb: "I have met him yesterday" is wrong; say "I met him yesterday". Conversely, with "since" or "for" plus continuing action, use the perfect continuous: "She has been living here since 2015."

The sequence-of-tenses rule: a past tense in the main clause pulls the subordinate clause into the past — "He said that he WAS tired", not "is tired". The exception is a universal truth, which stays present: "The teacher said that the earth REVOLVES around the sun." Time clauses after "when", "after", "as soon as", and "until" refuse the future tense: "I will call you when I REACH home", not "when I will reach".

Conditionals follow three fixed patterns. First (real future): "If it rains, we WILL stay home." Second (unreal present): "If I WERE you, I WOULD accept the offer" — note "were" for all persons. Third (unreal past): "If she HAD studied, she WOULD HAVE passed." Mixing the patterns ("If I would have known…") is always wrong in standard English, and error-spotting questions test exactly this.

Stative verbs — know, believe, own, like, understand, belong — resist the continuous form: "I KNOW the answer", never "I am knowing the answer". Also distinguish "used to + verb" (past habit: "He used to smoke") from "be used to + -ing" (accustomed: "He is used to smoking"). A tense error appears in nearly every SSC error-spotting set, so rehearse these boundaries until violations look visibly wrong to you.`,
    },
    {
      title: "Articles and Prepositions",
      content: `Use "a" before consonant SOUNDS and "an" before vowel SOUNDS — the sound decides, not the letter: a university, a European, a one-rupee coin (all begin with consonant sounds), but an hour, an honest man, an MLA (vowel sounds). "The" marks something definite or already mentioned, and also unique objects (the sun, the Ganga), superlatives (the best), ordinals (the first), and inventions or species used generically ("The telephone changed the world").

Zero article (no article) is the trickiest: languages ("She speaks English"), meals ("We had dinner"), most proper nouns, abstract nouns used generally ("Honesty is the best policy"), and institutions used for their purpose ("go to school", "in hospital" as a patient — but "go to THE school" as a visitor). Exams love pairs like "in future" (from now on) versus "in the future" (at some later time).

Prepositions of time: AT for clock times and points (at 5 p.m., at night, at dawn), ON for days and dates (on Monday, on 15 August), IN for longer periods (in June, in 2026, in the morning — but at night). Prepositions of place: AT for points (at the door), IN for enclosed spaces (in the room), ON for surfaces (on the table). "Since" marks a starting point (since 2019); "for" marks a duration (for five years); "between" is for two, "among" for more than two.

Fixed verb–preposition pairs are pure memorisation and pure marks: abide by, accuse of, agree WITH a person but agree TO a proposal, angry WITH a person but angry AT a thing, congratulate on, consist of, depend on, die of a disease, good at, married to, prefer tea TO coffee, and superior TO (never "than"). Keep a running list of every pair you meet in practice papers — twenty such pairs cover most questions asked.`,
    },
    {
      title: "Error Spotting: Method and High-Frequency Traps",
      content: `Error-spotting questions divide a sentence into parts and ask which part contains the error. Do not read for meaning first — scan for the exam's known trap categories in a fixed order: (1) subject–verb agreement, (2) tense consistency, (3) pronoun case and agreement, (4) preposition choice, (5) article use, (6) adjective versus adverb, (7) conjunction pairing, (8) word order. A checklist beats intuition under time pressure.

Pronoun traps: "between you and I" is wrong — prepositions take the object case, so "between you and ME". "Everyone should do THEIR duty" is traditionally corrected to "HIS or HER duty" in exam English (each/everyone are singular). After "than" in comparisons, standard exam answers prefer the subject form with the verb understood: "He is taller than I (am)". "Whom" is the object form: "the man WHOM I met", but "the man WHO met me".

Comparison traps: double comparatives are wrong ("more better"); comparatives need "than", not "to" — except the Latin-derived senior, junior, superior, inferior, prior, which take TO. Compare like with like: "The climate of Delhi is hotter than THAT OF Shimla" (not "than Shimla"). "Prefer" takes "to", never "than". Adjectives that are already absolute — unique, perfect, complete, ideal — traditionally reject "more" or "most" in exam grammar.

Conjunction pairs must not be broken or doubled: "hardly/scarcely … WHEN", "no sooner … THAN", "not only … BUT ALSO", "although … (nothing — never add 'but')", "unless" already contains "not", so "unless you do not work" is a double negative and wrong. Finally, uncountable nouns — advice, information, furniture, luggage, machinery, scenery, hair, news — take no plural and no "a/an": "PIECES of advice", never "advices". These fixed traps repeat every single year; a memorised checklist converts this section into reliable marks.`,
    },
    {
      title: "Vocabulary: Synonyms and Antonyms",
      content: `Synonym and antonym questions reward a deliberately built word bank, not vague familiarity. Learn words in clusters with one anchor meaning each. High-frequency exam synonyms: ABUNDANT means plentiful; CANDID means frank; OBSOLETE means outdated; UBIQUITOUS means present everywhere (omnipresent); METICULOUS means very careful about detail; FRUGAL means thrifty or sparing; AUDACIOUS means bold or daring; LETHARGIC means sluggish; BENEVOLENT means kind or charitable; EPHEMERAL means short-lived.

Antonyms asked repeatedly: TRANSPARENT is opposed by OPAQUE; EXPAND by CONTRACT; ANCIENT by MODERN; SCARCE by ABUNDANT; HOSTILE by FRIENDLY; TIMID by BOLD; VICTORY by DEFEAT; OPTIMIST by PESSIMIST; BARREN by FERTILE; ZENITH (highest point) by NADIR (lowest point). When two options feel close, choose the one that reverses the CORE meaning rather than merely weakening it.

Word roots multiply your vocabulary cheaply. BENE- means good (benevolent, benefactor, benign); MAL- means bad (malice, malfunction, malnutrition); OMNI- means all (omnipresent, omniscient, omnivore); CHRONO- means time (chronology, chronic); -CIDE means killing (homicide, pesticide); AQUA- means water; TELE- means far. Meeting an unknown word, break it into root, prefix, and suffix before guessing — "omniscient" is omni (all) + scient (knowing): all-knowing.

Spelling questions accompany vocabulary in SSC papers. The most misspelled exam words: ACCOMMODATE (double c, double m), OCCASION (double c, single s), SEPARATE (par, not per), DEFINITELY, EMBARRASS (double r, double s), MAINTENANCE, PRIVILEGE, OCCURRENCE, COMMITTEE, and RECOMMEND (one c, double m). Write each correctly three times rather than reading it ten — motor memory outlasts visual memory for spelling.`,
    },
    {
      title: "Idioms, Phrases, and One-Word Substitutions",
      content: `Idiom questions give a phrase in context and ask its meaning. The meanings are fixed by convention, so this is a memory section. The most frequently asked: to BITE THE BULLET — to face something painful with courage; ONCE IN A BLUE MOON — very rarely; TO LET THE CAT OUT OF THE BAG — to reveal a secret; AT THE ELEVENTH HOUR — at the last moment; TO BURN THE MIDNIGHT OIL — to work late into the night; A BLESSING IN DISGUISE — a misfortune that turns out well; TO TURN A DEAF EAR — to ignore deliberately; TO HIT THE NAIL ON THE HEAD — to state exactly the right point.

More staples: APPLE OF ONE'S EYE — someone cherished dearly; CROCODILE TEARS — insincere sorrow; RED-LETTER DAY — a memorable, important day; TO BURY THE HATCHET — to end a quarrel and make peace; TO SIT ON THE FENCE — to stay neutral; A WHITE ELEPHANT — a costly but useless possession; TO SMELL A RAT — to suspect something wrong; UNDER THE WEATHER — slightly ill; TO POUR OIL ON TROUBLED WATERS — to calm a dispute. Never interpret idioms literally in the exam — the literal-sounding option is usually the planted wrong answer.

One-word substitutions compress a definition into a single word. The evergreen set: one who eats both plants and meat — OMNIVORE; one who loves mankind and donates to good causes — PHILANTHROPIST; one who can use both hands equally well — AMBIDEXTROUS; a person who speaks many languages — POLYGLOT; one who looks at the bright side — OPTIMIST; a place where bees are kept — APIARY; the study of birds — ORNITHOLOGY; a government by the people — DEMOCRACY; that which cannot be read — ILLEGIBLE; that which cannot be avoided — INEVITABLE.

Group these by suffix families to remember them: -LOGY words are studies (zoology, geology, anthropology); -CRACY words are governments (autocracy, bureaucracy); -PHOBIA words are fears (claustrophobia — fear of closed spaces; hydrophobia — fear of water); IN-/IL-/IR- + -ABLE words are impossibilities (inaudible, illegible, irreparable). Ten minutes of daily revision of these lists for a month covers virtually every idiom and substitution the exam can ask.`,
    },
    {
      title: "Active–Passive Voice and Direct–Indirect Speech",
      content: `To convert active to passive: the object becomes the subject, the verb becomes a form of BE + past participle, and the doer takes "by". "Ram wrote a letter" becomes "A letter WAS WRITTEN by Ram." The tense of BE must mirror the original: writes → is written; is writing → is being written; wrote → was written; has written → has been written; will write → will be written. Present perfect continuous and future continuous have no standard passive forms — an option offering one is wrong.

Interrogatives and imperatives follow set moulds. "Who wrote this?" → "By whom was this written?" Commands use "let" or "you are requested/ordered": "Shut the door" → "Let the door be shut" or "You are ordered to shut the door." Verbs with two objects can passivise either one: "He gave me a book" → "I was given a book (by him)" or "A book was given to me." Only transitive verbs (verbs with objects) have passives at all — "He sleeps" cannot be made passive.

Direct-to-indirect speech changes three things: the reporting frame, the tense, and the pointers. If the reporting verb is past, shift the reported tense back one step: "He said, 'I AM busy'" → "He said that he WAS busy"; present perfect and simple past both shift to past perfect. Universal truths do not shift: "He said that the sun RISES in the east." Pronouns adjust to the reporter's viewpoint, and near words become far words: now → then, here → there, this → that, today → that day, tomorrow → the next day, yesterday → the previous day, ago → before.

Questions and commands change their reporting verbs. Yes/no questions use "asked … if/whether": "He said, 'Are you coming?'" → "He asked whether I was coming" (statement order, no question mark). Wh-questions keep the question word: "He asked where I lived." Commands use "ordered/requested/advised + to-infinitive": "He said, 'Please help me'" → "He requested me to help him." Exams test the full conversion, so practise complete sentences, not just the tense table.`,
    },
    {
      title: "Reading Comprehension and Cloze Test Strategy",
      content: `Reading comprehension supplies a passage and questions on its content, tone, and vocabulary. Read the QUESTIONS first (not the options), then the passage — knowing what is asked turns a passive read into a search. Answer strictly from the passage: the correct option is supported by the text, even if your outside knowledge disagrees. Options that are true in the real world but absent from the passage are the classic wrong answers, along with extreme options containing "always", "never", or "only" when the passage was measured.

Question types need different tactics. MAIN IDEA: ask what every paragraph contributes to; a title option that covers only one paragraph is too narrow. INFERENCE: the answer is not stated but must follow necessarily — pick the option the author would have to agree with. VOCABULARY IN CONTEXT: replace the word with each option and re-read the sentence; the passage's meaning, not the dictionary's first meaning, decides. TONE: build a small vocabulary of tone words — critical, appreciative, neutral, ironic, nostalgic — and judge from the author's word choices.

Cloze tests remove several words from one passage. Read the WHOLE passage once before filling anything, because early blanks often depend on later sentences. Each blank is then decided by three filters in order: grammar (what part of speech and form fits?), collocation (which words naturally pair — "commit a crime", "heavy rain", "make a decision"?), and logic (does the connector match the flow — "however" for contrast, "therefore" for consequence, "moreover" for addition?).

Para-jumble questions ask you to reorder sentences into a paragraph. Find the opener first — it introduces the topic and does not begin with a pronoun, "however", or "but", since those lean on earlier text. Then chain by links: a pronoun must follow its noun; "this decision" must follow the sentence containing the decision; time markers (earlier, later, finally) sequence events. Lock in any pair you are sure of and eliminate options that break the pair — you rarely need the full order to find the answer. In sectional-timer exams like SSC CGL, do vocabulary and grammar items first and passages last, so slow reading never swallows quick marks.`,
    },
  ],
  questions: [
    { q: "Choose the correct sentence:", options: ["The quality of the mangoes were poor.", "The quality of the mangoes was poor.", "The quality of the mangoes have been poor.", "The quality of the mangoes are poor."], correct: 1 },
    { q: "Fill in the blank: Neither of the answers ___ correct.", options: ["are", "were", "is", "have been"], correct: 2 },
    { q: "Choose the correct sentence:", options: ["I have met him yesterday.", "I met him yesterday.", "I am meeting him yesterday.", "I have been meeting him yesterday."], correct: 1 },
    { q: "Fill in the blank: If I ___ you, I would accept the offer.", options: ["am", "was", "were", "be"], correct: 2 },
    { q: "Choose the correct article: She is ___ honest woman.", options: ["a", "an", "the", "no article"], correct: 1 },
    { q: "Choose the correct article: He studies in ___ university.", options: ["an", "a", "the", "no article"], correct: 1 },
    { q: "Fill in the blank: He has been living here ___ 2015.", options: ["for", "since", "from", "by"], correct: 1 },
    { q: "Fill in the blank: She is married ___ a doctor.", options: ["with", "to", "by", "of"], correct: 1 },
    { q: "Choose the correct sentence:", options: ["He is senior than me.", "He is senior to me.", "He is more senior than me.", "He is senior from me."], correct: 1 },
    { q: "Spot the error: \"Between you and I, this plan will fail.\"", options: ["'Between' should be 'Among'", "'I' should be 'me'", "'will' should be 'would'", "There is no error"], correct: 1 },
    { q: "What is the synonym of UBIQUITOUS?", options: ["Rare", "Omnipresent", "Hidden", "Temporary"], correct: 1 },
    { q: "What is the antonym of TRANSPARENT?", options: ["Clear", "Visible", "Opaque", "Bright"], correct: 2 },
    { q: "What does the idiom \"once in a blue moon\" mean?", options: ["Every night", "Very rarely", "At full moon", "Very often"], correct: 1 },
    { q: "What does the idiom \"to let the cat out of the bag\" mean?", options: ["To free an animal", "To create confusion", "To reveal a secret", "To start a quarrel"], correct: 2 },
    { q: "One word for \"a person who can use both hands equally well\":", options: ["Amateur", "Ambidextrous", "Ambiguous", "Ambivalent"], correct: 1 },
    { q: "One word for \"one who eats both plants and meat\":", options: ["Herbivore", "Carnivore", "Omnivore", "Insectivore"], correct: 2 },
    { q: "Choose the correctly spelled word:", options: ["Accomodate", "Acommodate", "Accommodate", "Acomodate"], correct: 2 },
    { q: "Change to passive voice: \"Ram wrote a letter.\"", options: ["A letter is written by Ram.", "A letter was written by Ram.", "A letter has been written by Ram.", "A letter had written by Ram."], correct: 1 },
    { q: "Change to indirect speech: He said, \"I am busy.\"", options: ["He said that he is busy.", "He said that I am busy.", "He said that he was busy.", "He says that he was busy."], correct: 2 },
    { q: "Fill in the blank: I will call you when I ___ home.", options: ["will reach", "reach", "reached", "will have reached"], correct: 1 },
  ],
};
