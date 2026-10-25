'use client';

import { useMemo, useState, useEffect, useRef, useId } from 'react';
import { Activity, ArrowDownToLine, ArrowRight, BookOpen, Bookmark, Check, ChevronDown, ChevronRight, CircleHelp, Code2, Copy, Filter, FlaskConical, Gauge, GraduationCap, Laptop, Layers3, Menu, Moon, Play, Search, Settings2, ShieldCheck, Sparkles, Sun, TerminalSquare, Upload, X } from 'lucide-react';
import { lessons, navGroups, type Lesson, type Language, type Tool } from '@/lib/catalog';
import { generateProject } from '@/lib/generator';

const demoOptions = ['login','dropdown','modal','table','form','tabs'] as const;
type DemoType = typeof demoOptions[number];
type FileEntry = {name:string;content:string};

const navIcon:Record<string,React.ReactNode> = {
  'Dashboard':<Gauge size={16}/>, 'Getting Started':<GraduationCap size={16}/>, 'Automation Fundamentals':<Layers3 size={16}/>, 'Website Elements':<Laptop size={16}/>, 'User Interactions':<Activity size={16}/>, 'Locators & Selectors':<Search size={16}/>, 'Page Object Model':<Code2 size={16}/>, 'Playwright':<FlaskConical size={16}/>, 'Selenium':<ShieldCheck size={16}/>, 'Python':<Code2 size={16}/>, 'JavaScript':<Code2 size={16}/>, 'TypeScript':<Code2 size={16}/>, 'Test Frameworks':<Layers3 size={16}/>, 'E2E Scenarios':<Play size={16}/>, 'API & Network Testing':<Activity size={16}/>, 'Debugging & Reporting':<TerminalSquare size={16}/>, 'Practice Lab':<FlaskConical size={16}/>, 'Cheat Sheets':<BookOpen size={16}/>, 'Progress & Bookmarks':<Bookmark size={16}/>, 'Advanced Components':<Layers3 size={16}/>, 'Dynamic Components':<Activity size={16}/>, 'Forms and Validation':<Check size={16}/>, 'Accessibility Testing':<ShieldCheck size={16}/>
};
const toolSnippets:Record<Tool,Record<Language,string>> = {
  Playwright: {
    TypeScript:"await page.getByRole('button', { name: 'Save changes' }).click();\nawait expect(page.getByRole('status')).toContainText('Saved');",
    JavaScript:"await page.getByRole('button', { name: 'Save changes' }).click();\nawait expect(page.getByRole('status')).toContainText('Saved');",
    Python:"page.get_by_role('button', name='Save changes').click()\nexpect(page.get_by_role('status')).to_contain_text('Saved')"
  },
  Selenium: {
    TypeScript:"const save = await driver.wait(until.elementLocated(By.css('[data-testid=save]')), 10000);\nawait driver.wait(until.elementIsEnabled(save), 10000);\nawait save.click();",
    JavaScript:"const save = await driver.wait(until.elementLocated(By.css('[data-testid=save]')), 10000);\nawait driver.wait(until.elementIsEnabled(save), 10000);\nawait save.click();",
    Python:"save = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid=save]')))\nsave.click()"
  }
};


function HelpTip({text}:{text:string}) {
 const id=useId();
 const [open,setOpen]=useState(false);
 return <span className={'help-tip '+(open?'is-open':'')}><button type="button" className="help-tip-trigger" aria-label={`Help: ${text}`} aria-describedby={id} aria-expanded={open} onClick={()=>setOpen(v=>!v)}><CircleHelp size={13}/></button><span id={id} role="tooltip" className="help-tip-content">{text}</span></span>;
}

type PreviewStep = { label: string; code: string };

