'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Code2, Copy, Download, Layers3, Search, ShieldCheck, Sparkles, X } from 'lucide-react';
import { actionCatalog, actionGroups, type ActionDefinition } from '@/lib/action-catalog';

type Tool='Playwright'|'Selenium';
type Language='TypeScript'|'JavaScript'|'Python';
type FileEntry={name:string;content:string};
const safeName=(s:string)=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'qa-framework';
const q=(s:string)=>JSON.stringify(s);

function methodBody(a:ActionDefinition,tool:Tool,lang:Language):string {
 const py=lang==='Python', pw=tool==='Playwright', m=a.method;
 if(py&&pw){switch(a.kind){
 case 'navigate':return '    def '+m+'(self, path="/"): self.page.goto(path if path.startswith("http") else self.base_url.rstrip("/") + "/" + path.lstrip("/"))\n';
 case 'click':return '    def '+m+'(self, selector): self.page.locator(selector).click()\n';
 case 'fill':return '    def '+m+'(self, selector, value): self.page.locator(selector).fill(value)\n';
 case 'hover':return '    def '+m+'(self, selector): self.page.locator(selector).hover()\n';
 case 'press':return '    def '+m+'(self, selector, key): self.page.locator(selector).press(key)\n';
 case 'check':return '    def '+m+'(self, selector): self.page.locator(selector).check()\n';
 case 'uncheck':return '    def '+m+'(self, selector): self.page.locator(selector).uncheck()\n';
 case 'select':return '    def '+m+'(self, selector, value): self.page.locator(selector).select_option(value)\n';
 case 'clear':return '    def '+m+'(self, selector): self.page.locator(selector).clear()\n';
 case 'waitVisible':return '    def '+m+'(self, selector): self.page.locator(selector).wait_for(state="visible")\n';
 case 'waitHidden':return '    def '+m+'(self, selector): self.page.locator(selector).wait_for(state="hidden")\n';
 case 'assertVisible':return '    def '+m+'(self, selector): assert self.page.locator(selector).is_visible()\n';
 case 'assertText':return '    def '+m+'(self, selector, text): assert text in self.page.locator(selector).inner_text()\n';
 case 'assertUrl':return '    def '+m+'(self, fragment): assert fragment in self.page.url\n';
 case 'assertCount':return '    def '+m+'(self, selector, count): assert self.page.locator(selector).count() == count\n';
 case 'assertEnabled':return '    def '+m+'(self, selector): assert self.page.locator(selector).is_enabled()\n';
 case 'assertDisabled':return '    def '+m+'(self, selector): assert not self.page.locator(selector).is_enabled()\n';
 case 'assertChecked':return '    def '+m+'(self, selector): assert self.page.locator(selector).is_checked()\n';
 case 'assertAttribute':return '    def '+m+'(self, selector, attribute, value): assert self.page.locator(selector).get_attribute(attribute) == value\n';
 case 'assertTitle':return '    def '+m+'(self, title): assert self.page.title() == title\n';
 case 'screenshot':return '    def '+m+'(self, path="artifacts/page.png"): self.page.screenshot(path=path, full_page=True)\n';
 case 'reload':return '    def '+m+'(self): self.page.reload()\n';
 case 'back':return '    def '+m+'(self): self.page.go_back()\n';
 case 'forward':return '    def '+m+'(self): self.page.go_forward()\n';
 case 'focus':return '    def '+m+'(self, selector): self.page.locator(selector).focus()\n';
 case 'blur':return '    def '+m+'(self, selector): self.page.locator(selector).evaluate("el => el.blur()")\n';
 case 'scroll':return '    def '+m+'(self, selector): self.page.locator(selector).scroll_into_view_if_needed()\n';
 case 'doubleClick':return '    def '+m+'(self, selector): self.page.locator(selector).dblclick()\n';
 case 'rightClick':return '    def '+m+'(self, selector): self.page.locator(selector).click(button="right")\n';
 case 'waitUrl':return '    def '+m+'(self, pattern): self.page.wait_for_url(pattern)\n';
 case 'upload':return '    def '+m+'(self, selector, path): self.page.locator(selector).set_input_files(path)\n';
 case 'keyboardTab':return '    def '+m+'(self): self.page.keyboard.press("Tab")\n';
 case 'keyboardEscape':return '    def '+m+'(self): self.page.keyboard.press("Escape")\n';
 case 'dragDrop':return '    def '+m+'(self, source, target): self.page.locator(source).drag_to(self.page.locator(target))\n';
 case 'assertNoOverflow':return '    def '+m+'(self): return self.page.evaluate("document.documentElement.scrollWidth <= window.innerWidth")\n';
 case 'waitResponse':return '    def '+m+'(self, url_part): return self.page.wait_for_response(lambda response: url_part in response.url)\n';
 case 'apiGet':return '    def '+m+'(self, url):\n        response = self.page.request.get(url)\n        assert response.ok\n        return response\n';
 case 'apiPost':return '    def '+m+'(self, url, data):\n        response = self.page.request.post(url, data=data)\n        assert response.ok\n        return response\n';
 default:return '    def '+m+'(self, *args, **kwargs): raise NotImplementedError('+q(a.label+' needs target-specific setup')+')\n';
 }}
 if(py&&!pw){switch(a.kind){
 case 'navigate':return '    def '+m+'(self, path="/"): self.driver.get(path if path.startswith("http") else self.base_url.rstrip("/") + "/" + path.lstrip("/"))\n';
 case 'click':return '    def '+m+'(self, selector): self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, selector))).click()\n';
 case 'fill':return '    def '+m+'(self, selector, value):\n        el=self.wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, selector)))\n        el.clear(); el.send_keys(value)\n';
 case 'hover':return '    def '+m+'(self, selector): ActionChains(self.driver).move_to_element(self.driver.find_element(By.CSS_SELECTOR, selector)).perform()\n';
 case 'press':return '    def '+m+'(self, selector, key): self.driver.find_element(By.CSS_SELECTOR, selector).send_keys(key)\n';
 case 'check':return '    def '+m+'(self, selector):\n        el=self.driver.find_element(By.CSS_SELECTOR, selector)\n        if not el.is_selected(): el.click()\n';
 case 'uncheck':return '    def '+m+'(self, selector):\n        el=self.driver.find_element(By.CSS_SELECTOR, selector)\n        if el.is_selected(): el.click()\n';
 case 'select':return '    def '+m+'(self, selector, value): Select(self.driver.find_element(By.CSS_SELECTOR, selector)).select_by_value(value)\n';
 case 'clear':return '    def '+m+'(self, selector): self.driver.find_element(By.CSS_SELECTOR, selector).clear()\n';
 case 'waitVisible':return '    def '+m+'(self, selector): return self.wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, selector)))\n';
 case 'waitHidden':return '    def '+m+'(self, selector): self.wait.until(EC.invisibility_of_element_located((By.CSS_SELECTOR, selector)))\n';
 case 'assertVisible':return '    def '+m+'(self, selector): assert self.wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, selector)))\n';
 case 'assertText':return '    def '+m+'(self, selector, text): assert text in self.driver.find_element(By.CSS_SELECTOR, selector).text\n';
 case 'assertUrl':return '    def '+m+'(self, fragment): assert fragment in self.driver.current_url\n';
 case 'assertCount':return '    def '+m+'(self, selector, count): assert len(self.driver.find_elements(By.CSS_SELECTOR, selector)) == count\n';
 case 'assertEnabled':return '    def '+m+'(self, selector): assert self.driver.find_element(By.CSS_SELECTOR, selector).is_enabled()\n';
 case 'assertDisabled':return '    def '+m+'(self, selector): assert not self.driver.find_element(By.CSS_SELECTOR, selector).is_enabled()\n';
 case 'assertChecked':return '    def '+m+'(self, selector): assert self.driver.find_element(By.CSS_SELECTOR, selector).is_selected()\n';
 case 'assertAttribute':return '    def '+m+'(self, selector, attribute, value): assert self.driver.find_element(By.CSS_SELECTOR, selector).get_attribute(attribute) == value\n';
 case 'assertTitle':return '    def '+m+'(self, title): assert self.driver.title == title\n';
 case 'screenshot':return '    def '+m+'(self, path="artifacts/page.png"): self.driver.save_screenshot(path)\n';
 case 'reload':return '    def '+m+'(self): self.driver.refresh()\n';
 case 'back':return '    def '+m+'(self): self.driver.back()\n';
 case 'forward':return '    def '+m+'(self): self.driver.forward()\n';
 case 'focus':return '    def '+m+'(self, selector): self.driver.execute_script("arguments[0].focus()", self.driver.find_element(By.CSS_SELECTOR, selector))\n';
 case 'scroll':return '    def '+m+'(self, selector): self.driver.execute_script("arguments[0].scrollIntoView({block: \'center\'})", self.driver.find_element(By.CSS_SELECTOR, selector))\n';
 case 'doubleClick':return '    def '+m+'(self, selector): ActionChains(self.driver).double_click(self.driver.find_element(By.CSS_SELECTOR, selector)).perform()\n';
 case 'rightClick':return '    def '+m+'(self, selector): ActionChains(self.driver).context_click(self.driver.find_element(By.CSS_SELECTOR, selector)).perform()\n';
 case 'upload':return '    def '+m+'(self, selector, path): self.driver.find_element(By.CSS_SELECTOR, selector).send_keys(path)\n';
 default:return '    def '+m+'(self, *args, **kwargs): raise NotImplementedError('+q(a.label+' needs target-specific setup')+')\n';
 }}
 if(!pw){
  const sel=lang==='TypeScript'?'selector: string':'selector';
  const val=lang==='TypeScript'?'value: string':'value';
  switch(a.kind){
   case 'navigate':return '  async '+m+'(path = "/") { await this.driver.get(path.startsWith("http") ? path : this.baseUrl + path); }\n';
   case 'click':return '  async '+m+'('+sel+') { const el=await this.driver.wait(until.elementLocated(By.css(selector)),10000); await this.driver.wait(until.elementIsEnabled(el),10000); await el.click(); }\n';
   case 'fill':return '  async '+m+'('+sel+', '+val+') { const el=await this.driver.wait(until.elementLocated(By.css(selector)),10000); await el.clear(); await el.sendKeys(value); }\n';
   case 'hover':return '  async '+m+'('+sel+') { const el=await this.driver.findElement(By.css(selector)); await this.driver.actions().move({origin:el}).perform(); }\n';
   case 'press':return '  async '+m+'('+sel+', key'+(lang==='TypeScript'?': string':'')+') { await (await this.driver.findElement(By.css(selector))).sendKeys(key); }\n';
   case 'check':return '  async '+m+'('+sel+') { const el=await this.driver.findElement(By.css(selector)); if(!(await el.isSelected())) await el.click(); }\n';
   case 'uncheck':return '  async '+m+'('+sel+') { const el=await this.driver.findElement(By.css(selector)); if(await el.isSelected()) await el.click(); }\n';
   case 'select':return '  async '+m+'('+sel+', '+val+') { await new Select(await this.driver.findElement(By.css(selector))).selectByValue(value); }\n';
   case 'clear':return '  async '+m+'('+sel+') { await (await this.driver.findElement(By.css(selector))).clear(); }\n';
   case 'waitVisible':return '  async '+m+'('+sel+') { return await this.driver.wait(until.elementLocated(By.css(selector)),10000); }\n';
   case 'waitHidden':return '  async '+m+'('+sel+') { const el=await this.driver.findElement(By.css(selector)); await this.driver.wait(until.elementIsNotVisible(el),10000); }\n';
   case 'assertVisible':return '  async '+m+'('+sel+') { const el=await this.driver.wait(until.elementLocated(By.css(selector)),10000); if(!(await el.isDisplayed())) throw new Error("Expected visible"); }\n';
   case 'assertText':return '  async '+m+'('+sel+', '+val+') { const el=await this.driver.findElement(By.css(selector)); if(!(await el.getText()).includes(value)) throw new Error("Expected text missing"); }\n';
   case 'assertUrl':return '  async '+m+'(fragment'+(lang==='TypeScript'?': string':'')+') { if(!(await this.driver.getCurrentUrl()).includes(fragment)) throw new Error("URL fragment missing"); }\n';
   case 'assertCount':return '  async '+m+'('+sel+', count'+(lang==='TypeScript'?': number':'')+') { const els=await this.driver.findElements(By.css(selector)); if(els.length!==count) throw new Error("Unexpected count"); }\n';
   case 'assertEnabled':return '  async '+m+'('+sel+') { if(!(await this.driver.findElement(By.css(selector))).isEnabled()) throw new Error("Expected enabled"); }\n';
   case 'assertDisabled':return '  async '+m+'('+sel+') { if(await (await this.driver.findElement(By.css(selector))).isEnabled()) throw new Error("Expected disabled"); }\n';
   case 'assertChecked':return '  async '+m+'('+sel+') { if(!(await this.driver.findElement(By.css(selector))).isSelected()) throw new Error("Expected checked"); }\n';
   case 'assertTitle':return '  async '+m+'(title'+(lang==='TypeScript'?': string':'')+') { if(await this.driver.getTitle()!==title) throw new Error("Unexpected title"); }\n';
   case 'screenshot':return '  async '+m+'(path = "artifacts/page.png") { const fs=await import("node:fs/promises"); await fs.writeFile(path,Buffer.from(await this.driver.takeScreenshot(),"base64")); }\n';
   case 'reload':return '  async '+m+'() { await this.driver.navigate().refresh(); }\n';
   case 'back':return '  async '+m+'() { await this.driver.navigate().back(); }\n';
   case 'forward':return '  async '+m+'() { await this.driver.navigate().forward(); }\n';
   case 'focus':return '  async '+m+'('+sel+') { await this.driver.executeScript("arguments[0].focus()",await this.driver.findElement(By.css(selector))); }\n';
   case 'scroll':return '  async '+m+'('+sel+') { await this.driver.executeScript("arguments[0].scrollIntoView()",await this.driver.findElement(By.css(selector))); }\n';
   case 'doubleClick':return '  async '+m+'('+sel+') { await this.driver.actions().doubleClick(await this.driver.findElement(By.css(selector))).perform(); }\n';
   case 'rightClick':return '  async '+m+'('+sel+') { await this.driver.actions().contextClick(await this.driver.findElement(By.css(selector))).perform(); }\n';
   case 'upload':return '  async '+m+'('+sel+', filePath'+(lang==='TypeScript'?': string':'')+') { await (await this.driver.findElement(By.css(selector))).sendKeys(filePath); }\n';
   default:return '  async '+m+'(...args'+(lang==='TypeScript'?': unknown[]':'')+') { throw new Error('+q(a.label+' needs target-specific setup')+'); }\n';
  }
 }
 switch(a.kind){
 case 'navigate':return '  async '+m+'(path = "/") { await this.page.goto(path.startsWith("http") ? path : this.baseUrl.replace(/\\/$/, "") + "/" + path.replace(/^\\//, "")); }\n';
 case 'click':return '  async '+m+'(selector: string) { await this.page.locator(selector).click(); }\n';
 case 'fill':return '  async '+m+'(selector: string, value: string) { await this.page.locator(selector).fill(value); }\n';
 case 'hover':return '  async '+m+'(selector: string) { await this.page.locator(selector).hover(); }\n';
 case 'press':return '  async '+m+'(selector: string, key: string) { await this.page.locator(selector).press(key); }\n';
 case 'check':return '  async '+m+'(selector: string) { await this.page.locator(selector).check(); }\n';
 case 'uncheck':return '  async '+m+'(selector: string) { await this.page.locator(selector).uncheck(); }\n';
 case 'select':return '  async '+m+'(selector: string, value: string) { await this.page.locator(selector).selectOption(value); }\n';
 case 'clear':return '  async '+m+'(selector: string) { await this.page.locator(selector).clear(); }\n';
 case 'waitVisible':return '  async '+m+'(selector: string) { await this.page.locator(selector).waitFor({state:"visible"}); }\n';
 case 'waitHidden':return '  async '+m+'(selector: string) { await this.page.locator(selector).waitFor({state:"hidden"}); }\n';
 case 'assertVisible':return '  async '+m+'(selector: string) { await expect(this.page.locator(selector)).toBeVisible(); }\n';
 case 'assertText':return '  async '+m+'(selector: string, text: string) { await expect(this.page.locator(selector)).toContainText(text); }\n';
 case 'assertUrl':return '  async '+m+'(fragment: string) { await expect(this.page).toHaveURL(new RegExp(fragment)); }\n';
 case 'assertCount':return '  async '+m+'(selector: string, count: number) { await expect(this.page.locator(selector)).toHaveCount(count); }\n';
 case 'assertEnabled':return '  async '+m+'(selector: string) { await expect(this.page.locator(selector)).toBeEnabled(); }\n';
 case 'assertDisabled':return '  async '+m+'(selector: string) { await expect(this.page.locator(selector)).toBeDisabled(); }\n';
 case 'assertChecked':return '  async '+m+'(selector: string) { await expect(this.page.locator(selector)).toBeChecked(); }\n';
 case 'assertAttribute':return '  async '+m+'(selector: string, attribute: string, value: string) { await expect(this.page.locator(selector)).toHaveAttribute(attribute,value); }\n';
 case 'assertTitle':return '  async '+m+'(title: string) { await expect(this.page).toHaveTitle(title); }\n';
 case 'screenshot':return '  async '+m+'(path = "artifacts/page.png") { await this.page.screenshot({path,fullPage:true}); }\n';
 case 'reload':return '  async '+m+'() { await this.page.reload(); }\n';
 case 'back':return '  async '+m+'() { await this.page.goBack(); }\n';
 case 'forward':return '  async '+m+'() { await this.page.goForward(); }\n';
 case 'focus':return '  async '+m+'(selector: string) { await this.page.locator(selector).focus(); }\n';
 case 'blur':return '  async '+m+'(selector: string) { await this.page.locator(selector).evaluate(el => (el as HTMLElement).blur()); }\n';
 case 'scroll':return '  async '+m+'(selector: string) { await this.page.locator(selector).scrollIntoViewIfNeeded(); }\n';
 case 'doubleClick':return '  async '+m+'(selector: string) { await this.page.locator(selector).dblclick(); }\n';
 case 'rightClick':return '  async '+m+'(selector: string) { await this.page.locator(selector).click({button:"right"}); }\n';
 case 'waitUrl':return '  async '+m+'(pattern: RegExp) { await this.page.waitForURL(pattern); }\n';
 case 'upload':return '  async '+m+'(selector: string, filePath: string) { await this.page.locator(selector).setInputFiles(filePath); }\n';
 case 'keyboardTab':return '  async '+m+'() { await this.page.keyboard.press("Tab"); }\n';
 case 'keyboardEscape':return '  async '+m+'() { await this.page.keyboard.press("Escape"); }\n';
 case 'dragDrop':return '  async '+m+'(source: string, target: string) { await this.page.locator(source).dragTo(this.page.locator(target)); }\n';
 case 'assertNoOverflow':return '  async '+m+'() { return this.page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth); }\n';
 case 'waitResponse':return '  async '+m+'(urlPart: string) { return this.page.waitForResponse(r => r.url().includes(urlPart)); }\n';
 case 'apiGet':return '  async '+m+'(url: string) { const r = await this.page.request.get(url); if (!r.ok()) throw new Error("GET failed: " + r.status()); return r; }\n';
 case 'apiPost':return '  async '+m+'(url: string, data: unknown) { const r = await this.page.request.post(url,{data}); if (!r.ok()) throw new Error("POST failed: " + r.status()); return r; }\n';
 default:return '  async '+m+'(...args: unknown[]) { throw new Error('+q(a.label+' needs target-specific setup')+'); }\n';
 }
}

