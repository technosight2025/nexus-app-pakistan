/* =====================================================
   HOME PAGE — Cinematic Hero + Smart Sections
   ===================================================== */

import { initialVenues, initialVendors } from '../utils/mockData.js';
import { getStorage, setStorage } from '../utils/storage.js';

export function render() {
  const favorites = getStorage('favorites') || [];

  return `
<!-- ════════════════════════════════
     HERO — Cinematic Full-Screen
════════════════════════════════ -->
<section class="hero" id="home-hero">

  <div class="hero-bg">
    <img
      src="/images/hero-bg.jpg"
      alt="Luxury Pakistani Event Venue"
      loading="eager"
      onerror="this.style.display='none'"
    />
  </div>
  <div class="hero-overlay"></div>
  <div class="hero-noise"></div>

  <!-- Main Hero Content -->
  <div class="hero-body">
    <div class="hero-content container">

      <!-- LEFT: Text -->
      <div class="hero-text">
        <div class="hero-live-tag">
          <span class="live-dot"></span>
          Pakistan's #1 Event Ecosystem
        </div>

        <h1 class="hero-headline">
          Plan Your Dream Event
          <span class="gold-shimmer">in Minutes — Not Months</span>
        </h1>

        <p class="hero-sub">
          From grand Lahori weddings to Karachi corporate galas — NEXUS connects you with
          Pakistan's finest venues, caterers, decorators, and photographers. All in one place.
        </p>

        <div class="hero-cta-row">
          <a href="#/venues" class="btn btn-gold btn-lg">
            <span class="material-symbols-outlined">villa</span>
            Explore Venues
          </a>
          <a href="#/quote" class="btn btn-ghost btn-lg">
            <span class="material-symbols-outlined">calculate</span>
            Get Free Quote
          </a>
        </div>

        <div class="hero-social-proof">
          <div class="proof-avatars">
            <div class="proof-avatar">Z</div>
            <div class="proof-avatar">A</div>
            <div class="proof-avatar">F</div>
            <div class="proof-avatar">H</div>
          </div>
          <p class="proof-text">
            <strong>12,400+ events</strong> planned this year.<br />
            Join Pakistan's fastest-growing event community.
          </p>
        </div>
      </div>

      <!-- RIGHT: Budget Floating Card -->
      <div class="hero-card-col">
        <div class="hero-budget-card" id="hero-budget-card">
          <div class="hero-budget-header">
            <div>
              <div class="hbc-title">Live Budget Estimate</div>
              <div class="hbc-total" id="hbc-total">PKR 2,650,000</div>
            </div>
            <div class="live-badge">
              <span class="live-dot"></span>
              Live
            </div>
          </div>

          <div class="hbc-lines" id="hbc-lines">
            <div class="hbc-line">
              <div class="hbc-line-label">
                <div class="hbc-icon emerald">🏛️</div>
                Venue Booking
              </div>
              <div class="hbc-line-val" id="hbc-venue">PKR 950k</div>
            </div>
            <div class="hbc-line">
              <div class="hbc-line-label">
                <div class="hbc-icon gold">🍽️</div>
                Catering (per head)
              </div>
              <div class="hbc-line-val" id="hbc-catering">PKR 1,250k</div>
            </div>
            <div class="hbc-line">
              <div class="hbc-line-label">
                <div class="hbc-icon blue">📷</div>
                Photography
              </div>
              <div class="hbc-line-val" id="hbc-photo">PKR 150k</div>
            </div>
            <div class="hbc-line">
              <div class="hbc-line-label">
                <div class="hbc-icon rose">💐</div>
                Décor & Florals
              </div>
              <div class="hbc-line-val" id="hbc-decor">PKR 300k</div>
            </div>
          </div>

          <div class="hbc-divider"></div>

          <div style="margin-bottom:16px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <label style="font-size:0.75rem;color:rgba(255,255,255,0.5);font-weight:600;text-transform:uppercase;letter-spacing:0.8px;">
                Guests
              </label>
              <span style="font-family:'Outfit',sans-serif;font-size:0.82rem;font-weight:700;color:var(--gold);" id="hbc-guest-label">500 guests</span>
            </div>
            <input
              type="range"
              class="hero-range-slider"
              id="hbc-guest-slider"
              min="100"
              max="2000"
              step="50"
              value="500"
            />
          </div>

          <a href="#/quote" class="btn btn-gold" style="width:100%;justify-content:center;">
            Build Full Quote →
          </a>

          <p style="text-align:center;font-size:0.7rem;color:rgba(255,255,255,0.35);margin-top:10px;font-style:italic;">
            "Apna estimate dekhein — bilkul free"
          </p>
        </div>
      </div>

    </div><!-- /.hero-content -->
  </div><!-- /.hero-body -->

  <!-- Smart Search Bar -->
  <div class="hero-search-section" style="width:100%;">
    <div class="smart-search" id="smart-search">
      <div class="search-fields-row">
        <div class="search-field">
          <label>Event Type</label>
          <select id="search-event">
            <option value="">Shaadi / Wedding</option>
            <option>Corporate Gala</option>
            <option>Mehndi Night</option>
            <option>Walima</option>
            <option>Birthday Party</option>
          </select>
        </div>
        <div class="search-field">
          <label>City</label>
          <select id="search-city">
            <option value="">All Pakistan</option>
            <option>Lahore</option>
            <option>Karachi</option>
            <option>Islamabad</option>
            <option>Rawalpindi</option>
            <option>Faisalabad</option>
          </select>
        </div>
        <div class="search-field">
          <label>Event Date</label>
          <input type="date" id="search-date" />
        </div>
        <div class="search-field">
          <label>Guests</label>
          <input type="text" id="search-guests" placeholder="200 – 500" />
        </div>
      </div>
      <div class="search-submit-row">
        <button class="btn btn-primary" onclick="window.location.hash='#/venues'">
          <span class="material-symbols-outlined">search</span>
          Search Venues
        </button>
      </div>
    </div>
  </div>

  <!-- Stats Strip -->
  <div class="hero-stats-strip" style="width:100%;">
    <div class="stats-glass">
      <div class="stat-item">
        <span class="stat-number" data-target="1240">1,240+</span>
        <span class="stat-label">Verified Venues</span>
      </div>
      <div class="stat-item">
        <span class="stat-number" data-target="4800">4,800+</span>
        <span class="stat-label">Active Vendors</span>
      </div>
      <div class="stat-item">
        <span class="stat-number" data-target="12400">12,400+</span>
        <span class="stat-label">Events Planned</span>
      </div>
      <div class="stat-item">
        <span class="stat-number" data-target="98">98%</span>
        <span class="stat-label">Client Satisfaction</span>
      </div>
    </div>
  </div>

  <!-- Activity Ticker -->
  <div class="activity-ticker" style="width:100%;">
    <span class="ticker-dot"></span>
    <span class="ticker-text">
      🎉 Hassan & Zainab booked The Heritage Grand, Lahore &nbsp;·&nbsp;
      📷 Cinematic Arts Media confirmed 12th Nov shoot &nbsp;·&nbsp;
      🏛️ Ocean View Plaza — 2 slots available this December &nbsp;·&nbsp;
      💐 Floral Essence Decor completed Ayesha's Mehndi setup &nbsp;·&nbsp;
      🎉 Hassan & Zainab booked The Heritage Grand, Lahore &nbsp;·&nbsp;
      📷 Cinematic Arts Media confirmed 12th Nov shoot
    </span>
  </div>

</section>

<!-- ════════════════════════════════
     HOW IT WORKS
════════════════════════════════ -->
<section class="how-it-works section-pad">
  <div class="container">
    <div class="section-header" data-reveal>
      <div class="eyebrow"><span class="eyebrow-dot"></span>Simple Process</div>
      <h2 class="section-title">Plan your event in <em>4 easy steps</em></h2>
      <p class="section-sub">From search to celebration — NEXUS makes event planning as simple as ordering food online.</p>
    </div>

    <div class="steps-grid">
      <div class="step-card" data-reveal data-delay="100">
        <div class="step-number">01</div>
        <div class="step-content">
          <h4>Choose Event Type</h4>
          <p>Select your event — Shaadi, Corporate, Mehndi, or Birthday. We tailor everything to your needs.</p>
          <p class="roman-urdu mt-8">Apna event select karein</p>
        </div>
      </div>
      <div class="step-card" data-reveal data-delay="200">
        <div class="step-number">02</div>
        <div class="step-content">
          <h4>Browse & Compare</h4>
          <p>Explore venues and vendors by city, capacity, and budget. Compare packages side by side.</p>
          <p class="roman-urdu mt-8">Compare karein, best chunein</p>
        </div>
      </div>
      <div class="step-card" data-reveal data-delay="300">
        <div class="step-number">03</div>
        <div class="step-content">
          <h4>Build Your Quote</h4>
          <p>Use our live budget calculator to get a full cost breakdown. No hidden fees, ever.</p>
          <p class="roman-urdu mt-8">Budget estimate dekhein</p>
        </div>
      </div>
      <div class="step-card" data-reveal data-delay="400">
        <div class="step-number">04</div>
        <div class="step-content">
          <h4>Book & Celebrate</h4>
          <p>Confirm your booking, track vendors, and enjoy your perfect event day stress-free.</p>
          <p class="roman-urdu mt-8">Book karein, jashn manayein</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════
     FEATURED VENUES
════════════════════════════════ -->
<section class="venues-section section-pad-sm">
  <div class="container">
    <div class="carousel-header" data-reveal>
      <div>
        <div class="eyebrow"><span class="eyebrow-dot"></span>Top Picks</div>
        <h2 class="section-title" style="margin-bottom:0;">Featured <em>Venues</em></h2>
      </div>
      <a href="#/venues" class="btn btn-outline-emerald btn-sm">View All →</a>
    </div>
    <div class="carousel-scroll mt-24" id="venues-carousel">
      ${renderVenueCards(initialVenues, favorites)}
    </div>
  </div>
</section>

<!-- ════════════════════════════════
     BUDGET ESTIMATOR (Fintech Style)
════════════════════════════════ -->
<section class="budget-section section-pad" id="budget-section">
  <div class="container">
    <div class="section-header" data-reveal>
      <div class="eyebrow"><span class="eyebrow-dot"></span>Smart Planner</div>
      <h2 class="section-title">Live <em>Budget Estimator</em></h2>
      <p class="section-sub">Drag the sliders to instantly calculate your full event cost. No sign-up needed.</p>
      <p class="roman-urdu mt-8">Apna budget banayein — Total estimate dekhein</p>
    </div>

    <div class="budget-grid">
      <!-- Controls Panel -->
      <div class="budget-controls" data-reveal data-delay="100">

        <!-- Guest Count -->
        <div class="budget-group">
          <div class="budget-group-header">
            <h4>👥 Guest Count</h4>
            <span class="val-tag" id="est-guest-tag">500 guests</span>
          </div>
          <input type="range" class="range-slider" id="est-guests"
            min="50" max="2000" step="50" value="500" />
          <div class="range-labels"><span>50</span><span>500</span><span>1000</span><span>2000</span></div>
        </div>

        <!-- Catering Tier -->
        <div class="budget-group">
          <div class="budget-group-header">
            <h4>🍽️ Catering Tier</h4>
            <span class="val-tag" id="est-catering-tag">Silver — PKR 2,500/head</span>
          </div>
          <div class="service-toggle-grid">
            <div class="service-card" data-tier="1500" data-label="Standard — PKR 1,500/head">
              <span class="service-icon">🥙</span>
              <div class="service-info">
                <h5>Standard</h5>
                <div class="service-price">PKR 1,500/head</div>
              </div>
            </div>
            <div class="service-card selected" data-tier="2500" data-label="Silver — PKR 2,500/head">
              <span class="service-icon">🍽️</span>
              <div class="service-info">
                <h5>Silver</h5>
                <div class="service-price">PKR 2,500/head</div>
              </div>
            </div>
            <div class="service-card" data-tier="3800" data-label="Fusion Gold — PKR 3,800/head">
              <span class="service-icon">👨‍🍳</span>
              <div class="service-info">
                <h5>Fusion Gold</h5>
                <div class="service-price">PKR 3,800/head</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Services Add-ons -->
        <div class="budget-group">
          <div class="budget-group-header">
            <h4>✨ Extra Services</h4>
          </div>
          <div class="service-toggle-grid">
            <div class="service-card selected" data-svc="photography" data-price="150000">
              <span class="service-icon">📷</span>
              <div class="service-info">
                <h5>Photography</h5>
                <div class="service-price">PKR 150k</div>
              </div>
            </div>
            <div class="service-card selected" data-svc="decor" data-price="280000">
              <span class="service-icon">💐</span>
              <div class="service-info">
                <h5>Décor</h5>
                <div class="service-price">PKR 280k</div>
              </div>
            </div>
            <div class="service-card" data-svc="av" data-price="120000">
              <span class="service-icon">🎙️</span>
              <div class="service-info">
                <h5>Sound & AV</h5>
                <div class="service-price">PKR 120k</div>
              </div>
            </div>
            <div class="service-card" data-svc="transport" data-price="80000">
              <span class="service-icon">🚌</span>
              <div class="service-info">
                <h5>Transport</h5>
                <div class="service-price">PKR 80k</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Receipt Panel -->
      <div class="budget-receipt" id="budget-receipt" data-reveal data-delay="200">
        <div class="receipt-header">
          <div>
            <h4>Event Cost Summary</h4>
            <p>Real-time estimate — no hidden fees</p>
          </div>
          <div class="live-badge">
            <span class="live-dot"></span>
            Live
          </div>
        </div>

        <div class="receipt-items">
          <div class="receipt-item">
            <div class="ri-label"><div class="ri-icon">🏛️</div>Venue</div>
            <div class="ri-val" id="ri-venue">PKR 950,000</div>
          </div>
          <div class="receipt-item">
            <div class="ri-label"><div class="ri-icon">🍽️</div>Catering</div>
            <div class="ri-val" id="ri-catering">PKR 1,250,000</div>
          </div>
          <div class="receipt-item" id="ri-photo-row">
            <div class="ri-label"><div class="ri-icon">📷</div>Photography</div>
            <div class="ri-val" id="ri-photo">PKR 150,000</div>
          </div>
          <div class="receipt-item" id="ri-decor-row">
            <div class="ri-label"><div class="ri-icon">💐</div>Décor</div>
            <div class="ri-val" id="ri-decor">PKR 280,000</div>
          </div>
          <div class="receipt-item" id="ri-av-row" style="display:none;">
            <div class="ri-label"><div class="ri-icon">🎙️</div>Sound & AV</div>
            <div class="ri-val">PKR 120,000</div>
          </div>
          <div class="receipt-item" id="ri-transport-row" style="display:none;">
            <div class="ri-label"><div class="ri-icon">🚌</div>Transport</div>
            <div class="ri-val">PKR 80,000</div>
          </div>
        </div>

        <div class="receipt-total-row">
          <div class="total-label">Estimated Total</div>
          <div class="total-amount" id="est-total">PKR 2,630,000</div>
        </div>

        <div class="receipt-progress-bar">
          <div class="progress-fill" id="est-progress" style="width: 52%;"></div>
        </div>
        <div class="receipt-progress-labels">
          <span>Budget</span>
          <span id="est-budget-label">PKR 2,630,000 / PKR 5,000,000</span>
        </div>

        <a href="#/quote" class="btn btn-gold mt-24" style="width:100%;justify-content:center;">
          <span class="material-symbols-outlined">request_quote</span>
          Build Detailed Quote
        </a>
        <p class="roman-urdu" style="text-align:center;margin-top:8px;">"Quote generate karein — bilkul free"</p>
      </div>

    </div><!-- /.budget-grid -->
  </div>
</section>

<!-- ════════════════════════════════
     POPULAR VENDORS
════════════════════════════════ -->
<section class="section-pad-sm" style="background:var(--surface);">
  <div class="container">
    <div class="section-header" data-reveal>
      <div class="eyebrow"><span class="eyebrow-dot"></span>Top Rated</div>
      <h2 class="section-title">Trusted <em>Vendors</em></h2>
      <p class="section-sub">Pakistan's most trusted photographers, caterers, decorators & production houses.</p>
    </div>
    <div class="vendors-grid" id="vendors-home-grid">
      ${renderVendorCards(initialVendors.slice(0,4))}
    </div>
    <div style="text-align:center;margin-top:32px;" data-reveal>
      <a href="#/vendors" class="btn btn-outline-emerald btn-lg">
        Browse All Vendors →
      </a>
    </div>
  </div>
</section>

<!-- ════════════════════════════════
     CTA BANNER
════════════════════════════════ -->
<section class="section-pad" style="background:linear-gradient(135deg,var(--emerald-deep) 0%,var(--emerald) 100%);position:relative;overflow:hidden;">
  <div style="position:absolute;top:-100px;right:-100px;width:400px;height:400px;border-radius:50%;background:rgba(212,175,55,0.12);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-80px;left:-80px;width:300px;height:300px;border-radius:50%;background:rgba(255,255,255,0.04);pointer-events:none;"></div>
  <div class="container" style="text-align:center;position:relative;z-index:1;">
    <div data-reveal>
      <div class="eyebrow on-dark" style="justify-content:center;margin-bottom:16px;">
        <span class="eyebrow-dot"></span>For Vendors & Venues
      </div>
      <h2 style="font-family:'Outfit',sans-serif;font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;color:#fff;letter-spacing:-0.025em;margin-bottom:16px;">
        Are you a vendor or venue owner?<br/>
        <span class="gradient-text-gold">Join NEXUS for free.</span>
      </h2>
      <p style="font-size:1rem;color:rgba(255,255,255,0.7);max-width:520px;margin:0 auto 32px;line-height:1.7;">
        Get discovered by thousands of event planners. Manage leads, quotes, and bookings from one powerful dashboard.
      </p>
      <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
        <a href="#/dashboard" class="btn btn-gold btn-lg">
          <span class="material-symbols-outlined">manage_accounts</span>
          Open Vendor Portal
        </a>
        <a href="#/quote" class="btn btn-ghost btn-lg">
          Get Client Quotes
        </a>
      </div>
      <p class="roman-urdu" style="margin-top:16px;color:rgba(255,255,255,0.4);">"Vendor se baat karein — NEXUS ke zariye"</p>
    </div>
  </div>
</section>
`;
}

