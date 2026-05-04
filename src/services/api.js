const BASE_URL = "https://braintumorsystem.runasp.net";
const TOKEN_KEY = "neuroscan_token";
const USER_KEY  = "neuroscan_user";

export function getToken()  { return localStorage.getItem(TOKEN_KEY); }
export function saveToken(token) { localStorage.setItem(TOKEN_KEY, token); }
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
export function getSavedUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = { ...options.headers };

  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!(options.body instanceof FormData))
    headers["Content-Type"] = "application/json";

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    let errMsg = `Request failed: ${res.status}`;
    try {
      const data = await res.json();
      if (typeof data === "string") {
        errMsg = data;
      } else if (data?.message) {
        errMsg = data.message;
      } else if (data?.title) {
        errMsg = data.title;
      } else if (data?.errors) {
        const errs = data.errors;
        if (typeof errs === "object" && !Array.isArray(errs)) {
          // ValidationProblemDetails: { errors: { field: [msg, ...] } }
          errMsg = Object.values(errs).flat().join(" | ");
        } else if (Array.isArray(errs)) {
          errMsg = errs.join(", ");
        } else {
          errMsg = JSON.stringify(errs);
        }
      }
    } catch { /* ignore parse error */ }
    throw new Error(errMsg);
  }

  const text = await res.text();
  if (!text) return null;
  try { return JSON.parse(text); } catch { return text; }
}

// ── Auth ────────────────────────────────────────────────────────
export async function apiLogin(email, password) {
  const data = await request("/api/Auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (data?.token) saveToken(data.token);
  if (data?.user)  saveUser(data.user);
  return data;
}

export async function apiRegister({ displayName, email, phoneNumber, password, confirmPassword }) {
  const data = await request("/api/Auth/register", {
    method: "POST",
    body: JSON.stringify({ displayName, email, phoneNumber, password, confirmPassword }),
  });
  if (data?.token) saveToken(data.token);
  if (data?.user)  saveUser(data.user);
  return data;
}

export async function apiForgotPassword(email) {
  return request("/api/Auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function apiResetPassword({ email, token, newPassword, confirmPassword }) {
  return request("/api/Auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ email, token, newPassword, confirmPassword }),
  });
}

export async function apiChangePassword({ currentPassword, newPassword, confirmPassword }) {
  return request("/api/Auth/change-password", {
    method: "POST",
    body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
  });
}

export async function apiLogout() {
  try { await request("/api/Auth/logout", { method: "POST" }); } catch { /* ignore */ }
  clearToken();
}

// ── Scans ──────────────────────────────────────────────────────
export async function apiUploadScan(file) {
  const form = new FormData();
  form.append("Image", file);
  return request("/api/Scans", { method: "POST", body: form });
}
export async function apiGetMyScans()       { return request("/api/Scans/my-scans"); }
export async function apiGetScan(scanId)    { return request(`/api/Scans/${scanId}`); }
export async function apiDeleteScan(scanId) { return request(`/api/Scans/${scanId}`, { method: "DELETE" }); }

// ── Analysis ───────────────────────────────────────────────────
export async function apiRunAnalysis(scanId)     { return request(`/api/Analysis/run/${scanId}`, { method: "POST" }); }
export async function apiGetMyAnalyses()         { return request("/api/Analysis/my-analyses"); }
export async function apiGetAnalysis(analysisId) { return request(`/api/Analysis/${analysisId}/details`); }

// ── Dashboard ──────────────────────────────────────────────────
export async function apiGetDashboard() { return request("/api/Dashboard"); }

// ── Notifications ──────────────────────────────────────────────
export async function apiGetNotifications(params = {}) {
  const q = new URLSearchParams();
  if (params.page)     q.set("page",     params.page);
  if (params.pageSize) q.set("pageSize", params.pageSize);
  if (params.isRead !== undefined) q.set("isRead", params.isRead);
  if (params.type)     q.set("type",     params.type);
  return request(`/api/Notifications${q.toString() ? "?" + q : ""}`);
}
export async function apiGetUnreadCount()         { return request("/api/Notifications/unread-count"); }
export async function apiMarkNotificationRead(id) { return request(`/api/Notifications/${id}/read`, { method: "PUT" }); }
export async function apiMarkAllNotificationsRead(){ return request("/api/Notifications/read-all", { method: "PUT" }); }
export async function apiDeleteNotification(id)   { return request(`/api/Notifications/${id}`, { method: "DELETE" }); }

// ── Notification Settings ──────────────────────────────────────
export async function apiGetNotificationSettings() { return request("/api/NotificationSettings"); }
export async function apiUpdateNotificationSettings(dto) {
  return request("/api/NotificationSettings", {
    method: "PUT",
    body: JSON.stringify(dto),
  });
}

// ── Users / Profile ────────────────────────────────────────────
export async function apiGetProfile() { return request("/api/Users/profile"); }
export async function apiUpdateProfile({ displayName, phoneNumber, email }) {
  return request("/api/Users/profile", {
    method: "PUT",
    body: JSON.stringify({ displayName, phoneNumber, email }),
  });
}