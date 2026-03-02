import { useState } from "react";
import { useApp, PAGES } from "../context/AppContext";
import TopBar from "../components/TopBar";

const BRAIN_SVG_PATH =
  "M10.4076 5.60482C10.6635 4.29141 11.2844 3.08125 12.1959 2.1193C13.1073 1.15734 14.2708 0.484388 15.5469 0.181041C16.8229 -0.122307 18.1575 -0.0431849 19.3907 0.408929C20.6239 0.861043 21.7034 1.66698 22.5 2.7302C23.2966 1.66698 24.3761 0.861043 25.6093 0.408929C26.8425 -0.0431849 28.1771 -0.122307 29.4531 0.181041C30.7292 0.484388 31.8927 1.15734 32.8041 2.1193C33.7156 3.08125 34.3365 4.29141 34.5924 5.60482L34.9439 7.40721L36.0857 7.64006C37.8054 7.99266 39.3526 8.94297 40.4645 10.3295C41.5764 11.7161 42.1845 13.4534 42.1853 15.2463V15.8155C42.1853 17.9025 41.3135 19.7825 39.9215 21.0962C41.6218 21.9574 43.0174 23.3385 43.9146 25.0478C44.8118 26.757 45.1659 28.7094 44.9278 30.6338C44.6897 32.5581 43.8712 34.3589 42.5859 35.786C41.3007 37.213 39.6126 38.1955 37.7561 38.5969L37.652 39.1287C37.328 40.7858 36.5307 42.3076 35.3607 43.5016C34.1908 44.6956 32.7008 45.5083 31.0792 45.8369C29.4575 46.1655 27.7769 45.9952 26.2499 45.3477C24.7228 44.7001 23.4179 43.6043 22.5 42.1988C21.5821 43.6043 20.2772 44.7001 18.7501 45.3477C17.2231 45.9952 15.5425 46.1655 13.9208 45.8369C12.2992 45.5083 10.8092 44.6956 9.63926 43.5016C8.46933 42.3076 7.67196 40.7858 7.34795 39.1287L7.2439 38.5969C5.3874 38.1955 3.69928 37.213 2.41405 35.786C1.12883 34.3589 0.310306 32.5581 0.0722012 30.6338C-0.165904 28.7094 0.188228 26.757 1.0854 25.0478C1.98257 23.3385 3.37824 21.9574 5.07852 21.0962C4.36499 20.4234 3.79547 19.6069 3.40586 18.6981C3.01624 17.7892 2.81497 16.8078 2.81471 15.8155V15.2463C2.81554 13.4534 3.42356 11.7161 4.53549 10.3295C5.64741 8.94297 7.19465 7.99266 8.91434 7.64006L10.0561 7.41009L10.4076 5.60482Z";

