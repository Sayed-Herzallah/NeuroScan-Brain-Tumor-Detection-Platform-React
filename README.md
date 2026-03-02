# 🧠 Brain Tumor AI Analysis — React App

A fully responsive React app converted from the mobile design screens.

## 📁 Project Structure

```
src/
├── assets/
│   └── svgs/              ← All SVG icons from the design
├── components/
│   ├── BottomNavbar.jsx   ← Bottom tab navigation
│   └── TopBar.jsx         ← Reusable top header with back button
├── context/
│   └── AppContext.jsx     ← App-wide state + routing
├── hooks/
│   └── useValidation.js   ← All form validation logic
├── pages/
│   ├── SplashScreen.jsx
│   ├── SignInPage.jsx      ← With email + password validation
│   ├── SignUpPage.jsx      ← With full form validation
│   ├── AuthPages.jsx       ← ForgotPassword, OTP, ResetPassword
│   ├── HomePage.jsx
│   ├── ScanPages.jsx       ← Upload + Result
│   ├── HistoryPage.jsx     ← With search
│   ├── ProfilePages.jsx    ← Profile, ChangePassword, Notifications, Privacy, FAQ, Contact
│   └── ChatPage.jsx        ← AI Chat with questions
├── styles/
│   └── global.css         ← All styles, responsive, CSS variables
├── App.jsx
├── AppRouter.jsx          ← Clean page routing
└── index.jsx
```

## ✅ Features

- **17 screens** implemented
- **Validation** on all forms (email, password, name, OTP, etc.)
- **Responsive** — works on any phone (max-width 430px, 100% on smaller)
- **SVG icons** used throughout (no external icon library needed)
- **Navigation** with back buttons and bottom navbar
- **No external routing library** (uses Context API)

## 🚀 Getting Started

```bash
cd braintumor
npm install
npm start
```

## 🎨 Color Palette

- Primary: `#2E8B8B` (Teal)
- Danger: `#EF4444`
- Success: `#22C55E`
- Warning: `#F59E0B`
