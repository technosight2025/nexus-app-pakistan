/* =====================================================
   DIGITAL SIGNAGE MODULE — Screens + Playlist Editor
   ===================================================== */

import { initialScreens, initialPlaylists } from '../utils/mockData.js';
import { getStorage, setStorage } from '../utils/storage.js';

export function render() {
  const screens   = getStorage('screens')   || initialScreens;
  const playlists = getStorage('playlists') || initialPlaylists;

  const onlineCount  = screens.filter(s => s.status === 'Active').length;
  const totalScreens = screens.length;

  return `
<div class="signage-page">

  <!-- Hero Strip -->
  <div class="signage-hero">
    <div style="max-width:1280px;margin:0 auto;">
      <div class="eyebrow on-dark" style="margin-bottom:12px;">
        <span class="eyebrow-dot"></span>Digital Signage Module
      </div>
      <h1>
        <span class="material-symbols-outlined" style="font-size:1.6rem;vertical-align:middle;margin-right:8px;">tv</span>
        Display Management
      </h1>
      <p style="font-size:0.88rem;color:rgba(255,255,255,0.6);margin-top:8px;max-width:480px;">
        Manage LED screens, upload content, and schedule playlists across all event venues.
      </p>

      <!-- Stats Row -->
      <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:24px;">
        <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:14px 20px;">
          <div style="font-family:'Outfit',sans-serif;font-size:1.4rem;font-weight:900;color:var(--gold);">${onlineCount}</div>
          <div style="font-size:0.68rem;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:0.8px;">Online Screens</div>
        </div>
        <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:14px 20px;">
          <div style="font-family:'Outfit',sans-serif;font-size:1.4rem;font-weight:900;color:#fff;">${totalScreens}</div>
          <div style="font-size:0.68rem;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:0.8px;">Total Screens</div>
        </div>
        <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:14px 20px;">
          <div style="font-family:'Outfit',sans-serif;font-size:1.4rem;font-weight:900;color:#4ade80;">${playlists.length}</div>
          <div style="font-size:0.68rem;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:0.8px;">Active Playlists</div>
        </div>
      </div>

      <!-- Screen Grid -->
      <div class="screen-grid" style="margin-top:24px;">
        ${screens.map(s => `
          <div class="screen-card">
            <span class="screen-status-dot ${s.status === 'Active' ? 'online' : 'offline'}"></span>
            <div class="screen-info">
              <div class="screen-name">${s.name}</div>
              <div class="screen-meta">
                📍 ${s.location} &nbsp;·&nbsp; 🖥️ ${s.orientation}
                &nbsp;·&nbsp; 🎬 ${s.activePlaylist}
              </div>
            </div>
            <div>
              <span class="badge ${s.status === 'Active' ? 'badge-emerald' : 'badge-gold'}" style="font-size:0.65rem;">
                ${s.status}
              </span>
            </div>
          </div>
        `).join('')}

        <!-- Add Screen Button -->
        <div class="screen-card" id="add-screen-btn" style="cursor:pointer;border:2px dashed rgba(255,255,255,0.15);background:transparent;">
          <span style="font-size:1.5rem;color:rgba(255,255,255,0.3);">+</span>
          <div class="screen-info">
            <div class="screen-name" style="color:rgba(255,255,255,0.35);">Add New Screen</div>
            <div class="screen-meta">Click to register a new display</div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- Playlist Editor -->
  <div style="max-width:1280px;margin:0 auto;padding:28px 20px;">
    <div style="display:grid;gap:24px;grid-template-columns:1fr;">

      <!-- Playlist List -->
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
          <h2 style="font-family:'Outfit',sans-serif;font-size:1.1rem;font-weight:800;color:var(--text-heading);">Content Playlists</h2>
          <button class="btn btn-primary btn-sm" id="add-playlist-btn">
            <span class="material-symbols-outlined" style="font-size:16px;">add</span>
            New Playlist
          </button>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px;" id="playlists-list">
          ${playlists.map(pl => `
            <div class="playlist-editor" style="cursor:pointer;" data-playlist="${pl.id}" id="pl-${pl.id}">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                <div>
                  <h4 style="font-family:'Outfit',sans-serif;font-size:0.95rem;font-weight:700;color:var(--text-heading);margin-bottom:2px;">${pl.name}</h4>
                  <p style="font-size:0.72rem;color:var(--text-muted);">${pl.items.length} item${pl.items.length!==1?'s':''} · ${pl.duration}</p>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                  <div class="badge badge-emerald">Active</div>
                  <button class="btn btn-outline-emerald btn-sm" onclick="event.stopPropagation()">
                    <span class="material-symbols-outlined" style="font-size:16px;">edit</span>
                  </button>
                </div>
              </div>

              <!-- Playlist Items -->
              <div style="display:flex;flex-direction:column;gap:8px;" id="pl-items-${pl.id}">
                ${pl.items.map((item, idx) => `
                  <div class="playlist-item" draggable="true" data-item="${idx}" data-pl="${pl.id}"
                       ondragstart="window.nexusPlDragStart&&window.nexusPlDragStart(event,'${pl.id}',${idx})">
                    <div class="pitem-thumb" style="background-image:url('${item.url}')"></div>
                    <div style="flex:1;min-width:0;">
                      <div style="font-family:'Outfit',sans-serif;font-size:0.82rem;font-weight:700;color:var(--text-heading);">
                        ${item.type === 'image' ? '🖼️' : '🎥'} Slide ${idx + 1}
                      </div>
                      <div style="font-size:0.72rem;color:var(--text-muted);">Duration: ${item.delay}s</div>
                    </div>
                    <div style="display:flex;gap:6px;">
                      <button class="btn btn-sm" style="padding:6px;min-height:auto;border:1px solid rgba(0,0,0,0.08);border-radius:10px;color:var(--text-muted);"
                              onclick="event.stopPropagation()">
                        <span class="material-symbols-outlined" style="font-size:16px;">drag_indicator</span>
                      </button>
                      <button class="btn btn-sm" style="padding:6px;min-height:auto;border:1px solid rgba(220,38,38,0.2);border-radius:10px;color:#dc2626;"
                              data-del-item="${idx}" data-del-pl="${pl.id}"
                              onclick="event.stopPropagation();window.nexusDeleteItem&&window.nexusDeleteItem('${pl.id}',${idx})">
                        <span class="material-symbols-outlined" style="font-size:16px;">delete</span>
                      </button>
                    </div>
                  </div>
                `).join('')}

                <!-- Add Content Button -->
                <button class="btn btn-outline-emerald btn-sm" style="margin-top:4px;align-self:flex-start;"
                        data-add-to="${pl.id}">
                  <span class="material-symbols-outlined" style="font-size:16px;">add_photo_alternate</span>
                  Add Content
                </button>
              </div>

            </div>
          `).join('')}
        </div>
      </div>

      <!-- Schedule Panel -->
      <div class="playlist-editor">
        <h3 style="font-family:'Outfit',sans-serif;font-size:1rem;font-weight:800;color:var(--text-heading);margin-bottom:16px;">
          📅 Schedule Content
        </h3>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div class="quote-form-group">
            <label class="form-label">Select Screen</label>
            <select class="form-select" id="sched-screen">
              ${screens.map(s => `<option>${s.name} — ${s.location}</option>`).join('')}
            </select>
          </div>
          <div class="quote-form-group">
            <label class="form-label">Select Playlist</label>
            <select class="form-select" id="sched-playlist">
              ${playlists.map(pl => `<option>${pl.name}</option>`).join('')}
            </select>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="quote-form-group">
              <label class="form-label">Start Time</label>
              <input class="form-input" type="time" id="sched-start" value="18:00" />
            </div>
            <div class="quote-form-group">
              <label class="form-label">End Time</label>
              <input class="form-input" type="time" id="sched-end" value="23:59" />
            </div>
          </div>
          <button class="btn btn-primary" id="sched-save" style="width:100%;justify-content:center;">
            <span class="material-symbols-outlined">schedule</span>
            Schedule Broadcast
          </button>
        </div>
      </div>

    </div>
  </div>

</div>
`;
}

