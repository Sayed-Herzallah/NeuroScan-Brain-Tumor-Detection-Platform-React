import { useState } from "react";
import { useApp, PAGES } from "../context/AppContext";
import { useForm, validateEmail, validatePassword } from "../hooks/useValidation";
import { apiLogin, saveUser } from "../services/api";
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

export default function SignInPage() {
  const { navigate, updateUser } = useApp();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const { values, errors, touched, handleChange, handleBlur, setError } =
    useForm({ email: "", password: "" });

  const validate = () => {
    const emailErr = validateEmail(values.email);
    const pwdErr   = validatePassword(values.password);
    setError("email",    emailErr);
    setError("password", pwdErr);
    return !emailErr && !pwdErr;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError("");
    try {
      const data = await apiLogin(values.email, values.password);
      const userData = data?.user || data;
      const name = userData?.displayName || userData?.name || values.email.split("@")[0];
      const userObj = { name, email: values.email, avatarUrl: null };
      saveUser({ displayName: name, email: values.email });
      updateUser(userObj);
      navigate(PAGES.HOME);
    } catch (err) {
      setApiError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page auth-fade-in">
      <div className="auth-left">
        <div className="auth-left-emoji">🧠</div>
        <div className="auth-left-title">Brain Tumor<br />Detection AI</div>
        <p className="auth-left-sub">
          Advanced MRI analysis powered by deep learning. Fast, accurate,
          and designed to support medical professionals.
        </p>
        <div className="auth-left-features">
          {["AI-powered MRI scan analysis", "Fast & accurate results", "Trusted by medical professionals"].map(f => (
            <div className="auth-left-feature" key={f}>
              <div className="auth-left-dot" /><span>{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-brand">
          <BrainIcon /><span className="auth-brand-text">Brain Tumor</span>
        </div>

        <div className="auth-heading">
          <h2>Sign In</h2>
          <p>Welcome back! Log in to check your results</p>
        </div>

        {apiError && (
          <div style={{ width: "100%", maxWidth: 560, marginBottom: 12, background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#dc2626", textAlign: "left" }}>
            ⚠ {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="auth-form">
          <div className="form-group">
            <div className="input-wrapper">
              <input
                className={`input${errors.email && touched.email ? " input-error" : ""}`}
                type="email" placeholder="Email Address"
                value={values.email}
                onChange={e => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email", validateEmail)}
                autoComplete="email"
              />
            </div>
            {errors.email && touched.email &&
              <span className="field-error">⚠ {errors.email}</span>}
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <input
                className={`input input-icon-right${errors.password && touched.password ? " input-error" : ""}`}
                type={showPwd ? "text" : "password"} placeholder="Password"
                value={values.password}
                onChange={e => handleChange("password", e.target.value)}
                onBlur={() => handleBlur("password", validatePassword)}
                autoComplete="current-password"
              />
              <EyeToggle show={showPwd} onToggle={() => setShowPwd(s => !s)} />
            </div>
            {errors.password && touched.password &&
              <span className="field-error">⚠ {errors.password}</span>}
          </div>

          <div style={{ textAlign: "right", marginTop: -4 }}>
            <span className="link-teal" onClick={() => navigate(PAGES.FORGOT_PASSWORD)}>
              Forget Password?
            </span>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <span className="spinner" /> : "Sign In"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <span className="link-teal" onClick={() => navigate(PAGES.SIGN_UP)}>Sign Up</span>
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
