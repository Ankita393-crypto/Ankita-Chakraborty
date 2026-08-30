# Requirements Document — Bodhi

**Document status:** Draft v5 for review
**Derived from:** `docs/PRODUCT_PLAN.md`
**Scope:** Functional and non-functional requirements for the **Phase 1 MVP** web application, with Phase 2+ items marked as such. Open decisions are cross-referenced to the product plan's Open Questions (marked **[OQ-n]**) and are not assumed.

Requirement priority uses MoSCoW: **M** = Must have (MVP), **S** = Should have, **C** = Could have, **W** = Won't have in v1.

---

## 1. Actors

| Actor | Description |
|---|---|
| Visitor | Unauthenticated person browsing the public catalog |
| Learner | Registered, verified user |
| Premium learner | Learner with an active subscription (Phase 2) |
| Admin | Platform operator: reviews IDs, content error reports, manages catalog |
| System | Automated processes: AI generation, payment webhooks, certificate issuance |

## 2. Functional Requirements

### 2.1 Registration & Authentication

| ID | Requirement | Priority |
|---|---|---|
| FR-1 | Users can register with email + password. | M |
| FR-2 | Users can register/sign in with Google (OAuth). | M |
| FR-3 | Email verification is required before the account is active (email-registration path; Google accounts are treated as email-verified). | M |
| FR-4 | Phone number is **mandatory for all users**, including Google sign-ins, and is verified via SMS OTP at signup. | M |
| FR-5 | Users must upload **one identity document** (PAN, Aadhaar, driving license, student ID, or employee ID) before they can purchase a quiz. Accepted formats: JPG/PNG/PDF; max file size enforced. | M |
| FR-6 | Uploaded IDs enter an admin review queue for **manual review** (decided [OQ-5]: manual for v1 on cost-efficiency grounds; automated KYC deferred). Account ID-status is one of *pending / approved / rejected (with reason, re-upload allowed)*. | M |
| FR-7 | Password reset via email; session management with secure logout. | M |
| FR-8 | Users can view/edit profile (name as it should appear on certificates, language preference) and delete their account (triggers data-deletion workflow, NFR-9). | M |

### 2.2 Course Catalog & Content