// ── Venue Cards HTML ──────────────────────────────────
function renderVenueCards(venues, favorites) {
  return venues.map(v => `
    <div class="venue-card" data-id="${v.id}" onclick="window.nexusOpenVenue && window.nexusOpenVenue('${v.id}')">
      <div class="venue-card-img" style="background-image:url('${v.image}')">
        <div class="venue-card-badge">${v.tag}</div>
      </div>
      <div class="venue-card-info">
        <div class="venue-card-name">${v.name}</div>
        <div class="venue-card-meta">
          <span class="material-symbols-outlined" style="font-size:14px;">location_on</span>
          ${v.area}, ${v.city}
        </div>
        <div class="venue-card-footer">
          <div>
            <div class="venue-card-price">${v.priceRange.split(' - ')[0]} <span>starting</span></div>
          </div>
          <div class="venue-star">
            ⭐ ${v.rating} <span style="color:var(--text-faint);font-weight:500;">(${v.reviewsCount})</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// ── Vendor Cards HTML ─────────────────────────────────
function renderVendorCards(vendors) {
  const typeEmoji = { 'Catering':'🍽️', 'Media & Film':'🎬', 'Luxury Decor':'💐', 'Tech & Production':'🎙️' };
  return vendors.map(v => `
    <div class="vendor-card" data-id="${v.id}" onclick="window.nexusOpenVendor && window.nexusOpenVendor('${v.id}')">
      <div class="vendor-avatar" style="background-image:url('${v.image}')">
        <div class="vendor-verified">✓</div>
      </div>
      <div class="vendor-info">
        <div class="vendor-name">${v.name}</div>
        <div class="vendor-type">${typeEmoji[v.type] || '🎪'} ${v.type} · ${v.city}</div>
        <div class="vendor-meta">
          <span class="vendor-rating">⭐ ${v.rating}</span>
          <span class="vendor-response">⚡ Replies in ${v.responseTime}</span>
        </div>
      </div>
      <div class="vendor-cta">
        <button class="btn btn-primary btn-sm">
          View
        </button>
      </div>
    </div>
  `).join('');
}

// ── CSS for hero budget card (injected) ───────────────
const heroCardCSS = `
  .hero-budget-card {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.14);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border-radius: 28px;
    padding: 28px;
    color: #fff;
    animation: hero-card-float 5s ease-in-out infinite;
    width: 100%;
  }

  @keyframes hero-card-float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-10px); }
  }

  .hero-budget-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
  }

  .hbc-title {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: rgba(255,255,255,0.5);
    margin-bottom: 4px;
  }

  .hbc-total {
    font-family: 'Outfit', sans-serif;
    font-size: 1.8rem;
    font-weight: 900;
    color: var(--gold);
    letter-spacing: -0.03em;
    transition: all 0.5s ease;
  }

  .hbc-lines { display:flex; flex-direction:column; gap:12px; margin-bottom:20px; }

  .hbc-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .hbc-line-label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.82rem;
    color: rgba(255,255,255,0.65);
  }

  .hbc-icon {
    width: 28px; height: 28px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    flex-shrink: 0;
  }

  .hbc-icon.emerald { background: rgba(15,91,62,0.35); }
  .hbc-icon.gold    { background: rgba(212,175,55,0.25); }
  .hbc-icon.blue    { background: rgba(37,99,235,0.25); }
  .hbc-icon.rose    { background: rgba(180,19,109,0.25); }

  .hbc-line-val {
    font-family: 'Outfit', sans-serif;
    font-size: 0.88rem;
    font-weight: 700;
    color: rgba(255,255,255,0.9);
    transition: all 0.4s ease;
  }

  .hbc-divider {
    height: 1px;
    background: rgba(255,255,255,0.10);
    margin: 4px 0 18px;
  }

  .hero-range-slider {
    -webkit-appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 9999px;
    background: rgba(255,255,255,0.15);
    outline: none;
    cursor: pointer;
  }

  .hero-range-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px; height: 20px;
    border-radius: 50%;
    background: var(--gold);
    border: 3px solid rgba(255,255,255,0.9);
    cursor: pointer;
  }

  .carousel-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 4px;
  }
