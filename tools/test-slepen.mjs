// Stap 6 groep 2 (docs/ontwerp-stap6-groep2.md): iets op zijn plek slepen, en sorteren in bakken.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const PC = createRequire(import.meta.url)('../pakketcheck.js');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
let fout = 0;
const ok = (c, m) => { if (!c) { fout++; console.log('FOUT: ' + m); } };
const cut = (a, b) => { const i = html.indexOf(a); return i < 0 ? '' : html.slice(i, html.indexOf(b, i)); };
const art = { things: [{ hot: true, label: 'kast', item: 'k' }, { hot: true, label: 'tafel', item: 't' }, { hot: true, label: 'medicijn', item: 'm' }, { hot: true, label: 'brood', item: 'b' }, { kind: 'plant' }] };
const errs = (st, a = art) => { const e = []; PC.dragCheck(st, a, 'v', m => e.push(m)); return e; };

/* 1. de poort */
ok(errs({ items: ['m'], pairs: [{ thing: 2, to: 0 }] }).length === 0, 'slepen: één ding naar een plek');
ok(errs({ items: ['m'], pairs: [{ thing: 2, to: 1 }, { thing: 3, to: 1 }] }).length === 0, 'sorteren: twee dingen in dezelfde bak mag (besluit ontwerpsessie)');
ok(errs({ items: ['m'], pairs: [{ thing: 2, to: 0 }, { thing: 2, to: 1 }] }).some(m => /hetzelfde ding twee keer/.test(m)), 'een ding maar één keer');
ok(errs({ items: ['m'], pairs: [] }).length && errs({ items: ['m'], pairs: [{ thing: 2, to: 0 }, { thing: 3, to: 0 }, { thing: 1, to: 0 }, { thing: 0, to: 1 }] }).length, 'één tot drie paren');
ok(errs({ items: ['m'], pairs: [{ thing: 2, to: 4 }] }).some(m => /aantikbare plek/.test(m)), 'de plek is aantikbaar');
ok(errs({ items: ['m'], pairs: [{ thing: 4, to: 0 }] }).some(m => /aantikbaar ding met item/.test(m)), 'het ding is aantikbaar en heeft een item');
ok(errs({ items: ['b'], pairs: [{ thing: 2, to: 0 }] }).some(m => /items\[0\]/.test(m)), 'items[0] is het item van het eerste ding');
ok(errs({ items: ['m'], pairs: [{ thing: 2, to: 3 }, { thing: 3, to: 0 }] }).some(m => /kan geen plek zijn/.test(m)), 'een ding dat versleept wordt, is geen plek');
ok(PC.dragDrop({ pairs: [{ thing: 2, to: 0 }] }, 2, 0) === true && PC.dragDrop({ pairs: [{ thing: 2, to: 0 }] }, 2, 1) === false && PC.dragDrop({ pairs: [{ thing: 2, to: 0 }] }, 3, 0) === false, 'nakijken van één neerzetten');

/* 2. de app */
const d = cut('H.sc_drag=q=>{', 'H.sc_point=q=>{');
ok(/else if\(st\.form==='drag'\)q\.push\(\{\.\.\.base,type:'sc_drag'/.test(html), 'een stap do met form drag wordt het sleepscherm');
ok(/const marks=movers\.map\(i=>D\.done\[i\]==='auto'\?false:D\.miss\[i\]\?'retry':true\),res=D\.res=PC\.stepsRes\(marks\)/.test(d) && /practiced\(q,res,'slepen'\);fbEnd\(\)/.test(d) && /if\(D\.fin\)return fbEnd\(\);/.test(d) && /svg\.style\.touchAction='none'/.test(d) && /slepen:'S'/.test(html), 'alles in één keer true, een misser retry, door de app neergezet false; vorm slepen');
ok(/if\(D\.miss\[i\]>=2\)\{const p=st\.pairs\.find\(x=>x\.thing===i\);if\(p\)land\(i,p\.to,true\)/.test(d), 'twee missers bij hetzelfde ding: de app zet het neer (nooit vast)');
ok(/if\(D\.miss\[i\]===1\)later\(\(\)=>scFault\(q,'betekenis'\)\)/.test(d), 'een misser telt één keer als betekenis, bij Volgende');
ok(/const tap=i=>/.test(d) && /e\.onkeydown=ev=>\{if\(ev\.key==='Enter'\|\|ev\.key===' '\)/.test(d) && /e\.onclick=\(\)=>\{if\(Date\.now\(\)-\(e\.__pd\|\|0\)<700\)return;tap\(i\)\}/.test(d), 'tik en tik werkt ook met toetsenbord en VoiceOver (een klik zonder slepen)');
ok(/say\(scP\(\(th\[to\]\|\|\{\}\)\.label\)\)/.test(d) && !/speechSynthesis/.test(d), 'het label wordt voorgelezen via say (volgt de stille stand)');
ok(/esc\(plainX\(\(th\[to\]\|\|\{\}\)\.label,l\)\)/.test(d) && /scT\(st\.ask\)/.test(d), 'tekst uit het pakket via esc of scT');
ok(/\.s-drag\{touch-action:none;[^}]*-webkit-touch-callout:none\}/.test(html), 'slepen scrolt de pagina niet en geeft geen vergrootglas op iOS');
for (const k of ['drag.tip', 'drag.chosen', 'drag.wrong']) ok((html.match(new RegExp(' "' + k.replace('.', '\\.') + '":', 'g')) || []).length === 3, k + ' in en, nl en th');

/* 3. de proefscènes (G4 groep 2): alleen met Proefonderdelen, nooit op de kaart of in de route */
const p = JSON.parse(readFileSync(new URL('../content/proef-g4b.json', import.meta.url), 'utf8'));
ok(p.type === 'proef' && PC.checkPack(p, []).errors.length === 0, 'het proefpakket haalt de poort');
const st = p.scenes.flatMap(s => s.steps), drags = st.filter(x => x.form === 'drag'), steps = st.flatMap(x => x.q || []).filter(q => q.form === 'steps');
ok(drags.some(x => x.pairs.length === 1) && drags.some(x => new Set(x.pairs.map(y => y.to)).size < x.pairs.length), 'een proef voor slepen én voor sorteren');
ok([0, 1, 2].every(l => steps.some(q => q.proefLevel === l)), 'een vraag rekenen in stappen op elk afbouwniveau');
ok(/if\(p\.type==='proef'&&!trialRaw\)return;/.test(html) && /SCENES=PACKS\.filter\(p=>p\.type!=='les'&&p\.type!=='proef'\)/.test(html) && /\$\{S\.trial\?`<p class="small muted">\$\{T\('proef\.scenes'\)\}/.test(html), 'proef: alleen met Proefonderdelen geladen, alleen te starten op Ik');
ok(/movers\.forEach\(m=>\{const x=G\(m\);if\(x\)x\.setAttribute\('aria-pressed',String\(m===i\)\)\}\)/.test(d) && /e\.setAttribute\('aria-pressed','false'\)/.test(d), 'tik en tik: het gekozen ding aria-pressed true, de rest false (G4 groep 2)');
console.log(fout ? fout + ' FOUT(EN)' : 'test-slepen: alles OK');
