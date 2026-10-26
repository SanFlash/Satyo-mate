<div align="center">

<img src="public/qa-nexus-logo.svg" alt="QA Nexus logo" width="190" />

# QA Nexus

### Learn · Practice · Build · Automate

**A hands-on workspace for learning QA engineering and building better automation.**

Created with care by **Satyendra Kumar Namdeo**

<p>
  <a href="https://github.com/SanFlash/Satyo-mate/actions"><img alt="GitHub Actions" src="https://img.shields.io/github/actions/workflow/status/SanFlash/Satyo-mate/ci.yml?style=for-the-badge&label=build" /></a>
  <a href="https://github.com/SanFlash/Satyo-mate"><img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/SanFlash/Satyo-mate?style=for-the-badge&color=6c63ff" /></a>
  <a href="https://github.com/SanFlash/Satyo-mate/commits/main"><img alt="Last commit" src="https://img.shields.io/github/last-commit/SanFlash/Satyo-mate?style=for-the-badge&color=24c8db" /></a>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-App_Router-black?style=for-the-badge&logo=next.js" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Ready-3178c6?style=for-the-badge&logo=typescript&logoColor=white" />
</p>

[Explore the code](https://github.com/SanFlash/Satyo-mate) · [Report a bug](https://github.com/SanFlash/Satyo-mate/issues) · [Request a feature](https://github.com/SanFlash/Satyo-mate/issues/new)

</div>

---

## ✨ Welcome to QA Nexus

QA Nexus is a responsive learning environment for web UI testing and end-to-end automation. Explore practical lessons, experiment with interactive demos, design test cases, and generate starter frameworks for **Playwright** and **Selenium**.

> [!IMPORTANT]
> QA Nexus teaches and generates starter code. The hosted interface does **not** execute real browser automation scripts. Generated examples must be adapted and tested in your own local or CI environment.

## 🧭 Navigate the README

<details open>
<summary><strong>Jump to a section</strong></summary>

- [Highlights](#-highlights)
- [Screens and workspaces](#-screens-and-workspaces)
- [Tech stack](#-tech-stack)
- [Run locally](#-run-locally)
- [Project structure](#-project-structure)
- [How to use the tools](#-how-to-use-the-tools)
- [Deployment](#-deployment)
- [Creator](#-creator)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)

</details>

## 🚀 Highlights

<table>
<tr>
<td width="50%" valign="top">

### 📚 Interactive learning
- Curated curriculum with 42 starter lessons
- Search, difficulty filters, bookmarks, and progress tracking
- Interactive demos for forms, dropdowns, dialogs, tables, tabs, and more
- Dark/light theme and responsive navigation
- Keyboard command palette: `Ctrl+K` / `⌘K`

</td>
<td width="50%" valign="top">

### 🧪 Test Design Studio
- Editable starter test cases across common QA areas
- P0–P3 risk priorities and execution status tracking
- Coverage map, search, and filters
- JSON import/export and CSV export
- Playwright/Selenium code scaffold generation

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🧱 Framework Builder
- Searchable library of 50+ atomic actions
- Choose tool, language, project name, and base URL
- Assemble Page Object Model starter files
- Preview, copy, and download generated files

</td>
<td width="50%" valign="top">

### ⚡ Built for daily practice
- Tool/language snippet switching
- Contextual tooltips and helpful settings
- Workspace backup and restore
- Responsive layout for desktop, tablet, and mobile
- Motion preferences that respect `prefers-reduced-motion`

</td>
</tr>
</table>

## 🖥️ Screens and workspaces

| Workspace | What it helps you do |
|---|---|
| **Learning dashboard** | Follow lessons, explore examples, bookmark topics, and track local progress |
| **Test Design Studio** — `/test-studio` | Organize test cases, set priorities, inspect coverage, and export plans |
| **Framework Builder** — `/framework-builder` | Compose a starter Page Object Model framework and download its files |

## 🛠️ Tech stack

<p>
<img alt="Next.js" src="https://img.shields.io/badge/Next.js-App_Router-111111?logo=next.js" />
<img alt="React" src="https://img.shields.io/badge/React-UI-149eca?logo=react&logoColor=white" />
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Language-3178c6?logo=typescript&logoColor=white" />
<img alt="Lucide" src="https://img.shields.io/badge/Lucide-Icons-f59e0b" />
<img alt="CSS" src="https://img.shields.io/badge/CSS-Responsive-663399?logo=css3&logoColor=white" />
</p>

- Next.js App Router and React
- TypeScript and Lucide icons
- Custom responsive CSS
- Versioned lesson data and deterministic starter templates

## 💻 Run locally

### Prerequisites

- Node.js 20 or newer
- npm

### 1. Clone the repository

```bash
git clone https://github.com/SanFlash/Satyo-mate.git
cd Satyo-mate
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Validate before sharing

```bash
npm run typecheck
npm run build
```

## 🧩 How to use the tools

<details>
<summary><strong>Learning dashboard</strong></summary>

1. Search or filter the curriculum.
2. Select a lesson to read the guide and explore its demo.
3. Bookmark topics you want to revisit.
4. Use the command palette for quick navigation.
5. Back up or restore your workspace with the available JSON controls.

Progress and bookmarks are stored in the current browser unless you export a backup.

</details>

<details>
<summary><strong>Test Design Studio</strong></summary>

1. Open `/test-studio` from the dashboard.
2. Create or edit test cases, preconditions, steps, expected results, tags, priority, and status.
3. Search and filter your test inventory.
4. Review the coverage map as a planning aid.
5. Export a JSON backup or CSV matrix, or generate a starter code scaffold.

Coverage indicates whether built-in areas have at least one case; it is not proof of complete requirements traceability or full application testing.

</details>

<details>
<summary><strong>Framework Builder</strong></summary>

1. Open `/framework-builder`.
2. Select the automation tool and programming language.
3. Enter a project name and target base URL.
4. Search and select reusable actions.
5. Assemble the Page Object Model scaffold, preview the files, then copy or download them.

Before execution, add real selectors, fixtures, test data, assertions, scenario sequencing, and any missing extension-point implementations.

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
public/
└── qa-nexus-logo.svg
```

## 🚀 Deployment

QA Nexus uses a Next.js-compatible deployment setup.

1. Import [this GitHub repository](https://github.com/SanFlash/Satyo-mate) into Vercel.
2. Set the project root to the repository root.
3. Select the Next.js framework preset.
4. Use the default build command, `next build`.
5. Deploy the production branch.

The current anonymous learning starter does not require environment variables. Confirm the Git integration and production deployment status in your Vercel project.

## 👤 Creator

<div align="center">

<img src="public/qa-nexus-logo.svg" alt="QA Nexus" width="100" />

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

Ideas, bug reports, and improvements are welcome.

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

**QA Nexus** · Learn · Practice · Build · Automate

Made by **Satyendra Kumar Namdeo** with a focus on better QA learning.

</div>
