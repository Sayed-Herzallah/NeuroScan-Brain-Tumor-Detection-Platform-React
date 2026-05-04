import { useState, useCallback, useEffect } from "react";
import { useApp, PAGES } from "../context/AppContext";
import { apiGetProfile, apiUpdateProfile } from "../services/api";
import { validateEmail, validatePhone } from "../hooks/useValidation";

const BackBtn = ({ onClick }) => (
  <button style={backBtnStyle} onClick={onClick}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 19l-7-7 7-7"/>
    </svg>
  </button>
);
const backBtnStyle = { width: 36, height: 36, borderRadius: "50%", background: "#F3F4F6", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" };

export default function EditProfilePage() {
  const { navigate, user, updateUser } = useApp();
  const [loading,    setLoading]    = useState(false);
  const [fetching,   setFetching]   = useState(true);   // ✅ loading profile from API
  const [apiError,   setApiError]   = useState("");
  const [success,    setSuccess]    = useState(false);

  const [name,  setName]  = useState(user.name  || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState("");

  // ── Validation errors ──
  const [nameErr,  setNameErr]  = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");

  // ✅ Load real profile data from API on mount
  useEffect(() => {
    setFetching(true);
    apiGetProfile()
      .then(data => {
        if (data) {
          setName(data.displayName || data.name || user.name || "");
          setEmail(data.email || user.email || "");
          setPhone(data.phoneNumber || "");
        }
      })
      .catch(() => { /* fallback to local state already set */ })
      .finally(() => setFetching(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onChangeName  = useCallback(e => { setName(e.target.value);  setNameErr("");  }, []);
  const onChangeEmail = useCallback(e => { setEmail(e.target.value); setEmailErr(""); }, []);
  const onChangePhone = useCallback(e => { setPhone(e.target.value); setPhoneErr(""); }, []);

  const validate = () => {
    let valid = true;
    if (!name.trim()) { setNameErr("Full name is required"); valid = false; }
    else if (name.trim().length < 2) { setNameErr("Name must be at least 2 characters"); valid = false; }

    const eErr = email ? validateEmail(email) : "";
    if (eErr) { setEmailErr(eErr); valid = false; }

    const pErr = phone ? validatePhone(phone) : "";
    if (pErr) { setPhoneErr(pErr); valid = false; }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError("");
    try {
      await apiUpdateProfile({
        displayName: name.trim(),
        email:       email || undefined,
        phoneNumber: phone || undefined,
      });
      updateUser({ name: name.trim(), email });
      setSuccess(true);
      setTimeout(() => navigate(PAGES.PROFILE), 1200);
    } catch (err) {
      setApiError(err.message || "Could not update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div style={{ ...styles.page, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 80 }}>
        <span style={{ color: "#9CA3AF", fontSize: 15 }}>Loading profile…</span>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <BackBtn onClick={() => navigate(PAGES.PROFILE)} />
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#111", margin: 0 }}>Edit Profile</h1>
      </div>

      {/* Avatar */}
      <div style={styles.avatarWrapper}>
        <div style={styles.avatar}>
          <span style={styles.avatarLetter}>{(name || "U")[0].toUpperCase()}</span>
        </div>
      </div>

      {apiError && <div style={styles.errorBanner}>⚠ {apiError}</div>}
      {success  && <div style={styles.successBanner}>✓ Profile updated!</div>}

      <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Full Name */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Full Name</label>
          <input
            style={{ ...styles.input, ...(nameErr ? styles.inputError : {}) }}
            type="text" placeholder="Your full name"
            value={name} onChange={onChangeName}
            onBlur={() => {
              if (!name.trim()) setNameErr("Full name is required");
              else if (name.trim().length < 2) setNameErr("Name must be at least 2 characters");
            }}
            autoComplete="name"
          />
          {nameErr && <span style={styles.fieldError}>⚠ {nameErr}</span>}
        </div>

        {/* Email */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            style={{ ...styles.input, ...(emailErr ? styles.inputError : {}) }}
            type="email" placeholder="Your email"
            value={email} onChange={onChangeEmail}
            onBlur={() => { if (email) setEmailErr(validateEmail(email)); }}
            autoComplete="email"
          />
          {emailErr && <span style={styles.fieldError}>⚠ {emailErr}</span>}
        </div>

        {/* Phone */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Phone (optional)</label>
          <input
            style={{ ...styles.input, ...(phoneErr ? styles.inputError : {}) }}
            type="tel" placeholder="01XXXXXXXXX"
            value={phone} onChange={onChangePhone}
            onBlur={() => { if (phone) setPhoneErr(validatePhone(phone)); }}
            autoComplete="tel"
          />
          {phoneErr && <span style={styles.fieldError}>⚠ {phoneErr}</span>}
        </div>

        <button type="submit" style={styles.submitBtn} disabled={loading || success}>
          {loading ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  page:          { padding: "24px 20px 100px", maxWidth: 600, margin: "0 auto" },
  avatarWrapper: { display: "flex", justifyContent: "center", marginBottom: 28 },
  avatar:        { width: 80, height: 80, borderRadius: "50%", background: "#E0F7FA", display: "flex", alignItems: "center", justifyContent: "center" },
  avatarLetter:  { fontSize: 32, fontWeight: 700, color: "#2E8B8B" },
  errorBanner:   { background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#DC2626", marginBottom: 14 },
  successBanner: { background: "#D1FAE5", border: "1px solid #6EE7B7", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#065F46", marginBottom: 14 },
  formGroup:     { display: "flex", flexDirection: "column", gap: 6 },
  label:         { fontSize: 13, fontWeight: 600, color: "#374151" },
  input:         { padding: "13px 16px", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 14, color: "#111", outline: "none" },
  inputError:    { borderColor: "#EF4444", background: "#FFF8F8" },
  fieldError:    { fontSize: 12, color: "#EF4444" },
  submitBtn:     { width: "100%", padding: "14px", background: "#2E8B8B", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 4 },
};
