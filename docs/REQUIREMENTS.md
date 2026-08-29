# Requirements Document — AnantVidya (proposed name, pending owner approval)

**Document status:** Draft v2 for review
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
| FR-9 | Visitors and learners can browse/search the course catalog without payment; course *content* is locked until the entry quiz is passed. | M |
| FR-10 | Two content track types: **General subjects** (any teachable topic) and **Certification prep** (materials for external certifications; the platform does not award external certifications and the UI must state this). Certification-prep launch scope (decided [OQ-10]): Indian central government exams, state government exams, Generative AI certifications, AWS, and PMP — seeded with the highest-demand exams, long tail added via FR-11 requests. | M |
| FR-11 | Learners can request a course on a topic not yet in the catalog; the system generates it via AI (subject to FR-12 limits) and adds it to the catalog for everyone. | M |
| FR-12 | Free-tier learners have a daily cap on *new* (never-before-generated) lesson generation requests; cached/stored lessons are unlimited for eligible learners. Cap value: **[OQ-7]**. | M |
| FR-13 | AI-generated lessons are stored (cached) per topic **per language** and reused for subsequent learners. | M |
| FR-14 | Course content is available in **English, Hindi, and Bengali**; the learner's language preference selects both UI language and content language. | M |
| FR-15 | Lessons, notes, and certification-prep documents are downloadable (PDF). | M |
| FR-16 | Course pages can embed videos from the platform's YouTube channel. Video availability is optional per course (text lessons alone are sufficient for launch). | M |
| FR-17 | Every AI-generated lesson displays a disclaimer: *"This content is AI-generated. Verify independently before professional or medical use."* High-stakes categories (medicine, law, finance) display a stronger variant. | M |
| FR-18 | Every lesson has a "Report an error" control; reports enter an admin review queue; corrected lessons replace the cached version. Reviewer assignment: **[OQ-8]**. | M |

### 2.3 Entry Quiz & Payments (the core gating mechanic)

| ID | Requirement | Priority |
|---|---|---|
| FR-19 | Each course has a **basic knowledge entry quiz**. A learner must pay for and pass this quiz to unlock the (free) course. | M |
| FR-20 | Quiz payment is accepted in **INR** (UPI, cards, net banking via an Indian gateway, e.g., Razorpay) and **USD** (cards). Price per attempt is **admin-configurable per course within ₹249–₹2,499** (decided [OQ-2]); the USD price is set per course as the equivalent. The checkout screen displays the no-refund policy before payment. | M |
| FR-21 | Payment is only available to learners whose ID status is *approved* (FR-6). | M |
| FR-22 | Quiz questions are AI-generated per course, stored, and drawn as a randomized subset per attempt; quizzes are timed. Deeper anti-cheating (proctoring etc.): **[OQ-4]**. | M |
| FR-23 | Pass threshold is configurable per course (default: to be set by admin). On pass: course unlocks permanently for that learner and a certificate is issued (FR-26). On fail: result shown with score; re-attempt pricing (full price / discounted / one free retry) remains open **[OQ-2]** and will be built admin-configurable. | M |
| FR-24 | All payments produce a receipt (email + downloadable); learners can view payment history. | M |
| FR-25 | Payment webhooks reconcile gateway status; a paid-but-not-started quiz attempt remains available to the learner. **No refunds** (decided [OQ-6]): all quiz payments are final; the system offers no refund flow, and the policy appears in the ToS and at checkout. | M |

### 2.4 Certificates

| ID | Requirement | Priority |
|---|---|---|
| FR-26 | Passing an entry quiz issues a **downloadable PDF certificate** bearing the learner's profile name, course name, date, and a unique verification ID. | M |
| FR-27 | A public verification page confirms a certificate's authenticity by verification ID (shows name, course, date — no other personal data). | M |
| FR-28 | **Course-completion certificate** (decided [OQ-3]): the system tracks lesson-level progress, and when a learner completes all lessons of an unlocked course, a second downloadable PDF certificate is issued with its own verification ID (same format as FR-26/FR-27). Included at no extra charge (owner to confirm the free-of-charge assumption). | M |

### 2.5 Premium Tier (Phase 2)

| ID | Requirement | Priority |
|---|---|---|
| FR-29 | Monthly subscription (price **[OQ-7]**) removing the daily new-generation cap and adding personalized study plans. Billed in INR/USD via the payment gateway's recurring facility. | S |
| FR-30 | Subscription management: upgrade, cancel (access until period end), payment failure handling. | S |

### 2.6 Admin

| ID | Requirement | Priority |
|---|---|---|
| FR-31 | Admin panel with role-restricted access: ID review queue (FR-6), content error-report queue (FR-18), course/catalog management, quiz pass-threshold configuration, user lookup (view status, resend OTP, revoke access). | M |
| FR-32 | Admin dashboard for cost/usage observability: AI generation spend, cache hit rate, quiz purchases, signup funnel drop-off. | M |
| FR-33 | Manual course curation: admins can edit or unpublish any AI-generated lesson. | M |

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
- Webcam proctoring of quizzes (unless **[OQ-4]** decides otherwise).
- Languages beyond English, Hindi, Bengali.
- Issuing or proxying external certifications — the platform provides *preparation* only.

## 5. Dependencies & Prerequisites

| Dependency | Needed for | Note |
|---|---|---|
| AI provider account (text generation) | FR-11–FR-14, FR-22 | Provider choice pending (Phase 0) |
| AI video tooling + YouTube channel | FR-16 | Channel must exist before any video embedding; monetization much later |
| Payment gateway onboarding (e.g., Razorpay) | FR-20 | Requires business KYC **[OQ-9]** |
| SMS OTP provider | FR-4 | Per-SMS cost in India |
| Domain + hosting | Everything | Proposed name **AnantVidya** pending owner approval and domain/trademark check **[OQ-1]** |
| Privacy Policy / ToS drafts | NFR-3 | Launch blocker |

## 6. Traceability of Open Decisions

All **[OQ-n]** references point to Section 12 (Decisions Log & Open Questions) of `docs/PRODUCT_PLAN.md`, which records each item's status — decided or still open. No requirement with an open item will be implemented on an assumed answer; where a placeholder is unavoidable (e.g., re-attempt pricing), it is built as **admin-configurable** so the decision can be applied without code changes.

**Still open after the latest owner review:** re-attempt pricing on quiz failure [OQ-2], stronger quiz anti-cheating [OQ-4], premium price and free-tier cap [OQ-7], content-error reviewer [OQ-8], business entity for payment-gateway KYC [OQ-9], and final approval of the proposed name [OQ-1].
