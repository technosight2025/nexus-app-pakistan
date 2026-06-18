/* =====================================================
   VENDOR DASHBOARD — CRM Kanban + Calendar + Revenue
   ===================================================== */

import { initialLeads } from '../utils/mockData.js';
import { getStorage, setStorage } from '../utils/storage.js';

const KANBAN_COLS = [
  { id: 'new',         label: 'New Leads',      color: '#3B82F6', bg: '#EEF4FF' },
  { id: 'contacted',   label: 'Contacted',       color: '#8B5CF6', bg: '#F5F3FF' },
  { id: 'sent',        label: 'Quote Sent',      color: '#F59E0B', bg: '#FEF3C7' },
  { id: 'negotiating', label: 'Negotiating',     color: '#EC4899', bg: '#FDF2F8' },
  { id: 'confirmed',   label: 'Confirmed 🎉',    color: '#10B981', bg: '#ECFDF5' },
];

const REVENUE_DATA = [
  { month: 'Jan', val: 420000 },
  { month: 'Feb', val: 680000 },
  { month: 'Mar', val: 520000 },
  { month: 'Apr', val: 890000 },
  { month: 'May', val: 750000 },
  { month: 'Jun', val: 1100000 },
  { month: 'Jul', val: 980000 },
];

const DASH_TABS = [
  { id: 'overview',  icon: 'dashboard',        label: 'Overview'    },
  { id: 'kanban',    icon: 'view_kanban',       label: 'CRM Board'   },
  { id: 'calendar',  icon: 'calendar_month',    label: 'Calendar'    },
  { id: 'quotes',    icon: 'request_quote',     label: 'My Quotes'   },
];

export function render(query) {
  const activeSub = query?.get('sub') || 'overview';

  return `
<div class="dashboard-layout">

  <!-- ════ SIDEBAR (desktop) ════ -->
  <aside class="dash-sidebar" id="dash-sidebar">
    <div class="sidebar-logo">NEXUS<span>.pk</span></div>

    ${DASH_TABS.map(t => `
      <a href="#/dashboard?sub=${t.id}"
         class="dash-nav-link${t.id === activeSub ? ' active' : ''}"
         data-sub="${t.id}">
        <span class="material-symbols-outlined">${t.icon}</span>
        ${t.label}
      </a>
    `).join('')}

    <div style="margin-top:auto;padding-top:24px;border-top:1px solid rgba(255,255,255,0.08);">
      <a href="#/signage" class="dash-nav-link">
        <span class="material-symbols-outlined">tv</span>
        Digital Signage
      </a>
      <a href="#/home" class="dash-nav-link">
        <span class="material-symbols-outlined">store</span>
        Marketplace
      </a>
    </div>
  </aside>

  <!-- ════ MAIN CONTENT ════ -->
  <div class="dash-main">

    <!-- Mobile Tabs -->
    <div style="display:flex;gap:4px;overflow-x:auto;margin-bottom:24px;padding-bottom:4px;scrollbar-width:none;">
      ${DASH_TABS.map(t => `
        <a href="#/dashboard?sub=${t.id}"
           style="display:inline-flex;align-items:center;gap:6px;
                  padding:10px 16px;border-radius:999px;white-space:nowrap;
                  font-family:'Outfit',sans-serif;font-size:0.8rem;font-weight:700;
                  background:${t.id===activeSub?'var(--emerald)':'var(--surface)'};
                  color:${t.id===activeSub?'#fff':'var(--text-muted)'};
                  box-shadow:${t.id===activeSub?'var(--shadow-emerald)':'var(--shadow-xs)'};
                  border:1px solid ${t.id===activeSub?'transparent':'rgba(0,0,0,0.06)'};
                  transition:all 0.2s ease;">
          <span class="material-symbols-outlined" style="font-size:16px;">${t.icon}</span>
          ${t.label}
        </a>
      `).join('')}
    </div>

    <!-- ─── OVERVIEW ─── -->
    ${activeSub === 'overview' ? renderOverview() : ''}

    <!-- ─── KANBAN ─── -->
    ${activeSub === 'kanban' ? renderKanban() : ''}

    <!-- ─── CALENDAR ─── -->
    ${activeSub === 'calendar' ? renderCalendar() : ''}

    <!-- ─── QUOTES ─── -->
    ${activeSub === 'quotes' ? renderSavedQuotes() : ''}

  </div>
</div>
`;
}

