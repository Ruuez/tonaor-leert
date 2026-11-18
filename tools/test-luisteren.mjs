// Werkvormen 3.1 (stap 6 van de werkorder): de luistertekst met afbouw, snelheid en examenvorm (zie docs/ontwerp-stap6.md).
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const PC = createRequire(import.meta.url)('../pakketcheck.js');
let fout = 0;
const ok = (c, m) => { if (!c) { fout++; console.log('FOUT: ' + m); } };
const cut = (a, b) => { const i = html.indexOf(a); return i < 0 ? '' : html.slice(i, html.indexOf(b, i)); };

const lis = cut('function lisStage(', '/* Opnemen en terugluisteren');
/* 1. eerst de vraag: het fragment speelt niet meer vanzelf, in beide schermen */
ok(!/setTimeout\(\(\)=>say\((q\.)?st\.say\),300\)/.test(html), 'een luistertekst speelt niet meer vanzelf');
ok(/if\(st\.type==='listen'\)lisBind\(q\)/.test(html) && /if\(q\.ctx==='listen'\)lisBind\(q\)/.test(html), 'beide luisterschermen gebruiken lisBind');
/* 2. afbouw: meelezen in de eerste scènes, daarna luisteren; zwaarder = luisteren; examen = examen */
ok(/if\(q\.st&&q\.st\.exam\)return 'exam';if\(q\.hard\)return 'luister';/.test(lis) && /return n<MOTOR\.listenFade\?'mee':'luister'/.test(lis), 'afbouw meelezen, luisteren, examen');
ok(/listenFade:3, listenRead:25/.test(html), 'meelezen 3 scènes, leestijd 25 seconden (scenes.md)');
/* 3. examenvorm: geen knoppen, één keer, na de leestijd, tekst pas na het antwoord */
ok(/if\(g==='exam'\)return `<div class="note sky" id="lis">/.test(lis) && !/if\(g==='exam'\)return `[^`]*data-rate/.test(lis), 'examenvorm zonder afspeel- en snelheidsknoppen');
ok(/else\{clearInterval\(tk\);ready\(\)\}/.test(lis) && /b\.onclick=\(\)=>\{q\._lisPlayed=true;b\.remove\(\);lock\(false\);lisPlay\(st\.say,1,null\)\}/.test(lis), 'examenvorm: na de leestijd een knop, één keer afspelen (iOS speelt alleen na een tik)');
ok(/if\(q\._lisPlayed\)return;lock\(true\)/.test(lis) && /if\(q\._lisTk\)clearInterval\(q\._lisTk\)/.test(lis), 'examenvorm: niet antwoorden voor het luisteren; een taalwissel start geen tweede teller');
ok(/function lisPlay\(t,rate,onIdx,from,only\)\{if\(QUIET\)return false;/.test(lis), 'stille stand: geen geluid');
ok(/if\(\$\('#nx'\)\)\{o\.disconnect\(\);reveal\(\)\}/.test(lis), 'de tekst komt pas na het antwoord (luisteren en examen)');
/* 4. veilig tonen: elke zin via esc */
ok(/<span class="lsent" data-i="\$\{i\}">\$\{esc\(x\)\}<\/span>/.test(lis), 'zinnen via esc');
/* 5. zinnen: dezelfde opdeling als de geluidsbestanden, zodat elke zin een eigen bestand heeft */
ok(/PC\.audioParts\(t\)/.test(lis) && /hs\.every\(x=>AUD\.has\(x\.h\)\)/.test(lis), 'per zin het geluidsbestand; ontbreekt er een, dan de stem van het toestel');
for (const f of ['nl-thuis.json', 'nl-buren.json']) {
  let p; try { p = JSON.parse(readFileSync(new URL('../content/' + f, import.meta.url), 'utf8')); } catch (e) { continue; }
  const texts = []; (p.scenes || []).forEach(sc => (sc.steps || []).forEach(st => { if (st.type === 'listen' && st.say) texts.push(st.say); }));
  const all = PC.audioTexts(p).map(PC.audioKey);
  for (const t of texts) for (const x of PC.audioParts(t)) ok(all.includes(PC.audioKey(x)), f + ': zin heeft een geluidsbestand: ' + x.slice(0, 40));
}
/* 6. teksten in drie talen */
for (const k of ['lis.play', 'lis.again', 'lis.speed', 'lis.slow', 'lis.normal', 'lis.fast', 'lis.read', 'lis.once'])
  ok((html.match(new RegExp(' "' + k.replace('.', '\\.') + '":', 'g')) || []).length === 3, k + ' in en, nl en th');

console.log(fout ? fout + ' FOUT(EN)' : 'test-luisteren: alles OK');