function getPreviewScript(type: DemoType, tool: Tool, language: Language): PreviewStep[] {
  const py = language === 'Python';
  const pw = tool === 'Playwright';
  const seleniumFallbacks: Record<string, {js:string;python:string}> = {
    'Open environment menu': {js:"await driver.findElement(By.css('.demo-select')).click();",python:"driver.find_element(By.CSS_SELECTOR, '.demo-select').click()"},
    'Choose Preview': {js:"await driver.findElement(By.css('.demo-options button:nth-child(2)')).click();",python:"driver.find_element(By.CSS_SELECTOR, '.demo-options button:nth-child(2)').click()"},
    'Assert selected environment': {js:"if (!(await driver.findElement(By.css('[role=status]')).getText()).includes('Preview')) throw new Error('Selection missing');",python:"assert 'Preview' in driver.find_element(By.CSS_SELECTOR, '[role=status]').text"},
    'Open confirmation dialog': {js:"await driver.findElement(By.css('.demo-component .demo-primary')).click();",python:"driver.find_element(By.CSS_SELECTOR, '.demo-component .demo-primary').click()"},
    'Verify dialog is visible': {js:"if (!(await driver.findElement(By.css('[role=dialog]')).isDisplayed())) throw new Error('Dialog not visible');",python:"assert driver.find_element(By.CSS_SELECTOR, '[role=dialog]').is_displayed()"},
    'Confirm action': {js:"await driver.findElement(By.css('[role=dialog] .demo-primary')).click();",python:"driver.find_element(By.CSS_SELECTOR, '[role=dialog] .demo-primary').click()"},
    'Assert confirmation result': {js:"if (!(await driver.findElement(By.css('[role=status]')).getText()).includes('completed')) throw new Error('Status missing');",python:"assert 'completed' in driver.find_element(By.CSS_SELECTOR, '[role=status]').text"},
    'Search team members': {js:"await driver.findElement(By.css('.demo-search input')).sendKeys('Maya');",python:"driver.find_element(By.CSS_SELECTOR, '.demo-search input').send_keys('Maya')"},
    'Assert matching row': {js:"if (!(await driver.findElement(By.css('.demo-table-view tbody tr')).getText()).includes('Maya Patel')) throw new Error('Matching row missing');",python:"assert 'Maya Patel' in driver.find_element(By.CSS_SELECTOR, '.demo-table-view tbody tr').text"},
    'Fill work email': {js:"await driver.findElement(By.css('input[aria-label=\"Work email\"]')).sendKeys('qa@example.com');",python:"driver.find_element(By.CSS_SELECTOR, 'input[aria-label=\"Work email\"]').send_keys('qa@example.com')"},
    'Fill access reason': {js:"await driver.findElement(By.css('textarea[aria-label=\"Reason for access\"]')).sendKeys('Automation testing');",python:"driver.find_element(By.CSS_SELECTOR, 'textarea[aria-label=\"Reason for access\"]').send_keys('Automation testing')"},
    'Submit request': {js:"await driver.findElement(By.css('.demo-component .demo-primary')).click();",python:"driver.find_element(By.CSS_SELECTOR, '.demo-component .demo-primary').click()"},
    'Assert submission result': {js:"if (!(await driver.findElement(By.css('[role=status]')).getText()).includes('received')) throw new Error('Submission missing');",python:"assert 'received' in driver.find_element(By.CSS_SELECTOR, '[role=status]').text"},
    'Open Security tab': {js:"await driver.findElement(By.css('[role=tab]:nth-child(3)')).click();",python:"driver.find_element(By.CSS_SELECTOR, '[role=tab]:nth-child(3)').click()"},
    'Assert active tab': {js:"if (await driver.findElement(By.css('[role=tab]:nth-child(3)')).getAttribute('aria-selected') !== 'true') throw new Error('Security tab is not active');",python:"assert driver.find_element(By.CSS_SELECTOR, '[role=tab]:nth-child(3)').get_attribute('aria-selected') == 'true'"}
  };
  const make = (label: string, js: string, python: string, seleniumJs?: string, seleniumPy?: string): PreviewStep => ({
    label,
    code: py ? (pw ? python : (seleniumPy || seleniumFallbacks[label]?.python || python)) : (pw ? js : (seleniumJs || seleniumFallbacks[label]?.js || js))
  });
  if (type === 'login') return [
    make('Fill email', "await page.getByLabel('Email address').fill('qa@example.com');", "page.get_by_label('Email address').fill('qa@example.com')", "await driver.findElement(By.css('input[type=email]')).sendKeys('qa@example.com');", "driver.find_element(By.CSS_SELECTOR, 'input[type=email]').send_keys('qa@example.com')"),
    make('Fill password', "await page.getByLabel('Password').fill('demo-password');", "page.get_by_label('Password').fill('demo-password')", "await driver.findElement(By.css('input[type=password]')).sendKeys('demo-password');", "driver.find_element(By.CSS_SELECTOR, 'input[type=password]').send_keys('demo-password')"),
    make('Remember this device', "await page.getByRole('checkbox', { name: /Remember me/ }).check();", "page.get_by_role('checkbox', name='Remember me').check()", "await driver.findElement(By.css('.demo-login .demo-check input')).click();", "driver.find_element(By.CSS_SELECTOR, '.demo-login .demo-check input').click()"),
    make('Submit login form', "await page.getByRole('button', { name: 'Sign in' }).click();", "page.get_by_role('button', name='Sign in').click()", "await driver.findElement(By.css('.demo-login button.demo-primary')).click();", "driver.find_element(By.CSS_SELECTOR, '.demo-login button.demo-primary').click()"),
    make('Assert success message', "await expect(page.getByRole('status')).toContainText('completed');", "expect(page.get_by_role('status')).to_contain_text('completed')", "if (!(await driver.findElement(By.css('[role=status]')).getText()).includes('completed')) throw new Error('Status missing');", "assert 'completed' in driver.find_element(By.CSS_SELECTOR, '[role=status]').text")
  ];
  if (type === 'dropdown') return [
    make('Open environment menu', "await page.getByRole('button', { name: /Select environment/ }).click();", "page.get_by_role('button', name='Select environment').click()"),
    make('Choose Preview', "await page.getByRole('button', { name: 'Preview' }).click();", "page.getByRole('button', name='Preview').click()"),
    make('Assert selected environment', "await expect(page.getByRole('status')).toContainText('Preview');", "expect(page.get_by_role('status')).to_contain_text('Preview')")
  ];
  if (type === 'modal') return [
    make('Open confirmation dialog', "await page.getByRole('button', { name: /Open confirmation/ }).click();", "page.get_by_role('button', name='Open confirmation').click()"),
    make('Verify dialog is visible', "await expect(page.getByRole('dialog')).toBeVisible();", "expect(page.get_by_role('dialog')).to_be_visible()"),
    make('Confirm action', "await page.getByRole('button', { name: 'Confirm' }).click();", "page.get_by_role('button', name='Confirm').click()"),
    make('Assert confirmation result', "await expect(page.getByRole('status')).toContainText('completed');", "expect(page.get_by_role('status')).to_contain_text('completed')")
  ];
  if (type === 'table') return [
    make('Search team members', "await page.getByRole('textbox', { name: 'Search members' }).fill('Maya');", "page.get_by_role('textbox', name='Search members').fill('Maya')"),
    make('Assert matching row', "await expect(page.getByRole('cell', { name: 'Maya Patel' })).toBeVisible();", "expect(page.get_by_role('cell', name='Maya Patel')).to_be_visible()")
  ];
  if (type === 'form') return [
    make('Fill work email', "await page.getByLabel('Work email').fill('qa@example.com');", "page.get_by_label('Work email').fill('qa@example.com')"),
    make('Fill access reason', "await page.getByLabel('Reason for access').fill('Automation testing');", "page.get_by_label('Reason for access').fill('Automation testing')"),
    make('Accept use policy', "await page.getByRole('checkbox', { name: /acceptable use policy/ }).check();", "page.get_by_role('checkbox', name='I agree to the acceptable use policy').check()", "await driver.findElement(By.css('.demo-component .demo-check input')).click();", "driver.find_element(By.CSS_SELECTOR, '.demo-component .demo-check input').click()"),
    make('Submit request', "await page.getByRole('button', { name: /Submit request/ }).click();", "page.get_by_role('button', name='Submit request').click()"),
    make('Assert submission result', "await expect(page.getByRole('status')).toContainText('received');", "expect(page.get_by_role('status')).to_contain_text('received')")
  ];
  return [
    make('Open Security tab', "await page.getByRole('tab', { name: 'Security' }).click();", "page.get_by_role('tab', name='Security').click()"),
    make('Assert active tab', "await expect(page.getByRole('tab', { name: 'Security' })).toHaveAttribute('aria-selected', 'true');", "expect(page.get_by_role('tab', name='Security')).to_have_attribute('aria-selected', 'true')")
  ];
}

