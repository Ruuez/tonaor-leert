// Werkvormen 1.4 (stap 6 groep 2, docs/ontwerp-stap6-groep2.md): rekenen in stappen.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const PC = createRequire(import.meta.url)('../pakketcheck.js');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
let fout = 0;
const ok = (c, m) => { if (!c) { fout++; console.log('FOUT: ' + m); } };
const cut = (a, b) => { const i = html.indexOf(a); return i < 0 ? '' : html.slice(i, html.indexOf(b, i)); };
const T = s => ({ nl: s, th: 'ทดสอบ', en: s });
const o = (t, r, err) => ({ t, r, ...(err ? { err } : {}) });
const good = () => ({ ask: T('Een kaartje kost € 3,50. Je koopt er vier.'), q: [
  { step: 'vraag', ask: T('Wat moet je uitrekenen?'), opts: [o('Wat vier kaartjes kosten', 'ok'), o('Wat één kaartje kost', 'no', 'lezen')] },
  { step: 'model', ask: T('Hoe?'), opts: [{ ...o('Keer', 'ok'), model: 'keer' }, { ...o('Plus', 'no', 'model'), model: 'plus' }] },
  { step: 'rekenen', ask: T('Uitkomst?'), answer: 14 },
  { step: 'klopt', ask: T('Kan dat kloppen?'), opts: [o('Ja', 'ok'), o('Nee', 'no', 'rekenstap')] }] });
const errs = qq => { const e = []; PC.stepsCheck(qq, 'x', m => e.push(m), () => {}); return e; };

/* 1. de poort: 2 tot 4 deelvragen, altijd rekenen en als laatste klopt, vaste volgorde */
ok(errs(good()).length === 0, 'een goede vraag: geen melding');
ok(errs({ ...good(), q: good().q.filter(d => d.step !== 'klopt') }).some(m => /laatste deelvraag is klopt/.test(m)), 'zonder klopt als laatste: geweigerd (besluit ontwerpsessie)');
ok(errs({ ...good(), q: good().q.filter(d => d.step !== 'rekenen') }).some(m => /rekenen ontbreekt/.test(m)), 'zonder rekenen: geweigerd');
ok(errs({ ...good(), q: [...good().q.slice(0, 3), { step: 'gegevens', ask: T('?'), opts: [o('a', 'ok'), o('b', 'no', 'lezen')] }, good().q[3]] }).some(m => /twee tot vier/.test(m)), 'vijf deelvragen: geweigerd');
ok(errs({ ...good(), q: [good().q[2], good().q[0], good().q[3]] }).some(m => /vaste volgorde/.test(m)), 'de stappen in de vaste volgorde');
ok(errs({ ...good(), q: [good().q[0], { ...good().q[2], answer: 'veertien' }, good().q[3]] }).some(m => /answer \(een getal\)/.test(m)), 'rekenen heeft een getal');
ok(errs({ ...good(), q: [{ ...good().q[0], opts: [o('a', 'ok'), o('b', 'ok')] }, good().q[2], good().q[3]] }).some(m => /precies één keuze/.test(m)), 'precies één keuze is ok');
ok(errs({ ...good(), q: [{ ...good().q[1], opts: [{ ...o('a', 'ok'), model: 'cirkel' }, o('b', 'no', 'model')] }, good().q[2], good().q[3]] }).some(m => /model moet strook/.test(m)), 'het plaatje bij model komt uit een vaste lijst');
{ const p = (type, lv) => ({ format: 1, id: 'p', type, learn: 'nl', place: 'x', title: T('t'), items: [{ id: 'p.r', kind: 'rule', title: T('regel') }], scenes: [{ id: 's', place: 'x', subject: 'rk', n: 1, title: T('t'), intro: T('i'), can: T('c'), targets: ['p.r'],
    steps: [{ type: 'quiz', role: 'ophalen', q: [{ form: 'steps', items: ['p.r'], ...good(), why: T('w'), ...(lv != null ? { proefLevel: lv } : {}) }] }, { type: 'do', form: 'drag', items: ['p.r'], pairs: [] }, { type: 'end', next: T('n'), real: T('r') }] }] });
  const e1 = PC.checkPack(p('proef', 1), []).errors, e2 = PC.checkPack(p('hoofdstuk', 1), []).errors;
  ok(!e1.some(m => /proefLevel/.test(m)) && e2.some(m => /proefLevel .* alleen in een proefpakket/.test(m)), 'proefLevel alleen in een proefpakket'); }

