/* =====================================================
   VENDORS — Portfolio Cards + Package Modal + Chat
   ===================================================== */

import { initialVendors } from '../utils/mockData.js';

const TYPE_EMOJI = {
  'Catering':         '🍽️',
  'Media & Film':     '🎬',
  'Luxury Decor':     '💐',
  'Tech & Production':'🎙️',
};

const TYPES = ['All', 'Catering', 'Media & Film', 'Luxury Decor', 'Tech & Production'];

export function render() {
  return `
<!-- ════════════════════════════════
     VENDORS PAGE
════════════════════════════════ -->
<div style="padding-top:80px;min-height:100vh;">

  <!-- Hero Strip -->
  <div style="background:linear-gradient(135deg,var(--dark-card) 0%,var(--dark-surface) 100%);padding:40px 20px 36px;position:relative;overflow:hidden;">
    <div style="position:absolute;top:-60px;right:-60px;width:260px;height:260px;border-radius:50%;background:rgba(212,175,55,0.1);pointer-events:none;"></div>
    <div style="max-width:1280px;margin:0 auto;">
      <div class="eyebrow on-dark" style="margin-bottom:10px;"><span class="eyebrow-dot"></span>Top Rated Professionals</div>
      <h1 style="font-family:'Outfit',sans-serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:900;color:#fff;letter-spacing:-0.025em;margin-bottom:8px;">
        Pakistan's Best <span style="color:var(--gold);">Event Vendors</span>
      </h1>
      <p style="font-size:0.88rem;color:rgba(255,255,255,0.6);max-width:480px;">
        Verified photographers, caterers, decorators, and production houses — all at your fingertips.
      </p>
    </div>
  </div>

  <!-- Category Filter Tabs -->
  <div style="background:var(--surface);border-bottom:1px solid rgba(0,0,0,0.06);position:sticky;top:0;z-index:100;">
    <div style="max-width:1280px;margin:0 auto;padding:0 20px;display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;padding-bottom:1px;">
      ${TYPES.map((t, i) => `
        <button class="vendor-type-tab${i===0?' active':''}" data-type="${t}" style="
          display:flex;align-items:center;gap:6px;
          padding:14px 18px;
          border-bottom:2px solid ${i===0?'var(--emerald)':'transparent'};
          font-family:'Outfit',sans-serif;
          font-size:0.82rem;font-weight:700;
          color:${i===0?'var(--emerald)':'var(--text-muted)'};
          white-space:nowrap;transition:all 0.2s;cursor:pointer;background:none;border-top:none;border-left:none;border-right:none;
        ">
          ${t === 'All' ? '✨' : TYPE_EMOJI[t] || '🎪'} ${t}
        </button>
      `).join('')}
    </div>
  </div>

  <!-- Vendors Grid -->
  <div style="max-width:1280px;margin:0 auto;padding:28px 20px;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;gap:12px;flex-wrap:wrap;">
      <span style="font-size:0.85rem;color:var(--text-muted);" id="vendor-count">
        ${initialVendors.length} vendors found
      </span>
      <div style="display:flex;gap:8px;align-items:center;">
        <select id="vendor-sort" style="border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:8px 12px;font-size:0.82rem;font-family:'Inter',sans-serif;background:var(--surface);outline:none;color:var(--text-body);">
          <option>Sort: Highest Rated</option>
          <option>Sort: Response Time</option>
          <option>Sort: Most Reviews</option>
        </select>
      </div>
    </div>

    <div class="vendor-listing-grid" id="vendors-grid">
      ${renderVendorCards(initialVendors)}
    </div>
  </div>

</div>

<!-- ════════════ VENDOR DETAIL MODAL ════════════ -->
<div class="modal-overlay" id="vendor-detail-modal">
  <div class="modal-sheet" id="vendor-modal-sheet">
    <!-- injected -->
  </div>
</div>
`;
}

