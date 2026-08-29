# Learnzy Owner's Guide — for a non-technical founder

This guide assumes **zero coding or GitHub knowledge**. It explains what exists, how to see it, how to run your pilot session, and exactly which accounts only you can create. Keep it bookmarked — it will be updated as the product grows.

---

## 1. What has been built (the pilot)

A working website called **Learnzy** with the full learner journey:

1. A visitor signs up with name, email, phone, and password.
2. They verify their phone with a 6-digit code and upload an ID document (PAN, Aadhaar, driving license, student or employee ID).
3. You (as admin) approve their ID from the Admin page.
4. They pick a course, pay the entry quiz fee, and take a timed 5-question quiz (60% to pass, not proctored).
5. Passing unlocks the course free and issues a downloadable **quiz certificate**.
6. Finishing all lessons issues a free **completion certificate**. Anyone can verify a certificate's authenticity at the "Verify a certificate" page.
7. The site works in **English, Hindi, and Bengali** (buttons at the top right).
8. Four demo courses are pre-loaded: Class 10 Maths (₹249), Oceanography (₹499), SSC General Awareness (₹499), and AWS Cloud Practitioner prep (₹1,499) — one from each part of your pricing table.

### What "pilot mode" means (important)

Three things are deliberately simulated so the pilot works **without spending money or sharing personal accounts**:

| Feature | In the pilot | In the live version |
|---|---|---|
| Payments | A "Test Mode" button records the payment without moving real money | Razorpay checkout with real UPI/cards |
| Phone OTP | The code appears on screen | The code arrives by SMS |
| AI course generation | Shows a friendly "not active yet" message (the 4 demo courses work fully) | Generates any course on demand, once you add an AI key |

Everything else — accounts, ID review, quizzes, certificates, admin panel, the three languages — is fully real.

### The admin account

- Email: `admin@learnzy.test`
- Password: `admin123`

**Change this before showing the site to strangers** (ask your developer/agent to set an `ADMIN_PASSWORD`). The admin sees an extra "Admin" link in the top menu with: the ID review queue, error reports, publish/unpublish buttons for every course, and an audit log of everything that happens.

---

## 2. GitHub in five minutes (what it is, what you do there)

**GitHub is like Google Drive for code, with a review system.** Your project lives at `github.com/Ankita393-crypto/Ankita-Chakraborty`. Three words to know:

- **Repository ("repo")** — the folder holding all the project's files. Yours is named `Ankita-Chakraborty`.
- **Branch** — a draft copy of the project where changes are made without touching the original. Our work is on a branch called `cursor/product-plan-and-requirements-d16a`.
- **Pull request ("PR")** — a request to accept a draft into the main project, with a page where you can read what changed and comment. Ours is **PR #1**.

**The only two things you need to do on GitHub:**

1. **Read the PR.** Open the PR link, read the description, and scroll the "Files changed" tab if curious. You can leave comments on anything.
2. **Merge when satisfied.** The green **"Merge pull request"** button accepts the draft into the main project. Only press it when you're happy — and you can always ask for changes first by writing a comment.

You never need to write code, use commands, or fear breaking something by *reading*. Nothing changes until "Merge" is pressed.

---

## 3. How to see the website with your own eyes

Two options, easiest first.

### Option A — Ask the agent (zero effort)

Tell your AI agent (in Cursor) to "run the pilot and test it" — it can start the site, click through it, and send you screenshots or a screen recording. You can also complete the onboarding at [cursor.com/onboard](https://cursor.com/onboard) so the agent can do manual browser testing for you.

### Option B — Run it on your own computer (about 20 minutes, one-time setup)

1. **Install Node.js** (the engine that runs the site): go to [nodejs.org](https://nodejs.org), download the "LTS" version, and install it like any normal program.
2. **Download the code**: on the GitHub repo page, make sure the branch dropdown (top left, says `main` or similar) is set to `cursor/product-plan-and-requirements-d16a`, then click the green **Code** button → **Download ZIP**. Unzip it somewhere easy, like your Desktop.
3. **Open a terminal**: on Windows, open the unzipped folder, click the address bar, type `cmd`, press Enter. On Mac, open the Terminal app and type `cd ` (with a space) then drag the folder onto the window and press Enter.
4. **Type these two commands**, pressing Enter after each (the first takes a few minutes):

```bash
npm install
npm run dev
```

5. **Open your browser** at `http://localhost:3000`. That's Learnzy, running on your machine. Press `Ctrl+C` in the terminal to stop it.

### A note on putting the pilot on the internet

For friends/testers in other places, the pilot can be deployed to a free hosting service (e.g., Render). One honest caveat: the pilot stores its data in a simple file, so on free hosting **data resets whenever the site redeploys**. That's acceptable for a pilot demo; the production version will use a proper database that never loses data. Ask the agent to set up deployment when you're ready.

---

## 4. Your pilot session script (run this with 3–10 testers)

1. Before the session, log in as admin yourself and keep the Admin page open.
2. Ask each tester to: sign up → verify phone (the code shows on screen — tell them that's pilot-only) → upload any image as their "ID" (it's a pilot; a photo of anything works).
3. Approve their IDs from your Admin page as they come in (refresh the page).
4. Ask them to pick a course, press the Test-Mode pay button, and take the quiz **without help** — note where they get confused.
5. Ask the passers to read a lesson, mark it complete, and download their certificate.
6. Ask everyone to press "Report an error" at least once with honest feedback — you'll see all reports in the Admin page.
7. Afterwards, write down: where people hesitated, what they asked you, what they expected that didn't exist. That list drives the next build round.

---

## 5. Accounts only YOU can create (the go-live checklist)

These must be in your name — they involve your identity, your bank, and your money. None are needed for the pilot; all are needed to go live. For each one, the agent wires it in once you paste the keys.

| # | Account | What it unlocks | Where | Rough cost |
|---|---|---|---|---|
| 1 | **OpenAI API key** (or similar AI provider) | Real AI course generation in all 3 languages | platform.openai.com → API keys | Pay-per-use; small at pilot scale (rupees per course generated) |
| 2 | **Razorpay** (individual/sole-proprietor onboarding) | Real UPI + domestic card payments | razorpay.com → sign up with PAN + bank account | Free to open; ~2% per transaction |
| 3 | **SMS provider** (MSG91 or Twilio) | Real OTP by SMS | msg91.com | Paise per SMS |
| 4 | **Google Cloud OAuth credentials** | "Sign in with Google" button | console.cloud.google.com | Free |
| 5 | **Domain name** | learnzy.in / learnzy.com (check availability!) | Any registrar (GoDaddy, Namecheap, Hostinger) | ~₹300–1,500/year |
| 6 | **YouTube channel** | Hosting your AI videos + future ad revenue | youtube.com (any Google account) | Free |
| 7 | **Hosting account** | The live website | Render / Railway / a small VPS | Free tier for pilot; ~₹400–800/month early on |

**Security rule: API keys are passwords. Never paste them into chat messages, emails, or WhatsApp.** Your hosting service and Cursor's dashboard (Cloud Agents → Secrets) have dedicated "secrets" pages for them.

---

## 6. What is deliberately NOT in the pilot

So you're never surprised: Google sign-in (needs your OAuth account), real payments and refunds-free checkout text on a real gateway, real SMS, AI generation (needs your key), YouTube video embeds (needs your channel's videos), the premium subscription tier (price deliberately deferred), and automated ID verification (you decided manual review). All of these are in the requirements document and slot in as the accounts above get created.
