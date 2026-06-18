/* =====================================================
   NEXUS PAKISTAN — SPA Router & App Shell Controller
   ===================================================== */

import './style.css';

// ── Dynamic Component Imports ─────────────────────────
const componentMap = {
  home:      () => import('./components/home.js'),
  venues:    () => import('./components/venues.js'),
  vendors:   () => import('./components/vendors.js'),
  quote:     () => import('./components/quoteBuilder.js'),
  dashboard: () => import('./components/dashboard.js'),
  signage:   () => import('./components/signage.js'),
};

// ── DOM References ────────────────────────────────────
const appEl         = document.getElementById('app');
const siteHeader    = document.getElementById('site-header');
const viewToggle    = document.getElementById('view-toggle');
const btnMarket     = document.getElementById('btn-marketplace');
const btnPortal     = document.getElementById('btn-portal');
const hamburger     = document.getElementById('hamburger');
const mobileDrawer  = document.getElementById('mobile-drawer');
const drawerClose   = document.getElementById('drawer-close');
const bottomNav     = document.getElementById('bottom-nav');
const fabBtn        = document.getElementById('fab-btn');

// ── Bottom nav items ──────────────────────────────────
const bnavItems = {
  home:    document.getElementById('bnav-home'),
  venues:  document.getElementById('bnav-venues'),
  vendors: document.getElementById('bnav-vendors'),
  quote:   document.getElementById('bnav-quote'),
  dash:    document.getElementById('bnav-dash'),
};

// ── Desktop nav links ─────────────────────────────────
const desktopNavLinks = document.querySelectorAll('.d-nav-link');

// ── State ─────────────────────────────────────────────
let currentRoute  = '';
let isVendorMode  = false;

// ── Header Scroll Effect ──────────────────────────────
function setupHeaderScroll() {
  const onScroll = () => {
    const scrolled = window.scrollY > 60;
    siteHeader.classList.toggle('scrolled', scrolled);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once
}

// ── Reveal Animations (Intersection Observer) ─────────
function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('[data-reveal]').forEach(el => {
    observer.observe(el);
  });
}

// ── Bottom Nav State ──────────────────────────────────
function updateBottomNav(route) {
  Object.entries(bnavItems).forEach(([key, el]) => {
    if (!el) return;
    const match = route === key || (key === 'dash' && route === 'dashboard');
    el.classList.toggle('active', match);
  });
}

// ── Desktop Nav State ──────────────────────────────────
function updateDesktopNav(route) {
  desktopNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    const isActive = href === `#/${route}`;
    link.classList.toggle('active', isActive);
  });
}

// ── Page Router ───────────────────────────────────────
async function navigate(hash) {
  const [rawRoute, rawQuery] = (hash || '#/home').replace('#/', '').split('?');
  const route = rawRoute || 'home';
  const query = new URLSearchParams(rawQuery || '');

  // Hide FAB on dashboard/signage
  if (fabBtn) {
    fabBtn.style.display = (route === 'dashboard' || route === 'signage') ? 'none' : '';
  }

  // Update nav states
  updateBottomNav(route);
  updateDesktopNav(route);

  // Reset scroll
  window.scrollTo(0, 0);

  // Show loading skeleton
  appEl.innerHTML = `
    <div style="padding:100px 20px 40px; max-width:1280px; margin:0 auto; display:flex; flex-direction:column; gap:20px;">
      ${[1,2,3].map(() => `<div class="skeleton" style="height:${Math.floor(Math.random()*80)+80}px; border-radius:20px;"></div>`).join('')}
    </div>
  `;

  try {
    const loader = componentMap[route] || componentMap['home'];
    const module = await loader();
    const html   = module.render(query);
    appEl.innerHTML = html;
    module.init && module.init(query);

    // Trigger reveal animations after new content
    setTimeout(() => setupReveal(), 100);
  } catch (err) {
    console.error('[NEXUS Router]', err);
    appEl.innerHTML = `
      <div style="text-align:center; padding:120px 20px;">
        <div style="font-size:3rem; margin-bottom:16px;">⚠️</div>
        <h2 style="font-family:'Outfit',sans-serif;">Page not found</h2>
        <p style="color:#6B7280; margin-top:8px;">Route "${route}" is not available.</p>
        <a href="#/home" style="display:inline-block; margin-top:24px; padding:12px 28px; background:#0F5B3E; color:#fff; border-radius:999px; font-weight:700;">Go Home</a>
      </div>
    `;
    // eslint-disable-next-line @next/next/no-assign-module-variable
    module.exports = {
      createRouter,
      Route
    }
  }

  currentRoute = route;
}

// ── Hash Router ───────────────────────────────────────
function onHashChange() {
  navigate(window.location.hash);
}

window.addEventListener('hashchange', onHashChange);

// ── View Toggle (Marketplace / Vendor Portal) ─────────
function setupViewToggle() {
  if (!viewToggle) return;

  function setMode(vendor) {
    isVendorMode = vendor;
    viewToggle.classList.toggle('vendor-mode', vendor);

    if (btnMarket) {
      btnMarket.classList.toggle('active', !vendor);
    }
    if (btnPortal) {
      btnPortal.classList.toggle('active', vendor);
    }

    if (vendor) {
      window.location.hash = '#/dashboard';
    } else {
      window.location.hash = '#/home';
    }
  }

  viewToggle.addEventListener('click', (e) => {
    if (e.target === btnMarket || (!isVendorMode && e.target !== btnPortal)) {
      setMode(false);
    } else {
      setMode(true);
    }
  });
}

// ── Mobile Drawer ─────────────────────────────────────
function setupMobileDrawer() {
  if (!hamburger || !mobileDrawer) return;

  hamburger.addEventListener('click', () => {
    mobileDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeDrawer = () => {
    mobileDrawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

  // Close on backdrop click
  mobileDrawer.addEventListener('click', (e) => {
    if (e.target === mobileDrawer) closeDrawer();
  });

  // Close on link click
  mobileDrawer.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

// ── Bootstrap ─────────────────────────────────────────
function init() {
  setupHeaderScroll();
  setupViewToggle();
  setupMobileDrawer();

  // Initial navigation
  const hash = window.location.hash || '#/home';
  navigate(hash);
}

document.addEventListener('DOMContentLoaded', init);