function buildProject(tool:Tool,language:Language,selected:ActionDefinition[],baseUrl:string,projectName:string):FileEntry[]{
 const unique=selected.filter((a,i)=>selected.findIndex(b=>b.method===a.method)===i);
 const rawMethods=actionGroups.filter(g=>unique.some(a=>a.group===g)).map(g=>'  // ===== '+g+' =====\n'+unique.filter(a=>a.group===g).map(a=>methodBody(a,tool,language)).join('\n')).join('\n');
 const methods=language==='JavaScript'?rawMethods.replace(/: unknown\[\]/g,'').replace(/: (string|number|unknown|RegExp)/g,'').replace(/ as HTMLElement/g,''):rawMethods;
 const py=language==='Python', pw=tool==='Playwright', ext=py?'py':language==='TypeScript'?'ts':'js';
 const pagePath=py?'pages/generated_page.py':'pages/GeneratedPage.'+ext;
 let pageCode='',testCode='',configCode='',packageCode='',requirements='';
 if(pw&&py){
  pageCode='from playwright.sync_api import Page, expect\n\nclass GeneratedPage:\n    def __init__(self, page: Page, base_url='+q(baseUrl)+'):\n        self.page=page\n        self.base_url=base_url\n\n'+methods;
  testCode='from playwright.sync_api import Page\nfrom pages.generated_page import GeneratedPage\n\ndef test_composed_workflow(page: Page):\n    app=GeneratedPage(page)\n    # TODO: Add target selectors, test data and scenario assertions.\n    # Selected actions: '+unique.map(a=>a.method+'()').join(', ')+'\n';
  configCode='[pytest]\ntestpaths = tests\n';
  requirements='pytest>=8.0\npytest-playwright>=0.5\nplaywright>=1.48\n';
 } else if(pw) {
  if(language==='TypeScript') {
   pageCode='import { expect, type Page } from "@playwright/test";\n\nexport class GeneratedPage {\n  constructor(private readonly page: Page, private readonly baseUrl = '+q(baseUrl)+') {}\n\n'+methods+'}\n';
   configCode='import { defineConfig } from "@playwright/test";\nexport default defineConfig({testDir:"./tests",use:{baseURL:'+q(baseUrl)+',trace:"retain-on-failure",screenshot:"only-on-failure"},reporter:[["list"],["html",{open:"never"}]]});\n';
  } else {
   pageCode='import { expect } from "@playwright/test";\n\nexport class GeneratedPage {\n  constructor(page, baseUrl = '+q(baseUrl)+') { this.page=page; this.baseUrl=baseUrl; }\n\n'+methods+'}\n';
   configCode='import { defineConfig } from "@playwright/test";\nexport default defineConfig({testDir:"./tests",use:{baseURL:'+q(baseUrl)+',trace:"retain-on-failure",screenshot:"only-on-failure"}});\n';
  }
  const actionPlan=unique.map(a=>'  // TODO: configure target selectors/data, then enable: app.'+a.method+'(...)').join('\n');
  testCode='import { test } from "@playwright/test";\nimport { GeneratedPage } from "../pages/GeneratedPage.'+(language==='TypeScript'?'ts':'js')+'";\n\ntest('+q(projectName)+', async ({page}) => {\n  const app = new GeneratedPage(page);\n'+actionPlan+'\n  // Add assertions for the intended business outcome.\n});\n';
  packageCode=JSON.stringify({name:safeName(projectName),private:true,type:'module',scripts:{test:'playwright test','test:headed':'playwright test --headed'},devDependencies:{'@playwright/test':'^1.51.0',...(language==='TypeScript'?{typescript:'^5.7.3'}:{})}},null,2);
 } else if(py) {
  pageCode='from selenium.webdriver.common.by import By\nfrom selenium.webdriver.support.ui import WebDriverWait, Select\nfrom selenium.webdriver.support import expected_conditions as EC\nfrom selenium.webdriver.common.action_chains import ActionChains\n\nclass GeneratedPage:\n    def __init__(self, driver, base_url='+q(baseUrl)+'):\n        self.driver=driver\n        self.base_url=base_url\n        self.wait=WebDriverWait(driver,10)\n\n'+methods;
  testCode='from selenium import webdriver\nfrom pages.generated_page import GeneratedPage\n\ndef test_composed_workflow():\n    driver=webdriver.Chrome()\n    try:\n        app=GeneratedPage(driver)\n        # TODO: compose selected actions using real selectors and assertions\n    finally:\n        driver.quit()\n';
  requirements='selenium>=4.25\npytest>=8.0\n';
 } else {
  const seleniumConstructor=language==='TypeScript'?'  constructor(private readonly driver: WebDriver, private readonly baseUrl = '+q(baseUrl)+') {}\n\n':'  constructor(driver, baseUrl = '+q(baseUrl)+') { this.driver=driver; this.baseUrl=baseUrl; }\n\n';
  pageCode='import { By, until, Select'+(language==='TypeScript'?', type WebDriver':'')+' } from "selenium-webdriver";\n\nexport class GeneratedPage {\n'+seleniumConstructor+methods+'}\n';
  testCode='// TODO: Add runner-specific test lifecycle, target selectors and assertions.\n// Selected POM actions: '+unique.map(a=>a.method+'()').join(', ')+'\n';
  packageCode=JSON.stringify({name:safeName(projectName),private:true,type:'module',scripts:{test:language==='TypeScript'?'tsx tests/composed.spec.ts':'node tests/composed.spec.js'},dependencies:{'selenium-webdriver':'^4.28.0'},devDependencies:language==='TypeScript'?{tsx:'^4.19.2',typescript:'^5.7.3','@types/node':'^22.10.5'}:{}},null,2);
 }
 const readme='# '+projectName+'\n\nGenerated '+tool+' / '+language+' Page Object Model starter.\n\n- Selected actions: '+selected.length+'\n- Base URL: '+baseUrl+'\n- Page methods are composed from the selected action library.\n\nReview TODOs, selectors, environment, test data, and assertions before running. Generated files are not executed by the hosted app.\n';
 const files:FileEntry[]=[{name:pagePath,content:pageCode},{name:py&&pw?'tests/test_composed.py':py?'tests/test_composed.py':'tests/composed.spec.'+ext,content:testCode},{name:'README.md',content:readme}];
 if(configCode)files.push({name:pw&&py?'pytest.ini':'playwright.config.ts',content:configCode});
 if(packageCode)files.push({name:'package.json',content:packageCode});
 if(requirements)files.push({name:'requirements.txt',content:requirements});
 return files;
}

