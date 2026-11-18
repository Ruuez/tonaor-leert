// Dekking per eindterm (ijkmoment G2, paragraaf 3): uit de pakketten per eindterm het aantal scènes, vragen, vragen in examenvorm en toetsvragen.
// Gebruik: node tools/dekking.mjs        → tabel in Markdown (voor docs/STATUS.md)
//          node tools/dekking.mjs --status → zet de tabel in docs/STATUS.md tussen de merktekens <!-- dekking --> en <!-- /dekking -->
// Een eindterm uit docs/eindtermen.md zonder lesstof staat er ook in (met nullen), zodat een gat zichtbaar is.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
const ROOT = new URL('../', import.meta.url);
const packs = readdirSync(new URL('content/', ROOT)).filter(f => f.endsWith('.json') && f !== 'index.json').map(f => JSON.parse(readFileSync(new URL('content/' + f, ROOT), 'utf8')));
const terms = [...new Set((readFileSync(new URL('docs/eindtermen.md', ROOT), 'utf8').match(/\b(?:nt2-I-[a-z]+-\d|rekenen-\d-[a-z]+|kennis-[a-z]+)\b/g) || []))];
const row = () => ({ scenes: 0, q: 0, exam: 0, toets: 0 }), T = {};
for (const t of terms) T[t] = row();
for (const p of packs) {
  for (const sc of p.scenes || []) {
    const goals = (sc.goals && sc.goals.length ? sc.goals : p.goals) || [];
    for (const g of goals) {
      const r = T[g] || (T[g] = row());
      r.scenes++;
      for (const st of sc.steps || []) {
        const qs = (st.q || []).length + (st.turns || []).length + (st.type === 'do' || st.type === 'make' || st.type === 'speak' ? 1 : 0);
        r.q += qs;
        if (st.exam === true) r.exam += qs;
        if (st.type === 'quiz' && st.role === 'controle') r.toets += (st.q || []).length;
      }
    }
  }
}
const lines = ['| Eindterm | Scènes | Vragen | In examenvorm | Toetsvragen |', '|---|---|---|---|---|'];
for (const t of Object.keys(T).sort()) { const r = T[t]; lines.push(`| ${t} | ${r.scenes} | ${r.q} | ${r.exam} | ${r.toets} |`); }
const table = lines.join('\n');
if (process.argv.includes('--status')) {
  const f = new URL('docs/STATUS.md', ROOT); let s = readFileSync(f, 'utf8');
  const block = '<!-- dekking -->\n' + table + '\n\nGeteld door `node tools/dekking.mjs` op ' + new Date().toISOString().slice(0, 10) + '. Toetsvragen = controlevragen aan het eind van een scène; de themaoefentoets volgt in stap 10.\n<!-- /dekking -->';
  s = /<!-- dekking -->[\s\S]*<!-- \/dekking -->/.test(s) ? s.replace(/<!-- dekking -->[\s\S]*<!-- \/dekking -->/, block) : s.replace(/\n## Open punten per stap van de werkorder/, '\n## Dekking per eindterm (G2)\n\n' + block + '\n\n## Open punten per stap van de werkorder');
  writeFileSync(f, s);
  console.log('docs/STATUS.md bijgewerkt');
} else console.log(table);
