# AutoLearn QA — Interactive Automation Engineering Lab

AutoLearn QA is a responsive learning workspace for web UI and end-to-end automation. It combines a structured curriculum, interactive local demo components, and starter project generation for Selenium and Playwright using Python, JavaScript, and TypeScript.

## Current starter features

- Dark/light theme toggle and responsive navigation
- Expanded searchable curriculum with difficulty filtering across fundamentals, UI components, accessibility, API/network testing, E2E scenarios, debugging, and CI
- Lesson selection, bookmark toggles, and local completion progress that automatically restores across visits on the same browser
- Workspace JSON backup and restore for completed lessons, bookmarks, selected lesson, active section, search/filter settings, and theme
- Keyboard command palette (`Ctrl+K` on Windows/Linux, `⌘K` on macOS) for fast lesson search, navigation, and workspace actions
- Contextual, keyboard/touch-accessible tooltips across the dashboard, Test Design Studio, generator, and framework builder to explain metrics, settings, coverage, and execution boundaries
- Motion-aware interface transitions that respect `prefers-reduced-motion`
- Interactive local demos for login, dropdowns, dialogs, forms, tables, and tabs, plus lesson coverage for autocomplete, accordions, tooltips, toasts, pagination, sorting, date/time inputs, keyboard focus, iframes, Shadow DOM, responsive layouts, and more
- Tool/language snippet switching
- Expanded project generator selectors for 30+ component/scenario types and 20 action patterns, across all six tool-language combinations
- A dedicated Test Design Studio at `/test-studio` with 12 editable starter cases spanning authentication, forms, accessibility, responsive UI, tables, dialogs, API, uploads, security, e-commerce, and error handling
- Test Design Studio inventory search and filters, P0–P3 risk priorities, execution status tracking, coverage map, and browser-local autosave
- Import/export test plans as JSON, export test case matrices as CSV, and generate a Playwright/Selenium code scaffold in Python, JavaScript, or TypeScript
- A dedicated composable framework builder at `/framework-builder` with a searchable 50+ atomic-action library, action-group filters, bulk selection, and Page Object Model scaffold generation
- Framework builder output includes page-object source, a composed test scaffold, setup/configuration files where supported, README, file preview, copy, and individual downloads
- Individual generated-file downloads and copy controls
- Vercel-compatible Next.js app structure

> Generated templates are starter examples, not yet execution-verified. Their selectors and URLs must match a real local demo application before use. This interface does not run browser scripts.

## Stack

- Next.js App Router, React, TypeScript
- Lucide icons
- Custom responsive CSS
- Versioned lesson data and deterministic starter templates

## Run locally

Use Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Check the production build with:

```bash
npm run build
npm run typecheck
```

## Deploy to Vercel

1. Import `SanFlash/Satyo-mate` into your Vercel account.
2. Set the project root directory to the repository root.
3. Use the Next.js framework preset and the default build command (`next build`).
4. Deploy. No environment variables are required for the current anonymous learning starter.

Vercel Git integration can automatically create preview deployments for branches and deploy the production branch. The Vercel Git project connection is not yet confirmed for this repository.

## Project structure

```text
src/
  app/
    api/health/route.ts
    framework-builder/page.tsx
    test-studio/page.tsx
    globals.css
    layout.tsx
    page.tsx
  lib/
    catalog.ts
    generator.ts
docs/
  PRODUCT_SPEC.md
```

## Test Design Studio

Open `/test-studio` from the dashboard to manage test cases and coverage. Edit titles, areas, priority, status, preconditions, action steps, expected results, and tags. Search and filter the inventory, inspect the coverage matrix, and generate a test-code scaffold for the selected filtered cases. Your plan autosaves in the current browser; use JSON export for backup or transfer and JSON import to restore a plan. The main learning workspace separately restores lesson progress, bookmarks, theme, and navigation preferences from browser storage; use the dashboard Backup/Restore controls to move that workspace between browsers. CSV export is intended for spreadsheet review.

The area coverage percentage measures whether at least one case exists in each built-in coverage area. It is a planning signal, not a requirements traceability proof or a claim that the application is fully tested. Generated code preserves test intent but still requires real locators, fixtures, and assertions.

## Composable framework builder

Open `/framework-builder` from the dashboard. Choose the automation tool, language, project name, and base URL. Search/filter the atomic action library, select individual actions or batches, then assemble selected actions into a Page Object Model class and starter test/configuration files. Generated files can be previewed, copied, and downloaded individually.

The output is a scaffold: add target-specific selectors, test data, scenario sequencing, assertions, and any marked extension-point implementations before running it. The hosted site does not execute generated browser scripts.

## Next improvements

- Add a ZIP bundle export and persistent saved framework recipes
- Add requirement-to-test traceability IDs, execution history, and richer report export
- Add curated end-to-end scenarios that automatically sequence selected POM methods
- Add generator unit tests and run generated samples against a deterministic local demo
- Add cloud-synced progress for signed-in learners and saved framework recipes

## Architecture boundary

The Vercel-hosted site is the learning interface. Actual Playwright/Selenium execution should happen locally, in CI, or in a separately isolated browser runner. Do not run arbitrary generated code inside the user-facing page or an unrestricted serverless function.
