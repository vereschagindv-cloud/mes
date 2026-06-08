/* ─── SCROLL REVEAL ─────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const siblings = [...el.parentElement.querySelectorAll('.reveal')];
        const idx = siblings.indexOf(el);
        el.style.transitionDelay = `${idx * 80}ms`;
        el.classList.add('visible');
        revealObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── NAV SCROLL STYLE ──────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 20);
}, { passive: true });

/* ─── BURGER MENU ───────────────────────────────────────────── */
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav__links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('open');
});

// Close on link click
document.querySelectorAll('.nav__links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
  });
});

/* ─── MODULE TABS ───────────────────────────────────────────── */
const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.module__card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const group = tab.dataset.tab;

    // Update active tab
    tabs.forEach(t => t.classList.remove('tab--active'));
    tab.classList.add('tab--active');

    // Show/hide cards with animation
    cards.forEach(card => {
      if (card.dataset.group === group) {
        card.style.display = 'block';
        card.classList.remove('visible');
        // Re-trigger reveal animation
        setTimeout(() => {
          card.classList.add('visible');
        }, 30);
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Init first tab cards as visible
document.querySelectorAll('[data-group="production"]').forEach(card => {
  card.classList.add('visible');
});

/* ─── SMOOTH SCROLL FOR ANCHORS ─────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ─── CTA FORM ───────────────────────────────────────────────── */
const form = document.getElementById('cta-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button');
  btn.textContent = '✓ Заявка отправлена';
  btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
  btn.disabled = true;
  form.querySelectorAll('input').forEach(i => i.disabled = true);
});

/* ─── ANIMATED COUNTER ──────────────────────────────────────── */
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.solution__numbers');
if (statsSection) statsObserver.observe(statsSection);

function animateCounters() {
  document.querySelectorAll('.count-up').forEach((el, i) => {
    const target = +el.dataset.target;
    const duration = 1400;
    setTimeout(() => {
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, i * 220);
  });
}

/* ─── STICKY CTA ─────────────────────────────────────────────── */
const stickyCta = document.getElementById('sticky-cta');
const heroEl = document.querySelector('.hero');

if (stickyCta && heroEl) {
  const heroEndObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      stickyCta.classList.toggle('visible', !entry.isIntersecting);
    });
  }, { threshold: 0 });
  heroEndObserver.observe(heroEl);
}

/* ─── LINE BAR ANIMATION ────────────────────────────────────── */
const heroObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.line-row__fill').forEach(fill => {
        const target = fill.style.width;
        fill.style.width = '0%';
        setTimeout(() => { fill.style.width = target; }, 200);
      });
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const dashboard = document.querySelector('.hero__dashboard');
if (dashboard) heroObserver.observe(dashboard);
