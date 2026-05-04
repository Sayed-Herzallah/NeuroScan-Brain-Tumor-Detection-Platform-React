import { useState, useCallback } from "react";

// ── Password regex (matches backend: RegisterDto + ResetPasswordDto) ──
// ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$  min 8 chars
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

// ── Phone regex (matches backend RegisterDto) ──
// Egyptian: 01[0-2,5]XXXXXXXX  or Saudi: 966XXXXXXXXX
const PHONE_REGEX = /^(01[0-2,5][0-9]{8}|966[0-9]{9})$/;

export function validateEmail(email) {
  if (!email.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Please enter a valid email address";
  return "";
}

export function validatePassword(password) {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!PWD_REGEX.test(password))
    return "Password must contain uppercase, lowercase, number and special character";
  return "";
}

export function getPasswordRules(password) {
  return {
    minLength:   password.length >= 8,
    hasLower:    /[a-z]/.test(password),
    hasUpper:    /[A-Z]/.test(password),
    hasNumber:   /\d/.test(password),
    hasSpecial:  /[\W_]/.test(password),
  };
}

export function validateName(name) {
  if (!name.trim()) return "Full name is required";
  if (name.trim().length < 2) return "Name must be at least 2 characters";
  return "";
}

export function validatePhone(phone) {
  if (!phone) return ""; // optional
  if (!PHONE_REGEX.test(phone))
    return "Enter a valid Egyptian (01XXXXXXXXX) or Saudi (966XXXXXXXXX) number";
  return "";
}

export function validateConfirmPassword(password, confirm) {
  if (!confirm) return "Please confirm your password";
  if (password !== confirm) return "Passwords do not match";
  return "";
}

export function useForm(initialValues) {
  const [values,  setValues]  = useState(initialValues);
  const [errors,  setErrors]  = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((field, value) => {
    setValues(v => ({ ...v, [field]: value }));
    setErrors(e => ({ ...e, [field]: "" }));
  }, []);

  const handleBlur = useCallback((field, validatorFn) => {
    setTouched(t => ({ ...t, [field]: true }));
    if (validatorFn)
      setErrors(e => ({ ...e, [field]: validatorFn(values[field]) }));
  }, [values]);

  const setError = useCallback((field, msg) =>
    setErrors(e => ({ ...e, [field]: msg })), []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return { values, errors, touched, handleChange, handleBlur, setError, reset };
}
