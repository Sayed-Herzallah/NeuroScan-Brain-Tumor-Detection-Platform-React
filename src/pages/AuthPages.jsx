import { useState, useRef, useEffect } from "react";
import { useApp, PAGES } from "../context/AppContext";
import { useForm, validateEmail, validatePassword, getPasswordRules } from "../hooks/useValidation";
import "./Auth.css";

// ── Shared: Back button ───────────────────────────────────────────────────────
function BackButton({ onClick }) {
  return (
    <button className="auth-back-btn" onClick={onClick} aria-label="Go back">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
           stroke="#2E8B8B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
  );
}

// ── Shared: Brand logo ────────────────────────────────────────────────────────
function BrandLogo() {
  return (
    <div className="auth-centered-logo">
      <svg width="26" height="26" viewBox="0 0 30 30" fill="none">
        <path d="M6.938 3.655a5.08 5.08 0 0 1 1.192-2.273A5.07 5.07 0 0 1 10.365.118c.85-.198 1.74-.146 2.562.149C13.749.562 14.469 1.087 15 1.78c.531-.693 1.251-1.218 2.073-1.513.822-.295 1.712-.347 2.562-.149a5.07 5.07 0 0 1 2.235 1.264 5.08 5.08 0 0 1 1.192 2.273l.234 1.176.761.152a5.07 5.07 0 0 1 2.839 1.755 5.09 5.09 0 0 1 1.124 3.21v.371c0 1.361-.581 2.587-1.509 3.444a5.09 5.09 0 0 1 1.662 2.597 5.09 5.09 0 0 1-.358 3.04 5.08 5.08 0 0 1-1.938 2.303 5.07 5.07 0 0 1-2.803.773l-.069.347a5.08 5.08 0 0 1-1.5 2.829 5.07 5.07 0 0 1-2.819 1.394 5.07 5.07 0 0 1-3.07-.424A5.08 5.08 0 0 1 15 27.52a5.08 5.08 0 0 1-2.5 1.685 5.07 5.07 0 0 1-3.07.424 5.07 5.07 0 0 1-2.82-1.394 5.08 5.08 0 0 1-1.5-2.829l-.069-.347a5.07 5.07 0 0 1-2.803-.773 5.08 5.08 0 0 1-1.938-2.303 5.09 5.09 0 0 1-.358-3.04 5.09 5.09 0 0 1 1.662-2.597A5.09 5.09 0 0 1 3.114 12.2a5.09 5.09 0 0 1-.838-2.885v-.371a5.09 5.09 0 0 1 1.124-3.21A5.07 5.07 0 0 1 6.239 3.98l.761-.152.938-2.173z" fill="#2E8B8B"/>
      </svg>
      <span className="auth-brand-text">Brain Tumor</span>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// Forgot Password Page
// ══════════════════════════════════════════════════════════════════════════════
export function ForgotPasswordPage() {
  const { navigate, setOtpEmail } = useApp();
  const [loading, setLoading] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, setError } =
    useForm({ email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validateEmail(values.email);
    setError("email", err);
    if (err) return;
    setLoading(true);
    setTimeout(() => {
      setOtpEmail(values.email);
      setLoading(false);
      navigate(PAGES.OTP, PAGES.FORGOT_PASSWORD);
    }, 1000);
  };

  return (
    <div className="auth-centered-page auth-fade-in">
      <BackButton onClick={() => navigate(PAGES.SIGN_IN)} />
      <BrandLogo />

      <div className="auth-centered-card">
        <div>
          <p className="auth-centered-title">Forgot Password</p>
          <p className="auth-centered-sub">
            Enter your email address and we will send you a verification code
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="form-group">
            <input
              className={`input${errors.email && touched.email ? " input-error" : ""}`}
              type="email"
              placeholder="Email Address"
              value={values.email}
              onChange={e => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email", validateEmail)}
              autoComplete="email"
            />
            {errors.email && touched.email &&
              <span className="field-error">⚠ {errors.email}</span>}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <span className="spinner" /> : "Send Code"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// OTP Page
// ══════════════════════════════════════════════════════════════════════════════
export function OtpPage() {
  const { navigate, otpEmail } = useApp();
  const [otp,     setOtp]     = useState(["", "", "", ""]);
  const [error,   setError]   = useState("");
  const [seconds, setSec]     = useState(105);
  const [loading, setLoading] = useState(false);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSec(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp]; next[i] = val; setOtp(next); setError("");
    if (val && i < 3) refs[i + 1].current?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0)
      refs[i - 1].current?.focus();
  };

  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp.some(d => !d)) { setError("Please enter all 4 digits"); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate(PAGES.RESET_PASSWORD, PAGES.OTP); }, 900);
  };

  return (
    <div className="auth-centered-page auth-fade-in">
      <BackButton onClick={() => navigate(PAGES.FORGOT_PASSWORD)} />
      <BrandLogo />

      <div className="auth-centered-card" style={{ alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p className="auth-centered-title">Enter Code</p>
          <p className="auth-centered-sub">
            Enter the verification code sent to<br />
            <strong style={{ color: "#111" }}>{otpEmail || "your email"}</strong>
          </p>
        </div>

        <form onSubmit={handleVerify} noValidate style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>

          {/* 4-digit boxes */}
          <div className="otp-row">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={refs[i]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                className={`otp-box${digit ? " otp-box--filled" : ""}${error ? " otp-box--error" : ""}`}
              />
            ))}
          </div>

          {error && <span className="field-error" style={{ textAlign: "center" }}>⚠ {error}</span>}

          <p style={{ fontSize: 13, color: "#6B7280" }}>
            Code expires in{" "}
            <span style={{ fontWeight: 600, color: seconds <= 30 ? "#EF4444" : "#F59E0B" }}>
              {fmt(seconds)}
            </span>
          </p>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: "100%" }}>
            {loading ? <span className="spinner" /> : "Verify"}
          </button>

          <button
            type="button"
            className="btn btn-outline"
            disabled={seconds > 0}
            onClick={() => setSec(105)}
            style={{ width: "100%" }}
          >
            Resend
          </button>
        </form>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// Reset Password Page
