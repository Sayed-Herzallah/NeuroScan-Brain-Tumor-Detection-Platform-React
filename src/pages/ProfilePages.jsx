import { useState, useRef } from "react";
import { useApp, PAGES } from "../context/AppContext";
import TopBar from "../components/TopBar";
import { useForm, validatePassword, validateConfirmPassword, getPasswordRules } from "../hooks/useValidation";

// ─── Edit Profile Modal ───────────────────────────────────────────
function EditProfileModal({ onClose }) {
  const { user, updateUser } = useApp();
  const [name, setName] = useState(user.name);
  const [previewUrl, setPreviewUrl] = useState(user.avatarUrl || null);
  const fileRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleSave = () => {
    updateUser({ name: name.trim() || user.name, avatarUrl: previewUrl });
    onClose();
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
      zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center",
    }}
      onClick={onClose}
    >
      <div
        style={{ background: "white", width: "100%", maxWidth: "var(--max-width)", borderRadius: "24px 24px 0 0", padding: "24px 20px 40px" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div style={{ width: 40, height: 4, background: "#e0e0e0", borderRadius: 2, margin: "0 auto 20px" }} />
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20, textAlign: "center", color: "var(--text-primary)" }}>Edit Profile</h3>

        {/* Avatar picker */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div
            style={{
              width: 86, height: 86, borderRadius: "50%",
              background: previewUrl ? "transparent" : "#e8d5c4",
              overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
              border: "3px solid var(--primary-light)", cursor: "pointer", position: "relative",
            }}
            onClick={() => fileRef.current?.click()}
          >
            {previewUrl
              ? <img src={previewUrl} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8B6249" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>}
            {/* Camera overlay */}
            <div style={{
              position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </div>
          </div>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Tap to change photo</span>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
        </div>

        {/* Name input */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
            Full Name
          </label>
          <input
            className="input"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            style={{ borderRadius: 14 }}
          />
        </div>

        <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
        <button
          onClick={onClose}
          style={{ width: "100%", marginTop: 10, background: "none", border: "none", color: "var(--text-muted)", fontSize: 14, cursor: "pointer", padding: "10px 0" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── Profile Main ─────────────────────────────────────────────────
export function ProfilePage() {
  const { navigate, user, notificationsOn, setNotificationsOn } = useApp();
  const [showEdit, setShowEdit] = useState(false);

  const sections = [
    {
      title: "Account",
      sub: "Update info for better care",
      items: [
        { icon: keyIcon, label: "Change Password", page: PAGES.CHANGE_PASSWORD },
        { icon: bellIcon, label: "Notifications Settings", toggle: true, toggleState: notificationsOn, onToggle: () => setNotificationsOn(v => !v) },
      ],
    },
    {
      title: "App",
      sub: "Protecting your data with care",
      items: [
        { icon: lockIcon, label: "Data & Privacy", page: PAGES.PRIVACY },
        { icon: infoIcon, label: "About Brain Tumor", page: null },
      ],
    },
    {
      title: "Support",
      sub: "We answer about your needs",
      items: [
        { icon: faqIcon, label: "FAQ", page: PAGES.FAQ },
        { icon: mailIcon, label: "Contact Support", page: PAGES.CONTACT },
      ],
    },
  ];

  return (
    <div className="page fade-in">
      {/* Title bar */}
      <div style={{ padding: "14px 20px 11px", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 50 }}>
        <span style={{ fontSize: 16, fontWeight: 700 }}>Profile</span>
      </div>

      <div className="profile-content" style={{ padding: "14px 14px 0", display: "flex", flexDirection: "column", gap: 14 }}>

        {/* ── User Card ── */}
        <div className="card" style={{ padding: "14px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 50, height: 50, borderRadius: "50%",
            background: user.avatarUrl ? "transparent" : "#e8d5c4",
            overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, border: "2px solid var(--primary-light)",
          }}>
            {user.avatarUrl
              ? <img src={user.avatarUrl} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B6249" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", textAlign: "left", marginBottom: 2 }}>Hi, {user.name}</p>
            <p style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "left" }}>{user.email}</p>
          </div>
          {/* Edit button */}
          <button
            onClick={() => setShowEdit(true)}
            style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--primary-light)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
        </div>

        {/* ── Sections ── */}
        {sections.map(section => (
          <div key={section.title}>
            <div style={{ marginBottom: 7 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700 }}>{section.title}</h4>
              <p style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "left" }}>{section.sub}</p>
            </div>
            <div className="card" style={{ overflow: "hidden" }}>
              {section.items.map((item, i) => (
                <div
                  key={item.label}
                  onClick={item.toggle ? undefined : () => item.page && navigate(item.page)}
                  style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 14px", borderBottom: i < section.items.length - 1 ? "1px solid var(--border)" : "none", cursor: item.toggle ? "default" : "pointer", transition:"background 0.15s" }}
                  className={item.toggle ? "" : "list-item"}
                >
                  <div style={{ width:32, height:32, borderRadius:"50%", background:"var(--primary-light)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    {item.icon()}
                  </div>
                  <span style={{ flex:1, fontSize:13, fontWeight:500, color:"var(--text-primary)" }}>{item.label}</span>
                  {item.toggle ? (
                    <label className="toggle">
                      <input type="checkbox" checked={item.toggleState} onChange={item.onToggle} />
                      <span className="toggle-track"/>
                      <span className="toggle-thumb"/>
                    </label>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <button className="btn" onClick={() => navigate(PAGES.SIGN_IN)} style={{ color:"var(--danger)", border:"1.5px solid var(--danger)", background:"transparent", marginBottom:16 }}>
          Sign Out
        </button>
      </div>

      {showEdit && <EditProfileModal onClose={() => setShowEdit(false)} />}
    </div>
  );
}

// ─── Change Password ──────────────────────────────────────────────
export function ChangePasswordPage() {
  const { navigate } = useApp();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { values, errors, touched, handleChange, handleBlur, setError } = useForm({ current:"", newPwd:"", confirm:"" });

  const validate = () => {
    const errs = { current: values.current ? "" : "Required", newPwd: validatePassword(values.newPwd), confirm: validateConfirmPassword(values.newPwd, values.confirm) };
    Object.entries(errs).forEach(([k, v]) => setError(k, v));
    return Object.values(errs).every(e => !e);
  };
  const rules = getPasswordRules(values.newPwd);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); setTimeout(() => navigate(PAGES.PROFILE), 1400); }, 900);
  };

  const EyeBtn = ({ show, toggle }) => (
    <button type="button" className="input-right-btn" onClick={toggle}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
        {show ? (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>) : (<><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><line x1="1" y1="1" x2="23" y2="23"/></>)}
      </svg>
    </button>
  );

  return (
    <div className="page-no-nav fade-in" style={{ background: "white" }}>
      <TopBar title="Change Password" onBack={() => navigate(PAGES.PROFILE)} />
      <div style={{ padding: "8px 18px", display: "flex", flexDirection: "column", gap: 13 }}>
        {success && (
          <div style={{ background:"var(--success-light)", border:"1px solid #86efac", borderRadius:12, padding:"11px 14px", display:"flex", gap:8, alignItems:"center" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
            <span style={{ fontSize:13, color:"#16a34a", fontWeight:500 }}>Password changed!</span>
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[
            { key:"current", label:"Current Password", show:showCurrent, toggle:() => setShowCurrent(s => !s) },
            { key:"newPwd",  label:"New Password",     show:showNew,     toggle:() => setShowNew(s => !s) },
            { key:"confirm", label:"Confirm New Password", show:showConfirm, toggle:() => setShowConfirm(s => !s) },
          ].map(({ key, label, show, toggle }) => (
            <div key={key} className="form-group">
              <div className="input-wrapper">
                <input
                  className={`input input-icon-right ${errors[key] && touched[key] ? "input-error" : ""}`}
                  type={show ? "text" : "password"} placeholder={label}
                  value={values[key]}
                  onChange={e => handleChange(key, e.target.value)}
                  onBlur={() => handleBlur(key, v => {
                    if (key === "current") return v ? "" : "Required";
                    if (key === "newPwd") return validatePassword(v);
                    return validateConfirmPassword(values.newPwd, v);
                  })}
                />
                <EyeBtn show={show} toggle={toggle} />
              </div>
              {errors[key] && touched[key] && <span className="field-error">{errors[key]}</span>}
              {key === "newPwd" && (
                <div style={{ display:"flex", flexDirection:"column", gap:5, marginTop:4 }}>
                  {[{ met:rules.minLength, text:"At least 6 characters" }, { met:rules.hasNumber, text:"Contains a number" }].map(r => (
                    <div key={r.text} className={`pwd-rule ${r.met ? "met" : ""}`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10"/>{r.met && <polyline points="9 12 11 14 15 10"/>}
                      </svg>
                      {r.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: 6 }}>
            {loading ? <span className="spin" style={{ display:"inline-block", width:18, height:18, border:"2px solid rgba(255,255,255,0.3)", borderTop:"2px solid #fff", borderRadius:"50%" }}/> : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Notifications Page ───────────────────────────────────────────
export function NotificationsPage() {
  const { navigate } = useApp();
  const notifications = [
    { id:1, icon:"bell",  color:"#F59E0B", bg:"#FEF3C7", title:"Scan Result Available",   desc:"Your recent MRI scan result is ready.",     time:"2 min ago" },
    { id:2, icon:"warn",  color:"#F59E0B", bg:"#FEF3C7", title:"Malfunction Alert",         desc:"Camera calibration required.",               time:"5 min ago" },
    { id:3, icon:"bot",   color:"#2E8B8B", bg:"#e8f5f5", title:"AI Assistant Response",     desc:"Your question has been answered",            time:"2 hours ago" },
    { id:4, icon:"cal",   color:"#5C6BC0", bg:"#e8eaf6", title:"Upcoming Appointment",      desc:"Reminder: MRI appointment tomorrow",         time:"4 hours ago" },
    { id:5, icon:"star",  color:"#F59E0B", bg:"#FEF3C7", title:"App Update",                desc:"New features added",                         time:"2 Dec 2025" },
  ];
  const iconForType = (type, color) => {
    const s = { width:17, height:17, viewBox:"0 0 24 24", fill:"none", stroke:color, strokeWidth:2, strokeLinecap:"round", strokeLinejoin:"round" };
    if (type==="bell") return <svg {...s}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
    if (type==="warn") return <svg {...s}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>;
    if (type==="bot")  return <svg {...s}><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V3"/><circle cx="12" cy="3" r="1"/></svg>;
    if (type==="cal")  return <svg {...s}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
    if (type==="star") return <svg {...s} fill={color}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
  };
  return (
    <div className="page-no-nav fade-in" style={{ background:"var(--bg)" }}>
      <TopBar title="Notifications" onBack={() => navigate(PAGES.HOME)} />
      <div style={{ padding:"4px 14px", display:"flex", flexDirection:"column", gap:10 }}>
        {notifications.map(n => (
          <div key={n.id} className="notif-item">
            <div className="notif-icon" style={{ background:n.bg }}>{iconForType(n.icon, n.color)}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:2 }}>
                <span style={{ fontSize:13, fontWeight:600 }}>{n.title}</span>
                <span style={{ fontSize:10, color:"var(--text-muted)", flexShrink:0, marginLeft:8 }}>{n.time}</span>
              </div>
              <p style={{ fontSize:12, textAlign:"left" }}>{n.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Privacy Page ─────────────────────────────────────────────────
export function PrivacyPage() {
  const { navigate } = useApp();
  return (
    <div className="page-no-nav fade-in" style={{ background:"var(--bg)" }}>
      <TopBar title="Data & Privacy" onBack={() => navigate(PAGES.PROFILE)} />
      <div style={{ padding:"4px 14px", display:"flex", flexDirection:"column", gap:16 }}>
        <div className="card" style={{ padding:18 }}>
          <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
            <div style={{ width:38, height:38, borderRadius:"50%", background:"var(--primary-light)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {["Your privacy is our top priority. Brain Tumor collects only the information needed to provide accurate scan results and improve the AI analysis.","We do not share your personal data with third parties without your consent.","You can manage your data and notification preferences in your Profile.","All scans and results are stored securely and are accessible only by you."].map((text,i) => (
                <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:"var(--primary)", marginTop:7, flexShrink:0 }}/>
                  <p style={{ fontSize:13, lineHeight:1.6, textAlign:"left" }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className="btn btn-primary">Manage my data</button>
      </div>
    </div>
  );
}

// ─── FAQ Page ─────────────────────────────────────────────────────
export function FAQPage() {
  const { navigate } = useApp();
  const [open, setOpen] = useState(null);
  const faqs = [
    { q:"What is Brain Tumor AI Analysis?", a:"Our app uses advanced deep learning models to analyze MRI brain scans and detect potential tumor indicators with high accuracy." },
    { q:"How accurate is the AI analysis?", a:"The AI model achieves over 90% accuracy in clinical testing. However, results should always be confirmed by a medical professional." },
    { q:"Is my data secure?", a:"Yes. All data is encrypted and stored securely. We never share personal data with third parties without your consent." },
    { q:"What image formats are supported?", a:"The app supports JPG and PNG formats. For best results, use clear, unfiltered MRI images." },
    { q:"Can I delete my scan history?", a:"Yes. You can manage and delete your scan history from the History tab at any time." },
  ];
  return (
    <div className="page-no-nav fade-in" style={{ background:"var(--bg)" }}>
      <TopBar title="FAQ" onBack={() => navigate(PAGES.PROFILE)} />
      <div style={{ padding:"4px 14px", display:"flex", flexDirection:"column", gap:10 }}>
        {faqs.map((faq,i) => (
          <div key={i} className="card" style={{ overflow:"hidden" }}>
            <button onClick={() => setOpen(open===i ? null : i)} style={{ width:"100%", padding:"13px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", background:"none", border:"none", cursor:"pointer", textAlign:"left", gap:10 }}>
              <span style={{ fontSize:13, fontWeight:600, color:"var(--text-primary)", flex:1, lineHeight:1.4 }}>{faq.q}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" style={{ transform:open===i?"rotate(180deg)":"rotate(0)", transition:"transform 0.2s", flexShrink:0 }}><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            {open===i && <div style={{ padding:"0 14px 13px" }}><p style={{ fontSize:13, lineHeight:1.7, textAlign:"left" }}>{faq.a}</p></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Contact Support ──────────────────────────────────────────────
export function ContactSupportPage() {
  const { navigate } = useApp();
  const [sent, setSent] = useState(false);
  const { values, errors, touched, handleChange, handleBlur, setError } = useForm({ name:"", email:"", message:"" });

  const validate = () => {
    const n = values.name.trim() ? "" : "Required";
    const e = values.email.trim() ? "" : "Required";
    const m = values.message.trim().length >= 5 ? "" : "Required";
    setError("name",n); setError("email",e); setError("message",m);
    return !n && !e && !m;
  };
  const handleSubmit = (ev) => { ev.preventDefault(); if (!validate()) return; setTimeout(() => setSent(true), 500); };

  return (
    <div className="page-no-nav fade-in" style={{ background:"var(--bg)" }}>
      <TopBar title="Contact Support" onBack={() => navigate(PAGES.PROFILE)} />
      <div style={{ padding:"4px 14px" }}>
        {sent ? (
          <div style={{ textAlign:"center", padding:"60px 20px", display:"flex", flexDirection:"column", alignItems:"center", gap:14 }}>
            <div style={{ width:66, height:66, borderRadius:"50%", background:"var(--success-light)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
            </div>
            <h3>Message Sent!</h3>
            <p style={{ textAlign:"center" }}>Our support team will get back to you within 24 hours.</p>
            <button className="btn btn-primary" onClick={() => navigate(PAGES.PROFILE)} style={{ width:"auto", padding:"11px 30px" }}>Back to Profile</button>
          </div>
        ) : (
          <div className="card" style={{ padding:"16px" }}>
            <p style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)", marginBottom:14, textAlign:"left" }}>Send Us Message</p>
            <form onSubmit={handleSubmit} noValidate style={{ display:"flex", flexDirection:"column", gap:11 }}>
              {[["name","Full Name","text"],["email","E-mail","email"]].map(([k,ph,t]) => (
                <div key={k} className="form-group">
                  <input className={`input ${errors[k]&&touched[k]?"input-error":""}`} placeholder={ph} type={t} value={values[k]}
                    onChange={e => handleChange(k, e.target.value)}
                    onBlur={() => handleBlur(k, v => v.trim() ? "" : "Required")} style={{ borderRadius:14 }}/>
                  {errors[k]&&touched[k]&&<span className="field-error">{errors[k]}</span>}
                </div>
              ))}
              <div className="form-group">
                <textarea className={`input ${errors.message&&touched.message?"input-error":""}`} placeholder="Message" value={values.message}
                  onChange={e => handleChange("message",e.target.value)}
                  onBlur={() => handleBlur("message", v => v.trim().length>=5 ? "" : "Required")}
                  rows={4} style={{ borderRadius:14, resize:"none", fontFamily:"inherit" }}/>
                {errors.message&&touched.message&&<span className="field-error">{errors.message}</span>}
              </div>
              <button type="submit" className="btn btn-primary">Send</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Icon Helpers ─────────────────────────────────────────────────
const keyIcon  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>;
const bellIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const lockIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const infoIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="8"/><line x1="12" y1="12" x2="12" y2="16"/></svg>;
const faqIcon  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const mailIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;