function DemoPreview({type, runStep, onReset}:{type:DemoType;runStep:number;onReset:()=>void}) {
  const [opened,setOpened] = useState(false);
  const [query,setQuery] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [reason,setReason] = useState('');
  const [selectedTab,setSelectedTab] = useState('Overview');
  const [done,setDone] = useState(false);
  const [submitted,setSubmitted] = useState(false);
  const [checked,setChecked] = useState(false);
  const [sort,setSort] = useState('All');
  const reset = () => {setOpened(false);setQuery('');setEmail('');setPassword('');setReason('');setSelectedTab('Overview');setDone(false);setSubmitted(false);setChecked(false);setSort('All');onReset();};
  useEffect(() => {
    if (runStep <= 0) { setOpened(false); setQuery(''); setEmail(''); setPassword(''); setReason(''); setSelectedTab('Overview'); setDone(false); setSubmitted(false); setChecked(false); setSort('All'); return; }
    if (type === 'login') { setEmail(runStep >= 1 ? 'qa@example.com' : ''); setPassword(runStep >= 2 ? 'demo-password' : ''); setChecked(runStep >= 3); setSubmitted(runStep >= 4); }
    if (type === 'dropdown') { setOpened(runStep === 1); if (runStep >= 2) { setSort('Preview'); setOpened(false); setDone(true); } }
    if (type === 'modal') { setOpened(runStep === 1 || runStep === 2); if (runStep >= 3) { setOpened(false); setDone(true); } }
    if (type === 'table') setQuery(runStep >= 1 ? 'Maya' : '');
    if (type === 'form') { setEmail(runStep >= 1 ? 'qa@example.com' : ''); setReason(runStep >= 2 ? 'Automation testing' : ''); setChecked(runStep >= 3); setSubmitted(runStep >= 4); }
    if (type === 'tabs') setSelectedTab(runStep >= 1 ? 'Security' : 'Overview');
  }, [runStep, type]);
  return <div className="demo-shell">
    <div className="demo-browserbar"><span/><span/><span/><div className="demo-url">autolearn.local/{type}</div><button className="icon-mini" onClick={reset} title="Reset demo"><Activity size={13}/></button></div>
    <div className="demo-canvas">
      {type==='login' && <div className="demo-login"><div className="demo-brandmark">A</div><div className="demo-kicker">WELCOME BACK</div><h3>Sign in to your workspace</h3><p className="demo-muted">A local demo — no account required.</p><label>Email address<input aria-label="Email address" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Password<input aria-label="Password" type="password" placeholder="Enter password" value={password} onChange={e=>setPassword(e.target.value)}/></label><div className="demo-inline"><label className="demo-check"><input type="checkbox" checked={checked} onChange={e=>setChecked(e.target.checked)}/> Remember me</label><a href="#forgot" onClick={e=>e.preventDefault()}>Forgot password?</a></div><button className="demo-primary" onClick={()=>setSubmitted(true)}>Sign in <ArrowRight size={14}/></button>{submitted&&<div className="demo-success" role="status"><Check size={14}/> Demo action completed. Verify the result in your test.</div>}<div className="demo-muted demo-small">Try filling fields and clicking the button.</div></div>}
      {type==='dropdown' && <div className="demo-component"><div className="demo-kicker">CUSTOM COMPONENT</div><h3>Choose your environment</h3><p className="demo-muted">Open the menu and choose an option.</p><div className="demo-select-wrap"><button className="demo-select" aria-expanded={opened} onClick={()=>setOpened(!opened)}>{sort==='All'?'Select environment':sort}<ChevronDown size={15}/></button>{opened&&<div className="demo-options" role="listbox">{['Development','Preview','Production'].map(v=><button key={v} onClick={()=>{setSort(v);setOpened(false);setDone(true)}}>{v}{sort===v&&<Check size={14}/>}</button>)}</div>}</div>{done&&<div className="demo-success" role="status"><Check size={14}/> Selected: {sort}</div>}<div className="demo-locator-hint"><code>getByRole('button', name: 'Select environment')</code></div></div>}
      {type==='modal' && <div className="demo-component"><div className="demo-kicker">DIALOG WORKFLOW</div><h3>Destructive action</h3><p className="demo-muted">Practice opening, checking, and closing a dialog.</p><button className="demo-primary" onClick={()=>setOpened(true)}>Open confirmation <ArrowRight size={14}/></button><div className="demo-locator-hint"><code>getByRole('dialog')</code><br/><code>getByRole('button', name: 'Cancel')</code></div>{opened&&<div className="demo-modal-shade"><div className="demo-modal" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><div className="modal-icon"><CircleHelp size={21}/></div><h3 id="dialog-title">Are you sure?</h3><p className="demo-muted">This local demo does not delete anything.</p><div className="demo-modal-actions"><button className="demo-secondary" onClick={()=>setOpened(false)}>Cancel</button><button className="demo-primary" onClick={()=>{setOpened(false);setDone(true)}}>Confirm</button></div></div></div>}{done&&<div className="demo-success" role="status"><Check size={14}/> Confirmation flow completed.</div>}</div>}
      {type==='table' && <div className="demo-table-view"><div className="demo-kicker">DATA TABLE</div><div className="demo-table-title"><h3>Team members</h3><span className="demo-count">3 records</span></div><div className="demo-search"><Search size={14}/><input aria-label="Search members" placeholder="Search names..." value={query} onChange={e=>setQuery(e.target.value)}/>{query&&<button onClick={()=>setQuery('')} aria-label="Clear search"><X size={13}/></button>}</div><table><thead><tr><th>Name</th><th>Role</th><th>Status</th></tr></thead><tbody>{[{name:'Maya Patel',role:'Engineer',status:'Active'},{name:'Arjun Shah',role:'Designer',status:'Active'},{name:'Noah Williams',role:'QA Analyst',status:'Invited'}].filter(m=>m.name.toLowerCase().includes(query.toLowerCase())).map(m=><tr key={m.name}><td><span className="avatar-dot">{m.name.split(' ').map(n=>n[0]).join('')}</span>{m.name}</td><td>{m.role}</td><td><span className={'status-pill '+(m.status==='Active'?'green':'amber')}>{m.status}</span></td></tr>)}</tbody></table>{query&&<div className="demo-muted demo-small">Filtered rows update as you type.</div>}</div>}
      {type==='form' && <div className="demo-component"><div className="demo-kicker">FORM VALIDATION</div><h3>Request access</h3><p className="demo-muted">Submit to see a local validation state.</p><label>Work email<input type="email" aria-label="Work email" placeholder="name@company.com" value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Reason for access<textarea aria-label="Reason for access" placeholder="What do you need access to?" rows={3} value={reason} onChange={e=>setReason(e.target.value)}/></label><label className="demo-check"><input type="checkbox" checked={checked} onChange={e=>setChecked(e.target.checked)}/> I agree to the acceptable use policy</label><button className="demo-primary" onClick={()=>setSubmitted(true)}>Submit request <ArrowRight size={14}/></button>{submitted&&<div className="demo-success" role="status"><Check size={14}/> Demo submission received. Test the success or validation message.</div>}</div>}
      {type==='tabs' && <div className="demo-component"><div className="demo-kicker">TABBED PANEL</div><h3>Project settings</h3><div className="demo-tabs" role="tablist">{['Overview','Members','Security'].map(t=><button key={t} role="tab" aria-selected={selectedTab===t} className={selectedTab===t?'active':''} onClick={()=>setSelectedTab(t)}>{t}</button>)}</div><div className="demo-tab-content" role="tabpanel"><div className="tab-symbol"><Layers3 size={17}/></div><h4>{selectedTab}</h4><p className="demo-muted">This is the {selectedTab.toLowerCase()} panel. Select another tab to verify state and content.</p><span className="demo-small demo-muted">aria-selected="{String(selectedTab!=='' )}"</span></div></div>}
    </div>
    <div className="demo-footer"><span><span className="live-dot"/> Interactive local preview</span><button onClick={reset}>Reset <Activity size={12}/></button></div>
  </div>;
}

