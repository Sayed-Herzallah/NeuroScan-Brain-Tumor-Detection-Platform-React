import { useState, useEffect } from "react";
import { useApp, PAGES } from "../context/AppContext";
import { apiGetDashboard } from "../services/api";

export default function HomePage() {
  const { navigate, user, history } = useApp();
  const [dashboard, setDashboard]   = useState(null);

  useEffect(() => {
    apiGetDashboard()
      .then(d => setDashboard(d))
      .catch(() => null);
  }, []);

  const totalScans   = dashboard?.totalScans   ?? history.length ?? 0;
  const malignant    = dashboard?.malignantCount ?? history.filter(h => h.result?.toLowerCase().includes("malign")).length;
  const benign       = dashboard?.benignCount    ?? history.filter(h => h.result?.toLowerCase().includes("benign")).length;
  const accuracy     = dashboard?.accuracy      ?? "95%";
  const lastScan     = history[0];

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.greeting}>Good day, {user.name?.split(" ")[0] || "User"} 👋</div>
          <div style={styles.subtitle}>Your AI brain scan dashboard</div>
        </div>
        <div style={styles.avatar}>
          {user.avatarUrl
            ? <img src={user.avatarUrl} alt="avatar" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
            : <span style={styles.avatarLetter}>{(user.name || "U")[0].toUpperCase()}</span>
          }
        </div>
      </div>

      {/* Stats row */}
      <div style={styles.statsRow}>
        <StatCard label="Total Scans" value={totalScans} icon="🧠" color="#E0F7FA" iconBg="#B2EBF2" />
        <StatCard label="Malignant"   value={malignant}  icon="⚠️"  color="#FFF3E0" iconBg="#FFE0B2" />
        <StatCard label="Benign"      value={benign}     icon="✅"  color="#E8F5E9" iconBg="#C8E6C9" />
      </div>

      {/* Quick scan card */}
      <div style={styles.scanCard} onClick={() => navigate(PAGES.UPLOAD)}>
        <div style={styles.scanCardLeft}>
          <div style={styles.scanCardTitle}>Upload New MRI Scan</div>
          <div style={styles.scanCardSub}>Get an AI-powered analysis in seconds</div>
          <div style={styles.scanBtn}>Analyze Now →</div>
        </div>
        <div style={{ fontSize: 56 }}>🧬</div>
      </div>

      {/* Accuracy banner */}
      <div style={styles.accuracyBanner}>
        <div style={styles.accuracyLeft}>
          <div style={styles.accuracyLabel}>Model Accuracy</div>
          <div style={styles.accuracyValue}>{typeof accuracy === "number" ? `${accuracy}%` : accuracy}</div>
        </div>
        <div style={{ fontSize: 32 }}>🎯</div>
      </div>

      {/* Recent scans */}
      {history.length > 0 && (
        <div>
          <div style={styles.sectionTitle}>Recent Scans</div>
          {history.slice(0, 3).map(item => (
            <HistoryRow key={item.id} item={item} onClick={() => navigate(PAGES.HISTORY)} />
          ))}
          {history.length > 3 && (
            <div style={styles.viewAll} onClick={() => navigate(PAGES.HISTORY)}>
              View all {history.length} scans →
            </div>
          )}
        </div>
      )}

      {history.length === 0 && (
        <div style={styles.emptyState}>
          <div style={{ fontSize: 48 }}>🔬</div>
          <div style={{ fontWeight: 600, color: "#374151", marginTop: 8 }}>No scans yet</div>
          <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>Upload your first MRI scan to get started</div>
          <button style={styles.uploadBtn} onClick={() => navigate(PAGES.UPLOAD)}>Upload Scan</button>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, color, iconBg }) {
  return (
    <div style={{ ...styles.statCard, background: color }}>
      <div style={{ ...styles.statIcon, background: iconBg }}>{icon}</div>
      <div style={styles.statValue}>{value}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  );
}

function HistoryRow({ item, onClick }) {
  const isMalignant = item.result?.toLowerCase().includes("malign");
  return (
    <div style={styles.historyRow} onClick={onClick}>
      <div style={{ ...styles.historyDot, background: isMalignant ? "#EF4444" : "#10B981" }} />
      <div style={{ flex: 1 }}>
        <div style={styles.historyResult}>{item.result || "Unknown"}</div>
        <div style={styles.historyDate}>{item.date} · {item.time}</div>
      </div>
      <div style={{ ...styles.historyBadge, background: isMalignant ? "#FEE2E2" : "#D1FAE5", color: isMalignant ? "#DC2626" : "#065F46" }}>
        {item.confidence}%
      </div>
    </div>
  );
}

const styles = {
  page:          { padding: "24px 20px 24px", maxWidth: 600, margin: "0 auto" },
  header:        { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  greeting:      { fontSize: 20, fontWeight: 700, color: "#111" },
  subtitle:      { fontSize: 13, color: "#9CA3AF", marginTop: 2 },
  avatar:        { width: 44, height: 44, borderRadius: "50%", background: "#E0F7FA", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  avatarLetter:  { fontSize: 18, fontWeight: 700, color: "#2E8B8B" },
  statsRow:      { display: "flex", gap: 12, marginBottom: 20 },
  statCard:      { flex: 1, borderRadius: 14, padding: "14px 10px", display: "flex", flexDirection: "column", gap: 4 },
  statIcon:      { width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, marginBottom: 4 },
  statValue:     { fontSize: 22, fontWeight: 800, color: "#111" },
  statLabel:     { fontSize: 11, color: "#6B7280", fontWeight: 500 },
  scanCard:      { background: "linear-gradient(135deg, #0d3d3d 0%, #2E8B8B 100%)", borderRadius: 18, padding: "22px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, cursor: "pointer" },
  scanCardLeft:  { flex: 1 },
  scanCardTitle: { color: "#fff", fontSize: 17, fontWeight: 700, marginBottom: 4 },
  scanCardSub:   { color: "rgba(255,255,255,.65)", fontSize: 13, marginBottom: 14 },
  scanBtn:       { display: "inline-block", background: "rgba(255,255,255,.18)", color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600 },
  accuracyBanner:{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 14, padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  accuracyLeft:  {},
  accuracyLabel: { fontSize: 12, color: "#6B7280", fontWeight: 500 },
  accuracyValue: { fontSize: 28, fontWeight: 800, color: "#16A34A" },
  sectionTitle:  { fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 12 },
  historyRow:    { display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid #F3F4F6", cursor: "pointer" },
  historyDot:    { width: 10, height: 10, borderRadius: "50%", flexShrink: 0 },
  historyResult: { fontSize: 14, fontWeight: 600, color: "#111" },
  historyDate:   { fontSize: 12, color: "#9CA3AF", marginTop: 2 },
  historyBadge:  { fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 20 },
  viewAll:       { fontSize: 13, color: "#2E8B8B", fontWeight: 600, marginTop: 12, cursor: "pointer", textAlign: "center" },
  emptyState:    { textAlign: "center", padding: "40px 20px" },
  uploadBtn:     { marginTop: 16, background: "#2E8B8B", color: "#fff", border: "none", borderRadius: 10, padding: "11px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" },
};
