cd templates
npx create-next-app@latest TEMPLATE_NAME --yes

--yes skips prompts using saved preferences or defaults. The default setup enables TypeScript, Tailwind CSS, ESLint, App Router, and Turbopack, with import alias @/\*, and includes AGENTS.md (with a CLAUDE.md that references it) to guide coding agents to write up-to-date Next.js code.
