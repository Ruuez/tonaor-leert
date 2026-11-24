// De makkelijke start (docs/ontwerp-start.md): drie routes, een meting die zich aanpast, geen 0%, de eerste les direct,
// de beginnersstart van twee weken en de rustige kaart op dag 1. De migratie staat in test-migratie.mjs (15 → 16).
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
let fout = 0;
const ok = (c, m) => { if (!c) { fout++; console.log('FOUT: ' + m); } };
const cut = (a, b) => { const i = html.indexOf(a); return i < 0 ? '' : html.slice(i, html.indexOf(b, i)); };
const ON = cut('function vOnboard(){', 'function starterOn(');
ok(ON.length > 500, 'vOnboard staat in index.html');

/* 1. de drie pagina's: taal, welkom, hoeveel Nederlands */
ok(/data-onl="\$\{k\}"/.test(ON) && /data-onl="nl"/.test(ON), 'eerste scherm: alleen de taalkeuze (steuntalen en Nederlands)');
ok(/onb2\.l1/.test(ON) && /onb2\.l2/.test(ON) && /onb2\.l3/.test(ON) && /nameField\(\)/.test(ON), 'tweede scherm: drie korte zinnen en de naam');
ok(/\['niets','beetje','veel'\]/.test(ON) && /data-lv="\$\{k\}"/.test(ON), 'derde scherm: drie routes');
ok(/if\(k==='nl'\)setThai\('uit'\)/.test(ON), 'Nederlands als taal: geen steuntaal');

/* 2. de routes: Nog niets = direct de eerste les; anders een korte meting */
ok(/S\.starter=lv==='veel'\?null:now\(\)/.test(ON), 'Veel: geen beginnersstart; Nog niets en Een beetje: wel');
ok(/if\(lv==='niets'\)\{show\('vandaag'\);const sc=nextScene\(\);if\(sc\)startScene\(sc\)\}else startPlacement\(\)/.test(ON), 'Nog niets: direct de eerste les, zonder meting; anders eerst de meting');
ok(/S\.onboarded=true;save\(\)/.test(ON), 'na de keuze is de start klaar en bewaard');

