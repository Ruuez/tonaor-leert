// Werkorder stap 7: de leerlijn per vak (docs/ontwerp-stap7-leerlijnen.md, akkoord ontwerpsessie).
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const PC = createRequire(import.meta.url)('../pakketcheck.js');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
let fout = 0;
const ok = (c, m) => { if (!c) { fout++; console.log('FOUT: ' + m); } };
const cut = (a, b) => { const i = html.indexOf(a); return i < 0 ? '' : html.slice(i, html.indexOf(b, i)); };
const L = cut('/* ============ werkorder stap 7: de leerlijn', 'function startSpeed(){');
ok(L.length > 500, 'de leerlijn staat in index.html');

/* 1. indeling: via goals op het item of via de goals van een rekenscène; eerste treffer telt; zonder goals onder Overig */
{ const fns = cut('const LIJN_RK=', 'const LIJN_EN_SK=') + cut('function lijnGoals(', 'function lijnEn(');
  const PACKS = [{ id: 'rk', items: [{ id: 'r-geld', kind: 'skill', goals: ['rekenen-2-steun-geld'] }, { id: 'r-10', kind: 'skill', goals: ['rekenen-2-procenten'] }, { id: 'r-x', kind: 'skill' }, { id: 'r-pc', kind: 'skill', goals: ['rekenen-2-procenten', 'rekenen-2-steun'] }] },
    { id: 'h', type: 'hoofdstuk', items: [{ id: 'w1', kind: 'word' }, { id: 'k1', kind: 'skill' }], scenes: [{ subject: 'rk', goals: ['rekenen-2-grootheden'], targets: ['w1', 'k1'] }] }];
  const ctx = { PACKS, KIND: { 'r-geld': 'skill', 'r-10': 'skill', 'r-x': 'skill', w1: 'word', k1: 'skill', 'r-pc': 'skill' }, S: { items: { 'r-geld': {}, 'r-10': {}, 'r-x': {}, w1: {}, k1: {}, 'r-pc': {} } }, REK: [{ id: 'r-geld', label: 'geld' }, { id: 'r-10', label: '10%' }, { id: 'r-x', label: 'x' }, { id: 'r-pc', label: 'pc' }], NL: [{ id: 'w1', w: 'uur', art: 'het' }], artFull: w => w.art + ' ' + w.w };
  vm.createContext(ctx); vm.runInContext(fns + ';this.r=lijnRk()', ctx); const r = ctx.r;
  ok(r.dom.geldtijd.map(x => x.id).join() === 'r-geld', 'geld en tijd: een steun-code met geld of tijd');
  ok(r.dom.verhoudingen.map(x => x.id).join() === 'r-10,r-pc', 'verhoudingen en procenten samen; een item met ook steun hoort bij het specifieke domein (review)');
  ok(r.dom.meten.map(x => x.id).join() === 'k1', 'een rekenvaardigheid uit een rekenscène telt bij het domein van die scène; een gewoon woord niet');
  ok(r.rest.map(x => x.id).join() === 'r-x', 'een vaardigheid zonder goals: onder Overig'); }

/* 2. regels uit het besluit */
ok(/n:'lijn\.rk\.geldtijd'/.test(L) && /n:'lijn\.rk\.getallen'/.test(L) && /n:'lijn\.rk\.meten'/.test(L) && /n:'lijn\.rk\.verhoudingen'/.test(L) && /n:'lijn\.rk\.informatie'/.test(L) && /n:'lijn\.rk\.ruimte'/.test(L), 'rekenen: zes onderwerpen met namen voor de leerder; de code achter de schermen');
ok(/none\.length\?`<p class="small muted">\$\{T\('lijn\.later'/.test(L) && !/opacity:\.4|grijs/.test(cut('if(vak===\'rk\')', 'const th=lijnEn()')), 'komt nog: één kleine regel, geen grijze blokken');
ok(/lijnMax:8/.test(html) && /\.slice\(0,MOTOR\.lijnMax\)/.test(L) && /const known=ids\.filter\(id=>lijnCan\(id,learn\)\)/.test(L) && /function lijnCan\(id,learn\)\{return !!\(S\.items\[id\]&&S\.items\[id\]\.reps>0\)/.test(L),'Oefen: hooguit acht, alleen bekende onderdelen (niets nieuws), eerst wat aan de beurt is');
ok(/H\.lijn_end=q=>\{finishTime\(\);/.test(L) && !/S\.rounds/.test(L), 'Oefen telt niet als ronde van de dag');
ok(/\$\('#lijnLes'\)\.onclick=startEnglish/.test(L) && /LIJN_EN_SK=\[\['lezen'/.test(L), 'Engels: bovenaan de Engelse les; thema\'s met merktekens voor lezen, luisteren, spreken en schrijven');
ok(/\$\{esc\(x\.l\)\}/.test(L) && /\$\{esc\(x\.title\)\}/.test(L), 'tekst uit pakketten via esc');
ok(/id="kRk"/.test(html) && /id="kEn"/.test(html) && /class="tiles2 ktiles"/.test(html) && /id="lijnRk"/.test(html) && /id="lijnEn"/.test(html), 'tegels op de kaart (2x2) en onder Meer');
{ const p = { format: 1, id: 'x', learn: 'nl', title: { nl: 't', th: 'ท', en: 't' }, items: [{ id: 'x.r', kind: 'skill', title: { nl: 'r', th: 'ร', en: 'r' }, goals: ['onzin'] }] };
  ok((PC.checkPack(p, []).quality || []).some(m => /goals is een lijst codes/.test(m)) && !PC.checkPack(p, []).errors.some(m => /goals/.test(m)), 'de poort meldt verkeerde goals, zonder te weigeren'); }
for (const k of ['lijn.title.rk', 'lijn.title.en', 'lijn.sub', 'lijn.rk.geldtijd', 'lijn.rk.getallen', 'lijn.rk.meten', 'lijn.rk.verhoudingen', 'lijn.rk.informatie', 'lijn.rk.ruimte', 'lijn.en.lezen', 'lijn.en.luisteren', 'lijn.en.spreken', 'lijn.en.schrijven', 'lijn.oefen', 'lijn.enLes', 'lijn.rest', 'lijn.later', 'lijn.none', 'lijn.done'])
  ok((html.match(new RegExp(' "' + k.replace(/\./g, '\\.') + '":', 'g')) || []).length === 3, k + ' in en, nl en th');
console.log(fout ? fout + ' FOUT(EN)' : 'test-leerlijn: alles OK');
