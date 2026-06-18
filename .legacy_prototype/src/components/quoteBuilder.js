/* =====================================================
   QUOTE BUILDER — 3-Step Wizard + Live Calculator
   ===================================================== */

import { getStorage, setStorage } from '../utils/storage.js';

const EVENT_TYPES = [
  { id: 'wedding',   icon: '💍', label: 'Shaadi / Wedding',  base: 1500000 },
  { id: 'mehndi',    icon: '🌿', label: 'Mehndi Night',       base: 600000  },
  { id: 'walima',    icon: '🎊', label: 'Walima Reception',   base: 1200000 },
  { id: 'corporate', icon: '🏢', label: 'Corporate Gala',     base: 800000  },
  { id: 'birthday',  icon: '🎂', label: 'Birthday Party',     base: 300000  },
  { id: 'engagement',icon: '💎', label: 'Engagement',         base: 450000  },
  { id: 'qawwali',   icon: '🎵', label: 'Qawwali / Concert',  base: 700000  },
  { id: 'other',     icon: '✨', label: 'Other Event',         base: 500000  },
];

const SERVICES = [
  { id: 'venue',      icon: '🏛️', label: 'Venue Booking',     price: 950000  },
  { id: 'catering',   icon: '🍽️', label: 'Catering',           price: 1250000 },
  { id: 'photography',icon: '📷', label: 'Photography & Film', price: 150000  },
  { id: 'decor',      icon: '💐', label: 'Floral Décor',       price: 280000  },
  { id: 'av',         icon: '🎙️', label: 'Sound & AV',         price: 120000  },
  { id: 'transport',  icon: '🚌', label: 'Guest Transport',    price: 80000   },
  { id: 'security',   icon: '🛡️', label: 'Security Staff',     price: 60000   },
  { id: 'signage',    icon: '📺', label: 'Digital Signage',    price: 45000   },
];

let state = {
  step:      1,
  eventType: '',
  city:      '',
  date:      '',
  guests:    300,
  services:  new Set(['venue','catering','photography','decor']),
};

