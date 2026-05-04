import { useApp, PAGES } from "./context/AppContext";

// ── Pages ──
import SplashScreen     from "./pages/SplashScreen";
import SignInPage       from "./pages/SignInPage";
import SignUpPage       from "./pages/SignUpPage";
import { ForgotPasswordPage, OtpPage, ResetPasswordPage } from "./pages/AuthPages";
import HomePage         from "./pages/HomePage";
import { UploadPage, ResultPage } from "./pages/ScanPages";
import HistoryPage      from "./pages/HistoryPage";
import {
  ProfilePage, ChangePasswordPage, NotificationsPage,
  PrivacyPage, FaqPage, ContactPage,
} from "./pages/ProfilePages";
import EditProfilePage  from "./pages/EditProfilePage";
import ChatPage         from "./pages/ChatPage";
import BottomNavbar     from "./components/BottomNavbar";

const AUTH_PAGES = new Set([
  PAGES.SPLASH, PAGES.SIGN_IN, PAGES.SIGN_UP,
  PAGES.FORGOT_PASSWORD, PAGES.OTP, PAGES.RESET_PASSWORD,
]);

export default function App() {
  const { page } = useApp();

  const isAuth = AUTH_PAGES.has(page);

  return (
    <div style={{ minHeight: "100dvh", background: "#F9FAFB", fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; padding: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
      `}</style>

      {page === PAGES.SPLASH            && <SplashScreen />}
      {page === PAGES.SIGN_IN           && <SignInPage />}
      {page === PAGES.SIGN_UP           && <SignUpPage />}
      {page === PAGES.FORGOT_PASSWORD   && <ForgotPasswordPage />}
      {page === PAGES.OTP               && <OtpPage />}
      {page === PAGES.RESET_PASSWORD    && <ResetPasswordPage />}

      {!isAuth && (
        <>
          <div style={{ paddingBottom: 72 }}>
            {page === PAGES.HOME             && <HomePage />}
            {page === PAGES.UPLOAD           && <UploadPage />}
            {page === PAGES.RESULT           && <ResultPage />}
            {page === PAGES.HISTORY          && <HistoryPage />}
            {page === PAGES.PROFILE          && <ProfilePage />}
            {page === PAGES.EDIT_PROFILE     && <EditProfilePage />}
            {page === PAGES.CHANGE_PASSWORD  && <ChangePasswordPage />}
            {page === PAGES.NOTIFICATIONS    && <NotificationsPage />}
            {page === PAGES.PRIVACY          && <PrivacyPage />}
            {page === PAGES.FAQ              && <FaqPage />}
            {page === PAGES.CONTACT          && <ContactPage />}
            {page === PAGES.CHAT             && <ChatPage />}
          </div>
          <BottomNavbar />
        </>
      )}
    </div>
  );
}
