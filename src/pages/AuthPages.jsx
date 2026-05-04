import { useState, useRef, useCallback } from "react";
import { useApp, PAGES } from "../context/AppContext";
import {
  useForm, validateEmail, validatePassword,
  validateConfirmPassword, getPasswordRules,
} from "../hooks/useValidation";
import { apiForgotPassword, apiResetPassword } from "../services/api";
import "./Auth.css";

const BrainLogo = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
    <path d="M6.938 3.655a5.08 5.08 0 0 1 1.192-2.273A5.07 5.07 0 0 1 10.365.118c.85-.198 1.74-.146 2.562.149C13.749.562 14.469 1.087 15 1.78c.531-.693 1.251-1.218 2.073-1.513.822-.295 1.712-.347 2.562-.149a5.07 5.07 0 0 1 2.235 1.264 5.08 5.08 0 0 1 1.192 2.273l.234 1.176.761.152a5.07 5.07 0 0 1 2.839 1.755 5.09 5.09 0 0 1 1.124 3.21v.371c0 1.361-.581 2.587-1.509 3.444a5.09 5.09 0 0 1 1.662 2.597 5.09 5.09 0 0 1-.358 3.04 5.08 5.08 0 0 1-1.938 2.303 5.07 5.07 0 0 1-2.803.773l-.069.347a5.08 5.08 0 0 1-1.5 2.829 5.07 5.07 0 0 1-2.819 1.394 5.07 5.07 0 0 1-3.07-.424A5.08 5.08 0 0 1 15 27.52a5.08 5.08 0 0 1-2.5 1.685 5.07 5.07 0 0 1-3.07.424 5.07 5.07 0 0 1-2.82-1.394 5.08 5.08 0 0 1-1.5-2.829l-.069-.347a5.07 5.07 0 0 1-2.803-.773 5.08 5.08 0 0 1-1.938-2.303 5.09 5.09 0 0 1-.358-3.04 5.09 5.09 0 0 1 1.662-2.597A5.09 5.09 0 0 1 3.114 12.2a5.09 5.09 0 0 1-.838-2.885v-.371a5.09 5.09 0 0 1 1.124-3.21A5.07 5.07 0 0 1 6.239 3.98l.761-.152.938-2.173z" fill="#2E8B8B"/>
  </svg>
);

const BackBtn = ({ onClick }) => (
  <button className="auth-back-btn" onClick={onClick} aria-label="Back">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 19l-7-7 7-7"/>
    </svg>
  </button>
);

