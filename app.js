const S = window.SITE, P = window.PROJECTS;
const KNOT = '<svg viewBox="0 0 420 200" fill="none" stroke="#6979E8" stroke-width="4" stroke-linecap="round" class="squig"><path d="M10 120c60-90 140-100 120-40s-110 70-80 10 120-60 160-20 40 70-10 60-30-60 30-70 90 30 150 30"/></svg>';
const STAR = '<span>✺</span>';
const img = (base, l, cls = '') => `<img src="${base}.jpg" data-b="${base}" alt="${l}" class="${cls}" onerror="nx(this)">`;
P.forEach(p => { p.cover = `images/${p.slug}/cover`; p.images = Array.from({length: p.count || 0}, (_, k) => `images/${p.slug}/${String(k+1).padStart(2,'0')}`); });
const colorOf = c => 'c-' + c;
const page = document.body.dataset.page;

/* nav */
document.body.insertAdjacentHTML('afterbegin', `
<nav id="nav"><div class="nl label"><a href="work.html" class="${page==='work'?'on':''}">Work</a><a href="about.html" class="${page==='about'?'on':''}">About</a></div>
<a href="index.html" aria-label="Home" style="justify-self:center"><svg width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="20.5" fill="#F4EBDD" stroke="#242424" stroke-width="1.5"/><path d="M7 25c4-12 12-12 9-4s-6 6-2 4 8-9 9-3-5 6 0 3 8-3 14-3" fill="none" stroke="#FF735E" stroke-width="2.5" stroke-linecap="round"/></svg></a>
<div class="nr"><span class="label"><a href="#contact">Contact</a></span><a class="btn sm" href="mailto:${S.email}">Let's talk</a><button class="menu-btn" onclick="ov.classList.add('open')">Menu</button></div></nav>
<div id="ov"><div style="text-align:right"><button class="close-btn" onclick="ov.classList.remove('open')">× Close</button></div>
<div><a class="big" href="work.html">Work</a><a class="big" href="about.html">About</a><a class="big" href="#contact" onclick="ov.classList.remove('open')">Contact</a></div>
<div class="label"><a href="${S.linkedin}">LinkedIn</a> &nbsp; <a href="${S.behance}">Behance</a> &nbsp; <a href="${S.instagram}">Instagram</a></div></div>`);
addEventListener('scroll', () => nav.classList.toggle('stuck', scrollY > 20));

/* marquee + footer */
const words = ['UX Design','Product Thinking','Research','Wireframes','Prototypes','UI','Open for work'];
const run = words.map(w => `<span>${w}</span>${STAR}`).join('');
const mq = (bg='lime') => `<div class="mq bg-${bg}"><div>${run}${run}${run}${run}</div></div>`;
document.querySelectorAll('[data-mq]').forEach(e => e.outerHTML = mq(e.dataset.mq));
document.body.insertAdjacentHTML('beforeend', `${mq('lime')}<footer id="contact"><div class="wrap">
<div class="giant">Let's <em>untangle</em><br>something.</div>
<div class="flinks"><a class="btn" href="mailto:${S.email}">${S.email}</a><a class="btn sec ext" href="${S.linkedin}">LinkedIn</a><a class="btn sec ext" href="${S.behance}">Behance</a><a class="btn sec ext" href="${S.instagram}">Instagram</a></div>
<div class="fbot"><span>Designed and built by Shubham Patil, Mumbai, India, 2026.</span><a class="btn sec" href="#top" style="color:var(--cream)">Back to top ↑</a></div></div></footer>`);

/* cards */
function card(p, i, cls = '', ratio = '') {
  const n = String(i + 1).padStart(2, '0');
  return `<a class="card ${colorOf(p.color)} ${cls}" href="project.html?p=${p.slug}" data-cat="${p.cat}">
<div class="cv"><i class="bgb"></i><div class="frame">${img(p.cover, p.title + ' cover', '')}</div><span class="stk ${p.color==='coral'?'':'w'}">Case study ${n}</span></div>
<div class="info"><div class="meta label"><span>${p.cat}</span><span>${p.year}</span></div><h3>${p.title}</h3><p>${p.sub}. ${p.desc}</p><p style="margin-top:10px"><b>View case study →</b></p></div></a>`;
}
const feat = document.getElementById('featured');
if (feat) {
  const cls = ['s7', 's5', 's10'];
  feat.innerHTML = P.map((p, i) => card(p, i, cls[i] || 's7')).join('') +
    `<div class="soon"><svg width="90" height="24" viewBox="0 0 90 24" fill="none" stroke="#242424" stroke-width="3" stroke-linecap="round"><path d="M3 14c8-14 14 8 22-2s12-6 18 0 14-8 22 0"/></svg><h3>Project ${String(P.length+1).padStart(2,'0')} is being untangled…</h3></div>`;
}
const wg = document.getElementById('workgrid');
if (wg) {
  const draw = f => {
    const list = P.map((p, i) => ({ p, i })).filter(x => f === 'All' || x.p.cat.includes(f));
    wg.innerHTML = list.map(({ p, i }, k) => card(p, i, k % 3 === 0 ? 's7' : k % 3 === 1 ? 's5' : 's10')).join('');
    document.getElementById('count').textContent = `(${list.length} project${list.length===1?'':'s'}, more coming)`;
  };
  const cats = ['All', 'UX', 'Product', 'Web', 'Visual'];
  pills.innerHTML = cats.map((c, i) => `<button class="chip ${i?'':'on'}" data-f="${c}">${c==='All'?'All':c==='UX'?'UX / UI':c+' Design'}</button>`).join('');
  pills.onclick = e => { const b = e.target.closest('button'); if (!b) return; pills.querySelectorAll('button').forEach(x => x.classList.remove('on')); b.classList.add('on'); draw(b.dataset.f); };
  draw('All');
}

/* project page: Behance-style linear stack */
const ph1 = document.getElementById('project');
if (ph1) {
  const q = new URLSearchParams(location.search).get('p');
  let i = P.findIndex(p => p.slug === q); if (i < 0) i = 0;
  const p = P[i], nx = P[(i + 1) % P.length];
  document.title = `${p.title} · Shubham Patil`;
  const dark = p.color === 'coral' || p.color === 'blue';
  ph1.innerHTML = `
<section class="p-hero bg-${p.color}"><div class="wrap"><div class="p-top"><a class="btn sec" style="background:var(--cream);color:var(--ink)" href="work.html">← Back to work</a><a class="btn sec" style="background:var(--cream);color:var(--ink)" href="project.html?p=${nx.slug}">Next project</a></div>
<p class="label">${p.cat}</p><h1>${p.title}</h1><p class="serif" style="font-size:clamp(26px,3.5vw,44px);margin-top:12px">${p.sub}</p>
<div class="p-meta label"><div>Year<b>${p.year}</b></div><div>Role<b>${p.role}</b></div><div>Tools<b>${p.tools}</b></div><div>Type<b>${p.cat}</b></div></div></div></section>
<div class="stack">${p.images.map((s, k) => img(s, `${p.title} — image ${k + 1}`)).join('')}</div>
<section class="p-end bg-cream"><div class="wrap"><p class="script">thanks for scrolling all the way down</p><h2 style="margin:12px 0 32px">Like what you see?</h2>
<a class="btn ext" href="${p.behance}">See it on Behance</a></div></section>
<a class="next bg-${nx.color}" href="project.html?p=${nx.slug}"><p class="label">Next case study</p><h2>${nx.title}</h2></a>`;
}
