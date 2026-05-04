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
  PrivacyPage, FaqPage, ContactPage,  // ✅ Fixed: was FAQPage / ContactSupportPage (wrong names)
} from "./pages/ProfilePages";
import EditProfilePage from "./pages/EditProfilePage";
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
    [PAGES.EDIT_PROFILE]:     <EditProfilePage />,   // ✅ Added missing route
    [PAGES.CHANGE_PASSWORD]:  <ChangePasswordPage />,
    [PAGES.NOTIFICATIONS]:    <NotificationsPage />,
    [PAGES.PRIVACY]:          <PrivacyPage />,
    [PAGES.FAQ]:              <FaqPage />,           // ✅ Fixed: was FAQPage
    [PAGES.CONTACT]:          <ContactPage />,       // ✅ Fixed: was ContactSupportPage
    [PAGES.CHAT]:             <ChatPage />,
  };

  return routes[page] || <SplashScreen />;
}
