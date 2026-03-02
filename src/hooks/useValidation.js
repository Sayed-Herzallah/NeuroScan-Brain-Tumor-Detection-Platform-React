import { useState } from "react";

// ─── Email ──────────────────────────────────────────────────
export function validateEmail(email) {
  if (!email.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Please enter a valid email address";
  return "";
}

// ─── Password ───────────────────────────────────────────────
export function validatePassword(password) {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return "";
}

export function getPasswordRules(password) {
  return {
    minLength: password.length >= 6,
    hasNumber: /\d/.test(password),
    hasUpper:  /[A-Z]/.test(password),
  };
}

// ─── Name ───────────────────────────────────────────────────
export function validateName(name) {
  if (!name.trim()) return "Full name is required";
  if (name.trim().length < 2) return "Name must be at least 2 characters";
  return "";
}

// ─── Confirm Password ───────────────────────────────────────
export function validateConfirmPassword(password, confirm) {
  if (!confirm) return "Please confirm your password";
  if (password !== confirm) return "Passwords do not match";
  return "";
}

// ─── Organisation ───────────────────────────────────────────
export function validateOrganisation(org) {
  if (!org.trim()) return "Organisation is required";
  return "";
}

// ─── useForm hook ───────────────────────────────────────────
export function useForm(initialValues) {
  const [values,  setValues]  = useState(initialValues);
  const [errors,  setErrors]  = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (field, value) => {
    setValues(v => ({ ...v, [field]: value }));
    if (touched[field]) setErrors(e => ({ ...e, [field]: "" }));
  };

  const handleBlur = (field, validatorFn) => {
    setTouched(t => ({ ...t, [field]: true }));
    if (validatorFn)
      setErrors(e => ({ ...e, [field]: validatorFn(values[field]) }));
  };

  const setError = (field, msg) =>
    setErrors(e => ({ ...e, [field]: msg }));

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return { values, errors, touched, handleChange, handleBlur, setError, reset };
}