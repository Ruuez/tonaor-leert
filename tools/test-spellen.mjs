// Werkorder stap 6, de spellen (docs/ontwerp-spellen.md, akkoord ontwerpsessie).
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const PC = createRequire(import.meta.url)('../pakketcheck.js');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
let fout = 0;
const ok = (c, m) => { if (!c) { fout++; console.log('FOUT: ' + m); } };
const cut = (a, b) => { const i = html.indexOf(a); return i < 0 ? '' : html.slice(i, html.indexOf(b, i)); };
const g = cut('/* ============ stap 6: de spellen', 'function startSpeed(){');
ok(g.length > 1000, 'het spelkader staat in index.html');

/* 1. onderdelen kiezen: eerst bekende scènedoelen, dan wat aan de beurt is, dan ander bekends; onbekend nooit (behalve in de proefstand) */
{ const fns = cut('function gKnown(', 'function gSkill(');
  const run = (items, due, prf) => { const ctx = { S: { items }, PRF: prf, thirsty: id => due.includes(id), shuffle: a => a.slice() }; vm.createContext(ctx); vm.runInContext(fns + ';this.r=gPick', ctx); return ctx.r; };
  const L = ['a', 'b', 'c', 'd', 'e'].map(id => ({ id })), items = { a: { reps: 1 }, b: { reps: 1 }, c: { reps: 0 }, d: { reps: 2 }, e: { reps: 3 } };
  const pick = run(items, ['d'], false)(L, new Set(['b']), 3, x => x.id).map(x => x.id).join();
  ok(pick === 'b,d,a', 'eerst het bekende scènedoel (b), dan wat aan de beurt is (d), dan ander bekends; c (nieuw) nooit: ' + pick);
  ok(run(items, [], true)(L, new Set(), 5, x => x.id).length === 5, 'proefstand: alles mag (telt toch niet mee)'); }

