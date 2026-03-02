import { useApp } from "../context/AppContext";

// ─── TopBar ───────────────────────────────────────────────────────
function ArrowBack() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M5 12l7 7M5 12l7-7"/>
    </svg>
  );
}

export function TopBar({ title, onBack, rightElement }) {
  const { goBack } = useApp();
  const handleBack = onBack || goBack;

  return (
    <div className="topbar">
      <button className="back-btn" onClick={handleBack} aria-label="Go back">
        <ArrowBack />
      </button>
      <span className="topbar-title">{title}</span>
      <div style={{ width: 38 }}>{rightElement || null}</div>
    </div>
  );
}

export default TopBar;