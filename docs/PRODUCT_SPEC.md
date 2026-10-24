# AutoLearn QA — Product Specification

## Mission

Build an interactive automation engineering academy—not static documentation—where learners select a website element or workflow, see it working in a small visual demo, learn robust locators, and obtain complete Page Object Model projects in Playwright or Selenium.

## Tools and languages

Generate idiomatic, distinct implementations for all six combinations:

| Tool | Language | Suggested test framework |
|---|---|---|
| Playwright | Python | pytest + pytest-playwright or official Playwright Python APIs |
| Playwright | JavaScript | Playwright Test or supported Node runner |
| Playwright | TypeScript | Playwright Test |
| Selenium | Python | pytest + Selenium WebDriver |
| Selenium | JavaScript | Mocha or another supported Node runner |
| Selenium | TypeScript | Mocha or another supported TypeScript runner |

Never conflate tool APIs; do not imply that Playwright's assertion/fixture APIs exist in Selenium.

## App layout

- Left navigation: Dashboard, Fundamentals, Elements, Interactions, Locators, POM, Playwright, Selenium, Python, JavaScript, TypeScript, Test Frameworks, E2E Scenarios, API/Network, Debugging/Reporting, Practice Lab, Cheat Sheets, Progress/Bookmarks.
- Main workspace: description, objectives, prerequisites, guide, page-object code, test code, assertions, dependencies, commands, expected result, pitfalls, best practices, exercises, related content.
- Right visual panel: interactive local demo in a sandboxed iframe, target highlighting, action sequence, locator display, reset, desktop/mobile preview. On narrow screens show preview as a dedicated tab.

## Curriculum catalogue

### Fundamental HTML controls
Buttons, links, text/password fields, textareas, labels, placeholders, checkboxes, radios, toggles, native and custom selects, multiselect, dates/times, number/range, hidden/read-only/disabled inputs, images, headings, paragraphs, lists, tables, navigation, breadcrumbs, tabs, accordions, tooltips, progress, pagination, status badges.

### Complex components
Autocomplete, suggestions, dynamic lists, infinite scroll, virtualized tables, nested menus, drag/drop, sliders, color pickers, rich text/WYSIWYG, uploads/downloads, galleries, carousels, dialogs/modals, drawers, popovers, toast/alert, loading/skeleton/spinner, conditional/dynamic content, Shadow DOM, Web Components, iframes and nested frames, SVG, canvas, charts/graphs/maps, responsive nav, sticky headers, real-time/WebSocket UI, contenteditable.

For canvas/graphics/maps, teach accessible DOM or application-specific testing hooks; do not assume conventional DOM selectors exist.

### Forms and validation
Required/optional, inline, blur and submit validation, invalid email, password policy/confirmation, dependent/conditional fields, multistep forms, dynamic fields, date/numeric/character constraints, server errors, duplicate submission, reset, successful submit, error states and disabled submit.

### Locator strategies
Playwright: getByRole, getByLabel, getByPlaceholder, getByText, getByTestId, locator, CSS/XPath where appropriate, filter/chaining/nesting, first/last/nth, relationships and multiple-match handling.

Selenium: ID, name, class, tag, link text/partial link text, CSS, XPath, relative locators, parent-child relationships, attributes and ambiguous matches.

Explain accessibility, selector stability, uniqueness, strictness and brittle-selector avoidance.

### Interaction/action library
Click, double/right click, hover, focus/blur, fill/type/clear, keyboard and shortcuts, selection, check/uncheck/toggle, scroll, drag/drop, upload/download, clipboard, mouse/pointer/touch, back/forward/reload, tabs/windows, alerts/dialogs, auth/cookies, element/navigation/URL/network/loading waits, dynamic elements, visibility/enabled/text/attributes/count/URL/title checks, screenshots/downloads/API responses/storage.

Every action gets basic use, POM method, test spec, expected result, each tool's distinct API, language variants, error handling and synchronization guidance. Avoid needless fixed sleeps.

