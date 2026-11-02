document.documentElement.classList.add('js');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// nav: scrolled state + mobile menu
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav__toggle');
const links = document.getElementById('nav-links');
const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 10);
addEventListener('scroll', onScroll, { passive: true }); onScroll();
const setMenu = open => { toggle.setAttribute('aria-expanded', open); links.classList.toggle('is-open', open); };
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
links.addEventListener('click', e => e.target.closest('a') && setMenu(false));
addEventListener('keydown', e => e.key === 'Escape' && setMenu(false));

// reveal on scroll + active section in nav
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
}), { rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const navMap = new Map([...links.querySelectorAll('a[href^="#"]')].map(a => [a.hash.slice(1), a]));
const sectionIO = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) navMap.forEach((a, id) => a.classList.toggle('is-active', id === e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
navMap.forEach((_, id) => { const s = document.getElementById(id); if (s) sectionIO.observe(s); });

// segmented controls
function segmented(group, onPick) {
  group.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    group.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
    onPick(b);
  });
}
const gw = document.querySelector('.gw');
segmented(document.querySelector('[aria-label="Highlight a route"]'), b => { gw.dataset.active = b.dataset.route; });

const apps = document.querySelectorAll('#apps li');
const label = document.getElementById('filiale-label');
const showFiliale = f => {
  label.textContent = 'Filiale ' + f;
  apps.forEach(li => { li.hidden = !li.dataset.for.split(' ').includes(f); });
};
segmented(document.querySelector('[aria-label="View the store as a subsidiary"]'), b => showFiliale(b.dataset.filiale));
showFiliale('1');

// SMIL packets: freeze for reduced motion, pause when off-screen
document.querySelectorAll('.diagram svg').forEach(svg => {
  if (reduce) { svg.pauseAnimations(); return; }
  new IntersectionObserver(([e]) => e.isIntersecting ? svg.unpauseAnimations() : svg.pauseAnimations()).observe(svg);
});

// copy email
const copy = document.getElementById('copy-email');
copy.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(copy.dataset.email); copy.textContent = 'Copied ✓'; }
  catch { copy.textContent = copy.dataset.email; }
  setTimeout(() => (copy.textContent = 'Copy email'), 2000);
});

document.getElementById('year').textContent = new Date().getFullYear();
