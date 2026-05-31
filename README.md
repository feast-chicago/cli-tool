# FEAST App CLI Tool

A command-line tool for provisioning and managing FEAST restaurant websites. When you onboard a new client, this tool handles everything in one flow — prompting you for the business details, provisioning their Clerk org and user account, seeding their Supabase record, and scaffolding a configured Next.js project ready to run.

---

## Prerequisites

Before using this tool, make sure you have the following installed and configured:

- **Node.js** v18 or later
- **tsx** (installed as a dev dependency — no global install needed)
- A **Clerk** account with an API secret key
- A **Supabase** project with a `businesses` table matching the schema
- **Git** and the **GitHub CLI** (`gh`) authenticated on your machine

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/feast-chicago/cli-tool.git
cd cli-tool
npm install
```

Then link the CLI commands globally on your machine:

```bash
npm link
```

After linking, `create-feast-app` and `update-feast-app` are available as terminal commands from anywhere.

---

## Environment Variables

Create a `.env.local` file in the root of this repository. The tool will not run without these:

```bash
# Clerk
CLERK_SECRET_KEY=sk_...

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key

# (Optional) Google Fonts API — enables dynamic font selection in prompts
GOOGLE_FONTS_API_KEY=your-google-fonts-key
```

> **Note:** `.env.local` is gitignored. Never commit API keys.

---

## Commands

### `create-feast-app`

Provisions a brand new FEAST client from scratch. Run this when onboarding a new restaurant.

```bash
create-feast-app
```

The tool walks through the following steps in order:

**1. Gather answers** — An interactive prompt sequence collects everything needed to provision the client. Prompts are grouped into logical sections:

| Section | Fields |
|---|---|
| Business identity | Name, tagline, description, phone, email, category, location type |
| Business address | Street, city, state, zip, country |
| Billing address | Same as business (auto-copied) or entered separately |
| Theme | Platform style, primary/secondary colors (hex), primary/secondary font, border radius, dark mode |
| Admin | First name, last name, phone, email |
| Settings | Feature flags — menu page, online ordering, POS, reservations, customer accounts, rewards, shop page, catering |

All answers are validated against `AnswersSchema` (Zod) before any provisioning begins. If any field is invalid, the tool exits with a clear error message before touching any external service.

**2. Provision Clerk** — Creates a Clerk organization (using the business name) and a user account for the admin. The Clerk org ID becomes the business's canonical ID used everywhere else — Supabase, the config file, and Clerk's own metadata. The admin user receives the org ID in their `publicMetadata.businesses` array with an `owner` role. A secure temporary password is auto-generated and shown at the end of the run.

**3. Seed Supabase** — Inserts a new row into the `businesses` table using the Clerk org ID as the primary key. All answers from the prompt — business info, address, billing address, theme, admin details, and feature flags — are stored here.

**4. Scaffold the project** — Copies the appropriate Next.js template (based on the selected `platform_theme`), writes a `feast.config.ts` with the client's ID and theme, injects generated CSS variables into `globals.css` (derived from the brand colors using oklch), writes a `lib/fonts.ts` with the correct `next/font/google` imports, and writes a `.env.local` with the Supabase and Clerk keys pre-filled.

When complete, the tool outputs:

```
✅ Done! Your project is ready at ./restaurant-name
   Temporary password for owner@email.com:
   Xk9#mP2!
   Use the following commands to get started:
   cd restaurant-name && npm run dev
```

---

### `update-feast-app`

Updates an existing FEAST client's Supabase record and regenerates their project files. Run this when a client's business info or theme has changed and the generated files need to reflect the update.

```bash
update-feast-app
```

Currently uses `exampleData.ts` as its data source (org ID + answers). Before running against a real client, update that file with the client's actual data.

The tool runs two steps:

1. **Update Supabase** — Overwrites the business record matching the provided org ID.
2. **Update repo** — Regenerates the config file, CSS variables, and font file in the existing project directory.

> `update-feast-app` does not re-run prompts or touch Clerk. It's a targeted file + database sync, not a full reprovision.

---

## Project Structure

```
cli-tool/
  lib/
    cli/
      clerk.ts          Clerk org + user provisioning
      prompts.ts        All enquirer prompt sequences
      supabase.ts       Supabase seed + update functions
      repo/
        createRepo.ts   Template copy, config/CSS/font generation
        updateRepo.ts   Regenerates config/CSS/font in existing project
  utils/
    math.ts             Number formatting helpers (used in oklch calculations)
  app-create.ts         Entry point for create-feast-app
  app-update.ts         Entry point for update-feast-app
  exampleData.ts        Example answers + org ID for update-feast-app
  schema.ts             Zod schemas and inferred TypeScript types
  tsconfig.json
  package.json
```

---

## Schema

`schema.ts` is the single source of truth for all data shapes. Every prompt, Supabase insert, Clerk metadata, and config file derives from the schemas defined here. The key exports are:

| Export | Description |
|---|---|
| `AnswersSchema` | Full shape of prompt answers — the root schema everything else references |
| `BusinessSchema` | Extends `AnswersSchema` with `id`, `created_at`, `updated_at` for Supabase |
| `ClerkProvisionSchema` | Admin identity fields + businesses array for Clerk user creation |
| `ConfigSchema` | Slim build-time config written to `feast.config.ts` in the generated project |
| `SupabaseMenuItemSchema` | Shape of a menu item row (for future use) |

Inferred TypeScript types (`Answers`, `Business`, `Admin`, `Address`, `Theme`, `Settings`, `FeastConfig`) are exported alongside the schemas so downstream functions stay typed without redefinition.

---

## Theme Generation

Colors are collected as hex values in the prompts and converted to oklch internally before being written to `globals.css`. The theme generation pipeline:

1. Hex inputs → oklch values via `culori`
2. `createTheme()` derives the full set of CSS variables — primary, secondary, accent, background, card, muted, sidebar, chart colors, and both light and dark variants
3. Foreground colors are auto-calculated: colors with oklch lightness above `0.6` get dark text, below `0.6` get light text
4. `--canvas-dark` (used for the navbar and footer) is either provided explicitly or derived from the background color by pushing lightness to near-black while preserving hue
5. `generateCssVariables()` writes both `:root` and `.dark` blocks — dark mode is always in the CSS, toggled at runtime by the `is_dark_mode_enabled` flag in Supabase

---

## Known Quirks

**`enquirer` default import** — `enquirer` is a CJS package and doesn't support named ESM imports. Import it as a default:
```ts
import pkg from 'enquirer';
const { prompt } = pkg;
```

**`dotenv` explicit path** — The tool uses an explicit path for `.env.local` so it resolves correctly regardless of which directory you run the command from:
```ts
config({ path: join(__dirname, '.env.local') });
```

**`npm link` after `bin` changes** — If you rename or add a command in the `bin` field of `package.json`, re-run `npm link` to update the global symlinks.

---

## Contributing

This repo is currently intended for internal FEAST collaborators. If you're working on it:

- All new data fields should start in `AnswersSchema` — don't add fields to downstream schemas without first adding them to the root schema
- Prompt `name` fields must exactly match the corresponding key in `AnswersSchema` — Zod validates the merged answers object at parse time and will throw on any mismatch
- Keep `app-create.ts` and `app-update.ts` as pure orchestration — business logic belongs in `lib/`
- Test against real Clerk and Supabase instances before merging — there's no local mock layer yet