import { useState, useEffect } from "react";
import { useApp, PAGES } from "../context/AppContext";
import {
  apiLogout, apiChangePassword, apiGetNotifications,
  apiMarkNotificationRead, apiMarkAllNotificationsRead,
  apiUpdateProfile,
} from "../services/api";
import { useForm, validatePassword, validateConfirmPassword } from "../hooks/useValidation";

const BackBtn = ({ onClick }) => (
  <button style={backBtnStyle} onClick={onClick}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 19l-7-7 7-7"/>
    </svg>
  </button>
);
const backBtnStyle = { width: 36, height: 36, borderRadius: "50%", background: "#F3F4F6", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" };

// ── Profile Home ──────────────────────────────────────────────
export function ProfilePage() {
  const { navigate, user, logout } = useApp();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    await apiLogout();
    logout();
  };

  const menuItems = [
    { icon: "🔔", label: "Notifications",   page: PAGES.NOTIFICATIONS },
    { icon: "🔒", label: "Change Password",  page: PAGES.CHANGE_PASSWORD },
    { icon: "🛡️", label: "Privacy Policy",   page: PAGES.PRIVACY },
    { icon: "❓", label: "FAQ",              page: PAGES.FAQ },
    { icon: "📞", label: "Contact Us",       page: PAGES.CONTACT },
  ];

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Profile</h1>

      {/* Avatar card */}
      <div style={styles.avatarCard}>
        <div style={styles.avatar}>
          {user.avatarUrl
            ? <img src={user.avatarUrl} alt="avatar" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
            : <span style={styles.avatarLetter}>{(user.name || "U")[0].toUpperCase()}</span>
          }
        </div>
        <div style={styles.userInfo}>
          <div style={styles.userName}>{user.name || "User"}</div>
          <div style={styles.userEmail}>{user.email || ""}</div>
        </div>
        <button style={styles.editBtn} onClick={() => navigate(PAGES.EDIT_PROFILE)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E8B8B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
      </div>

      {/* Menu */}
      <div style={styles.menuCard}>
        {menuItems.map(item => (
          <button key={item.label} style={styles.menuRow} onClick={() => navigate(item.page)}>
            <span style={styles.menuIcon}>{item.icon}</span>
            <span style={styles.menuLabel}>{item.label}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        ))}
      </div>

      {/* Logout */}
      {!showLogoutConfirm ? (
        <button style={styles.logoutBtn} onClick={() => setShowLogoutConfirm(true)}>
          🚪 Sign Out
        </button>
      ) : (
        <div style={styles.confirmBox}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#111", marginBottom: 12 }}>Sign out of your account?</div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={styles.cancelBtn} onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
            <button style={styles.confirmLogoutBtn} onClick={handleLogout}>Sign Out</button>
          </div>
        </div>
      )}

      <div style={styles.versionText}>NeuroScan v1.0.0</div>
    </div>
  );
}

