// Original site's interactive navigation and publication filters.
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#nav-list');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }));
}
const pubs = [...document.querySelectorAll('#pub-list .pub')];
const search = document.querySelector('#pub-search');
const year = document.querySelector('#pub-year');
const type = document.querySelector('#pub-type');
const count = document.querySelector('#pub-count');
const filters = [...document.querySelectorAll('.filter-btn[data-topic]')];
let topic = 'all';
function updatePubs() {
  const query = (search?.value || '').trim().toLowerCase();
  let shown = 0;
  pubs.forEach(pub => {
    const matches = (!query || pub.textContent.toLowerCase().includes(query)) &&
      (topic === 'all' || (topic === 'first' ? pub.dataset.first === 'true' : pub.dataset.topic === topic)) &&
      (!year || year.value === 'all' || pub.dataset.year === year.value) &&
      (!type || type.value === 'all' || pub.dataset.type === type.value);
    pub.hidden = !matches;
    if (matches) shown++;
  });
  if (count) count.textContent = `Showing ${shown} of ${pubs.length}`;
}
filters.forEach(btn => btn.addEventListener('click', () => {
  topic = btn.dataset.topic;
  filters.forEach(b => b.classList.toggle('is-active', b === btn));
  updatePubs();
}));
[search, year, type].forEach(el => el?.addEventListener(el === search ? 'input' : 'change', updatePubs));
updatePubs();
const links = [...document.querySelectorAll('.nav-link[href^="#"]')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const current = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (current) links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + current.target.id));
  }, {rootMargin:'-15% 0px -65% 0px'});
  links.forEach(a => { const section = document.querySelector(a.getAttribute('href')); if(section) observer.observe(section); });
}
