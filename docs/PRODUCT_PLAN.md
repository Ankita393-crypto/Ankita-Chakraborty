# Product Plan — Bodhi

**Document status:** Draft v5 for review
**Author:** Prepared with/for the product owner (Business Analyst)
**Scope of this document:** High-level product definition, monetization, content strategy, phased roadmap, risks, and open decisions. Detailed functional and non-functional requirements live in `docs/REQUIREMENTS.md`.

> Decisions in this document reflect the product owner's explicit choices from discovery conversations. Anything not yet decided is listed in the **Decisions Log & Open Questions** (Section 12) and is deliberately not assumed.

---

## 1. Vision

> **Pivoted (Decision #16, #23):** the original "pay a quiz to unlock a free course" model is **cancelled**. It no longer applies. The paragraphs below describe the platform's original broader ambition; Section 3 and Section 6 describe what Bodhi actually sells today.

Bodhi's core product is **AI-generated UPSC mock tests, built and priced to feel like the real exam** — not a short quiz. A learner pays **₹249 once** for a bunch of **1,000 mock papers**; the platform also earns affiliate commission when a learner clicks through to buy a reference book on Amazon, Flipkart, or a similar shop (Bodhi never sells or hosts book PDFs itself).

Alongside the mock-test product, the platform still offers a broader **free, ungated learning catalog** — any learner can read AI-generated lessons on any subject that can be taught (engineering, medicine, economics, history, and beyond), delivered as text/documents and AI-produced videos hosted on YouTube and embedded in the site. This catalog now serves mainly as **free supporting study material** for mock-test takers (e.g., an AI-generated chapter linked from a weak-subject report — Decision #17), not as the platform's monetization mechanic.

The guiding principle today: **the mock-test bunch and book affiliate links are the revenue; supporting lesson content stays free.**

## 2. Target Users

| Persona | Description | Primary need |
|---|---|---|
| Student | School/college student exploring subjects or preparing for exams | Free structured lessons, downloadable notes, certificates to show effort |
| Professional | Working person upskilling or preparing for an external certification | Certification prep documents, efficient study paths |
| General learner | Anyone curious about any topic | On-demand lessons about literally anything |

Eligibility to register: a valid **email address**, a **mandatory phone number**, and a **mandatory identity document upload** (any one of: PAN, Aadhaar, driving license, student ID, or employee ID). Rationale (owner's decision): ensures accountability and that certificates map to real, identifiable people.

### 2.1 Launch target audience (confirmed by the owner — pilot launches with government-exam topics)

> **Note:** the paid flagship product (Section 3, 6) is specifically **UPSC** mock tests at launch, not the full SSC/banking/railways breadth implied below. That broader breadth remains the ambition for the free catalog and future mock-bunch expansion, not a claim about what's sellable today.

- **Primary: government-exam aspirants, roughly ages 18–30** (SSC, banking, railways, state exams). This is India's largest, most persistent paid-learning segment; buyers are accustomed to paying small amounts (₹250–₹1,500) for test prep; and Hindi/Bengali-medium aspirants are underserved by premium English-first platforms — which makes Bodhi's tri-language content a genuine differentiator rather than a nice-to-have.
- **Secondary: college students and early-career professionals upskilling in Gen AI and AWS.** Fast-growing demand, willingness to pay for certification prep, and low content-production cost for us.
- **Deliberately not targeted at launch:** K-12 school students as a *marketing* segment (school courses stay in the catalog, but selling to minors requires parental payment decisions and heavy competition against entrenched brands) and NEET/JEE coaching (dominated by large incumbents with massive brand trust; revisit once Bodhi has credibility). The general "learn anything" catalog remains open to everyone — targeting governs where marketing money and seed content go first, not who may sign up.

## 3. Core Learner Journey (current: UPSC mock-test flow — supersedes the original "Option B" entry-quiz flow)

> The old mechanic — **a paid entrance exam gates access to each free course** — is **cancelled** (Decision #16, #23). It does not apply anymore. The defining product mechanic today: the learner pays once for a large bunch of realistic mock exams, reviews detailed answers, and is pointed to relevant books to buy elsewhere.

1. **Register** with Google sign-in or email + password.
2. **Verify** email and phone; **upload one identity document** (kept for accountability; no longer a payment gate tied to a per-course quiz).
3. **Browse** the mock-test catalog (browsing is open).
4. **Pay ₹249 once** for a **mock bunch of 1,000 AI-generated papers**. Starter scope (Decision #23): **UPSC Prelims (GS Paper I + CSAT) and UPSC Mains**, in **English and Hindi only**. Papers are composed deterministically from a growing, verified question bank so 1,000 distinct-feeling attempts are possible from a smaller underlying bank; while the bank is small, the UI discloses that papers share questions (Decision #18).
5. **Take a mock** under conditions that replicate the real UPSC paper (timing, marking scheme, question palette) — not a short quiz.
6. **Review the result:** every attempt shows the **correct option and a detailed explanation** for each question, plus a subject-wise weakness report.
7. **Weak subject → book links:** each weak subject links to standard reference books on Amazon, Flipkart, or a similar shop. The learner pays the shop directly, at the shop's normal price; Bodhi earns an affiliate commission and never takes the book payment itself (Decision #19). Bodhi does not sell or host PDF books.
8. **Buy again:** after finishing a bunch, the learner can pay **another ₹249** for a new mock bunch. A repeat-purchase bunch must cover **all current UPSC subjects**, not the smaller starter subset (Decision #23).
9. Free courses/lessons remain available as **ungated supporting study material** (Decision #17) — they are not part of the paid mechanic.

**Premium membership is parked** — not planned or built for now (Decision #18).

Certificates for mock attempts are an **open question** (see Section 12, item 24) — the original quiz/course-completion certificate design predates this pivot and has not been re-confirmed for the mock-test product.

## 4. Content Strategy

### 4.1 AI-generated lessons (website)
- Lessons are generated by an AI model, stored, and reused: the first request for a topic incurs a generation cost; subsequent learners receive the cached version at near-zero marginal cost.
- Lessons and notes are downloadable as documents from the website.
- Certification-prep tracks include curated, downloadable prep documents.

**Certification-prep launch list (owner's decision):**
- **All Indian central government exams** (e.g., UPSC Civil Services, SSC, IBPS/SBI banking, RRB railways, NDA/CDS defence) — built out incrementally, highest-demand exams first.
- **All Indian state government exams** (state PSCs and state-level recruitment exams) — built out incrementally by state.
- **Generative AI certifications** (e.g., cloud-vendor and industry Gen AI certificates).
- **AWS certifications** (Cloud Practitioner through Professional/Specialty).
- **PMP** (Project Management Professional).

"All central and state exams" is a very large catalog; the practical approach is to seed the most-demanded exams at launch and let learner requests (FR-11 in the requirements) drive generation of the long tail.

### 4.2 AI-generated videos (YouTube)
- Video content is produced with AI tools, uploaded to the platform's **YouTube channel**, and embedded in course pages on the website.
- Benefits: zero video hosting/bandwidth cost, plus YouTube advertising revenue once the channel qualifies for monetization.
- **Honest caveat:** YouTube monetization requires meeting YouTube Partner Program thresholds (historically ~1,000 subscribers and ~4,000 public watch hours, subject to YouTube's current policy) and compliance with YouTube's rules on AI-generated content. Ad revenue should be treated as a *later-stage* income stream, not launch revenue. Video production is also an operational pipeline (scripting, generation, review, upload) that runs alongside the web product.

### 4.3 Accuracy, trust, and the publication workflow
- **No-false-information policy (owner's direction):** courses must contain only true, verifiable information at proper market depth — real chapters, not thin summaries. When a fact cannot be verified, it is omitted or escalated to the owner for a decision; it is never invented. The pilot's four demo courses are hand-curated to this standard (NCERT-aligned maths, standard oceanography, the official AWS CLF-C02 exam guide, standard SSC reference facts).
- Every AI-generated lesson carries a visible disclaimer: *"This content is AI-generated. Verify independently before professional or medical use."*
- High-stakes domains (medicine, law, finance) receive a stronger disclaimer.
- **Publication & review workflow (owner delegated this decision; the following is the platform's decided policy):**
  - **New AI-generated courses publish instantly.** When a learner requests a topic, the lesson is generated, carries its disclaimer, and is live immediately — preserving the product's core "ask and learn" experience. The owner is never a blocking approver for new content.
  - **Error corrections are reviewed before replacing published content:** learner report → platform reviewer verifies the error and the proposed fix → corrected version replaces the cached one. Verified corrections do not wait on the owner.
  - **Owner oversight without bottleneck:** every publication and correction is audit-logged; the owner receives a digest of new/changed content and can edit or **unpublish any content at any time** with immediate effect.

## 5. Languages

The **website UI** and free supporting lesson content support **English, Hindi, and Bengali** (v1 design, unchanged).

**Mock-test content specifically (Decision #20, #23):** matches the real UPSC exam.
- **Prelims** mocks: **English and Hindi only** — the real UPSC Prelims paper is never offered in any other language.
- **Mains** mocks: **English and Hindi for the starter scope.** The real UPSC Mains exam also allows answers in state/regional languages, and Bodhi wants to offer those eventually — but the full list of regional languages to support is **not locked yet** and is deliberately deferred until the owner is ready to prioritize it (not needed for the starter product).

## 6. Revenue Model

> **Cancelled (Decision #16, #23):** the tiered ₹249–₹2,499 paid-entry-quiz model below in the original Section 6.1 no longer applies. It is kept further down for historical/market-research reference only — do not implement it.

| # | Stream | Mechanics | Timing |
|---|---|---|---|
| 1 | **Mock-test bunches** | Flat **₹249 one-time** fee per bunch of **1,000 AI-generated UPSC papers** (starter scope: Prelims GS Paper I + CSAT, and Mains; English and Hindi only — Decision #23). Unlimited retakes within a purchased bunch. Learners may buy additional bunches after finishing one; each additional bunch must cover **all current UPSC subjects**, not just the starter subset. No tiers, no per-course pricing. INR via UPI and domestic cards (gateway with individual onboarding, e.g., Razorpay); USD deferred until a registered business entity exists (Section 12, item 9). | From launch |
| 2 | **Book affiliate commission** | Weak-subject links to Amazon, Flipkart, or similar shops (`AMAZON_AFFILIATE_TAG` / `FLIPKART_AFFILIATE_ID`). The learner pays the shop directly at the shop's normal price; Bodhi never sells or hosts book PDFs and never takes the book payment (Decision #19). | From launch (once affiliate programme registration completes) |
| 3 | **YouTube ad revenue** | Ads on the platform's YouTube channel videos | After channel meets YouTube Partner Program thresholds |

**Premium tier: parked.** It is not planned or built for now (Decision #18) — the "Premium tier" row from the original revenue table is removed until the owner revisits it.

Free supporting lessons stay free and ungated; the daily generation cap (Section 8) is purely a cost-control mechanism, not a monetization gate.

### 6.1 (Historical, superseded) Quiz price tiers from the original entry-quiz model — do not implement

Pricing is tiered by the level/market value of the target exam or subject, informed by market research of Indian online test-series pricing (researched August 2026; sources include Testbook, Adda247, Physics Wallah, ClearIAS, Aakash, Tutorials Dojo/Whizlabs, PMP simulators):

| Tier | Level / Category | Our price per attempt | Market anchor (single test series / practice exams) |
|---|---|---|---|
| 1 | School level (classes 6–12, board prep) | **₹249** | ₹149–₹999 (Dreamz, PW school test series) |
| 2 | Diploma / ITI / vocational | **₹349** | Sparse direct market; positioned just above school tier |
| 3 | Degree level & general subjects (UG/PG academics, general learning topics) | **₹499** | Aligned with mainstream test-pass products ₹499–₹1,499 |
| 4 | Government recruitment exams (SSC, banking, railways, state exams) | **₹499** | Testbook ₹499–₹1,499/yr; Adda247 promos ₹49–₹999 |
| 5 | Entrance exams (NEET, JEE, CUET, state CETs) | **₹749** | Basic online series ₹299–₹999 (PW ₹499, NEET Kaka ₹599); premium ₹2,500–₹6,000 (Aakash ₹5,000) |
| 6 | Premier competitive exams (UPSC and equivalents) | **₹999** | Budget series ₹2,370–₹4,999 (ClearIAS ₹4,999); premium ₹7,600–₹15,000 (NextIAS, Vision IAS) |
| 7 | Doctors / medical PG & professional specialization | **₹1,499** | High-value segment; PG-level series typically ₹2,000–₹6,000 |
| 8 | Professional certifications — AWS, Gen AI | **₹1,499** | Third-party practice exams ₹1,500–₹2,500/exam (Tutorials Dojo, Whizlabs); Udemy ₹500–₹1,500 on sale |
| 9 | PMP and premium professional certifications | **₹2,499** | Mock simulators ₹4,000–₹12,000 (ProThoughts data); Udemy sets ~₹1,300–₹3,500 |

Positioning logic: our quiz is a single *entry* assessment (not a 40-test series), so each tier is priced at or below the entry point of the corresponding market segment while respecting the owner's ₹249–₹2,499 band. All tier prices are admin-configurable so they can be adjusted with real conversion data.

**Re-attempt policy (owner's decision): a failed quiz re-attempt is charged the same full price.**

Payment currency: INR at launch; USD depends on gateway capability (see Section 12, item 9).

## 7. Trust, Safety & Compliance

This section is load-bearing because the platform will store **sensitive personal data** (phone numbers and government identity documents such as Aadhaar and PAN):

- **India's DPDP Act (Digital Personal Data Protection Act)** applies: consent capture at collection, purpose limitation, data-deletion rights, and breach notification duties.
- ID documents must be stored **encrypted at rest**, in access-controlled storage, never exposed in URLs, and retained only as long as necessary.
- Aadhaar specifically carries additional handling restrictions under Indian law (masking of the number is standard practice; storing full Aadhaar images requires care). A privacy-friendlier alternative (e.g., DigiLocker integration) is noted as a future option.
- Payments: PCI compliance is delegated to the payment gateway (card data never touches our servers).
- A published **Privacy Policy** and **Terms of Service** are launch requirements. The Terms must state the **no-refund policy** prominently (owner's decision: all quiz payments are final), and the checkout screen must display it *before* payment to keep the policy enforceable and reduce chargeback disputes.
- **ID verification (owner's decision, on cost-efficiency grounds):** manual admin review of uploaded IDs for version 1 — zero per-check cost. Automated KYC APIs (roughly ₹2–₹25 per verification from Indian providers such as IDfy, HyperVerge, Digio, Signzy) are deferred until signup volume outgrows manual review.

## 8. Cost Structure (what "free for learners" costs us)

| Cost | Driver | Mitigation |
|---|---|---|
| AI generation (text) | Per-lesson API calls, ×3 languages | Cache aggressively; daily cap for free users |
| AI video production | Per-video generation tooling | Batch production; prioritize high-demand topics |
| SMS OTP (phone verification) | Per-signup, per-login-challenge | OTP at signup only; email for routine notifications |
| Payment gateway fees | ~2% + tax per transaction | Priced into quiz fee |
| Hosting, database, storage | User count, stored documents | Start on low-cost/free tiers; scale with revenue |
| ID document storage | Encrypted object storage | Retention limits |

Concrete monthly figures depend on user volume, which is unknown pre-launch; the requirements document mandates cost observability (dashboards for AI spend) from day one.

## 9. Phased Roadmap

Phases are scoped by capability, not calendar time.

- **Phase 0 — Foundation:** finalize open questions (Section 12), Privacy Policy/ToS drafts, payment gateway onboarding (business KYC), YouTube channel creation, choice of AI provider and tech stack.
- **Phase 1 — MVP (launch):** registration (Google + email), phone OTP, ID upload, mock-test catalog, **₹249-per-bunch mock purchase (Prelims + Mains, EN/HI)** (INR via UPI + domestic cards), answer explanations and weak-subject reports, book affiliate links, AI text lessons (EN/HI/BN) with caching, disclaimers, and instant publication, downloadable documents, embedded YouTube videos, basic admin panel (user/ID review, error-report review queue, content audit log with unpublish).
- **Phase 2 — Monetization depth:** Mains regional-language expansion, full-subject repeat-purchase bunches, personalized study plans, certification-prep track expansion, error-mitigation workflow maturity. (Premium subscription tier is parked, not planned for this phase.)
- **Phase 3 — Scale:** YouTube Partner Program qualification and ad revenue, more languages, mobile apps, community features (discussions), institutional/bulk offerings.

## 10. Success Metrics (initial)

- Registrations completed (including ID verification pass rate — a friction metric to watch).
- Quiz purchases, quiz pass rate, and course activations.
- Lesson cache hit rate (cost efficiency) and AI spend per active learner.
- Certificate downloads; error reports per 1,000 lesson views (quality).
- Revenue split across quizzes / premium / YouTube.

## 11. Key Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Signup friction (phone OTP + ID upload) suppresses registrations | High | Measure funnel drop-off from day one; owner may revisit ID timing (e.g., require ID only before first certificate) — flagged, not assumed |
| AI content errors damage trust, especially medical/legal topics | High | Disclaimers, report-and-fix loop, stronger warnings in high-stakes domains |
| Paid-quiz-before-free-course is an unconventional funnel; conversion unknown | Medium | Monitor purchase conversion closely; per-course pricing within the ₹249–₹2,499 band allows starting popular courses at the low end and adjusting with data |
| Sensitive ID data breach | High | Encryption, access control, retention limits, DPDP compliance |
| YouTube revenue arrives later than hoped | Medium | Treat as bonus, not plan-of-record revenue |
| AI provider cost or policy changes | Medium | Caching, provider abstraction layer, spend alerts |

## 12. Decisions Log & Open Questions

Item numbering is stable — the requirements document cross-references these as [OQ-n].

| # | Topic | Status | Decision / What's still needed |
|---|---|---|---|
| 1 | Product name and domain | **Decided** | **Bodhi** (owner's pick — catchy for both children and adults). Domain and trademark availability still must be verified before public launch; if unavailable, fallbacks are GyanGo and CurioLearn. |
| 2 | Quiz pricing | **Decided** | Tiered by level within ₹249–₹2,499, grounded in August 2026 market research — see Section 6.1 for the nine-tier table (school ₹249 … PMP ₹2,499). **Failed re-attempts are charged the same full price.** All tier prices admin-configurable. |
| 3 | Certificates | **Decided** | Certificates at **both** points, both downloadable PDFs. The quiz certificate is covered by the paid quiz fee; the course-completion certificate (the website's own certificate) is **free**. |
| 4 | Quiz integrity | **Decided** | **Time-bound, not proctored.** Timed quizzes with randomized question subsets; no webcam proctoring or invasive monitoring. |
| 5 | ID verification depth | **Decided** | **Manual admin review** for v1 (cost-efficient: zero per-check cost). Automated KYC (₹2–₹25/check) deferred until volume demands it. |
| 6 | Refund policy | **Decided** | **No refunds.** All quiz payments are final; stated in ToS and on the checkout screen before payment. |
| 7 | Premium tier price & free-tier daily cap | **Deferred (owner's decision)** | To be decided later, closer to Phase 2. Built admin-configurable so the price and cap can be set without code changes. Suggested band remains ₹99–₹199/month. |
| 8 | Content review & publication | **Decided (delegated to the platform)** | Owner delegated this decision. Policy: new AI courses publish **instantly**; error corrections require platform-reviewer verification before replacing published content; owner has full oversight via audit log, change digest, and instant unpublish power (Section 4.3). |
| 9 | Business entity for payment gateway KYC | **Decided path (interim)** | Owner has **no registered business entity** — only personal UPI and a bank account. Practical notes: (a) using a *personal* UPI ID for commercial collections violates NPCI/bank norms and risks account flags, so it is not the plan of record; (b) Indian gateways (Razorpay, Cashfree, PayU) offer **individual / sole-proprietor onboarding** with just PAN + bank account, which unlocks UPI *and* domestic cards plus payment webhooks — this is the recommended launch path; (c) **international cards / USD pricing** generally requires fuller business documentation, so **launch is INR-only** and USD is deferred until a registered entity exists. |
| 10 | Certification-prep launch list | **Decided** | **All Indian central government exams, all state government exams, Generative AI certifications, AWS, PMP** — seeded by demand, long tail generated on learner request (see Section 4.1). |
| 11 | Exam format | **Decided** | Entrance-exam framing (not "quiz"): 15 basic-knowledge questions from a 20+ bank, 20 minutes, 60% pass, retry at full price, time-bound without proctoring. |
| 12 | Content depth & truthfulness | **Decided** | Market-level chapters only; no false or assumed information — unverifiable facts are omitted or escalated to the owner (Section 4.3). |
| 13 | Certificate delivery | **Decided** | Certificates download as generated **PDF files** directly; ID verification always precedes payment, so every certificate holder is document-verified by construction. |
| 14 | Launch target audience | **Decided** | Owner confirmed: pilot launches with government-exam topics. Primary: government-exam aspirants 18–30 (Hindi/Bengali-medium underserved); secondary: Gen AI / AWS upskillers (Section 2.1). |
| 15 | Government-exam knowledge base | **Decided** | Verified-only exam directory (`lib/exam-directory.ts`, public `/exams` page): conducting bodies, official sites, and patterns cross-checked against current notifications (Aug 2026); patterns re-verified each cycle. Full subject coverage seeded: General Awareness, Quantitative Aptitude, Reasoning, English. |
| 16 | Product pivot: mock-exam simulation | **Decided (owner)** | Core product becomes exam rehearsal: full-length mocks replicating the real paper exactly (UPSC GS Paper I first: 100 questions, 120 min, +2/−⅔ negative marking, question palette, mark-for-review). Every mock ships with an answer paper — full solutions with explanations — and a subject-wise weakness report. Courses remain as free supporting study material. |
| 17 | AI study chapters from weakness report | **Decided (owner)** | Each weak subject in the report is a hyperlink opening a new tab (`/learn/<subject>`) with a UPSC-coursebook-style chapter generated on demand by AI ("the world is the knowledgebase"), cached per subject+language, with a verify-independently disclaimer. Requires the OpenAI API key; until then the page shows verified seeded courses covering that subject. |
| 18 | Pricing: mock series bunches | **Decided (owner)** | ₹249 ONE-TIME per series (bunch) of 1000 papers; papers composed deterministically ("permutation and combination") from a growing verified question bank; unlimited retakes. Bunch coverage = full Prelims: GS Paper I series + CSAT series. Premium membership parked. Honest-labelling rule: while the bank is small, the UI discloses that papers share questions. |
| 19 | Book monetisation: affiliate links, never files | **Decided (owner)** | No PDFs sold or shared (copyright). Weak subjects surface standard reference books (Laxmikanth, Spectrum, G.C. Leong, etc.) hyperlinked to Amazon/Flipkart searches with affiliate disclosure; AMAZON_AFFILIATE_TAG / FLIPKART_AFFILIATE_ID env vars add commission tracking once the owner registers for the affiliate programmes. |
| 20 | Mock languages | **Decided** | Match the real exam: UPSC Prelims papers are set in English and Hindi only, so mock papers target EN + HI (Bengali remains a UI language; Hindi question bank translation needs the AI key). |
| 21 | Database: MongoDB | **Decided (owner)** | The platform runs on MongoDB. Local development uses an embedded MongoDB automatically (zero installation, data persists in `data/mongo`); production points `MONGODB_URI` at a free MongoDB Atlas M0 cluster (Mumbai region), which also solves free-hosting data wipes. Numeric ids, one-time-purchase unlocks, deterministic paper composition, and all flows verified by an automated end-to-end test (`e2e-test.mjs`). |
| 22 | Product name: Bodhi | **Decided (owner)** | Universal learning platform brand finalized as **Bodhi** (an earlier placeholder working name has been fully retired). UI, certificates, admin account (`admin@bodhi.test`), cookies, docs, and package name updated accordingly. |
| 23 | Mains scope, starter languages, and repeat-purchase coverage | **Decided (owner)** | Starter mock bunches cover **both UPSC Prelims and UPSC Mains** (not Prelims alone), in **English and Hindi only**. The real Mains exam also allows state/regional-language answers; Bodhi wants those eventually, but the exact list is **not locked yet** and is deferred until the owner is ready to prioritize it — not needed for the starter product. A **repeat purchase** (another ₹249 bunch after finishing one) must cover **all current UPSC subjects**, not the smaller starter subset. This formally supersedes the tiered, multi-exam "pay a quiz to unlock a free course" model described in the original Sections 3 and 6.1 — that model is cancelled and does not apply. |
| 24 | Certificates under the mock-test model | **Open** | The original quiz-pass and course-completion certificate design (Section 3, pre-pivot) has not been re-confirmed for the mock-test product. Not assumed either way — raise with the owner before building certificate logic for mock attempts. |

---

*Next document: `docs/REQUIREMENTS.md` — detailed functional and non-functional requirements derived from this plan.*
