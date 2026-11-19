// Werkvormen 4.1 (stap 6 van de werkorder): opnemen en terugluisteren in de stap speak.
// MediaRecorder en IndexedDB draaien niet in Node; deze test bewaakt de regels die vastliggen (zie docs/ontwerp-stap6.md).
import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
let fout = 0;
const ok = (c, m) => { if (!c) { fout++; console.log('FOUT: ' + m); } };
const cut = (a, b) => { const i = html.indexOf(a); return i < 0 ? '' : html.slice(i, html.indexOf(b, i)); };

/* 1. alleen op het toestel: eigen bak, niet in de voortgang, met een grens; mee weg bij Alles wissen */
const rec = cut('const RECDB=', 'function recWipe(');
ok(/const RECDB='leren-opnamen'/.test(html), 'eigen IndexedDB-bak met een neutrale naam');
ok(!/S\.rec\b|S\.recordings/.test(html), 'opnamen staan nooit in de voortgang (S)');
ok(/ks\.slice\(0,Math\.max\(0,ks\.length-MOTOR\.recKeep\)\)\.forEach\(k=>st\.delete\(k\)\)/.test(rec) && /recKeep:30/.test(html), 'hooguit de laatste 30 opnamen');
ok(/if\(!blob\|\|STORE!=='ok'\)return/.test(rec), 'alleen bewaren als de opslag in orde is');
ok(!/fetch\([^)]*blob|ntfy|TLS[^;]*blob/.test(rec), 'een opname gaat nergens heen');
ok(/\$\('#yes'\)\.onclick=\(\)=>\{backupNow\(\);NOBAK=null;recWipe\(\);/.test(html), 'Alles wissen wist ook de opnamen');

/* 1b. besluit eigenaar 19 november 2026: bewaren voor de tijdcapsule, met een eigen wisknop op Ik (met bevestiging) */
ok(/async function recCount\(\)/.test(html) && /<div id="recRow" class="stack-sm" hidden><\/div>/.test(html), 'Ik toont hoeveel opnamen er zijn');
ok(/\$\('#recYes'\)\.onclick=\(\)=>\{recWipe\(\)/.test(html) && /\$\('#recDel'\)\.onclick=\(\)=>\{\$\('#recAsk'\)\.hidden=false\}/.test(html), 'eigen wisknop, pas na bevestiging');
/* 2. achter Proefonderdelen, en zonder opnemen blijft de stap zoals hij was */
ok(/function recOk\(\)\{return !!\(S\.trial&&/.test(html), 'opnemen alleen met Proefonderdelen aan');
const sp = cut('H.sc_speak=q=>{', '/* spel (stap game)');
ok(/showEnd=!can\|\|/.test(sp) && /showModel=!ex\|\|!can\|\|/.test(sp), 'zonder opnemen: voorbeeld en checklist meteen, zoals voorheen');
ok(/\.catch\(\(\)=>\{stopTick\(\);can=false;/.test(sp), 'geen toestemming of geen microfoon: geen fout, verder zonder opnemen');

/* 3. de app keurt niet (masterplan 16): de leerder kiest, telt als productieve vorm spreken */
ok(/practiced\(q,true,'spreken'\)/.test(sp) && /practiced\(q,'retry','spreken'\)/.test(sp), 'klonk goed = goed, nog niet = retry, vorm spreken');
ok(!/practiced\(q,false/.test(sp), 'nooit een fout voor spreken');

/* 4. examenvorm (scenes.md): tijden uit de speler, zichtbaar, stopt zelf, geen steuntaal, voorbeeld pas na de opname */
ok(/speakLen:\{short:20,medium:30,long:120\}/.test(html), 'examentijden 20, 30 en 120 seconden');
ok(/max=ex\?\(MOTOR\.speakLen\[st\.len\]\|\|MOTOR\.speakLen\.medium\):MOTOR\.recMax/.test(sp), 'de tijd komt uit de speler, niet uit het pakket');
ok(/r\.timer=setTimeout\(\(\)=>\{try\{if\(mr\.state!=='inactive'\)mr\.stop\(\)\}catch\(e\)\{\}\},maxSec\*1000\)/.test(html), 'de opname stopt zelf als de tijd om is');
ok(/const ask=ex\?`<p class="prompt" lang="nl">\$\{esc\(scP\(st\.ask\)\)\}<\/p>`/.test(sp), 'examenvorm: opdracht zonder steuntaal, via esc');
ok(/showModel=!ex\|\|!can\|\|!!blob/.test(sp), 'examenvorm: het voorbeeld pas na de opname');

/* 5. opruimen: een ander scherm stopt de opname en de microfoon */
ok(/function show\(t\)\{audioStop\(\);recAbort\(\);/.test(html), 'show stopt een lopende opname');
ok(/getTracks\(\)\.forEach\(x=>x\.stop\(\)\)/.test(cut('function recAbort(', 'function recStop(')), 'recAbort zet de microfoon uit');
ok(/const id=setInterval\(\(\)=>\{if\(!here\(\)\|\|mode!=='rec'\)\{clearInterval\(id\);if\(!here\(\)\)recAbort\(\);return\}/.test(sp), 'weg van de stap tijdens het opnemen: stoppen; elke teller wist zichzelf');
ok(/const go=\(\)=>\{if\(mode==='start'\|\|mode==='rec'\)return;mode='start';/.test(sp) && /onclick=\(\)=>\{if\(mode!=='idle'&&mode!=='prep'\)return;/.test(sp), 'dubbel tikken start geen tweede opname (codereview B1)');
ok(/catch\(e\)\{try\{stream\.getTracks\(\)\.forEach\(x=>x\.stop\(\)\)\}catch\(_\)\{\}throw e\}/.test(html), 'start de recorder niet, dan gaat de microfoon dicht');
ok(/finally\{try\{if\(db\)db\.close\(\)\}catch\(e\)\{\}\}/.test(html), 'de bak gaat altijd dicht, zodat wissen niet blokkeert');

/* 5b. de inspreekhulp (docs/ontwerp-inspreekhulp.md; besluit eigenaar 19 november 2026: alleen op het toestel) */
const vox = cut('function voxKey(', 'function say(');
ok(/const VOXDB='leren-stemmen',VOXSTEM='mens';let VOX=new Map\(\);[^\n]*\n(?:[^\n]*\n){0,3}const routeP=loadRoute\(\);await loadPacks\(\);/.test(html), 'eigen bak, gedeclareerd vóór het laden (loadVox draait meteen)');
ok(!/fetch|ntfy|TLS|S\.vox/.test(vox), 'een ingesproken zin gaat nergens heen en staat niet in de voortgang');
ok(/!VOX\.has\(h\)&&VOX\.size>=MOTOR\.voxKeep\)return 'vol'/.test(vox) && /voxKeep:1000/.test(html), 'hooguit 1000 ingesproken zinnen; daarna niets stil weggooien');
ok(!/voxWipe\(\)/.test(cut("$('#yes').onclick=", '\n')), 'Alles wissen laat de ingesproken zinnen staan (eigen wisknop)');
ok(/\$\('#voxYes'\)\.onclick=async\(\)=>\{const ok=await voxWipe\(\)/.test(html) && /\$\('#voxWipe'\)\.onclick=\(\)=>\{\$\('#voxAsk'\)\.hidden=false\}/.test(html), 'wissen pas na bevestiging');
ok(/\$\{recOk\(\)\?`<button class="btn btn-ghost" id="voxOpen">/.test(html), 'de knop staat alleen op Ik als opnemen kan (Proefonderdelen)');
ok(/\$\{esc\(it\.t\)\}/.test(html), 'de zin uit het pakket gaat door esc');

/* 6. teksten in drie talen */
for (const k of ['page.vox', 'vox.open', 'vox.openTip', 'vox.intro', 'vox.rec', 'vox.stop', 'vox.play', 'vox.save', 'vox.del', 'vox.prev', 'vox.next', 'vox.has', 'vox.count', 'vox.saved', 'vox.fail', 'vox.full', 'vox.noMic', 'vox.none', 'vox.where', 'vox.wipe', 'vox.wipeAsk', 'vox.wiped', 'vox.g.pairs', 'vox.g.dictee', 'vox.g.chapter'])
  ok((html.match(new RegExp(' "' + k.replace(/\./g, '\\.') + '":', 'g')) || []).length === 3, k + ' in en, nl en th');
for (const k of ['rec.go', 'rec.prep', 'rec.left', 'rec.stop', 'rec.me', 'rec.again', 'rec.ok', 'rec.notYet', 'rec.examTip', 'rec.noMic', 'rec.empty', 'rec.busy', 'rec.startNow', 'rec.prepGo', 'rec.kept', 'rec.wipe', 'rec.wipeAsk', 'rec.wipeYes', 'rec.wipeNo', 'rec.wiped'])
  ok((html.match(new RegExp(' "' + k.replace('.', '\\.') + '":', 'g')) || []).length === 3, k + ' in en, nl en th');

console.log(fout ? fout + ' FOUT(EN)' : 'test-opnemen: alles OK');