// ══════════════════════════════════════════════════════════════════════════════
export function ResetPasswordPage() {
  const { navigate } = useApp();
  const [password,  setPwd]     = useState("");
  const [showPwd,   setShowPwd] = useState(false);
  const [error,     setError]   = useState("");
  const [touched,   setTouched] = useState(false);
  const [loading,   setLoading] = useState(false);

  const rules   = getPasswordRules(password);
  const isValid = rules.minLength;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    const err = validatePassword(password);
    setError(err);
    if (err) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate(PAGES.SIGN_IN); }, 1000);
  };

  return (
    <div className="auth-centered-page auth-fade-in">
      <BackButton onClick={() => navigate(PAGES.OTP)} />
      <BrandLogo />

      <div className="auth-centered-card">
        <div style={{ textAlign: "center" }}>
          <p className="auth-centered-title">Reset Password</p>
          <p className="auth-centered-sub">Enter your new password</p>
        </div>

        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Password input */}
          <div className="form-group">
            <div className="input-wrapper">
              <input
                className={`input input-icon-right${error && touched ? " input-error" : ""}`}
                type={showPwd ? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange={e => { setPwd(e.target.value); setError(""); }}
              />
              <button type="button" className="input-right-btn" onClick={() => setShowPwd(s => !s)}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                     stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0"/>
                  {showPwd
                    ? <path d="M3 12c2.4-4 5.4-6 9-6s6.6 2 9 6c-2.4 4-5.4 6-9 6s-6.6-2-9-6z"/>
                    : <path d="M13.048 17.942A9 9 0 0 1 12 18c-3.6 0-6.6-2-9-6 2.4-4 5.4-6 9-6s6.6 2 9 6c-.41.688-.865 1.348-1.362 1.975M22 22l-5-5M17 22l5-5"/>
                  }
                </svg>
              </button>
            </div>
            {error && touched && <span className="field-error">⚠ {error}</span>}
          </div>

          {/* Password rules */}
          <div className="pwd-rules">
            {[
              [rules.minLength, "At least 6 characters"],
              [rules.hasNumber, "Contains a number"],
              [rules.hasUpper,  "Contains an uppercase letter"],
            ].map(([met, label]) => (
              <div key={label} className={`pwd-rule${met ? " pwd-rule--met" : ""}`}>
                <div className="pwd-rule-dot">
                  {met && (
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                         stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </div>
                {label}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !isValid}
            style={{ opacity: !isValid ? 0.6 : 1, cursor: !isValid ? "not-allowed" : "pointer" }}
          >
            {loading ? <span className="spinner" /> : "Done"}
          </button>
        </form>
      </div>
    </div>
  );
}