/* 2. regels uit het besluit */
ok(/gameTurns:\{dehet:10,klank:10,klok:8,geld:6,koppel:3\}/.test(html) && /gameMin:5/.test(html) && /gameDefMax:40/.test(html) && /gameHintN:2/.test(html), 'beurten per spel, minimum, omschrijving en de vorm vooraf: één waarde per spel in MOTOR');
ok(!/left--/.test(g) && /T\('game\.turn',\{k:Math\.min\(G\.k\+1,N\),n:N\}\)/.test(g), 'beurten in plaats van aftellen');
ok(/rec=!pr&&G\.miss<=1&&\(!best\|\|secs<best\)/.test(g) && /pr=\(typeof PRF!=='undefined'&&PRF\)\|\|\(typeof LES!=='undefined'&&LES\)/.test(g) && /G\.miss>1\?`<p>\$\{T\('game\.again1'\)\}<\/p>`/.test(g), 'record = snelste tijd met hooguit één misser, niet in de proefstand of een les; anders vriendelijk "nog eens"');
ok(/const credit=id=>\{if\(!id\|\|G\.counted\.has\(id\)\)return;G\.counted\.add\(id\);if\(!\(typeof PRF!=='undefined'&&PRF\)&&!\(typeof LES!=='undefined'&&LES\)&&S\.items\[id\]\)review\(id,true,'spel',null,true\)\}/.test(g), 'alleen de eerste goede beurt per onderdeel telt, als spel, zonder exid (nooit een variant voor bloei); niet in de proefstand of een les');
ok(/G\.lock=true;setTimeout\(\(\)=>\{G\.lock=false\},300\)/.test(g) && /if\(G\.lock\)return;if\(c\.sh%12===c\.h%12/.test(g) && /while\(h===0&&m===0\)/.test(g), 'een tweede tik telt niet voor de nieuwe beurt; de klok begint nooit goed');
ok(/GCUR===G&&G\.tok===tk/.test(g) && /if\(!c\|\|G\.k>=N\|\|GCUR!==G\)\{clearInterval\(G\.iv\)/.test(g), 'oude timers schrijven niet in een nieuw spel of een nieuwe beurt');
ok(/if\(knew\)miss\(\)/.test(g), 'koppelen: een misser alleen als de andere helft al eens open lag');
ok(/gSkill\('setclock'\)\|\|gSkill\('clock'\)/.test(g) && /&&gKnown\(e\.items\[0\]\)\);return e\?e\.items\[0\]:null\}/.test(g), 'zet de klok: eerst de vaardigheid wijzers zetten; klok en geld alleen als de vaardigheid al is aangeboden');
ok(/const miss=\(\)=>\{G\.miss\+\+\}/.test(g) && !/scFault|review\(id,false|review\([^)]*,false/.test(g), 'een misser is geen fout (geen foutprofiel, geen review met fout)');
ok(/const NOGROW=\[[^\]]*'spel'/.test(html), 'spel telt niet voor bloei (C5)');
ok(/const hintFirst=w=>GMISS\.has\(w\.id\)\|\|\(GSEEN\.get\(w\.id\)\|\|0\)<MOTOR\.gameHintN;/.test(g) && /GSEEN\.set\(c\.id,\(GSEEN\.get\(c\.id\)\|\|0\)\+1\)/.test(g), 'de of het: de vorm vooraf de eerste twee keer (per sessie: een spel telt passief), en na een misser weer');
ok(/<span class="artw art-\$\{c\.art\}" aria-hidden="true"><\/span>/.test(g) && /\$\{artFull\(G\.prev\)\}/.test(g), 'de of het: de vorm zonder lidwoord vooraf; na het antwoord het woord met lidwoord en vorm');
ok(/if\(kind==='klank'\)\{if\(QUIET\)return null;/.test(g), 'klankduel valt weg in de stille stand');
ok(/function gDefOk\(w\)\{const d=String\(w\.def\|\|''\);return !!d&&d\.length<=MOTOR\.gameDefMax\}/.test(g) && /say\(x\.x\)/.test(g), 'koppelen: alleen omschrijvingen tot 40 tekens; een omgedraaide kaart wordt voorgelezen (say volgt de stille stand)');
ok(/\$\{esc\(c\.w\)\}/.test(g) && /\?esc\(x\.x\):'\?'/.test(g) && /\$\{esc\(o\)\}/.test(g),'tekst uit pakketten via esc');
ok(/return p\.length>=n\?p:null/.test(g) && /if\(!p\)return next\(\);return gamePlay/.test(html), 'te weinig onderdelen: het spel valt weg en de scène gaat door');
ok(/q\._G=G;q\._P=pool/.test(g) && /G=\(q&&q\._G\)\|\|\{/.test(g), 'de stand blijft bij opnieuw tekenen (taalwissel)');
/* 3. Vandaag, record, opslag */
ok(/\{const k=gBestKind\(\);if\(k\)return startGame\(k\)\}/.test(html) && /id="gameChoose"/.test(html) && /route=vGames/.test(html), 'de tegel start het spel dat het meest oplevert; Of kies zelf toont de vijf');
ok(/S\.speedBest>0\?`<p class="small muted num">\$\{T\('game\.oldRecord',\{n:S\.speedBest\}\)\}/.test(g), 'het oude record (60 seconden) staat erbij, zonder vergelijking');
ok(/12:s=>\{if\(!s\.gameBest\|\|typeof s\.gameBest!=='object'\|\|Array\.isArray\(s\.gameBest\)\)s\.gameBest=\{\};return s\}/.test(html) && /const SCHEMA=13/.test(html), 'opslag: gameBest, alleen toegevoegd (SCHEMA 13)');
/* 4. poort */
{ const pk = kind => ({ format: 1, id: 'x', type: 'hoofdstuk', learn: 'nl', place: 'x', title: { nl: 't', th: 'ท', en: 't' }, items: [{ id: 'x.w', kind: 'word', w: 'tafel', art: 'de', tr: { th: 'โต๊ะ', en: 'table' }, def: 'Een heel lang meubel met vier poten waaraan je met zijn allen eet.', ex: 'De tafel is groot.' }],
    scenes: [{ id: 's', place: 'x', subject: 'nl', n: 1, title: { nl: 't', th: 'ท', en: 't' }, intro: { nl: 'i', th: 'ท', en: 'i' }, can: { nl: 'c', th: 'ท', en: 'c' }, targets: ['x.w'], steps: [{ type: 'game', kind, items: ['x.w'] }, { type: 'end', next: { nl: 'n', th: 'ท', en: 'n' }, real: { nl: 'r', th: 'ท', en: 'r' } }] }] });
  ok(['dehet', 'klank', 'koppel', 'klok', 'geld'].every(k => !PC.checkPack(pk(k), []).errors.some(m => /spel/.test(m))) && PC.checkPack(pk('memory'), []).errors.some(m => /spel memory/.test(m)), 'de poort kent de vijf spellen');
  ok((PC.checkPack(pk('koppel'), []).quality || []).some(m => /langer dan 40 tekens/.test(m)), 'de poort meldt een omschrijving langer dan 40 tekens bij koppelen (geen weigering)'); }
const p = JSON.parse(readFileSync(new URL('../content/proef-g4b.json', import.meta.url), 'utf8'));
ok(['dehet', 'klank', 'koppel', 'klok', 'geld'].every(k => p.scenes.some(s => s.steps.some(st => st.type === 'game' && st.kind === k))), 'een proefscène per spel');
for (const k of ['game.tile', 'game.choose', 'game.chooseTitle', 'game.n.dehet', 'game.n.klank', 'game.n.koppel', 'game.n.klok', 'game.n.geld', 'game.t.dehet', 'game.t.klank', 'game.t.koppel', 'game.t.klok', 'game.t.geld', 'game.turn', 'game.record', 'game.newRecord', 'game.again1', 'game.oldRecord', 'game.none', 'game.clockAsk', 'game.moneyAsk', 'game.sum', 'game.reset', 'game.ready'])
  ok((html.match(new RegExp(' "' + k.replace(/\./g, '\\.') + '":', 'g')) || []).length === 3, k + ' in en, nl en th');
console.log(fout ? fout + ' FOUT(EN)' : 'test-spellen: alles OK');
