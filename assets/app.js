/* Portfolio behaviour: rendering, filters, timeline, modal, live GitHub stats. */
(function () {
  const D = window.PORTFOLIO;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const gh = (repo) => `https://github.com/${D.profile.handle}/${repo}`;

  const state = { cat: 'all', year: null, q: '', sort: 'newest' };

  /* ---------- typed terminal ---------- */
  const lines = [
    'npx aaditya --about',
    'git log --since=2016 --author=aaditya',
    'node option_chain_analysis/app.js',
    'python captcha_ai/predict.py',
    'echo "open to interesting problems"'
  ];
  (function type() {
    const el = $('#typed');
    if (!el) return;
    let li = 0, ci = 0, del = false;
    const tick = () => {
      const s = lines[li];
      el.textContent = s.slice(0, ci);
      if (!del && ci < s.length) { ci++; setTimeout(tick, 55); }
      else if (!del) { del = true; setTimeout(tick, 1800); }
      else if (ci > 0) { ci--; setTimeout(tick, 22); }
      else { del = false; li = (li + 1) % lines.length; setTimeout(tick, 400); }
    };
    tick();
  })();

  /* ---------- logo strip ---------- */
  $('#logo-row').innerHTML = ['Node.js', 'React', 'Laravel', 'Python', 'scikit-learn', 'Ionic', 'MySQL', 'MongoDB', 'Socket.io', 'Go']
    .map((n) => `<span>${esc(n)}</span>`).join('');

  /* ---------- journey ---------- */
  $('#journey-list').innerHTML = D.journey.map((j) => `
    <li class="${j.type}">
      <div class="when">${esc(j.when)}</div>
      <div class="role">${esc(j.role)}<span class="type-pill">${j.type}</span></div>
      <div class="org">${esc(j.org)}</div>
      <p class="notes">${esc(j.notes)}</p>
    </li>`).join('');

  /* ---------- skills (with project counts) ---------- */
  const techCount = {};
  D.projects.forEach((p) => p.tech.forEach((t) => { techCount[t.toLowerCase()] = (techCount[t.toLowerCase()] || 0) + 1; }));
  $('#skills-grid').innerHTML = D.skills.map((g) => `
    <div class="skill-group">
      <h4>${esc(g.group)}</h4>
      <div class="tags">${g.items.map((t) => {
        const n = techCount[t.toLowerCase()] || 0;
        return `<span class="tag" ${n ? `data-count="${n}"` : ''} data-tech="${esc(t)}">${esc(t)}</span>`;
      }).join('')}</div>
    </div>`).join('');
  $('#skills-grid').addEventListener('click', (e) => {
    const t = e.target.closest('.tag');
    if (!t) return;
    $('#search').value = t.dataset.tech;
    state.q = t.dataset.tech.toLowerCase();
    render();
    $('#projects').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- timeline ---------- */
  const years = [];
  for (let y = 2016; y <= new Date().getFullYear(); y++) years.push(y);
  const byYear = {};
  D.projects.forEach((p) => (byYear[p.year] = byYear[p.year] || []).push(p));
  D.forks.forEach((f) => (byYear[f.year] = byYear[f.year] || []).push({ fork: true, name: f.repo }));
  $('#timeline-chart').innerHTML = `
    <div class="tl-track">${years.map((y) => {
      const items = byYear[y] || [];
      return `<div class="tl-year" data-year="${y}" title="${items.map((i) => i.name).join(', ') || 'quiet year'}">
        <div class="tl-bars">${items.map((i) => `<span class="tl-dot ${i.featured ? 'featured' : ''} ${i.fork ? 'fork' : ''}" style="${i.fork ? 'opacity:.35' : ''}"></span>`).join('')}</div>
        <div class="tl-label">${y}</div>
        <div class="tl-count">${items.length ? items.length + (items.length === 1 ? ' repo' : ' repos') : '—'}</div>
      </div>`;
    }).join('')}</div>
    <div class="tl-legend">
      <span><i style="background:var(--ink)"></i>featured</span>
      <span><i style="background:var(--mist)"></i>project</span>
      <span><i style="background:var(--mist);opacity:.35"></i>fork / sdk</span>
    </div>`;
  $('#timeline-chart').addEventListener('click', (e) => {
    const y = e.target.closest('.tl-year');
    if (!y) return;
    const yr = Number(y.dataset.year);
    state.year = state.year === yr ? null : yr;
    $$('.tl-year').forEach((el) => el.classList.toggle('active', Number(el.dataset.year) === state.year));
    render();
    if (state.year) $('#projects').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- chips ---------- */
  $('#chips').innerHTML = D.categories.map((c) => {
    const n = c.id === 'all' ? D.projects.length : D.projects.filter((p) => p.category === c.id).length;
    return `<button class="chip ${c.id === 'all' ? 'active' : ''}" data-cat="${c.id}">${esc(c.label)} <span class="mono">${n}</span></button>`;
  }).join('');
  $('#chips').addEventListener('click', (e) => {
    const b = e.target.closest('.chip');
    if (!b) return;
    state.cat = b.dataset.cat;
    $$('.chip').forEach((c) => c.classList.toggle('active', c === b));
    render();
  });

  /* ---------- search / sort ---------- */
  $('#search').addEventListener('input', (e) => { state.q = e.target.value.trim().toLowerCase(); render(); });
  $('#sort').addEventListener('change', (e) => { state.sort = e.target.value; render(); });
  const focusSearch = () => { $('#search').focus(); $('#projects').scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  $('#search-trigger').addEventListener('click', focusSearch);
  document.addEventListener('keydown', (e) => {
    const typing = /input|textarea|select/i.test(document.activeElement.tagName);
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); focusSearch(); }
    else if (e.key === '/' && !typing) { e.preventDefault(); focusSearch(); }
    else if (e.key === 'Escape') { closeModal(); if (typing) document.activeElement.blur(); }
  });

  /* ---------- grid ---------- */
  function filtered() {
    let list = D.projects.filter((p) =>
      (state.cat === 'all' || p.category === state.cat) &&
      (state.year === null || p.year === state.year) &&
      (!state.q || [p.name, p.repo, p.summary, p.tech.join(' '), (p.details || []).join(' ')].join(' ').toLowerCase().includes(state.q))
    );
    const s = {
      newest: (a, b) => b.started.localeCompare(a.started),
      oldest: (a, b) => a.started.localeCompare(b.started),
      stars: (a, b) => (b.stars - a.stars) || b.started.localeCompare(a.started),
      name: (a, b) => a.name.localeCompare(b.name)
    }[state.sort];
    return list.sort(s);
  }

  function render() {
    const list = filtered();
    const parts = [];
    if (state.cat !== 'all') parts.push(`category=${state.cat}`);
    if (state.year) parts.push(`year=${state.year}`);
    if (state.q) parts.push(`q="${esc(state.q)}"`);
    $('#result-count').innerHTML = `${list.length} of ${D.projects.length} projects${parts.length ? ' · ' + parts.join(' ') : ''}${(parts.length) ? ' · <a href="#" id="clear">clear</a>' : ''}`;
    const clear = $('#clear');
    if (clear) clear.addEventListener('click', (e) => {
      e.preventDefault();
      state.cat = 'all'; state.year = null; state.q = ''; $('#search').value = '';
      $$('.chip').forEach((c) => c.classList.toggle('active', c.dataset.cat === 'all'));
      $$('.tl-year').forEach((el) => el.classList.remove('active'));
      render();
    });
    $('#grid').innerHTML = list.length ? list.map((p, i) => `
      <article class="card ${p.featured ? 'featured' : ''}" data-repo="${esc(p.repo)}" style="animation-delay:${Math.min(i, 12) * 30}ms" tabindex="0">
        <div class="card-top">
          <span class="card-name">${esc(p.name)}</span>
          <span class="card-year">${esc(p.started)}</span>
        </div>
        <p class="card-summary">${esc(p.summary)}</p>
        <div class="tags">${p.tech.slice(0, 4).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
        <div class="card-meta">
          <span>${p.featured ? '<span class="badge">Featured</span>' : esc(D.categories.find((c) => c.id === p.category).label)}</span>
          <span class="stars" data-stars="${esc(p.repo)}">★ ${p.stars} · ⑂ ${p.forks}</span>
        </div>
      </article>`).join('') : `<p class="empty">// no projects match. try clearing filters.</p>`;
  }
  $('#grid').addEventListener('click', (e) => { const c = e.target.closest('.card'); if (c) openModal(c.dataset.repo); });
  $('#grid').addEventListener('keydown', (e) => { const c = e.target.closest('.card'); if (c && e.key === 'Enter') openModal(c.dataset.repo); });

  /* ---------- forks ---------- */
  $('#forks').innerHTML = D.forks.map((f) => `
    <li><div><a href="${gh(f.repo)}" target="_blank" rel="noopener">${esc(f.repo)}</a><small>${esc(f.desc)}</small></div>
    <span class="lang">${esc(f.lang)} · ${f.year}</span></li>`).join('');

  /* ---------- modal ---------- */
  const modal = $('#modal');
  function openModal(repo) {
    const p = D.projects.find((x) => x.repo === repo);
    if (!p) return;
    $('#modal-body').innerHTML = `
      <p class="eyebrow">${esc(D.categories.find((c) => c.id === p.category).label)}${p.featured ? ' · featured' : ''}</p>
      <h3>${esc(p.name)}</h3>
      <div class="meta">${esc(p.repo)} · started ${esc(p.started)} · last push ${esc(p.updated)} · ★ ${p.stars} · ⑂ ${p.forks}</div>
      <p>${esc(p.summary)}</p>
      <ul>${(p.details || []).map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
      <div class="code-block small"><div class="code-head"><span class="code-file">stack.json</span></div>
        <pre><code>[${p.tech.map((t) => `<span class="c-plum">"${esc(t)}"</span>`).join(', ')}]</code></pre></div>
      <div class="modal-links">
        <a class="text-link" href="${gh(p.repo)}" target="_blank" rel="noopener">View on GitHub <span class="chev">&gt;</span></a>
        <a class="text-link" href="${gh(p.repo)}/commits" target="_blank" rel="noopener">Commit history <span class="chev">&gt;</span></a>
      </div>`;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    $('.modal-close').focus();
  }
  function closeModal() { if (!modal.hidden) { modal.hidden = true; document.body.style.overflow = ''; } }
  modal.addEventListener('click', (e) => { if (e.target.hasAttribute('data-close')) closeModal(); });

  /* ---------- nav highlight + mobile menu ---------- */
  $('#menu-btn').addEventListener('click', () => $('#nav').classList.toggle('open'));
  $$('#nav a').forEach((a) => a.addEventListener('click', () => $('#nav').classList.remove('open')));
  const sections = $$('main section[id]');
  const navLinks = $$('#nav a');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach((s) => io.observe(s));

  /* ---------- live GitHub stats (graceful fallback to static) ---------- */
  const countUp = (el, to) => {
    const from = Number(el.textContent) || 0;
    if (from === to) return;
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / 600);
      el.textContent = Math.round(from + (to - from) * k);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const setStat = (key, v) => { const el = $(`[data-stat="${key}"]`); if (el) countUp(el, v); };
  setStat('years', new Date().getFullYear() - 2016);
  fetch(`https://api.github.com/users/${D.profile.handle}`)
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((u) => { setStat('repos', u.public_repos); setStat('followers', u.followers); $('#code-repos').textContent = u.public_repos; })
    .catch(() => {});
  fetch(`https://api.github.com/users/${D.profile.handle}/repos?per_page=100`)
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((repos) => {
      let stars = 0;
      repos.forEach((r) => {
        stars += r.stargazers_count;
        const p = D.projects.find((x) => x.repo === r.name);
        if (p) { p.stars = r.stargazers_count; p.forks = r.forks_count; }
      });
      setStat('stars', stars);
      $('#code-stars').textContent = stars;
      render();
    })
    .catch(() => {});

  $('#year').textContent = new Date().getFullYear();
  render();
})();