// ── Forgot Password ───────────────────────────────────────────
export function ForgotPasswordPage() {
  const { navigate, setOtpEmail } = useApp();
  const [loading, setLoading]     = useState(false);
  const [apiError, setApiError]   = useState("");
  const [success, setSuccess]     = useState(false);

  const { values, errors, touched, handleChange, handleBlur, setError } =
    useForm({ email: "" });

  const onChangeEmail = useCallback(e => handleChange("email", e.target.value), [handleChange]);
  const onBlurEmail   = useCallback(() => handleBlur("email", validateEmail), [handleBlur]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailErr = validateEmail(values.email);
    if (emailErr) { setError("email", emailErr); return; }
    setLoading(true);
    setApiError("");
    try {
      await apiForgotPassword(values.email);
      setOtpEmail(values.email);
      setSuccess(true);
      setTimeout(() => navigate(PAGES.OTP), 1200);
    } catch (err) {
      setApiError(err.message || "Failed to send reset code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-centered-page auth-fade-in">
      <BackBtn onClick={() => navigate(PAGES.SIGN_IN)} />
      <div className="auth-centered-logo">
        <BrainLogo />
        <span style={{ color: "#2E8B8B", fontWeight: 700, fontSize: 18 }}>Brain Tumor</span>
      </div>
      <div className="auth-centered-card">
        <div>
          <div style={{ fontSize: 40, textAlign: "center", marginBottom: 12 }}>🔐</div>
          <div className="auth-centered-title">Forgot Password?</div>
          <p className="auth-centered-sub">
            Enter your email address and we'll send you a reset code.
          </p>
        </div>

        {apiError && (
          <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#dc2626" }}>
            ⚠ {apiError}
          </div>
        )}
        {success && (
          <div style={{ background: "#d1fae5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#065f46" }}>
            ✓ Reset code sent! Redirecting…
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="form-group">
            <div className="input-wrapper">
              <input
                className={`input${errors.email && touched.email ? " input-error" : ""}`}
                type="email" placeholder="Email Address"
                value={values.email}
                onChange={onChangeEmail}
                onBlur={onBlurEmail}
                autoComplete="email"
              />
            </div>
            {errors.email && touched.email && <span className="field-error">⚠ {errors.email}</span>}
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading || success}>
            {loading ? <span className="spinner" /> : "Send Reset Code"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: 14, color: "#6B7280" }}>
          Remember your password?{" "}
          <span className="link-teal" onClick={() => navigate(PAGES.SIGN_IN)}>Sign In</span>
        </p>
      </div>
    </div>
  );
}

// ── OTP Page ──────────────────────────────────────────────────
export function OtpPage() {
  const { navigate, otpEmail, setOtpToken } = useApp();
  const [otp, setOtp]         = useState(["", "", "", "", "", ""]);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const handleInput = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    setError("");
    if (val && i < 5) refs[i + 1].current?.focus();
  };

  const handleKey = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) refs[i - 1].current?.focus();
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) { setError("Please enter the full 6-digit code."); return; }
    setLoading(true);
    // ✅ Save the real OTP token so ResetPasswordPage can send it to the API
    setOtpToken(code);
    setTimeout(() => {
      setLoading(false);
      navigate(PAGES.RESET_PASSWORD);
    }, 400);
  };

  const handleResend = async () => {
    if (!otpEmail) return;
    try {
      await apiForgotPassword(otpEmail);
      setError("New code sent!");
    } catch {
      setError("Could not resend. Please try again.");
    }
  };

  return (
    <div className="auth-centered-page auth-fade-in">
      <BackBtn onClick={() => navigate(PAGES.FORGOT_PASSWORD)} />
      <div className="auth-centered-logo">
        <BrainLogo />
        <span style={{ color: "#2E8B8B", fontWeight: 700, fontSize: 18 }}>Brain Tumor</span>
      </div>
      <div className="auth-centered-card">
        <div>
          <div style={{ fontSize: 40, textAlign: "center", marginBottom: 12 }}>📧</div>
          <div className="auth-centered-title">Enter OTP Code</div>
          <p className="auth-centered-sub">
            We sent a 6-digit code to<br />
            <strong>{otpEmail || "your email"}</strong>
          </p>
        </div>

        {error && (
          <div style={{ background: error.startsWith("New") ? "#d1fae5" : "#fee2e2", border: `1px solid ${error.startsWith("New") ? "#6ee7b7" : "#fca5a5"}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: error.startsWith("New") ? "#065f46" : "#dc2626" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="otp-row" style={{ justifyContent: "center" }}>
            {otp.map((d, i) => (
              <input
                key={i} ref={refs[i]}
                className={`otp-box${d ? " otp-box--filled" : ""}${error && !error.startsWith("New") ? " otp-box--error" : ""}`}
                type="text" inputMode="numeric" maxLength={1} value={d}
                onChange={e => handleInput(i, e.target.value)}
                onKeyDown={e => handleKey(i, e)}
              />
            ))}
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <span className="spinner" /> : "Verify OTP"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: 14, color: "#6B7280" }}>
          Didn't receive it?{" "}
          <span className="link-teal" onClick={handleResend}>Resend Code</span>
        </p>
      </div>
    </div>
  );
}

// ── Reset Password ────────────────────────────────────────────
export function ResetPasswordPage() {
  const { navigate, otpEmail, otpToken } = useApp();  // ✅ use real otpToken
  const [showPwd,     setShowPwd]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [apiError,    setApiError]    = useState("");
  const [success,     setSuccess]     = useState(false);

  const { values, errors, touched, handleChange, handleBlur, setError } =
    useForm({ password: "", confirmPassword: "" });

  const rules = getPasswordRules(values.password);

  const onChangePwd  = useCallback(e => handleChange("password",        e.target.value), [handleChange]);
  const onChangeConf = useCallback(e => handleChange("confirmPassword", e.target.value), [handleChange]);
  const onBlurPwd    = useCallback(() => handleBlur("password",        validatePassword), [handleBlur]);
  const onBlurConf   = useCallback(() => handleBlur("confirmPassword", v => validateConfirmPassword(values.password, v)), [handleBlur, values.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pwdErr  = validatePassword(values.password);
    const confErr = validateConfirmPassword(values.password, values.confirmPassword);
    if (pwdErr)  { setError("password",        pwdErr);  return; }
    if (confErr) { setError("confirmPassword",  confErr); return; }

    setLoading(true);
    setApiError("");
    try {
      await apiResetPassword({
        email:           otpEmail,
        token:           otpToken,   // ✅ real token from OTP page
        newPassword:     values.password,
        confirmPassword: values.confirmPassword,
      });
      setSuccess(true);
      setTimeout(() => navigate(PAGES.SIGN_IN), 1500);
    } catch (err) {
      setApiError(err.message || "Could not reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-centered-page auth-fade-in">
      <BackBtn onClick={() => navigate(PAGES.OTP)} />
      <div className="auth-centered-logo">
        <BrainLogo />
        <span style={{ color: "#2E8B8B", fontWeight: 700, fontSize: 18 }}>Brain Tumor</span>
      </div>
      <div className="auth-centered-card">
        <div>
          <div style={{ fontSize: 40, textAlign: "center", marginBottom: 12 }}>🔑</div>
          <div className="auth-centered-title">Reset Password</div>
          <p className="auth-centered-sub">Create a strong new password for your account.</p>
        </div>

        {apiError && (
          <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#dc2626" }}>
            ⚠ {apiError}
          </div>
        )}
        {success && (
          <div style={{ background: "#d1fae5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#065f46" }}>
            ✓ Password reset! Redirecting to sign in…
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="form-group">
            <div className="input-wrapper">
              <input
                className={`input input-icon-right${errors.password && touched.password ? " input-error" : ""}`}
                type={showPwd ? "text" : "password"} placeholder="New Password"
                value={values.password}
                onChange={onChangePwd}
                onBlur={onBlurPwd}
                autoComplete="new-password"
              />
              <button type="button" className="input-right-btn" onClick={() => setShowPwd(s => !s)}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                     stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0"/>
                  <path d="M3 12c2.4-4 5.4-6 9-6s6.6 2 9 6c-2.4 4-5.4 6-9 6s-6.6-2-9-6z"/>
                </svg>
              </button>
            </div>
            {errors.password && touched.password && <span className="field-error">⚠ {errors.password}</span>}
          </div>

          {values.password && (
            <div className="pwd-rules">
              {[
                { key: "minLength", label: "At least 8 characters" },
                { key: "hasLower",  label: "Lowercase letter (a-z)" },
                { key: "hasUpper",  label: "Uppercase letter (A-Z)" },
                { key: "hasNumber", label: "Number (0-9)" },
                { key: "hasSpecial",label: "Special character (!@#…)" },
              ].map(r => (
                <div key={r.key} className={`pwd-rule${rules[r.key] ? " pwd-rule--met" : ""}`}>
                  <div className="pwd-rule-dot">
                    {rules[r.key] && (
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    )}
                  </div>
                  {r.label}
                </div>
              ))}
            </div>
          )}

          <div className="form-group">
            <div className="input-wrapper">
              <input
                className={`input input-icon-right${errors.confirmPassword && touched.confirmPassword ? " input-error" : ""}`}
                type={showConfirm ? "text" : "password"} placeholder="Confirm New Password"
                value={values.confirmPassword}
                onChange={onChangeConf}
                onBlur={onBlurConf}
                autoComplete="new-password"
              />
              <button type="button" className="input-right-btn" onClick={() => setShowConfirm(s => !s)}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                     stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0"/>
                  <path d="M3 12c2.4-4 5.4-6 9-6s6.6 2 9 6c-2.4 4-5.4 6-9 6s-6.6-2-9-6z"/>
                </svg>
              </button>
            </div>
            {errors.confirmPassword && touched.confirmPassword &&
              <span className="field-error">⚠ {errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading || success}>
            {loading ? <span className="spinner" /> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