export function init() {
  // Schedule save
  document.getElementById('sched-save')?.addEventListener('click', () => {
    const screen   = document.getElementById('sched-screen')?.value;
    const playlist = document.getElementById('sched-playlist')?.value;
    const start    = document.getElementById('sched-start')?.value;
    const end      = document.getElementById('sched-end')?.value;

    if (!screen || !playlist) return;

    const schedules = getStorage('signage-schedules') || [];
    schedules.push({ screen, playlist, start, end, createdAt: new Date().toISOString() });
    setStorage('signage-schedules', schedules);

    const btn = document.getElementById('sched-save');
    if (btn) {
      btn.textContent = '✓ Scheduled!';
      btn.style.background = '#10B981';
      setTimeout(() => {
        btn.innerHTML = '<span class="material-symbols-outlined">schedule</span> Schedule Broadcast';
        btn.style.background = '';
      }, 2500);
    }
  });

  // Add screen modal
  document.getElementById('add-screen-btn')?.addEventListener('click', () => {
    const name     = prompt('Screen name (e.g. "Stage Left LED"):');
    const location = prompt('Location (e.g. "Monal Palace, Islamabad"):');
    if (!name || !location) return;

    const screens = getStorage('screens') || initialScreens;
    screens.push({
      id: `scr${Date.now()}`,
      name,
      location,
      status: 'Standby',
      activePlaylist: 'None',
      orientation: 'Landscape',
    });
    setStorage('screens', screens);
    window.location.hash = '#/signage';
  });

  // Add playlist
  document.getElementById('add-playlist-btn')?.addEventListener('click', () => {
    const name = prompt('Playlist name:');
    if (!name) return;
    const playlists = getStorage('playlists') || initialPlaylists;
    playlists.push({ id: `pl${Date.now()}`, name, duration: '0 mins', items: [] });
    setStorage('playlists', playlists);
    window.location.hash = '#/signage';
  });

  // Delete item
  window.nexusDeleteItem = (plId, itemIdx) => {
    const playlists = getStorage('playlists') || initialPlaylists;
    const pl = playlists.find(p => p.id === plId);
    if (pl) {
      pl.items.splice(itemIdx, 1);
      setStorage('playlists', playlists);
      window.location.hash = '#/signage';
    }
  };

  // Add content to playlist
  document.querySelectorAll('[data-add-to]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const plId = btn.dataset.addTo;
      const url  = prompt('Image URL:');
      if (!url) return;
      const playlists = getStorage('playlists') || initialPlaylists;
      const pl = playlists.find(p => p.id === plId);
      if (pl) {
        pl.items.push({ type: 'image', url, delay: 10 });
        setStorage('playlists', playlists);
        window.location.hash = '#/signage';
      }
    });
  });
}
