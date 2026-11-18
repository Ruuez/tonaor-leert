// MO-M2 (onderbouwing-motivatie-en-kennis.md 2.2): punten zijn terugkoppeling achteraf, nooit een voorwaarde of een ruilmiddel; wat verdiend is, zakt nooit.
// MO-M4 (2.1): gedrag meten (doorgaan na een ronde, dagen, minuten) naast de tikken van de leerder.
import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
let fout = 0; const ok = (c, m) => { if (!c) { fout++; console.log('FOUT: ' + m); } };
const fn = name => { const i = html.indexOf('function ' + name + '('); return html.slice(i, html.indexOf('\n', i)); };

/* MO-M2 */
ok(/S\.points\[today\(\)\]=pts\(\)\+n/.test(fn('addPts')) && !/S\.points\[[^\]]*\]\s*=\s*(0|pts\(\)\s*-)/.test(html), 'punten komen er alleen bij: addPts telt op, nergens wordt een puntentotaal verlaagd of op nul gezet (behalve Alles wissen)');
ok(!/pts\(\)\s*[<>]=?|total\s*[<>]=?\s*\d/.test(html), 'geen inhoud of functie hangt aan een puntenaantal (geen vergelijking met punten)');
const texts = [...html.matchAll(/\n "([a-z0-9.@]+)":("(?:[^"\\]|\\.)*"|\{[^}\n]*\})/g)].map(m => [m[1], m[2]]);
ok(texts.length > 300, 'de vertaaltabel is gevonden (' + texts.length + ' teksten)');
const promise = texts.filter(([k, v]) => /beloning|reward|รางวัล|verdien je|verdienen|krijg je [^"]*punt|earn [^"]*point|win [^"]*point/i.test(v));
ok(!promise.length, 'geen tekst belooft vooraf een beloning of punten: ' + promise.map(x => x[0]).join(', '));
ok(/"explain\.finished":"\+10 punten\. Goed gedaan!"/.test(html), 'een bedankje achteraf mag (na het afronden van een uitleg)');

/* MO-M4 */
ok(fn('bindCont').startsWith("function bindCont(){behNote('shown');const go=f=>()=>{behNote('go');f()};"), 'MO-M4: het doorgaan-scherm telt getoond en doorgegaan');
ok(fn('behNote').startsWith("function behNote(k){if(STORE!=='ok')return;") && fn('behNote').includes('const cut=d-84*DAY'), 'MO-M4: alleen in ok, hooguit 12 weken bewaard');
const bt = html.slice(html.indexOf('function behTable('), html.indexOf('function vEmiel('));
ok(html.includes('${behTable()}') && !/\bhij\b|\bzij\b/.test(bt), 'MO-M4: de tabel staat bij de begeleider, zonder geslacht in de tekst');

console.log(fout ? fout + ' FOUT(EN)' : 'test-motivatie: alles OK');
process.exit(fout ? 1 : 0);
