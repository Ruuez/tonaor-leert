// MO-M2 (onderbouwing-motivatie-en-kennis.md 2.2): punten zijn terugkoppeling achteraf, nooit een voorwaarde of een ruilmiddel; wat verdiend is, zakt nooit.
import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
let fout = 0; const ok = (c, m) => { if (!c) { fout++; console.log('FOUT: ' + m); } };
const fn = name => { const i = html.indexOf('function ' + name + '('); return html.slice(i, html.indexOf('\n', i)); };
ok(/S\.points\[today\(\)\]=pts\(\)\+n/.test(fn('addPts')) && !/S\.points\[[^\]]*\]\s*=\s*(0|pts\(\)\s*-)/.test(html), 'punten komen er alleen bij: addPts telt op, nergens wordt een puntentotaal verlaagd of op nul gezet (behalve Alles wissen)');
ok(!/pts\(\)\s*[<>]=?|total\s*[<>]=?\s*\d/.test(html), 'geen inhoud of functie hangt aan een puntenaantal (geen vergelijking met punten)');
const texts = [...html.matchAll(/\n "([a-z0-9.@]+)":("(?:[^"\\]|\\.)*"|\{[^}\n]*\})/g)].map(m => [m[1], m[2]]);
ok(texts.length > 300, 'de vertaaltabel is gevonden (' + texts.length + ' teksten)');
const promise = texts.filter(([k, v]) => /beloning|reward|รางวัล|verdien je|verdienen|krijg je [^"]*punt|earn [^"]*point|win [^"]*point/i.test(v));
ok(!promise.length, 'geen tekst belooft vooraf een beloning of punten: ' + promise.map(x => x[0]).join(', '));
ok(/"explain\.finished":"\+10 punten\. Goed gedaan!"/.test(html), 'een bedankje achteraf mag (na het afronden van een uitleg)');
console.log(fout ? fout + ' FOUT(EN)' : 'test-motivatie: alles OK');
process.exit(fout ? 1 : 0);
