# CLAUDE.md

This file provides guidance to AI assistants (Claude and others) working with this repository.

## Repository Overview

**Repository:** Ankita393-crypto/Ankita-Chakraborty
**Remote:** Configured via local proxy at `127.0.0.1:33433`
**Status:** Initial setup — no source code committed yet.

> When source code is added, update this file to reflect the actual technology stack, structure, and conventions.

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