// ── Overview Section ──────────────────────────────────
function renderOverview() {
  const leads = getStorage('leads') || initialLeads;
  const confirmedLeads = leads.filter(l => l.status === 'confirmed');
  const totalRevenue = confirmedLeads.reduce((sum, l) => {
    const num = parseInt(l.budget?.replace(/[^0-9]/g,'')) || 0;
    return sum + num;
  }, 0);

  return `
    <div class="dash-topbar">
      <div>
        <h2>Good evening, Ali! 👋</h2>
        <p style="font-size:0.82rem;color:var(--text-muted);margin-top:2px;">Here's your vendor dashboard overview.</p>
      </div>
      <a href="#/dashboard?sub=kanban" class="btn btn-primary btn-sm">
        <span class="material-symbols-outlined" style="font-size:16px;">add</span>
        New Lead
      </a>
    </div>

    <!-- KPI Cards -->
    <div class="kpi-cards">
      <div class="kpi-card">
        <div class="kpi-icon emerald">
          <span class="material-symbols-outlined">payments</span>
        </div>
        <div class="kpi-value">PKR ${(totalRevenue/1000000).toFixed(1)}M</div>
        <div class="kpi-label">Total Revenue</div>
        <span class="kpi-change up">↑ 24% this month</span>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon blue">
          <span class="material-symbols-outlined">groups</span>
        </div>
        <div class="kpi-value">${leads.length}</div>
        <div class="kpi-label">Total Leads</div>
        <span class="kpi-change up">↑ 12 this week</span>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon gold">
          <span class="material-symbols-outlined">check_circle</span>
        </div>
        <div class="kpi-value">${confirmedLeads.length}</div>
        <div class="kpi-label">Confirmed Events</div>
        <span class="kpi-change up">↑ 3 new</span>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon rose">
          <span class="material-symbols-outlined">star</span>
        </div>
        <div class="kpi-value">4.9</div>
        <div class="kpi-label">Average Rating</div>
        <span class="kpi-change up">✓ Excellent</span>
      </div>
    </div>

    <!-- Revenue Chart -->
    <div class="chart-area">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
        <div>
          <h3 style="font-family:'Outfit',sans-serif;font-size:1rem;font-weight:800;color:var(--text-heading);">Monthly Revenue</h3>
          <p style="font-size:0.75rem;color:var(--text-muted);">Jan – Jul 2026</p>
        </div>
        <div class="badge badge-emerald">PKR in thousands</div>
      </div>
      <div class="chart-bars" id="revenue-chart">
        ${REVENUE_DATA.map(d => {
          const maxVal = Math.max(...REVENUE_DATA.map(r => r.val));
          const pct = (d.val / maxVal * 100).toFixed(0);
          return `
            <div class="chart-bar-wrap">
              <div class="chart-bar" style="height:0%;" data-target-height="${pct}%"
                   data-val="PKR ${(d.val/1000).toFixed(0)}k"></div>
              <span class="chart-bar-label">${d.month}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Recent Leads -->
    <div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
        <h3 style="font-family:'Outfit',sans-serif;font-size:1rem;font-weight:800;color:var(--text-heading);">Recent Leads</h3>
        <a href="#/dashboard?sub=kanban" class="btn btn-outline-emerald btn-sm">View All →</a>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${(getStorage('leads') || initialLeads).slice(0,4).map(lead => {
          const col = KANBAN_COLS.find(c => c.id === lead.status);
          return `
            <div style="display:flex;align-items:center;gap:14px;padding:14px 16px;background:var(--surface);border-radius:16px;border:1px solid rgba(0,0,0,0.05);box-shadow:var(--shadow-xs);">
              <div style="flex:1;min-width:0;">
                <div style="font-family:'Outfit',sans-serif;font-size:0.9rem;font-weight:700;color:var(--text-heading);margin-bottom:3px;">${lead.client_name}</div>
                <div style="font-size:0.75rem;color:var(--text-muted);">${lead.event_type} · ${lead.guests} guests · ${lead.event_date}</div>
              </div>
              <div>
                <span class="badge" style="background:${col?.bg};color:${col?.color};border:1px solid ${col?.color}30;">
                  ${col?.label || lead.status}
                </span>
              </div>
              <div style="font-family:'Outfit',sans-serif;font-size:0.85rem;font-weight:700;color:var(--emerald);flex-shrink:0;">
                ${lead.budget}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// ── Kanban Board ──────────────────────────────────────
function renderKanban() {
  const leads = getStorage('leads') || initialLeads;

  return `
    <div class="dash-topbar">
      <h2>CRM Kanban Board</h2>
      <button class="btn btn-primary btn-sm" id="add-lead-btn">
        <span class="material-symbols-outlined" style="font-size:16px;">add</span>
        Add Lead
      </button>
    </div>

    <div class="kanban-board" id="kanban-board">
      ${KANBAN_COLS.map(col => {
        const colLeads = leads.filter(l => l.status === col.id);
        return `
          <div class="kanban-col" data-col="${col.id}">
            <div class="kanban-col-header" style="background:${col.bg};color:${col.color};">
              ${col.label}
              <span style="background:${col.color}22;color:${col.color};padding:2px 8px;border-radius:999px;font-size:0.68rem;">${colLeads.length}</span>
            </div>
            <div class="kanban-col-body" id="col-${col.id}"
                 ondragover="event.preventDefault()"
                 ondrop="window.nexusDrop && window.nexusDrop(event,'${col.id}')">
              ${colLeads.map(lead => renderKanbanCard(lead)).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderKanbanCard(lead) {
  return `
    <div class="kanban-card" draggable="true" data-lead-id="${lead.id}"
         ondragstart="window.nexusDragStart && window.nexusDragStart(event,'${lead.id}')">
      <div class="kcard-name">${lead.client_name}</div>
      <div class="kcard-meta">
        📅 ${lead.event_date} · 👥 ${lead.guests} guests
      </div>
      <div class="kcard-footer">
        <span class="badge badge-gold">${lead.event_type}</span>
        <span style="font-family:'Outfit',sans-serif;font-size:0.78rem;font-weight:700;color:var(--emerald);">${lead.budget}</span>
      </div>
    </div>
  `;
}

// ── Calendar Section ──────────────────────────────────
function renderCalendar() {
  const leads   = getStorage('leads') || initialLeads;
  const eventDates = new Set(leads.map(l => l.event_date));

  const today   = new Date(2026, 5, 4); // June 2026
  const year    = today.getFullYear();
  const month   = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay    = new Date(year, month, 1).getDay();

  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  return `
    <div class="dash-topbar">
      <h2>Event Calendar — June 2026</h2>
    </div>

    <div style="display:grid;gap:24px;grid-template-columns:1fr;" id="cal-layout">
      <!-- Calendar Grid -->
      <div class="chart-area">
        <div class="cal-grid">
          ${dayNames.map(d => `<div class="cal-header-day">${d}</div>`).join('')}
          ${Array(firstDay).fill('<div class="cal-day empty"></div>').join('')}
          ${Array.from({length: daysInMonth}, (_, i) => {
            const day  = i + 1;
            const dateStr = `2026-06-${String(day).padStart(2,'0')}`;
            const isToday = day === today.getDate();
            const hasEvt  = eventDates.has(dateStr);
            return `
              <div class="cal-day${isToday?' today':''}${hasEvt?' has-event':''}" title="${hasEvt?'Event booked':''}">
                ${day}
              </div>
            `;
          }).join('')}
        </div>

        <div style="display:flex;gap:12px;margin-top:16px;flex-wrap:wrap;">
          <span style="display:flex;align-items:center;gap:6px;font-size:0.75rem;color:var(--text-muted);">
            <span style="width:10px;height:10px;border-radius:50%;background:var(--emerald);display:inline-block;"></span>
            Today
          </span>
          <span style="display:flex;align-items:center;gap:6px;font-size:0.75rem;color:var(--text-muted);">
            <span style="width:10px;height:10px;border-radius:50%;background:var(--gold);display:inline-block;"></span>
            Event Booked
          </span>
        </div>
      </div>

      <!-- Upcoming Events -->
      <div>
        <h3 style="font-family:'Outfit',sans-serif;font-size:1rem;font-weight:800;color:var(--text-heading);margin-bottom:14px;">
          Upcoming Events
        </h3>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${(getStorage('leads') || initialLeads)
            .filter(l => l.event_date >= '2026-06-01')
            .sort((a,b) => a.event_date.localeCompare(b.event_date))
            .slice(0,6)
            .map(lead => {
              const col = KANBAN_COLS.find(c => c.id === lead.status);
              return `
                <div style="display:flex;gap:14px;align-items:center;padding:14px 16px;background:var(--surface);border-radius:16px;border:1px solid rgba(0,0,0,0.05);">
                  <div style="background:var(--emerald-light);border-radius:12px;padding:10px 14px;text-align:center;flex-shrink:0;">
                    <div style="font-family:'Outfit',sans-serif;font-size:1.1rem;font-weight:900;color:var(--emerald);">
                      ${new Date(lead.event_date).getDate()}
                    </div>
                    <div style="font-size:0.6rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;">Jun</div>
                  </div>
                  <div style="flex:1;min-width:0;">
                    <div style="font-family:'Outfit',sans-serif;font-size:0.9rem;font-weight:700;color:var(--text-heading);">${lead.client_name}</div>
                    <div style="font-size:0.75rem;color:var(--text-muted);">${lead.event_type} · ${lead.guests} guests</div>
                  </div>
                  <span class="badge" style="background:${col?.bg};color:${col?.color};border:1px solid ${col?.color}30;flex-shrink:0;">
                    ${col?.label}
                  </span>
                </div>
              `;
            }).join('')}
        </div>
      </div>
    </div>
  `;
}

// ── Saved Quotes ──────────────────────────────────────
function renderSavedQuotes() {
  const quotes = getStorage('quotes') || [];
  return `
    <div class="dash-topbar">
      <h2>My Saved Quotes</h2>
      <a href="#/quote" class="btn btn-primary btn-sm">
        <span class="material-symbols-outlined" style="font-size:16px;">add</span>
        New Quote
      </a>
    </div>

    ${quotes.length === 0 ? `
      <div style="text-align:center;padding:60px 20px;color:var(--text-muted);">
        <div style="font-size:3rem;margin-bottom:14px;">📋</div>
        <h3 style="font-family:'Outfit',sans-serif;font-size:1.1rem;font-weight:700;">No quotes yet</h3>
        <p style="margin:8px 0 20px;">Build your first quote using the Quote Builder.</p>
        <a href="#/quote" class="btn btn-primary">Build a Quote →</a>
      </div>
    ` : `
      <div style="display:grid;gap:14px;">
        ${quotes.map(q => `
          <div style="background:var(--surface);border-radius:20px;padding:20px;border:1px solid rgba(0,0,0,0.05);box-shadow:var(--shadow-xs);">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px;">
              <div>
                <div style="font-family:'Outfit',sans-serif;font-size:1rem;font-weight:700;color:var(--text-heading);margin-bottom:4px;">
                  ${q.eventType ? q.eventType.charAt(0).toUpperCase() + q.eventType.slice(1) : 'Event'} Quote
                </div>
                <div style="font-size:0.78rem;color:var(--text-muted);">
                  📍 ${q.city || 'TBD'} &nbsp;·&nbsp; 📅 ${q.date || 'TBD'} &nbsp;·&nbsp; 👥 ${q.guests} guests
                </div>
              </div>
              <div style="font-family:'Outfit',sans-serif;font-size:1.1rem;font-weight:900;color:var(--emerald);flex-shrink:0;">
                PKR ${(q.total||0).toLocaleString()}
              </div>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:6px;">
              ${(q.services||[]).map(s => `<span class="badge badge-gold">${s}</span>`).join('')}
            </div>
            <div style="font-size:0.7rem;color:var(--text-faint);margin-top:10px;">
              Created: ${new Date(q.createdAt).toLocaleDateString('en-PK')}
            </div>
          </div>
        `).join('')}
      </div>
    `}
  `;
}

// ── init() ────────────────────────────────────────────
export function init(query) {
  const activeSub = query?.get('sub') || 'overview';

  // Animate revenue chart bars
  if (activeSub === 'overview') {
    setTimeout(() => {
      document.querySelectorAll('.chart-bar').forEach(bar => {
        const target = bar.dataset.targetHeight;
        bar.style.height = target;
      });
    }, 300);
  }

  // Kanban drag & drop
  if (activeSub === 'kanban') {
    let dragId = null;

    window.nexusDragStart = (e, id) => {
      dragId = id;
      setTimeout(() => e.target.classList.add('dragging'), 0);
    };

    window.nexusDrop = (e, colId) => {
      e.preventDefault();
      if (!dragId) return;

      const leads = getStorage('leads') || initialLeads;
      const lead  = leads.find(l => l.id === dragId);
      if (lead) lead.status = colId;
      setStorage('leads', leads);

      // Re-render kanban
      const board = document.getElementById('kanban-board');
      if (board) {
        board.innerHTML = '';
        KANBAN_COLS.forEach(col => {
          const colLeads = leads.filter(l => l.status === col.id);
          const colEl = document.createElement('div');
          colEl.className = 'kanban-col';
          colEl.dataset.col = col.id;
          colEl.innerHTML = `
            <div class="kanban-col-header" style="background:${col.bg};color:${col.color};">
              ${col.label}
              <span style="background:${col.color}22;color:${col.color};padding:2px 8px;border-radius:999px;font-size:0.68rem;">${colLeads.length}</span>
            </div>
            <div class="kanban-col-body" id="col-${col.id}"
                 ondragover="event.preventDefault()"
                 ondrop="window.nexusDrop && window.nexusDrop(event,'${col.id}')">
              ${colLeads.map(l => renderKanbanCard(l)).join('')}
            </div>
          `;
          board.appendChild(colEl);
        });

        // Re-bind drag events
        board.querySelectorAll('.kanban-card').forEach(card => {
          card.addEventListener('dragend', () => card.classList.remove('dragging'));
        });
      }

      dragId = null;
    };

    document.querySelectorAll('.kanban-card').forEach(card => {
      card.addEventListener('dragend', () => card.classList.remove('dragging'));
    });

    // Column drag-over highlight
    document.querySelectorAll('.kanban-col-body').forEach(col => {
      col.addEventListener('dragover', () => col.classList.add('drag-over'));
      col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
      col.addEventListener('drop', () => col.classList.remove('drag-over'));
    });
  }
}
