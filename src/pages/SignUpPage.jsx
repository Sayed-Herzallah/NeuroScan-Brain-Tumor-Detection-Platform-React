import { useState } from "react";
import { useApp, PAGES } from "../context/AppContext";
import {
  useForm, validateEmail, validatePassword,
  validateName, validateConfirmPassword, validateOrganisation,
} from "../hooks/useValidation";
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
  const { navigate } = useApp();
  const [showPwd,     setShowPwd]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading,     setLoading]     = useState(false);

  const { values, errors, touched, handleChange, handleBlur, setError } =
    useForm({ name: "", email: "", password: "", confirmPassword: "", organisation: "" });

  const validate = () => {
    const errs = {
      name:            validateName(values.name),
      email:           validateEmail(values.email),
      password:        validatePassword(values.password),
      confirmPassword: validateConfirmPassword(values.password, values.confirmPassword),
      organisation:    validateOrganisation(values.organisation),
    };
    Object.entries(errs).forEach(([k, v]) => setError(k, v));
    return Object.values(errs).every(e => !e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate(PAGES.HOME); }, 1200);
  };

  const Field = ({ name, placeholder, type = "text", validator, eye, show, toggleShow }) => (
    <div className="form-group">
      <div className="input-wrapper">
        <input
          className={`input${eye ? " input-icon-right" : ""}${errors[name] && touched[name] ? " input-error" : ""}`}
          type={eye ? (show ? "text" : type) : type}
          placeholder={placeholder}
          value={values[name]}
          onChange={e => handleChange(name, e.target.value)}
          onBlur={() => handleBlur(name, validator)}
          autoComplete="off"
        />
        {eye && <EyeToggle show={show} onToggle={toggleShow} />}
      </div>
      {errors[name] && touched[name] &&
        <span className="field-error">⚠ {errors[name]}</span>}
    </div>
  );

  return (
    <div className="auth-page auth-fade-in">

      {/* ── Left panel ─────────────────────────────────────── */}
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

      {/* ── Right panel ────────────────────────────────────── */}
      <div className="auth-right" style={{ justifyContent: "flex-start", paddingTop: 36 }}>
        <div className="auth-brand">
          <BrainIcon /><span className="auth-brand-text">Brain Tumor</span>
        </div>

        <div className="auth-heading">
          <h2>Sign Up</h2>
          <p>Create your account to start analyzing MRI scans safely</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="auth-form">
          <Field name="name"            placeholder="Full Name"         validator={validateName} />
          <Field name="email"           placeholder="Email Address"     type="email" validator={validateEmail} />
          <Field name="password"        placeholder="Password"          type="password"
                 validator={validatePassword}
                 eye show={showPwd}     toggleShow={() => setShowPwd(s => !s)} />
          <Field name="confirmPassword" placeholder="Confirm Password"  type="password"
                 validator={v => validateConfirmPassword(values.password, v)}
                 eye show={showConfirm} toggleShow={() => setShowConfirm(s => !s)} />
          <Field name="organisation"    placeholder="Organization"      validator={validateOrganisation} />

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: 6 }}>
            {loading ? <span className="spinner" /> : "Sign Up"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <span className="link-teal" onClick={() => navigate(PAGES.SIGN_IN)}>Sign In</span>
        </p>

        <div className="auth-divider">OR</div>

        <div className="social-btns">
          <button type="button" className="btn btn-social"><GoogleIcon /> Login Using Google</button>
          <button type="button" className="btn btn-social"><FacebookIcon /> Login Using Facebook</button>
        </div>
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
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}