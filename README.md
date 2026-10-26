<div align="center">

<img src="docs/qa-nexus-banner.svg" alt="QA Nexus animated banner" width="100%" />

<p>
  <a href="https://github.com/SanFlash/Satyo-mate/actions"><img src="https://img.shields.io/github/actions/workflow/status/SanFlash/Satyo-mate/ci.yml?style=for-the-badge&logo=githubactions&logoColor=white&label=CI" alt="CI status" /></a>
  <a href="https://github.com/SanFlash/Satyo-mate/commits/main"><img src="https://img.shields.io/github/last-commit/SanFlash/Satyo-mate?style=for-the-badge&logo=git&color=8b7cff" alt="Last commit" /></a>
  <a href="https://github.com/SanFlash/Satyo-mate/issues"><img src="https://img.shields.io/github/issues/SanFlash/Satyo-mate?style=for-the-badge&logo=github&color=28c9df" alt="Open issues" /></a>
  <a href="https://github.com/SanFlash/Satyo-mate/stargazers"><img src="https://img.shields.io/github/stars/SanFlash/Satyo-mate?style=for-the-badge&logo=github&color=7c6cff" alt="GitHub stars" /></a>
  <img src="https://img.shields.io/badge/Next.js-App_Router-111111?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

### <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=22&duration=1800&pause=350&color=69E7FF&center=true&vCenter=true&width=820&lines=QA+is+not+just+testing;Design+smarter+test+cases;Build+maintainable+automation;Explore+Playwright+%26+Selenium;Learn.+Practice.+Automate." alt="Animated typing headline" />

**A hands-on lab for learning, designing, and preparing QA automation.**

