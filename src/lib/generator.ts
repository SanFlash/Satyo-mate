import type { Language, Tool } from './catalog';

export type GeneratorOptions = { tool:Tool; language:Language; component:string; action:string; pom:boolean; framework:string; url:string };
export type GeneratedFile = { name:string; content:string };

const py = (s:string) => s;

export function generateProject(o:GeneratorOptions):GeneratedFile[] {
  const component = o.component || 'login form';
  const url = o.url || 'http://127.0.0.1:3000/demo';
  if (o.tool === 'Playwright' && o.language === 'TypeScript') return playwrightTs(o, component, url);
  if (o.tool === 'Playwright' && o.language === 'JavaScript') return playwrightJs(o, component, url);
  if (o.tool === 'Playwright' && o.language === 'Python') return playwrightPy(o, component, url);
  if (o.tool === 'Selenium' && o.language === 'Python') return seleniumPy(o, component, url);
  if (o.tool === 'Selenium' && o.language === 'JavaScript') return seleniumJs(o, component, url);
  return seleniumTs(o, component, url);
}

function playwrightTs(o:GeneratorOptions,c:string,url:string):GeneratedFile[]{
 const page = `import type { Locator, Page } from '@playwright/test';\n\nexport class DemoPage {\n  readonly page: Page;\n  readonly actionButton: Locator;\n  readonly result: Locator;\n  constructor(page: Page) {\n    this.page = page;\n    this.actionButton = page.getByRole('button', { name: 'Run action' });\n    this.result = page.getByRole('status');\n  }\n  async goto(): Promise<void> { await this.page.goto(${JSON.stringify(url)}); }\n  async runAction(): Promise<void> { await this.actionButton.click(); }\n}`;
 const spec = `import { test, expect } from '@playwright/test';\nimport { DemoPage } from './DemoPage';\n\ntest(${JSON.stringify(`${o.action} on ${c}`)}, async ({ page }) => {\n  const demo = new DemoPage(page);\n  await demo.goto();\n  await demo.runAction();\n  await expect(demo.result).toContainText('Action complete');\n});`;
 return [{name:'tests/DemoPage.ts',content:page},{name:'tests/demo.spec.ts',content:spec},{name:'playwright.config.ts',content:`import { defineConfig } from '@playwright/test';\nexport default defineConfig({ testDir: './tests', use: { headless: true, baseURL: ${JSON.stringify(url)} }, reporter: 'list' });`},{name:'package.json',content:JSON.stringify({name:'autolearn-generated-tests',private:true,scripts:{test:'playwright test'},devDependencies:{'@playwright/test':'^1.51.0',typescript:'^5.7.3'}},null,2)}];
}
function playwrightJs(o:GeneratorOptions,c:string,url:string):GeneratedFile[]{
 const page = `export class DemoPage {\n  constructor(page) { this.page = page; this.actionButton = page.getByRole('button', { name: 'Run action' }); this.result = page.getByRole('status'); }\n  async goto() { await this.page.goto(${JSON.stringify(url)}); }\n  async runAction() { await this.actionButton.click(); }\n}`;
 const spec = `import { test, expect } from '@playwright/test';\nimport { DemoPage } from './DemoPage.js';\n\ntest(${JSON.stringify(`${o.action} on ${c}`)}, async ({ page }) => {\n const demo = new DemoPage(page); await demo.goto(); await demo.runAction(); await expect(demo.result).toContainText('Action complete');\n});`;
 return [{name:'tests/DemoPage.js',content:page},{name:'tests/demo.spec.js',content:spec},{name:'playwright.config.js',content:`import { defineConfig } from '@playwright/test';\nexport default defineConfig({ testDir: './tests', use: { headless: true, baseURL: ${JSON.stringify(url)} } });`},{name:'package.json',content:JSON.stringify({name:'autolearn-generated-tests',private:true,type:'module',scripts:{test:'playwright test'},devDependencies:{'@playwright/test':'^1.51.0'}},null,2)}];
}
function playwrightPy(o:GeneratorOptions,c:string,url:string):GeneratedFile[]{
 const page = `from playwright.sync_api import Page\n\nclass DemoPage:\n    def __init__(self, page: Page):\n        self.page = page\n        self.action_button = page.get_by_role("button", name="Run action")\n        self.result = page.get_by_role("status")\n\n    def goto(self) -> None:\n        self.page.goto(${JSON.stringify(url)})\n\n    def run_action(self) -> None:\n        self.action_button.click()\n`;
 const spec = `from playwright.sync_api import Page, expect\nfrom pages.demo_page import DemoPage\n\ndef test_${o.action.toLowerCase().replace(/[^a-z0-9]+/g,'_')}_on_demo(page: Page) -> None:\n    demo = DemoPage(page)\n    demo.goto()\n    demo.run_action()\n    expect(demo.result).to_contain_text("Action complete")\n`;
 return [{name:'pages/demo_page.py',content:page},{name:'tests/test_demo.py',content:spec},{name:'pytest.ini',content:'[pytest]\ntestpaths = tests\n'},{name:'requirements.txt',content:'pytest>=8.0\npytest-playwright>=0.5\nplaywright>=1.48\n'}];
}
function seleniumPy(o:GeneratorOptions,c:string,url:string):GeneratedFile[]{
 const page = `from selenium.webdriver.common.by import By\nfrom selenium.webdriver.support.ui import WebDriverWait\nfrom selenium.webdriver.support import expected_conditions as EC\n\nclass DemoPage:\n    ACTION = (By.XPATH, "//button[normalize-space()='Run action']")\n    RESULT = (By.CSS_SELECTOR, "[role='status']")\n\n    def __init__(self, driver):\n        self.driver = driver\n        self.wait = WebDriverWait(driver, 10)\n\n    def goto(self):\n        self.driver.get(${JSON.stringify(url)})\n\n    def run_action(self):\n        self.wait.until(EC.element_to_be_clickable(self.ACTION)).click()\n\n    def result_text(self):\n        return self.wait.until(EC.visibility_of_element_located(self.RESULT)).text\n`;
 const spec = `from selenium import webdriver\nfrom pages.demo_page import DemoPage\n\ndef test_${o.action.toLowerCase().replace(/[^a-z0-9]+/g,'_')}_on_demo():\n    driver = webdriver.Chrome()\n    try:\n        demo = DemoPage(driver)\n        demo.goto()\n        demo.run_action()\n        assert "Action complete" in demo.result_text()\n    finally:\n        driver.quit()\n`;
 return [{name:'pages/demo_page.py',content:page},{name:'tests/test_demo.py',content:spec},{name:'requirements.txt',content:'selenium>=4.25\npytest>=8.0\n'}];
}
function seleniumJs(o:GeneratorOptions,c:string,url:string):GeneratedFile[]{
 const page = `import { By, until } from 'selenium-webdriver';\nexport class DemoPage {\n constructor(driver) { this.driver = driver; this.action = By.xpath("//button[normalize-space()='Run action']"); this.result = By.css('[role="status"]'); }\n async goto() { await this.driver.get(${JSON.stringify(url)}); }\n async runAction() { const el = await this.driver.wait(until.elementLocated(this.action), 10000); await this.driver.wait(until.elementIsEnabled(el), 10000); await el.click(); }\n async resultText() { const el = await this.driver.wait(until.elementLocated(this.result), 10000); return await el.getText(); }\n}`;
 const spec = `import { Builder } from 'selenium-webdriver';\nimport { strict as assert } from 'node:assert';\nimport { DemoPage } from './DemoPage.js';\nconst driver = await new Builder().forBrowser('chrome').build();\ntry { const demo = new DemoPage(driver); await demo.goto(); await demo.runAction(); assert.ok((await demo.resultText()).includes('Action complete')); } finally { await driver.quit(); }\n`;
 return [{name:'tests/DemoPage.js',content:page},{name:'tests/demo.test.js',content:spec},{name:'package.json',content:JSON.stringify({name:'selenium-generated-tests',private:true,type:'module',scripts:{test:'node tests/demo.test.js'},dependencies:{'selenium-webdriver':'^4.28.0'}},null,2)}];
}
function seleniumTs(o:GeneratorOptions,c:string,url:string):GeneratedFile[]{
 const page = `import { By, until, type WebDriver, type WebElement } from 'selenium-webdriver';\nexport class DemoPage {\n  private readonly action = By.xpath("//button[normalize-space()='Run action']");\n  private readonly result = By.css('[role="status"]');\n  constructor(private readonly driver: WebDriver) {}\n  async goto(): Promise<void> { await this.driver.get(${JSON.stringify(url)}); }\n  async runAction(): Promise<void> { const el: WebElement = await this.driver.wait(until.elementLocated(this.action), 10000); await this.driver.wait(until.elementIsEnabled(el), 10000); await el.click(); }\n  async resultText(): Promise<string> { const el = await this.driver.wait(until.elementLocated(this.result), 10000); return el.getText(); }\n}`;
 const spec = `import { Builder } from 'selenium-webdriver';\nimport assert from 'node:assert/strict';\nimport { DemoPage } from './DemoPage.js';\nconst driver = await new Builder().forBrowser('chrome').build();\ntry { const demo = new DemoPage(driver); await demo.goto(); await demo.runAction(); assert.ok((await demo.resultText()).includes('Action complete')); } finally { await driver.quit(); }\n`;
 return [{name:'tests/DemoPage.ts',content:page},{name:'tests/demo.test.ts',content:spec},{name:'package.json',content:JSON.stringify({name:'selenium-generated-tests',private:true,type:'module',scripts:{test:'tsx tests/demo.test.ts'},dependencies:{'selenium-webdriver':'^4.28.0'},devDependencies:{tsx:'^4.19.2',typescript:'^5.7.3','@types/node':'^22.10.5'}},null,2)}];
}

export function toZipNotAvailableMessage(): string { return 'ZIP packaging is provided by the browser-side downloader; generated file contents are templates and need to be run against the matching local demo application.'; }
