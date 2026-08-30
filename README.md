# Learnzy

Learn anything. Prove it. For free.

Learnzy is an AI-powered learning platform: learners pass a small paid entry quiz to unlock any course free, study AI-generated lessons in English, Hindi, or Bengali, and earn downloadable, publicly verifiable certificates. Certification-prep tracks cover Indian central and state exams, Gen AI, AWS, and PMP.

**This is the pilot build.** Payments run in test mode (no real money), OTP codes appear on screen instead of SMS, and AI generation activates once an API key is added. See `docs/OWNER_GUIDE.md` for the non-technical guide, `docs/PRODUCT_PLAN.md` for the product plan, and `docs/REQUIREMENTS.md` for the full requirements.

## Run it

Requires [Node.js](https://nodejs.org) 20+.

```bash
npm install
npm run dev
```

Open http://localhost:3000. The database (SQLite) and demo courses are created automatically on first run.

- Admin login: `admin@learnzy.test` / `admin123` (override with the `ADMIN_PASSWORD` environment variable before first run)
- Optional environment variables: `OPENAI_API_KEY` (enables AI course generation), `AI_MODEL` (default `gpt-4o-mini`)

## Stack

- Next.js 16 (App Router, server actions) + TypeScript + Tailwind CSS
- SQLite via better-sqlite3 (pilot; production migrates to Postgres)
- Runtime data lives in `data/` (gitignored): database + uploaded ID documents

## Structure

- `app/` — pages and server actions (`app/actions.ts` holds all business logic)
- `lib/` — database schema/seed, auth sessions, i18n dictionaries, AI generation
- `docs/` — product plan, requirements, owner's guide