export default function FrameworkBuilderPage(){
 const [tool,setTool]=useState<Tool>('Playwright'),[language,setLanguage]=useState<Language>('TypeScript');
 const [baseUrl,setBaseUrl]=useState('http://127.0.0.1:3000'),[projectName,setProjectName]=useState('My QA Framework');
 const [search,setSearch]=useState(''),[group,setGroup]=useState<string>('All actions'),[selected,setSelected]=useState<string[]>(['navigate','click','fill','wait-visible','assert-visible','assert-text','screenshot']);
 const [files,setFiles]=useState<FileEntry[]>([]),[activeFile,setActiveFile]=useState(''),[notice,setNotice]=useState(''),[copied,setCopied]=useState(false);
 const selectedActions=useMemo(()=>actionCatalog.filter(a=>selected.includes(a.id)),[selected]);
 const filtered=useMemo(()=>actionCatalog.filter(a=>(group==='All actions'||a.group===group)&&(!search||(a.label+' '+a.description+' '+a.group).toLowerCase().includes(search.toLowerCase()))),[group,search]);
 const current=files.find(f=>f.name===activeFile)||files[0];
 const toggle=(id:string)=>setSelected(old=>old.includes(id)?old.filter(x=>x!==id):[...old,id]);
 const generate=()=>{if(!selectedActions.length){setNotice('Select at least one action to assemble the framework.');return;}const out=buildProject(tool,language,selectedActions,baseUrl,projectName);setFiles(out);setActiveFile(out[0]?.name||'');setNotice('Assembled '+out.length+' files from '+selectedActions.length+' actions. Review TODOs before execution.');};
 const download=(f:FileEntry)=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([f.content],{type:'text/plain;charset=utf-8'}));a.download=f.name.replaceAll('/','_');a.click();URL.revokeObjectURL(a.href);};
 const copy=async()=>{if(!current)return;try{await navigator.clipboard.writeText(current.content);setCopied(true);window.setTimeout(()=>setCopied(false),1200);}catch{setNotice('Clipboard unavailable. Select the code and copy it manually.');}};
 return <main className="framework-page">
  <header className="framework-top"><Link href="/"><ArrowLeft size={16}/> AutoLearn QA</Link><span><ShieldCheck size={14}/> Local framework builder</span></header>
  <section className="framework-hero"><div className="framework-eyebrow"><Sparkles size={14}/> COMPOSABLE AUTOMATION ENGINEERING</div><h1>Build your framework,<br/><em>one action at a time.</em></h1><p>Choose atomic browser actions, combine them into page objects, and assemble a starter framework with a matching test/configuration scaffold.</p><div className="framework-metrics"><span><strong>{actionCatalog.length}</strong> actions</span><span><strong>{actionGroups.length}</strong> groups</span><span><strong>{selected.length}</strong> selected</span></div></section>
  <section className="framework-config"><div className="framework-config-head"><h2><Layers3 size={17}/> Framework configuration</h2><span>01 / CONFIGURE</span></div><div className="framework-config-grid"><label>Project name<input value={projectName} onChange={e=>setProjectName(e.target.value)}/></label><label>Base URL<input value={baseUrl} onChange={e=>setBaseUrl(e.target.value)}/></label><label>Tool<select value={tool} onChange={e=>setTool(e.target.value as Tool)}><option>Playwright</option><option>Selenium</option></select></label><label>Language<select value={language} onChange={e=>setLanguage(e.target.value as Language)}><option>TypeScript</option><option>JavaScript</option><option>Python</option></select></label></div></section>
  <section className="framework-workspace"><div className="action-panel"><div className="framework-config-head"><h2><Check size={17}/> Atomic action library</h2><span>{selected.length} selected</span></div><div className="action-search"><Search size={15}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search click, wait, upload, assertion…"/></div><div className="action-filter"><button className={group==='All actions'?'selected':''} onClick={()=>setGroup('All actions')}>All actions ({actionCatalog.length})</button>{actionGroups.map(g=><button key={g} className={group===g?'selected':''} onClick={()=>setGroup(g)}>{g}</button>)}</div><div className="action-list">{filtered.map(a=><label key={a.id} className="action-item"><input type="checkbox" checked={selected.includes(a.id)} onChange={()=>toggle(a.id)}/><span className="action-item-copy"><strong>{a.label}</strong><small>{a.description}</small><code>{a.group} · {a.method}()</code></span></label>)}{!filtered.length&&<div className="action-empty">No matching actions. Try a broader search.</div>}</div><div className="action-panel-footer"><button onClick={()=>setSelected(actionCatalog.map(a=>a.id))}>Select all</button><button onClick={()=>setSelected([])}>Clear all</button><button onClick={()=>setSelected(actionCatalog.filter(a=>['navigate','click','fill','wait-visible','assert-visible','assert-text','screenshot'].includes(a.id)).map(a=>a.id))}>Recommended starter</button></div></div>
   <div className="framework-output"><div className="framework-config-head"><h2><Code2 size={17}/> Framework assembly</h2><span>02 / COMPOSE</span></div><p className="framework-output-desc">Selected actions become reusable methods in one Page Object Model class. Review the generated workflow scaffold and fill in target selectors, data, and assertions.</p><div className="selected-action-chips">{selectedActions.map(a=><span key={a.id}>{a.method}()</span>)}</div><button className="framework-generate" onClick={generate}><Sparkles size={16}/> Assemble POM framework <span>→</span></button>
   {files.length>0&&<div className="framework-code-view"><div className="framework-file-tabs">{files.map(f=><button key={f.name} className={current?.name===f.name?'active':''} onClick={()=>setActiveFile(f.name)}>{f.name}</button>)}</div><div className="framework-code-actions"><span>{current?.name}</span><div><button onClick={copy}><Copy size={13}/>{copied?'Copied':'Copy'}</button>{current&&<button onClick={()=>download(current)}><Download size={13}/>Download</button>}</div></div><pre><code>{current?.content}</code></pre><div className="framework-download-all">{files.map(f=><button key={f.name} onClick={()=>download(f)}><Download size={12}/>{f.name}</button>)}</div></div>}
   {notice&&<div className="framework-notice"><span>{notice}</span><button onClick={()=>setNotice('')} aria-label="Dismiss notice"><X size={14}/></button></div>}
   </div></section><footer className="framework-footer">POM rule: page objects own interactions; tests own scenario intent and assertions. The hosted app generates source templates but never executes arbitrary browser code.</footer>
 </main>;
}
