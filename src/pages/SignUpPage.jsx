import { useState, useCallback } from "react";
import { useApp, PAGES } from "../context/AppContext";
import {
  useForm, validateEmail, validatePassword,
  validateName, validateConfirmPassword, validatePhone,
  getPasswordRules,
} from "../hooks/useValidation";
import { apiRegister, saveUser } from "../services/api";
import "./Auth.css";

function EyeToggle({ show, onToggle }) {
  return (
    <button type="button" className="input-right-btn" onClick={onToggle} aria-label="Toggle password">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
           stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0"/>
        {show
          ? <path d="M3 12c2.4-4 5.4-6 9-6s6.6 2 9 6c-2.4 4-5.4 6-9 6s-6.6-2-9-6z"/>
          : <path d="M13.048 17.942A9 9 0 0 1 12 18c-3.6 0-6.6-2-9-6 2.4-4 5.4-6 9-6s6.6 2 9 6c-.41.688-.865 1.348-1.362 1.975M22 22l-5-5M17 22l5-5"/>
        }
      </svg>
    </button>
  );
}

export default function SignUpPage() {
  const { navigate, updateUser } = useApp();
  const [showPwd,     setShowPwd]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [apiError,    setApiError]    = useState("");

  const { values, errors, touched, handleChange, handleBlur, setError } =
    useForm({ name: "", email: "", phone: "", password: "", confirmPassword: "" });

  const rules = getPasswordRules(values.password);

  const validate = () => {
    const errs = {
      name:            validateName(values.name),
      email:           validateEmail(values.email),
      phone:           validatePhone(values.phone),
      password:        validatePassword(values.password),
      confirmPassword: validateConfirmPassword(values.password, values.confirmPassword),
    };
    Object.entries(errs).forEach(([k, v]) => setError(k, v));
    return Object.values(errs).every(e => !e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError("");
    try {
      const data = await apiRegister({
        displayName:     values.name.trim(),
        email:           values.email,
        phoneNumber:     values.phone || undefined,
        password:        values.password,
        confirmPassword: values.confirmPassword,
      });
      const userData = data?.user || data;
      const name = userData?.displayName || values.name.trim();
      saveUser({ displayName: name, email: values.email });
      updateUser({ name, email: values.email, avatarUrl: null });
      navigate(PAGES.HOME);
    } catch (err) {
      setApiError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fix: handlers defined outside JSX so no new function on every render
  const onChangeName  = useCallback(e => handleChange("name",            e.target.value), [handleChange]);
  const onChangeEmail = useCallback(e => handleChange("email",           e.target.value), [handleChange]);
  const onChangePhone = useCallback(e => handleChange("phone",           e.target.value), [handleChange]);
  const onChangePwd   = useCallback(e => handleChange("password",        e.target.value), [handleChange]);
  const onChangeConf  = useCallback(e => handleChange("confirmPassword", e.target.value), [handleChange]);

  const onBlurName    = useCallback(() => handleBlur("name",            validateName),     [handleBlur]);
  const onBlurEmail   = useCallback(() => handleBlur("email",           validateEmail),    [handleBlur]);
  const onBlurPhone   = useCallback(() => handleBlur("phone",           validatePhone),    [handleBlur]);
  const onBlurPwd     = useCallback(() => handleBlur("password",        validatePassword), [handleBlur]);
  const onBlurConf    = useCallback(() => handleBlur("confirmPassword", v => validateConfirmPassword(values.password, v)), [handleBlur, values.password]);

  return (
    <div className="auth-page auth-fade-in">
      <div className="auth-left">
        <div className="auth-left-emoji">🧠</div>
        <div className="auth-left-title">Brain Tumor<br />Detection AI</div>
        <p className="auth-left-sub">
          Join thousands of medical professionals using AI-powered MRI analysis
          for faster, more accurate diagnoses.
        </p>
        <div className="auth-left-features">
          {["AI-powered MRI scan analysis", "Fast & accurate results", "Trusted by medical professionals"].map(f => (
            <div className="auth-left-feature" key={f}>
              <div className="auth-left-dot" /><span>{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="auth-right" style={{ justifyContent: "flex-start", paddingTop: 36 }}>
        <div className="auth-brand">
          <BrainIcon /><span className="auth-brand-text">Brain Tumor</span>
        </div>

        <div className="auth-heading">
          <h2>Sign Up</h2>
          <p>Create your account to start analyzing MRI scans safely</p>
        </div>

        {apiError && (
          <div style={{ width: "100%", maxWidth: 560, marginBottom: 12, background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#dc2626", textAlign: "left" }}>
            ⚠ {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="auth-form">
          {/* Full Name */}
          <div className="form-group">
            <div className="input-wrapper">
              <input
                className={`input${errors.name && touched.name ? " input-error" : ""}`}
                type="text" placeholder="Full Name"
                value={values.name}
                onChange={onChangeName}
                onBlur={onBlurName}
                autoComplete="name"
              />
            </div>
            {errors.name && touched.name && <span className="field-error">⚠ {errors.name}</span>}
          </div>

          {/* Email */}
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

          {/* Phone */}
          <div className="form-group">
            <div className="input-wrapper">
              <input
                className={`input${errors.phone && touched.phone ? " input-error" : ""}`}
                type="tel" placeholder="Phone Number (optional — 01XXXXXXXXX)"
                value={values.phone}
                onChange={onChangePhone}
                onBlur={onBlurPhone}
                autoComplete="tel"
              />
            </div>
            {errors.phone && touched.phone && <span className="field-error">⚠ {errors.phone}</span>}
          </div>

          {/* Password */}
          <div className="form-group">
            <div className="input-wrapper">
              <input
                className={`input input-icon-right${errors.password && touched.password ? " input-error" : ""}`}
                type={showPwd ? "text" : "password"} placeholder="Password"
                value={values.password}
                onChange={onChangePwd}
                onBlur={onBlurPwd}
                autoComplete="new-password"
              />
              <EyeToggle show={showPwd} onToggle={() => setShowPwd(s => !s)} />
            </div>
            {errors.password && touched.password && <span className="field-error">⚠ {errors.password}</span>}
          </div>

          {/* Password strength indicator */}
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

          {/* Confirm Password */}
          <div className="form-group">
            <div className="input-wrapper">
              <input
                className={`input input-icon-right${errors.confirmPassword && touched.confirmPassword ? " input-error" : ""}`}
                type={showConfirm ? "text" : "password"} placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={onChangeConf}
                onBlur={onBlurConf}
                autoComplete="new-password"
              />
              <EyeToggle show={showConfirm} onToggle={() => setShowConfirm(s => !s)} />
            </div>
            {errors.confirmPassword && touched.confirmPassword &&
              <span className="field-error">⚠ {errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: 6 }}>
            {loading ? <span className="spinner" /> : "Sign Up"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <span className="link-teal" onClick={() => navigate(PAGES.SIGN_IN)}>Sign In</span>
        </p>
      </div>
    </div>
  );
}

function BrainIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 30 30" fill="none">
      <path d="M6.938 3.655a5.08 5.08 0 0 1 1.192-2.273A5.07 5.07 0 0 1 10.365.118c.85-.198 1.74-.146 2.562.149C13.749.562 14.469 1.087 15 1.78c.531-.693 1.251-1.218 2.073-1.513.822-.295 1.712-.347 2.562-.149a5.07 5.07 0 0 1 2.235 1.264 5.08 5.08 0 0 1 1.192 2.273l.234 1.176.761.152a5.07 5.07 0 0 1 2.839 1.755 5.09 5.09 0 0 1 1.124 3.21v.371c0 1.361-.581 2.587-1.509 3.444a5.09 5.09 0 0 1 1.662 2.597 5.09 5.09 0 0 1-.358 3.04 5.08 5.08 0 0 1-1.938 2.303 5.07 5.07 0 0 1-2.803.773l-.069.347a5.08 5.08 0 0 1-1.5 2.829 5.07 5.07 0 0 1-2.819 1.394 5.07 5.07 0 0 1-3.07-.424A5.08 5.08 0 0 1 15 27.52a5.08 5.08 0 0 1-2.5 1.685 5.07 5.07 0 0 1-3.07.424 5.07 5.07 0 0 1-2.82-1.394 5.08 5.08 0 0 1-1.5-2.829l-.069-.347a5.07 5.07 0 0 1-2.803-.773 5.08 5.08 0 0 1-1.938-2.303 5.09 5.09 0 0 1-.358-3.04 5.09 5.09 0 0 1 1.662-2.597A5.09 5.09 0 0 1 3.114 12.2a5.09 5.09 0 0 1-.838-2.885v-.371a5.09 5.09 0 0 1 1.124-3.21A5.07 5.07 0 0 1 6.239 3.98l.761-.152.938-2.173z" fill="#2E8B8B"/>
    </svg>
  );
}