// ── Change Password ───────────────────────────────────────────
export function ChangePasswordPage() {
  const { navigate } = useApp();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew,     setShowNew]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [apiError,    setApiError]    = useState("");
  const [success,     setSuccess]     = useState(false);

  const { values, errors, touched, handleChange, handleBlur, setError } =
    useForm({ current: "", newPwd: "", confirm: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.current) { setError("current", "Current password is required"); return; }
    const pwdErr  = validatePassword(values.newPwd);
    const confErr = validateConfirmPassword(values.newPwd, values.confirm);
    if (pwdErr)  { setError("newPwd",  pwdErr);  return; }
    if (confErr) { setError("confirm", confErr);  return; }

    setLoading(true);
    setApiError("");
    try {
      await apiChangePassword({
        currentPassword:    values.current,
        newPassword:        values.newPwd,
        confirmPassword: values.confirm,
      });
      setSuccess(true);
      setTimeout(() => navigate(PAGES.PROFILE), 1500);
    } catch (err) {
      setApiError(err.message || "Could not change password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const PwdField = ({ name, placeholder, show, toggle }) => (
    <div style={styles.formGroup}>
      <div style={{ position: "relative" }}>
        <input
          style={{ ...styles.input, ...(errors[name] && touched[name] ? styles.inputError : {}) }}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={values[name]}
          onChange={e => handleChange(name, e.target.value)}
          onBlur={() => handleBlur(name, name === "current" ? null : (v => validatePassword(v)))}
        />
        <button type="button" style={styles.eyeBtn} onClick={toggle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0"/>
            <path d="M3 12c2.4-4 5.4-6 9-6s6.6 2 9 6c-2.4 4-5.4 6-9 6s-6.6-2-9-6z"/>
          </svg>
        </button>
      </div>
      {errors[name] && touched[name] && <span style={styles.fieldError}>⚠ {errors[name]}</span>}
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <BackBtn onClick={() => navigate(PAGES.PROFILE)} />
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#111", margin: 0 }}>Change Password</h1>
      </div>

      {apiError && <div style={styles.errorBanner}>⚠ {apiError}</div>}
      {success  && <div style={styles.successBanner}>✓ Password changed! Redirecting…</div>}

      <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <PwdField name="current" placeholder="Current Password" show={showCurrent} toggle={() => setShowCurrent(s => !s)} />
        <PwdField name="newPwd"  placeholder="New Password"     show={showNew}     toggle={() => setShowNew(s => !s)} />
        <PwdField name="confirm" placeholder="Confirm Password" show={showConfirm} toggle={() => setShowConfirm(s => !s)} />
        <button type="submit" style={styles.submitBtn} disabled={loading || success}>
          {loading ? "Saving…" : "Update Password"}
        </button>
      </form>
    </div>
  );
}

// ── Notifications ─────────────────────────────────────────────
export function NotificationsPage() {
  const { navigate } = useApp();
  const [notifs,   setNotifs]   = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    apiGetNotifications()
      .then(data => setNotifs(Array.isArray(data) ? data : []))
      .catch(() => setNotifs([]))
      .finally(() => setLoading(false));
  }, []);

  const markRead = async (id) => {
    try {
      await apiMarkNotificationRead(id);
      setNotifs(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch { /* ignore */ }
  };

  const markAllRead = async () => {
    try {
      await apiMarkAllNotificationsRead();
      setNotifs(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch { /* ignore */ }
  };

  const unreadCount = notifs.filter(n => !n.isRead).length;

  return (
    <div style={styles.page}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onClick={() => navigate(PAGES.PROFILE)} />
          <h1 style={{ fontSize: 18, fontWeight: 700, color: "#111", margin: 0 }}>Notifications</h1>
        </div>
        {unreadCount > 0 && (
          <button style={styles.markAllBtn} onClick={markAllRead}>Mark all read</button>
        )}
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#9CA3AF" }}>Loading notifications…</div>
      )}

      {!loading && notifs.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: 48 }}>🔔</div>
          <div style={{ fontWeight: 600, color: "#374151", marginTop: 8 }}>No notifications</div>
          <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>You're all caught up!</div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {notifs.map(n => (
          <div
            key={n.id}
            style={{ ...styles.notifCard, background: n.isRead ? "#fff" : "#F0FDFA", borderColor: n.isRead ? "#E5E7EB" : "#99F6E4" }}
            onClick={() => !n.isRead && markRead(n.id)}
          >
            <div style={{ fontSize: 24, flexShrink: 0 }}>{n.icon || "🔔"}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: n.isRead ? 500 : 700, color: "#111" }}>{n.title || n.message}</div>
              {n.body && <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{n.body}</div>}
              {n.createdAt && (
                <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4 }}>
                  {new Date(n.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
              )}
            </div>
            {!n.isRead && <div style={styles.unreadDot} />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Privacy / FAQ / Contact (static) ─────────────────────────
export function PrivacyPage() {
  const { navigate } = useApp();
  return (
    <div style={styles.page}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <BackBtn onClick={() => navigate(PAGES.PROFILE)} />
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#111", margin: 0 }}>Privacy Policy</h1>
      </div>
      <div style={styles.staticCard}>
        {[
          { title: "Data Collection", body: "We collect MRI scan images and account information solely for the purpose of providing AI-powered brain tumor detection services." },
          { title: "Data Usage",      body: "Your scans and analysis results are used only to provide you with diagnostic insights. We do not share your data with third parties without consent." },
          { title: "Data Security",   body: "All data is encrypted in transit and at rest using industry-standard AES-256 encryption." },
          { title: "Your Rights",     body: "You may request deletion of your account and all associated data at any time by contacting our support team." },
        ].map(s => (
          <div key={s.title} style={styles.staticSection}>
            <div style={styles.staticTitle}>{s.title}</div>
            <div style={styles.staticBody}>{s.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FaqPage() {
  const { navigate } = useApp();
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "How accurate is the AI diagnosis?", a: "Our model achieves approximately 95% accuracy on validated MRI datasets. It is designed to support, not replace, professional medical diagnosis." },
    { q: "Is my data safe?", a: "Yes. All images and personal data are encrypted and stored securely. We never share your data with third parties." },
    { q: "What types of tumors can be detected?", a: "The AI is trained to detect common brain tumor types including gliomas, meningiomas, and pituitary tumors." },
    { q: "How long does analysis take?", a: "Analysis typically completes within 5–15 seconds after uploading a scan." },
    { q: "Can I delete my scan history?", a: "Yes. You can delete individual scans from the History page or contact support to remove all your data." },
  ];
  return (
    <div style={styles.page}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <BackBtn onClick={() => navigate(PAGES.PROFILE)} />
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#111", margin: 0 }}>FAQ</h1>
      </div>
      <div style={styles.staticCard}>
        {faqs.map((f, i) => (
          <div key={i} style={styles.faqItem} onClick={() => setOpen(open === i ? null : i)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={styles.staticTitle}>{f.q}</span>
              <span style={{ fontSize: 18, color: "#2E8B8B" }}>{open === i ? "−" : "+"}</span>
            </div>
            {open === i && <div style={{ ...styles.staticBody, marginTop: 8 }}>{f.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContactPage() {
  const { navigate } = useApp();
  return (
    <div style={styles.page}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <BackBtn onClick={() => navigate(PAGES.PROFILE)} />
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#111", margin: 0 }}>Contact Us</h1>
      </div>
      <div style={styles.staticCard}>
        {[
          { icon: "📧", label: "Email",   value: "support@neuroscan.ai" },
          { icon: "📞", label: "Phone",   value: "+1 (800) 123-4567" },
          { icon: "🌐", label: "Website", value: "www.neuroscan.ai" },
        ].map(c => (
          <div key={c.label} style={styles.contactRow}>
            <span style={{ fontSize: 24 }}>{c.icon}</span>
            <div>
              <div style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 500 }}>{c.label}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#2E8B8B" }}>{c.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page:          { padding: "24px 20px 100px", maxWidth: 600, margin: "0 auto" },
  title:         { fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 20 },
  avatarCard:    { display: "flex", alignItems: "center", gap: 14, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, padding: "18px 16px", marginBottom: 20 },
  avatar:        { width: 60, height: 60, borderRadius: "50%", background: "#E0F7FA", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 },
  avatarLetter:  { fontSize: 24, fontWeight: 700, color: "#2E8B8B" },
  userInfo:      { flex: 1 },
  userName:      { fontSize: 16, fontWeight: 700, color: "#111" },
  userEmail:     { fontSize: 13, color: "#9CA3AF", marginTop: 2 },
  editBtn:       { width: 36, height: 36, borderRadius: "50%", background: "#E0F7FA", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  menuCard:      { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, overflow: "hidden", marginBottom: 20 },
  menuRow:       { display: "flex", alignItems: "center", gap: 14, padding: "16px", background: "none", border: "none", borderBottom: "1px solid #F3F4F6", cursor: "pointer", width: "100%", textAlign: "left" },
  menuIcon:      { fontSize: 20 },
  menuLabel:     { flex: 1, fontSize: 14, fontWeight: 500, color: "#374151" },
  logoutBtn:     { width: "100%", padding: "14px", background: "#FEF2F2", color: "#DC2626", border: "1.5px solid #FECACA", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 16 },
  confirmBox:    { background: "#FEF2F2", border: "1.5px solid #FECACA", borderRadius: 14, padding: "16px", marginBottom: 16 },
  cancelBtn:     { flex: 1, padding: "10px", background: "#fff", color: "#374151", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" },
  confirmLogoutBtn: { flex: 1, padding: "10px", background: "#DC2626", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" },
  versionText:   { textAlign: "center", fontSize: 12, color: "#D1D5DB" },
  formGroup:     { display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 },
  input:         { width: "100%", padding: "13px 44px 13px 16px", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 14, color: "#111", outline: "none", boxSizing: "border-box" },
  inputError:    { borderColor: "#EF4444", background: "#FFF8F8" },
  fieldError:    { fontSize: 12, color: "#EF4444" },
  eyeBtn:        { position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" },
  submitBtn:     { width: "100%", padding: "14px", background: "#2E8B8B", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 4 },
  errorBanner:   { background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#DC2626", marginBottom: 14 },
  successBanner: { background: "#D1FAE5", border: "1px solid #6EE7B7", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#065F46", marginBottom: 14 },
  markAllBtn:    { fontSize: 12, fontWeight: 600, color: "#2E8B8B", background: "none", border: "none", cursor: "pointer", padding: "4px 8px" },
  notifCard:     { display: "flex", alignItems: "flex-start", gap: 12, padding: "14px", border: "1px solid #E5E7EB", borderRadius: 14, cursor: "pointer" },
  unreadDot:     { width: 8, height: 8, borderRadius: "50%", background: "#2E8B8B", flexShrink: 0, marginTop: 6 },
  staticCard:    { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, overflow: "hidden" },
  staticSection: { padding: "16px", borderBottom: "1px solid #F3F4F6" },
  faqItem:       { padding: "16px", borderBottom: "1px solid #F3F4F6", cursor: "pointer" },
  staticTitle:   { fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 6 },
  staticBody:    { fontSize: 13, color: "#6B7280", lineHeight: 1.7 },
  contactRow:    { display: "flex", alignItems: "center", gap: 14, padding: "16px", borderBottom: "1px solid #F3F4F6" },
};
