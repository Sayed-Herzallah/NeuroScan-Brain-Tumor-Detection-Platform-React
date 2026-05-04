import { useApp, PAGES } from "../context/AppContext";

const NAV_ITEMS = [
  { id: "home",    page: PAGES.HOME,    label: "Home",    icon: HomeIcon },
  { id: "upload",  page: PAGES.UPLOAD,  label: "Upload",  icon: UploadIcon },
  { id: "history", page: PAGES.HISTORY, label: "History", icon: HistoryIcon },
  { id: "chat",    page: PAGES.CHAT,    label: "Chat",    icon: ChatIcon },
  { id: "profile", page: PAGES.PROFILE, label: "Profile", icon: ProfileIcon },
];

export default function BottomNavbar() {
  const { navigate, activeNav } = useApp();

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <nav style={styles.nav}>
        {NAV_ITEMS.map(item => {
          const active = activeNav === item.id;
          return (
            <button
              key={item.id}
              style={{ ...styles.navItem, ...(item.id === "upload" ? styles.uploadItem : {}) }}
              onClick={() => navigate(item.page)}
            >
              {item.id === "upload" ? (
                <div style={styles.uploadCircle}>
                  <item.icon active={true} />
                </div>
              ) : (
                <>
                  <item.icon active={active} />
                  <span style={{ ...styles.label, color: active ? "#2E8B8B" : "#9CA3AF" }}>
                    {item.label}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </nav>
    </>
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
function UploadIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
         stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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

const styles = {
  nav:         { position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #E5E7EB", display: "flex", justifyContent: "space-around", alignItems: "center", padding: "8px 0 16px", zIndex: 100 },
  navItem:     { display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", padding: "4px 12px", minWidth: 52 },
  uploadItem:  { position: "relative", top: -14 },
  uploadCircle:{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg, #2E8B8B, #0d3d3d)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(46,139,139,.4)" },
  label:       { fontSize: 10, fontWeight: 500 },
};
