# AutoLearn QA — Interactive Automation Engineering Lab

AutoLearn QA is a Vercel-hostable learning platform for UI and end-to-end automation using Playwright and Selenium WebDriver with Python, JavaScript, and TypeScript. Its core teaching model is the Page Object Model (POM), paired with interactive local demos and complete, file-by-file project examples.

## Product goals

- Searchable lessons for common HTML controls, complex website components, locators, user interactions, forms, and realistic E2E workflows.
- Six supported combinations: Playwright and Selenium, each with Python, JavaScript, and TypeScript implementations.
- Complete POM examples, including page objects, tests, fixtures/configuration, dependencies, execution commands, expected results, and troubleshooting.
- Sandboxed iframe demos that illustrate the element and action being taught.
- A template-driven script generator with copy and downloadable project support.
- Responsive learning dashboard with search, filters, bookmarks, and progress tracking.
- Accessible UI, secure demo isolation, and Vercel-friendly architecture.

## Recommended architecture

- Next.js + React + TypeScript
- Tailwind CSS and accessible reusable components
- Structured, version-controlled lesson/template data
- Sandboxed local HTML/CSS/JS previews
- Deterministic generator templates validated by automated tests
- Optional Supabase account sync; core learning remains usable without login
- Vercel for the learning frontend; browser automation execution should run locally, in CI, or in a separately isolated runner rather than inside ordinary serverless requests

## Implementation sequence

1. Build the responsive application shell, navigation, search, and curriculum index.
2. Add lesson schema, element/action libraries, and interactive sandboxed previews.
3. Implement all six tool-language templates and complete POM project generation.
4. Add E2E scenarios, exercises, bookmarks/progress, ZIP export, and automated generator tests.
5. Verify the production build and preview deployment, then expand the curated catalogue incrementally.

## Quality and safety requirements

- Do not label code as tested unless it has actually been run.
- Do not silently generate unsupported tool/language combinations.
- Prefer Playwright's auto-waiting/assertions and Selenium explicit waits over fixed sleeps.
- Keep credentials out of source and test fixtures.
- Use local demo applications or authorized environments only.
- Never execute user-generated code with unrestricted host or network access.

## Deployment

Once the Next.js application and its package lockfile are committed, import this repository into Vercel or connect it through the Vercel Git integration. Use the project root as the root directory unless the repository is later converted to a monorepo. Follow Vercel's standard Next.js build detection and configure only required environment variables.

The repository currently starts with this project brief. The application source, generated templates, tests, and lockfile must be added before deployment can build a functional website.
