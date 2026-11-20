/* De kaart als thuisscherm (docs/ontwerp-stap5-kaart.md, masterplan stap 5): het landschap met het pad, de plekken en het figuurtje.
   Alleen vaste bouwstenen: een pakket brengt geen tekening of script mee. De plekken zelf zijn knoppen in index.html (vKaart),
   die over deze tekening liggen; de tekening is decoratie (aria-hidden). Kleur per vak: nl mint, rk apricot (geel), en sky, kn lilac. */
(function (root) {
  'use strict';
  var W = 340, ROW = 150, TOP = 90;
  var VAK = { nl: 'mint', rk: 'apricot', en: 'sky', kn: 'lilac' };
  var FIGS = ['mint', 'apricot', 'sky', 'lilac'];
  function col(v) { return VAK[v] || 'mint'; }
  /* een slingerend pad van boven naar beneden: plek i op hoogte TOP + i*ROW */
  function layout(n) { var out = []; for (var i = 0; i < n; i++) out.push({ x: Math.round(W / 2 + Math.sin(i * 1.25) * W * 0.27), y: TOP + i * ROW }); return out; }
  function height(n) { return n ? TOP + (n - 1) * ROW + 110 : 200; }
  function curve(a, b) { var my = (a.y + b.y) / 2; return 'C' + a.x + ' ' + my + ' ' + b.x + ' ' + my + ' ' + b.x + ' ' + b.y; }
  /* places: [{ vak, state: 'done' | 'cur' | 'open' | 'next' | 'far', dots: [{ vak, done }] }]; fig: een kleur uit FIGS */
  function render(places, fig) {
    places = places || []; var P = layout(places.length), H = height(places.length), s = [];
    s.push('<svg class="wereld-svg" viewBox="0 0 ' + W + ' ' + H + '" width="100%" aria-hidden="true" focusable="false">');
    /* heuvels in de achtergrond, steeds dezelfde (geen toeval: dezelfde kaart bij elk openen) */
    for (var k = 0; k * 260 < H; k++) {
      var y = 60 + k * 260, left = k % 2 === 0;
      s.push('<ellipse cx="' + (left ? 40 : 300) + '" cy="' + y + '" rx="150" ry="70" fill="var(--' + (k % 3 === 2 ? 'sky' : 'mint') + ')" opacity=".55"/>');
    }
    /* het pad: gelopen deel doorgetrokken, de rest gestippeld */
    var cur = -1; places.forEach(function (p, i) { if (p.state === 'cur') cur = i; });
    for (var i = 1; i < P.length; i++) {
      var walked = i <= cur || (places[i].state === 'done' || places[i].state === 'open');
      s.push('<path d="M' + P[i - 1].x + ' ' + P[i - 1].y + curve(P[i - 1], P[i]) + '" fill="none" stroke="var(--wood)" stroke-width="' + (walked ? 6 : 4) + '" stroke-linecap="round"' + (walked ? ' opacity=".7"' : ' stroke-dasharray="2 10" opacity=".45"') + '/>');
    }
    places.forEach(function (p, i) {
      var c = col(p.vak), q = P[i], big = p.state === 'cur', r = big ? 40 : 30;
      if (p.state === 'far') { s.push('<circle cx="' + q.x + '" cy="' + q.y + '" r="24" fill="var(--line)" opacity=".5"/>'); return; }
      s.push('<circle cx="' + q.x + '" cy="' + q.y + '" r="' + r + '" fill="var(--' + c + ')" stroke="var(--' + c + '-' + (p.state === 'next' ? 'fill' : 'deep') + ')" stroke-width="' + (big ? 5 : 3) + '"' + (p.state === 'next' ? ' stroke-dasharray="6 6"' : '') + '/>');
      if (p.state === 'done') s.push('<path d="M' + (q.x - 10) + ' ' + q.y + 'l7 7l13 -14" fill="none" stroke="var(--' + c + '-ink)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>');
      if (p.state === 'next') s.push('<path d="M' + (q.x - 7) + ' ' + (q.y + 1) + 'h14v10h-14z M' + (q.x - 4) + ' ' + (q.y + 1) + 'v-4a4 4 0 0 1 8 0v4" fill="none" stroke="var(--' + c + '-ink)" stroke-width="2" stroke-linejoin="round"/>');
      /* stippen: per scène één, gekleurd als gedaan */
      var d = p.dots || [], gap = 13, x0 = q.x - (d.length - 1) * gap / 2, dy = q.y + r + 14;
      d.forEach(function (o, j) { var cc = col(o.vak); s.push('<circle cx="' + (x0 + j * gap) + '" cy="' + dy + '" r="5" fill="' + (o.done ? 'var(--' + cc + '-deep)' : 'var(--surface)') + '" stroke="var(--' + cc + '-deep)" stroke-width="1.5"/>'); });
    });
    /* het figuurtje: neutraal, een rondje met ogen, op de huidige plek (index.html verplaatst het na een gedane scène) */
    if (cur >= 0) {
      var f = FIGS.indexOf(fig) >= 0 ? fig : 'sky', q2 = P[cur];
      s.push('<g id="wfig" style="transform:translate(' + q2.x + 'px,' + (q2.y - 52) + 'px);transition:transform 1.2s ease-in-out">' +
        '<ellipse cx="0" cy="22" rx="12" ry="3" fill="var(--ink)" opacity=".12"/>' +
        '<circle cx="0" cy="0" r="16" fill="var(--' + f + '-deep)" stroke="var(--surface)" stroke-width="3"/>' +
        '<circle cx="-5" cy="-2" r="2.2" fill="var(--ink)"/><circle cx="5" cy="-2" r="2.2" fill="var(--ink)"/>' +
        '<path d="M-4 5q4 3 8 0" fill="none" stroke="var(--ink)" stroke-width="1.6" stroke-linecap="round"/></g>');
    }
    s.push('</svg>');
    return { svg: s.join(''), pos: P, w: W, h: H };
  }
  /* waar het figuurtje staat bij plek i (voor het lopen) */
  function figAt(i) { var q = layout(i + 1)[i]; return q ? { x: q.x, y: q.y - 52 } : null; }
  var api = { render: render, layout: layout, height: height, figAt: figAt, VAK: VAK, FIGS: FIGS, W: W };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.WereldVis = api;
})(typeof window !== 'undefined' ? window : globalThis);
