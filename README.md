# AutoLearn QA — Interactive Automation Engineering Lab

AutoLearn QA is a responsive learning workspace for web UI and end-to-end automation. It combines a structured curriculum, interactive local demo components, and starter project generation for Selenium and Playwright using Python, JavaScript, and TypeScript.

## Current starter features

- Dark/light theme toggle and responsive navigation
- Expanded searchable curriculum with difficulty filtering across fundamentals, UI components, accessibility, API/network testing, E2E scenarios, debugging, and CI
- Lesson selection, bookmark toggles, and local completion progress
- Interactive local demos for login, dropdowns, dialogs, forms, tables, and tabs, plus lesson coverage for autocomplete, accordions, tooltips, toasts, pagination, sorting, date/time inputs, keyboard focus, iframes, Shadow DOM, responsive layouts, and more
- Tool/language snippet switching
- Expanded project generator selectors for 30+ component/scenario types and 20 action patterns, across all six tool-language combinations
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
    globals.css
    layout.tsx
    page.tsx
  lib/
    catalog.ts
    generator.ts
docs/
  PRODUCT_SPEC.md
```

## Composable framework builder

Open `/framework-builder` from the dashboard. Choose the automation tool, language, project name, and base URL. Search/filter the atomic action library, select individual actions or batches, then assemble selected actions into a Page Object Model class and starter test/configuration files. Generated files can be previewed, copied, and downloaded individually.

The output is a scaffold: add target-specific selectors, test data, scenario sequencing, assertions, and any marked extension-point implementations before running it. The hosted site does not execute generated browser scripts.

## Next improvements

- Add a ZIP bundle export and persistent saved framework recipes
- Add curated end-to-end scenarios that automatically sequence selected POM methods
- Add generator unit tests and run generated samples against a deterministic local demo
- Add optional persistent progress and saved framework storage

## Architecture boundary

The Vercel-hosted site is the learning interface. Actual Playwright/Selenium execution should happen locally, in CI, or in a separately isolated browser runner. Do not run arbitrary generated code inside the user-facing page or an unrestricted serverless function.
