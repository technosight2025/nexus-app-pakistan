/* =====================================================
   VENUES — Listing Page with Filters & Detail Modal
   ===================================================== */

import { initialVenues } from '../utils/mockData.js';
import { getStorage, setStorage } from '../utils/storage.js';

let activeModal = null;

export function render() {
  return `
<!-- ════════════ PAGE HEADER ════════════ -->
<div class="listing-page-layout" style="max-width:1280px;margin:0 auto;padding:80px 20px 40px;">

  <!-- Filters Panel (sidebar on tablet/desktop) -->
  <aside class="filters-panel" id="venues-filter-panel">
    <h3 style="font-family:'Outfit',sans-serif;font-size:1rem;font-weight:800;color:var(--text-heading);margin-bottom:20px;">Filters</h3>

    <div class="filter-group">
      <div class="filter-group-title">City</div>
      <div class="filter-check-list">
        ${['Lahore','Karachi','Islamabad','Rawalpindi','Faisalabad'].map(c => `
          <label class="filter-check-item">
            <input type="checkbox" class="venue-city-filter" value="${c}" />
            ${c}
          </label>
        `).join('')}
      </div>
    </div>

    <div class="filter-group">
      <div class="filter-group-title">Capacity</div>
      <div class="filter-check-list">
        ${[['small','Up to 200'],['medium','200 – 500'],['large','500 – 1000'],['xlarge','1000+']].map(([v,l]) => `
          <label class="filter-check-item">
            <input type="checkbox" class="venue-cap-filter" value="${v}" />
            ${l}
          </label>
        `).join('')}
      </div>
    </div>

    <div class="filter-group">
      <div class="filter-group-title">Venue Type</div>
      <div class="filter-check-list">
        ${['Luxury Estate','Sky Deck','Heritage Hall','Glass Marquee'].map(t => `
          <label class="filter-check-item">
            <input type="checkbox" class="venue-type-filter" value="${t}" />
            ${t}
          </label>
        `).join('')}
      </div>
    </div>

    <button class="btn btn-primary" style="width:100%;margin-top:8px;" id="venues-apply-filter">
      Apply Filters
    </button>
  </aside>

  <!-- Main Listings -->
  <div class="listings-main">

    <!-- Page Hero Strip -->
    <div style="background:linear-gradient(135deg,var(--emerald-deep) 0%,var(--emerald) 100%);border-radius:24px;padding:32px;margin-bottom:24px;color:#fff;position:relative;overflow:hidden;">
      <div style="position:absolute;top:-40px;right:-40px;width:180px;height:180px;border-radius:50%;background:rgba(212,175,55,0.15);pointer-events:none;"></div>
      <div class="eyebrow on-dark" style="margin-bottom:10px;"><span class="eyebrow-dot"></span>Browse & Book</div>
      <h1 style="font-family:'Outfit',sans-serif;font-size:clamp(1.5rem,3vw,2rem);font-weight:900;color:#fff;margin-bottom:8px;letter-spacing:-0.025em;">
        Pakistan's Finest <span style="color:var(--gold);">Venues</span>
      </h1>
      <p style="font-size:0.88rem;color:rgba(255,255,255,0.7);max-width:460px;">
        From Mughal estates in Lahore to oceanfront decks in Karachi — find your perfect event space.
      </p>
    </div>

    <!-- Mobile filter trigger -->
    <div class="filter-toggle-bar" id="venues-filter-toggle">
      <span>
        <span class="material-symbols-outlined" style="font-size:20px;">tune</span>
        Filters
      </span>
      <span class="badge badge-emerald" id="filter-count-badge" style="display:none;">0</span>
    </div>

    <div class="listings-topbar">
      <span class="listings-count" id="venues-count">Showing ${initialVenues.length} venues</span>
      <div class="listings-sort">
        <select id="venues-sort">
          <option value="rating">Sort: Highest Rated</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="reviews">Most Reviewed</option>
        </select>
      </div>
    </div>

    <div class="listing-cards-grid" id="venues-grid">
      ${renderVenueCards(initialVenues)}
    </div>

  </div>
</div>

<!-- Mobile Filters Drawer -->
<div class="modal-overlay" id="mobile-filter-overlay">
  <div class="modal-sheet" style="max-width:100%;">
    <div class="modal-handle"></div>
    <div class="modal-body">
      <h3 style="font-family:'Outfit',sans-serif;font-size:1.1rem;font-weight:800;margin-bottom:20px;">Filter Venues</h3>

      <div class="filter-group">
        <div class="filter-group-title">City</div>
        <div class="filter-check-list">
          ${['Lahore','Karachi','Islamabad','Rawalpindi','Faisalabad'].map(c => `
            <label class="filter-check-item">
              <input type="checkbox" class="mobile-city-filter" value="${c}" /> ${c}
            </label>
          `).join('')}
        </div>
      </div>
      <div class="filter-group" style="margin-top:16px;">
        <div class="filter-group-title">Capacity</div>
        <div class="filter-check-list">
          ${[['small','Up to 200'],['medium','200 – 500'],['large','500 – 1000'],['xlarge','1000+']].map(([v,l]) => `
            <label class="filter-check-item">
              <input type="checkbox" class="mobile-cap-filter" value="${v}" /> ${l}
            </label>
          `).join('')}
        </div>
      </div>
      <div style="display:flex;gap:12px;margin-top:24px;">
        <button class="btn btn-outline-emerald" style="flex:1;" id="mobile-filter-clear">Clear</button>
        <button class="btn btn-primary" style="flex:2;" id="mobile-filter-apply">Apply Filters</button>
      </div>
    </div>
  </div>
</div>

<!-- Venue Detail Modal -->
<div class="modal-overlay" id="venue-detail-modal">
  <div class="modal-sheet" id="venue-modal-sheet">
    <!-- content injected dynamically -->
  </div>
</div>
`;
}