### E2E scenarios
- Authentication: valid/invalid login, logout, password reset, remember-me, session expiry, role-based navigation, protected routes.
- E-commerce: search, filters, sorting, product details, cart updates/removal, wishlist, checkout, address, sandbox payment, confirmation, history, cancellation/refund.
- Portals: registration, profile, onboarding, job applications, multistep applications, documents, approvals, admin dashboards, reporting/search.
- Advanced: chat, notifications, realtime updates, file management, editable tables, calendar, booking, multitab and responsive/cross-browser workflows.

Each workflow includes safe deterministic test data, setup/cleanup, POMs, positive/negative tests and assertions. Use local demos/authorized targets and payment sandboxes only.

### Framework and engineering topics
pytest/fixtures; Playwright Test; JavaScript/TypeScript Selenium test runners; reusable hooks; justified base pages; component objects/composition; environment configuration; factories; data-driven and parameterized tests; tags; smoke/sanity/regression; parallelism/isolation; reused auth state; API-assisted setup; network mocking; retries/flaky tests; GitHub Actions/CI/CD; Vercel's deployment boundaries; Docker browser execution; browser/device coverage; HTML/JUnit/Allure reports; screenshot/video/trace evidence and logging.

## Required lesson contract

Each supported lesson should provide: concept, visual demo, locator rationale, full page-object class, reusable methods, complete test, assertions, imports/dependencies, directory tree, config, local demo markup, env setup, installation/execution commands, expected output, common errors, troubleshooting, practices and optional advanced variant.

## Generator contract

Inputs: tool, language, element, action, scenario, locator, POM toggle, runner, browser, assertion. Outputs: complete page object, spec, imports, config, dependency/lock guidance, HTML fixture, environment template, commands, expected behavior and troubleshooting. Provide file-by-file tabs, copy actions, syntax highlighting and ZIP download. Validate supported combinations and generate from versioned curated templates; do not let free-form inputs become arbitrary shell commands.

## Persistence and dashboard

Search/index; filters by tool/language/difficulty/framework; completion, bookmarks, recent lessons, progress and recommendations. Local anonymous progress must work without login. Supabase sync is optional and configured only by environment variables.

## Visual demo security

Use local demos within sandboxed iframes and strict isolation; do not execute generated browser scripts in the user-facing page. Never allow arbitrary server-side shell execution or unrestricted remote URL browsing. A future execution service must use ephemeral isolated workers, resource/time limits, and controlled egress.

## Composable framework builder\n\nThe `/framework-builder` route exposes an atomic action library grouped into browser navigation, locator/state checks, pointer/keyboard, forms/input, tables/dynamic data, waits, tabs/frames/dialogs, files/evidence, network/API, accessibility assertions, and lifecycle helpers. Learners can search/filter actions, select or clear batches, choose Playwright/Selenium and Python/JavaScript/TypeScript, configure project name/base URL, then generate a POM class plus scenario/configuration/readme scaffolding and download individual files. The generator avoids executing arbitrary user-provided scripts.\n\nThe page object is assembled from selected action methods; the test scenario still needs target selectors, test data, and business assertions. Some advanced operations intentionally remain target-specific extension points, especially where APIs differ between browser automation tools.\n\n## Expanded coverage delivered in the starter\n\nThe current curriculum includes dedicated entries for autocomplete, accordions, tooltip/popover behavior, toast alerts, pagination, sorting, date/time controls, checkbox/radio/toggle states, drag and drop, keyboard/focus order, iframes, Shadow DOM, responsive testing, accessibility smoke checks, API-assisted setup/teardown, network mocking, authentication/session expiry, e-commerce checkout, visual regression, trace-based debugging, CI execution, parallel isolation, mobile emulation, and data-driven tests. These entries currently reuse six interactive demo types; the lesson content is a guide and does not claim every advanced component is independently simulated.\n\nThe generator UI exposes a broader component/scenario list and action list. The current generator remains a starter-template generator: POM/framework settings and selectors should be reviewed against the target app before use, and generated scripts are not executed on the hosted page.\n\n## Definition of done

- Mobile and desktop access to all core content.
- All six language/tool variants and coherent complete project output.
- Relevant functional preview for supported UI interactions.
- POM separates page behavior from test assertions.
- Search, filters, progress and bookmarks genuinely work.
- Generator unit tests and available integration tests pass.
- Vercel production build succeeds.
- No major feature is a dead placeholder; limitations and external-runner requirements are explicit.
- No fabricated test results.
