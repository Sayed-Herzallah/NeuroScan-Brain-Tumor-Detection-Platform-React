import { useApp, PAGES } from "./context/AppContext";

// ── Pages ──
import SplashScreen from "./pages/SplashScreen";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { ForgotPasswordPage, OtpPage, ResetPasswordPage } from "./pages/AuthPages";
import HomePage from "./pages/HomePage";
import { UploadPage, ResultPage } from "./pages/ScanPages";
import HistoryPage from "./pages/HistoryPage";
import {
  ProfilePage, ChangePasswordPage, NotificationsPage,
  PrivacyPage, FAQPage, ContactSupportPage,
} from "./pages/ProfilePages";
import ChatPage from "./pages/ChatPage";

export default function AppRouter() {
  const { page } = useApp();

  const routes = {
    [PAGES.SPLASH]:           <SplashScreen />,
    [PAGES.SIGN_IN]:          <SignInPage />,
    [PAGES.SIGN_UP]:          <SignUpPage />,
    [PAGES.FORGOT_PASSWORD]:  <ForgotPasswordPage />,
    [PAGES.OTP]:              <OtpPage />,
    [PAGES.RESET_PASSWORD]:   <ResetPasswordPage />,
    [PAGES.HOME]:             <HomePage />,
    [PAGES.UPLOAD]:           <UploadPage />,
    [PAGES.RESULT]:           <ResultPage />,
    [PAGES.HISTORY]:          <HistoryPage />,
    [PAGES.PROFILE]:          <ProfilePage />,
    [PAGES.CHANGE_PASSWORD]:  <ChangePasswordPage />,
    [PAGES.NOTIFICATIONS]:    <NotificationsPage />,
    [PAGES.PRIVACY]:          <PrivacyPage />,
    [PAGES.FAQ]:              <FAQPage />,
    [PAGES.CONTACT]:          <ContactSupportPage />,
    [PAGES.CHAT]:             <ChatPage />,
  };

  // لو الصفحة غير موجودة، نعرض SplashScreen كافتراضي
  return routes[page] || <SplashScreen />;
}