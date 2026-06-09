/* ============================================================
   SCROLL REVEAL
   Uses IntersectionObserver to add .is-visible to .reveal-item
   elements as they enter the viewport.
============================================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

/* Stagger hero items on page load */
const heroItems = document.querySelectorAll('.hero .reveal-item');
heroItems.forEach((el, i) => {
  el.style.transitionDelay = `${i * 120}ms`;
  revealObserver.observe(el);
});

/* All other reveal items (no stagger) */
const otherItems = document.querySelectorAll('.reveal-item:not(.hero .reveal-item)');
otherItems.forEach((el) => revealObserver.observe(el));

/* ============================================================
   SMOOTH SCROLL for anchor links
   (CSS scroll-behavior: smooth handles most cases,
    but this handles hash links that land exactly behind
    the sticky nav.)
============================================================ */
const NAV_HEIGHT = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '72',
  10
);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT - 24;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ============================================================
   IMAGE PLACEHOLDER FALLBACK
   onerror is set inline in HTML; this handles cases where the
   image src is empty string (no src set at all).
============================================================ */
document.querySelectorAll('img[src=""]').forEach((img) => {
  img.style.display = 'none';
  const placeholder = img.nextElementSibling;
  if (placeholder) placeholder.style.display = 'flex';
});
