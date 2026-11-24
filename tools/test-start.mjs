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
{ const SQ = cut('function sceneQ(', '\nfunction ');
  ok(SQ.includes("never=id=>!(S.items[id]&&S.items[id].reps>0)&&!(S.introduced||[]).includes(id)") && SQ.includes("if(!stOn||!id||!never(id)||shown.has(id))return null"), 'beginnersstart: "nooit aangeboden" = geen herhaling en niet getoond; elk onderdeel één keer tonen per scène');
  ok(SQ.includes("return w?{...base,type:'learn',w,items:[id],_new:1,_starter:1}:{...base,type:'sc_rule',st:rs,items:[id],_starter:1}"), 'tonen: een woord of vaste zin als woordkaart (lidwoord, geluid, vertaling), een regel met de uitlegkaart van de scène');
  ok(SQ.includes("if(st.role==='instap'||st.role==='ophalen'){const sh=show((qq.items||[])[0],{...base,step:qph[st.role]||3});if(sh){q.push(sh);return}"), 'een instap- of ophaalvraag over iets nooit aangeboden wordt vervangen door het tonen (niet overgeslagen)');
  ok(SQ.includes("else if(st.type==='make'){push(show((st.items||[])[0],base));"), 'een maakstap: wat nooit is aangeboden eerst tonen'); }
