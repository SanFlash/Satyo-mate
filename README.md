<div align="center">

<img src="docs/qa-nexus-banner.svg" alt="Animated QA Nexus banner — Learn, Practice, Build, Automate" width="100%" />

<p>
  <a href="https://github.com/SanFlash/Satyo-mate/actions"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/SanFlash/Satyo-mate/ci.yml?style=for-the-badge&label=build" /></a>
  <a href="https://github.com/SanFlash/Satyo-mate/commits/main"><img alt="Latest commit" src="https://img.shields.io/github/last-commit/SanFlash/Satyo-mate?style=for-the-badge&color=24c8db" /></a>
  <a href="https://github.com/SanFlash/Satyo-mate"><img alt="Repository size" src="https://img.shields.io/github/repo-size/SanFlash/Satyo-mate?style=for-the-badge&color=6c63ff" /></a>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-App_Router-black?style=for-the-badge&logo=next.js" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Ready-3178c6?style=for-the-badge&logo=typescript&logoColor=white" />
</p>

### <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=19&duration=2600&pause=700&color=71DFFF&center=true&vCenter=true&width=700&lines=Learn+QA+Engineering;Design+better+test+cases;Build+maintainable+automation;Explore+Playwright+%26+Selenium" alt="Typing animation: Learn QA Engineering, Design better test cases, Build maintainable automation, Explore Playwright and Selenium" />

**A hands-on workspace for learning QA engineering and building better automation.**

