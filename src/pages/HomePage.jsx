import { useApp, PAGES } from "../context/AppContext";

const BRAIN_PATH = "M94.5189 52.4745L93.8993 44.7261C94.4546 44.5761 94.8699 43.9913 94.8699 43.29C94.8699 42.4749 94.3106 41.8137 93.6203 41.8137C93.5329 41.8137 93.448 41.8248 93.366 41.8449L91.2807 34.786C91.6 34.5812 91.8193 34.1867 91.8193 33.7271C91.8193 33.0593 91.361 32.5174 90.7953 32.5174C90.6527 32.5174 90.517 32.5525 90.3933 32.6147L88.2737 28.6497C88.5184 28.4024 88.6764 28.0398 88.6764 27.6299C88.6764 26.8856 88.1657 26.2819 87.5354 26.2819C87.3611 26.2819 87.1981 26.3316 87.0504 26.4143L83.9795 20.9281C84.2828 20.6249 84.4798 20.1776 84.4798 19.6716C84.4798 18.7588 83.8535 18.0189 83.0808 18.0189C82.7365 18.0189 82.4252 18.1717 82.1815 18.4154L75.659 11.2168C75.7657 11.0282 75.8283 10.8017 75.8283 10.558C75.8283 9.90234 75.3783 9.37074 74.8234 9.37074C74.5024 9.37074 74.2197 9.55188 74.0357 9.82871L66.4839 4.9431C66.5082 4.85096 66.5252 4.75487 66.5252 4.65328C66.5252 4.11262 66.1542 3.67474 65.6966 3.67474C65.3606 3.67474 65.0726 3.91219 64.9426 4.25163L55.0641 1.57472C55.0675 1.53101 55.0751 1.48888 55.0751 1.44399C55.0751 0.646586 54.5278 0 53.8528 0C53.2335 0 52.7272 0.54617 52.6468 1.25143H43.5414C43.461 0.545776 42.9547 0 42.3354 0C41.6631 0 41.1184 0.641466 41.1138 1.43454L29.251 3.22583C29.0987 2.49892 28.5467 1.95786 27.8841 1.95786C27.1041 1.95786 26.4714 2.70486 26.4714 3.6267C26.4714 3.83304 26.5074 4.02875 26.5654 4.21106L17.2056 9.89762C17.037 9.63733 16.774 9.46722 16.475 9.46722C15.965 9.46722 15.5513 9.9559 15.5513 10.5584C15.5513 10.7698 15.6047 10.9659 15.693 11.1333L5.8922 21.5893C5.64854 21.3377 5.33355 21.1802 4.98456 21.1802C4.21957 21.1802 3.59926 21.913 3.59926 22.8167C3.59926 23.4684 3.92425 24.0268 4.39124 24.2898L1.04098 36.0051C0.997978 35.9976 0.95498 35.9894 0.909981 35.9894C0.407326 35.9894 0 36.4706 0 37.0644C0 37.6106 0.346325 38.0571 0.792982 38.1256L1.26231 48.8998C0.766651 49.0191 0.393658 49.5369 0.393658 50.1575C0.393658 50.8663 0.880315 51.4412 1.4803 51.4412C1.67696 51.4412 1.85863 51.3747 2.01762 51.2672L7.13351 58.8805C7.01451 59.0479 6.94018 59.2605 6.94018 59.496C6.94018 60.0276 7.30517 60.4588 7.75516 60.4588C8.10415 60.4588 8.39948 60.1981 8.51581 59.8338L15.3357 61.114C15.3357 61.1203 15.334 61.1262 15.334 61.1329C15.334 61.8772 15.845 62.4808 16.475 62.4808C16.684 62.4808 16.8776 62.4095 17.046 62.2934L21.2872 68.6112C21.1005 68.8466 20.9839 69.1605 20.9839 69.5086C20.9839 70.2351 21.4825 70.8242 22.0975 70.8242C22.3588 70.8242 22.5962 70.7135 22.7862 70.5352L29.086 77.5121C28.9787 77.7011 28.916 77.9279 28.916 78.1729C28.916 78.8285 29.366 79.3601 29.921 79.3601C30.345 79.3601 30.706 79.049 30.8537 78.61L37.9385 80.4359C37.9378 80.4517 37.9345 80.4666 37.9345 80.4828C37.9345 81.103 38.3602 81.6059 38.8851 81.6059C39.4101 81.6059 39.8358 81.103 39.8358 80.4828C39.8358 80.395 39.8255 80.3107 39.8091 80.2288L48.3493 75.9512C48.5053 76.226 48.7703 76.4072 49.0716 76.4072C49.5422 76.4072 49.9232 75.9646 49.9382 75.4129L52.9012 74.8573C52.9842 75.1601 53.2218 75.3802 53.5058 75.3802C53.5918 75.3802 53.6735 75.3593 53.7485 75.3231L57.3594 80.9522C57.2901 81.0636 57.2481 81.2002 57.2481 81.3491C57.2481 81.7212 57.5034 82.0229 57.8184 82.0229C57.9517 82.0229 58.0727 81.9666 58.1697 81.876L64.2103 86.8935C64.1886 86.9663 64.1746 87.0435 64.1746 87.125C64.1746 87.5149 64.4423 87.8311 64.7722 87.8311C65.1022 87.8311 65.3699 87.5149 65.3699 87.125C65.3699 87.0766 65.3656 87.0294 65.3579 86.9837L70.3245 83.9449C70.4538 84.1221 70.6431 84.2367 70.8571 84.2367C71.2471 84.2367 71.5634 83.863 71.5634 83.4023C71.5634 83.3306 71.5534 83.2621 71.5391 83.1955L81.4516 77.0294C81.6059 77.2542 81.8389 77.4011 82.1032 77.4011C82.5682 77.4011 82.9452 76.9557 82.9452 76.4064C82.9452 76.0288 82.7648 75.7039 82.5022 75.5354L83.6098 71.3148C83.6682 71.3255 83.7265 71.3361 83.7872 71.3361C84.4171 71.3361 84.9281 70.7324 84.9281 69.9882C84.9281 69.761 84.8761 69.5499 84.7918 69.3621L91.387 63.6889C91.589 63.9319 91.8697 64.0835 92.181 64.0835C92.796 64.0835 93.2946 63.4944 93.2946 62.7679C93.2946 62.2418 93.0313 61.7913 92.6536 61.5806L94.2946 55.1424C94.3499 55.1522 94.4053 55.1624 94.4629 55.1624C95.0929 55.1624 95.6039 54.5592 95.6039 53.8145C95.6032 53.0943 95.1219 52.5103 94.5189 52.4745Z";

