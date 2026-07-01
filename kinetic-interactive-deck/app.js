// ---- primary slide navigation ----
const navButtons = Array.from(document.querySelectorAll('#navtabs button'));
const panels = Array.from(document.querySelectorAll('section.panel'));
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');
const progressFill = document.getElementById('progressFill');
const slideCount = document.getElementById('slideCount');
const focusMode = document.getElementById('focusMode');
const printDeck = document.getElementById('printDeck');
const fullScreen = document.getElementById('fullScreen');
let activeIndex = 0;

function setSlide(target, pushHash = true) {
  const nextIndex = typeof target === 'number'
    ? Math.max(0, Math.min(target, panels.length - 1))
    : panels.findIndex(panel => panel.id === target);
  if (nextIndex < 0) return;

  activeIndex = nextIndex;
  const activeId = panels[activeIndex].id;
  navButtons.forEach(btn => {
    const isActive = btn.getAttribute('data-t') === activeId;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
  panels.forEach(panel => panel.classList.toggle('active', panel.id === activeId));
  slideCount.textContent = `${activeIndex + 1} / ${panels.length}`;
  progressFill.style.width = `${((activeIndex + 1) / panels.length) * 100}%`;
  prevSlide.disabled = activeIndex === 0;
  nextSlide.disabled = activeIndex === panels.length - 1;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (pushHash) history.replaceState(null, '', `#${activeId}`);
}

navButtons.forEach(btn => {
  btn.addEventListener('click', () => setSlide(btn.getAttribute('data-t')));
});
window.addEventListener('hashchange', () => {
  setSlide(window.location.hash.replace('#', '') || 'overview', false);
});

prevSlide.addEventListener('click', () => setSlide(activeIndex - 1));
nextSlide.addEventListener('click', () => setSlide(activeIndex + 1));
focusMode.addEventListener('click', () => {
  const isFocus = document.body.classList.toggle('focus');
  focusMode.setAttribute('aria-pressed', String(isFocus));
  focusMode.textContent = isFocus ? 'Exit' : 'Present';
});
printDeck.addEventListener('click', () => window.print());
fullScreen.addEventListener('click', async () => {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen?.();
  } else {
    await document.exitFullscreen?.();
  }
});

document.addEventListener('keydown', event => {
  const tag = event.target.tagName.toLowerCase();
  if (tag === 'input' || tag === 'textarea' || event.target.isContentEditable) return;
  if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
    event.preventDefault();
    setSlide(activeIndex + 1);
  }
  if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
    event.preventDefault();
    setSlide(activeIndex - 1);
  }
  if (event.key === 'Home') setSlide(0);
  if (event.key === 'End') setSlide(panels.length - 1);
  if (event.key === 'Escape' && document.body.classList.contains('focus')) {
    document.body.classList.remove('focus');
    focusMode.setAttribute('aria-pressed', 'false');
    focusMode.textContent = 'Present';
  }
});

setSlide(window.location.hash.replace('#', '') || 'overview', false);

// ---- competitor sub-tabs (Creative History section) ----
const compTabs = document.querySelectorAll('#compTabs button');
const compCards = document.querySelectorAll('.compcard');
compTabs.forEach(btn => {
  btn.addEventListener('click', () => {
    compTabs.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const target = 'c-' + btn.getAttribute('data-c');
    compCards.forEach(c => c.classList.toggle('active', c.id === target));
  });
});

// ---- competitive terrain (reads BRANDS from data.js) ----
const viewButtons = document.querySelectorAll('.view-toggle button');
const viewToggle = document.querySelector('.view-toggle');
const visualOptions = document.querySelectorAll('.visual-option');
const detail = document.getElementById('mapDetail');
const lanes = {
  local: document.querySelector('[data-lane="local"]'),
  pressure: document.querySelector('[data-lane="pressure"]'),
  national: document.querySelector('[data-lane="national"]')
};
const svgNS = "http://www.w3.org/2000/svg";
const dotsG = document.getElementById('dots');
let selectedBrand = null;

function setVisualView(view) {
  viewButtons.forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-view') === view);
  });
  visualOptions.forEach(option => {
    option.classList.toggle('active', option.id === `${view}View`);
  });
}

viewToggle.addEventListener('click', event => {
  const btn = event.target.closest('button[data-view]');
  if (!btn) return;
  setVisualView(btn.getAttribute('data-view'));
});
viewButtons.forEach(btn => {
  btn.addEventListener('pointerdown', () => setVisualView(btn.getAttribute('data-view')));
  btn.addEventListener('click', () => setVisualView(btn.getAttribute('data-view')));
});

function laneForBrand(brand) {
  if (brand.name === 'Kinetic') return 'local';
  if (brand.name === 'Spectrum' || brand.name === 'T-Mobile Home Internet') return 'pressure';
  return 'national';
}

function plot(bx, by) {
  const px = 60 + (bx / 100) * (500 - 60);
  const py = 370 - (by / 100) * (370 - 20);
  return [px, py];
}

function renderDetail(brand) {
  selectedBrand = brand.name;
  document.querySelectorAll('.brand-chip').forEach(item => {
    item.classList.toggle('active', item.dataset.brand === selectedBrand);
  });
  document.querySelectorAll('.dot').forEach(item => {
    item.classList.toggle('sel', item.dataset.brand === selectedBrand);
  });
  const textColor = brand.color === '#F5D949' ? '#0E1B3C' : '#fff';
  detail.innerHTML = `<h3>${brand.name}</h3><span class="tag pill" style="background:${brand.color};color:${textColor};">${brand.tag}</span><p>${brand.desc}</p>`;
}

BRANDS.forEach((b, i) => {
  const chip = document.createElement('button');
  chip.className = 'brand-chip';
  chip.type = 'button';
  chip.textContent = b.name;
  chip.style.setProperty('--chip', b.color);
  chip.dataset.brand = b.name;
  chip.setAttribute('aria-label', `Show ${b.name}`);
  chip.addEventListener('click', () => renderDetail(b));
  lanes[laneForBrand(b)].appendChild(chip);

  const [px, py] = plot(b.x, b.y);
  const g = document.createElementNS(svgNS, 'g');
  g.setAttribute('class', 'dot');
  g.setAttribute('tabindex', '0');
  g.setAttribute('role', 'button');
  g.setAttribute('aria-label', b.name);
  g.dataset.brand = b.name;

  const hit = document.createElementNS(svgNS, 'circle');
  hit.setAttribute('class', 'map-hit');
  hit.setAttribute('cx', px);
  hit.setAttribute('cy', py);
  hit.setAttribute('r', 18);
  g.appendChild(hit);

  const circle = document.createElementNS(svgNS, 'circle');
  circle.setAttribute('cx', px);
  circle.setAttribute('cy', py);
  circle.setAttribute('r', i === 0 ? 10 : 8);
  circle.setAttribute('fill', b.color);
  circle.setAttribute('stroke', '#0E1B3C');
  circle.setAttribute('stroke-width', '1.5');
  g.appendChild(circle);

  const label = document.createElementNS(svgNS, 'text');
  label.setAttribute('x', px);
  label.setAttribute('y', py - 16);
  label.setAttribute('text-anchor', 'middle');
  label.setAttribute('class', 'maplabel');
  label.textContent = b.name;
  g.appendChild(label);

  g.addEventListener('click', () => renderDetail(b));
  g.addEventListener('keypress', e => { if (e.key === 'Enter') renderDetail(b); });
  dotsG.appendChild(g);

  if (i === 0) renderDetail(b);
});
