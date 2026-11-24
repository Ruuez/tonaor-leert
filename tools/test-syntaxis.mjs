// De andere tests lezen index.html als tekst; deze controleert of de scripts ook echt te lezen zijn (een syntaxfout geeft een leeg scherm).
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
let fout = 0;
const ok = (c, m) => { if (!c) { fout++; console.log('FOUT: ' + m); } };
const dir = mkdtempSync(join(tmpdir(), 'tl-syntax-'));
try {
  const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g; let m, i = 0;
  while ((m = re.exec(html))) { const f = join(dir, 's' + i + '.mjs'); writeFileSync(f, m[1]); const r = spawnSync(process.execPath, ['--check', f], { encoding: 'utf8' }); ok(r.status === 0, 'script ' + i + ' in index.html is te lezen' + (r.status ? ': ' + (r.stderr || '').split('\n').find(l => /Error/.test(l)) : '')); i++; }
  ok(i >= 1, 'index.html heeft een script');
  for (const f of ['wereld.js', 'scene.js', 'uitleg.js', 'kaart.js', 'route.js', 'pakketcheck.js', 'sw.js']) { const r = spawnSync(process.execPath, ['--check', new URL('../' + f, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')], { encoding: 'utf8' }); ok(r.status === 0, f + ' is te lezen'); }
} finally { rmSync(dir, { recursive: true, force: true }); }
console.log(fout ? fout + ' FOUT(EN)' : 'test-syntaxis: alles OK');