function BrainSvg({ size = 96, fill = "white" }) {
  return (
    <svg width={size} height={size * 88 / 96} viewBox="0 0 96 88" fill="none">
      <path d={BRAIN_PATH} fill={fill} />
    </svg>
  );
}

/* ── Brain Decoration — SMIL animations for SVG attributes ── */
function HeroBrainDeco({ size = 120 }) {
  const dots = [
    [0.30,0.24],[0.52,0.17],[0.73,0.27],
    [0.18,0.50],[0.44,0.43],[0.66,0.49],
    [0.83,0.53],[0.34,0.69],[0.61,0.73],
  ].map(([rx,ry]) => [rx*size, ry*size]);
  const lines = [[0,1],[1,2],[3,4],[4,5],[5,6],[7,8],[0,3],[2,5],[4,7]];

  return (
    <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
      {/* Glow — pure CSS animation via className */}
      <div className="brain-glow" style={{
        position:"absolute", inset:0, borderRadius:"50%",
        background:"radial-gradient(circle at 50% 48%, rgba(255,100,100,0.5) 0%, rgba(240,60,60,0.16) 55%, transparent 74%)",
      }}/>
      {/* Brain shape */}
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <BrainSvg size={size * 0.8} fill="rgba(255,185,185,0.92)" />
      </div>
      {/* Network — SMIL inside SVG */}
      <svg style={{ position:"absolute", inset:0, overflow:"visible" }} width={size} height={size}>
        {lines.map(([a,b],i) => (
          <line key={i}
            x1={dots[a][0]} y1={dots[a][1]}
            x2={dots[b][0]} y2={dots[b][1]}
            stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeDasharray="3 3">
            <animate attributeName="stroke-dashoffset"
              from="0" to="-12" dur="2s" begin={`${i*0.22}s`} repeatCount="indefinite"/>
          </line>
        ))}
        {dots.map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="white" opacity="0.9">
            <animate attributeName="r" values="2.5;4;2.5"
              dur="2.6s" begin={`${i*0.3}s`} repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.9;0.45;0.9"
              dur="2.6s" begin={`${i*0.3}s`} repeatCount="indefinite"/>
          </circle>
        ))}
      </svg>
    </div>
  );
}

