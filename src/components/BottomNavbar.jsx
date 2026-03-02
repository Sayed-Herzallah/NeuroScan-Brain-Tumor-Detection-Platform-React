import { useApp, PAGES } from "../context/AppContext";

// ─── Icons ────────────────────────────────────────────────────────
function HomeIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24"
      fill={active ? "#2E8B8B" : "none"}
      stroke={active ? "#2E8B8B" : "#94A3B8"}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}

function UploadIcon({ white }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={white ? "#fff" : "#2E8B8B"}
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  );
}

function HistoryIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={active ? "#2E8B8B" : "#94A3B8"}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

function ChatIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={active ? "#2E8B8B" : "#94A3B8"}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

function ProfileIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={active ? "#2E8B8B" : "#94A3B8"}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M20 21a8 8 0 1 0-16 0"/>
    </svg>
  );
}

// ─── BottomNavbar + Desktop Sidebar ───────────────────────────────
export default function BottomNavbar() {
  const { activeNav, navigate, page, user } = useApp();

  const isHome    = activeNav === "home"    || page === PAGES.HOME;
  const isHistory = activeNav === "history" || page === PAGES.HISTORY;
  const isChat    = activeNav === "chat"    || page === PAGES.CHAT;
  const isProfile = activeNav === "profile" || page === PAGES.PROFILE;
  const isUpload  = activeNav === "upload"  || page === PAGES.UPLOAD;

  return (
    <nav className="navbar">

      {/* ══════════════════════════════
          DESKTOP SIDEBAR ONLY
          (hidden on mobile via CSS)
         ══════════════════════════════ */}

      {/* Logo */}
      <div className="sidebar-logo">
        <div style={{
          width: 34, height: 34, borderRadius: 9,
          background: "linear-gradient(135deg,#2E8B8B,#1d6e6e)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 44 44" fill="none">
            <path d="M10.1763 5.36113C10.4265 4.10483 11.0336 2.94728 11.9248 2.02715C12.8161 1.10702 13.9537 0.463328 15.2014 0.173169C16.4491-0.116989 17.754-0.0413073 18.9598 0.391149C20.1656 0.823606 21.2211 1.5945 22 2.61149C22.7789 1.5945 23.8344 0.823606 25.0402 0.391149C26.246-0.0413073 27.5509-0.116989 28.7986 0.173169C30.0463 0.463328 31.1839 1.10702 32.0752 2.02715C32.9664 2.94728 33.5735 4.10483 33.8237 5.36113L34.1674 7.08516L35.2838 7.30788C36.9652 7.64515 38.4781 8.55414 39.5653 9.88043C40.6525 11.2067 41.247 12.8685 41.2478 14.5834V15.1279C41.2478 17.1241 40.3954 18.9224 39.0343 20.1789C40.6968 21.0027 42.0615 22.3238 42.9387 23.9587C43.816 25.5936 44.1622 27.4611 43.9294 29.3018C43.6966 31.1426 42.8963 32.8651 41.6396 34.2301C40.3829 35.5951 38.7323 36.5348 36.9171 36.9188L36.8153 37.4274C36.4985 39.0125 35.7189 40.4682 34.5749 41.6103C33.431 42.7524 31.9742 43.5297 30.3885 43.844C28.8029 44.1583 27.1597 43.9954 25.6666 43.376C24.1735 42.7566 22.8975 41.7085 22 40.3641C21.1025 41.7085 19.8265 42.7566 18.3334 43.376C16.8403 43.9954 15.1971 44.1583 13.6115 43.844C12.0258 43.5297 10.569 42.7524 9.42505 41.6103C8.28112 40.4682 7.50148 39.0125 7.18467 37.4274L7.08293 36.9188C5.26768 36.5348 3.61707 35.5951 2.36041 34.2301C1.10374 32.8651 0.303411 31.1426 0.0705967 29.3018C-0.162217 27.4611 0.184045 25.5936 1.06128 23.9587C1.93852 22.3238 3.30317 21.0027 4.96567 20.1789C3.60455 18.9224 2.75217 17.1241 2.75217 15.1279V14.5834C2.75297 12.8685 3.34748 11.2067 4.4347 9.88043C5.52191 8.55414 7.03477 7.64515 8.71624 7.30788L9.83262 7.08791L10.1763 5.36113Z" fill="white"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", lineHeight: 1.2 }}>Brain Tumor AI</div>
          <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 1 }}>Detection System v2.0</div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div className="sidebar-label">MAIN</div>

      {/* Home */}
      <div className={`nav-item ${isHome ? "active" : ""}`} onClick={() => navigate(PAGES.HOME)}>
        <HomeIcon active={isHome} />
        <span>Home</span>
        {/* active indicator — desktop only */}
        {isHome && (
          <span className="nav-active-dot" />
        )}
      </div>

      {/* Upload */}
      <div className="nav-item nav-upload" onClick={() => navigate(PAGES.UPLOAD)}>
        {/* mobile: FAB circle | desktop: icon inside button */}
        <div className="nav-fab">
          <UploadIcon white />
        </div>
        <span>Upload Scan</span>
      </div>

      {/* History */}
      <div className={`nav-item ${isHistory ? "active" : ""}`} onClick={() => navigate(PAGES.HISTORY)}>
        <HistoryIcon active={isHistory} />
        <span>History</span>
        {isHistory && <span className="nav-active-dot" />}
      </div>

      {/* ── TOOLS ── */}
      <div className="sidebar-label">TOOLS</div>

      {/* AI Chat */}
      <div className={`nav-item ${isChat ? "active" : ""}`} onClick={() => navigate(PAGES.CHAT)}>
        <ChatIcon active={isChat} />
        <span>AI Chat</span>
        {isChat && <span className="nav-active-dot" />}
      </div>

      {/* Profile */}
      <div className={`nav-item ${isProfile ? "active" : ""}`} onClick={() => navigate(PAGES.PROFILE)}>
        <ProfileIcon active={isProfile} />
        <span>Profile</span>
        {isProfile && <span className="nav-active-dot" />}
      </div>

      {/* ══════════════════════════════
          DESKTOP FOOTER — user card
         ══════════════════════════════ */}
      <div className="sidebar-footer">
        <div
          onClick={() => navigate(PAGES.PROFILE)}
          style={{
            display: "flex", alignItems: "center", gap: 9,
            padding: "10px 12px", borderRadius: 10,
            cursor: "pointer", transition: "background .15s",
            marginBottom: 4,
          }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--primary-lighter)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          {/* avatar */}
          <div style={{
            width: 32, height: 32, borderRadius: "50%", flexShrink: 0, overflow: "hidden",
            background: "#e8f5f5", border: "2px solid var(--primary-light)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {user?.avatarUrl
              ? <img src={user.avatarUrl} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E8B8B" strokeWidth="1.8">
                  <circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/>
                </svg>
            }
          </div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#111827", lineHeight: 1.2 }}>
              {user?.name || "User"}
            </div>
            <div style={{ fontSize: 10, color: "#9ca3af" }}>Patient</div>
          </div>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </div>
        <div style={{ fontSize: 10, color: "#d1d5db", textAlign: "center", paddingTop: 8, borderTop: "1px solid var(--border-light)" }}>
          Brain Tumor AI v2.0
        </div>
      </div>

    </nav>
  );
}