export function render() {
  return `
<div class="quote-page">

  <!-- Gradient Header -->
  <div class="quote-header">
    <div class="eyebrow on-dark" style="justify-content:center;margin-bottom:12px;">
      <span class="eyebrow-dot"></span>Smart Quote Builder
    </div>
    <h1>Build Your Event Budget</h1>
    <p>Get an accurate estimate in under 2 minutes — no sign-up needed</p>
    <p class="roman-urdu" style="color:rgba(255,255,255,0.4);margin-top:6px;">"Apna budget banayein — bilkul free"</p>
  </div>

  <!-- Progress Bar -->
  <div class="quote-progress" id="quote-progress">
    <div class="progress-step active" id="ps-1">
      <div class="step-dot">1</div>
      <span class="step-label">Event Type</span>
    </div>
    <div class="step-line" id="sl-1"></div>

    <div class="progress-step" id="ps-2">
      <div class="step-dot">2</div>
      <span class="step-label">Details</span>
    </div>
    <div class="step-line" id="sl-2"></div>

    <div class="progress-step" id="ps-3">
      <div class="step-dot">3</div>
      <span class="step-label">Services</span>
    </div>
  </div>

  <!-- Quote Steps Body -->
  <div class="quote-body">

    <!-- ─── STEP 1: Event Type ─── -->
    <div class="quote-step active" id="step-1">
      <h2 class="quote-step-title">What type of event are you planning?</h2>
      <p class="quote-step-sub">Select the event type to get tailored recommendations.</p>
      <p class="roman-urdu mb-16">Apna event select karein</p>

      <div class="event-type-grid" id="event-type-grid">
        ${EVENT_TYPES.map(e => `
          <button class="event-type-btn" data-event="${e.id}" data-base="${e.base}">
            <span class="event-icon">${e.icon}</span>
            <span>${e.label}</span>
          </button>
        `).join('')}
      </div>

      <div class="quote-nav-row">
        <button class="btn btn-primary w-full" id="step1-next" disabled style="opacity:0.5;">
          Next: Event Details →
        </button>
      </div>
    </div>

    <!-- ─── STEP 2: Event Details ─── -->
    <div class="quote-step" id="step-2">
      <h2 class="quote-step-title">Tell us about your event</h2>
      <p class="quote-step-sub">We'll use this to tailor your estimate.</p>

      <div class="quote-form-group">
        <label class="form-label">📍 City</label>
        <select class="form-select" id="q-city">
          <option value="">Select city...</option>
          ${['Lahore','Karachi','Islamabad','Rawalpindi','Faisalabad','Multan','Peshawar','Quetta'].map(c =>
            `<option value="${c}">${c}</option>`
          ).join('')}
        </select>
      </div>

      <div class="quote-form-group">
        <label class="form-label">📅 Event Date</label>
        <input class="form-input" type="date" id="q-date" />
      </div>

      <div class="quote-form-group">
        <label class="form-label">
          👥 Expected Guests &nbsp;
          <span style="font-family:'Outfit',sans-serif;font-size:0.82rem;font-weight:700;color:var(--emerald);" id="guests-display">300</span>
        </label>
        <input type="range" class="range-slider" id="q-guests" min="50" max="3000" step="50" value="300"
          style="width:100%;display:block;margin:6px 0 4px;" />
        <div class="range-labels">
          <span>50</span><span>500</span><span>1,000</span><span>2,000</span><span>3,000</span>
        </div>
      </div>

      <div class="quote-form-group">
        <label class="form-label">💬 Special Requirements (optional)</label>
        <textarea class="form-input" id="q-notes" rows="3" placeholder="e.g. Mughal theme stage, live Qawwali, halal menu only..."></textarea>
      </div>

      <div class="quote-nav-row">
        <button class="btn btn-outline-emerald" id="step2-back" style="flex:1;">← Back</button>
        <button class="btn btn-primary" id="step2-next" style="flex:2;">Next: Services →</button>
      </div>
    </div>

    <!-- ─── STEP 3: Services ─── -->
    <div class="quote-step" id="step-3">
      <h2 class="quote-step-title">Which services do you need?</h2>
      <p class="quote-step-sub">Select all services to include in your estimate.</p>
      <p class="roman-urdu mb-16">Services chunein — total estimate dekhein</p>

      <div class="services-select-grid" id="services-grid">
        ${SERVICES.map(s => `
          <div class="svc-option${state.services.has(s.id)?' selected':''}" data-svc="${s.id}" data-price="${s.price}">
            <span style="font-size:1.3rem;">${s.icon}</span>
            <div style="flex:1;min-width:0;">
              <div style="font-family:'Outfit',sans-serif;font-size:0.82rem;font-weight:700;color:var(--text-heading);">${s.label}</div>
              <div style="font-size:0.7rem;color:var(--emerald);font-weight:700;">+PKR ${(s.price/1000).toFixed(0)}k</div>
            </div>
            <div class="svc-check">${state.services.has(s.id)?'✓':''}</div>
          </div>
        `).join('')}
      </div>

      <div class="quote-nav-row">
        <button class="btn btn-outline-emerald" id="step3-back" style="flex:1;">← Back</button>
        <button class="btn btn-gold" id="step3-submit" style="flex:2;">
          <span class="material-symbols-outlined">check_circle</span>
          Save Quote
        </button>
      </div>
    </div>

    <!-- ─── SUCCESS STATE ─── -->
    <div class="quote-step" id="step-success">
      <div style="text-align:center;padding:40px 20px;">
        <div style="font-size:4rem;margin-bottom:20px;animation:hero-card-float 2s ease infinite;">🎉</div>
        <h2 style="font-family:'Outfit',sans-serif;font-size:1.4rem;font-weight:900;color:var(--text-heading);margin-bottom:10px;">
          Your Quote is Saved!
        </h2>
        <p style="color:var(--text-muted);margin-bottom:24px;line-height:1.6;" id="success-summary">
          <!-- injected dynamically -->
        </p>

        <div style="background:var(--dark-card);border-radius:20px;padding:24px;margin:0 auto 28px;max-width:340px;color:#fff;">
          <div style="font-size:0.7rem;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.8px;margin-bottom:4px;">Estimated Total</div>
          <div style="font-family:'Outfit',sans-serif;font-size:2.4rem;font-weight:900;color:var(--gold);letter-spacing:-0.03em;" id="success-total">
            PKR 0
          </div>
          <div style="font-size:0.75rem;color:rgba(255,255,255,0.35);margin-top:4px;">*Estimate only. Actual pricing may vary.</div>
        </div>

        <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">
          <a href="#/vendors" class="btn btn-primary">Find Vendors Now</a>
          <button class="btn btn-outline-emerald" id="start-new-quote">Start New Quote</button>
        </div>
        <p class="roman-urdu" style="margin-top:16px;">"Aap ki event plan ho gayi — Mubarak ho! 🎊"</p>
      </div>
    </div>

  </div><!-- /.quote-body -->

  <!-- Floating Summary Bar (desktop) -->
  <div class="quote-summary-bar" id="quote-summary-bar">
    <div>
      <div class="qsb-total-label">Estimated Total</div>
      <div class="qsb-amount" id="qsb-total">PKR 0</div>
    </div>
    <button class="btn btn-gold btn-sm" id="qsb-action">Next Step →</button>
  </div>

</div><!-- /.quote-page -->
`;
}