function HowCard({ icon, label, bg, delay = 0 }) {
  return (
    <div className="hp-how-card" style={{ animationDelay:`${delay}ms` }}>
      <div className="hp-how-icon" style={{ background:bg }}>{icon}</div>
      <span className="hp-how-label">{label}</span>
    </div>
  );
}

function RecentRow({ item, onClick, isLast }) {
  const isMalignant = item.result === "Malignant";
  return (
    <div onClick={onClick} className="hp-recent-row"
      style={{ borderBottom: isLast ? "none" : "1px solid #f3f4f6" }}>
      <div className="hp-recent-thumb">
        {item.imageUrl
          ? <img src={item.imageUrl} alt="mri" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
          : <BrainSvg size={22} fill="white" />}
      </div>
      <div style={{ flex:1 }}>
        <p style={{ fontSize:12,color:"#9ca3af",marginBottom:4,textAlign:"left" }}>{item.date}</p>
        <span className={`badge ${isMalignant ? "badge-malignant" : "badge-benign"}`}>
          {isMalignant
            ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
            : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>}
          {item.result}
        </span>
      </div>
      <svg className="hp-row-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </div>
  );
}

export default function HomePage() {
  const { navigate, user, history } = useApp();
  const recent = history.slice(0, 3);

  return (
    <>
      <style>{`
        /* ── Keyframes ── */
        @keyframes slideUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes brainGlow {
          0%,100% { transform:scale(1); opacity:0.9; }
          50%      { transform:scale(1.08); opacity:1; }
        }
        @keyframes shimmer {
          0%   { background-position:-200% center; }
          100% { background-position:200% center; }
        }

        /* ── Page ── */
        .hp-page {
          height: 100dvh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          background: #f4f6f9;
          animation: fadeIn 0.25s ease;
        }

        /* ── Header ── */
        .hp-header {
          position: sticky; top:0; z-index:20;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(229,231,235,0.7);
          display: flex; align-items:center; justify-content:space-between;
          padding: 12px 16px;
        }
        .hp-header-btn {
          background:none; border:none;
          display:flex; align-items:center; gap:10px;
          cursor:pointer; padding:0;
          transition: opacity 0.18s;
        }
        .hp-header-btn:hover { opacity:0.72; }
        .hp-avatar {
          width:40px; height:40px; border-radius:50%;
          background: linear-gradient(135deg,#f0e8e0,#e8ddd5);
          display:flex; align-items:center; justify-content:center;
          overflow:hidden; flex-shrink:0;
          box-shadow: 0 0 0 2px #fff, 0 0 0 3px #2a9d8f28;
          transition: box-shadow 0.2s;
        }
        .hp-header-btn:hover .hp-avatar { box-shadow: 0 0 0 2px #fff, 0 0 0 3px #2a9d8f70; }
        .hp-bell-btn {
          background:none; border:none; cursor:pointer;
          position:relative; padding:8px; border-radius:10px;
          transition: background 0.18s, transform 0.18s;
        }
        .hp-bell-btn:hover { background:rgba(42,157,143,0.08); transform:translateY(-1px); }
        .hp-bell-btn:active { transform:scale(0.92); }
        .hp-bell-dot {
          position:absolute; top:7px; right:7px;
          width:7px; height:7px; border-radius:50%;
          background:#ef4444; border:1.5px solid #fff;
        }

        /* ── Scroll ── */
        .hp-scroll {
          flex:1; overflow-y:auto;
          /* ✅ تقليل البادنج الجانبي */
          padding: 16px 16px 90px;
          display:flex; flex-direction:column; gap:18px;
        }

        /* ── Inner container: ✅ max-width أكبر = margin أقل ── */
        .hp-inner {
          width: 100%;
          /* على الموبايل كامل العرض */
          max-width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* ── Hero ── */
        .hp-hero {
          background: linear-gradient(135deg, #2a9d8f 0%, #1e8a7d 55%, #167368 100%);
          border-radius: 18px;
          padding: 22px 18px 22px 22px;
          position: relative; overflow: hidden;
          display: flex; align-items:center; justify-content:space-between;
          min-height: 155px;
          animation: slideUp 0.35s ease both;
          box-shadow: 0 6px 24px rgba(42,157,143,0.22), 0 2px 6px rgba(0,0,0,0.07);
          transition: box-shadow 0.22s, transform 0.22s;
        }
        .hp-hero:hover {
          box-shadow: 0 10px 32px rgba(42,157,143,0.3), 0 3px 10px rgba(0,0,0,0.09);
          transform: translateY(-2px);
        }
        .hp-hero::before {
          content:""; position:absolute; border-radius:50%; pointer-events:none;
          width:200px; height:200px;
          background:rgba(255,255,255,0.055);
          top:-70px; left:-35px;
        }

        .hp-hero-text { flex:1; z-index:2; min-width:0; padding-right:8px; }
        .hp-hero-title {
          font-size:19px; font-weight:800; color:#fff;
          margin:0 0 6px; line-height:1.25; letter-spacing:-0.3px;
          animation: slideUp 0.4s ease 0.05s both;
        }
        .hp-hero-desc {
          font-size:12px; color:rgba(255,255,255,0.82);
          margin:0 0 16px; line-height:1.55;
          animation: slideUp 0.4s ease 0.1s both;
        }
        .hp-hero-btn {
          background:#fff; color:#167368;
          border:none; border-radius:50px;
          padding:9px 16px; font-size:12.5px; font-weight:700;
          display:inline-flex; align-items:center; gap:7px;
          cursor:pointer; white-space:nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          animation: slideUp 0.4s ease 0.15s both;
          position:relative; overflow:hidden;
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .hp-hero-btn:hover {
          transform:translateY(-2px) scale(1.02);
          box-shadow: 0 5px 18px rgba(0,0,0,0.17);
        }
        .hp-hero-btn:hover::after {
          content:""; position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent);
          background-size:200% 100%;
          animation: shimmer 0.65s linear;
        }
        .hp-hero-btn:active { transform:scale(0.97); }
        .hp-hero-brain {
          z-index:2; flex-shrink:0;
          animation: slideUp 0.45s ease 0.18s both;
        }
        .brain-glow { animation: brainGlow 3s ease-in-out infinite; transform-origin: center; }

        /* ── Section ── */
        .hp-section-title {
          font-size:15px; font-weight:700; color:#111827;
          margin:0 0 11px; letter-spacing:-0.15px;
        }
        .hp-section-header {
          display:flex; align-items:center;
          justify-content:space-between; margin-bottom:11px;
        }
        .hp-view-all {
          background:none; border:1px solid #e5e7eb;
          border-radius:20px; padding:5px 12px;
          font-size:11.5px; font-weight:500; color:#374151;
          cursor:pointer; display:flex; align-items:center; gap:4px;
          transition: all 0.18s;
        }
        .hp-view-all:hover {
          background:#f0fafa; border-color:#2a9d8f50; color:#2a9d8f;
          transform:translateX(2px);
        }
        .hp-view-all svg { transition:transform 0.18s; }
        .hp-view-all:hover svg { transform:translateX(3px); }

        /* ── How grid ── */
        .hp-how-grid {
          display:grid; grid-template-columns:1fr 1fr; gap:10px;
        }
        .hp-how-card {
          background:#fff; border-radius:14px; padding:16px 10px;
          display:flex; flex-direction:column; align-items:center; gap:10px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.03);
          animation: slideUp 0.38s ease both;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .hp-how-card:hover {
          transform:translateY(-4px);
          box-shadow: 0 7px 20px rgba(0,0,0,0.09), 0 0 0 1px rgba(0,0,0,0.03);
        }
        .hp-how-icon {
          width:46px; height:46px; border-radius:12px;
          display:flex; align-items:center; justify-content:center;
          transition:transform 0.2s;
        }
        .hp-how-card:hover .hp-how-icon { transform:scale(1.1) rotate(-3deg); }
        .hp-how-label {
          font-size:11px; font-weight:600; color:#374151;
          text-align:center; line-height:1.35;
        }

        /* ── Recent ── */
        .hp-recent-card {
          background:#fff; border-radius:14px; overflow:hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.03);
          animation: slideUp 0.38s ease 0.12s both;
        }
        .hp-recent-row {
          display:flex; align-items:center; gap:12px;
          padding:12px 14px; cursor:pointer;
          transition:background 0.16s;
          position:relative;
        }
        .hp-recent-row::before {
          content:""; position:absolute;
          left:0; top:0; bottom:0; width:3px;
          background:#2a9d8f;
          border-radius:0 3px 3px 0;
          transform:scaleY(0); transform-origin:center;
          transition:transform 0.18s ease;
        }
        .hp-recent-row:hover { background:rgba(42,157,143,0.035); }
        .hp-recent-row:hover::before { transform:scaleY(1); }
        .hp-recent-row:hover .hp-row-arrow { stroke:#2a9d8f; transform:translateX(3px); }
        .hp-row-arrow { transition:stroke 0.18s, transform 0.18s; }
        .hp-recent-thumb {
          width:42px; height:42px; border-radius:10px;
          background:linear-gradient(135deg,#2a9d8f,#1e7a70);
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0; overflow:hidden;
          transition:transform 0.18s;
        }
        .hp-recent-row:hover .hp-recent-thumb { transform:scale(1.05); }

        /* ── Empty ── */
        .hp-empty {
          background:#fff; border-radius:14px;
          padding:44px 20px; text-align:center;
          display:flex; flex-direction:column; align-items:center; gap:8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.03);
          animation: slideUp 0.38s ease 0.12s both;
        }
        .hp-empty-icon {
          width:52px; height:52px; border-radius:50%;
          background:#f9fafb; display:flex; align-items:center; justify-content:center;
          margin-bottom:2px;
        }

        /* ══ Tablet 640px+ ══ */
        @media (min-width:640px) {
          .hp-scroll  { padding:20px 24px 48px; }
          .hp-inner   { max-width:100%; }
          .hp-hero    { min-height:178px; padding:26px 28px; border-radius:20px; }
          .hp-hero-title { font-size:22px; }
          .hp-hero-desc  { font-size:13px; }
          .hp-hero-btn   { font-size:13px; padding:10px 18px; }
          .hp-how-grid   { grid-template-columns:repeat(4,1fr); gap:12px; }
          .hp-how-card   { padding:20px 12px; border-radius:16px; }
          .hp-how-icon   { width:52px; height:52px; }
          .hp-how-label  { font-size:12px; }
          .hp-section-title { font-size:17px; }
          .hp-recent-card { border-radius:16px; }
        }

        /* ══ Desktop 1024px+ ── sidebar=220px, الكونتنت يأخذ الباقي ══ */
        @media (min-width:1024px) {
          .hp-header { padding:13px 20px; }
          .hp-scroll  { padding:18px 20px 40px; gap:16px; }
          /* ✅ بدون max-width = المحتوى يملأ الشاشة كاملاً */
          .hp-inner   { max-width: none; gap:16px; }
          .hp-hero    { min-height:188px; padding:26px 32px; }
          .hp-hero-title { font-size:24px; }
          .hp-hero-desc  { font-size:13.5px; }
          .hp-how-grid { gap:14px; }
          .hp-how-card { padding:20px 14px; }
          .hp-how-icon { width:52px; height:52px; border-radius:14px; }
          .hp-how-label { font-size:12.5px; }
          .hp-section-title { font-size:17px; }
        }

        /* ══ Large 1440px+ ══ */
        @media (min-width:1440px) {
          .hp-scroll  { padding:20px 28px 40px; }
          .hp-hero    { padding:30px 40px; min-height:198px; }
          .hp-hero-title { font-size:26px; }
          .hp-hero-desc  { font-size:13.5px; }
        }
      `}</style>

      <div className="hp-page fade-in">

        {/* ── Header ── */}
        <div className="hp-header">
          <button className="hp-header-btn" onClick={() => navigate(PAGES.PROFILE)}>
            <div className="hp-avatar">
              {user.avatarUrl
                ? <img src={user.avatarUrl} alt="avatar" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
                : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B6249" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/>
                  </svg>}
            </div>
            <div style={{ textAlign:"left" }}>
              <p style={{ fontSize:13.5,fontWeight:700,color:"#111827",margin:0 }}>Hi, {user.name} 👋</p>
              <p style={{ fontSize:11.5,color:"#9ca3af",margin:0 }}>Ready to analyze your MRI?</p>
            </div>
          </button>

          <button className="hp-bell-btn" onClick={() => navigate(PAGES.NOTIFICATIONS)}>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span className="hp-bell-dot"/>
          </button>
        </div>

        {/* ── Content ── */}
        <div className="hp-scroll">
          <div className="hp-inner">

            {/* Hero */}
            <div className="hp-hero">
              <div className="hp-hero-text">
                <p className="hp-hero-title">AI-powered analysis</p>
                <p className="hp-hero-desc">
                  of brain MRI images using deep learning models for brain tumor detection.
                </p>
                <button onClick={() => navigate(PAGES.UPLOAD)} className="hp-hero-btn">
                  <svg width="14" height="14" viewBox="0 0 44 44" fill="none">
                    <path d="M14.3505 27.6225C4.68756 28.6764 5.76121 17.0832 14.3505 18.1371C11.1295 6.54392 29.3817 6.54392 28.3081 14.9753C39.0446 11.8136 39.0446 28.6764 29.3817 27.6225M16.4978 23.4068L21.8661 19.1911M21.8661 19.1911L27.2344 23.4068M21.8661 19.1911V35"
                      stroke="#167368" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Upload MRI Scan
                </button>
              </div>
              <div className="hp-hero-brain">
                <HeroBrainDeco size={120}/>
              </div>
            </div>

            {/* How It Works */}
            <div>
              <h3 className="hp-section-title">How It Works</h3>
              <div className="hp-how-grid">
                {[
                  { bg:"#e3f2fd", label:"Upload MRI Scan", delay:0,
                    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                    </svg> },
                  { bg:"#f3e5f5", label:"AI Analyzes The Image", delay:55,
                    icon:<div style={{ width:24,height:24,borderRadius:"50%",background:"linear-gradient(135deg,#8B4CF7,#c084fc)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="4"/>
                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
                      </svg>
                    </div> },
                  { bg:"#fff8e1", label:"View Results", delay:110,
                    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                    </svg> },
                  { bg:"#fce4ec", label:"Scan History", delay:165,
                    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg> },
                ].map(({ bg, label, icon, delay }) => (
                  <HowCard key={label} bg={bg} label={label} icon={icon} delay={delay}/>
                ))}
              </div>
            </div>

            {/* Recent Analysis */}
            <div>
              <div className="hp-section-header">
                <h3 className="hp-section-title" style={{ marginBottom:0 }}>Recent Analysis</h3>
                <button onClick={() => navigate(PAGES.HISTORY)} className="hp-view-all">
                  View History
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </div>

              {recent.length === 0 ? (
                <div className="hp-empty">
                  <div className="hp-empty-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </div>
                  <p style={{ color:"#6b7280",fontSize:13.5,fontWeight:600,margin:0 }}>No scans yet</p>
                  <p style={{ color:"#9ca3af",fontSize:12,margin:0 }}>Upload an MRI to start analysis.</p>
                </div>
              ) : (
                <div className="hp-recent-card">
                  {recent.map((item, idx) => (
                    <RecentRow key={item.id} item={item}
                      onClick={() => navigate(PAGES.RESULT)}
                      isLast={idx === recent.length - 1}/>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}