// ── Vendor Cards ──────────────────────────────────────
function renderVendorCards(vendors) {
  if (!vendors.length) return `
    <div style="text-align:center;padding:60px 20px;color:var(--text-muted);">
      <div style="font-size:3rem;margin-bottom:12px;">🔍</div>
      <h3 style="font-family:'Outfit',sans-serif;">No vendors in this category</h3>
    </div>
  `;

  return `
    <div style="display:grid;gap:20px;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));">
      ${vendors.map(v => `
        <div class="listing-card" data-vendor-id="${v.id}" style="cursor:pointer;">
          <div class="lcard-img" style="background-image:url('${v.image}');height:180px;">
            <div class="lcard-badges">
              <span class="badge badge-gold">${v.type}</span>
            </div>
          </div>
          <div class="lcard-body">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:8px;">
              <h3 class="lcard-name" style="margin-bottom:0;">${v.name}</h3>
              <span style="font-family:'Outfit',sans-serif;font-size:0.8rem;font-weight:700;color:var(--gold-rich);flex-shrink:0;">
                ⭐ ${v.rating}
              </span>
            </div>
            <div class="lcard-location">
              <span class="material-symbols-outlined" style="font-size:14px;">location_on</span>
              ${v.city} &nbsp;·&nbsp; ${v.reviewsCount} reviews
            </div>

            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;">
              ${v.specialties.map(s => `<span class="badge badge-emerald">${s}</span>`).join('')}
            </div>

            <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-top:1px solid rgba(0,0,0,0.05);">
              <div style="flex:1;">
                <div style="font-family:'Outfit',sans-serif;font-size:0.72rem;font-weight:700;color:var(--text-faint);text-transform:uppercase;letter-spacing:0.8px;">Starting from</div>
                <div style="font-family:'Outfit',sans-serif;font-size:0.95rem;font-weight:800;color:var(--emerald);">
                  PKR ${(Object.values(v.packages)[0].price).toLocaleString()}
                </div>
              </div>
              <div style="font-size:0.72rem;color:var(--text-muted);">⚡ Replies in ${v.responseTime}</div>
              <button class="btn btn-primary btn-sm" data-open-vendor="${v.id}">
                View Packages
              </button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ── Vendor Modal Content ──────────────────────────────
function renderVendorModal(vendor) {
  const pkgs = Object.entries(vendor.packages);
  const pkgLabels = { bronze: '🥉 Bronze', silver: '🥈 Silver', gold: '🥇 Gold' };

  return `
    <div class="modal-handle"></div>
    <button class="modal-close-btn" id="close-vendor-modal">✕</button>

    <div class="modal-hero-img" style="background-image:url('${vendor.image}')"></div>

    <div class="modal-body">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px;">
        <div>
          <h2 class="modal-title">${vendor.name}</h2>
          <div class="modal-sub">
            <span class="material-symbols-outlined" style="font-size:15px;">location_on</span>
            ${vendor.city} &nbsp;·&nbsp; ⭐ ${vendor.rating} (${vendor.reviewsCount} reviews)
            &nbsp;·&nbsp; <span style="color:#22c55e;font-weight:700;">⚡ ${vendor.responseTime}</span>
          </div>
        </div>
        <span class="badge badge-gold">${vendor.type}</span>
      </div>

      <!-- Specialties -->
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px;">
        ${vendor.specialties.map(s => `<span class="badge badge-emerald">${s}</span>`).join('')}
      </div>

      <!-- Reviews -->
      ${vendor.reviews?.length ? `
        <div class="modal-section-title">Client Reviews</div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px;">
          ${vendor.reviews.map(r => `
            <div style="background:var(--canvas);border-radius:16px;padding:14px;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                <div style="font-family:'Outfit',sans-serif;font-size:0.85rem;font-weight:700;color:var(--text-heading);">${r.author}</div>
                <span style="color:var(--gold-rich);font-size:0.8rem;">⭐ ${r.rating}/5</span>
              </div>
              <p style="font-size:0.8rem;color:var(--text-muted);font-style:italic;line-height:1.5;">"${r.comment}"</p>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Packages -->
      <div class="modal-section-title">Service Packages</div>
      <div class="pkg-cards" id="vendor-pkg-cards">
        ${pkgs.map(([tier, pkg], i) => `
          <div class="pkg-card${i===1?' selected':''}${tier==='gold'?' gold-pkg':''}" data-pkg="${tier}">
            <div class="pkg-header">
              <div class="pkg-name">${pkgLabels[tier] || tier} — ${pkg.name}</div>
              <div class="pkg-price">PKR ${pkg.price.toLocaleString()}</div>
            </div>
            <div class="pkg-desc">${pkg.desc}</div>
          </div>
        `).join('')}
      </div>

      <!-- Chat Simulator -->
      <div class="chat-window" id="chat-window">
        <div class="chat-header">
          <div class="chat-header-dot"></div>
          <div class="chat-header-name">${vendor.name}</div>
          <span style="font-size:0.7rem;color:var(--emerald);font-weight:700;">Online now</span>
        </div>
        <div class="chat-messages" id="chat-messages">
          <div class="chat-msg vendor">
            Assalamualaikum! 👋 Welcome to ${vendor.name}. How can I help you plan your event today?
          </div>
        </div>
        <div class="chat-input-row">
          <input class="chat-input" id="chat-input" type="text" placeholder="Type your message..." />
          <button class="btn btn-primary btn-sm" id="chat-send" style="flex-shrink:0;">Send</button>
        </div>
      </div>

      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:20px;">
        <a href="#/quote" class="btn btn-primary" style="flex:2;justify-content:center;">
          <span class="material-symbols-outlined">request_quote</span>
          Get Full Quote
        </a>
        <button class="btn btn-outline-emerald" style="flex:1;" onclick="alert('📞 Calling ${vendor.name}...')">
          📞 Call Now
        </button>
      </div>
      <p class="roman-urdu" style="text-align:center;margin-top:10px;">"Vendor se baat karein"</p>
    </div>
  `;
}

// ── Chat Responses ─────────────────────────────────────
const autoReplies = [
  "Bilkul! We have packages available for your event date. 📅",
  "Our team will be happy to customize a special package for you! ✨",
  "Aap ki event ke liye hum best deal denge! Let me check availability.",
  "Please share your event date and guest count — I'll prepare a quote right away! 📋",
  "Shukriya! We are fully booked in December but have slots available in January. 🗓️",
];

let replyIdx = 0;

// ── init() ────────────────────────────────────────────
export function init() {
  let activeType = 'All';

  function filterAndRender() {
    const shown = activeType === 'All' ? initialVendors : initialVendors.filter(v => v.type === activeType);
    const grid  = document.getElementById('vendors-grid');
    if (grid) grid.innerHTML = renderVendorCards(shown);
    const cnt = document.getElementById('vendor-count');
    if (cnt) cnt.textContent = `${shown.length} vendor${shown.length !== 1 ? 's' : ''} found`;
    bindCardEvents();
  }

  // Type filter tabs
  document.querySelectorAll('.vendor-type-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.vendor-type-tab').forEach(t => {
        t.classList.remove('active');
        t.style.color = 'var(--text-muted)';
        t.style.borderBottomColor = 'transparent';
      });
      tab.classList.add('active');
      tab.style.color = 'var(--emerald)';
      tab.style.borderBottomColor = 'var(--emerald)';
      activeType = tab.dataset.type;
      filterAndRender();
    });
  });

  function openVendorModal(vendorId) {
    const vendor  = initialVendors.find(v => v.id === vendorId);
    if (!vendor) return;
    const overlay = document.getElementById('vendor-detail-modal');
    const sheet   = document.getElementById('vendor-modal-sheet');
    if (!overlay || !sheet) return;
    sheet.innerHTML = renderVendorModal(vendor);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    document.getElementById('close-vendor-modal')?.addEventListener('click', () => {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) { overlay.classList.remove('open'); document.body.style.overflow = ''; }
    });

    // Package selection
    document.querySelectorAll('[data-pkg]').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('[data-pkg]').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });

    // Chat simulator
    const chatInput   = document.getElementById('chat-input');
    const chatSend    = document.getElementById('chat-send');
    const chatMessages= document.getElementById('chat-messages');

    function sendMsg() {
      const text = chatInput?.value.trim();
      if (!text || !chatMessages) return;
      chatMessages.innerHTML += `<div class="chat-msg user">${text}</div>`;
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;
      setTimeout(() => {
        const reply = autoReplies[replyIdx % autoReplies.length];
        replyIdx++;
        chatMessages.innerHTML += `<div class="chat-msg vendor">${reply}</div>`;
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1200);
    }

    chatSend?.addEventListener('click', sendMsg);
    chatInput?.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMsg(); });
  }

  function bindCardEvents() {
    document.querySelectorAll('[data-open-vendor]').forEach(btn => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); openVendorModal(btn.dataset.openVendor); });
    });
    document.querySelectorAll('[data-vendor-id]').forEach(card => {
      card.addEventListener('click', () => openVendorModal(card.dataset.vendorId));
    });
  }

  // Global hook
  window.nexusOpenVendor = openVendorModal;

  bindCardEvents();
}