[🚀 Explore the project](https://github.com/SanFlash/Satyo-mate) · [🐛 Report a bug](https://github.com/SanFlash/Satyo-mate/issues/new) · [💡 Suggest a feature](https://github.com/SanFlash/Satyo-mate/issues)

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:111A3C,50:3158A6,100:8B5CF6&height=3&section=header" width="100%" alt="" />

</div>

## ✦ The idea

QA Nexus turns QA learning into a practical workflow: **learn a concept → explore an example → design tests → generate a starter framework.**

> [!NOTE]
> This is a learning and code-generation workspace. The hosted app does **not** execute real Playwright or Selenium browser sessions. Review and run generated code in your own local or CI environment.

<details>
<summary><strong>🧭 Explore this README</strong> · click to expand</summary>

| Area | Jump in |
|---|---|
| ✨ Product highlights | [Explore features](#-product-highlights) |
| 🧰 Workspaces | [See the workspaces](#-your-qa-workbench) |
| 🏗️ Workflow | [How it fits together](#-the-qa-nexus-workflow) |
| 💻 Setup | [Run locally](#-run-it-locally) |
| 🧪 Guides | [Use the tools](#-interactive-guides) |
| 🗺️ Roadmap | [What comes next](#️-roadmap) |
| 👤 Creator | [Meet the creator](#-creator) |

</details>

## ✨ Product highlights

<table>
<tr>
<td width="50%" valign="top">

<h3>📚 Learn by exploring</h3>

<img src="https://img.shields.io/badge/42-starter_lessons-7868FF?style=flat-square" alt="42 starter lessons" />

- Browse a curated QA automation curriculum.
- Search topics, filter by difficulty, and bookmark lessons.
- Explore local demos for forms, dropdowns, dialogs, tables, tabs, and more.
- Track learning progress in your browser.
- Open the command palette with `Ctrl+K` / `⌘K`.

</td>
<td width="50%" valign="top">

<h3>🧪 Design better tests</h3>

<img src="https://img.shields.io/badge/JSON-CSV_exports-24B8D6?style=flat-square" alt="JSON and CSV exports" />

- Create and edit test cases, steps, preconditions, and expected results.
- Assign priorities and execution statuses.
- Search your test inventory and review coverage.
- Export a JSON backup or CSV test matrix.
- Generate Playwright/Selenium starter snippets.

</td>
</tr>
<tr>
<td width="50%" valign="top">

<h3>🧱 Assemble a framework</h3>

<img src="https://img.shields.io/badge/POM-starter_builder-8B5CF6?style=flat-square" alt="POM starter builder" />

- Select an automation tool and language.
- Configure the project name and base URL.
- Search a library of reusable actions.
- Preview, copy, and download starter files.

</td>
<td width="50%" valign="top">

<h3>⚡ Designed for practice</h3>

<img src="https://img.shields.io/badge/Responsive-Desktop_%2B_Mobile-16A878?style=flat-square" alt="Responsive design" />

- Contextual tooltips and quick navigation.
- Workspace backup and restore.
- Responsive desktop, tablet, and mobile layouts.
- Motion preferences that respect `prefers-reduced-motion`.

</td>
</tr>
</table>

## 🧰 Your QA workbench

<div align="center">

| Workspace | Route | Use it to |
|:--|:--:|:--|
| **Learning Dashboard** | `/` | Study concepts, explore demos, and save progress |
| **Test Design Studio** | `/test-studio` | Build test cases, assess planning coverage, and export |
| **Framework Builder** | `/framework-builder` | Configure and download a starter Page Object Model |

</div>

## 🏗️ The QA Nexus workflow

<div align="center">

<img src="docs/qa-nexus-feature-map.svg" alt="QA Nexus workflow diagram showing Learn, Design, Build and Practice" width="100%" />

</div>

```mermaid
flowchart LR
    A[Learn a QA concept] --> B[Explore the demo]
    B --> C[Design test cases]
    C --> D[Generate starter code]
    D --> E[Review and run locally or in CI]
    style A fill:#171f45,stroke:#7c83ff,color:#fff
    style B fill:#102b42,stroke:#39d9ee,color:#fff
    style C fill:#182e2a,stroke:#48d8a0,color:#fff
    style D fill:#2a1c43,stroke:#b58aff,color:#fff
    style E fill:#19253c,stroke:#9ebaff,color:#fff
```

## 🛠️ Built with

<div align="center">

<img src="https://skillicons.dev/icons?i=nextjs,react,ts,css,git,github&theme=dark" alt="Next.js, React, TypeScript, CSS, Git and GitHub" />

<br/>

<img src="https://img.shields.io/badge/Next.js-App_Router-111111?style=flat-square&logo=next.js" alt="Next.js App Router" />
<img src="https://img.shields.io/badge/React-UI-149eca?style=flat-square&logo=react" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-Language-3178c6?style=flat-square&logo=typescript" alt="TypeScript" />
<img src="https://img.shields.io/badge/Lucide-Icons-f59e0b?style=flat-square" alt="Lucide icons" />
<img src="https://img.shields.io/badge/Custom_CSS-Responsive-663399?style=flat-square&logo=css3" alt="Custom CSS" />

</div>

## 💻 Run it locally

<details open>
<summary><strong>01 · Clone the repository</strong></summary>

```bash
git clone https://github.com/SanFlash/Satyo-mate.git
cd Satyo-mate
```

</details>
<details>
<summary><strong>02 · Install dependencies</strong></summary>

Requires Node.js 20+ and npm.

```bash
npm install
```

</details>
<details>
<summary><strong>03 · Start the development server</strong></summary>

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

</details>
<details>
<summary><strong>04 · Validate before contributing</strong></summary>

```bash
npm run typecheck
npm run build
```

</details>

## 🧪 Interactive guides

<details>
<summary><strong>📘 Learning Dashboard — learn and revisit</strong></summary>

1. Search or filter the curriculum.
2. Select a lesson to read the guide and explore the local demo.
3. Bookmark topics you want to revisit.
4. Use `Ctrl+K` / `⌘K` for quick navigation.
5. Export a workspace backup when you want to preserve or transfer your local progress.

Progress and bookmarks are stored in the current browser unless exported.

</details>

<details>
<summary><strong>🧪 Test Design Studio — plan your coverage</strong></summary>

1. Open `/test-studio`.
2. Create test cases with preconditions, steps, expected results, tags, priority, and status.
3. Search and filter the test inventory.
4. Use the coverage map as a planning aid.
5. Export JSON/CSV or generate a starter scaffold.

Coverage is a planning signal, not proof of full requirements traceability or complete application testing.

</details>

<details>
<summary><strong>🧱 Framework Builder — assemble starter files</strong></summary>

1. Open `/framework-builder`.
2. Select an automation tool and programming language.
3. Enter a project name and target base URL.
4. Search and select reusable actions.
5. Preview, copy, or download the generated Page Object Model scaffold.

Before execution, add real selectors, fixtures, test data, assertions, scenario sequencing, and any missing extension-point implementations.

</details>

## 📁 Project map

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
├── qa-nexus-banner.svg
└── qa-nexus-feature-map.svg
public/
└── qa-nexus-logo.svg
```

## 🚀 Deployment

1. Import [the GitHub repository](https://github.com/SanFlash/Satyo-mate) into Vercel.
2. Set the root directory to the repository root.
3. Select the Next.js framework preset.
4. Keep the default build command, `next build`.
5. Deploy the production branch and verify the deployment status.

The current learning starter does not require environment variables. Confirm the actual build status in GitHub Actions and Vercel.

## 🗺️ Roadmap

- [ ] ZIP export for complete generated frameworks
- [ ] Requirement-to-test traceability IDs
- [ ] Execution history and richer report exports
- [ ] More curated end-to-end scenarios
- [ ] Unit tests for generated templates and demo flows
- [ ] Optional cloud-synced progress and saved framework recipes

## 🤝 Contribute to QA Nexus

Found a bug or have an idea?

<p align="center">
  <a href="https://github.com/SanFlash/Satyo-mate/issues/new"><img src="https://img.shields.io/badge/Report_a_bug-Open_issue-F97373?style=for-the-badge&logo=github" alt="Report a bug" /></a>
  <a href="https://github.com/SanFlash/Satyo-mate/issues"><img src="https://img.shields.io/badge/Share_an_idea-Feature_request-7C6CFF?style=for-the-badge&logo=github" alt="Suggest a feature" /></a>
</p>

1. Open an issue with context and reproduction steps.
2. Create a focused branch.
3. Run `npm run typecheck` and `npm run build`.
4. Open a pull request with a clear summary and test notes.

## 👤 Creator

<div align="center">

<img src="public/qa-nexus-logo.svg" alt="QA Nexus logo" width="100" />

### **Satyendra Kumar Namdeo**

Creator of QA Nexus · QA learning · Test design · Automation engineering

<a href="https://github.com/SanFlash"><img src="https://img.shields.io/badge/GitHub-SanFlash-171717?style=for-the-badge&logo=github" alt="Creator GitHub profile" /></a>
<a href="https://github.com/SanFlash/Satyo-mate"><img src="https://img.shields.io/badge/Explore-QA_Nexus-6C63FF?style=for-the-badge&logo=github" alt="Explore QA Nexus" /></a>

</div>

## ⚠️ Honest project boundaries

- Generated templates are starter examples, not guaranteed production-ready tests.
- Selectors and URLs must match the target application.
- Run real Playwright/Selenium execution locally, in CI, or in a separately isolated browser runner.
- Do not execute arbitrary generated code inside the user-facing page or an unrestricted serverless function.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0B1028,50:3158A6,100:8B5CF6&height=130&section=footer&text=Keep%20Testing.%20Keep%20Building.&fontSize=25&fontColor=FFFFFF&animation=fadeIn" alt="Keep testing. Keep building." width="100%" />

**QA Nexus** · Learn · Practice · Build · Automate

Made by **Satyendra Kumar Namdeo**

[⬆ Back to repository](https://github.com/SanFlash/Satyo-mate)

</div>
