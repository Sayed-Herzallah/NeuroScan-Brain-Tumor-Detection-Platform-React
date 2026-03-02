import { useApp, PAGES } from "../context/AppContext";
import { useState, useEffect } from "react";

const NAV = [
  {
    group: "MAIN",
    items: [
      { page: PAGES.HOME, label: "Home", icon: (active) => (
        <svg width="17" height="17" viewBox="0 0 24 24"
          fill={active ? "#2a9d8f" : "none"}
          stroke={active ? "#2a9d8f" : "#9ca3af"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )},
      { page: PAGES.UPLOAD, label: "Upload Scan", accent: true, icon: () => (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
          stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      )},
      { page: PAGES.HISTORY, label: "History", icon: (active) => (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
          stroke={active ? "#2a9d8f" : "#9ca3af"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      )},
    ],
  },
  {
    group: "TOOLS",
    items: [
      { page: PAGES.CHAT, label: "AI Chat", icon: (active) => (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
          stroke={active ? "#2a9d8f" : "#9ca3af"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      )},
      { page: PAGES.PROFILE, label: "Profile", icon: (active) => (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
          stroke={active ? "#2a9d8f" : "#9ca3af"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/>
        </svg>
      )},
    ],
  },
];

const NO_SIDEBAR_PAGES = [
  PAGES.SPLASH, PAGES.SIGN_IN, PAGES.SIGN_UP,
  PAGES.FORGOT_PASSWORD, PAGES.OTP, PAGES.RESET_PASSWORD,
];

export function useSidebar() {
  const { page } = useApp();
  return !NO_SIDEBAR_PAGES.includes(page);
}

export default function Sidebar() {
  const { page: currentPage, navigate } = useApp();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const d = window.innerWidth >= 1024;
      setIsDesktop(d);
      if (d) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (NO_SIDEBAR_PAGES.includes(currentPage)) return null;
  if (!isDesktop && !mobileOpen) return null;

  return (
    <>
      <style>{`
        @keyframes sidebarSlideIn {
          from { opacity:0; transform:translateX(-16px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes overlayFadeIn {
          from { opacity:0; }
          to   { opacity:1; }
        }

        .sb-aside {
          width: 220px;
          min-height: 100vh;
          background: #fff;
          border-right: 1px solid #f0f0f0;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0; left: 0; bottom: 0;
          z-index: 160;
          box-shadow: 2px 0 20px rgba(0,0,0,0.05);
          animation: sidebarSlideIn 0.3s ease;
        }

        .sb-logo-area {
          display: flex;
          align-items: center;
          padding: 16px 14px 13px;
          border-bottom: 1px solid #f5f5f5;
          margin-bottom: 6px;
          overflow: hidden;
        }

        .sb-group-label {
          font-size: 10px;
          font-weight: 700;
          color: #d1d5db;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          padding: 14px 20px 5px;
        }

        .sb-nav-item {
          display: flex;
          align-items: center;
          gap: 11px;
          width: calc(100% - 20px);
          padding: 10px 14px;
          margin: 2px 10px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-family: inherit;
          position: relative;
          overflow: hidden;
          transition: background 0.18s, transform 0.18s;
        }
        .sb-nav-item::before {
          content: "";
          position: absolute; inset: 0;
          background: radial-gradient(circle at center, rgba(42,157,143,0.12) 0%, transparent 70%);
          opacity: 0; transform: scale(0.5);
          transition: opacity 0.3s, transform 0.4s;
        }
        .sb-nav-item:hover::before { opacity: 1; transform: scale(1); }
        .sb-nav-item:not(.accent):not(.active):hover {
          background: #f8fffe;
          transform: translateX(3px);
        }
        .sb-nav-item.active {
          background: linear-gradient(135deg, #e8f5f5 0%, #f0fafa 100%);
        }
        .sb-nav-item.accent {
          background: linear-gradient(135deg, #2a9d8f 0%, #22877a 100%);
          box-shadow: 0 4px 14px rgba(42,157,143,0.28);
          transition: box-shadow 0.2s, transform 0.18s;
        }
        .sb-nav-item.accent:hover {
          box-shadow: 0 6px 20px rgba(42,157,143,0.4);
          transform: translateY(-1px) translateX(2px);
        }
        .sb-nav-item.accent:active, .sb-nav-item:active { transform: scale(0.97); }

        .sb-nav-item.active::after {
          content: "";
          position: absolute;
          left: -10px; top: 20%; bottom: 20%;
          width: 3px;
          background: #2a9d8f;
          border-radius: 0 3px 3px 0;
          animation: sidebarSlideIn 0.2s ease;
        }

        .sb-nav-label {
          font-size: 13px; font-weight: 500;
          transition: color 0.18s;
        }
        .sb-nav-label.active   { color: #2a9d8f; font-weight: 600; }
        .sb-nav-label.accent   { color: #fff; font-weight: 600; }
        .sb-nav-label.inactive { color: #6b7280; }
        .sb-nav-item:not(.accent):not(.active):hover .sb-nav-label.inactive { color: #374151; }

        .sb-icon-wrap {
          width: 30px; height: 30px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px;
          transition: transform 0.2s;
          flex-shrink: 0;
        }
        .sb-nav-item:hover .sb-icon-wrap { transform: scale(1.12); }
        .sb-icon-wrap.active   { background: rgba(42,157,143,0.1); }
        .sb-icon-wrap.accent   { background: rgba(255,255,255,0.18); }
        .sb-icon-wrap.inactive { background: transparent; }
      `}</style>

      {!isDesktop && mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{
          position:"fixed", inset:0,
          background:"rgba(0,0,0,0.28)",
          zIndex:150,
          animation:"overlayFadeIn 0.2s ease",
          backdropFilter:"blur(2px)",
        }}/>
      )}

      <aside className="sb-aside">

        {/* ── Logo: Brain icon + BrainTumor text ── */}
        <div className="sb-logo-area">
          <svg width="26" height="26" viewBox="0 0 36 36" fill="none" style={{ flexShrink:0 }}>
            <path d="M13.9384 3.65532C14.109 2.79874 14.5229 2.00951 15.1306 1.38215C15.7382 0.754789 16.5139 0.315905 17.3646 0.11807C18.2153 -0.0797653 19.105 -0.028164 19.9271 0.266693C20.7492 0.56155 21.4689 1.08716 22 1.78056C22.5311 1.08716 23.2508 0.56155 24.0729 0.266693C24.895 -0.028164 25.7847 -0.0797653 26.6354 0.11807C27.4861 0.315905 28.2618 0.754789 28.8694 1.38215C29.4771 2.00951 29.891 2.79874 30.0616 3.65532L30.2959 4.83079L31.0571 4.98264C32.2036 5.2126 33.2351 5.83237 33.9763 6.73666C34.7176 7.64094 35.123 8.77397 35.1235 9.94324V10.3144C35.1235 11.6755 34.5423 12.9016 33.6143 13.7584C34.7478 14.32 35.6783 15.2208 36.2764 16.3355C36.8745 17.4502 37.1106 18.7235 36.9519 19.9785C36.7931 21.2336 36.2474 22.408 35.3906 23.3387C34.5338 24.2694 33.4084 24.9101 32.1707 25.1719L32.1014 25.5187C31.8854 26.5995 31.3538 27.5919 30.5738 28.3706C29.7939 29.1493 28.8006 29.6793 27.7194 29.8936C26.6383 30.1079 25.5179 29.9969 24.4999 29.5746C23.4819 29.1522 22.6119 28.4376 22 27.5209C21.3881 28.4376 20.5181 29.1522 19.5001 29.5746C18.4821 29.9969 17.3617 30.1079 16.2806 29.8936C15.1994 29.6793 14.2061 29.1493 13.4262 28.3706C12.6462 27.5919 12.1146 26.5995 11.8986 25.5187L11.8293 25.1719C10.5916 24.9101 9.46619 24.2694 8.60937 23.3387C7.75255 22.408 7.20687 21.2336 7.04813 19.9785C6.8894 18.7235 7.12549 17.4502 7.7236 16.3355C8.32172 15.2208 9.25216 14.32 10.3857 13.7584C9.90999 13.3196 9.53031 12.7871 9.27057 12.1944C9.01083 11.6017 8.87665 10.9616 8.87648 10.3144V9.94324C8.87703 8.77397 9.28238 7.64094 10.0237 6.73666C10.7649 5.83237 11.7964 5.2126 12.9429 4.98264L13.7041 4.83266L13.9384 3.65532Z"
              fill="#2a9d8f"/>
          </svg>
          <span style={{
            marginLeft: 8, fontSize: 15, fontWeight: 800,
            color: "#1a6b62", letterSpacing: "-0.4px", whiteSpace:"nowrap",
          }}>
            Brain<span style={{ color:"#2a9d8f" }}>Tumor</span>
          </span>
        </div>

        {/* ── Nav ── */}
        <nav style={{ flex:1, overflowY:"auto", padding:"0 0 12px" }}>
          {NAV.map((group) => (
            <div key={group.group}>
              <div className="sb-group-label">{group.group}</div>
              {group.items.map((item) => {
                const active = currentPage === item.page;
                const cls = item.accent ? "accent" : active ? "active" : "";
                return (
                  <button key={item.page}
                    onClick={() => { navigate(item.page); setMobileOpen(false); }}
                    className={`sb-nav-item ${cls}`}>
                    <span className={`sb-icon-wrap ${cls}`}>{item.icon(active)}</span>
                    <span className={`sb-nav-label ${cls || "inactive"}`}>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}