import { useState, useEffect } from "react";
import { useApp, PAGES } from "../context/AppContext";
import { apiGetMyAnalyses } from "../services/api";

export default function HistoryPage() {
  const { history, setHistoryFromApi, navigate, setSelectedHistoryItem } = useApp();
  const [loading,  setLoading]  = useState(false);
  const [filter,   setFilter]   = useState("all");
  const [search,   setSearch]   = useState("");

  useEffect(() => {
    setLoading(true);
    apiGetMyAnalyses()
      .then(data => { if (data) setHistoryFromApi(data); })
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  const filtered = history.filter(item => {
    const matchFilter =
      filter === "all" ||
      (filter === "malignant" && item.result?.toLowerCase().includes("malign")) ||
      (filter === "benign"    && !item.result?.toLowerCase().includes("malign"));
    const matchSearch =
      !search ||
      item.result?.toLowerCase().includes(search.toLowerCase()) ||
      item.date?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Scan History</h1>
        <div style={styles.badge}>{history.length} scans</div>
      </div>

      {/* Search */}
      <div style={styles.searchWrapper}>
        <svg style={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none"
             stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          style={styles.searchInput}
          placeholder="Search results…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div style={styles.filterRow}>
        {["all", "malignant", "benign"].map(f => (
          <button
            key={f}
            style={{ ...styles.filterBtn, ...(filter === f ? styles.filterActive : {}) }}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {loading && (
        <div style={styles.loadingRow}>
          <span style={styles.spinner} /> Loading scans…
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div style={styles.empty}>
          <div style={{ fontSize: 48 }}>📋</div>
          <div style={{ fontWeight: 600, color: "#374151", marginTop: 8 }}>No scans found</div>
          <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>
            {history.length === 0
              ? "Upload your first MRI scan to start building your history"
              : "Try adjusting your filter or search"}
          </div>
          {history.length === 0 && (
            <button style={styles.uploadBtn} onClick={() => navigate(PAGES.UPLOAD)}>Upload Scan</button>
          )}
        </div>
      )}

      <div style={styles.list}>
        {filtered.map(item => {
          const isMalignant = item.result?.toLowerCase().includes("malign");
          return (
            <div
              key={item.id}
              style={styles.card}
              onClick={() => {
                setSelectedHistoryItem(item);
                navigate(PAGES.RESULT, PAGES.HISTORY);
              }}
            >
              {item.imageUrl && (
                <img src={item.imageUrl} alt="scan" style={styles.thumb} />
              )}
              {!item.imageUrl && (
                <div style={styles.thumbPlaceholder}>🧠</div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ ...styles.resultLabel, color: isMalignant ? "#DC2626" : "#16A34A" }}>
                    {item.result || "Unknown"}
                  </span>
                  <span style={{ ...styles.confidenceBadge, background: isMalignant ? "#FEF2F2" : "#F0FDF4", color: isMalignant ? "#DC2626" : "#16A34A" }}>
                    {item.confidence}%
                  </span>
                </div>
                <div style={styles.dateText}>{item.date} · {item.time}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  page:             { padding: "24px 20px 100px", maxWidth: 600, margin: "0 auto" },
  header:           { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  title:            { fontSize: 20, fontWeight: 700, color: "#111", margin: 0 },
  badge:            { background: "#E0F7FA", color: "#2E8B8B", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 20 },
  searchWrapper:    { position: "relative", marginBottom: 14 },
  searchIcon:       { position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" },
  searchInput:      { width: "100%", padding: "11px 14px 11px 42px", border: "1.5px solid #E5E7EB", borderRadius: 12, fontSize: 14, color: "#111", outline: "none", boxSizing: "border-box" },
  filterRow:        { display: "flex", gap: 10, marginBottom: 20 },
  filterBtn:        { padding: "7px 16px", borderRadius: 20, border: "1.5px solid #E5E7EB", background: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#6B7280", transition: "all .15s" },
  filterActive:     { background: "#2E8B8B", color: "#fff", borderColor: "#2E8B8B" },
  loadingRow:       { display: "flex", alignItems: "center", gap: 10, color: "#9CA3AF", fontSize: 14, padding: "20px 0" },
  spinner:          { display: "inline-block", width: 18, height: 18, border: "2.5px solid #E5E7EB", borderTopColor: "#2E8B8B", borderRadius: "50%", animation: "spin .7s linear infinite" },
  empty:            { textAlign: "center", padding: "48px 20px" },
  uploadBtn:        { marginTop: 16, background: "#2E8B8B", color: "#fff", border: "none", borderRadius: 10, padding: "11px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" },
  list:             { display: "flex", flexDirection: "column", gap: 12 },
  card:             { display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "14px 16px", cursor: "pointer", transition: "box-shadow .15s" },
  thumb:            { width: 56, height: 56, borderRadius: 10, objectFit: "cover", background: "#F3F4F6" },
  thumbPlaceholder: { width: 56, height: 56, borderRadius: 10, background: "#F0F9FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 },
  resultLabel:      { fontSize: 15, fontWeight: 700 },
  confidenceBadge:  { fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 20 },
  dateText:         { fontSize: 12, color: "#9CA3AF", marginTop: 3 },
};