export default function Home() {
  const [activeNav,setActiveNav] = useState('Dashboard');
  const [selectedId,setSelectedId] = useState('login-pom');
  const [search,setSearch] = useState('');
  const [tool,setTool] = useState<Tool>('Playwright');
  const [language,setLanguage] = useState<Language>('TypeScript');
  const [difficulty,setDifficulty] = useState('All levels');
  const [pom,setPom] = useState(true);
  const [framework,setFramework] = useState('Recommended');
  const [action,setAction] = useState('Click');
  const [component,setComponent] = useState('Login form');
  const [url,setUrl] = useState('http://127.0.0.1:3000/demo');
  const [bookmarks,setBookmarks] = useState<string[]>([]);
  const [hydrated,setHydrated] = useState(false);
  const backupInputRef = useRef<HTMLInputElement>(null);
  const [completed,setCompleted] = useState<string[]>([]);
  const [tab,setTab] = useState<'lesson'|'preview'>('lesson');
  const [codeTab,setCodeTab] = useState<'page'|'test'|'config'>('test');
  const [dark,setDark] = useState(true);
  const [sidebarOpen,setSidebarOpen] = useState(false);
  const [generated,setGenerated] = useState<FileEntry[]>([]);
  const [generatedName,setGeneratedName] = useState('');
  const [copied,setCopied] = useState(false);
  const [showGenerator,setShowGenerator] = useState(false);
  const [showFilters,setShowFilters] = useState(false);
  const [notice,setNotice] = useState('');
  const [commandOpen,setCommandOpen] = useState(false);
  const [commandQuery,setCommandQuery] = useState('');
  const [runStep,setRunStep] = useState(0);
  const [runStatus,setRunStatus] = useState<'ready'|'running'|'passed'|'failed'>('ready');
  const [runLogs,setRunLogs] = useState<{kind:'info'|'running'|'pass'|'error';message:string}[]>([]);
  useEffect(()=>{
    try {
      const raw=window.localStorage.getItem('autolearn-qa-workspace-v2');
      if(raw){
        const saved=JSON.parse(raw) as {selectedId?:string;activeNav?:string;search?:string;difficulty?:string;bookmarks?:string[];completed?:string[];dark?:boolean};
        if(saved.selectedId&&lessons.some(l=>l.id===saved.selectedId))setSelectedId(saved.selectedId);
        if(typeof saved.activeNav==='string')setActiveNav(saved.activeNav);
        if(typeof saved.search==='string')setSearch(saved.search);
        if(typeof saved.difficulty==='string')setDifficulty(saved.difficulty);
        if(Array.isArray(saved.bookmarks))setBookmarks(saved.bookmarks.filter(id=>lessons.some(l=>l.id===id)));
        if(Array.isArray(saved.completed))setCompleted(saved.completed.filter(id=>lessons.some(l=>l.id===id)));
        if(typeof saved.dark==='boolean')setDark(saved.dark);
      }
    } catch { /* Ignore invalid or unavailable local workspace data. */ }
    setHydrated(true);
  },[]);
  useEffect(()=>{
    if(!hydrated)return;
    try { window.localStorage.setItem('autolearn-qa-workspace-v2',JSON.stringify({version:2,selectedId,activeNav,search,difficulty,bookmarks,completed,dark,updatedAt:new Date().toISOString()})); }
    catch { /* Private browsing or quota restrictions should not block learning. */ }
  },[hydrated,selectedId,activeNav,search,difficulty,bookmarks,completed,dark]);
  useEffect(()=>{
    const handleShortcut=(event:KeyboardEvent)=>{
      if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();setCommandOpen(true);setCommandQuery('');}
      if(event.key==='Escape'){setCommandOpen(false);setCommandQuery('');setSidebarOpen(false);}
    };
    window.addEventListener('keydown',handleShortcut);
    return ()=>window.removeEventListener('keydown',handleShortcut);
  },[]);

  const exportWorkspace=()=>{
    const payload={schema:'autolearn-qa-workspace',version:2,exportedAt:new Date().toISOString(),selectedId,activeNav,search,difficulty,bookmarks,completed,dark};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
    const href=URL.createObjectURL(blob);const anchor=document.createElement('a');anchor.href=href;anchor.download='autolearn-qa-workspace.json';anchor.click();URL.revokeObjectURL(href);
    setNotice('Workspace backup exported. Keep the JSON file to restore your progress later.');
  };
  const importWorkspace=(file:File)=>{
    const reader=new FileReader();
    reader.onload=()=>{
      try {
        const data=JSON.parse(String(reader.result)) as {schema?:string;version?:number;selectedId?:string;activeNav?:string;search?:string;difficulty?:string;bookmarks?:string[];completed?:string[];dark?:boolean};
        if(data.schema!=='autolearn-qa-workspace'||![1,2].includes(data.version||0))throw new Error('Unsupported backup format');
        if(data.selectedId&&lessons.some(l=>l.id===data.selectedId))setSelectedId(data.selectedId);
        if(typeof data.activeNav==='string')setActiveNav(data.activeNav);
        if(typeof data.search==='string')setSearch(data.search);
        if(typeof data.difficulty==='string')setDifficulty(data.difficulty);
        if(Array.isArray(data.bookmarks))setBookmarks(data.bookmarks.filter(id=>lessons.some(l=>l.id===id)));
        if(Array.isArray(data.completed))setCompleted(data.completed.filter(id=>lessons.some(l=>l.id===id)));
        if(typeof data.dark==='boolean')setDark(data.dark);
        setNotice('Workspace backup imported successfully. Your local learning workspace has been restored.');
      } catch { setNotice('Import failed: choose a valid AutoLearn QA workspace JSON backup.'); }
    };
    reader.onerror=()=>setNotice('The selected backup file could not be read.');reader.readAsText(file);
  };

  const resetPreviewRun = () => {setRunStep(0);setRunStatus('ready');setRunLogs([]);};
  const runPreviewScript = async () => {
    if (runStatus === 'running') return;
    setRunStep(-1); setRunStatus('running');
    setRunLogs([{kind:'info',message:'Starting local preview scenario: '+selectedLesson.title}]);
    for (let i=0;i<previewSteps.length;i++) {
      setRunLogs(prev=>[...prev,{kind:'running',message:'Step '+(i+1)+': '+previewSteps[i].label}]);
      await new Promise(resolve=>window.setTimeout(resolve,550));
      setRunStep(i+1);
      setRunLogs(prev=>[...prev,{kind:'pass',message:'Step '+(i+1)+' passed — '+previewSteps[i].label}]);
    }
    setRunLogs(prev=>[...prev,{kind:'pass',message:'All '+previewSteps.length+' steps passed in the local preview.'}]);
    setRunStatus('passed');
  };

  const filteredLessons = useMemo(()=>lessons.filter(l=>{
    const q=search.toLowerCase();
    const matchesSearch=!q||[l.title,l.category,l.description,...l.tags].some(x=>x.toLowerCase().includes(q));
    const matchesDifficulty=difficulty==='All levels'||l.difficulty===difficulty;
    const matchesNav=activeNav==='Dashboard'||activeNav==='Getting Started'||activeNav==='Automation Fundamentals'||activeNav==='Practice Lab'||activeNav==='Cheat Sheets'||activeNav==='Page Object Model'||activeNav==='Locators & Selectors'||activeNav==='Progress & Bookmarks'||activeNav==='Playwright'||activeNav==='Selenium'||activeNav==='Python'||activeNav==='JavaScript'||activeNav==='TypeScript'||activeNav==='Test Frameworks'||l.category.toLowerCase().includes(activeNav.toLowerCase().replace('&','and'))||l.tags.some(t=>t.toLowerCase().includes(activeNav.toLowerCase()));
    return matchesSearch&&matchesDifficulty&&matchesNav;
  }),[search,difficulty,activeNav]);
  const selectedLesson=lessons.find(l=>l.id===selectedId)||lessons[0];
  const selectedIndex=lessons.findIndex(l=>l.id===selectedLesson.id);
  const selectedDemo=(selectedLesson.demo||'login') as DemoType;
  const previewSteps = useMemo(()=>getPreviewScript(selectedDemo,tool,language),[selectedDemo,tool,language]);
  const generatedFiles=generated.length?generated:generateProject({tool,language,component,action,pom,framework,url});
  const currentCode=codeTab==='page'?generatedFiles[0]?.content:codeTab==='config'?generatedFiles[generatedFiles.length-1]?.content:generatedFiles[Math.min(1,generatedFiles.length-1)]?.content;
  const progress=Math.round(completed.length/lessons.length*100);
  const toggleBookmark=(id:string)=>setBookmarks(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
  const markComplete=(id:string)=>setCompleted(prev=>prev.includes(id)?prev: [...prev,id]);
  const chooseLesson=(l:Lesson)=>{setSelectedId(l.id);setActiveNav('Dashboard');setTab('lesson');setCodeTab('test');setSidebarOpen(false);};
  const doCopy=async(text:string)=>{try{await navigator.clipboard.writeText(text);setCopied(true);window.setTimeout(()=>setCopied(false),1600);}catch{setNotice('Clipboard unavailable in this browser. Select and copy the code manually.');}};
  const downloadFile=(file:FileEntry)=>{const blob=new Blob([file.content],{type:'text/plain;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=file.name.split('/').pop()||'generated.txt';a.click();URL.revokeObjectURL(a.href);};
  const downloadAll=()=>{generatedFiles.forEach(f=>downloadFile(f));setNotice('Downloads started for each generated file. A ZIP bundle can be added with a client-side ZIP library.');};
  const runGenerator=()=>{const files=generateProject({tool,language,component,action,pom,framework,url});setGenerated(files);setGeneratedName(`${tool} ${language} · ${component}`);setCodeTab('test');setShowGenerator(false);setNotice(`Generated ${files.length} project files. Review selectors and run against the matching local demo before relying on the tests.`);};

  return <div className={dark?'app app-dark':'app app-light'}>
    <header className="topbar"><button className="mobile-menu icon-button" onClick={()=>setSidebarOpen(!sidebarOpen)} aria-label="Toggle navigation"><Menu size={19}/></button><button className="brand" onClick={()=>{setActiveNav('Dashboard');setSearch('');}}><span className="brand-symbol"><Code2 size={19}/></span><span><strong>AutoLearn<span> QA</span></strong><small>ENGINEERING LAB</small></span></button><div className="topbar-divider"/><div className="top-search"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search lessons, elements, actions..." aria-label="Search curriculum"/><button className="command-shortcut" onClick={()=>{setCommandOpen(true);setCommandQuery('');}} aria-label="Open command palette"><kbd>Ctrl K / ⌘ K</kbd></button></div><div className="top-actions"><span className="top-version"><span className="live-dot"/> Learning mode <HelpTip text="This workspace teaches automation patterns. Preview runs replay against a local interactive demo; they do not start a real Python, Selenium, or browser process."/></span><button className="icon-button" title="Toggle theme" onClick={()=>setDark(!dark)}>{dark?<Sun size={17}/>:<Moon size={17}/>}</button><button className="avatar-button" title="Learner profile">S</button></div></header>
    {sidebarOpen&&<button className="sidebar-scrim" onClick={()=>setSidebarOpen(false)} aria-label="Close navigation"/>}
    <div className="app-layout">
      <aside className={'sidebar '+(sidebarOpen?'sidebar-open':'')}><div className="sidebar-caption">WORKSPACE</div>{navGroups.map(group=><div className="nav-group" key={group.title}><div className="nav-group-title">{group.title}</div>{group.items.map(item=><button key={item} className={'nav-item '+(activeNav===item?'active':'')} onClick={()=>{setActiveNav(item);setSidebarOpen(false);if(item==='Progress & Bookmarks')setSearch('');}}>{navIcon[item]||<BookOpen size={16}/>}<span>{item}</span>{item==='Progress & Bookmarks'&&<span className="nav-count">{bookmarks.length}</span>}</button>)}</div>)}<div className="nav-group workspace-links"><div className="nav-group-title">QA WORKSPACES</div><button className="nav-item" onClick={()=>{window.location.href='/test-studio';setSidebarOpen(false);}}><FlaskConical size={16}/><span>Test Design Studio</span><ArrowRight size={12}/></button><button className="nav-item" onClick={()=>{window.location.href='/framework-builder';setSidebarOpen(false);}}><Layers3 size={16}/><span>Framework Builder</span><ArrowRight size={12}/></button></div><div className="sidebar-spacer"/><div className="sidebar-progress"><div className="progress-top"><span>YOUR PROGRESS</span><strong>{progress}%</strong></div><div className="progress-track"><i style={{width:`${progress}%`}}/></div><p>{completed.length} of {lessons.length} starter lessons complete</p><button onClick={()=>setActiveNav('Progress & Bookmarks')}>View learning stats <ArrowRight size={13}/></button></div><div className="sidebar-backup-actions"><button onClick={exportWorkspace} title="Export learning progress"><ArrowDownToLine size={13}/> Backup</button><button onClick={()=>backupInputRef.current?.click()} title="Import learning progress"><Upload size={13}/> Restore</button><input ref={backupInputRef} type="file" accept="application/json,.json" hidden onChange={e=>{const file=e.target.files?.[0];if(file)importWorkspace(file);e.currentTarget.value='';}}/></div><div className="sidebar-bottom"><div className="sidebar-avatar">SN</div><div><strong>Learning workspace</strong><small>{hydrated?'Saved on this device':'Restoring workspace…'}</small></div><button className="icon-mini" title="Workspace settings" onClick={()=>setNotice('Your progress, bookmarks, theme and current lesson are saved locally. Use Backup to export a portable JSON copy.')}><Settings2 size={15}/></button></div></aside>
      <main className="main-area">
        <div className="breadcrumbs"><span>AutoLearn QA</span><ChevronRight size={13}/><span>{activeNav==='Dashboard'?'Learning dashboard':activeNav}</span>{activeNav==='Dashboard'&&<><ChevronRight size={13}/><strong>Overview</strong></>}</div>
        <section className="welcome-row"><div><div className="eyebrow"><Sparkles size={14}/> YOUR AUTOMATION JOURNEY</div><h1>{activeNav==='Dashboard'?'Build better tests.':activeNav==='Progress & Bookmarks'?'Your learning progress.':activeNav==='Practice Lab'?'Practice by doing.':activeNav+'.'}</h1><p className="welcome-sub">Learn the why, explore the how, and build maintainable automation with real examples.</p></div><div className="welcome-cta"><button className="button-primary" onClick={()=>setShowGenerator(true)}><Code2 size={15}/> Generate a script <ArrowRight size={14}/></button><a className="button-outline small" href="/framework-builder"><Layers3 size={14}/> Build a POM framework <ArrowRight size={13}/></a><a className="button-outline small" href="/test-studio"><ShieldCheck size={14}/> Test Design Studio <ArrowRight size={13}/></a><span><ShieldCheck size={13}/> POM-first · Vercel-ready curriculum</span></div></section>
        <section className="stats-grid"><div className="stat-card"><div className="stat-icon purple"><BookOpen size={17}/></div><div className="stat-label">STARTER LESSONS <HelpTip text="Curated learning modules across the automation curriculum."/></div><div className="stat-value">{lessons.length}<span> curated</span></div><div className="stat-foot">Across core automation topics</div></div><div className="stat-card"><div className="stat-icon blue"><Code2 size={17}/></div><div className="stat-label">TOOL + LANGUAGE PAIRS <HelpTip text="Six combinations: Playwright or Selenium with Python, JavaScript, or TypeScript."/></div><div className="stat-value">06<span> variants</span></div><div className="stat-foot">Playwright & Selenium</div></div><div className="stat-card"><div className="stat-icon green"><Check size={17}/></div><div className="stat-label">LESSONS COMPLETED <HelpTip text="Completion is stored in this browser. Export a workspace backup to move it to another device."/></div><div className="stat-value">{completed.length}<span> / {lessons.length}</span></div><div className="stat-foot">Your local learning progress</div></div><div className="stat-card"><div className="stat-icon amber"><Bookmark size={17}/></div><div className="stat-label">BOOKMARKED <HelpTip text="Bookmark a lesson to make it easier to revisit later."/></div><div className="stat-value">{bookmarks.length}<span> saved</span></div><div className="stat-foot">Topics to revisit later</div></div></section>
        <div className="content-columns"><section className="left-column"><div className="section-head"><div><div className="section-overline">LEARNING PATH</div><h2>{activeNav==='Progress & Bookmarks'?'Saved & completed lessons':activeNav==='Dashboard'?'Explore the curriculum':`Explore ${activeNav}`}</h2><p>Pick a topic to open the guide, code, and live demo. <HelpTip text="Select a lesson to view its objectives, example automation pattern, pitfalls, and interactive practice."/></p></div><button className="button-outline small" title="Filter the curriculum by difficulty and clear filters to reset your search." onClick={()=>setShowFilters(!showFilters)}><Filter size={14}/> Filters <ChevronDown size={13}/></button></div>
          {showFilters&&<div className="filter-row"><label>Difficulty<select value={difficulty} onChange={e=>setDifficulty(e.target.value)}><option>All levels</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label><button onClick={()=>{setDifficulty('All levels');setSearch('');}}>Clear filters</button></div>}
          {activeNav==='Progress & Bookmarks'&&<div className="saved-tabs"><button className="active" onClick={()=>setSearch('')}>All lessons</button><button onClick={()=>setSearch('')}>Bookmarks ({bookmarks.length})</button><button onClick={()=>setSearch('')}>Completed ({completed.length})</button></div>}
          <div className="lesson-list">{filteredLessons.length===0?<div className="empty-state"><Search size={24}/><h3>No lessons match that search</h3><p>Try a broader term or clear the difficulty filter.</p><button className="button-outline small" onClick={()=>{setSearch('');setDifficulty('All levels');setActiveNav('Dashboard');}}>Reset search</button></div>:filteredLessons.map((lesson,i)=><button key={lesson.id} className={'lesson-row '+(lesson.id===selectedId?'selected':'')} onClick={()=>chooseLesson(lesson)}><span className={'lesson-number '+(completed.includes(lesson.id)?'completed':'')}>{completed.includes(lesson.id)?<Check size={14}/>:String(i+1).padStart(2,'0')}</span><span className="lesson-body"><span className="lesson-title-line"><strong>{lesson.title}</strong>{bookmarks.includes(lesson.id)&&<Bookmark className="tiny-bookmark" size={13}/>}</span><span className="lesson-desc">{lesson.description}</span><span className="lesson-tags"><span className={'level-pill '+lesson.difficulty.toLowerCase()}>{lesson.difficulty}</span>{lesson.tags.slice(0,3).map(t=><span className="tag" key={t}>{t}</span>)}</span></span><span className="lesson-arrow"><ChevronRight size={16}/></span></button>)}</div>
          <div className="path-note"><span className="note-icon"><CircleHelp size={16}/></span><div><strong>Learn the pattern, not just the syntax</strong><p>Each lesson links a visible interaction to resilient locators, Page Objects, and meaningful assertions.</p></div></div>
        </section>
        <section className="right-column"><div className="lesson-detail-card"><div className="detail-header"><div><div className="detail-meta"><span className="level-pill beginner">{selectedLesson.difficulty}</span><span className="detail-duration">8–12 min</span><span className="detail-course">{selectedLesson.category}</span></div><h2>{selectedLesson.title}</h2><p>{selectedLesson.description}</p></div><button className={'icon-button '+(bookmarks.includes(selectedLesson.id)?'saved':'')} title={bookmarks.includes(selectedLesson.id)?'Remove bookmark':'Bookmark lesson'} onClick={()=>toggleBookmark(selectedLesson.id)}><Bookmark size={17} fill={bookmarks.includes(selectedLesson.id)?'currentColor':'none'}/></button></div>
            <div className="detail-tabs"><button className={tab==='lesson'?'active':''} onClick={()=>setTab('lesson')}><BookOpen size={14}/> Lesson</button><button className={tab==='preview'?'active':''} onClick={()=>setTab('preview')}><Laptop size={14}/> Live preview <span className="tab-live"/></button><button onClick={()=>{setShowGenerator(true);setComponent(selectedLesson.title);}}><Code2 size={14}/> Script lab</button></div>
            {tab==='lesson'?<><div className="lesson-section"><div className="lesson-section-title"><span className="section-icon"><GraduationCap size={15}/></span><h3>What you'll learn</h3></div><ul className="objective-list">{selectedLesson.objectives.map(x=><li key={x}><span><Check size={12}/></span>{x}</li>)}</ul></div><div className="lesson-section code-section"><div className="lesson-section-title"><span className="section-icon code"><TerminalSquare size={15}/></span><div><h3>Automation pattern <HelpTip text="Compare the same testing intent across tools and languages. Treat the code as an example and adapt selectors to your app."/></h3><p>Choose a tool and language to compare the syntax.</p></div></div><div className="code-toolbar"><div className="code-selects"><select aria-label="Automation tool" value={tool} onChange={e=>setTool(e.target.value as Tool)}><option>Playwright</option><option>Selenium</option></select><select aria-label="Programming language" value={language} onChange={e=>setLanguage(e.target.value as Language)}><option>TypeScript</option><option>JavaScript</option><option>Python</option></select></div><button className="code-copy" onClick={()=>doCopy(toolSnippets[tool][language])}>{copied?<Check size={13}/>:<Copy size={13}/>} {copied?'Copied':'Copy'}</button></div><pre className="code-block"><code>{toolSnippets[tool][language]}</code></pre><div className="code-foot"><span><span className="live-dot muted-dot"/> Example snippet · not yet executed</span><button onClick={()=>setShowGenerator(true)}>Generate full POM <ArrowRight size={12}/></button></div></div><div className="lesson-section"><div className="lesson-section-title"><span className="section-icon warning"><CircleHelp size={15}/></span><h3>Watch out for</h3></div><ul className="pitfall-list">{selectedLesson.pitfalls.map(x=><li key={x}>{x}</li>)}</ul></div><div className="detail-footer"><button className={'button-outline '+(completed.includes(selectedLesson.id)?'complete':'')} onClick={()=>markComplete(selectedLesson.id)}>{completed.includes(selectedLesson.id)?<Check size={14}/>:<Check size={14}/>} {completed.includes(selectedLesson.id)?'Lesson completed':'Mark as complete'}</button><button className="button-primary" onClick={()=>setTab('preview')}>Try the demo <ArrowRight size={14}/></button></div></>:<div className="full-preview"><div className="preview-toolbar"><div><span className="live-dot"/> INTERACTIVE PREVIEW <HelpTip text="This is a safe local UI simulation. Running the sample replays steps against this demo and logs the sequence; it is not a real external browser execution."/></div><span>Local sandbox · Safe to explore</span></div><div className="preview-run-grid"><DemoPreview type={selectedDemo} runStep={runStep} onReset={resetPreviewRun}/><section className="preview-code-panel"><div className="preview-code-head"><div><span className="preview-terminal-dot"/><strong>Automation runner</strong><small>{tool} · {language}</small></div><span className={'run-status '+(runStatus==='passed'?'passed':runStatus==='running'?'running':runStatus==='failed'?'failed':'')}>{runStatus==='passed'?'PASSED':runStatus==='running'?'RUNNING':runStatus==='failed'?'FAILED':'READY'}</span></div><pre className="preview-script"><code>{previewSteps.map((step,i)=><span key={i} className={runStep===i+1&&runStatus==='running'?'script-line active':runStep>i?'script-line executed':'script-line'}><span className="script-line-number">{i+1}</span>{step.code}</span>)}</code></pre><div className="preview-run-actions"><button className="preview-run-button" onClick={runPreviewScript} disabled={runStatus==='running'}><Play size={13}/>{runStatus==='running'?'Running script…':'Run automation'}</button><button className="preview-reset-button" onClick={resetPreviewRun}><Activity size={13}/> Reset</button></div><div className="execution-console"><div className="execution-console-title"><TerminalSquare size={12}/> EXECUTION LOG <HelpTip text="Each entry describes the simulated replay step. A pass here confirms the demo interaction, not a real test against your production website."/><span>{runLogs.length} events</span></div>{runLogs.length===0?<p className="execution-empty">Run the sample to watch each step execute against the interactive preview.</p>:<div className="execution-events" aria-live="polite">{runLogs.map((log,i)=><div className={'execution-event '+log.kind} key={i}><span>{log.kind==='pass'?'✓':log.kind==='error'?'×':log.kind==='running'?'›':'·'}</span><code>{log.message}</code></div>)}</div>}</div><p className="preview-runtime-note">Safe browser demo runner: it replays this scenario against the local preview UI. Python/Selenium syntax is shown for learning; this page does not launch a real Python or WebDriver process.</p></section></div><div className="preview-instructions"><strong>Try it yourself</strong><p>Run the sample, watch the preview respond, and follow each execution log entry. Then edit the scenario in your own test project to execute it with a real Playwright or Selenium runtime.</p></div></div>}
          </div><div className="next-lesson"><div className="next-icon"><ArrowRight size={17}/></div><div><span>NEXT IN YOUR PATH</span><strong>{lessons[(selectedIndex+1)%lessons.length].title}</strong><small>Continue building your automation toolkit</small></div><button className="icon-button" onClick={()=>chooseLesson(lessons[(selectedIndex+1)%lessons.length])}><ArrowRight size={16}/></button></div>
        </section></div>
        <footer className="page-footer"><span>AutoLearn QA <span>·</span> Interactive Automation Engineering Lab</span><span><ShieldCheck size={13}/> Built for learning. Run scripts in your own test environment.</span><a href="https://github.com/SanFlash/Satyo-mate" target="_blank" rel="noreferrer">GitHub repository <ArrowRight size={12}/></a></footer>
      </main>
    </div>
    {commandOpen&&<div className="command-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget){setCommandOpen(false);setCommandQuery('');}}}><section className="command-palette" role="dialog" aria-modal="true" aria-labelledby="command-heading"><div className="command-search-row"><Search size={17}/><input autoFocus value={commandQuery} onChange={e=>setCommandQuery(e.target.value)} placeholder="Jump to a lesson, workspace or action…" aria-label="Search commands"/><kbd>ESC</kbd><button className="icon-button" onClick={()=>{setCommandOpen(false);setCommandQuery('');}} aria-label="Close command palette"><X size={16}/></button></div><div className="command-results" id="command-heading"><div className="command-section-label">QUICK ACTIONS</div>{[{label:'Test Design Studio',detail:'Plan scenarios and track coverage',icon:'studio'},{label:'Framework Builder',detail:'Compose a reusable Page Object Model',icon:'framework'},{label:'Generate automation project',detail:'Create a Playwright or Selenium starter',icon:'generate'}].filter(x=>(x.label+' '+x.detail).toLowerCase().includes(commandQuery.toLowerCase())).map(item=><button className="command-item" key={item.label} onClick={()=>{setCommandOpen(false);setCommandQuery('');if(item.icon==='studio')window.location.href='/test-studio';else if(item.icon==='framework')window.location.href='/framework-builder';else setShowGenerator(true);}}><span className="command-item-icon">{item.icon==='studio'?<FlaskConical size={16}/>:item.icon==='framework'?<Layers3 size={16}/>:<Code2 size={16}/>}</span><span><strong>{item.label}</strong><small>{item.detail}</small></span><ArrowRight size={14}/></button>)}<div className="command-section-label">NAVIGATION</div>{navGroups.flatMap(group=>group.items).filter(item=>item.toLowerCase().includes(commandQuery.toLowerCase())).slice(0,8).map(item=><button className="command-item" key={item} onClick={()=>{setActiveNav(item);setSearch('');setCommandOpen(false);setCommandQuery('');setSidebarOpen(false);window.scrollTo({top:0,behavior:'smooth'});}}><span className="command-item-icon">{navIcon[item]||<BookOpen size={16}/>}</span><span><strong>{item}</strong><small>Open this learning section</small></span><ArrowRight size={14}/></button>)}<div className="command-section-label">LESSONS</div>{lessons.filter(l=>(l.title+' '+l.category+' '+l.description+' '+l.tags.join(' ')).toLowerCase().includes(commandQuery.toLowerCase())).slice(0,7).map(lesson=><button className="command-item" key={lesson.id} onClick={()=>{chooseLesson(lesson);setCommandOpen(false);setCommandQuery('');window.scrollTo({top:0,behavior:'smooth'});}}><span className="command-item-icon"><BookOpen size={16}/></span><span><strong>{lesson.title}</strong><small>{lesson.category} · {lesson.difficulty}</small></span><ArrowRight size={14}/></button>)}{!navGroups.flatMap(group=>group.items).some(item=>item.toLowerCase().includes(commandQuery.toLowerCase()))&&!lessons.some(l=>(l.title+' '+l.category+' '+l.description+' '+l.tags.join(' ')).toLowerCase().includes(commandQuery.toLowerCase()))&&![ 'Test Design Studio','Framework Builder','Generate automation project'].some(x=>x.toLowerCase().includes(commandQuery.toLowerCase()))&&<div className="command-empty"><Search size={19}/><strong>No matches found</strong><span>Try a topic, tool, or workspace name.</span></div>}</div><div className="command-footer"><span><Search size={10}/> Type to filter</span><span><kbd>ESC</kbd> Close</span><span>AutoLearn QA · Quick navigation</span></div></section></div>}
    {notice&&<div className="toast-notice" role="status"><Check size={15}/>{notice}<button onClick={()=>setNotice('')} aria-label="Dismiss"><X size={14}/></button></div>}
    {showGenerator&&<div className="modal-backdrop" onClick={e=>{if(e.target===e.currentTarget)setShowGenerator(false)}}><section className="generator-modal" role="dialog" aria-modal="true" aria-labelledby="generator-heading"><div className="generator-head"><div><div className="eyebrow"><Sparkles size={13}/> SCRIPT GENERATOR</div><h2 id="generator-heading">Build your automation project</h2><p>Choose the stack and produce a multi-file starting point.</p></div><button className="icon-button" onClick={()=>setShowGenerator(false)} aria-label="Close generator"><X size={18}/></button></div><div className="generator-form"><label>Automation tool <HelpTip text="Choose Playwright for modern cross-browser automation or Selenium for WebDriver-based projects."/><select value={tool} onChange={e=>setTool(e.target.value as Tool)}><option>Playwright</option><option>Selenium</option></select></label><label>Language <HelpTip text="Select the language used for generated examples and starter files."/><select value={language} onChange={e=>setLanguage(e.target.value as Language)}><option>TypeScript</option><option>JavaScript</option><option>Python</option></select></label><label>Component / scenario <HelpTip text="Choose the UI behavior you want the starter test to cover. You may need to adapt locators and demo markup."/><select value={component} onChange={e=>setComponent(e.target.value)}>{['Login form','Dropdown','Modal dialog','Data table','Validated form','Tabs','Autocomplete','Accordion','Tooltip / popover','Toast notification','Pagination','Sortable table','Date and time input','Checkbox / radio / toggle','File upload','File download','Drag and drop','Keyboard navigation','Iframe','Shadow DOM component','Responsive navigation','Accessibility audit','API-assisted setup','Network mocking','Authentication session','E-commerce checkout','Visual regression','Trace and reporting','CI pipeline','Parallel test isolation','Mobile emulation','Data-driven testing','New browser tab','API response'].map(x=><option key={x}>{x}</option>)}</select></label><label>Action <HelpTip text="Select the primary interaction or assertion pattern to scaffold."/><select value={action} onChange={e=>setAction(e.target.value)}>{['Click','Fill inputs','Select option','Submit form','Search and filter','Open and close','Upload file','Download file','Sort results','Paginate results','Keyboard navigation','Drag and drop','Mock API response','Verify accessibility','Verify state','Navigate','Capture screenshot','Wait for response','Authenticate','Reset state'].map(x=><option key={x}>{x}</option>)}</select></label><label className="wide-field">Demo base URL <HelpTip text="Set the root URL of the application you will test. Use a local demo URL while developing; the generator does not visit it or run tests here."/><input value={url} onChange={e=>setUrl(e.target.value)} placeholder="http://127.0.0.1:3000/demo"/></label><label>Test framework <HelpTip text="Choose the test runner style for generated setup files where supported."/><select value={framework} onChange={e=>setFramework(e.target.value)}><option>Recommended</option><option>Playwright Test</option><option>pytest</option><option>Mocha</option></select></label><label className="pom-option"><span>Generate Page Object Model <HelpTip text="Page Objects encapsulate selectors and UI actions so tests can focus on scenario intent."/></span><input type="checkbox" checked={pom} onChange={e=>setPom(e.target.checked)}/></label></div><div className="generator-note"><ShieldCheck size={15}/><span>Templates are generated locally. Review locators and configure a matching demo route before running; no tests are executed by this page.</span></div><div className="generator-actions"><button className="button-outline" onClick={()=>setShowGenerator(false)}>Cancel</button><button className="button-primary" onClick={runGenerator}><Code2 size={15}/> Generate {tool} {language} project <ArrowRight size={14}/></button></div></section></div>}
    {generated.length>0&&<div className="generated-drawer"><div className="generated-top"><div><span className="live-dot"/> PROJECT GENERATED</div><button className="icon-button" onClick={()=>setGenerated([])} aria-label="Close generated project"><X size={16}/></button></div><h3>{generatedName}</h3><p>{generated.length} files generated. Review and download each starter file below.</p><div className="generated-file-list">{generated.map(f=><div key={f.name}><span><Code2 size={13}/>{f.name}</span><button onClick={()=>downloadFile(f)} title={`Download ${f.name}`}><ArrowDownToLine size={13}/></button><button onClick={()=>doCopy(f.content)} title={`Copy ${f.name}`}><Copy size={13}/></button></div>)}</div><div className="generated-actions"><button className="button-outline small" onClick={()=>downloadAll()}><ArrowDownToLine size={13}/> Download files</button><button className="button-primary small" onClick={()=>{setGenerated([]);setShowGenerator(true)}}>Edit configuration</button></div><small>Starter templates are not execution-verified. Configure matching selectors, demo markup, and dependencies before running.</small></div>}
  </div>;
}
