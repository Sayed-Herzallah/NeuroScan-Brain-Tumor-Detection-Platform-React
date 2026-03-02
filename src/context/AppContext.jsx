import { createContext, useContext, useState } from "react";

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
  CHANGE_PASSWORD:  "change_password",
  NOTIFICATIONS:    "notifications",
  PRIVACY:          "privacy",
  CHAT:             "chat",
  FAQ:              "faq",
  CONTACT:          "contact",
};

export function AppProvider({ children }) {
  const [page, setPage]                         = useState(PAGES.SPLASH);
  const [prevPage, setPrevPage]                 = useState(null);
  const [activeNav, setActiveNav]               = useState("home");
  const [uploadedImage, setUploadedImage]       = useState(null);
  const [analysisResult, setAnalysisResult]     = useState(null);
  const [history, setHistory]                   = useState([]);   // ← فاضي
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  const [notificationsOn, setNotificationsOn]   = useState(true);
  const [otpEmail, setOtpEmail]                 = useState("");

  const [user, setUser] = useState({
    name:      "Jane",
    email:     "jane25@gmail.com",
    avatarUrl: null,
  });
  const updateUser = (updates) => setUser(prev => ({ ...prev, ...updates }));

  const addToHistory = ({ imageUrl, result, confidence }) => {
    const now  = new Date();
    const date = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

    const newItem = {
      id:         Date.now(),
      result,
      confidence,
      date,
      time,
      imageUrl: imageUrl || null,
    };

    setHistory(prev => [newItem, ...prev]);
    setAnalysisResult({ result, confidence, date, time });
  };

  const navigate = (to, from) => {
    setPrevPage(from || page);
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

  return (
    <AppContext.Provider value={{
      page, navigate, goBack,
      activeNav, setActiveNav,
      uploadedImage, setUploadedImage,
      analysisResult, setAnalysisResult,
      history,
      addToHistory,
      selectedHistoryItem, setSelectedHistoryItem,
      notificationsOn, setNotificationsOn,
      otpEmail, setOtpEmail,
      user, updateUser,
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