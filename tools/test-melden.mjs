// Werkorder stap 8: Vraag het en fout melden (docs/ontwerp-stap8-melden.md, akkoord ontwerpsessie; versturen wacht op het besluit van de eigenaar).
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
let fout = 0;
const ok = (c, m) => { if (!c) { fout++; console.log('FOUT: ' + m); } };
const cut = (a, b) => { const i = html.indexOf(a); return i < 0 ? '' : html.slice(i, html.indexOf(b, i)); };
const A = cut('/* ============ werkorder stap 8:', 'function startSpeed(){');
ok(A.length > 500, 'Vraag het en fout melden staan in index.html');

/* 1. één knop, een blad met drie wegen; niets verdwijnt */
ok(/<button class="u-btn" id="askIt">\$\{TB\('ask\.btn'\)\}<\/button>/.test(html) && /\$\('#askIt'\)\.onclick=askOpen;/.test(html), 'Vraag het staat bovenaan elk oefenscherm (frame), ook in scènes');
ok(/data-uopen="\$\{esc\(x\)\}">\$\{TB\('explain\.open'\)\}/.test(A) && /id="askCoach"/.test(A) && /id="askBug"/.test(A), 'het blad: de uitleg als die er is, Vraag je begeleider, Fout melden');
ok(/S\.help\.unshift\(\{t:now\(\),ctx:askCtx\(q\),open:true\}\);S\.unsent=true;save\(\);syncUp\(true\)/.test(A), 'Vraag je begeleider is de bestaande hulpvraag');
ok(/const helpBtn=ctx=>`<span hidden data-hctx="\$\{esc\(ctx\)\}"><\/span>`;/.test(html) && /const h=app\.querySelector\('\[data-hctx\]'\);if\(h\)return h\.dataset\.hctx/.test(A), 'de omschrijving van de oude hulpknop blijft de context van de vraag');
ok(/vertaling klopt niet: tik op een steunregel/.test(html), 'de tik op een steunregel blijft de snelle weg naar "vertaling klopt niet"');

/* 2. bewaren: geen naam, geen versturen, 2 punten per plek, hooguit 10 per dag */
{ const fn = cut('function askPlace(', 'function askCtx(') + cut('function reportSave(', 'function startSpeed(){');
  const pts = [], sent = []; let ok1 = true; const ctx = { S: { reports: [], reportPts: {}, help: [], profile: { name: 'NAAM' } }, STORE: 'ok', MOTOR: { repNoteMax: 200, repKeep: 100, repPts: 2, repDay: 10 }, PACKS: [], REPKINDS: ['tr', 'ok', 'uitleg', 'typo', 'beeld', 'anders'], tr: k => k, now: () => 1, today: () => 5, supL: () => 'th', addPts: n => pts.push(n), save: () => {}, syncUp: (n, cb) => { sent.push(1); cb && cb(ok1); } };
  vm.createContext(ctx); vm.runInContext(fn + ';this.f=reportSave', ctx);
  const q = n => ({ exid: 'e' + n, items: ['i' + n], type: 'recall' });
  ok(ctx.f(q(1), 'typo', 'x'.repeat(300)) === 2 && ctx.S.reports[0].note.length === 200 && !JSON.stringify(ctx.S.reports).includes('NAAM') && !JSON.stringify(ctx.S.help).includes('NAAM'), 'bewaard op het toestel, zonder naam, toelichting hooguit 200 tekens');
  ok(ctx.S.help.length === 1 && /^Fout melden: /.test(ctx.S.help[0].ctx) && ctx.S.help[0].open === true && sent.length === 1 && ctx.S.reports[0].state === 'sent', 'besluit eigenaar B: de melding gaat als hulpvraag over de koppeling naar de begeleider; gelukt = verstuurd');
  ok1 = false; ctx.f(q(7), 'uitleg', ''); ok(ctx.S.reports[0].state === 'kept', 'lukt versturen niet, dan blijft hij bewaard (en gaat later mee)'); ok1 = true;
  ctx.STORE = 'newer'; const n0 = ctx.S.help.length; ok(ctx.f(q(8), 'typo', '') === null && ctx.S.help.length === n0, 'buiten STORE ok: niets bewaard en niets verstuurd (null: het scherm zegt dat het niet lukte)'); ctx.STORE = 'ok';
  ok(ctx.f(q(1), 'tr', '') === 0, 'dezelfde plek: geen punten meer');
  [2, 3, 4, 5, 6].forEach(n => ctx.f(q(n), 'typo', ''));
  ok(pts.reduce((a, b) => a + b, 0) === 10, 'hooguit 10 meldpunten per dag');
  ctx.PRF = true; ok(ctx.f(q(9), 'typo', '') === 0, 'in de proefstand geen punten'); }
ok(!/fetch|ntfy|TLS/.test(cut('function reportSave(', 'function startSpeed(){')), 'een melding gaat alleen via syncUp (de bestaande versleutelde koppeling), nergens anders heen');
ok(/\$\('#repYes'\)\.onclick=\(\)=>\{repWipe\(\);vMe\(\)\}/.test(html) && /\$\('#repWipe'\)\.onclick=\(\)=>\{\$\('#repAsk'\)\.hidden=false\}/.test(html), 'Mijn meldingen: wissen pas na bevestiging');
ok(/if\(S\.reports\.length>MOTOR\.repKeep\)S\.reports\.length=MOTOR\.repKeep/.test(A), 'hooguit 100 meldingen bewaard');
ok(/14:s=>\{if\(!Array\.isArray\(s\.reports\)\)s\.reports=\[\];/.test(html) && /const SCHEMA=(1[5-9]|[2-9]\d)/.test(html), 'opslag: alleen toegevoegd (SCHEMA 15)');
ok(/\$\{T\('rep\.mine'\)\}<p class="small muted">\$\{T\('rep\.where'\)\}/.test(html) && /“\$\{esc\(x\.note\)\}”/.test(html), 'Mijn meldingen op Ik, met eerlijk waar ze staan; toelichting via esc');
for (const k of ['ask.btn', 'ask.title', 'ask.coach', 'ask.report', 'rep.tip', 'rep.k.tr', 'rep.k.ok', 'rep.k.uitleg', 'rep.k.typo', 'rep.k.beeld', 'rep.k.anders', 'rep.note', 'rep.thanks', 'rep.thanksPts', 'rep.mine', 'rep.where', 'rep.s.kept', 'rep.s.sent', 'rep.wipe', 'rep.wipeAsk', 'rep.fail', 'rep.pick'])
  ok((html.match(new RegExp(' "' + k.replace(/\./g, '\\.') + '":', 'g')) || []).length === 3, k + ' in en, nl en th');
console.log(fout ? fout + ' FOUT(EN)' : 'test-melden: alles OK');