export default function HistoryPage() {
  const { history, navigate, setSelectedHistoryItem, setAnalysisResult, setUploadedImage } = useApp();
  const [search, setSearch] = useState("");

  const filtered     = history.filter(item =>
    item.result.toLowerCase().includes(search.toLowerCase()) ||
    item.date.toLowerCase().includes(search.toLowerCase())
  );
  const totalScans   = history.length;
  const benignCount  = history.filter(h => h.result === "Benign").length;
  const malignCount  = history.filter(h => h.result === "Malignant").length;
  const avgConf      = totalScans
    ? Math.round(history.reduce((acc, h) => acc + h.confidence, 0) / totalScans)
    : 0;

  const handleItemClick = (item) => {
    setSelectedHistoryItem(item);
    setAnalysisResult({ result: item.result, confidence: item.confidence, date: item.date, time: item.time });
    setUploadedImage(item.imageUrl || null);
    navigate(PAGES.RESULT, PAGES.HISTORY);
  };

  /* ══════════════ EMPTY STATE ══════════════ */
  if (history.length === 0) {
    return (
      <div className="fade-in" style={{
        position:"fixed", inset:0, display:"flex", flexDirection:"column",
        background:"linear-gradient(160deg, #0d3b3b 0%, #1a5c5c 40%, #2E8B8B 100%)",
        overflow:"hidden",
      }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-140, right:-140, width:420, height:420, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }}/>
          <div style={{ position:"absolute", top:100, right:-60, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,0.03)" }}/>
          <div style={{ position:"absolute", bottom:-120, left:-100, width:360, height:360, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }}/>
        </div>
        <div style={{ display:"flex", alignItems:"center", padding:"14px 20px 10px", position:"relative", zIndex:10, flexShrink:0 }}>
          <button onClick={() => navigate(PAGES.HOME)}
            style={{ width:36, height:36, borderRadius:10, background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <span style={{ position:"absolute", left:"50%", transform:"translateX(-50%)", fontSize:17, fontWeight:700, color:"#fff" }}>Scan History</span>
        </div>
        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"16px 20px 24px", position:"relative", zIndex:1 }}>
          <div style={{ width:110, height:110, borderRadius:30, background:"rgba(255,255,255,0.10)", border:"1.5px solid rgba(255,255,255,0.18)", backdropFilter:"blur(12px)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20, boxShadow:"0 0 50px rgba(126,200,200,0.3)" }}>
            <svg width="58" height="59" viewBox="0 0 45 46" fill="none"><path d={BRAIN_SVG_PATH} fill="rgba(255,255,255,0.92)"/></svg>
          </div>
          <p style={{ fontSize:24, fontWeight:800, color:"#fff", margin:"0 0 10px", letterSpacing:"-0.03em" }}>No scans yet</p>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.58)", lineHeight:1.7, maxWidth:260, textAlign:"center", margin:"0 0 28px" }}>
            Your MRI analysis history will appear here after your first scan.
          </p>
          <div style={{ display:"flex", gap:12, marginBottom:28, width:"100%", maxWidth:380 }}>
            {[
              { label:"Total Scans", value:"0", icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
              { label:"Benign",      value:"0", icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
              { label:"Malignant",  value:"0", icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg> },
            ].map((s, i) => (
              <div key={i} style={{ flex:1, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:18, padding:"16px 8px 14px", textAlign:"center", backdropFilter:"blur(8px)", display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                {s.icon}
                <p style={{ fontSize:26, fontWeight:800, color:"#fff", margin:0 }}>{s.value}</p>
                <p style={{ fontSize:11, color:"rgba(255,255,255,0.5)", margin:0, fontWeight:500 }}>{s.label}</p>
              </div>
            ))}
          </div>
          <button onClick={() => navigate(PAGES.UPLOAD)}
            style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, width:"100%", maxWidth:340, padding:"17px 28px", borderRadius:999, background:"#fff", color:"#134040", fontSize:15, fontWeight:700, fontFamily:"var(--font)", border:"none", cursor:"pointer", boxShadow:"0 10px 32px rgba(0,0,0,0.28)", transition:"transform 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
            onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Upload MRI Scan
          </button>
          <p style={{ fontSize:12, color:"rgba(255,255,255,0.3)", marginTop:12 }}>Supports JPEG · PNG · DICOM</p>
        </div>
      </div>
    );
  }

  /* ══════════════ HAS ITEMS ══════════════ */
  return (
    <div className="page fade-in">
      <TopBar title="Scan History" onBack={() => navigate(PAGES.HOME)} />

      <div className="content-scroll-area">
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

          {/* ── Stats Banner ── */}
          <div style={{
            background:"linear-gradient(135deg, #0d3b3b 0%, #1e6b6b 60%, #2E8B8B 100%)",
            borderRadius:20, padding:"18px 20px",
            display:"flex", gap:0, position:"relative", overflow:"hidden",
          }}>
            <div style={{ position:"absolute", top:-30, right:-30, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }}/>
            <div style={{ position:"absolute", bottom:-20, right:80, width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }}/>
            {[
              { label:"Total",     value:totalScans,  color:"rgba(255,255,255,0.95)" },
              { label:"Benign",    value:benignCount,  color:"#4ade80" },
              { label:"Malignant", value:malignCount,  color:"#f87171" },
              { label:"Avg Conf.", value:`${avgConf}%`, color:"#93c5fd" },
            ].map((s, i, arr) => (
              <div key={i} style={{
                flex:1, textAlign:"center", position:"relative", zIndex:1,
                borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none",
                padding:"0 6px",
              }}>
                <p style={{ fontSize:22, fontWeight:800, color:s.color, margin:0, lineHeight:1.2 }}>{s.value}</p>
                <p style={{ fontSize:10, color:"rgba(255,255,255,0.45)", margin:"5px 0 0", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* ── Search ── */}
          <div className="search-bar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input placeholder="Search by result or date…" value={search} onChange={e => setSearch(e.target.value)}/>
            {search && (
              <button onClick={() => setSearch("")} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text-muted)", fontSize:18, lineHeight:1, padding:0 }}>×</button>
            )}
          </div>

          {/* ── Count row ── */}
          {filtered.length > 0 && (
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingInline:2 }}>
              <p style={{ fontSize:12, color:"var(--text-muted)" }}>
                {filtered.length} scan{filtered.length !== 1 ? "s" : ""} {search ? "found" : "total"}
              </p>
              <p style={{ fontSize:12, color:"var(--text-muted)" }}>Most recent first</p>
            </div>
          )}

          {/* ── Empty search ── */}
          {filtered.length === 0 ? (
            <div style={{ textAlign:"center", padding:"48px 20px", display:"flex", flexDirection:"column", alignItems:"center", gap:14 }}>
              <div style={{ width:64, height:64, borderRadius:18, background:"var(--border-light)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <div>
                <p style={{ fontWeight:700, fontSize:15, color:"var(--text-primary)", marginBottom:6 }}>No results found</p>
                <p style={{ color:"var(--text-muted)", fontSize:13 }}>No scans match "<strong>{search}</strong>"</p>
              </div>
              <button onClick={() => setSearch("")} className="btn btn-outline" style={{ maxWidth:140, borderRadius:999, fontSize:13 }}>
                Clear search
              </button>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[...filtered].reverse().map((item, idx) => {
                const isMalignant = item.result === "Malignant";
                const accent      = isMalignant ? "var(--danger)"       : "var(--success)";
                const accentLight = isMalignant ? "var(--danger-light)" : "var(--success-light)";
                const r    = 16;
                const circ = 2 * Math.PI * r;
                const dash = circ - (item.confidence / 100) * circ;

                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    style={{
                      display:"flex", alignItems:"center", gap:0,
                      background:"#fff", borderRadius:18,
                      boxShadow:"0 2px 12px rgba(0,0,0,0.06)",
                      border:"1px solid var(--border)",
                      cursor:"pointer", overflow:"hidden",
                      transition:"all 0.2s",
                      animation:`fadeIn 0.2s ease ${idx * 0.04}s both`,
                    }}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.10)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.06)";}}
                  >
                    {/* Color stripe */}
                    <div style={{ width:4, alignSelf:"stretch", flexShrink:0,
                      background: isMalignant
                        ? "linear-gradient(180deg,#EF4444,#f87171)"
                        : "linear-gradient(180deg,#22C55E,#4ade80)" }}/>

                    {/* Thumb */}
                    <div style={{ width:54, height:54, borderRadius:12, background:"linear-gradient(135deg,#0d2626,#1a3d3d)", flexShrink:0, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", margin:"14px 12px" }}>
                      {item.imageUrl
                        ? <img src={item.imageUrl} alt="MRI" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                        : <svg width="22" height="22" viewBox="0 0 45 46" fill="none"><path d={BRAIN_SVG_PATH} fill="rgba(255,255,255,0.5)"/></svg>
                      }
                    </div>

                    {/* Info */}
                    <div style={{ flex:1, minWidth:0, padding:"14px 0" }}>
                      <span className={`badge ${isMalignant ? "badge-malignant" : "badge-benign"}`}
                        style={{ marginBottom:6, display:"inline-flex", fontSize:11 }}>
                        {isMalignant
                          ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
                          : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
                        }
                        {item.result}
                      </span>
                      <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                        <div style={{ display:"flex", gap:4, alignItems:"center" }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                          <span style={{ fontSize:12, color:"var(--text-secondary)" }}>{item.date}</span>
                        </div>
                        <div style={{ display:"flex", gap:4, alignItems:"center" }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          <span style={{ fontSize:12, color:"var(--text-secondary)" }}>{item.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Circular confidence */}
                    <div style={{ position:"relative", width:44, height:44, flexShrink:0 }}>
                      <svg width="44" height="44" viewBox="0 0 44 44" style={{ transform:"rotate(-90deg)" }}>
                        <circle cx="22" cy="22" r={r} fill="none" stroke={accentLight} strokeWidth="4"/>
                        <circle cx="22" cy="22" r={r} fill="none" stroke={accent} strokeWidth="4"
                          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={dash}/>
                      </svg>
                      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <span style={{ fontSize:10, fontWeight:800, color:"var(--text-primary)" }}>{item.confidence}%</span>
                      </div>
                    </div>

                    {/* Chevron */}
                    <div style={{ width:26, height:26, borderRadius:7, background:"var(--bg)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, margin:"0 12px" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── New scan button ── */}
          {filtered.length > 0 && (
            <button onClick={() => navigate(PAGES.UPLOAD)} className="btn btn-outline"
              style={{ borderRadius:14, marginTop:4, gap:8, fontSize:13 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              New MRI Scan
            </button>
          )}

        </div>
      </div>
    </div>
  );
}