ok(html.includes(`\${idkOn(q)&&qq.guess!==true?\`<button class="linkish muted" id="idk">\${T('probe.dunno')}</button>\`:''}`) && html.includes("function idkOn(q){return (typeof starterOn==='function'?starterOn:()=>false)((q.sc&&q.sc.subject)||q.vak||'nl')}"), 'open invoer in een scène: Weet ik niet voor een starter');
ok(/\$\('#idk'\)\.onclick=\(\)=>\{if\(done\)return;done=true;[\s\S]{0,500}T\('scene\.answer'\)/.test(html), 'Weet ik niet: het antwoord tonen en door');
ok(/\$\('#idk'\)\.onclick=\(\)=>\{\$\('#ans'\)\.disabled=true;[^\n]*T\('scene\.model'\)/.test(html), 'maakstap: Weet ik niet toont het voorbeeld');
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

/* 7b. na de eerste week (antwoord ontwerpsessie op de start) */
ok(VK.includes("pOffer=wk1&&S.startLevel==='niets'&&!S.placement&&!S.placeOffer"), 'na een week: één keer het aanbod van de meting, alleen bij Nog niets');
ok(VK.includes("gAsk=wk1&&!pOffer&&!S.weekGoalSet&&!S.goalAsk&&!(typeof S.placeOffer==='number'&&S.placeOffer>1&&now()-S.placeOffer<DAY)"), 'daarna één keer de vraag naar het weekdoel, niet als het al gekozen is');
ok(VK.includes("typeof S.startT==='number'&&now()-S.startT>=MOTOR.askDays*DAY") && /askDays:7\b/.test(html), 'pas na zeven dagen; nooit voor bestaande leerders (startT null)');
ok(VK.includes("$('#pOfferNo').onclick=()=>{S.placeOffer=now();save();vKaart()}") && VK.includes("S.weekGoalSet=true;S.goalAsk=1;save()") && VK.includes("$('#gAskNo').onclick=()=>{S.goalAsk=1;save();vKaart()}"), 'weg te tikken; zonder keuze blijft het standaard weekdoel');
ok(html.includes("if($('#rPlace'))$('#rPlace').onclick=startPlacement;") && html.includes("!S.placement&&S.startLevel!=='niets'?"), 'de meting later via Route; bij Nog niets niet als taak op de kaart');
ok(VK.includes('kcur"><b>${scT(cur.raw)}</b>'), 'dag 1: de titel van de plek met steuntaal (via scT, veilig)');
ok(!/"map\.onderwegTip":"[^"]*\d/.test(html), 'Onderweg zonder minuten');
ok(ON.includes('S.startT=now()'), 'het moment van de start wordt bewaard');

ok(PE.includes("names.every(k=>!(lv[k]>0))?`<p class=\"prompt\">${T('place.beginAll')}</p>`"), 'alles bij het begin: één zin, geen zes gelijke regels');

ok(html.includes("else if(st.type==='rule'){if(!shown.has(st.items[0]))q.push({...base,type:'sc_rule'"), 'een regel die al getoond is, komt niet nog eens als regelkaart (codereview 1)');
ok(html.includes("const stOn=!(typeof LES!=='undefined'&&LES)&&"), 'in een losse les geen beginnersstart: een les schrijft niets in de voortgang (codereview 3)');
ok(/\{const cl=\$\('#claim'\);if\(cl\)cl\.remove\(\)\}later\(\(\)=>\{if\(q\.role==='controle'&&SCN\)SCN\.ctrl=false;score\(false,10\);/.test(html), 'Weet ik niet telt als gestelde vraag en haalt de bezwaarknop weg (codereview 2)');

{ const SCQ = cut('H.sc_q=q=>', '\nH.'), d = SCQ.indexOf('const gs=');
  ok(d > 0 && !/\bgs\b/.test(SCQ.slice(0, d)), 'sc_q: gs wordt niet gebruikt vóór de declaratie (anders crasht een typvraag voor een starter)'); }

/* 7c. de les en de kaart voor een starter (speelronde ontwerpsessie op v2-102) */
{ const SE = cut('function starterEasy(', '\nfunction ');
  ok(html.includes('let out=starterEasy(breakTriples(mixAppr(noSameForm(oneSteps(q),learn))),learn);'), 'de les gaat voor een starter door starterEasy');
  ok(SE.includes('if(it&&(it.forms||[]).length)continue;') && SE.includes('if(x.w&&EASIER[x.type])x.type=EASIER[x.type]') && SE.includes('TIER[QFORM[x.type]]>1'), 'tonen, kiezen, typen: wat nog nooit goed ging, komt als kiesvorm; typen pas na één keer goed');
  ok(SE.includes("if(typeof LES!=='undefined'&&LES)return q;"), 'een losse les blijft zoals hij is'); }
ok(html.includes('H[q.type](q);starterIdk(q)}') && cut('function starterIdk(', '\nfunction ').includes("x.value='qqq';k.click()"), 'in de les voor een starter bij elk typscherm Weet ik niet (het scherm toont zelf het antwoord)');
ok(VK.includes("tilesOn=!stE||Object.keys((S.world&&S.world.done)||{}).length>=3||today()>new Date(S.startT).setHours(0,0,0,0),weekOn=!stE||wk1") && VK.includes("${weekOn?kWeek()+kRoute():''}") && VK.includes('${tilesOn?`<div class="tiles2 ktiles">'), 'kaart voor een starter: tegels vanaf dag 2 of na drie scènes, weekring en examenregel na de eerste week');
ok(VK.includes("stE=!!S.starter&&typeof S.startT==='number'"), 'alleen voor starters; bestaande leerders houden alles');

{ const SI = cut('function starterIdk(', '\nfunction ');
  ok(SI.includes("{const cl=$('#claim');if(cl)cl.remove()}") && SI.includes("if(a.inputMode==='decimal'||a.type==='number'||a.classList.contains('num'))return;") && SI.includes("if(!$('#nx')){const fb=$('#fb');if(fb){fb.insertAdjacentHTML('beforeend',nextBtn());"), 'Weet ik niet: geen claimknop erna, niet op getalschermen, en altijd een Verder (codereview)'); }
/* 8. opslag */
ok(/starter:null,startLevel:null,kHint:0/.test(html), 'nieuwe opslag: starter en startLevel leeg tot de keuze');
console.log(fout ? fout + ' FOUT(EN)' : 'test-start: alles OK');
