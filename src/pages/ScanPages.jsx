import { useState, useRef, useCallback } from "react";
import { useApp, PAGES } from "../context/AppContext";
import TopBar from "../components/TopBar";

/* ════════════════════════════════════════════
   RESULT PAGE
════════════════════════════════════════════ */
export function ResultPage() {
  const { navigate, uploadedImage, analysisResult, addToHistory, history } = useApp();

  const [zoom, setZoom]   = useState(1);
  const [saved, setSaved] = useState(false);
  const imgRef            = useRef();

  const handleZoomIn  = () => setZoom(z => Math.min(z + 0.25, 3));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.25, 1));

  const handleSave = () => {
    if (!analysisResult) return;
    if (saved) { navigate(PAGES.HISTORY); return; }
    const alreadySaved = history.some(
      h => h.date === analysisResult.date && h.time === analysisResult.time
    );
    if (!alreadySaved)
      addToHistory({ imageUrl: uploadedImage, result: analysisResult.result, confidence: analysisResult.confidence });
    setSaved(true);
    setTimeout(() => navigate(PAGES.HISTORY), 800);
  };

  /* ══════════════════════ EMPTY STATE ══════════════════════ */
  if (!analysisResult) {
    return (
      <div className="page fade-in">
        <TopBar title="Result" onBack={() => navigate(PAGES.UPLOAD)} />
        <div className="content-scroll-area"
          style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center",
            gap:20, padding:"40px 24px", textAlign:"center", maxWidth:300 }}>
            <div style={{ position:"relative", width:100, height:100, borderRadius:32,
              background:"var(--primary-light)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="48" height="48" viewBox="0 0 44 44" fill="none">
                <path opacity={0.45} fill="var(--primary)"
                  d="M10.1763 5.36113C10.4265 4.10483 11.0336 2.94728 11.9248 2.02715C12.8161 1.10702 13.9537 0.463328 15.2014 0.173169C16.4491-0.116989 17.754-0.0413073 18.9598 0.391149C20.1656 0.823606 21.2211 1.5945 22 2.61149C22.7789 1.5945 23.8344 0.823606 25.0402 0.391149C26.246-0.0413073 27.5509-0.116989 28.7986 0.173169C30.0463 0.463328 31.1839 1.10702 32.0752 2.02715C32.9664 2.94728 33.5735 4.10483 33.8237 5.36113L34.1674 7.08516L35.2838 7.30788C36.9652 7.64515 38.4781 8.55414 39.5653 9.88043C40.6525 11.2067 41.247 12.8685 41.2478 14.5834V15.1279C41.2478 17.1241 40.3954 18.9224 39.0343 20.1789C40.6968 21.0027 42.0615 22.3238 42.9387 23.9587C43.816 25.5936 44.1622 27.4611 43.9294 29.3018C43.6966 31.1426 42.8963 32.8651 41.6396 34.2301C40.3829 35.5951 38.7323 36.5348 36.9171 36.9188L36.8153 37.4274C36.4985 39.0125 35.7189 40.4682 34.5749 41.6103C33.431 42.7524 31.9742 43.5297 30.3885 43.844C28.8029 44.1583 27.1597 43.9954 25.6666 43.376C24.1735 42.7566 22.8975 41.7085 22 40.3641C21.1025 41.7085 19.8265 42.7566 18.3334 43.376C16.8403 43.9954 15.1971 44.1583 13.9208 43.844C12.2992 43.5083 10.8092 42.7524 9.63926 41.6103C8.46933 40.4682 7.67196 39.0125 7.34795 37.4274L7.08293 36.9188C5.26768 36.5348 3.61707 35.5951 2.36041 34.2301C1.10374 32.8651 0.303411 31.1426 0.0705967 29.3018C-0.162217 27.4611 0.184045 25.5936 1.06128 23.9587C1.93852 22.3238 3.30317 21.0027 4.96567 20.1789C3.60455 18.9224 2.75217 17.1241 2.75217 15.1279V14.5834C2.75297 12.8685 3.34748 11.2067 4.4347 9.88043C5.52191 8.55414 7.03477 7.64515 8.71624 7.30788L9.83262 7.08791L10.1763 5.36113Z"/>
              </svg>
              <div style={{ position:"absolute", inset:-8, borderRadius:40,
                border:"2px dashed var(--primary)", opacity:0.25,
                animation:"spin 10s linear infinite" }} />
            </div>
            <div>
              <p style={{ fontWeight:700, fontSize:17, color:"var(--text-primary)", marginBottom:8 }}>
                No Result Yet
              </p>
              <p style={{ fontSize:13, color:"var(--text-muted)", lineHeight:1.7 }}>
                Upload an MRI scan and run the analysis to see your results here.
              </p>
            </div>
            <button className="btn btn-primary" onClick={() => navigate(PAGES.UPLOAD)}
              style={{ borderRadius:999, maxWidth:220, gap:8 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Upload MRI Scan
            </button>
            <button className="btn btn-outline" onClick={() => navigate(PAGES.HISTORY)}
              style={{ borderRadius:999, maxWidth:220, gap:8 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              View History
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ══════════════════════ HAS RESULT ══════════════════════ */
  const res         = analysisResult;
  const isMalignant = res.result === "Malignant";
  const accent      = isMalignant ? "var(--danger)" : "var(--success)";
  const accentLight = isMalignant ? "var(--danger-light)" : "var(--success-light)";

  const radius      = 28;
  const circ        = 2 * Math.PI * radius;
  const strokeDash  = circ - (res.confidence / 100) * circ;

  return (
    <div className="page fade-in">
      <TopBar title="Result" onBack={() => navigate(PAGES.UPLOAD)} />

      <div className="content-scroll-area">
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

          {/* ══ 1. MRI IMAGE CARD ══ */}
          <div className="card" style={{ padding:0, overflow:"hidden" }}>
            <div style={{ height:4, background: isMalignant
              ? "linear-gradient(90deg,#EF4444,#f87171)"
              : "linear-gradient(90deg,#22C55E,#4ade80)" }} />

            <div style={{ position:"relative", background:"#0a1a1a", height:210,
              display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
              {uploadedImage ? (
                <img ref={imgRef} src={uploadedImage} alt="MRI scan"
                  style={{ maxWidth:"100%", maxHeight:"100%", objectFit:"contain",
                    transform:`scale(${zoom})`, transition:"transform 0.2s ease", transformOrigin:"center" }}/>
              ) : (
                <div style={{ opacity:0.2 }}>
                  <svg width="48" height="48" viewBox="0 0 44 44" fill="white">
                    <path d="M10.1763 5.36113C10.4265 4.10483 11.0336 2.94728 11.9248 2.02715C12.8161 1.10702 13.9537 0.463328 15.2014 0.173169C16.4491-0.116989 17.754-0.0413073 18.9598 0.391149C20.1656 0.823606 21.2211 1.5945 22 2.61149C22.7789 1.5945 23.8344 0.823606 25.0402 0.391149C26.246-0.0413073 27.5509-0.116989 28.7986 0.173169C30.0463 0.463328 31.1839 1.10702 32.0752 2.02715C32.9664 2.94728 33.5735 4.10483 33.8237 5.36113L34.1674 7.08516L35.2838 7.30788C36.9652 7.64515 38.4781 8.55414 39.5653 9.88043C40.6525 11.2067 41.247 12.8685 41.2478 14.5834V15.1279C41.2478 17.1241 40.3954 18.9224 39.0343 20.1789C40.6968 21.0027 42.0615 22.3238 42.9387 23.9587C43.816 25.5936 44.1622 27.4611 43.9294 29.3018C43.6966 31.1426 42.8963 32.8651 41.6396 34.2301C40.3829 35.5951 38.7323 36.5348 36.9171 36.9188L36.8153 37.4274C36.4985 39.0125 35.7189 40.4682 34.5749 41.6103C33.431 42.7524 31.9742 43.5297 30.3885 43.844C28.8029 44.1583 27.1597 43.9954 25.6666 43.376C24.1735 42.7566 22.8975 41.7085 22 40.3641C21.1025 41.7085 19.8265 42.7566 18.3334 43.376C16.8403 43.9954 15.1971 44.1583 13.9208 43.844C12.2992 43.5083 10.8092 42.7524 9.63926 41.6103C8.46933 40.4682 7.67196 39.0125 7.34795 37.4274L7.08293 36.9188C5.26768 36.5348 3.61707 35.5951 2.36041 34.2301C1.10374 32.8651 0.303411 31.1426 0.0705967 29.3018C-0.162217 27.4611 0.184045 25.5936 1.06128 23.9587C1.93852 22.3238 3.30317 21.0027 4.96567 20.1789C3.60455 18.9224 2.75217 17.1241 2.75217 15.1279V14.5834C2.75297 12.8685 3.34748 11.2067 4.4347 9.88043C5.52191 8.55414 7.03477 7.64515 8.71624 7.30788L9.83262 7.08791L10.1763 5.36113Z"/>
                  </svg>
                </div>
              )}

              <div style={{ position:"absolute", bottom:10, right:10,
                display:"flex", flexDirection:"column", gap:6, zIndex:10 }}>
                {[
                  { label:"+", action:handleZoomIn,  disabled:zoom>=3 },
                  { label:"−", action:handleZoomOut, disabled:zoom<=1 },
                ].map(btn => (
                  <button key={btn.label} onClick={btn.action} disabled={btn.disabled}
                    style={{ width:34, height:34, background:"rgba(255,255,255,0.92)", border:"none",
                      borderRadius:8, fontSize:20, fontWeight:700,
                      cursor:btn.disabled?"not-allowed":"pointer",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      opacity:btn.disabled?0.4:1, color:"#111", backdropFilter:"blur(4px)",
                      lineHeight:1, boxShadow:"0 2px 8px rgba(0,0,0,0.3)",
                      fontFamily:"inherit", transition:"opacity 0.15s" }}>
                    {btn.label}
                  </button>
                ))}
              </div>

              {zoom > 1 && (
                <div style={{ position:"absolute", top:10, left:10,
                  background:"rgba(0,0,0,0.6)", color:"white", fontSize:11, fontWeight:600,
                  padding:"3px 8px", borderRadius:6, backdropFilter:"blur(4px)" }}>
                  {Math.round(zoom * 100)}%
                </div>
              )}
            </div>

            <div style={{ padding:"16px 18px 18px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  <span className={`badge ${isMalignant ? "badge-malignant" : "badge-benign"}`}
                    style={{ fontSize:13, padding:"6px 16px", gap:6 }}>
                    {isMalignant ? (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                      </svg>
                    ) : (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/>
                      </svg>
                    )}
                    {res.result}
                  </span>

                  <div style={{ display:"flex", gap:12 }}>
                    {[
                      { icon:<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>, label:res.date },
                      { icon:<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>, label:res.time },
                    ].map((item, i) => (
                      <div key={i} style={{ display:"flex", gap:4, alignItems:"center" }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">{item.icon}</svg>
                        <span style={{ fontSize:11.5, color:"var(--text-secondary)" }}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ position:"relative", width:72, height:72, flexShrink:0 }}>
                  <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform:"rotate(-90deg)" }}>
                    <circle cx="36" cy="36" r={radius} fill="none" stroke={accentLight} strokeWidth="7"/>
                    <circle cx="36" cy="36" r={radius} fill="none" stroke={accent} strokeWidth="7"
                      strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={strokeDash}
                      style={{ transition:"stroke-dashoffset 1s ease" }}/>
                  </svg>
                  <div style={{ position:"absolute", inset:0, display:"flex",
                    flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontSize:15, fontWeight:800, color:"var(--text-primary)", lineHeight:1 }}>
                      {res.confidence}%
                    </span>
                    <span style={{ fontSize:9, color:"var(--text-muted)", fontWeight:600, marginTop:2 }}>CONF.</span>
                  </div>
                </div>
              </div>

              <div style={{ background:accentLight, borderRadius:10, padding:"10px 14px",
                borderLeft:`3px solid ${accent}` }}>
                <p style={{ fontSize:12, fontWeight:700, color:accent, marginBottom:4 }}>Analysis Summary</p>
                <p style={{ fontSize:12.5, lineHeight:1.65, color:"var(--text-secondary)", textAlign:"left" }}>
                  The AI detected <strong style={{ color:"var(--text-primary)" }}>
                  {isMalignant ? "abnormal" : "normal"}</strong> patterns in the scanned brain image,{" "}
                  <span style={{ color:accent, fontWeight:600 }}>
                    consistent with {res.result.toLowerCase()} characteristics.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* ══ 2. KEY FINDINGS CARD ══ */}
          <div className="card" style={{ padding:"16px 18px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
              <div style={{ width:28, height:28, borderRadius:8, background:accentLight,
                display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <h4 style={{ fontSize:14, margin:0 }}>Key Findings</h4>
            </div>

            {[
              {
                bg:"#EEF2FF", color:"#6366F1",
                icon:<path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>,
                text:"Abnormal tissue patterns detected",
              },
              {
                bg:"#f0fafa", color:"var(--primary)",
                icon:<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="0.5" fill="currentColor"/></>,
                text:"Irregular shape and intensity",
              },
              {
                bg: accentLight, color: accent,
                icon: isMalignant
                  ? <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  : <><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></>,
                text: isMalignant ? "Matches malignant indicators" : "Consistent with benign pattern",
              },
            ].map((f, i, arr) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12,
                padding:"10px 0", borderBottom:i < arr.length-1 ? "1px solid var(--border)" : "none" }}>
                <div style={{ width:34, height:34, borderRadius:9, background:f.bg, flexShrink:0,
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke={f.color} strokeWidth="2" strokeLinecap="round">{f.icon}</svg>
                </div>
                <span style={{ fontSize:13, color:"var(--text-primary)", fontWeight:500 }}>{f.text}</span>
              </div>
            ))}
          </div>

          {/* ══ 3. DISCLAIMER ══ */}
          <div style={{ background:"#fff8ed", border:"1px solid #fde68a", borderRadius:12,
            padding:"12px 14px", display:"flex", gap:10, alignItems:"flex-start" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="#d97706" strokeWidth="2" strokeLinecap="round" style={{ flexShrink:0, marginTop:1 }}>
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <circle cx="12" cy="16" r="0.5" fill="#d97706"/>
            </svg>
            <p style={{ fontSize:12, color:"#92400e", lineHeight:1.65, textAlign:"left" }}>
              This result is <strong style={{ color:"#d97706" }}>AI-assisted</strong> and should{" "}
              <strong>not replace</strong> professional medical consultation. Always verify with a qualified physician.
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom action bar ── */}
      <div className="page-action-bar">
        <div className="action-bar-inner">
          <button className="btn btn-outline"
            style={{ flex:"0 0 56px", padding:0, borderRadius:14, minHeight:54,
              boxShadow:"0 2px 8px rgba(46,139,139,0.15)" }}
            onClick={() => navigate(PAGES.CHAT)} title="Ask AI about this result">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="var(--primary)" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </button>

          <button className="btn btn-primary" onClick={handleSave}
            style={{ flex:1, minHeight:54, fontSize:16, fontWeight:700, borderRadius:14,
              letterSpacing:"0.3px", boxShadow:"0 4px 14px rgba(46,139,139,0.35)",
              background:saved?"var(--success)":"var(--primary)", transition:"background 0.3s" }}>
            {saved ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Saved!
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/>
                  <polyline points="7 3 7 8 15 8"/>
                </svg>
                Save Result
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}


/* ════════════════════════════════════════════
   UPLOAD PAGE  — camera bug fixed ✅
════════════════════════════════════════════ */
export function UploadPage() {
  const { navigate, setUploadedImage, addToHistory } = useApp();
  const [image, setImage]         = useState(null);
  const [dragOver, setDragOver]   = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError]         = useState("");
  const [showSheet, setShowSheet] = useState(false);

  // ── FIX: two separate input refs instead of one + captureRef ──
  const galleryInputRef = useRef();
  const cameraInputRef  = useRef();

  const ALLOWED  = ["image/jpeg","image/png","image/jpg"];
  const MAX_SIZE = 10 * 1024 * 1024;

  const processFile = useCallback((file) => {
    setError("");
    if (!file) return;
    if (!ALLOWED.includes(file.type)) { setError("Only JPG and PNG files are supported."); return; }
    if (file.size > MAX_SIZE)         { setError("File size must be under 10MB."); return; }
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
  }, []);

  const handleFileInput = (e) => { processFile(e.target.files[0]); e.target.value = null; };

  // ── FIX: open the correct input directly ──
  const openGallery = () => { setShowSheet(false); setTimeout(() => galleryInputRef.current?.click(), 120); };
  const openCamera  = () => { setShowSheet(false); setTimeout(() => cameraInputRef.current?.click(),  120); };

  const handleAnalyze = () => {
    if (!image) { setError("Please select an MRI image first."); return; }
    setAnalyzing(true);
    setTimeout(() => {
      const result     = Math.random() > 0.4 ? "Malignant" : "Benign";
      const confidence = Math.floor(Math.random() * 15) + 82;
      setUploadedImage(image);
      addToHistory({ imageUrl: image, result, confidence });
      setAnalyzing(false);
      navigate(PAGES.RESULT, PAGES.UPLOAD);
    }, 2200);
  };

  return (
    <div className="page fade-in" style={{ position:"relative" }}>
      <TopBar title="Upload MRI Scan" onBack={() => navigate(PAGES.HOME)} />

      {/* ── FIX: two hidden inputs, each with correct capture attribute ── */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/jpeg,image/png"
        style={{ display:"none" }}
        onChange={handleFileInput}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/jpeg,image/png"
        capture="environment"
        style={{ display:"none" }}
        onChange={handleFileInput}
      />

      <div className="content-scroll-area">
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

          {image ? (
            <div style={{ position:"relative", borderRadius:20, overflow:"hidden",
              background:"#0a1a1a", minHeight:200, display:"flex",
              alignItems:"center", justifyContent:"center" }}>
              <img src={image} alt="Selected MRI"
                style={{ maxWidth:"100%", maxHeight:260, objectFit:"contain", borderRadius:16 }}/>
              <button onClick={() => setShowSheet(true)}
                style={{ position:"absolute", top:12, right:12,
                  background:"rgba(255,255,255,0.95)", border:"none", borderRadius:10,
                  padding:"7px 14px", fontSize:12, fontWeight:700, color:"#111",
                  display:"flex", alignItems:"center", gap:6, cursor:"pointer",
                  boxShadow:"0 2px 10px rgba(0,0,0,0.25)", backdropFilter:"blur(6px)",
                  fontFamily:"inherit" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="23 4 23 10 17 10"/>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                </svg>
                Change
              </button>
              <div style={{ position:"absolute", bottom:12, left:"50%", transform:"translateX(-50%)",
                background:"rgba(0,0,0,0.6)", color:"white", fontSize:11, fontWeight:600,
                padding:"4px 12px", borderRadius:8, backdropFilter:"blur(4px)", whiteSpace:"nowrap" }}>
                MRI Image Ready
              </div>
            </div>
          ) : (
            <div className={`upload-zone ${dragOver?"drag-over":""}`}
              style={{ minHeight:200, cursor:"pointer" }}
              onClick={() => setShowSheet(true)}
              onDragOver={e=>{e.preventDefault();setDragOver(true);}}
              onDragLeave={()=>setDragOver(false)}
              onDrop={e=>{e.preventDefault();setDragOver(false);processFile(e.dataTransfer.files[0]);}}>
              <div style={{ width:72, height:72, borderRadius:20, background:"var(--primary-light)",
                display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                  stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <p style={{ fontSize:15, fontWeight:600, color:"var(--text-primary)", textAlign:"center" }}>
                No Image Selected
              </p>
              <p style={{ fontSize:13, color:"var(--text-muted)", textAlign:"center" }}>
                Click to browse or drag & drop
              </p>
            </div>
          )}

          {error && (
            <div style={{ background:"var(--danger-light)", border:"1px solid #fca5a5",
              borderRadius:10, padding:"10px 14px", display:"flex", gap:8, alignItems:"center" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                <circle cx="12" cy="16" r="0.5" fill="var(--danger)"/>
              </svg>
              <span style={{ fontSize:13, color:"var(--danger)" }}>{error}</span>
            </div>
          )}

          {image && (
            <button className="btn btn-outline" onClick={() => setShowSheet(true)}
              style={{ borderRadius:12 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <polyline points="23 4 23 10 17 10"/>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
              Change Image
            </button>
          )}

          <div className="card" style={{ padding:"16px 18px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                <circle cx="12" cy="16" r="0.5" fill="var(--warning)"/>
              </svg>
              <span style={{ fontSize:13, fontWeight:700 }}>Image Requirements</span>
            </div>
            {["Clear MRI image","No filters or edits","JPG or PNG format"].map(req => (
              <div key={req} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/>
                </svg>
                <span style={{ fontSize:13, color:"var(--text-secondary)" }}>{req}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="page-action-bar">
        <div className="action-bar-inner">
          <button className="btn btn-primary" onClick={handleAnalyze}
            disabled={analyzing || !image}
            style={{ flex:1, minHeight:54, fontSize:16, fontWeight:700, borderRadius:14,
              letterSpacing:"0.3px",
              opacity:!image&&!analyzing?0.6:1,
              boxShadow:image?"0 4px 14px rgba(46,139,139,0.35)":"none" }}>
            {analyzing ? (
              <>
                <span className="spin" style={{ display:"inline-block", width:18, height:18,
                  border:"2px solid rgba(255,255,255,0.3)", borderTop:"2px solid #fff",
                  borderRadius:"50%" }}/>
                Analyzing...
              </>
            ) : "Start Analysis"}
          </button>
        </div>
      </div>

      {showSheet && (
        <div className="bottom-sheet-overlay" onClick={() => setShowSheet(false)}>
          <div className="bottom-sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-handle"/>
            <div style={{ marginBottom:20 }}>
              <p style={{ fontSize:16, fontWeight:700, color:"var(--text-primary)", marginBottom:4, textAlign:"left" }}>
                Upload photo
              </p>
              <p style={{ fontSize:13, color:"var(--text-muted)", textAlign:"left" }}>
                Take or select the MRI image of the MRI scan.
              </p>
            </div>

            {/* From Gallery */}
            <button className="sheet-option-btn" onClick={openGallery}>
              <div className="option-icon-wrapper" style={{ background:"#e8f5f5" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="var(--primary)" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <div className="option-text-group">
                <span className="option-label">From Gallery</span>
                <span className="option-desc">Select an MRI image from your device.</span>
              </div>
            </button>

            {/* Use Camera */}
            <button className="sheet-option-btn" onClick={openCamera}>
              <div className="option-icon-wrapper" style={{ background:"#e8f5f5" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="var(--primary)" strokeWidth="2" strokeLinecap="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </div>
              <div className="option-text-group">
                <span className="option-label">Use Camera</span>
                <span className="option-desc">Take a clear photo of the MRI scan.</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}