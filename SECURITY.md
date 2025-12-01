# Security Policy for MEV Offline Wiki AI

## 🔐 Project Philosophy

This is a 100% client-side project. It does not transmit, store, or process user data on a remote server. All data remains within the user's browser.

## 🧱 Security Measures Implemented

- **Strict CSP via `meta` tag**
- **No `eval`, no dynamic function constructors**
- **No right-click, selection, or dragstart events (optional)**
- **Referrer and permissions policies enforced**
- **Offline-first: No external tracking or analytics**
- **Local-only `connect-src 'self'` enforcement**
- **Sanitized user input and linkified wiki content**

## 🧪 Trusted Use Cases

- Air-gapped networks
- Sensitive research environments
- Privacy-first education or training platforms

## 🛠 Reporting Issues

Please open a GitHub Issue if you identify any vulnerabilities. This project encourages community-based review and contributions.

## ❌ Known Limitations

- Storage is limited by the browser’s localStorage (~5MB quota).
- This is not intended for multi-user network collaboration.
- No encryption or password system (intentionally excluded).

## ✅ Current Status: Hardened

All scripts, HTML, and CSS are unified and secured in a 3-file architecture optimized for GitHub Pages hosting.