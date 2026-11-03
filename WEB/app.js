(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const COL = { blue: '#4da2ff', mint: '#55db9c', lav: '#e9ccff', sun: '#ffd731', ember: '#fb4903', violet: '#5c4ade' };

  /* ---------- stickers ---------- */
  const O = 'stroke="#000" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';
  const star = (n, a, b) => Array.from({ length: n * 2 }, (_, i) => { const t = Math.PI * i / n - Math.PI / 2, r = i % 2 ? b : a; return (50 + r * Math.cos(t)).toFixed(1) + ',' + (50 + r * Math.sin(t)).toFixed(1); }).join(' ');
  const STK = {
    puzzle: c => `<svg viewBox="0 0 100 100"><path d="M20 30h20a10 10 0 1 1 20 0h20v20a10 10 0 1 0 0 20v20H60a10 10 0 1 1-20 0H20V70a10 10 0 1 0 0-20z" fill="${c}" ${O}/></svg>`,
    cursor: c => `<svg viewBox="0 0 100 100"><path d="M28 10v70l17-15 11 26 14-6-11-25h24z" fill="${c}" ${O}/></svg>`,
    star: c => `<svg viewBox="0 0 100 100"><polygon points="${star(10, 47, 35)}" fill="${c}" ${O}/><circle cx="50" cy="50" r="11" fill="#fff" ${O}/></svg>`,
    window: c => `<svg viewBox="0 0 100 100"><rect x="6" y="16" width="88" height="68" rx="13" fill="${c}" ${O}/><path d="M6 37h88" stroke="#000" stroke-width="3"/><circle cx="21" cy="27" r="3.6" fill="#fff" stroke="#000" stroke-width="1.6"/><circle cx="32" cy="27" r="3.6" fill="#fff" stroke="#000" stroke-width="1.6"/><path d="M34 62q16 14 32 0" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/></svg>`,
    check: c => `<svg viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" rx="22" fill="${c}" ${O}/><path d="M29 52l15 15 28-31" fill="none" stroke="#000" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    sparkle: c => `<svg viewBox="0 0 100 100"><path d="M50 6Q55 45 94 50Q55 55 50 94Q45 55 6 50Q45 45 50 6z" fill="${c}" ${O}/></svg>`,
    heart: c => `<svg viewBox="0 0 100 100"><path d="M50 88C12 62 8 36 27 23c11-7 21-2 23 9 2-11 12-16 23-9 19 13 15 39-23 65z" fill="${c}" ${O}/></svg>`,
    bolt: c => `<svg viewBox="0 0 100 100"><path d="M58 6L20 56h24l-7 38 43-54H55z" fill="${c}" ${O}/></svg>`,
    smile: c => `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="${c}" ${O}/><circle cx="36" cy="42" r="5" fill="#000"/><circle cx="64" cy="42" r="5" fill="#000"/><path d="M30 60q20 22 40 0" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round"/></svg>`
  };
  const hero = $('#heroStickers');
  [['puzzle', 'lav', 5, 14, 170, -14, 7, 60, ''], ['cursor', 'sun', 84, 12, 130, 14, 6, 80, ''], ['star', 'ember', 13, 62, 140, 8, 8, 45, ''],
   ['window', 'violet', 80, 56, 190, -8, 7, 70, ''], ['check', 'mint', 47, 2, 96, 7, 5, 90, 'hide-m'], ['sparkle', 'blue', 66, 78, 96, 12, 6, 55, 'hide-m']]
    .forEach(([k, c, x, y, s, r, t, d, cls], n) => {
      const e = document.createElement('div'); e.className = 'stk ' + cls;
      e.style.cssText = `left:${x}%;top:${y}%;--s:${s}px;--d:${d};--n:${n}`;
      e.innerHTML = `<div class="stk-pop"><div class="stk-in" style="--r:${r}deg;--t:${t}s">${STK[k](COL[c])}</div></div>`; hero.appendChild(e);
    });
  $$('.stk').forEach(e => { if (window.innerWidth < 700) e.style.setProperty('--s', parseInt(e.style.getPropertyValue('--s')) * .6 + 'px'); });

  /* ---------- ribbons ---------- */
  const RB = {
    hero: { a: 'M-120 470C140 330 300 120 540 230S900 470 1120 340 1380 120 1580 210', b: 'M-120 430C140 420 300 200 540 160S900 400 1120 400 1380 190 1580 120', vb: '0 0 1440 700', w: 96, t: 10 },
    cat: { a: 'M-100 150C200 10 500 330 800 170S1300 -30 1540 140', b: 'M-100 110C200 120 500 240 800 210S1300 40 1540 90', vb: '0 0 1440 300', w: 60, t: 12 },
    con: { a: 'M-100 250C300 380 600 60 900 200S1300 340 1540 150', b: 'M-100 210C300 300 600 140 900 260S1300 260 1540 200', vb: '0 0 1440 400', w: 64, t: 11 }
  };
  const ribbon = (el, k, clip) => {
    const r = RB[k], an = reduce ? '' : `<animate attributeName="d" dur="${r.t}s" repeatCount="indefinite" calcMode="spline" keyTimes="0;.5;1" keySplines=".45 0 .55 1;.45 0 .55 1" values="${r.a};${r.b};${r.a}"/>`;
    const L = [['#2f7fdc', r.w + 8, 5, 9, 1], ['#4da2ff', r.w, 0, 0, 1], ['#a8d4ff', r.w * .3, -r.w * .17, -r.w * .2, 1], ['#ffffff', r.w * .09, -r.w * .25, -r.w * .29, .75]];
    el.innerHTML = `<svg viewBox="${r.vb}" preserveAspectRatio="xMidYMid slice">${clip ? '<defs><clipPath id="cf"><rect x="470" y="0" width="300" height="700"/><rect x="1010" y="0" width="170" height="700"/></clipPath></defs><g clip-path="url(#cf)">' : '<g>'}${L.map(([c, w, dx, dy, o]) => `<path d="${r.a}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" opacity="${o}" transform="translate(${dx} ${dy})">${an}</path>`).join('')}</g></svg>`;
  };
  ribbon($('#rb1'), 'hero'); ribbon($('#rb2'), 'hero', true); ribbon($('#rb3'), 'cat'); ribbon($('#rb4'), 'con');

  /* ---------- text, marquee, links ---------- */
  const mq = 'New extensions coming soon ✺ Designed with care ✺ A little creativity for your browser ✺ ';
  $('#mq').innerHTML = Array(8).fill(`<span>${mq}</span>`).join('');
  $('#yr').textContent = new Date().getFullYear();
  $('#ig').href = $('#fIg').href = SITE.instagram; $('#igText').textContent = 'Instagram ' + SITE.handle;
  $('#mail').href = $('#fMail').href = 'mailto:' + SITE.supportEmail; $('#mailText').textContent = SITE.supportEmail;
  let n = 0; $$('.line', $('#title')).forEach(l => { const t = l.textContent; l.innerHTML = [...t].map(ch => `<span class="ltr" style="--i:${n++}">${ch}</span>`).join(''); });

  /* ---------- catalog ---------- */
  $('#grid').innerHTML = CATALOG.map((p, i) => {
    const live = p.status === 'live';
    return `<article class="card c-${esc(p.color)}" data-r style="--d:${(i % 3) * .1}s"><div class="top"><span class="tagp">No. ${esc(p.no)}</span><span class="tagp dk">${live ? 'Available' : 'Coming soon'}</span></div>
      <div class="art">${p.image ? `<img class="cover" src="${esc(p.image)}" alt="${esc(p.title)}">` : (STK[p.sticker] || STK.star)(p.color === 'violet' ? '#e9ccff' : '#fff')}</div>
      <h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
      ${live && p.link ? `<a class="btn ghost" href="${esc(p.link)}" target="_blank" rel="noopener">Get it ↗</a>` : `<a class="btn ghost" href="#contact">Get notified</a>`}</article>`;
  }).join('');

  /* ---------- nav ---------- */
  const nav = $('#nav'), plus = $('#plus');
  plus.onclick = () => { const o = nav.classList.toggle('open'); plus.setAttribute('aria-expanded', o); };
  $$('.pill').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); plus.setAttribute('aria-expanded', 'false'); }));

  /* ---------- scroll reveal ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
  $$('[data-r]').forEach(el => io.observe(el));
  addEventListener('mousemove', e => { root.style.setProperty('--mx', (e.clientX / innerWidth - .5).toFixed(3)); root.style.setProperty('--my', (e.clientY / innerHeight - .5).toFixed(3)); });
  addEventListener('scroll', () => root.style.setProperty('--sy', Math.min(scrollY, 1400)), { passive: true });

  /* ---------- contact form ---------- */
  const form = $('#form'), st = $('#status'), say = (t, ok) => { st.textContent = t; st.classList.toggle('ok', !!ok); };
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(form); if (fd.get('company')) return;
    const name = (fd.get('name') || '').trim(), email = (fd.get('email') || '').trim(), msg = (fd.get('message') || '').trim();
    if (!name || !msg || !/^\S+@\S+\.\S+$/.test(email)) { say('Please fill in your name, a valid email address and a message.'); return; }
    if (SITE.formEndpoint) {
      say('Sending…');
      try { const r = await fetch(SITE.formEndpoint, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
        if (r.ok) { form.reset(); say('Message sent! We’ll get back to you soon.', true); } else throw 0;
      } catch (err) { say('Something went wrong. Please try again, or email ' + SITE.supportEmail + '.'); }
    } else {
      location.href = 'mailto:' + SITE.supportEmail + '?subject=' + encodeURIComponent('New message from ' + name) + '&body=' + encodeURIComponent(msg + '\n\n— ' + name + ' (' + email + ')');
      say('Opening your email app…', true);
    }
  });

  /* ---------- intro ---------- */
  const go = () => root.classList.add('ready');
  if (reduce || sessionStorage.getItem('de_intro')) { go(); }
  else {
    sessionStorage.setItem('de_intro', '1');
    const i = document.createElement('div'); i.className = 'intro';
    i.innerHTML = `<div><svg viewBox="0 0 100 100"><polygon points="${star(10, 47, 35)}" fill="#fb4903" ${O}/><circle cx="50" cy="50" r="11" fill="#fff" ${O}/></svg><span>Design Extension</span></div>`;
    document.body.appendChild(i);
    setTimeout(() => { i.classList.add('out'); setTimeout(go, 350); setTimeout(() => i.remove(), 1000); }, 1200);
  }
})();
