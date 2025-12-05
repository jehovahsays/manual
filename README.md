# MEV: Multi Edit Vandalism Wiki AI

![Website](https://img.shields.io/website?url=https%3A%2F%2Fjehovahsays.github.io%2Fmev%2F)
![Last Commit](https://img.shields.io/github/last-commit/jehovahsays/mev)
![Repo Size](https://img.shields.io/github/repo-size/jehovahsays/mev)
![License](https://img.shields.io/github/license/jehovahsays/mev)
![Version](https://img.shields.io/badge/Version-1.2.1--CSP--Hardened-blue)

## 📘 What is MEV?

**MEV** (originally **Multi Edit Vandalism**) is a personal response to content control and gatekeeping. It now primarily stands for **Minimal, Efficient, Verifiable**—the core principles defining its design (`MOTIVATION.md`).

**MEV** is a fully **offline, self-contained personal wiki and knowledge management tool** that runs entirely in your browser. It requires **no server, no database, and no internet connection** once the core files are loaded.

> ✨ Create, store, and protect your knowledge — all locally, all under your control.

---

## 🚀 Key Features

* **Offline‑First PWA** 💾: Works fully offline via the Service Worker (`sw.js`). Can be installed as a native-like app on desktop or mobile (`manifest.json`).
* **Local-Only Storage** 🔒: All content is stored exclusively in your browser's `localStorage` (`app.js`). **No data is ever transmitted externally.**
* **Optional Encryption** 🔑: Includes **PIN-based encryption** using **AES-GCM** and **PBKDF2** for key derivation, powered by the client-side Web Crypto API (`SECURITY.md`).
* **CSP Hardened Security** 🛡️: Enforced by a strict **Content Security Policy** (`index.html`) that forbids all external scripts, CDNs, and dynamic code execution (`eval()`) for maximum client security.
* **3D Data Visualization** 🏙️: Explore your wiki as an interactive **Three.js**-powered 3D map environment (`map.html`), where pages are rendered as navigable buildings.
* **Zero Setup** ⚙️: No build steps, no install required — just open `index.html`.

---

## 🏗️ Architecture & Security Overview

### MEV Core Principles (Minimal, Efficient, Verifiable)

| Principle | Meaning | Source |
| :--- | :--- | :--- |
| **Minimal** | Runs without servers, databases, or installations. | `MOTIVATION.md` |
| **Efficient** | Lightweight, fast, durable, and functions reliably across devices. | `MOTIVATION.md` |
| **Verifiable** | Transparent code, readable architecture, and user-controlled data storage. | `MOTIVATION.md` |

### Security Posture (`SECURITY.md`, `app.js`)

The core application logic (`app.js`) is wrapped in a security layer that, alongside the strict CSP, enforces a local-only model:

* **Content Security Policy (CSP):** Restricting execution to local assets only (`default-src 'self'`).
* **No Remote Connections:** Enforced by CSP (`connect-src 'self'`) and code review (`CONTRIBUTING.md`).
* **Defense-in-Depth:** Includes client-side overrides to warn about dynamic code execution attempts (`eval` blocked in `app.js`).
* **User Authentication:** Simple PIN/Passphrase support for encrypting data before it is written to local storage.

---

## 📂 Project File Index: Codebase Structure

This table indexes the purpose of all root-level files, organized by function.

### Core Application & PWA Files

| File Name | Purpose and Key Functionality |
| :--- | :--- |
| `index.html` | The **main entry point**. Contains the UI structure, authentication modal, and the strict **CSP** meta tag. |
| `app.js` | The **primary application logic**. Manages client-side security, internal routing, data encryption/decryption, and `localStorage` interactions. |
| `index.css` | The **core CSS styling** for the main wiki UI, including light/dark mode variables and responsive design elements. |
| `sw.js` | The **Service Worker** implementing a **Cache-First** strategy for all static assets and offline availability. |
| `manifest.json` | The **PWA manifest** defining the app's metadata, icons, theme color, and `standalone` display mode. |
| `css.html` | A **CSS Anchor Only** file used as a fallback for the UI or for setting theme variables via CSS anchor targets. |
| `404.html` | The dedicated **offline fallback page** served by the Service Worker when a resource is unavailable. |
| `robots.txt` | Directs search engines to **Disallow** indexing of all dynamic/user-specific paths (`/edit`, `/settings`, `/search`) for privacy. |
| `sitemap.xml` | A minimal **Sitemap** listing only the canonical root URL for this Single Page Application (SPA). |

### 3D Map and Visualization

| File Name | Purpose and Key Functionality |
| :--- | :--- |
| `map.html` | The **3D Map & Game Environment**. Contains the Three.js rendering logic, player movement, and article interaction detection. |
| `main.css` | **Styling for the 3D Map/Game Environment** and mobile responsiveness for the canvas and embedded controls. |
| `play.html` | The **Game Controls User Interface** (virtual joystick, Orbit Mode toggle) embedded as an iframe within `map.html`. |
| `log.html` | The **Visual Log (3D)** timeline page, designed to visually display or replay the history of page and user changes. |

### Documentation and Governance

| File Name | Purpose and Key Functionality |
| :--- | :--- |
| `MOTIVATION.md` | Explains the project's **Philosophy** on **Offline Knowledge Ownership** and defines the **MEV** core principles. |
| `SECURITY.md` | Details the **Security Policy**, outlining CSP, no external communication, and optional client-side encryption (AES-GCM). |
| `CONTRIBUTING.md` | Provides **Development Guidelines** and strict security requirements for pull requests (e.g., no external scripts). |
| `CODE_OF_CONDUCT.md` | Adopts the **Contributor Covenant Code of Conduct** to ensure a welcoming and inclusive community environment. |
| `CHANGELOG.md` | Documents the history of changes and new features for the `v1.2.1-CSP-Hardened` version. |
| `LICENSE` | Specifies the project is distributed under the **MIT License**. |

---

## 🛠️ Getting Started

### 🖥️ Use Locally (Self-Hosted)

1.  Clone or download the repository: `git clone https://github.com/jehovahsays/mev`
2.  Open the file **`index.html`** in any modern web browser (Chrome, Firefox, Edge, Safari).
3.  Start using it — your changes are auto-saved in your browser's storage.

### 📱 Install as PWA

1.  Visit the hosted page or open `index.html` locally.
2.  Use your browser’s “Install App” or “Add to Home Screen” option.
3.  The app will now run in a standalone window, fully offline, leveraging the Service Worker (`sw.js`).

---

## 🤝 Contributing

We welcome contributions that align with the MEV principles of **Minimalism, Efficiency, and Verifiability**.

Please see the [`CONTRIBUTING.md`](CONTRIBUTING.md) and [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) for detailed guidelines and security requirements before submitting a Pull Request.

---

## 📄 License

MEV is distributed under the **MIT License**. See [`LICENSE`](LICENSE) for the full terms.
