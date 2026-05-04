import { createContext, useContext, useState } from "react";
import { getSavedUser, getToken, clearToken, saveUser } from "../services/api";

const AppContext = createContext(null);

export const PAGES = {
  SPLASH:           "splash",
  SIGN_IN:          "sign_in",
  SIGN_UP:          "sign_up",
  FORGOT_PASSWORD:  "forgot_password",
  OTP:              "otp",
  RESET_PASSWORD:   "reset_password",
  HOME:             "home",
  UPLOAD:           "upload",
  RESULT:           "result",
  HISTORY:          "history",
  PROFILE:          "profile",
  EDIT_PROFILE:     "edit_profile",
  CHANGE_PASSWORD:  "change_password",
  NOTIFICATIONS:    "notifications",
  PRIVACY:          "privacy",
  CHAT:             "chat",
  FAQ:              "faq",
  CONTACT:          "contact",
};

export function AppProvider({ children }) {
  const [page, setPage]                               = useState(PAGES.SPLASH);
  const [prevPage, setPrevPage]                       = useState(null);
  const [activeNav, setActiveNav]                     = useState("home");
  const [uploadedImage, setUploadedImage]             = useState(null);
  const [uploadedScanId, setUploadedScanId]           = useState(null);
  const [analysisResult, setAnalysisResult]           = useState(null);
  const [history, setHistory]                         = useState([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  const [otpEmail, setOtpEmail]                       = useState("");
  const [otpToken, setOtpToken]                       = useState("");

  const [user, setUser] = useState(() => {
    const saved = getSavedUser();
    return saved
      ? { name: saved.displayName || saved.name || "User", email: saved.email || "", avatarUrl: saved.avatarUrl || null }
      : { name: "User", email: "", avatarUrl: null };
  });

  const updateUser = (updates) => {
    setUser(prev => {
      const next = { ...prev, ...updates };
      saveUser({ displayName: next.name, email: next.email, avatarUrl: next.avatarUrl });
      return next;
    });
  };

  const addToHistory = ({ imageUrl, result, confidence, scanId }) => {
    const now  = new Date();
    const date = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    const newItem = {
      id:         scanId || Date.now(),
      result,
      confidence: typeof confidence === "number" ? confidence : parseFloat(confidence) || 80,
      date,
      time,
      imageUrl:   imageUrl || null,
    };
    setHistory(prev => {
      if (prev.some(h => h.id === newItem.id)) return prev;
      return [newItem, ...prev];
    });
    setAnalysisResult({ result, confidence: newItem.confidence, date, time });
  };

  // ✅ Handles multiple possible API response shapes from /api/Analysis/my-analyses
  const setHistoryFromApi = (analyses) => {
    if (!Array.isArray(analyses)) return;
    const items = analyses.map(a => {
      // Support both flat and nested shapes
      const createdAt = a.createdAt || a.analysisDate || a.scan?.createdAt;
      const date = createdAt
        ? new Date(createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        : "—";
      const time = createdAt
        ? new Date(createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
        : "—";

      // result field: try multiple possible keys
      const result =
        a.result || a.diagnosis || a.prediction ||
        a.analysisResult || a.tumorType || "Unknown";

      // confidence: might be 0-1 or 0-100
      let confidence = typeof a.confidence === "number"
        ? a.confidence
        : parseFloat(a.confidence ?? a.confidenceScore ?? 80);
      if (confidence <= 1) confidence = Math.round(confidence * 100);

      // scanId / id
      const id = a.id || a.analysisId || a.scanId || Date.now();

      // imageUrl might be nested under scan
      const imageUrl = a.imageUrl || a.scan?.imageUrl || a.scanImageUrl || null;

      return { id, result, confidence, date, time, imageUrl };
    });
    setHistory(items);
  };

  const navigate = (to, from) => {
    setPrevPage(from ?? page);
    setPage(to);
    const navMap = {
      [PAGES.HOME]:    "home",
      [PAGES.UPLOAD]:  "upload",
      [PAGES.HISTORY]: "history",
      [PAGES.CHAT]:    "chat",
      [PAGES.PROFILE]: "profile",
    };
    if (navMap[to]) setActiveNav(navMap[to]);
  };

  const goBack = () => {
    if (prevPage) { setPage(prevPage); setPrevPage(null); }
    else           { setPage(PAGES.HOME); }
  };

  const logout = () => {
    clearToken();
    setUser({ name: "User", email: "", avatarUrl: null });
    setHistory([]);
    setAnalysisResult(null);
    setUploadedImage(null);
    setUploadedScanId(null);
    setPage(PAGES.SIGN_IN);
  };

  return (
    <AppContext.Provider value={{
      page, navigate, goBack,
      activeNav, setActiveNav,
      uploadedImage, setUploadedImage,
      uploadedScanId, setUploadedScanId,
      analysisResult, setAnalysisResult,
      history, setHistory,
      addToHistory, setHistoryFromApi,
      selectedHistoryItem, setSelectedHistoryItem,
      otpEmail, setOtpEmail,
      otpToken, setOtpToken,
      user, updateUser, logout,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
}