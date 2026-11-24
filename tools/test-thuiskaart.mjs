// Masterplan stap 5 (docs/ontwerp-stap5-kaart.md): de kaart als thuisscherm, het album, de schakelaar op Ik.
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const W = createRequire(import.meta.url)('../wereld.js');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
let fout = 0;
const ok = (c, m) => { if (!c) { fout++; console.log('FOUT: ' + m); } };
const cut = (a, b) => { const i = html.indexOf(a); return i < 0 ? '' : html.slice(i, html.indexOf(b, i)); };

/* 1. de tekening: vaste bouwstenen, geen tekst uit een pakket, het figuurtje alleen op de huidige plek */
const P = [{ vak: 'nl', state: 'done', dots: [{ vak: 'nl', done: true }, { vak: 'rk', done: true }] }, { vak: 'nl', state: 'cur', dots: [{ vak: 'nl', done: false }] }, { vak: 'nl', state: 'next', dots: [] }, { vak: 'nl', state: 'far', dots: [] }];
const r = W.render(P, 'lilac');
ok(r.svg.startsWith('<svg') && /aria-hidden="true"/.test(r.svg) && !/<text|<script|<foreignObject|href=/.test(r.svg), 'de tekening is decoratie: geen tekst, script of link');
ok(r.pos.length === 4 && r.pos[1].y > r.pos[0].y && r.h > r.pos[3].y, 'het pad loopt van boven naar beneden');
ok((r.svg.match(/id="wfig"/g) || []).length === 1 && /var\(--lilac-deep\)/.test(r.svg), 'één figuurtje, in de gekozen kleur');
ok(!/id="wfig"/.test(W.render([P[0]], 'mint').svg), 'zonder huidige plek geen figuurtje');
ok(/l7 7l13 -14/.test(r.svg), 'een afgemaakte plek heeft een vinkje');
ok(/var\(--apricot-deep\)/.test(r.svg), 'de stip van de rekenscène is geel (apricot)');
ok(W.render(P, 'rood').svg.includes('var(--sky-deep)') && !/red|#f00|#e5/i.test(r.svg), 'onbekende kleur: sky; nergens rood');
ok(W.figAt(1).x === r.pos[1].x && W.figAt(1).y === r.pos[1].y - 52, 'figAt klopt met de plek (voor het lopen)');

/* 2. plekken: open = gedaan of huidig; de volgende dicht; verder een silhouet (D2: niets gaat dicht) */
{ const kp = cut('function kPlaces(', 'function kNotes(');
  const sc = (id, n, subject = 'nl') => ({ id, n, subject, title: { nl: id } });
  const A = [sc('a1', 1), sc('a2', 2), sc('ark', 0, 'rk')], B = [sc('b1', 1), sc('b2', 2)], C = [sc('c1', 1)], D = [sc('d1', 1)];
  const SCENES = [...A.map(s => ({ sc: s, pack: 'pa', order: 10 })), ...B.map(s => ({ sc: s, pack: 'pb', order: 20 })), ...C.map(s => ({ sc: s, pack: 'pc', order: 30 })), ...D.map(s => ({ sc: s, pack: 'pd', order: 40 }))];
  const run = (done, ns) => { const ctx = { SCENES, S: { world: { done } }, PACKS: [{ id: 'pa', title: { nl: 'Plek A' } }], nextScene: () => ns, scP: x => (x && x.nl) || '' }; vm.createContext(ctx); vm.runInContext(kp + ';this.r=kPlaces()', ctx); return ctx.r; };
  let p = run({ a1: 1, a2: 1, ark: 1, b1: 1 }, B[1]);
  ok(p.map(x => x.state).join() === 'done,cur,next,far', 'plekken: af, huidig, volgende dicht, verder silhouet');
  ok(p[0].title === 'Plek A' && p[1].title === 'pb', 'de naam komt uit het pakket');
  ok(p[0].dots.map(d => d.vak).join() === 'nl,nl,rk' && p[0].nd === 3, 'stippen: eerst de scènes Nederlands, dan rekenen');
  p = run({ a1: 1, c1: 1 }, A[1]);
  ok(p[0].state === 'cur' && p[2].state === 'done', 'een plek met een gedane scène blijft open, ook voorbij de huidige (D2)'); }

/* 3. de app: schakelaar, tabbalk, kaart, album */
ok(/const SCHEMA=(1[2-9]|[2-9]d)/.test(html) && /10:s=>\{if\(s\.home!=='kaart'&&s\.home!=='vandaag'\)s\.home='vandaag';if\(!\('fig' in s\)\)s\.fig=null;return s\}/.test(html) && /11:s=>\{if\(!s\.homeSet\)\{s\.home='kaart';s\.homeSet=true\}return s\}/.test(html), 'migratie 10 → 11 → 12: de kaart wordt één keer het thuisscherm (besluit eigenaar), daarna niet meer aangeraakt');
ok(/explainVoice:true,trial:false,home:'kaart',homeSet:true,fig:null,/.test(html) && /S\.home=b\.dataset\.home==='kaart'\?'kaart':'vandaag';S\.homeSet=true;save\(\)/.test(html), 'een nieuwe leerder begint op de kaart; een keuze op Ik blijft gelden');
ok(/function rerender\(\)\{setNav\(\);if\(route\)return route\(\);const k=kaartOn\(\);\(\{vandaag:k\?vKaart:vToday,tuin:k\?vAlbum:vGarden,/.test(html), 'het thuisscherm volgt de schakelaar; de tuin en Vandaag blijven bestaan');
ok(/data-home="vandaag"/.test(html) && /S\.home=b\.dataset\.home==='kaart'\?'kaart':'vandaag';S\.homeSet=true;save\(\);setNav\(\);vMe\(\)/.test(html), 'schakelaar op Ik, terug kan altijd');
ok(/if\(FIGLIST\.includes\(b\.dataset\.fig\)\)S\.fig=b\.dataset\.fig/.test(html), 'alleen een kleur uit het palet');
ok(/function kaartOn\(\)\{return S\.home==='kaart'&&typeof WereldVis!=='undefined'\}/.test(html) && !/WereldVis\.FIGS/.test(html), 'laadt wereld.js niet, dan het oude thuisscherm en een werkend Ik (review stap 5, 1)');
ok(/\$\{steerNote\(\)\}\$\{strandNote\(\)\}/.test(html) && /id="kBack"/.test(html), 'bijsturen ook op de kaart; terug vanuit Meer (review stap 5, 6 en 7)');
const vk = cut('function vKaart(', 'function kSheet(');
ok(/if\(!S\.onboarded\)return vOnboard\(\)/.test(vk), 'kaart: eerst de start, zoals Vandaag');
ok(vk.includes("${weekOn?kWeek()+kRoute():''}") &&/function kRoute\(\)\{if\(!RC\|\|!ROUTE\|\|!S\.onboarded\)return '';/.test(html) && /a=mo\(sn\[0\]\),b=mo\(sn\[2\]\)/.test(html) && /a===b\?t\('map\.exam1',\{m:a\}\):t\('map\.exam',\{a,b\}\)/.test(html) &&/<div id="kWeekFull" hidden>\$\{weekCard\(\)\}<\/div>/.test(html), 'G3: smalle weekring (tik: het hele blok), examenregel met bandbreedte (E5) in één regel in de leertaal eronder');
{ const main = vk.slice(vk.indexOf('${dueFirst?weg:\'\'}'));
  ok(main.indexOf('${dueFirst?weg:\'\'}') < main.indexOf('${weekOn?kWeek()') && main.indexOf('${weekOn?kWeek()') < main.indexOf('id="kGo"') && main.indexOf('id="kGo"') < main.indexOf('${dueFirst?\'\':weg}') && main.indexOf('${dueFirst?\'\':weg}') < main.indexOf('id="kMore"'), 'start: Onderweg boven Verder als er herhaling over tijd is, anders eronder'); }
{ const main = vk.slice(vk.indexOf('${dueFirst?weg:\'\'}')); ok(main.indexOf('id="kMore"') < main.indexOf('${kNotes()}') && main.indexOf('${kNotes()}') < main.indexOf('class="wereld"'), 'G3: Verder, Onderweg, dan Ontdek en Meer, dan de meldingen, en pas dan het pad (positie op 375×667: browsercontrole in STATUS)'); }
ok(/const KFAR=2;/.test(html) && /P=P0\.slice\(0,Math\.min\(P0\.length,vis\+1\+KFAR\)\),rest=P0\.length-P\.length/.test(vk) && /T\('map\.rest',\{n:rest\}\)/.test(vk), 'G3: hooguit twee silhouetten na de dichte plek, dan "nog n plekken"');
ok(/\$\('#kWeg'\)\.onclick=\(\)=>startLesson\(false\)/.test(vk) && /\$\('#kGo'\)\)\$\('#kGo'\)\.onclick=\(\)=>startScene\(ns\)/.test(vk), 'Onderweg is de bestaande les; Verder is nextScene()');
ok(/\$\('#kMore'\)\.onclick=\(\)=>\{route=vToday;rerender\(\)/.test(vk), 'Meer opent het hele scherm Vandaag: niets wordt onbereikbaar');
ok(/<span class="w-name" aria-hidden="true">\$\{esc\(p\.title\)\}<\/span>/.test(vk) && /aria-label="\$\{lbl\(p\)\}"/.test(vk) && /lbl=p=>esc\(/.test(vk), 'namen uit een pakket via esc; elke plek een knop met label');
ok(/FIGWALK&&!allDone&&g&&KPLACE!=null&&ci>=0&&KPLACE!==ci/.test(vk) && /H\.sc_end=q=>\{if\(LES\)return lesEnd\(q\);FIGWALK=S\.home==='kaart';/.test(html) && !/FIGWALK=true/.test(html),'het figuurtje loopt alleen na een gedane scène');
const ks = cut('function kSheet(', 'function vAlbum(');
ok(/esc\(scP\(\(p\.list\[0\]\|\|\{\}\)\.intro\)\)/.test(ks) && /s===first\?/.test(ks), 'dichte plek: één regel; binnen een plek alleen de eerstvolgende scène of nog eens');
ok(/document\.body\.appendChild\(el\)/.test(ks) && !/scrollIntoView/.test(ks) && /id="kClose"/.test(ks) && /e\.key==='Escape'/.test(ks) && /function paint\(html\)\{\{const ks=document\.getElementById\('kSheet'\);if\(ks\)\{ks\.remove\(\);kSheetOff\(\)\}\}/.test(html) && /kSheetOff\(\);el\.hidden=false;el\.setAttribute\('aria-modal','true'\)/.test(ks) && /if\(KSOFF===k\)document\.addEventListener\('pointerdown',k\[1\]\)/.test(ks),'G3: plekblad van onderen met sluitknop (en Escape), zonder scrollen; weg bij een ander scherm');
ok(/\.ksheet\{position:fixed;left:0;right:0;bottom:0;z-index:60;/.test(html), 'het blad ligt boven de tabbalk (z-index 20)');
const va = cut('function vAlbum(', 'function vGarden(');
ok(/const g=stage\(id\);return g===0\?0:g<=2\?1:g===3\?2:3/.test(va), 'album: vier sterktes uit dezelfde stage() als de tuin');
ok(/PILL=\['pill-sky','pill-lilac','pill-apricot','pill-mint'\]/.test(va) && !/red|wrong|pill-rose/.test(va), 'album: kleuren uit het palet, geen rood of kruis');
ok(/\$\('#toGarden'\)\.onclick=\(\)=>\{route=vGarden;rerender\(\)/.test(va), 'album: de tuin blijft bereikbaar');
ok(/esc\(label\)/.test(va), 'album: labels via esc');
ok(/'\.\/wereld\.js'/.test(sw) && /<script src="wereld\.js"><\/script>/.test(html), 'wereld.js geladen en offline beschikbaar');
for (const k of ['tab.map', 'tab.album', 'me.home', 'me.home.tip', 'me.fig', 'map.here', 'map.go', 'map.count', 'map.place', 'map.allDone', 'map.none', 'map.onderweg', 'map.due', 'map.onderwegTip', 'map.more', 'map.moreSub', 'map.play', 'map.again', 'map.done', 'map.later', 'map.closed', 'map.rest', 'map.close', 'map.exam', 'map.exam1', 'album.title', 'album.tip', 'album.garden', 'album.base', 'album.todo', 'album.s0', 'album.s1', 'album.s2', 'album.s3'])
  ok((html.match(new RegExp(' "' + k.replace(/\./g, '\\.') + '":', 'g')) || []).length === 3, k + ' in en, nl en th');

console.log(fout ? fout + ' FOUT(EN)' : 'test-thuiskaart: alles OK');
