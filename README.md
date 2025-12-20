# MEV — Multi Edit Vandalism

[![License](https://img.shields.io/github/license/jehovahsays/mev)](https://github.com/jehovahsays/mev/blob/main/LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/jehovahsays/mev)](https://github.com/jehovahsays/mev/commits/main)
[![Issues](https://img.shields.io/github/issues/jehovahsays/mev)](https://github.com/jehovahsays/mev/issues)

## 🚀 Overview

MEV is a multi‑page web application designed to work **offline out of the box** in modern browsers without a server. It includes enhanced security features, optional backend PHP hooks, and a mechanism to block misbehaving clients (*blackhole*).

---

## 📁 Root Folder Architecture

```
/ (root)
├─ index.html               ← Main static homepage
├─ index.php                ← Optional dynamic PHP homepage
├─ /blackhole/
│   ├─ blackhole.dat        ← IP block list
│   └─ blackhole.php        ← PHP script to check/block clients
├─ /mev/
│   └─ index.html           ← Secondary content (wiki or app section)
├─ assets/                  ← CSS, JS, images, fonts
├─ README.md                ← This file
└─ other resources          ← JSON, txt content
```

---

## 🌐 Website Pages

### `index.html`

- Default landing page for most users.
- Fully static and works **offline**.
- Best for secure, static content delivery.

### `index.php`

- Optional dynamic homepage with PHP support.
- Useful for advanced server-side logic.

### `/mev/index.html` and `/#main`

A sub-application that supports basic editing functions in the browser:

- **Create Account**: Opens a local-only user setup screen.
- **Log In / Log Out**: Manages session state in the browser.
- **Edit**: Opens the current content section in an editable form.
- **Save**: Commits edits to localStorage or optional PHP save hook.
- **Cancel**: Discards unsaved changes.
- **Note**: No data is sent to a remote server unless you customize it.

All edits are designed to work offline. If connected to a PHP-enabled server, additional persistence features may be unlocked.

---

## 🛡️ Security Features

- Static delivery for no remote attack surface.
- **Blackhole system** for banning bad actors.
- Optional backend checks with `blackhole.php`.
- Manual or automatic banning via IP list.

---

## 🚫 “Blackhole” Directory Warning

Do **not** manually navigate to `/blackhole/` in the browser.

### If you ban yourself:

1. Go to the `blackhole` folder.
2. Open `blackhole.dat` with a text editor.
3. Remove your IP address, or delete all entries.
4. Save and refresh the site.

You’ll now be unbanned.

---

## 📌 Why Use MEV?

- Works **100% offline**.
- Easy to modify and extend.
- Lightweight, privacy-first design.
- Local-only mode for secure data editing.

---

## 🏠 Self-Hosting

Supports:

- Static hosting (GitHub Pages, Netlify)
- Apache with PHP
- Nginx with PHP-FPM
- Localhost testing

**To host:**

```bash
git clone https://github.com/jehovahsays/mev.git
cd mev
cp -R * /your/web/server/root/
```

---

## 🧭 Browser Support

✅ Chrome  
✅ Firefox  
✅ Safari  
✅ Edge  
✅ Android / iOS browsers  

⚠️ **JavaScript Required** for full interactivity.

---

## 📴 JavaScript Behavior

| Feature             | JS On | JS Off |
|---------------------|-------|--------|
| Navigation          | ✅    | ✅     |
| Create/Edit/Save UI | ✅    | ❌     |
| Offline sync        | ✅    | ❌     |

---

## 📂 Contribution Guidelines

1. Fork this repo.
2. Open a new branch for your changes.
3. Submit a Pull Request.
4. Document what you add or fix.

---

## 📜 License

This project is licensed under the MIT License.

---

## 🤝 Contact

Open an [issue](https://github.com/jehovahsays/mev/issues) for questions, suggestions, or contributions.

