/* =====================================================
   SUVENDU KUMAR — Portfolio JavaScript
   ===================================================== */

(function () {
  'use strict';

  /* ── CURSOR GLOW ─────────────────────────────── */
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top  = e.clientY + 'px';
    });
  }

  /* ── MOBILE NAV ──────────────────────────────── */
  const navToggle = document.getElementById('nav-toggle');
  const navList   = document.getElementById('nav-list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close on nav link click
    navList.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── ACTIVE NAV HIGHLIGHT (SCROLLSPY) ────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('is-active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('is-active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* ── SCROLL ANIMATIONS ────────────────────────── */
  const animatedEls = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const delay = parseInt(el.dataset.delay || '0', 10);
        setTimeout(() => el.classList.add('is-visible'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  animatedEls.forEach(el => observer.observe(el));

  /* ── PUBLICATION FILTER & SEARCH ─────────────── */
  const pubList    = document.getElementById('pub-list');
  const pubSearch  = document.getElementById('pub-search');
  const pubYear    = document.getElementById('pub-year');
  const pubType    = document.getElementById('pub-type');
  const pubCount   = document.getElementById('pub-count');
  const filterBtns = document.querySelectorAll('.filter-btn');

  let activeTopic = 'all';

  function filterPublications() {
    if (!pubList) return;

    const query   = pubSearch  ? pubSearch.value.trim().toLowerCase() : '';
    const year    = pubYear    ? pubYear.value  : 'all';
    const type    = pubType    ? pubType.value  : 'all';
    const topic   = activeTopic;

    const items = pubList.querySelectorAll('li.pub');
    let visible  = 0;

    items.forEach(item => {
      const matchYear  = year  === 'all' || item.dataset.year  === year;
      const matchType  = type  === 'all' || item.dataset.type  === type;
      const matchFirst = topic === 'first' ? item.dataset.first === 'true' : true;
      const matchTopic = topic === 'all' || topic === 'first' || item.dataset.topic === topic;

      let matchSearch = true;
      if (query) {
        const text = item.textContent.toLowerCase();
        matchSearch = text.includes(query);
      }

      const show = matchYear && matchType && matchTopic && matchFirst && matchSearch;
      item.hidden = !show;
      if (show) visible++;
    });

    if (pubCount) {
      pubCount.textContent = `Showing ${visible} of ${items.length}`;
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeTopic = btn.dataset.topic;
      filterPublications();
    });
  });

  if (pubSearch) pubSearch.addEventListener('input', filterPublications);
  if (pubYear)   pubYear.addEventListener('change', filterPublications);
  if (pubType)   pubType.addEventListener('change', filterPublications);

  /* ── HEADER SHADOW ON SCROLL ──────────────────── */
  const siteHeader = document.getElementById('site-header');

  function updateHeader() {
    if (!siteHeader) return;
    if (window.scrollY > 20) {
      siteHeader.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
    } else {
      siteHeader.style.boxShadow = 'none';
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ── SMOOTH ANCHOR SCROLL ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── PROJECT CARD — highlight on details open ── */
  document.querySelectorAll('details.project-details').forEach(details => {
    details.addEventListener('toggle', () => {
      const card = details.closest('.project-card');
      if (card) {
        card.style.borderColor = details.open
          ? 'rgba(0,212,170,0.3)'
          : '';
      }
    });
  });

  /* ── TYPING EFFECT for hero name (subtle) ──── */
  /* optional: no-op, let CSS handle the gradient */

})();
