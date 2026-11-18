// Werkvormen 1.1-1.3 (stap 6 van de werkorder): de getallenlijn, de strook en de verhoudingstabel als vraag in een scène.
// Het nakijken staat in pakketcheck.js (dezelfde code in de app); hier: goed, retry, fout, een antwoord dat ook goed is, en de poort.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const PC = createRequire(import.meta.url)('../pakketcheck.js');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
let fout = 0;
const ok = (c, m) => { if (!c) { fout++; console.log('FOUT: ' + m); } };

/* 1. getallenlijn: standaard 5% van de lijn, retry binnen tweemaal */
const nl = { form: 'numline', from: 0, to: 1, target: 0.75, show: '3/4' };
ok(PC.numTol(nl) === 0.05, 'standaard tol is 5% van de lijn');
ok(PC.numGrade(nl, 0.75) === true && PC.numGrade(nl, 0.8) === true && PC.numGrade(nl, 0.7) === true, 'binnen tol: goed (ook op de rand)');
ok(PC.numGrade(nl, 0.83) === 'retry' && PC.numGrade(nl, 0.66) === 'retry', 'binnen tweemaal tol: retry');
ok(PC.numGrade(nl, 0.5) === false && PC.numGrade(nl, null) === false, 'verder weg of niets: fout');
ok(PC.numGrade({ ...nl, from: 0, to: 200, target: 120, tol: 4 }, 123) === true && PC.numGrade({ ...nl, from: 0, to: 200, target: 120, tol: 4 }, 127) === 'retry', 'eigen tol in de eenheid van de lijn');

/* 2. strook */
const st = { form: 'strip', total: 80, unit: '€', parts: 4, answer: 20 };
ok(PC.stripValue(st, 1) === 20 && PC.stripValue(st, 3) === 60 && PC.stripValue({ total: 10, parts: 3 }, 1) === 3.333333, 'waarde van gekleurde delen');

/* 3. verhoudingstabel */
const rt = { form: 'ratio', rows: [['kg', 1, 3, '?'], ['€', 2.5, '?', 20]], answers: [8, 7.5] };
ok(JSON.stringify(PC.ratioFull(rt)) === JSON.stringify([['kg', 1, 3, 8], ['€', 2.5, 7.5, 20]]), 'de vraagtekens rij voor rij uit answers');
ok(JSON.stringify(PC.ratioOps({ form: 'ratio', rows: [['kg', 1, 2, 10, 5], ['€', 3, 6, 30, 15]], answers: [] })) === JSON.stringify(['×2', '×5', ':2']), 'bewerkingen ×2, ×5, :2');
ok(PC.ratioOps(rt)[1] === '', 'geen hele factor: geen bewerking bij de pijl');

/* 4. de poort */
const sc = qq => ({ id: 't', learn: 'nl', type: 'hoofdstuk', title: 'T', items: [{ id: 'w', kind: 'word', w: 'woord', tr: { th: 'x', en: 'x' } }], scenes: [{ id: 's', title: 'S', targets: ['w'], steps: [{ type: 'quiz', q: [{ items: ['w'], ask: 'Vraag', why: 'Uitleg', ...qq }] }] }] });
const errs = qq => { try { return (PC.checkPack(sc(qq)).errors || []).filter(e => /numline|strip|ratio|getallenlijn|target|show|total|parts|answer|rows|answers|evenredig|help|tol|lege vakken/.test(e)); } catch (e) { return ['crash ' + e.message]; } };
ok(errs(nl).length === 0, 'geldige getallenlijn: geen melding ' + errs(nl).join('; '));
ok(errs({ ...nl, target: 2 }).length > 0, 'target buiten de lijn: melding');
ok(errs({ ...nl, show: '' }).length > 0, 'show ontbreekt: melding');
ok(errs(st).length === 0, 'geldige strook: geen melding ' + errs(st).join('; '));
ok(errs({ ...st, answer: 25 }).length > 0, 'answer geen deel van de strook: melding');
ok(errs(rt).length === 0, 'geldige tabel: geen melding ' + errs(rt).join('; '));
ok(errs({ ...rt, answers: [8, 9] }).length > 0, 'niet evenredig: melding');
ok(errs({ ...rt, answers: [8] }).length > 0, 'te weinig antwoorden: melding');

{ const bad = st0 => { const p = sc({}); p.scenes[0].steps = [st0]; return (PC.checkPack(p).errors || []).some(e => /rekenmodel/.test(e)); };
  ok(bad({ type: 'read', text: 'Een tekst.', q: [{ items: ['w'], ask: 'Vraag', why: 'Uitleg', ...nl }] }), 'een rekenmodel bij een leestekst: melding (codereview M1)');
  ok(bad({ type: 'extra', err: 'getal', explain: 'Uitleg', q: [{ items: ['w'], ask: 'Vraag', why: 'Uitleg', ...nl }, { items: ['w'], ask: 'Vraag', why: 'Uitleg', ...st }] }), 'een rekenmodel in extra: melding (codereview M1)'); }
ok(/if\(q\.role==='controle'&&SCN\)\{if\(res===false\)later/.test(html) && /if\(q\.role==='instap'&&res===true\)scKnow\(q\)/.test(html), 'controle en instap zoals sc_q (codereview M2)');
/* 5. de app */
ok(/if\(PC&&PC\.NUMF&&PC\.NUMF\.includes\(qq\.form\)\)return \{\.\.\.base,type:'sc_num'/.test(html), 'een vraag met een rekenmodel wordt sc_num');
ok(/getallenlijn:'e',strook:'f',tabel:'h'/.test(html), 'eigen vormcode in de geschiedenis');
ok(/const r=PC\.numGrade\(qq,v\)/.test(html) && /PC\.stripValue\(qq,on\.size\)/.test(html) && /PC\.ratioOps\(qq\)/.test(html), 'de app kijkt na met dezelfde functies');
ok(/if\(res===false\)later\(\(\)=>scFault\(q,e\)\)/.test(html), 'een fout telt in het foutprofiel, pas bij Volgende');
for (const k of ['num.done', 'num.line', 'num.off', 'strip.tap']) ok((html.match(new RegExp(' "' + k.replace('.', '\\.') + '":', 'g')) || []).length === 3, k + ' in en, nl en th');

console.log(fout ? fout + ' FOUT(EN)' : 'test-rekenmodellen: alles OK');