/* 2. afbouw: grenzen 2 en 5, één niveau terug na een fout; klopt blijft altijd */
ok(PC.stepsLevel(0, false) === 0 && PC.stepsLevel(1, false) === 0 && PC.stepsLevel(2, false) === 1 && PC.stepsLevel(4, false) === 1 && PC.stepsLevel(5, false) === 2, 'afbouw: 0-1 alles, 2-4 zonder vraag en gegevens, vanaf 5 alleen rekenen en klopt');
ok(PC.stepsLevel(5, true) === 1 && PC.stepsLevel(2, true) === 0 && PC.stepsLevel(0, true) === 0, 'ging de vorige keer fout: één niveau meer stappen');
ok(PC.stepsPlan(good(), 0).length === 4 && PC.stepsPlan(good(), 1).map(d => d.step).join() === 'model,rekenen,klopt' && PC.stepsPlan(good(), 2).map(d => d.step).join() === 'rekenen,klopt', 'het plan per niveau; klopt blijft');
ok(/stepsFade:\[2,5\]/.test(html) && /h=histParse\(S\.items\[id\]\|\|\{\}\)\.filter\(x=>x\[1\]==='stappen'\),last=h\[h\.length-1\];return PC\.stepsLevel\(h\.filter\(x=>x\[2\]>0\)\.length,!!last&&last\[2\]===0,MOTOR\.stepsFade\)/.test(html), 'de afbouw uit de bewaarde pogingen: alleen geslaagde pogingen in de vorm stappen (geen nieuw veld)');
ok(/const SCF=\{steps:'stappen',/.test(html) && /if\(!\(inst&&res===false\)\)practiced\(q,res,'stappen'\)/.test(html), 'instap: goed telt als vorm stappen; fout bij een nieuw onderdeel telt niet (zoals sc_num)');
ok(['practiced(q,res,form)', 'score(ok,n,part)', 'scFault(q,err)'].every(f => html.includes('function ' + f + "{if(typeof LES!=='undefined'&&LES)return;if(typeof PRF!=='undefined'&&PRF)return;")), 'proefstand: geen herhaling, punten of foutprofiel');
ok(/FIGWALK=S\.home==='kaart';if\(PRF\)\{FIGWALK=false;paint\(/.test(html) && /H\.conf=q=>\{if\(typeof PRF!=='undefined'&&PRF\)return next\(\);/.test(html) && /LES=null;STEER=null;PRF=false;/.test(html) && /if\(typeof PRF!=='undefined'&&PRF\)return false;return/.test(html), 'proefstand: geen ronde, geen zekerheidsscherm, geen voortgang op de kaart, geen leertijd; uit bij een ander scherm');
ok(/const items=k=>PACKS\.filter\(p=>p\.type!=='proef'\)/.test(html) && /PACKS\.filter\(p=>p\.type!=='proef'\)\.flatMap\(p=>p\.items\|\|\[\]\)\.filter\(x=>x\.kind==='rule'/.test(html) && /if\(sc\)\{PRF=true;startScene\(sc\)\}/.test(html), 'woorden en regels uit een proefpakket komen niet in de lijsten of de opslag; een proefscène start altijd in de proefstand');

/* 3. nakijken: soort fout per stap, uitkomst voor het herhaalmodel */
ok(PC.stepsErr({ step: 'vraag' }) === 'lezen' && PC.stepsErr({ step: 'gegevens' }) === 'lezen' && PC.stepsErr({ step: 'model' }) === 'model' && PC.stepsErr({ step: 'rekenen' }) === 'rekenstap' && PC.stepsErr({ step: 'klopt' }) === 'rekenstap', 'soort fout per stap (R-M4)');
ok(PC.stepsErr({ step: 'klopt' }, { err: 'getal' }) === 'getal', 'een eigen err bij de keuze gaat voor');
ok(PC.stepsRes([true, true]) === true && PC.stepsRes([true, 'retry']) === 'retry' && PC.stepsRes(['retry', false]) === false, 'alles goed true; een tweede poging retry; een getoond antwoord false');
const sc = cut('H.sc_steps=q=>{', 'H.sc_drag=q=>{');
ok(/practiced\(q,res,'stappen'\)/.test(sc) && /stappen:'y'/.test(html), 'telt één keer, met vorm stappen');
ok(/if\(!st\.tries\)\{st\.tries=1;/.test(sc) && /good\(false,right\)/.test(sc), 'per deelvraag een tweede kans, daarna het antwoord en door (nooit vast)');
ok(/if\(!st\.f\[st\.k\]\)\{st\.f\[st\.k\]=1;const e=PC\.stepsErr\(d,opt\);later\(\(\)=>scFault\(q,e\)\)\}/.test(sc), 'het foutprofiel: één keer per deelvraag, bij Volgende');
ok(/\[d\.answer,\.\.\.\(d\.accept\|\|\[\]\)\]\.some\(a=>Math\.abs\(v-a\)<NUMEPS\)/.test(sc) && /scNum\(raw\)/.test(sc), 'het getal via scNum, met accept (mijn antwoord is ook goed)');
ok(/\$\{esc\(x\.t\)\}/.test(sc) && /\$\{esc\(st\.ans\[i\]\)\}/.test(sc) && /tx1\(qq\.ask\)/.test(sc), 'keuzes en antwoorden via esc; teksten via scT/scN');
ok(/MODELIC\[x\.model\]/.test(sc), 'bij model een klein plaatje van strook, tabel, lijn of de bewerking');
/* 4. korte ronde: hooguit één per ronde; als oefening in een pakket */
ok(/function oneSteps\(q\)\{let n=0;return q\.filter\(x=>!\(x&&x\.type==='sc_steps'&&n\+\+>0\)\)\}/.test(html) && /noSameForm\(oneSteps\(q\),learn\)/.test(html), 'korte ronde: hooguit één vraag rekenen in stappen');
ok(/case 'steps':return \{type:'sc_steps',step,qq:\{form:'steps'/.test(html) && PC.FORMS.includes('steps'), 'een oefening steps in een pakket komt in de korte ronde');
for (const k of ['steps.of', 'steps.answer', 'steps.shown']) ok((html.match(new RegExp(' "' + k.replace('.', '\\.') + '":', 'g')) || []).length === 3, k + ' in en, nl en th');
/* 5. G4 groep 2: verwachte foute getallen, de G2-maat over de keuzes, de melding in de poort */
{ const withW = w => ({ ...good(), q: good().q.map(d => d.step === 'rekenen' ? { ...d, wrong: w } : d) });
  ok(errs(withW([{ v: 3.5, err: 'lezen', why: T('Dat is één kaartje.') }])).length === 0, 'wrong: een verwacht fout getal met err en why mag');
  ok(errs(withW([{ v: 14, err: 'lezen', why: T('x') }])).some(m => /niet gelijk zijn aan answer/.test(m)), 'wrong gelijk aan answer: geweigerd');
  ok(errs(withW([{ v: 1, err: 'lezen', why: T('x') }, { v: 2, err: 'lezen', why: T('x') }, { v: 3, err: 'lezen', why: T('x') }])).some(m => /hooguit twee/.test(m)), 'hooguit twee foute getallen');
  ok(errs(withW([{ v: 1, err: 'onzin', why: T('x') }])).some(m => /err ontbreekt of staat niet in de lijst/.test(m)) && errs(withW([{ v: 1, err: 'lezen' }])).some(m => /why ontbreekt/.test(m)), 'wrong heeft een err uit de lijst en een why');
  ok(/const wr=\(d\.wrong\|\|\[\]\)\.find\(x=>Math\.abs\(v-x\.v\)<NUMEPS\);bad\(wr\?\{err:wr\.err\}:null,numFmt\(d\.answer,eur\),wr&&wr\.why\?tx1\(wr\.why\)/.test(sc0()), 'de app toont de uitleg bij dat getal en telt die soort fout');
  const long = { t: 'een heel lang goed antwoord dat langer is dan de rest', r: 'ok' }, sh = { t: 'kort', r: 'no', err: 'lezen' };
  const pk = { id: 'x', type: 'hoofdstuk', scenes: [{ id: 'r', subject: 'rk', steps: [{ type: 'quiz', q: Array(10).fill(0).map(() => ({ form: 'steps', q: [{ step: 'vraag', opts: [long, sh] }, { step: 'rekenen', answer: 1 }, { step: 'klopt', opts: [long, sh] }] })) }] }] };
  ok(PC.checkG2(pk).issues.some(m => /is het goede antwoord het langste/.test(m)), 'G2-maat: ook de keuzes in rekenen in stappen tellen mee');
  ok(PC.checkG4(pk).issues.every(m => !/geen vraag rekenen in stappen/.test(m)) && PC.checkG4({ ...pk, scenes: [{ id: 'r', subject: 'rk', steps: [] }] }).issues.some(m => /geen vraag rekenen in stappen/.test(m)), 'de poort meldt een rekenscène zonder stappenvraag'); }
function sc0() { return cut('H.sc_steps=q=>{', 'H.sc_drag=q=>{'); }
console.log(fout ? fout + ' FOUT(EN)' : 'test-stappen: alles OK');
