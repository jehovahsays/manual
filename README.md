# MEV Offline Wiki AI

![Website](https://img.shields.io/website?url=https%3A%2F%2Fjehovahsays.github.io%2Fmev%2F)
![Last Commit](https://img.shields.io/github/last-commit/jehovahsays/mev)
![Repo Size](https://img.shields.io/github/repo-size/jehovahsays/mev)
![License](https://img.shields.io/github/license/jehovahsays/mev)

## 📘 What is MEV?

**MEV** originally stood for *Multi Edit Vandalism* — a personal response to gatekeeping and content control in public knowledge platforms. It now also stands for **Minimal, Efficient, Verifiable** — principles that define this project's architecture.

**MEV** is a fully offline, self-contained personal wiki and knowledge management tool that runs entirely in your browser. It requires no server, no database, and no internet connection once loaded.

> ✨ Create, store, and protect your knowledge — all locally.

---

## 🚀 Key Features

- **Offline‑First & Portable** – Works fully offline via your browser.
- **Local-Only Storage** – All content is saved in your browser's `localStorage`.
- **Optional Encryption** – PIN-based AES-GCM encryption protects your data.
- **PWA** – Install as a web app on desktop or mobile.
- **Self-Contained** – No external scripts, CDNs, or analytics.
- **Zero Setup** – No build steps, no install required — just open `index.html`.

---

## 🏗️ Architecture & Security Overview

### Structure

- `index.html` – Main UI and logic entry point
- `css.html` – Alternate anchor page (non-JS fallback)
- `manifest.json` – PWA metadata
- `assets/` – Scripts, styles, icons
- `bin/index.bat` – Windows launcher for CLI URL tweaks
- `.nojekyll` – Prevents GitHub Pages interference
- `404.html` – Offline fallback page

### Security Posture

- **Strict CSP** – No external scripts/styles allowed
- **No `eval` or dynamic JS**
- **Local-only access enforced via CSP (`connect-src 'self'`)**
- **Input sanitization (via `escapeHTML`)**
- **No server calls or remote APIs**

---

## 🧪 Storage & Limitations

- Content is stored in `localStorage`, which is:
  - Persistent until browser cache/storage is cleared
  - Limited (~5MB depending on browser)
- Not designed for collaborative, network-based editing
- Manual `.json` export/import supports backup and sync

> ⚠️ Make regular backups using export features to avoid accidental loss.

---

## 📁 Exporting & Importing Your Data

MEV stores all content locally in your browser. To prevent accidental data loss or to move your wiki to another device, you can export or import your data as a `.json` file.

---

### 🔽 Export Your Data

1. Open the MEV interface.
2. Go to the **Menu → Backup / Export** option.
3. Click **Export as JSON**.
4. Save the downloaded file somewhere safe (e.g., USB drive, cloud backup, encrypted storage).

> This file contains your entire wiki and can be restored later.

---

### 🔼 Import / Restore Data

1. Open MEV on the device where you want to restore content.
2. Navigate to **Menu → Import / Restore**.
3. Select your previously exported `.json` file.
4. Confirm the import when prompted.

> ⚠️ Importing will overwrite existing wiki data. Export before replacing if unsure.

---

### 💡 Best Practices

- Export regularly — especially before clearing browser storage.
- Keep backups encrypted if they contain personal or sensitive content.
- Use meaningful file names like:  
  `MEV-backup-2025-01-20.json`

---

## 🛠️ Getting Started

### 🖥️ Use Locally

1. Clone or download the repo
2. Open `index.html` in any modern browser
3. Start editing — your changes are auto-saved
4. (Optional) Use `bin/index.bat` (Windows only) to manage CLI launch options

### 🌐 Host on GitHub Pages

1. Push files to a new GitHub repo
2. Enable GitHub Pages (Settings → Pages)
3. Access at: `https://<username>.github.io/<repo>/`

### 📱 Install as PWA

1. Visit live page: [https://jehovahsays.github.io/mev/](https://jehovahsays.github.io/mev/)
2. Use your browser’s “Install App” or “Add to Home Screen”
3. The app runs offline and stores everything locally

---

## 🎯 Who Should Use This?

- Developers needing a secure, offline wiki
- Users who value privacy, self-hosting, and simplicity
- Researchers in air-gapped or high-security environments

---

## 🤝 Contributing

1. Fork this repo
2. Make a feature branch
3. Commit & push changes
4. Open a Pull Request

Please see [`CONTRIBUTING.md`](CONTRIBUTING.md) for more details.

---

## 📄 License

MIT — see [`LICENSE`](LICENSE) for full terms.

---

## 🧠 Philosophy

MEV is about:
- ✨ Freedom from censorship and deletion
- 🔐 Privacy by design
- 🛠️ Simplicity and transparency
- 🌍 Running anywhere, for anyone

Built with resilience and creativity in mind.