`;

// ── init() — called after render ──────────────────────
export function init() {
  // Inject hero card styles
  if (!document.getElementById('nexus-hero-style')) {
    const style = document.createElement('style');
    style.id = 'nexus-hero-style';
    style.textContent = heroCardCSS;
    document.head.appendChild(style);
  }

  // ── Hero Budget Card Slider ─────────────────────────
  const hbcSlider = document.getElementById('hbc-guest-slider');
  const hbcTotal  = document.getElementById('hbc-total');
  const hbcCatering = document.getElementById('hbc-catering');
  const hbcGuest = document.getElementById('hbc-guest-label');

  function updateHeroCard(guests) {
    const cateringPPH  = 2500;
    const venue        = 950000;
    const photo        = 150000;
    const decor        = 280000;
    const catering     = guests * cateringPPH;
    const total        = venue + catering + photo + decor;

    if (hbcCatering) hbcCatering.textContent = `PKR ${(catering/1000).toFixed(0)}k`;
    if (hbcTotal)    hbcTotal.textContent    = `PKR ${total.toLocaleString()}`;
    if (hbcGuest)    hbcGuest.textContent    = `${guests} guests`;
  }

  if (hbcSlider) {
    hbcSlider.addEventListener('input', (e) => updateHeroCard(parseInt(e.target.value)));
    updateHeroCard(500);
  }

  // ── Budget Estimator Section ────────────────────────
  const estGuests    = document.getElementById('est-guests');
  const estGuestTag  = document.getElementById('est-guest-tag');
  const estCatTag    = document.getElementById('est-catering-tag');
  const estTotal     = document.getElementById('est-total');
  const estProgress  = document.getElementById('est-progress');
  const estBudgetLbl = document.getElementById('est-budget-label');

  let cateringPPH = 2500;
  let services    = { photography: 150000, decor: 280000, av: 0, transport: 0 };

  function recalcEstimate() {
    const guests   = parseInt(estGuests?.value || 500);
    const catering = guests * cateringPPH;
    const venue    = 950000;
    const extras   = Object.values(services).reduce((a, b) => a + b, 0);
    const total    = venue + catering + extras;
    const maxBudget = 5000000;
    const pct      = Math.min((total / maxBudget) * 100, 100);

    if (estTotal)     estTotal.textContent     = `PKR ${total.toLocaleString()}`;
    if (estProgress)  estProgress.style.width  = `${pct.toFixed(0)}%`;
    if (estBudgetLbl) estBudgetLbl.textContent = `PKR ${total.toLocaleString()} / PKR ${maxBudget.toLocaleString()}`;

    // Update receipt
    const riCatering = document.getElementById('ri-catering');
    if (riCatering) riCatering.textContent = `PKR ${catering.toLocaleString()}`;
  }

  if (estGuests) {
    estGuests.addEventListener('input', (e) => {
      if (estGuestTag) estGuestTag.textContent = `${e.target.value} guests`;
      recalcEstimate();
    });
  }

  // Catering tier toggles
  document.querySelectorAll('[data-tier]').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('[data-tier]').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      cateringPPH = parseInt(card.dataset.tier);
      if (estCatTag) estCatTag.textContent = card.dataset.label;
      recalcEstimate();
    });
  });

  // Service addon toggles
  document.querySelectorAll('[data-svc]').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('selected');
      const svc   = card.dataset.svc;
      const price = parseInt(card.dataset.price);

      if (card.classList.contains('selected')) {
        services[svc] = price;
      } else {
        services[svc] = 0;
      }

      // Toggle receipt row visibility
      const row = document.getElementById(`ri-${svc}-row`);
      if (row) row.style.display = services[svc] ? '' : 'none';

      recalcEstimate();
    });
  });

  recalcEstimate();
}
