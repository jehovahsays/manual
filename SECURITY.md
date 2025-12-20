# 🔐 Security Policy — MEV

## 🛡️ Project Goals

MEV is designed as an offline-first web application with minimal attack surface.

- ✅ Static site compatibility
- ✅ Client-side only functionality
- ✅ Optional server-side ban list

---

## 🚫 Blackhole IP Blocking

The `/blackhole/` directory includes:

- `blackhole.php`: Bans clients based on IP
- `blackhole.dat`: List of banned IPs

If you access `/blackhole/` directly, your IP may be added to this list.

### ❓ How to Unban Yourself

1. Open the `blackhole` directory
2. Edit `blackhole.dat`
3. Remove your IP address (or clear the file)
4. Save and close

You are now unbanned.

---

## 🐛 Reporting Vulnerabilities

To report security issues:

1. Open a [GitHub Issue](https://github.com/jehovahsays/mev/issues)
2. Use the "Security" label
3. Include relevant code or logs

---

## 🔐 Responsible Disclosure

Please do not publicly disclose vulnerabilities until they have been confirmed and patched.

---

## 📦 Supported Versions

Security patches will be made to the latest main version.
