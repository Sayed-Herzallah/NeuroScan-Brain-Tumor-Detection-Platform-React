import { useEffect } from "react";
import { useApp, PAGES } from "../context/AppContext";
import { getToken, getSavedUser } from "../services/api";

export default function SplashScreen() {
  const { navigate } = useApp();

  useEffect(() => {
    // Wait for splash animation, then check auth state
    const t = setTimeout(() => {
      const token    = getToken();
      const savedUser = getSavedUser();
      if (token && savedUser) {
        navigate(PAGES.HOME);
      } else {
        navigate(PAGES.SIGN_IN);
      }
    }, 2200);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <style>{`
        .splash-root {
          position: fixed;
          inset: 0;
          background-color: #4DB6AC;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          z-index: 9999;
        }
        .splash-inner {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 10px;
          animation: splashFadeIn 0.7s ease forwards;
          opacity: 0;
        }
        @keyframes splashFadeIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        .splash-title {
          color: #ffffff;
          font-size: 22px;
          font-weight: 600;
          letter-spacing: 0.3px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>
      <div className="splash-root">
        <div className="splash-inner">
          <svg width="36" height="36" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.1763 5.36113C10.4265 4.10483 11.0336 2.94728 11.9248 2.02715C12.8161 1.10702 13.9537 0.463328 15.2014 0.173169C16.4491 -0.116989 17.754 -0.0413073 18.9598 0.391149C20.1656 0.823606 21.2211 1.5945 22 2.61149C22.7789 1.5945 23.8344 0.823606 25.0402 0.391149C26.246 -0.0413073 27.5509 -0.116989 28.7986 0.173169C30.0463 0.463328 31.1839 1.10702 32.0752 2.02715C32.9664 2.94728 33.5735 4.10483 33.8237 5.36113L34.1674 7.08516L35.2838 7.30788C36.9652 7.64515 38.4781 8.55414 39.5653 9.88043C40.6525 11.2067 41.247 12.8685 41.2478 14.5834V15.1279C41.2478 17.1241 40.3954 18.9224 39.0343 20.1789C40.6968 21.0027 42.0615 22.3238 42.9387 23.9587C43.816 25.5936 44.1622 27.4611 43.9294 29.3018C43.6966 31.1426 42.8963 32.8651 41.6396 34.2301C40.3829 35.5951 38.7323 36.5348 36.9171 36.9188L36.8153 37.4274C36.4985 39.0125 35.7189 40.4682 34.5749 41.6103C33.431 42.7524 31.9742 43.5297 30.3885 43.844C28.8029 44.1583 27.1597 43.9954 25.6666 43.376C24.1735 42.7566 22.8975 41.7085 22 40.3641C21.1025 41.7085 19.8265 42.7566 18.3334 43.376C16.8403 43.9954 15.1971 44.1583 13.6115 43.844C12.0258 43.5297 10.569 42.7524 9.42505 41.6103C8.28112 40.4682 7.50148 39.0125 7.18467 37.4274L7.08293 36.9188C5.26768 36.5348 3.61707 35.5951 2.36041 34.2301C1.10374 32.8651 0.303411 31.1426 0.0705967 29.3018C-0.162217 27.4611 0.184045 25.5936 1.06128 23.9587C1.93852 22.3238 3.30317 21.0027 4.96567 20.1789C4.26799 19.5354 3.71113 18.7544 3.33017 17.8851C2.94922 17.0158 2.75241 16.077 2.75217 15.1279V14.5834C2.75297 12.8685 3.34748 11.2067 4.4347 9.88043C5.52191 8.55414 7.03477 7.64515 8.71624 7.30788L9.83262 7.08791L10.1763 5.36113Z" fill="white"/>
          </svg>
          <span className="splash-title">Brain Tumor</span>
        </div>
      </div>
    </>
  );
}
