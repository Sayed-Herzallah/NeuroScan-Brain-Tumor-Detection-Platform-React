import { useState, useRef } from "react";
import { useApp, PAGES } from "../context/AppContext";
import { apiUploadScan, apiRunAnalysis } from "../services/api";

// ── Upload Page ───────────────────────────────────────────────
export function UploadPage() {
  const { navigate, setUploadedImage, setUploadedScanId, addToHistory } = useApp();
  const [preview, setPreview]     = useState(null);
  const [file,    setFile]        = useState(null);
  const [loading, setLoading]     = useState(false);
  const [status,  setStatus]      = useState("");
  const [error,   setError]       = useState("");
  const fileRef = useRef();

  const handleFile = (f) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) { setError("Please select an image file."); return; }
    setError("");
    setFile(f);
    const reader = new FileReader();
    reader.onload = e => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    handleFile(dropped);
  };

  const handleAnalyze = async () => {
    if (!file) { setError("Please select an MRI scan image first."); return; }
    setLoading(true);
    setError("");
    try {
      setStatus("Uploading scan…");
      const scanData = await apiUploadScan(file);
      const scanId = scanData?.id || scanData?.scanId || scanData?.data?.id;
      setUploadedScanId(scanId);
      setUploadedImage(preview);

      setStatus("Running AI analysis…");
      const analysisData = await apiRunAnalysis(scanId);

      const result     = analysisData?.result || analysisData?.diagnosis || analysisData?.prediction || "Unknown";
      const confidence = typeof analysisData?.confidence === "number"
        ? analysisData.confidence
        : parseFloat(analysisData?.confidence) || 85;

      addToHistory({ imageUrl: preview, result, confidence, scanId });
      navigate(PAGES.RESULT);
    } catch (err) {
      setError(err.message || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
      setStatus("");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate(PAGES.HOME)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 style={styles.title}>Upload MRI Scan</h1>
        <div style={{ width: 36 }} />
      </div>

      <p style={styles.subtitle}>Upload a brain MRI image for AI-powered tumor detection</p>

      {/* Drop Zone */}
      <div
        style={{ ...styles.dropZone, ...(preview ? styles.dropZoneHasImage : {}) }}
        onClick={() => !preview && fileRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
      >
        {preview ? (
          <div style={styles.previewWrapper}>
            <img src={preview} alt="MRI preview" style={styles.previewImg} />
            <button
              style={styles.changeBtn}
              onClick={e => { e.stopPropagation(); setPreview(null); setFile(null); }}
            >
              Change Image
            </button>
          </div>
        ) : (
          <div style={styles.dropPlaceholder}>
            <div style={{ fontSize: 52 }}>🧠</div>
            <div style={styles.dropTitle}>Drop your MRI scan here</div>
            <div style={styles.dropSub}>or click to browse your device</div>
            <div style={styles.dropHint}>Supports: JPG, PNG, DICOM</div>
          </div>
        )}
      </div>
      <input
        ref={fileRef} type="file" accept="image/*"
        style={{ display: "none" }}
        onChange={e => handleFile(e.target.files[0])}
      />

      {error && (
        <div style={styles.errorBanner}>⚠ {error}</div>
      )}

      {loading && status && (
        <div style={styles.statusBanner}>
          <Spinner /> {status}
        </div>
      )}

      <button
        style={{ ...styles.analyzeBtn, opacity: (!file || loading) ? 0.6 : 1, cursor: (!file || loading) ? "not-allowed" : "pointer" }}
        disabled={!file || loading}
        onClick={handleAnalyze}
      >
        {loading ? <><Spinner light /> Analyzing…</> : "Analyze Scan"}
      </button>

      <div style={styles.tips}>
        <div style={styles.tipTitle}>Tips for best results</div>
        {[
          "Use high-resolution MRI images (T1 or T2 weighted)",
          "Ensure the image is clear and not blurry",
          "Crop the image to focus on the brain area",
        ].map(t => (
          <div key={t} style={styles.tip}>
            <span style={styles.tipDot} />
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Result Page ───────────────────────────────────────────────
export function ResultPage() {
  const { navigate, analysisResult, uploadedImage } = useApp();

  if (!analysisResult) {
    return (
      <div style={{ ...styles.page, textAlign: "center", paddingTop: 80 }}>
        <div style={{ fontSize: 48 }}>🔬</div>
        <div style={{ fontSize: 16, color: "#6B7280", marginTop: 12 }}>No result available.</div>
        <button style={styles.backTertiary} onClick={() => navigate(PAGES.UPLOAD)}>Upload a Scan</button>
      </div>
    );
  }

  const { result, confidence, date, time } = analysisResult;
  const isMalignant = result?.toLowerCase().includes("malign");

  const badgeColor  = isMalignant ? "#DC2626" : "#16A34A";
  const badgeBg     = isMalignant ? "#FEF2F2" : "#F0FDF4";
  const badgeBorder = isMalignant ? "#FECACA" : "#BBF7D0";
  const icon        = isMalignant ? "⚠️" : "✅";

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate(PAGES.UPLOAD)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 style={styles.title}>Analysis Result</h1>
        <div style={{ width: 36 }} />
      </div>

      {uploadedImage && (
        <div style={styles.resultImgWrapper}>
          <img src={uploadedImage} alt="Analyzed MRI" style={styles.resultImg} />
        </div>
      )}

      <div style={{ ...styles.resultCard, border: `2px solid ${badgeBorder}`, background: badgeBg }}>
        <div style={{ fontSize: 52, marginBottom: 8 }}>{icon}</div>
        <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 4 }}>Diagnosis Result</div>
        <div style={{ fontSize: 26, fontWeight: 800, color: badgeColor, marginBottom: 4 }}>{result}</div>
        <div style={{ fontSize: 13, color: "#6B7280" }}>Analyzed: {date} at {time}</div>
      </div>

      <div style={styles.confidenceCard}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>AI Confidence</span>
          <span style={{ fontSize: 14, fontWeight: 800, color: badgeColor }}>{confidence}%</span>
        </div>
        <div style={{ background: "#E5E7EB", borderRadius: 8, height: 10, overflow: "hidden" }}>
          <div style={{ width: `${confidence}%`, height: "100%", background: badgeColor, borderRadius: 8, transition: "width 1s ease" }} />
        </div>
      </div>

      {isMalignant && (
        <div style={styles.warningCard}>
          <div style={{ fontSize: 18, marginBottom: 6 }}>🚨 Medical Attention Recommended</div>
          <div style={{ fontSize: 13, color: "#7F1D1D", lineHeight: 1.6 }}>
            This result indicates a potentially malignant tumor. Please consult a qualified neurologist or oncologist immediately. This AI analysis is not a substitute for professional medical diagnosis.
          </div>
        </div>
      )}

      {!isMalignant && (
        <div style={styles.goodCard}>
          <div style={{ fontSize: 18, marginBottom: 6 }}>💚 No Malignant Tumor Detected</div>
          <div style={{ fontSize: 13, color: "#14532D", lineHeight: 1.6 }}>
            The analysis suggests no malignant tumor. Still, please consult your doctor for a full professional assessment and follow-up care.
          </div>
        </div>
      )}

      <div style={styles.resultActions}>
        <button style={styles.primaryBtn} onClick={() => navigate(PAGES.UPLOAD)}>New Scan</button>
        <button style={styles.secondaryBtn} onClick={() => navigate(PAGES.HISTORY)}>View History</button>
      </div>
    </div>
  );
}

function Spinner({ light }) {
  return (
    <span style={{
      display: "inline-block", width: 18, height: 18,
      border: `2.5px solid ${light ? "rgba(255,255,255,.35)" : "rgba(46,139,139,.25)"}`,
      borderTopColor: light ? "#fff" : "#2E8B8B",
      borderRadius: "50%",
      animation: "spin .7s linear infinite",
    }} />
  );
}

const styles = {
  page:           { padding: "24px 20px 100px", maxWidth: 600, margin: "0 auto" },
  header:         { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  title:          { fontSize: 18, fontWeight: 700, color: "#111", margin: 0 },
  backBtn:        { width: 36, height: 36, borderRadius: "50%", background: "#F3F4F6", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  subtitle:       { fontSize: 13, color: "#9CA3AF", marginBottom: 20 },
  dropZone:       { border: "2px dashed #D1D5DB", borderRadius: 16, padding: "48px 24px", textAlign: "center", cursor: "pointer", transition: "border-color .2s", marginBottom: 16, background: "#FAFAFA" },
  dropZoneHasImage:{ padding: 0, border: "2px solid #2E8B8B", overflow: "hidden" },
  dropPlaceholder:{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 },
  dropTitle:      { fontSize: 16, fontWeight: 600, color: "#374151" },
  dropSub:        { fontSize: 13, color: "#9CA3AF" },
  dropHint:       { fontSize: 11, color: "#D1D5DB", marginTop: 4 },
  previewWrapper: { position: "relative" },
  previewImg:     { width: "100%", borderRadius: 14, display: "block", maxHeight: 280, objectFit: "cover" },
  changeBtn:      { position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,.55)", color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" },
  errorBanner:    { background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#DC2626", marginBottom: 12 },
  statusBanner:   { background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#1D4ED8", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 },
  analyzeBtn:     { width: "100%", padding: "14px", background: "#2E8B8B", color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 },
  tips:           { background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 14, padding: "16px 18px" },
  tipTitle:       { fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 10 },
  tip:            { display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#6B7280", marginBottom: 6 },
  tipDot:         { width: 6, height: 6, borderRadius: "50%", background: "#2E8B8B", flexShrink: 0 },
  resultImgWrapper: { marginBottom: 16, borderRadius: 16, overflow: "hidden", background: "#000" },
  resultImg:      { width: "100%", maxHeight: 220, objectFit: "cover", display: "block" },
  resultCard:     { borderRadius: 16, padding: "24px 20px", textAlign: "center", marginBottom: 16 },
  confidenceCard: { background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 14, padding: "16px 18px", marginBottom: 16 },
  warningCard:    { background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 14, padding: "16px 18px", marginBottom: 20 },
  goodCard:       { background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 14, padding: "16px 18px", marginBottom: 20 },
  resultActions:  { display: "flex", gap: 12 },
  primaryBtn:     { flex: 1, padding: "13px", background: "#2E8B8B", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" },
  secondaryBtn:   { flex: 1, padding: "13px", background: "transparent", color: "#2E8B8B", border: "2px solid #2E8B8B", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" },
  backTertiary:   { marginTop: 16, padding: "10px 24px", background: "#2E8B8B", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer" },
};
