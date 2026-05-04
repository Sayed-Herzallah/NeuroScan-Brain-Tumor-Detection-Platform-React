import { useApp, PAGES } from "../context/AppContext";

const NAV_ITEMS = [
  { id: "home",    page: PAGES.HOME,    label: "Home",    icon: HomeIcon },
  { id: "upload",  page: PAGES.UPLOAD,  label: "Upload",  icon: UploadIcon },
  { id: "history", page: PAGES.HISTORY, label: "History", icon: HistoryIcon },
  { id: "chat",    page: PAGES.CHAT,    label: "Chat",    icon: ChatIcon },
  { id: "profile", page: PAGES.PROFILE, label: "Profile", icon: ProfileIcon },
];

export default function Sidebar() {
  const { navigate, activeNav } = useApp();

  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>
        <BrainSvg />
        <span style={styles.logoText}>NeuroScan</span>
      </div>

      <nav style={styles.nav}>
        {NAV_ITEMS.map(item => {
          const active = activeNav === item.id;
          return (
            <button
              key={item.id}
              style={{ ...styles.navItem, ...(active ? styles.navItemActive : {}) }}
              onClick={() => navigate(item.page)}
            >
              <item.icon active={active} />
              <span style={{ ...styles.navLabel, color: active ? "#2E8B8B" : "#6B7280" }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

function HomeIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke={active ? "#2E8B8B" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}
function UploadIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke={active ? "#2E8B8B" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  );
}
function HistoryIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke={active ? "#2E8B8B" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
      <path d="M12 7v5l4 2"/>
    </svg>
  );
}
function ChatIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke={active ? "#2E8B8B" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}
function ProfileIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke={active ? "#2E8B8B" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}
function BrainSvg() {
  return (
    <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
      <path d="M6.938 3.655a5.08 5.08 0 0 1 1.192-2.273A5.07 5.07 0 0 1 10.365.118c.85-.198 1.74-.146 2.562.149C13.749.562 14.469 1.087 15 1.78c.531-.693 1.251-1.218 2.073-1.513.822-.295 1.712-.347 2.562-.149a5.07 5.07 0 0 1 2.235 1.264 5.08 5.08 0 0 1 1.192 2.273l.234 1.176.761.152a5.07 5.07 0 0 1 2.839 1.755 5.09 5.09 0 0 1 1.124 3.21v.371c0 1.361-.581 2.587-1.509 3.444a5.09 5.09 0 0 1 1.662 2.597 5.09 5.09 0 0 1-.358 3.04 5.08 5.08 0 0 1-1.938 2.303 5.07 5.07 0 0 1-2.803.773l-.069.347a5.08 5.08 0 0 1-1.5 2.829 5.07 5.07 0 0 1-2.819 1.394 5.07 5.07 0 0 1-3.07-.424A5.08 5.08 0 0 1 15 27.52a5.08 5.08 0 0 1-2.5 1.685 5.07 5.07 0 0 1-3.07.424 5.07 5.07 0 0 1-2.82-1.394 5.08 5.08 0 0 1-1.5-2.829l-.069-.347a5.07 5.07 0 0 1-2.803-.773 5.08 5.08 0 0 1-1.938-2.303 5.09 5.09 0 0 1-.358-3.04 5.09 5.09 0 0 1 1.662-2.597A5.09 5.09 0 0 1 3.114 12.2a5.09 5.09 0 0 1-.838-2.885v-.371a5.09 5.09 0 0 1 1.124-3.21A5.07 5.07 0 0 1 6.239 3.98l.761-.152.938-2.173z" fill="#2E8B8B"/>
    </svg>
  );
}

const styles = {
  sidebar:      { width: 220, background: "#fff", borderRight: "1px solid #E5E7EB", display: "flex", flexDirection: "column", padding: "24px 0", height: "100dvh", position: "sticky", top: 0 },
  logo:         { display: "flex", alignItems: "center", gap: 10, padding: "0 20px 28px" },
  logoText:     { fontSize: 18, fontWeight: 800, color: "#111", letterSpacing: "-.3px" },
  nav:          { display: "flex", flexDirection: "column", gap: 4, padding: "0 12px" },
  navItem:      { display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 12, background: "none", border: "none", cursor: "pointer", width: "100%", transition: "background .15s" },
  navItemActive:{ background: "#F0FDFA" },
  navLabel:     { fontSize: 14, fontWeight: 500 },
};