[Explore the code](https://github.com/SanFlash/Satyo-mate) · [Report a bug](https://github.com/SanFlash/Satyo-mate/issues) · [Request a feature](https://github.com/SanFlash/Satyo-mate/issues/new)

</div>

---

<details open>
<summary><strong>🧭 Navigation — click to expand</strong></summary>

| Jump to | Jump to |
|---|---|
| [✨ Highlights](#-highlights) | [🖥️ Workspaces](#️-workspaces) |
| [🛠️ Tech stack](#️-tech-stack) | [💻 Run locally](#-run-locally) |
| [🧩 Interactive guides](#-interactive-guides) | [📁 Project structure](#-project-structure) |
| [🚀 Deployment](#-deployment) | [👤 Creator](#-creator) |
| [🗺️ Roadmap](#️-roadmap) | [🤝 Contributing](#-contributing) |

</details>

## ✨ Highlights

<table>
<tr>
<td width="50%" valign="top">

### 📚 Interactive learning
- Curated curriculum with 42 starter lessons
- Search, difficulty filters, bookmarks, and local progress
- Interactive demos for forms, dropdowns, dialogs, tables, and tabs
- Dark/light theme and responsive navigation
- Keyboard command palette: `Ctrl+K` / `⌘K`

</td>
<td width="50%" valign="top">

### 🧪 Test Design Studio
- Editable test cases with preconditions, steps, and expected results
- P0–P3 priorities, statuses, search, and coverage map
- JSON import/export and CSV export
- Playwright/Selenium scaffold generation

</td>
</tr><tr>
<td width="50%" valign="top">

### 🧱 Framework Builder
- Searchable library of 50+ atomic actions
- Select tool, language, project name, and base URL
- Compose Page Object Model starter files
- Preview, copy, and download generated files

</td>
<td width="50%" valign="top">

### ⚡ Built for daily practice
- Snippet switching and contextual tooltips
- Workspace backup and restore
- Desktop, tablet, and mobile responsive layout
- Respects `prefers-reduced-motion`

</td>
</tr>
</table>

## 🖥️ Workspaces

| Workspace | Purpose |
|---|---|
| **Learning dashboard** | Explore lessons, run local interactive demos, bookmark topics, and track local progress |
| **Test Design Studio** — `/test-studio` | Organize test cases, set priorities, inspect coverage, and export plans |
| **Framework Builder** — `/framework-builder` | Compose a starter Page Object Model framework and download generated files |

## 🛠️ Tech stack

<p>
<img alt="Next.js" src="https://img.shields.io/badge/Next.js-App_Router-111111?logo=next.js" />
<img alt="React" src="https://img.shields.io/badge/React-UI-149eca?logo=react&logoColor=white" />
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Language-3178c6?logo=typescript&logoColor=white" />
<img alt="Lucide" src="https://img.shields.io/badge/Lucide-Icons-f59e0b" />
<img alt="CSS" src="https://img.shields.io/badge/CSS-Responsive-663399?logo=css3&logoColor=white" />
</p>

## 💻 Run locally

<details open>
<summary><strong>Step 1 — Clone and install</strong></summary>

```bash
git clone https://github.com/SanFlash/Satyo-mate.git
cd Satyo-mate
npm install
```

</details>
<details>
<summary><strong>Step 2 — Start the development server</strong></summary>

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

</details>
<details>
<summary><strong>Step 3 — Validate a production build</strong></summary>

```bash
npm run typecheck
npm run build
```

</details>

> [!IMPORTANT]
> QA Nexus teaches and generates starter code. The hosted interface does **not** execute real browser automation scripts. Adapt generated examples and run them in your own local or CI environment.

## 🧩 Interactive guides

<details>
<summary><strong>📖 Learning dashboard</strong></summary>

1. Search or filter the curriculum.
2. Select a lesson to explore its guide, code, and local demo.
3. Bookmark topics you want to revisit.
4. Use `Ctrl+K` or `⌘K` to open the command palette.
5. Use workspace backup/restore to transfer local learning progress.

Progress and bookmarks are stored in the current browser unless exported.

</details>
<details>
<summary><strong>🧪 Test Design Studio</strong></summary>

1. Open `/test-studio`.
2. Create or edit test cases, preconditions, steps, expected results, tags, priority, and status.
3. Search and filter the inventory.
4. Review the coverage map as a planning aid.
5. Export JSON/CSV or generate a starter code scaffold.

Coverage is a planning signal, not proof of full requirements traceability or complete application testing.

</details>
<details>
<summary><strong>🧱 Framework Builder</strong></summary>

1. Open `/framework-builder`.
2. Select tool and programming language.
3. Enter project name and target base URL.
4. Search and select reusable actions.
5. Preview, copy, or download the generated Page Object Model scaffold.

Before execution, add real selectors, fixtures, test data, assertions, scenario sequencing, and missing extension-point implementations.

</details>

## 📁 Project structure

```text
src/
├── app/
│   ├── api/health/route.ts
│   ├── framework-builder/page.tsx
│   ├── test-studio/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── brand-intro.tsx
└── lib/
    ├── catalog.ts
    └── generator.ts
docs/
└── qa-nexus-banner.svg
public/
└── qa-nexus-logo.svg
```

## 🚀 Deployment

1. Import [the repository](https://github.com/SanFlash/Satyo-mate) into Vercel.
2. Set the project root to the repository root.
3. Select the Next.js framework preset.
4. Use the default build command, `next build`.
5. Deploy the production branch.

The anonymous learning starter does not require environment variables. Confirm Git integration and production status in your Vercel project.

## 👤 Creator

<div align="center">

<img src="public/qa-nexus-logo.svg" alt="QA Nexus logo" width="96" />

### Satyendra Kumar Namdeo

**Creator of QA Nexus**

Building practical tools for QA learning, test design, and automation engineering.

[GitHub profile](https://github.com/SanFlash) · [Project repository](https://github.com/SanFlash/Satyo-mate)

</div>

## 🗺️ Roadmap

- [ ] ZIP export for complete generated frameworks
- [ ] Requirement-to-test traceability IDs
- [ ] Execution history and richer report exports
- [ ] More curated end-to-end scenarios
- [ ] Unit tests for generated templates and deterministic demo flows
- [ ] Optional cloud-synced progress and saved framework recipes

## 🤝 Contributing

1. Open an [issue](https://github.com/SanFlash/Satyo-mate/issues) describing the problem or idea.
2. Create a focused branch for your change.
3. Run `npm run typecheck` and `npm run build`.
4. Open a pull request with a clear summary and testing notes.

## 📜 Project boundaries

- Generated templates are starter examples, not guaranteed production-ready tests.
- Selectors and URLs must match the target application.
- Real Playwright/Selenium execution should happen locally, in CI, or in a separately isolated browser runner.
- Do not run arbitrary generated code inside the user-facing page or an unrestricted serverless function.

---

<div align="center">

### QA Nexus · Learn · Practice · Build · Automate

**Made by Satyendra Kumar Namdeo**

<a href="https://github.com/SanFlash/Satyo-mate"><img alt="Back to top" src="https://img.shields.io/badge/⬆_Back_to_top-QA_Nexus-6c63ff?style=for-the-badge" /></a>

</div>