// ── Card Rendering ────────────────────────────────────
function renderVenueCards(venues) {
  if (!venues.length) return `
    <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-muted);">
      <div style="font-size:3rem;margin-bottom:12px;">🔍</div>
      <h3 style="font-family:'Outfit',sans-serif;">No venues found</h3>
      <p style="margin-top:8px;">Try adjusting your filters.</p>
    </div>
  `;

  return venues.map(v => `
    <div class="listing-card" data-venue-id="${v.id}">
      <div class="lcard-img" style="background-image:url('${v.image}')">
        <div class="lcard-badges">
          <span class="badge badge-emerald">${v.tag}</span>
        </div>
        <div class="lcard-fav" data-fav="${v.id}" title="Save to favourites">🤍</div>
      </div>
      <div class="lcard-body">
        <h3 class="lcard-name">${v.name}</h3>
        <div class="lcard-location">
          <span class="material-symbols-outlined" style="font-size:14px;">location_on</span>
          ${v.area}, ${v.city}
        </div>
        <div class="lcard-stats">
          <span class="lcard-stat">
            <span class="material-symbols-outlined" style="font-size:14px;">people</span>
            ${v.capacity}
          </span>
          <span class="lcard-stat">⭐ ${v.rating} (${v.reviewsCount})</span>
        </div>
        <div class="lcard-footer">
          <div class="lcard-price">${v.priceRange.split(' - ')[0]} <small>starting</small></div>
          <button class="btn btn-primary btn-sm" data-open-venue="${v.id}">
            View Details
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// ── Venue Detail Modal Content ────────────────────────
function renderVenueModal(venue) {
  return `
    <div class="modal-handle"></div>
    <button class="modal-close-btn" id="close-venue-modal">✕</button>
    <div class="modal-hero-img" style="background-image:url('${venue.image}')"></div>
    <div class="modal-body">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:12px;">
        <div>
          <h2 class="modal-title">${venue.name}</h2>
          <div class="modal-sub">
            <span class="material-symbols-outlined" style="font-size:15px;">location_on</span>
            ${venue.area}, ${venue.city}
            &nbsp;·&nbsp; ⭐ ${venue.rating} (${venue.reviewsCount} reviews)
          </div>
        </div>
        <div class="badge badge-gold">${venue.category}</div>
      </div>

      <p style="font-size:0.875rem;color:var(--text-muted);line-height:1.7;margin-bottom:20px;">
        ${venue.description}
      </p>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">
        <div style="background:var(--canvas);border-radius:16px;padding:14px;text-align:center;">
          <div style="font-size:1.2rem;margin-bottom:4px;">👥</div>
          <div style="font-family:'Outfit',sans-serif;font-size:0.85rem;font-weight:700;color:var(--text-heading);">${venue.capacity}</div>
          <div style="font-size:0.7rem;color:var(--text-faint);">Capacity</div>
        </div>
        <div style="background:var(--canvas);border-radius:16px;padding:14px;text-align:center;">
          <div style="font-size:1.2rem;margin-bottom:4px;">💰</div>
          <div style="font-family:'Outfit',sans-serif;font-size:0.78rem;font-weight:700;color:var(--emerald);">${venue.priceRange}</div>
          <div style="font-size:0.7rem;color:var(--text-faint);">Price Range</div>
        </div>
      </div>

      <div class="modal-section-title">Amenities</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px;">
        ${venue.amenities.map(a => `<span class="badge badge-emerald">${a}</span>`).join('')}
      </div>

      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="#/quote" class="btn btn-primary" style="flex:2;justify-content:center;">
          <span class="material-symbols-outlined">request_quote</span>
          Get Quote for This Venue
        </a>
        <button class="btn btn-outline-emerald" style="flex:1;" onclick="alert('Koi aadmi nahi aaya abhi! Staff will call you shortly. 📞')">
          📞 Call
        </button>
      </div>
      <p class="roman-urdu" style="text-align:center;margin-top:10px;">"Venue book karein — aaj hi contact karein"</p>
    </div>
  `;
}

// ── init() ────────────────────────────────────────────
export function init() {
  let filtered     = [...initialVenues];
  let activeCities = new Set();
  let activeCaps   = new Set();

  function applyFilters() {
    filtered = initialVenues.filter(v => {
      const cityOk = !activeCities.size || activeCities.has(v.city);
      const capOk  = !activeCaps.size   || matchCapacity(v, activeCaps);
      return cityOk && capOk;
    });

    // Sort
    const sort = document.getElementById('venues-sort')?.value;
    if (sort === 'price_asc')  filtered.sort((a,b) => a.basePrice - b.basePrice);
    if (sort === 'price_desc') filtered.sort((a,b) => b.basePrice - a.basePrice);
    if (sort === 'rating')     filtered.sort((a,b) => parseFloat(b.rating) - parseFloat(a.rating));
    if (sort === 'reviews')    filtered.sort((a,b) => b.reviewsCount - a.reviewsCount);

    const grid = document.getElementById('venues-grid');
    if (grid) grid.innerHTML = renderVenueCards(filtered);

    const countEl = document.getElementById('venues-count');
    if (countEl) countEl.textContent = `Showing ${filtered.length} venue${filtered.length !== 1 ? 's' : ''}`;

    // Re-bind card events
    bindCardEvents();
  }

  function matchCapacity(venue, caps) {
    if (caps.has('small')  && venue.maxCapacity <= 200)  return true;
    if (caps.has('medium') && venue.minCapacity >= 200 && venue.maxCapacity <= 500) return true;
    if (caps.has('large')  && venue.minCapacity >= 500 && venue.maxCapacity <= 1000) return true;
    if (caps.has('xlarge') && venue.minCapacity >= 1000) return true;
    return false;
  }

  function openModal(venueId) {
    const venue = initialVenues.find(v => v.id === venueId);
    if (!venue) return;

    const overlay = document.getElementById('venue-detail-modal');
    const sheet   = document.getElementById('venue-modal-sheet');
    if (!overlay || !sheet) return;

    sheet.innerHTML = renderVenueModal(venue);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    activeModal = 'venue';

    document.getElementById('close-venue-modal')?.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  }

  function closeModal() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
    document.body.style.overflow = '';
    activeModal = null;
  }

  function bindCardEvents() {
    // Open venue modal
    document.querySelectorAll('[data-open-venue]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(btn.dataset.openVenue);
      });
    });

    document.querySelectorAll('.listing-card').forEach(card => {
      card.addEventListener('click', () => openModal(card.dataset.venueId));
    });

    // Favourites
    document.querySelectorAll('.lcard-fav').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id   = btn.dataset.fav;
        const favs = getStorage('favorites') || [];
        const idx  = favs.indexOf(id);
        if (idx === -1) {
          favs.push(id);
          btn.textContent = '❤️';
        } else {
          favs.splice(idx, 1);
          btn.textContent = '🤍';
        }
        setStorage('favorites', favs);
      });

      // Restore state
      const favs = getStorage('favorites') || [];
      if (favs.includes(btn.dataset.fav)) btn.textContent = '❤️';
    });
  }

  // ── Sidebar filter checkboxes ─────────────────────
  document.querySelectorAll('.venue-city-filter').forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) activeCities.add(cb.value);
      else activeCities.delete(cb.value);
      applyFilters();
    });
  });

  document.querySelectorAll('.venue-cap-filter').forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) activeCaps.add(cb.value);
      else activeCaps.delete(cb.value);
      applyFilters();
    });
  });

  document.getElementById('venues-sort')?.addEventListener('change', applyFilters);

  // ── Mobile filter drawer ──────────────────────────
  const overlay = document.getElementById('mobile-filter-overlay');
  document.getElementById('venues-filter-toggle')?.addEventListener('click', () => {
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  document.getElementById('mobile-filter-apply')?.addEventListener('click', () => {
    // Read mobile checkboxes
    activeCities = new Set();
    activeCaps   = new Set();
    document.querySelectorAll('.mobile-city-filter:checked').forEach(cb => activeCities.add(cb.value));
    document.querySelectorAll('.mobile-cap-filter:checked').forEach(cb => activeCaps.add(cb.value));
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
    applyFilters();
  });

  document.getElementById('mobile-filter-clear')?.addEventListener('click', () => {
    activeCities = new Set();
    activeCaps   = new Set();
    document.querySelectorAll('.mobile-city-filter,.mobile-cap-filter').forEach(cb => cb.checked = false);
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
    applyFilters();
  });

  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Global hook for home page cards
  window.nexusOpenVenue = openModal;

  bindCardEvents();
}
