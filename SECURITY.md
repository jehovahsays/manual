# Security Policy — MEV Offline Wiki AI

## 🔐 Overview

MEV is a fully client‑side application designed with privacy, resilience, and offline usage as priorities. No data is transmitted to any external server, cloud service, or analytics provider.

All user‑generated content remains stored locally in the browser.

---

## 🛡 Security Measures

MEV applies multiple layers of defense:

- **Content Security Policy (CSP)** restricting execution to local assets only
- **No external scripts, styles, or remote calls**
- **No `eval()` or dynamic JavaScript execution**
- **Sanitized input using `escapeHTML()`**
- **Local‑only access enforced via: `connect-src 'self'`**
- **Progressive Web App sandboxing**

---

## 🔑 Encryption

MEV includes **optional PIN‑based encryption** using:

- **AES‑GCM**
- **PBKDF2 key derivation**
- **Client‑side Web Crypto API**

If encryption is enabled, stored content is encrypted before being saved in the browser.

---

## 📦 Storage Model & Limitations

MEV stores all content in the browser’s `localStorage`.

Limitations:

- Storage capacity is browser‑dependent (~5MB typical).
- Clearing browser cache or storage may delete wiki content.
- MEV is **not** intended for multi-user shared editing or remote collaboration.

To prevent data loss, exporting regular backups is recommended.

---

## ❗ Known Limitations

- No server‑level protection — everything is local by design.
- Offline‑only architecture may not suit collaborative workflows.
- Data loss can occur if storage is cleared or the device is wiped.

---

## 🛠 Reporting Vulnerabilities

If you discover a vulnerability or security issue, please open a GitHub Issue in the repository.

Security‑related discussion is welcome and encouraged.

---

## Status

**Security posture: Hardened (Local‑Only Model)**