| ID | Requirement | Priority |
|---|---|---|
| FR-9 | Visitors and learners can browse/search the course catalog without payment; free courses are **ungated** (superseded — the entry-quiz-gate model in earlier drafts is cancelled, see product plan Decision #16, #23). | M |
| FR-10 | Two content track types: **General subjects** (any teachable topic) and **Certification prep** (materials for external certifications; the platform does not award external certifications and the UI must state this). Certification-prep launch scope (decided [OQ-10]): Indian central government exams, state government exams, Generative AI certifications, AWS, and PMP — seeded with the highest-demand exams, long tail added via FR-11 requests. | M |
| FR-11 | Learners can request a course on a topic not yet in the catalog; the system generates it via AI (subject to FR-12 limits) and **publishes it instantly** to the catalog for everyone (decided [OQ-8]: publication policy delegated to the platform — instant publish with disclaimers, owner oversight via FR-34). | M |
| FR-12 | Free-tier learners have a daily cap on *new* (never-before-generated) lesson generation requests; cached/stored lessons are unlimited for eligible learners. Cap value: **[OQ-7]**. | M |
| FR-13 | AI-generated lessons are stored (cached) per topic **per language** and reused for subsequent learners. | M |
| FR-14 | Course content is available in **English, Hindi, and Bengali**; the learner's language preference selects both UI language and content language. | M |
| FR-15 | Lessons, notes, and certification-prep documents are downloadable (PDF). | M |
| FR-16 | Course pages can embed videos from the platform's YouTube channel. Video availability is optional per course (text lessons alone are sufficient for launch). | M |
| FR-17 | Every AI-generated lesson displays a disclaimer: *"This content is AI-generated. Verify independently before professional or medical use."* High-stakes categories (medicine, law, finance) display a stronger variant. Content policy (decided [OQ-12]): market-level chapter depth, true and verifiable information only; unverifiable facts are omitted or escalated to the owner, never invented. | M |
| FR-18 | Every lesson has a "Report an error" control. Reports and proposed corrections are verified by the platform reviewer before the corrected version replaces the cached/published one (decided [OQ-8]); all corrections appear in the owner's audit log and digest (FR-34). | M |

### 2.3 Mock-Test Purchase & Payments (supersedes the original per-course entry-quiz mechanic — see product plan Decision #16, #23; the old FR-19–FR-23 wording below is rewritten accordingly, IDs kept stable)

| ID | Requirement | Priority |
|---|---|---|
| FR-19 | A learner can purchase a **mock-test bunch**: a flat **₹249 one-time** fee unlocks **1,000 AI-generated mock papers**. Starter scope: **UPSC Prelims (GS Paper I + CSAT) and UPSC Mains**, in **English and Hindi only** (product plan Decision #23). There is no per-course entrance exam and no pass/fail gate on any free course. | M |
| FR-20 | Payment is accepted in **INR** — UPI and domestic cards via an Indian gateway supporting individual/sole-proprietor onboarding (e.g., Razorpay), since the owner has no registered business entity yet (decided path [OQ-9]). Personal-UPI collection is not used (NPCI norms). **USD/international cards are deferred** until a registered entity exists. Price is the **flat ₹249 per bunch**, admin-configurable (the nine-tier level-based table from the pre-pivot design no longer applies — see product plan Section 6.1, historical). The checkout screen displays the no-refund policy before payment. | M |
| FR-21 | Payment is only available to learners whose ID status is *approved* (FR-6). | M |
| FR-22 | Mock papers are composed deterministically from a per-bunch verified question bank ("permutation and combination" — product plan Decision #18), replicating the real UPSC paper's format, timing, and marking scheme (not a short quiz). While the underlying bank is smaller than 1,000 unique papers, the UI discloses that papers share questions. **No proctoring** (decided [OQ-4]). | M |
| FR-23 | A purchased bunch is unlocked **permanently** for that learner with **unlimited retakes** — there is no pass/fail threshold that gates access. Each submitted attempt shows the **correct option and a detailed explanation** per question, plus a subject-wise weakness report (see FR-35, FR-36). | M |
| FR-24 | All payments produce a receipt (email + downloadable); learners can view payment history. | M |
| FR-25 | Payment webhooks reconcile gateway status; a paid-but-not-yet-attempted mock bunch remains available to the learner. **No refunds** (decided [OQ-6]): all mock-bunch payments are final; the system offers no refund flow, and the policy appears in the ToS and at checkout. | M |

### 2.4 Certificates

> **Open [OQ per product plan Decision #24]:** this section predates the mock-test pivot and has not been re-confirmed for it. Do not assume mock attempts issue certificates — raise with the owner before building certificate logic for the mock product. Kept below for historical reference.

| ID | Requirement | Priority |
|---|---|---|
| FR-26 | Passing the entrance exam issues a **directly downloadable PDF certificate** (generated file, not print-dialog only — decided [OQ-13]) bearing the learner's profile name, course name, date, and a unique verification ID. The certificate is covered by the exam fee — no separate charge (decided [OQ-3]). Because ID approval is required before payment (FR-21), every certificate holder is document-verified by construction. | M |
| FR-27 | A public verification page confirms a certificate's authenticity by verification ID (shows name, course, date — no other personal data). | M |
| FR-28 | **Course-completion certificate** (decided [OQ-3]): the system tracks lesson-level progress, and when a learner completes all lessons of an unlocked course, the website's own certificate of completion — a second downloadable PDF with its own verification ID (same format as FR-26/FR-27) — is issued **free of charge** (owner-confirmed). | M |

### 2.5 Premium Tier (Parked — product plan Decision #18; not planned or built for now)

| ID | Requirement | Priority |
|---|---|---|
| FR-29 | Monthly subscription removing the daily new-generation cap and adding personalized study plans. Price deferred by the owner to Phase 2 (**[OQ-7]**) and built admin-configurable. Billed in INR via the payment gateway's recurring facility (USD when available). | S |
| FR-30 | Subscription management: upgrade, cancel (access until period end), payment failure handling. | S |

### 2.6 Admin

| ID | Requirement | Priority |
|---|---|---|
| FR-31 | Admin panel with role-restricted access: ID review queue (FR-6), content error-report queue (FR-18), course/catalog management, quiz pass-threshold configuration, user lookup (view status, resend OTP, revoke access). | M |
| FR-32 | Admin dashboard for cost/usage observability: AI generation spend, cache hit rate, quiz purchases, signup funnel drop-off. | M |
| FR-33 | Manual course curation: admins can edit or unpublish any AI-generated lesson. | M |
| FR-34 | **Owner oversight (non-blocking):** every content publication (FR-11) and correction (FR-18) is audit-logged (NFR-8) and surfaced to the owner as a reviewable change digest; the owner can edit or **unpublish any content instantly** at any time. Publication is never blocked waiting on the owner. | M |

### 2.7 Book Affiliate Links & Repeat Purchase (new — product plan Decision #19, #23)

| ID | Requirement | Priority |
|---|---|---|
| FR-35 | Each subject on a learner's weakness report (FR-23) links to standard reference books for that subject, hyperlinked to an Amazon and/or Flipkart/similar-shop search or product page, tagged with `AMAZON_AFFILIATE_TAG` / `FLIPKART_AFFILIATE_ID` when configured. Bodhi never sells or hosts PDF books, and the book payment happens entirely on the third-party shop. | M |
| FR-36 | After a learner finishes (or at any time owns) a mock bunch, they can purchase **another ₹249 bunch**. Each additional bunch purchased after the starter bunch must cover **all current UPSC subjects** available in the question bank at that time, not only the starter subset (Prelims GS Paper I + CSAT, and Mains). | M |

## 3. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-1 | **Security:** All traffic over HTTPS; passwords hashed (bcrypt/argon2); OWASP Top 10 protections (parameterized queries, output encoding, CSRF protection); rate limiting on auth, OTP, and generation endpoints. |
| NFR-2 | **Sensitive data:** ID documents and phone numbers encrypted at rest; ID files served only via short-lived signed URLs to authorized admins; Aadhaar numbers masked in any UI display. |
| NFR-3 | **Compliance:** India DPDP Act — explicit consent at collection, purpose limitation, user data-deletion rights, breach notification readiness. Published Privacy Policy and Terms of Service (with refund policy **[OQ-6]**) required before launch. |
| NFR-4 | **Payments:** No card data stored on our servers; PCI scope delegated to the gateway. |
| NFR-5 | **Availability & performance:** Web app responsive on mobile browsers (web-first, no native apps in v1); cached lesson pages load < 3s on typical Indian mobile connections; AI generation requests show progress state and complete or fail visibly (no silent hangs). |
| NFR-6 | **Localization:** Full UI string externalization for en/hi/bn; Unicode-correct rendering of Devanagari and Bengali scripts, including in generated PDFs. |
| NFR-7 | **Cost control:** Per-day and per-month AI spend limits with alerting; generation is blocked (with a friendly message) rather than unbounded if limits are hit. |
| NFR-8 | **Auditability:** Payment events, certificate issuance, ID-review decisions, and admin actions are logged immutably. |
| NFR-9 | **Data deletion:** Account deletion removes personal data (profile, phone, ID documents) within a defined SLA while retaining legally required payment records. |
| NFR-10 | **Accessibility:** WCAG 2.1 AA targeted for core learner flows. |

## 4. Explicitly Out of Scope for v1

- Native mobile apps (web-first; responsive web serves mobile users).
- User-generated courses or instructor marketplace.
- Community features (forums, discussions, messaging).
- Automated third-party KYC verification (decided [OQ-5]: manual admin review in v1; automated KYC revisited at scale).
- Webcam proctoring of quizzes (decided [OQ-4]: quizzes are time-bound without proctoring).
- Languages beyond English, Hindi, Bengali for the UI/free lessons; mock-test content beyond English and Hindi (Mains regional languages are wanted eventually but the list is not locked — product plan Decision #23).
- Issuing or proxying external certifications — the platform provides *preparation* only.
- Selling or hosting PDF books — book monetization is affiliate-link only (product plan Decision #19).

## 5. Dependencies & Prerequisites

| Dependency | Needed for | Note |
|---|---|---|
| AI provider account (text generation) | FR-11–FR-14, FR-22 | Provider choice pending (Phase 0) |
| AI video tooling + YouTube channel | FR-16 | Channel must exist before any video embedding; monetization much later |
| Payment gateway onboarding (e.g., Razorpay) | FR-20 | Individual/sole-proprietor onboarding with owner's PAN + bank account (no registered entity yet — decided path [OQ-9]); USD deferred |
| SMS OTP provider | FR-4 | Per-SMS cost in India |
| Domain + hosting | Everything | Name decided: **Bodhi** [OQ-1]; domain/trademark availability check still required before launch |
| Privacy Policy / ToS drafts | NFR-3 | Launch blocker |

## 6. Traceability of Open Decisions

All **[OQ-n]** references point to Section 12 (Decisions Log & Open Questions) of `docs/PRODUCT_PLAN.md`, which records each item's status — decided or still open. No requirement with an open item will be implemented on an assumed answer; where a placeholder is unavoidable (e.g., re-attempt pricing), it is built as **admin-configurable** so the decision can be applied without code changes.

**Still open after the latest owner review:** the free-tier daily generation cap [OQ-7] (premium tier itself is now **parked**, not merely deferred — product plan Decision #18, so FR-29/FR-30 are inactive until the owner revisits it); the Mains regional-language list (product plan Decision #23); and mock-attempt certificates (product plan Decision #24). Operational prerequisites that remain are tasks, not decisions: domain/trademark check for "Bodhi", payment gateway individual onboarding, YouTube channel creation, and Privacy Policy / Terms of Service drafting.
