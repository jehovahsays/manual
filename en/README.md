# MEV Offline Wiki AI

![Website](https://img.shields.io/website?url=https%3A%2F%2Fjehovahsays.github.io%2Fmev%2F)
![Last Commit](https://img.shields.io/github/last-commit/jehovahsays/mev)
![Repo Size](https://img.shields.io/github/repo-size/jehovahsays/mev)
![License](https://img.shields.io/github/license/jehovahsays/mev)

# MEV Offline Wiki AI

## 📘 What is MEV

**MEV** is a fully offline, self-contained wiki / personal knowledge-management (PKM) tool that runs entirely in the browser — no server, no database, no external dependencies.  
It is designed around an **“offline-first, self-defending”** philosophy.

This makes MEV ideal for users who want privacy, portability, and resilience.

---

## 🚀 Why Use MEV

- **Offline‑first & Portable** — Once loaded, the application works completely offline, making it portable across devices.
- **Progressive Web App (PWA)** — Installable on desktop and mobile (iOS/Android) for a seamless, app-like experience.
- **Secure and minimal** — No CDNs, no trackers, no third-party scripts.
- **Simple Deployment** — Just static files, easy to host anywhere (including your local PHP server via PHPwin).

---

## 🏗️ Architecture & Security Posture

### Multi-File PWA Architecture

- The application is a Progressive Web App (PWA) distributed as static files (`index.html`, `sw.js`, `manifest.json`, `css.html`).
- The **Service Worker (`sw.js`)** pre-caches all critical assets, guaranteeing instant loading even when offline.
- No dependencies, no build step required.

### Storage Model: `localStorage`

- Stores content entirely in the browser's local storage.
- **No data leaves the client.**
- Works offline by design.
- *Note: Data may be lost if browser storage is explicitly cleared by the user.*

### Security Hardened

- Strong Content Security Policy (CSP).
- No dynamic JS injection (e.g. `eval` is blocked).
- No external code is loaded.

---

## 🧩 Project Structure

- `index.html` — The core wiki application.
- `sw.js`, `manifest.json` — Essential files for PWA installation and offline functionality.
- `css.html` — The CSS-only fallback/anchor page.
- `index.bat` — CLI launcher for Windows users to manage settings via URL parameters.
- `assets/icons/` — Directory containing the required PWA icons (maskable and standard).
- `.nojekyll` — Disables GitHub Jekyll processing.
- `CHANGELOG.md`, `CONTRIBUTING.md`, `LICENSE`, `SECURITY.md`, `MOTIVATION.md` — Metadata and documentation.

---

## 🛠️ Getting Started

### Option A: Use Locally

1. Download or clone the repo.
2. Open `index.html` in your browser.
3. Start editing and writing — content is auto-saved.
4. **Windows Users:** Use `index.bat` to quickly launch the wiki or update settings via the command line interface.

### Option B: Host Online (e.g. GitHub Pages)

1. Push the files to your GitHub repository.
2. Enable GitHub Pages in repo settings.
3. Access via: [https://jehovahsays.github.io/mev/](https://jehovahsays.github.io/mev/)

### Option C: Install as a PWA

1. Visit the URL on a compatible device (like your iPhone).
2. Use the browser's "Install App" or "Add to Home Screen" feature.
3. The app will be available on your home screen, runnable offline.

---

## 🎯 Who Is This For

- Developers and users needing a highly secure, simple offline wiki.
- Those who prioritize privacy and resilience over cloud-based storage.
- Anyone wanting a fully operational, installable PWA knowledge system.

---

## 🔎 Live Demo

Try the live demo:  
[https://jehovahsays.github.io/mev/](https://jehovahsays.github.io/mev/)  
- Fully functional with or without JavaScript.

---

## 🤝 Contributing

1. Fork the repo
2. Make a branch and your changes
3. Submit a pull request

See: [`CONTRIBUTING.md`](CONTRIBUTING.md)

---

## 📃 License

Licensed under the MIT License — see [`LICENSE`](LICENSE)

---

## 🧠 Project Philosophy

MEV stands for minimal, efficient, verifiable. It aims to be:

- Easy to understand and modify
- Resistant to interference (no servers)
- Private by design
- Compatible with low-resource environments

---

_Last updated: 2025-11-29_
