# AutoLearn QA — Interactive Automation Engineering Lab

AutoLearn QA is a responsive learning workspace for web UI and end-to-end automation. It combines a structured curriculum, interactive local demo components, and starter project generation for Selenium and Playwright using Python, JavaScript, and TypeScript.

## Current starter features

- Dark/light theme toggle and responsive navigation
- Searchable starter curriculum with difficulty filtering
- Lesson selection, bookmark toggles, and local completion progress
- Interactive local demos for login, dropdowns, dialogs, forms, tables, and tabs
- Tool/language snippet switching
- A multi-file starter project generator for all six tool-language combinations
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

## Planned next work

- Add a lockfile and CI checks, then verify build and typecheck in CI
- Add complete curated POM templates per tool/language and improve the generator so POM toggles and framework choices affect the generated output consistently
- Bundle all generated files into a downloadable ZIP
- Add proper code syntax highlighting and full file tabs
- Add persistent bookmarks/progress and optional Supabase sync
- Expand elements/actions/E2E lessons with configuration, sample markup, test data, assertions, execution instructions, expected results, and troubleshooting
- Add unit/integration tests for the generator and demo components

## Architecture boundary

The Vercel-hosted site is the learning interface. Actual Playwright/Selenium execution should happen locally, in CI, or in a separately isolated browser runner. Do not run arbitrary generated code inside the user-facing page or an unrestricted serverless function.
