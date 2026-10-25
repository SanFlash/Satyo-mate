'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, ChevronDown, Clipboard, Code2, Download, FileJson, FileSpreadsheet, Filter, Plus, Search, ShieldCheck, Sparkles, Trash2, Upload, X } from 'lucide-react';

type Status = 'Not run' | 'Passed' | 'Failed' | 'Blocked';
type Priority = 'P0' | 'P1' | 'P2' | 'P3';
type TestCase = { id:string; title:string; area:string; priority:Priority; status:Status; preconditions:string; steps:string[]; expected:string; tags:string[] };
const STORAGE_KEY = 'satyo-mate-test-studio-v1';
const areas = ['Authentication','Forms & validation','Navigation','Tables & filters','Dialogs & overlays','Files & uploads','API & network','Responsive UI','Accessibility','Security','E-commerce','Error handling'];
const initialCases: TestCase[] = [
 {id:'TC-001',title:'Login with valid credentials',area:'Authentication',priority:'P0',status:'Not run',preconditions:'A registered test user exists and the login page is available.',steps:['Open the login page','Enter a valid email and password','Submit the form'],expected:'The user is authenticated and lands on the expected account page.',tags:['smoke','positive','POM']},
 {id:'TC-002',title:'Reject invalid credentials',area:'Authentication',priority:'P0',status:'Not run',preconditions:'The login page is available.',steps:['Enter an invalid password','Submit the form','Inspect the error state'],expected:'Access is denied, a useful error is shown, and no authenticated session is created.',tags:['negative','security']},
 {id:'TC-003',title:'Required-field validation',area:'Forms & validation',priority:'P1',status:'Not run',preconditions:'The target form is open and empty.',steps:['Submit without required fields','Inspect each field-level error','Fill required fields with valid data','Submit again'],expected:'Required fields show actionable errors; valid data can be submitted successfully.',tags:['validation','negative']},
 {id:'TC-004',title:'Keyboard-only navigation',area:'Accessibility',priority:'P1',status:'Not run',preconditions:'The page is loaded at its initial state.',steps:['Navigate using Tab and Shift+Tab','Activate a primary control with Enter or Space','Dismiss an open dialog with Escape where supported'],expected:'Focus order is logical, focus is visible, controls are operable, and focus is not trapped unexpectedly.',tags:['a11y','keyboard','WCAG']},
 {id:'TC-005',title:'Responsive layout at key viewports',area:'Responsive UI',priority:'P1',status:'Not run',preconditions:'The page is available in a browser with viewport resizing.',steps:['Check a narrow mobile viewport','Check a tablet viewport','Check a desktop viewport','Inspect overflow and primary actions'],expected:'Content remains readable and usable with no unintended horizontal overflow or inaccessible controls.',tags:['mobile','visual']},
 {id:'TC-006',title:'Search returns matching table rows',area:'Tables & filters',priority:'P2',status:'Not run',preconditions:'A table with known test records is available.',steps:['Enter a unique search term','Inspect visible rows and result count','Search for a value with no matches','Clear the search'],expected:'Only matching rows remain; empty state and reset behavior are correct.',tags:['data','filter']},
 {id:'TC-007',title:'Dialog confirmation and cancellation',area:'Dialogs & overlays',priority:'P2',status:'Not run',preconditions:'A reversible action that opens a confirmation dialog is available.',steps:['Open the dialog','Verify its title and accessible role','Cancel and verify no change','Reopen and confirm the action'],expected:'Cancel leaves data unchanged; confirm performs only the intended action and returns focus appropriately.',tags:['dialog','state']},
 {id:'TC-008',title:'API handles unauthorized requests',area:'API & network',priority:'P1',status:'Not run',preconditions:'A test environment and a non-production test endpoint are configured.',steps:['Send a request without credentials','Inspect status and response schema','Verify no sensitive fields are returned'],expected:'The API returns the documented authorization status and does not expose protected data.',tags:['API','negative','security']},
 {id:'TC-009',title:'Upload rejects unsupported file types',area:'Files & uploads',priority:'P2',status:'Not run',preconditions:'The upload form and a safe invalid fixture file are available.',steps:['Choose an unsupported file type','Attempt submission','Inspect validation feedback'],expected:'The file is rejected with a clear message and is not processed as a successful upload.',tags:['upload','validation']},
 {id:'TC-010',title:'Session expires safely',area:'Security',priority:'P0',status:'Not run',preconditions:'A test account and controlled session-expiry mechanism are available.',steps:['Authenticate as the test user','Expire or invalidate the test session','Request a protected page','Inspect redirects and response content'],expected:'Protected data remains inaccessible after expiry and the user receives a safe re-authentication path.',tags:['session','security','negative']},
 {id:'TC-011',title:'Network failure shows recoverable state',area:'Error handling',priority:'P2',status:'Not run',preconditions:'A controlled test route or mock can return a network error.',steps:['Simulate a failed request','Inspect error feedback','Retry after restoring the response'],expected:'The error is understandable, no false success is shown, and retry recovers without duplicate side effects.',tags:['resilience','network']},
 {id:'TC-012',title:'Cart total updates with quantity',area:'E-commerce',priority:'P1',status:'Not run',preconditions:'A test product with a known price is available in a sandbox.',steps:['Add the product to the cart','Increase quantity','Verify subtotal and total','Remove the product'],expected:'Totals recalculate correctly and removing the item updates the cart to the expected state.',tags:['e2e','calculation','sandbox']}
];
const uid = () => 'TC-' + Math.random().toString(36).slice(2,8).toUpperCase();
const asText = (v:unknown) => typeof v==='string' ? v : '';
const escapeCsv = (v:string) => '"' + v.replace(/"/g,'""') + '"';
function makeCase(area='Forms & validation'):TestCase { return {id:uid(),title:'New test scenario',area,priority:'P2',status:'Not run',preconditions:'Describe the required starting state.',steps:['Perform the first action','Perform the next action'],expected:'Describe the observable expected result.',tags:['custom']}; }
function makeCode(rows:TestCase[],tool:string,language:string):string {
 const py=language==='Python', selenium=tool==='Selenium';
 const output=rows.map(t=>{
  const name=t.title.replace(/[^a-zA-Z0-9]+/g,'_').replace(/^_|_$/g,'').toLowerCase()||'scenario';
  const title=t.title.replace(/'/g,"\\'");
  if(py) return 'def test_'+name+'(driver_or_page):\n    # Arrange: '+t.preconditions+'\n'+t.steps.map(s=>'    # Act: '+s).join('\n')+'\n    # Assert: '+t.expected+'\n    assert True, "Replace this placeholder with a real observable assertion"';
  if(!selenium) return "test('"+title+"', async ({ page }) => {\n  // Arrange: "+t.preconditions+'\n'+t.steps.map(s=>'  // Act: '+s).join('\n')+'\n  // Assert: '+t.expected+'\n  // TODO: replace with locator actions and observable assertions\n  expect(true).toBe(true);\n});';
  return "it('"+title+"', async () => {\n  // Arrange: "+t.preconditions+'\n'+t.steps.map(s=>'  // Act: '+s).join('\n')+'\n  // Assert: '+t.expected+'\n  // TODO: replace with driver actions and observable assertions\n  expect(true).toBe(true);\n});';
 });
 return (py?'#':'//')+' Generated test plan scaffold — '+tool+' / '+language+'\n'+(py?'#':'//')+' Replace comments/placeholders with real selectors, fixtures, setup and assertions.\n\n'+output.join('\n\n')+'\n';
}

export default function TestStudioPage() {
 const [cases,setCases]=useState<TestCase[]>(initialCases);
 const [selectedId,setSelectedId]=useState('TC-001');
 const [search,setSearch]=useState('');
 const [areaFilter,setAreaFilter]=useState('All areas');
 const [statusFilter,setStatusFilter]=useState('All statuses');
 const [priorityFilter,setPriorityFilter]=useState('All priorities');
 const [tool,setTool]=useState('Playwright');
 const [language,setLanguage]=useState('TypeScript');
 const [activeTab,setActiveTab]=useState<'details'|'coverage'|'code'>('details');
 const [notice,setNotice]=useState('');
 const [hydrated,setHydrated]=useState(false);
 const importRef=useRef<HTMLInputElement>(null);

 useEffect(()=>{
  try {
   const saved=window.localStorage.getItem(STORAGE_KEY);
   if(saved) {
    const parsed=JSON.parse(saved);
    if(Array.isArray(parsed)&&parsed.every((x)=>x&&typeof x.id==='string'&&typeof x.title==='string'&&Array.isArray(x.steps))) setCases(parsed);
   }
  } catch { /* ignore malformed local workspace data */ }
  setHydrated(true);
 },[]);
 useEffect(()=>{
  if(hydrated) {
   try { window.localStorage.setItem(STORAGE_KEY,JSON.stringify(cases)); }
   catch { setNotice('Browser storage is unavailable; export a JSON backup to keep your work.'); }
  }
 },[cases,hydrated]);

 const selected=cases.find(c=>c.id===selectedId)||cases[0];
 const filtered=useMemo(()=>cases.filter(c=>
  (areaFilter==='All areas'||c.area===areaFilter)&&
  (statusFilter==='All statuses'||c.status===statusFilter)&&
  (priorityFilter==='All priorities'||c.priority===priorityFilter)&&
  (!search||[c.id,c.title,c.area,c.expected,...c.tags,...c.steps].join(' ').toLowerCase().includes(search.toLowerCase()))
 ),[cases,areaFilter,statusFilter,priorityFilter,search]);
 const counts=useMemo(()=>({total:cases.length,passed:cases.filter(c=>c.status==='Passed').length,failed:cases.filter(c=>c.status==='Failed').length,blocked:cases.filter(c=>c.status==='Blocked').length,notRun:cases.filter(c=>c.status==='Not run').length,p0:cases.filter(c=>c.priority==='P0').length}),[cases]);
 const coveredAreas=useMemo(()=>areas.filter(a=>cases.some(c=>c.area===a)),[cases]);
 const coveragePercent=Math.round(coveredAreas.length/areas.length*100);
 const code=useMemo(()=>makeCode(filtered,tool,language),[filtered,tool,language]);
 const updateSelected=(patch:Partial<TestCase>)=>{if(selected)setCases(prev=>prev.map(c=>c.id===selected.id?{...c,...patch}:c));};
 const addCase=()=>{const next=makeCase(areaFilter!=='All areas'?areaFilter:'Forms & validation');setCases(prev=>[next,...prev]);setSelectedId(next.id);setActiveTab('details');setNotice('New test case added.');};
 const deleteSelected=()=>{if(!selected)return;const next=cases.filter(c=>c.id!==selected.id);setCases(next);setSelectedId(next[0]?.id||'');setNotice('Test case removed.');};
 const download=(name:string,content:string,type='text/plain')=>{const blob=new Blob([content],{type});const href=URL.createObjectURL(blob);const a=document.createElement('a');a.href=href;a.download=name;a.click();URL.revokeObjectURL(href);};
 const exportJson=()=>download('satyo-test-plan.json',JSON.stringify({schemaVersion:1,exportedAt:new Date().toISOString(),testCases:cases},null,2),'application/json');
 const exportCsv=()=>{const rows=[['ID','Title','Area','Priority','Status','Preconditions','Steps','Expected Result','Tags'],...cases.map(c=>[c.id,c.title,c.area,c.priority,c.status,c.preconditions,c.steps.join(' | '),c.expected,c.tags.join(', ')])];download('satyo-test-cases.csv',rows.map(row=>row.map(escapeCsv).join(',')).join('\r\n'),'text/csv;charset=utf-8');};
 const copy=async(text:string,label:string)=>{try{await navigator.clipboard.writeText(text);setNotice(label+' copied to clipboard.');}catch{setNotice('Clipboard permission was unavailable. Use the download option instead.');}};
 const importJson=async(file?:File)=>{
  if(!file)return;
  try {
   const parsed=JSON.parse(await file.text());const rows=Array.isArray(parsed)?parsed:parsed.testCases;
   if(!Array.isArray(rows)||!rows.length||!rows.every((x)=>x&&typeof x.id==='string'&&typeof x.title==='string'&&typeof x.area==='string'&&Array.isArray(x.steps)&&typeof x.expected==='string'))throw new Error('invalid schema');
   const normalized:TestCase[]=rows.map((x)=>({id:x.id,title:x.title,area:areas.includes(x.area)?x.area:'Error handling',priority:['P0','P1','P2','P3'].includes(x.priority)?x.priority:'P2',status:['Not run','Passed','Failed','Blocked'].includes(x.status)?x.status:'Not run',preconditions:asText(x.preconditions),steps:x.steps.filter((s:unknown)=>typeof s==='string'),expected:x.expected,tags:Array.isArray(x.tags)?x.tags.filter((s:unknown)=>typeof s==='string'):[]}));
   setCases(normalized);setSelectedId(normalized[0].id);setNotice('Imported '+normalized.length+' test cases.');
  } catch {setNotice('Import failed: choose a valid Satyo-mate test-plan JSON file.');}
  if(importRef.current)importRef.current.value='';
 };
 const setStep=(index:number,value:string)=>{if(selected)updateSelected({steps:selected.steps.map((s,i)=>i===index?value:s)});};
 const addStep=()=>{if(selected)updateSelected({steps:[...selected.steps,'New action']});};
 const removeStep=(index:number)=>{if(selected)updateSelected({steps:selected.steps.filter((_,i)=>i!==index)});};

 return <main className="studio-page">
  <header className="studio-topbar">
   <Link href="/" className="studio-back"><ArrowLeft size={15}/> Workspace</Link>
   <div className="studio-brand"><span className="studio-brand-icon"><ShieldCheck size={18}/></span><div><strong>Test Design Studio</strong><small>PLAN · COVER · EXPORT</small></div></div>
   <div className="studio-top-actions">
    <button className="studio-button quiet" onClick={()=>importRef.current?.click()}><Upload size={14}/> Import JSON</button>
    <input ref={importRef} type="file" accept=".json,application/json" hidden onChange={e=>void importJson(e.target.files?.[0])}/>
    <button className="studio-button quiet" onClick={exportJson}><FileJson size={14}/> Export JSON</button>
    <button className="studio-button primary" onClick={exportCsv}><FileSpreadsheet size={14}/> Export CSV</button>
   </div>
  </header>
  <section className="studio-hero">
   <div><div className="studio-eyebrow"><Sparkles size={13}/> QA ENGINEERING WORKBENCH</div><h1>Design tests with <span>coverage in mind.</span></h1><p>Build a traceable test plan, organize scenarios by risk, track execution outcomes, and export a reusable automation scaffold.</p></div>
   <div className="studio-hero-actions"><button className="studio-button primary" onClick={addCase}><Plus size={15}/> New test case</button><span><Check size={13}/> Autosaved in this browser</span></div>
  </section>
  <section className="studio-stats">
   <div className="studio-stat"><small>TOTAL TEST CASES</small><strong>{counts.total}</strong><span>{counts.p0} critical P0 scenarios</span></div>
   <div className="studio-stat"><small>PASSING</small><strong className="good">{counts.passed}</strong><span>{counts.total?Math.round(counts.passed/counts.total*100):0}% of all cases</span></div>
   <div className="studio-stat"><small>FAILED / BLOCKED</small><strong className={counts.failed+counts.blocked?'bad':''}>{counts.failed+counts.blocked}</strong><span>{counts.failed} failed · {counts.blocked} blocked</span></div>
   <div className="studio-stat"><small>AREA COVERAGE</small><strong>{coveragePercent}%</strong><span>{coveredAreas.length} of {areas.length} areas represented</span><div className="studio-progress"><i style={{width:coveragePercent+'%'}}/></div></div>
  </section>
  {notice&&<div className="studio-notice" role="status">{notice}<button aria-label="Dismiss notification" onClick={()=>setNotice('')}><X size={13}/></button></div>}
  <section className="studio-workspace">
   <aside className="studio-list-panel">
    <div className="studio-list-head"><div><h2>Test inventory</h2><span>{filtered.length} shown · {cases.length} total</span></div><button className="studio-icon-button" title="Add test case" onClick={addCase}><Plus size={16}/></button></div>
    <label className="studio-search"><Search size={14}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search cases, steps, tags…"/></label>
    <div className="studio-filters"><label><Filter size={12}/><select value={areaFilter} onChange={e=>setAreaFilter(e.target.value)}><option>All areas</option>{areas.map(a=><option key={a}>{a}</option>)}</select></label><select aria-label="Filter by status" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option>All statuses</option>{(['Not run','Passed','Failed','Blocked'] as Status[]).map(s=><option key={s}>{s}</option>)}</select><select aria-label="Filter by priority" value={priorityFilter} onChange={e=>setPriorityFilter(e.target.value)}><option>All priorities</option>{(['P0','P1','P2','P3'] as Priority[]).map(p=><option key={p}>{p}</option>)}</select></div>
    <div className="studio-case-list">{filtered.map(c=><button key={c.id} className={'studio-case-item '+(c.id===selectedId?'selected':'')} onClick={()=>setSelectedId(c.id)}><div className="studio-case-top"><code>{c.id}</code><span className={'studio-priority '+c.priority.toLowerCase()}>{c.priority}</span></div><strong>{c.title}</strong><div className="studio-case-meta"><span>{c.area}</span><span className={'studio-status-dot '+c.status.toLowerCase().replace(' ','-')}>{c.status}</span></div></button>)}{filtered.length===0&&<div className="studio-empty"><Search size={20}/><strong>No matching cases</strong><span>Change a filter or create a test case.</span><button onClick={()=>{setSearch('');setAreaFilter('All areas');setStatusFilter('All statuses');setPriorityFilter('All priorities');}}>Clear filters</button></div>}</div>
    <div className="studio-list-footer"><span><span className="studio-live-dot"/> Local workspace</span><button onClick={()=>{setCases(initialCases);setSelectedId(initialCases[0].id);setNotice('Starter plan restored.');}}>Restore starter plan</button></div>
   </aside>
   <section className="studio-detail-panel">
    {!selected?<div className="studio-empty"><strong>No test selected</strong><button onClick={addCase}>Create a test case</button></div>:<>
     <div className="studio-detail-heading"><div><div className="studio-case-top"><code>{selected.id}</code><span className={'studio-priority '+selected.priority.toLowerCase()}>{selected.priority} priority</span></div><h2>{selected.title}</h2><p>Keep the setup, actions, and expected outcome specific enough that another tester can reproduce the result.</p></div><button className="studio-icon-button danger" title="Delete test case" onClick={deleteSelected}><Trash2 size={15}/></button></div>
     <div className="studio-tabs"><button className={activeTab==='details'?'active':''} onClick={()=>setActiveTab('details')}>Scenario details</button><button className={activeTab==='coverage'?'active':''} onClick={()=>setActiveTab('coverage')}>Coverage map</button><button className={activeTab==='code'?'active':''} onClick={()=>setActiveTab('code')}><Code2 size={13}/> Automation scaffold</button></div>
     {activeTab==='details'&&<div className="studio-editor">
      <div className="studio-form-grid"><label>Test title<input value={selected.title} onChange={e=>updateSelected({title:e.target.value})}/></label><label>Coverage area<select value={selected.area} onChange={e=>updateSelected({area:e.target.value})}>{areas.map(a=><option key={a}>{a}</option>)}</select></label><label>Priority<select value={selected.priority} onChange={e=>updateSelected({priority:e.target.value as Priority})}>{(['P0','P1','P2','P3'] as Priority[]).map(p=><option key={p}>{p}</option>)}</select></label><label>Execution status<select value={selected.status} onChange={e=>updateSelected({status:e.target.value as Status})}>{(['Not run','Passed','Failed','Blocked'] as Status[]).map(s=><option key={s}>{s}</option>)}</select></label></div>
      <label className="studio-field">Preconditions<textarea rows={2} value={selected.preconditions} onChange={e=>updateSelected({preconditions:e.target.value})}/></label>
      <div className="studio-steps-heading"><div><h3>Test steps</h3><span>{selected.steps.length} actions</span></div><button className="studio-button quiet small" onClick={addStep}><Plus size={13}/> Add step</button></div>
      <div className="studio-steps">{selected.steps.map((step,i)=><div className="studio-step" key={i}><span>{String(i+1).padStart(2,'0')}</span><input aria-label={'Test step '+(i+1)} value={step} onChange={e=>setStep(i,e.target.value)}/><button aria-label={'Remove step '+(i+1)} onClick={()=>removeStep(i)} disabled={selected.steps.length<=1}><X size={13}/></button></div>)}</div>
      <label className="studio-field">Expected result<textarea rows={3} value={selected.expected} onChange={e=>updateSelected({expected:e.target.value})}/></label>
      <label className="studio-field">Tags <input value={selected.tags.join(', ')} onChange={e=>updateSelected({tags:e.target.value.split(',').map(t=>t.trim()).filter(Boolean)})} placeholder="smoke, regression, API"/></label>
      <div className="studio-editor-foot"><span><Check size={13}/> Changes save automatically</span><button className="studio-button primary" onClick={()=>{setActiveTab('code');setNotice('Automation scaffold updated from the current filtered inventory.');}}><Code2 size={14}/> View automation scaffold</button></div>
     </div>}
     {activeTab==='coverage'&&<div className="studio-coverage"><div className="studio-coverage-intro"><h3>Coverage and risk matrix</h3><p>Area coverage shows whether at least one scenario exists. It is a planning indicator, not proof of complete requirements coverage.</p></div><div className="studio-coverage-grid">{areas.map(area=>{const rows=cases.filter(c=>c.area===area);return <div className={'studio-coverage-cell '+(rows.length?'covered':'uncovered')} key={area}><div><span className="studio-coverage-mark">{rows.length?<Check size={13}/>:<Plus size={13}/>}</span><strong>{area}</strong></div><span>{rows.length?rows.length+' test case'+(rows.length===1?'':'s'):'No cases yet'}</span>{rows.length>0&&<button onClick={()=>{setAreaFilter(area);setActiveTab('details');}}>View cases <ChevronDown size={12}/></button>}{rows.length===0&&<button onClick={()=>{const next=makeCase(area);setCases(prev=>[next,...prev]);setSelectedId(next.id);setActiveTab('details');}}>Add scenario <Plus size={12}/></button>}</div>})}</div><div className="studio-risk-note"><ShieldCheck size={16}/><div><strong>Risk-first suggestion</strong><p>Prioritize P0 authentication, authorization, data integrity, and payment-sandbox scenarios before broad regression coverage.</p></div></div></div>}
     {activeTab==='code'&&<div className="studio-code-view"><div className="studio-code-toolbar"><div><label>Tool<select value={tool} onChange={e=>setTool(e.target.value)}><option>Playwright</option><option>Selenium</option></select></label><label>Language<select value={language} onChange={e=>setLanguage(e.target.value)}><option>TypeScript</option><option>JavaScript</option><option>Python</option></select></label></div><div><button className="studio-button quiet small" onClick={()=>void copy(code,'Automation scaffold')}><Clipboard size={13}/> Copy</button><button className="studio-button primary small" onClick={()=>download('test-plan.'+(language==='Python'?'py':language==='TypeScript'?'ts':'js'),code)}><Download size={13}/> Download</button></div></div><pre className="studio-code"><code>{code}</code></pre><div className="studio-code-note"><ShieldCheck size={14}/><span>Scaffold only: generated comments preserve test intent, but selectors, fixtures, setup, and real assertions must be implemented for your application. This tool does not execute arbitrary generated code.</span></div></div>}
    </>}
   </section>
  </section>
  <footer className="studio-footer"><span>Satyo-mate · Test Design Studio</span><span>Local-first · JSON backup supported · No test data sent to a server</span></footer>
 </main>;
}
