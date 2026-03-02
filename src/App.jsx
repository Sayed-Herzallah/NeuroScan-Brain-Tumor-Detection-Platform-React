import { useState, useEffect } from "react";
import "./styles/global.css";
import { AppProvider, useApp, PAGES } from "./context/AppContext";
import AppRouter from "./AppRouter";
import BottomNavbar from "./components/BottomNavbar";
import Sidebar, { useSidebar } from "./components/Sidebar"; // ← أضف ده

const NAV_PAGES = [
  PAGES.HOME, PAGES.UPLOAD, PAGES.HISTORY,
  PAGES.RESULT, PAGES.CHAT, PAGES.PROFILE,
  PAGES.CHANGE_PASSWORD, PAGES.NOTIFICATIONS,
  PAGES.PRIVACY, PAGES.FAQ, PAGES.CONTACT,
];function Shell() {
  const { page } = useApp();
  const showNav = NAV_PAGES.includes(page);
  const showSidebar = useSidebar();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {showSidebar && isDesktop && <Sidebar />}
      <div style={{
        flex: 1,
        minHeight: "100vh",
        marginLeft: (showSidebar && isDesktop) ? 220 : 0,
        maxWidth: (showSidebar && isDesktop) ? "calc(100vw - 220px)" : "100vw",
        overflowX: "hidden",
      }}>
        {showNav && !isDesktop && <BottomNavbar />}
        <AppRouter />
      </div>
    </div>
  );
}
export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}