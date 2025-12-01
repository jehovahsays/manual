# Contributing to MEV Offline Wiki AI

Thank you for your interest in contributing! 🎉  
This project values simplicity, security, and offline privacy. Contributions must uphold these principles.

---

## 🧠 What Can I Contribute?

- Bug fixes or improvements
- Feature suggestions (offline-only or localStorage-compatible)
- Code cleanup or performance enhancements
- Security hardening suggestions
- Documentation updates (README, SECURITY, etc.)

---

## 🛠 Development Guidelines

### 📦 Code Structure

- `index.html` — UI structure + CSP meta tags
- `index.js` — All app logic (auth, page logic, AI, etc.)
- `index.css` — Core styling
- `sw.js` — Service Worker for caching

### ⚠️ Security Requirements

- Do **not** add external scripts, analytics, or CDN resources.
- Do **not** introduce server calls or remote APIs.
- Sanitize any input/output in `index.js` (`escapeHTML()` is used).
- Always use strict mode if creating new scripts: `'use strict';`

---

## 🧪 Testing Locally

You can test changes in your browser directly:

1. Clone the repo
2. Open `index.html` in your browser
3. Test offline by disconnecting or simulating offline in DevTools

---

## 📥 How to Submit

1. Fork this repository
2. Create a new branch (`git checkout -b feature-name`)
3. Make your changes
4. Commit (`git commit -am 'Add feature xyz'`)
5. Push to your fork (`git push origin feature-name`)
6. Open a Pull Request on the main repo

---

## 💬 Need Help?

Open an Issue if you're unsure about your changes or need guidance.

Thank you for helping build a privacy-first AI wiki! 💙