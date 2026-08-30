# CLAUDE.md

This file provides guidance to AI assistants (Claude and others) working with this repository.

## Repository Overview

**Repository:** Ankita393-crypto/Ankita-Chakraborty
**Remote:** Configured via local proxy at `127.0.0.1:33433`
**Status:** Bodhi pilot — a Next.js 16 (App Router) + TypeScript + Tailwind web app with MongoDB (official driver; embedded local MongoDB for dev via mongodb-memory-server, MongoDB Atlas via `MONGODB_URI` for production). End-to-end tests: `node e2e-test.mjs` (Playwright, requires the dev server running).

- Product: AI-powered UPSC mock-test platform (₹249 one-time per 1,000-paper mock bunch, unlimited retakes; book affiliate links on Amazon/Flipkart; free supporting lessons in EN/HI/BN, mocks in EN/HI). The earlier "pay a quiz to unlock a free course" model is cancelled — see `docs/PRODUCT_PLAN.md` Decision #16/#23.
- Key paths: `app/actions.ts` (all server actions/business logic), `lib/db.ts` (schema), `lib/seed.ts` (demo data), `docs/` (product plan, requirements, owner guide).
- Build: `npm run build`. Dev: `npm run dev`. Runtime data in `data/` (gitignored).
- Pilot simulations: test-mode payments, on-screen OTP, AI generation gated on `OPENAI_API_KEY`.
- The repository owner is non-technical; keep PR descriptions and summaries in plain language.

---

## Git Workflow

### Branch Naming

- Feature/AI branches must start with `claude/` and end with a matching session ID.
  - Example: `claude/add-claude-documentation-3mPgw`
- Never push to `main` or `master` without explicit user permission.

### Standard Commit Flow

```bash
git add <specific-files>          # Stage only relevant files; avoid `git add -A`
git commit -m "descriptive message"
git push -u origin <branch-name>
```

### Push Rules

- Always use `git push -u origin <branch-name>`.
- On network failure, retry up to 4 times with exponential backoff: 2s → 4s → 8s → 16s.
- Never use `--force` on shared branches without explicit permission.
- Never skip hooks (`--no-verify`) unless explicitly asked.

### Branch Hygiene

- Create the feature branch locally if it does not exist before committing.
- Fetch specific branches rather than all refs: `git fetch origin <branch-name>`.

---

## Development Conventions (to be filled in once code exists)

### Code Style

> Update this section with language-specific linting and formatting rules once the tech stack is established.

- Follow the style conventions of the primary language in use.
- Do not add comments or docstrings to unchanged code.
- Prefer editing existing files over creating new ones.

### Testing

> Update this section with test runner commands, test file locations, and coverage requirements.

- Run all tests before committing.
- Do not mark tasks complete if tests are failing.

### Dependencies

> Update this section with package manager commands (npm, pip, cargo, etc.) once determined.

- Pin dependency versions in lockfiles.
- Do not introduce new dependencies without noting them in the commit message.

---

## AI Assistant Guidelines

### Scope of Changes

- Only make changes directly requested or clearly necessary.
- Do not refactor surrounding code, add extra error handling, or introduce abstractions beyond what is needed.
- Do not create new files unless absolutely required.

### Security

- Never commit secrets, credentials, or `.env` files.
- Validate input at system boundaries; trust internal framework guarantees.
- Do not introduce OWASP Top 10 vulnerabilities (SQL injection, XSS, command injection, etc.).

### Reversibility

- Prefer reversible, local actions (editing files, running tests) without asking.
- For destructive or shared-state operations (force push, dropping tables, sending messages), confirm with the user first.

### Communication

- Be concise. Lead with the action or answer, not the reasoning.
- Reference code with `file_path:line_number` format for easy navigation.
- Do not use emojis unless explicitly asked.

---

## Updating This File

When the project gains a defined tech stack and structure, update the following sections:

1. **Repository Overview** — describe the project purpose, stack, and key entry points.
2. **Development Conventions** — add linting, formatting, and code style details.
3. **Testing** — add test runner commands and coverage expectations.
4. **Dependencies** — add package manager and install instructions.
5. **Build & Deployment** — add build commands and CI/CD pipeline overview.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
