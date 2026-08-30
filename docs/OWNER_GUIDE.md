# Bodhi Owner's Guide — for a non-technical founder

This guide assumes **zero coding or GitHub knowledge**. It explains what exists, how to see it, how to run your pilot session, and exactly which accounts only you can create. Keep it bookmarked — it will be updated as the product grows.

---

## 1. What has been built (the pilot)

A working website called **Bodhi**. The old idea — "pay to unlock a free course" — is **cancelled**; it no longer applies. The product is now **UPSC mock tests**, plus a few free demo lessons kept as supporting material. The learner journey:

1. A visitor signs up with name, email, phone, and password.
2. They verify their phone with a 6-digit code and upload an ID document (PAN, Aadhaar, driving license, student or employee ID).
3. You (as admin) approve their ID from the Admin page.
4. They pick a mock series and **pay ₹249 once** — this unlocks that series **forever** (not a per-attempt fee). Two are pre-loaded today: **UPSC Prelims GS Paper I** and **UPSC Prelims CSAT**, each ₹249. (The app's screens still say "1000 papers" in places — that number is being retired as a promise, because papers are built from a question bank that is still small, so different paper numbers currently repeat many of the same questions. You decide the new public wording; see the "Open decisions" list in the product plan.)
5. They sit a mock paper built to match the real UPSC exam (timing, marking scheme, question count) — not a short quiz — and can retake papers unlimited times, forever, from that one payment. The site shows an honest note on each series page while the question bank is still growing.
6. After each attempt they see the **correct option and a detailed explanation** for every question, plus a subject-wise weakness report. Weak subjects link out to reference books on Amazon/Flipkart (commission tags activate once you register — see Section 5A(B)/(C)); Bodhi never sells the book itself.
7. **Not yet built:** a UPSC Mains mock series and Hindi-language mock papers — these are agreed next steps (product plan Decision #23), not live in the pilot yet.
8. The site's general UI and free lessons work in **English, Hindi, and Bengali** (buttons at the top right); the two mock series themselves are English-only until Hindi is added.

**Note:** the old quiz/certificate flow (pass a 5-question quiz to unlock a free course, then a completion certificate) described in earlier versions of this guide is superseded and no longer how the pilot works.

### What "pilot mode" means (important)

Three things are deliberately simulated so the pilot works **without spending money or sharing personal accounts**:

| Feature | In the pilot | In the live version |
|---|---|---|
| Payments | A "Test Mode" button records the payment without moving real money | Razorpay checkout with real UPI/cards |
| Phone OTP | The code appears on screen | The code arrives by SMS |
| AI course generation | Shows a friendly "not active yet" message (the 4 demo courses work fully) | Generates any course on demand, once you add an AI key |

Everything else — accounts, ID review, quizzes, certificates, admin panel, the three languages — is fully real.

### The admin account

- Email: `admin@bodhi.test`
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

5. **Open your browser** at `http://localhost:3000`. That's Bodhi, running on your machine. Press `Ctrl+C` in the terminal to stop it.

### A note on putting the pilot on the internet

For friends/testers in other places, the pilot can be deployed to a free hosting service (e.g., Render). On your own computer, Bodhi already uses a built-in database (data stays in the project's `data/mongo` folder). For a live website, connect a free MongoDB Atlas database first (section 5B) so accounts and certificates are not wiped when hosting restarts. Ask the agent to set up deployment when you're ready.

---

## 4. Your pilot session script (run this with 3–10 testers)

1. Before the session, log in as admin yourself and keep the Admin page open.
2. Ask each tester to: sign up → verify phone (the code shows on screen — tell them that's pilot-only) → upload any image as their "ID" (it's a pilot; a photo of anything works).
3. Approve their IDs from your Admin page as they come in (refresh the page).
4. Ask them to pick a mock series, press the Test-Mode pay button, and sit a mock paper **without help** — note where they get confused.
5. Ask them to review the answer explanations and weakness report, and click through a book link.
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
| 5 | **Domain name** | bodhi.in / bodhi.com (check availability!) | Any registrar (GoDaddy, Namecheap, Hostinger) | ~₹300–1,500/year |
| 6 | **YouTube channel** | Hosting your AI videos + future ad revenue | youtube.com (any Google account) | Free |
| 7 | **Hosting account** | The live website | Render / Railway / a small VPS | Free tier for pilot; ~₹400–800/month early on |

**Security rule: API keys are passwords. Never paste them into chat messages, emails, or WhatsApp.** Your hosting service and Cursor's dashboard (Cloud Agents → Secrets) have dedicated "secrets" pages for them.

---

## 5A. Getting the keys, step by step (fresher edition)

**What an "API key" actually is.** When Bodhi needs another company's service (OpenAI's brain, Amazon's commission tracking), it calls that company's computers over the internet. The API key is like a SIM card: it identifies *your* account so the usage — and the bill or the commission — lands on you. That's the whole mystery. A key is just a long password string you copy from their website and paste into one settings file.

**Where keys go.** The project has a template file called `.env.example`. Make a copy named `.env.local`, fill in the values, restart the site — done. The code already knows the names (`OPENAI_API_KEY`, `AMAZON_AFFILIATE_TAG`, `FLIPKART_AFFILIATE_ID`); features switch on automatically when a value appears. `.env.local` never leaves your computer (it is deliberately excluded from GitHub). On a hosting service like Render, you don't upload the file — you type the same names/values into its **Environment Variables** page.

### A. OpenAI key (unlocks AI courses, study chapters, question-bank growth)

1. Go to **platform.openai.com** (this is the developer site — different from chatgpt.com) and create an account with your email or Google.
2. Open **Settings → Billing** and add credits. It's prepaid, minimum $5 (~₹450): you load money first, usage draws it down, and it can never charge more than you loaded. An international-enabled debit/credit card is needed.
3. Open **API keys → "Create new secret key"**. Name it "bodhi". The key (starts with `sk-`) is shown **only once** — copy it immediately into `.env.local` as `OPENAI_API_KEY=sk-...`.
4. Restart the site. The admin page's "Generate with AI" buttons, the `/learn` study chapters, and AI course generation all come alive.

*Cost sense:* the default model (gpt-4o-mini) costs fractions of a paisa per question generated. Your $5 will last the whole pilot. If a key ever leaks, log in and delete it — that kills it instantly, and you make a new one.

### B. Amazon Associates (commission on book links)

1. Amazon requires a **live, public website** to approve you — so this comes *after* hosting, not before.
2. Go to **affiliate-program.amazon.in** and sign in with any Amazon account. Fill the application: your website address, what it's about (exam preparation), how you bring visitors.
3. You receive a **tracking ID** (also called a Store ID), e.g. `bodhi-21`. Put it in `.env.local` as `AMAZON_AFFILIATE_TAG=bodhi-21`. Every book button on the site starts carrying your commission tag automatically.
4. **The 180-day rule:** Amazon closes accounts that don't produce **3 qualifying sales within 180 days**. You can reapply, but the cleanest path is to apply once real learners are on the site.
5. Payouts go to your bank account after a minimum threshold; commission on books is a few percent of the sale.

### C. Flipkart (commission on the other book button)

Honest status: Flipkart has kept **direct** affiliate registration paused for new individuals for years. Two routes:

- **If you ever get a direct Flipkart affiliate account:** put its ID in `FLIPKART_AFFILIATE_ID=` and you're done — the buttons already support it.
- **The realistic route:** free "aggregator" networks — **Cuelinks** (cuelinks.com) or **EarnKaro** (earnkaro.com) — have standing partnerships with Flipkart. You sign up (KYC = PAN + bank details), and they give you converted links or a small website script that turns ordinary Flipkart links into commission-earning ones. They take a cut of the commission, and pay out to your bank from as little as ₹10. When you choose one, the agent wires its link format in — a small change.

Until either exists, the Flipkart buttons still work perfectly as plain links; you just don't earn on them yet. The Amazon button is the one to prioritise.

### D. Razorpay (real ₹249 payments — replaces Test Mode)

1. Go to **razorpay.com → Sign Up**. Choose **Individual / Sole proprietorship** — no registered company needed.
2. KYC: your **PAN**, **bank account number + IFSC**, and address proof. Approval typically takes a few days.
3. From the Razorpay dashboard you get **two** keys: a **Key ID** (public) and a **Key Secret** (private). When you have them, the agent replaces the Test-Mode button with real Razorpay checkout (UPI + cards) — this is a code change on our side, already planned in the requirements.
4. Cost: free to open; Razorpay keeps ~2% of each payment. Money settles to your bank account automatically (T+2 days by default).

### The sensible order

1. **Now:** OpenAI key — it works even on your local test site and unlocks the biggest features.
2. **Next:** MongoDB Atlas (free) + hosting + domain, so the site has a public address and permanent data.
3. **Then:** Amazon Associates (needs the live site) and Razorpay KYC (takes days — start early).
4. **Whenever:** Cuelinks/EarnKaro for Flipkart earnings.

---

## 5B. Your database: MongoDB Atlas, step by step (free)

**What this is.** The database is where everything lives: accounts, payments, exam attempts, certificates. On your own computer, Bodhi runs a built-in database automatically — you install nothing, and the data sits in the project's `data/mongo` folder. That's perfect for testing. But for the live website you want the database in the cloud, so it's never wiped when the hosting service restarts, and it's backed up by professionals. MongoDB Atlas is the official cloud service, and its smallest tier (called **M0 / Free**) is genuinely free forever — no card required.

**What the three buttons on "Create New Cluster" mean (the screen you are on now):**

| Button | Meaning | For Bodhi? |
|---|---|---|
| **Free** | Shared server, 512 MB storage, $0 forever | **Yes — choose this** |
| **Flex** | Pay-as-you-go (about $0.011/hour, capped near $30/month) | No — skip for the pilot |
| **Dedicated** | Your own paid server for large products | No — far too early |

If **Flex** is highlighted in green and the bottom bar shows a price, click **Free** first. The bottom price should become **$0.00**. Keep **AWS** and **Mumbai (ap-south-1)** — that region is already the right choice for Indian learners.

**Then click Create Cluster** (only after Free is selected and the price is $0.00). The cluster takes **1–3 minutes** to become ready. A green/idle status means it is done. Do not close the tab.

### Exact clicks after “Create Cluster”

Atlas will either pop up a **security / quick-start** wizard, or you will use the left-hand menu. Same three jobs either way: a database user, network access, then a connection string.

**A. Database user** (this is *not* your Atlas login — it is the username the website uses)

1. If you see a wizard titled something like **Security Quickstart** or **Create a database user**, stay there. Otherwise click **Database Access** (under Security) in the left menu, then **Add New Database User**.
2. Authentication: **Password**.
3. Username: type `bodhi`.
4. Password: click **Autogenerate Secure Password**.
5. **Copy that password immediately** into a private note on your computer (Notepad is fine). Atlas will not show it again.
6. Privileges: **Read and write to any database** is enough for the pilot.
7. Click **Add User** / **Create Database User**.

**B. Network access** (who is allowed to reach the database)

1. In the wizard, choose **My Local Environment** / **Allow access from anywhere**, **or** click **Network Access** in the left menu → **Add IP Address**.
2. Click **Allow Access from Anywhere**. You should see `0.0.0.0/0`.
3. Confirm / **Add**. The database still needs the password from step A — this only means you do not have to approve every new Wi‑Fi address by hand during the pilot.

**C. Connection string** (the one-line address Bodhi puts in its settings file)

1. Wait until the cluster card says **Idle** or shows a green ready state (not “Creating…”).
2. On the cluster card, click **Connect**.
3. Choose **Drivers** (not Compass, not Shell, not VS Code).
4. Driver: **Node.js**. Leave the version as the default.
5. Copy the long string. It looks like:
   `mongodb+srv://bodhi:<password>@cluster0.ab1cd.mongodb.net/`
6. Replace `<password>` — including the `<` and `>` — with the password you saved in step A. No spaces. If the password has special characters (`@`, `#`, `/`), tell the agent “my password has special characters” and they will URL-encode it for you — **do not paste the password into chat**.

**D. Put it on your computer (never in chat)**

1. In the Bodhi project folder, copy `.env.example` and name the copy **`.env.local`** (the leading dot is required).
2. Find the line `MONGODB_URI=` and paste the full string right after the `=`, on one line, no quotes.
3. Save the file. Restart the site (`Ctrl+C` in the terminal, then `npm run dev` again).
4. On a hosting service later, type the same name `MONGODB_URI` into that host’s **Environment Variables** page instead of uploading the file.

When this is done, tell the agent only: **“Atlas is connected”** or **“I’m stuck on step …”**. Never paste the connection string, password, or API keys into chat.

**Rules of thumb:**
- The connection string contains your database password — treat it exactly like an API key (never in chat/email/WhatsApp).
- The free M0 tier holds 512 MB — far more than the whole pilot will use.
- Your Atlas dashboard has a "Browse Collections" button: you can literally *see* your users, payments, and certificates there. Look but don't edit by hand.
- If Atlas ever asks for a credit card to "upgrade", you can decline. Free does not require a card.
- Free clusters can pause after ~60 days of total inactivity; one visit wakes them. With real learners this does not happen.

---

## 6. What is deliberately NOT in the pilot

So you're never surprised: Google sign-in (needs your OAuth account), real payments and refunds-free checkout text on a real gateway, real SMS, AI generation (needs your key), YouTube video embeds (needs your channel's videos), a UPSC Mains mock series, Hindi-language mock papers, the premium membership (parked — not planned or built for now), and automated ID verification (you decided manual review). All of these are in the requirements document and slot in as the accounts above get created.