// ── Calculate Total ────────────────────────────────────
function calcTotal() {
  let total = 0;
  const guestMultiplier = Math.max(1, state.guests / 300);

  state.services.forEach(svcId => {
    const svc = SERVICES.find(s => s.id === svcId);
    if (!svc) return;
    if (svcId === 'catering') {
      total += svc.price * guestMultiplier;
    } else {
      total += svc.price;
    }
  });

  return Math.round(total);
}

// ── Update Summary Bar ─────────────────────────────────
function updateSummary() {
  const total   = calcTotal();
  const totalEl = document.getElementById('qsb-total');
  if (totalEl) totalEl.textContent = `PKR ${total.toLocaleString()}`;
}

// ── Navigate Steps ─────────────────────────────────────
function goToStep(n) {
  state.step = n;
  document.querySelectorAll('.quote-step').forEach((el, i) => {
    el.classList.toggle('active', i + 1 === n || (n === 4 && i === 3));
  });

  // Update progress indicators
  for (let i = 1; i <= 3; i++) {
    const ps = document.getElementById(`ps-${i}`);
    if (!ps) continue;
    ps.classList.toggle('active', i === n);
    ps.classList.toggle('done', i < n);
    const sl = document.getElementById(`sl-${i}`);
    if (sl) sl.classList.toggle('done', i < n);
  }

  updateSummary();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── init() ────────────────────────────────────────────
export function init() {
  // ── STEP 1 ──────────────────────────────────────────
  document.querySelectorAll('.event-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.event-type-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.eventType = btn.dataset.event;

      const step1Next = document.getElementById('step1-next');
      if (step1Next) { step1Next.disabled = false; step1Next.style.opacity = '1'; }
    });
  });

  document.getElementById('step1-next')?.addEventListener('click', () => {
    if (!state.eventType) return;
    goToStep(2);
  });

  // ── STEP 2 ──────────────────────────────────────────
  const guestsSlider  = document.getElementById('q-guests');
  const guestsDisplay = document.getElementById('guests-display');

  guestsSlider?.addEventListener('input', (e) => {
    state.guests = parseInt(e.target.value);
    if (guestsDisplay) guestsDisplay.textContent = state.guests.toLocaleString();
    updateSummary();
  });

  document.getElementById('step2-next')?.addEventListener('click', () => {
    state.city = document.getElementById('q-city')?.value || '';
    state.date = document.getElementById('q-date')?.value || '';
    goToStep(3);
  });

  document.getElementById('step2-back')?.addEventListener('click', () => goToStep(1));

  // ── STEP 3 ──────────────────────────────────────────
  document.querySelectorAll('.svc-option').forEach(card => {
    card.addEventListener('click', () => {
      const svc = card.dataset.svc;
      card.classList.toggle('selected');
      const check = card.querySelector('.svc-check');

      if (card.classList.contains('selected')) {
        state.services.add(svc);
        if (check) check.textContent = '✓';
      } else {
        state.services.delete(svc);
        if (check) check.textContent = '';
      }

      updateSummary();
    });
  });

  document.getElementById('step3-back')?.addEventListener('click', () => goToStep(2));

  document.getElementById('step3-submit')?.addEventListener('click', () => {
    const total = calcTotal();

    // Save quote to localStorage
    const quotes = getStorage('quotes') || [];
    quotes.push({
      id:        `q${Date.now()}`,
      eventType: state.eventType,
      city:      state.city,
      date:      state.date,
      guests:    state.guests,
      services:  [...state.services],
      total:     total,
      createdAt: new Date().toISOString(),
    });
    setStorage('quotes', quotes);

    // Show success
    const successTotal   = document.getElementById('success-total');
    const successSummary = document.getElementById('success-summary');

    if (successTotal)   successTotal.textContent = `PKR ${total.toLocaleString()}`;
    if (successSummary) successSummary.innerHTML = `
      <strong>${state.guests} guests</strong> · ${state.city || 'Location TBD'} ·
      ${state.date || 'Date TBD'}<br/>
      <strong>${state.services.size} services</strong> selected
    `;

    goToStep(4);
  });

  // ── Start New ─────────────────────────────────────
  document.getElementById('start-new-quote')?.addEventListener('click', () => {
    state = {
      step:      1,
      eventType: '',
      city:      '',
      date:      '',
      guests:    300,
      services:  new Set(['venue','catering','photography','decor']),
    };
    document.querySelectorAll('.event-type-btn').forEach(b => b.classList.remove('selected'));
    const step1Next = document.getElementById('step1-next');
    if (step1Next) { step1Next.disabled = true; step1Next.style.opacity = '0.5'; }
    goToStep(1);
  });

  // ── QSB Action button ─────────────────────────────
  document.getElementById('qsb-action')?.addEventListener('click', () => {
    if (state.step < 3) goToStep(state.step + 1);
    else document.getElementById('step3-submit')?.click();
  });

  updateSummary();
}