/* 3. de meting stopt per onderdeel na twee keer niet weten, en toont geen 0% */
ok(/H\.place=q=>\{\{const r0=PL\[q\.p\.sk\];if\(S\.startLevel!=='veel'&&r0&&r0\.miss>=MOTOR\.placeStop\)return next\(\)\}/.test(html) && /placeStop:2\b/.test(html), 'een onderdeel stopt na twee keer niet weten of fout');
ok(/else r\.miss=\(r\.miss\|\|0\)\+1;next\(\)/.test(html), 'een fout antwoord telt als niet weten');
const PE = cut('H.placeend=q=>', '\nH.');
ok(/lv\[k\]>0\?`<span class="track">/.test(PE) && /T\('place\.here'\)/.test(PE), 'geen 0%-balk: bij 0 staat "Hier begin je"');
ok(/T\('place\.begin'/.test(PE), 'na de meting: "Je begint bij ..."');
ok(/nextScene\(\)/.test(PE), 'na de meting: door naar de eerste les');
ok(!/frame\(`[^`]*\/\*/.test(PE), 'geen opmerking uit de code als zichtbare tekst in het scherm');
ok(/names\.some\(k=>lv\[k\]>0\)\?`<p>\$\{T\('place\.result'\)\}/.test(PE), '"elke balk gaat groeien" alleen als er een balk is');

/* 4. starterOn: twee weken; bij Een beetje alleen voor lage onderdelen */
{ const ctx = { S: {}, MOTOR: { starterDays: 14, starterLow: .34 }, DAY: 864e5, T0: 1e12 };
  ctx.now = () => ctx.T0;
  const end = "lezen'])).some(low)}", i0 = html.indexOf('const STARTAREA='), i1 = html.indexOf(end, i0) + end.length;
  vm.createContext(ctx); vm.runInContext(html.slice(i0, i1) + ';this.f=starterOn', ctx);
  const set = s => { ctx.S = s; };
  set({ starter: null, startLevel: null }); ok(ctx.f('nl') === false && ctx.f('woorden') === false, 'bestaande leerder (starter null): nooit beginnersstart, dus de les blijft gelijk');
  set({ starter: ctx.T0 - 3 * 864e5, startLevel: 'niets' }); ok(ctx.f('nl') === true && ctx.f('woorden') === true && ctx.f('rk') === true, 'Nog niets: beginnersstart overal');
  set({ starter: ctx.T0 - 15 * 864e5, startLevel: 'niets' }); ok(ctx.f('nl') === false, 'na 14 dagen is de beginnersstart voorbij');
  set({ starter: ctx.T0, startLevel: 'veel' }); ok(ctx.f('nl') === false, 'Veel: geen beginnersstart');
  const hi = { woorden: .8, grammatica: .8, luisteren: .8, lezen: .8, rekenen: .8, engels: .8 };
  set({ starter: ctx.T0, startLevel: 'beetje', placement: { lv: { ...hi, woorden: .2 } } });
  ok(ctx.f('woorden') === true && ctx.f('nl') === true && ctx.f('rekenen') === false && ctx.f('rk') === false && ctx.f('grammatica') === false, 'Een beetje: alleen voor onderdelen onder 0,34 (een Nederlandse scène telt woorden mee)');
  set({ starter: ctx.T0, startLevel: 'beetje', placement: { lv: { ...hi, engels: 0 } } });
  ok(ctx.f('nl') === false && ctx.f('rk') === false && ctx.f('engels') === true, 'Een beetje: een lage uitslag voor Engels zet de beginnersstart niet aan in Nederlandse scènes (codereview 2)');
  set({ starter: ctx.T0, startLevel: 'beetje', placement: null }); ok(ctx.f('nl') === true && ctx.f('woorden') === true, 'Een beetje, meting afgebroken: overal beginnersstart, niet half (codereview 3)');
}

/* 5. de beginnersstart in de les */
ok(/\(nw\[0\]&&EN\.includes\(nw\[0\]\)\?'engels':'woorden'\)\)\{nw\.forEach\(w=>q\.push\(\{type:'learn'/.test(html), 'een nieuw woord eerst getoond (learn), daarna herkennen en ophalen');
ok(/st\.role==='instap'&&\(typeof starterOn==='function'\?starterOn:\(\)=>false\)\(sc\.subject\|\|vak\)&&!\(qq\.items\|\|\[\]\)\.some\(id=>S\.items\[id\]&&S\.items\[id\]\.reps>0\)\)return;/.test(html), 'geen instapvraag over iets wat nog nooit gezien is');
ok((html.match(/\(q\.role==='instap'\|\|q\.role==='controle'\)&&!\(typeof starterOn==='function'\?starterOn:\(\)=>false\)\(\(q\.sc&&q\.sc\.subject\)\|\|q\.vak\|\|'nl'\)/g) || []).length >= 2, 'steuntaal overal tijdens de beginnersstart (ook bij instap en controle)');

/* 6. de kaart op dag 1 */
const VK = cut('function vKaart(', '\nfunction ');
ok(/const day1=!!cur&&!!S\.startLevel&&!Object\.keys\(\(S\.world&&S\.world\.done\)\|\|\{\}\)\.length/.test(VK), 'dag 1: nieuwe leerder zonder afgeronde plek, en alleen als er een plek is (anders de gewone kaart met de melding)');
ok(/dueFirst=due>0&&!day1/.test(VK) && /hint=!day1&&!!S\.startLevel&&!S\.kHint/.test(VK), 'dag 1: geen herhaling bovenaan en nog geen uitleg van de kaart; die komt één keer later');
ok(/T\('map\.begin'\)/.test(VK) || /map\.begin/.test(html), 'dag 1: één knop Begin');

/* 7. teksten in drie talen */
for (const k of ['onb2.hi', 'onb2.l1', 'onb2.l2', 'onb2.l3', 'onb2.level', 'onb2.lv.niets', 'onb2.lv.beetje', 'onb2.lv.veel', 'place.begin', 'place.here', 'map.begin', 'map.newHint', 'map.dueFirst'])
  ok((html.match(new RegExp(' "' + k.replace(/\./g, '\\.') + '":', 'g')) || []).length === 3, k + ' in en, nl en th');

ok(VK.includes(`\${String(T('onb.when')).replace(/h1>/g,'h2>')}<div class="chips" role="group" aria-label=`) && VK.includes('data-km="${k}" aria-pressed="false"'), 'Wanneer leer je op de kaart: geen tweede h1, groep met label, knoppen met aria-pressed');
ok(html.includes("if(S.startLevel!=='veel'&&r0&&r0.miss>=MOTOR.placeStop)return next()}"), 'bij Veel de volledige meting');
ok(PE.includes('PL[k].miss>=MOTOR.placeStop?0:'), 'een gestopt onderdeel telt als 0');

/* 8. opslag */
ok(/starter:null,startLevel:null,kHint:0/.test(html), 'nieuwe opslag: starter en startLevel leeg tot de keuze');
console.log(fout ? fout + ' FOUT(EN)' : 'test-start: alles OK');
