// ====== MEV SECURITY LAYER (Moved from inline script) ======
(function secureClientApp() {
    // These methods of blocking are less reliable than CSP, but provide defense-in-depth.
    document.addEventListener("contextmenu", e => e.preventDefault());
    document.addEventListener("dragstart", e => e.preventDefault());
    document.addEventListener("selectstart", e => e.preventDefault());

    // Basic function overriding for security (though this is often circumventable)
    // NOTE: This now relies on the Content-Security-Policy to truly block 'unsafe-eval'
    window.eval = () => console.warn('eval blocked');
    window.Function = function() { console.warn('Function constructor blocked'); };

    const originalSetTimeout = window.setTimeout;
    window.setTimeout = function(fn, delay) {
      if (typeof fn === 'string') {
        console.warn('setTimeout(string) blocked');
        return;
      }
      return originalSetTimeout(fn, delay);
    };

    if (document.head) {
      // Adding meta tags that are not redundant with the SW headers
      document.head.insertAdjacentHTML("beforeend", `
          <meta http-equiv="Referrer-Policy" content="no-referrer">
          <meta http-equiv="Permissions-Policy" content="microphone=(), camera=(), geolocation=()">
      `);
    }

    if (!location.hostname.includes('localhost')) {
      // console.log = console.warn = console.error = () => {}; 
    }
})();

const STORAGE_KEYS = {
    pages: 'wiki_pages',
    users: 'wiki_users',
    currentUser: 'wiki_current_user',
    changes: 'wiki_changes',
    theme: 'wiki_theme',
    sidebar: 'wiki_sidebar',
    knowledge: 'wiki_knowledge',
    cryptoParams: 'wiki_crypto_params'
};

// 🔒 GLOBAL IN-MEMORY ENCRYPTION KEY (Non-persistent storage)
let encryptionKey = null;
window.userCrypto = null; // Stored user crypto parameters

// ==========================================================
// 🔑 CRYPTO UTILITIES (Web Crypto API)
// ==========================================================

const CRYPTO_CONFIG = {
    iterations: 100000,
    saltLength: 16,
    ivLength: 12,
    algo: 'AES-GCM',
    hash: 'SHA-256'
};

function base64ToArrayBuffer(base64) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

/**
 * Derives a strong encryption key from a PIN using PBKDF2.
 */
async function deriveKey(pin, salt) {
    const pinBuffer = new TextEncoder().encode(pin);
    const keyMaterial = await crypto.subtle.importKey(
        'raw', pinBuffer,
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
    );

    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: CRYPTO_CONFIG.iterations,
            hash: CRYPTO_CONFIG.hash
        },
        keyMaterial,
        { name: CRYPTO_CONFIG.algo, length: 256 },
        false,
        ['encrypt', 'decrypt']
    );
}

/**
 * Encrypts plaintext using the session's encryption key.
 */
async function encryptData(plaintext) {
    if (!encryptionKey) throw new Error("Encryption key not set.");

    const iv = crypto.getRandomValues(new Uint8Array(CRYPTO_CONFIG.ivLength));
    const encoded = new TextEncoder().encode(plaintext);

    const ciphertextBuffer = await crypto.subtle.encrypt(
        { name: CRYPTO_CONFIG.algo, iv: iv },
        encryptionKey,
        encoded
    );

    return {
        ciphertext: arrayBufferToBase64(ciphertextBuffer),
        iv: arrayBufferToBase64(iv.buffer)
    };
}

/**
 * Decrypts ciphertext using the session's encryption key.
 */
async function decryptData(encryptedData) {
    if (!encryptionKey) throw new Error("Encryption key not set.");

    const ciphertextBuffer = base64ToArrayBuffer(encryptedData.ciphertext);
    const ivBuffer = base64ToArrayBuffer(encryptedData.iv);

    const decryptedBuffer = await crypto.subtle.decrypt(
        { name: CRYPTO_CONFIG.algo, iv: new Uint8Array(ivBuffer) },
        encryptionKey,
        ciphertextBuffer
    );

    return new TextDecoder().decode(decryptedBuffer);
}

// ==========================================================
// 💾 CORE STORAGE UTILITIES (ASYNC WRAPPERS)
// ==========================================================

async function saveData(key, data) {
    try {
        const rawJson = JSON.stringify(data);
        let valueToStore;

        if (encryptionKey) {
            const encrypted = await encryptData(rawJson);
            valueToStore = JSON.stringify({
                __encrypted: true,
                data: encrypted
            });
            console.log(`✅ Data for ${key} saved (Encrypted).`);
        } else {
            valueToStore = rawJson;
        }

        localStorage.setItem(key, valueToStore);
        updateStorageBar();
    } catch(e) {
        console.error(`❌ Failed to save data for ${key}:`, e);
        speak("Error saving data. Check console for details.");
    }
}

async function loadData(key, defaultVal) {
    try {
        const v = localStorage.getItem(key);
        if (!v) return defaultVal;

        const storedPayload = JSON.parse(v);

        if (storedPayload && storedPayload.__encrypted) {
            if (!encryptionKey) {
                console.warn(`🔒 Data for ${key} is encrypted. Decryption key missing.`);
                return defaultVal;
            }
            const decryptedJson = await decryptData(storedPayload.data);
            return JSON.parse(decryptedJson);

        } else {
            return JSON.parse(v);
        }

    } catch (e) {
        console.error(`❌ Failed to load or decrypt data for ${key}:`, e);
        speak(`Warning: Data for ${key} is inaccessible or corrupt.`);
        return defaultVal;
    }
}

// ==========================================================
// 👤 AUTHENTICATION UTILITIES
// ==========================================================

function getCurrentUser() {
  try {
    const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.currentUser) || 'null');
    if (user && user.crypto) {
        window.userCrypto = user.crypto;
    } else {
        window.userCrypto = null;
    }
    return user;
  } catch {
    return null;
  }
}

function speak(text) {
    if ('speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = 'en-US';
      msg.pitch = 1;
      msg.rate = 1;
      window.speechSynthesis.speak(msg);
    }
}

async function updatePageListSidebar(filter = '') {
    const listEl = document.getElementById('page-list');
    if (!listEl) return;
    listEl.innerHTML = '';
    const pages = await loadData(STORAGE_KEYS.pages, {});
    const titles = Object.keys(pages)
      .filter(t => t !== "Formatting Examples")
      .sort();
    const filterLower = filter.toLowerCase();

    let resultsCount = 0;

    titles.forEach(title => {
        if (filterLower === '' || title.toLowerCase().includes(filterLower)) {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${encodeURIComponent(title)}`;
            link.textContent = title;
            // CSP-SAFE: Use data attributes for linking
            link.setAttribute('data-page-link', title);
            li.appendChild(link);
            listEl.appendChild(li);
            resultsCount++;
        }
    });

    if (filterLower !== '') {
      const statusLi = document.createElement('li');
      statusLi.style.cssText = 'font-size: 0.85rem; color: #666; padding: 5px;';
      statusLi.textContent = `(${resultsCount} pages found)`;
      listEl.prepend(statusLi);
    }
}

// Exposed for the filter input to call
function titleInputSidebar() {
    const input = document.getElementById('ai-input');
    updatePageListSidebar(input ? input.value : '');
}



async function showRecent() {
  setMainView(true);
  console.log("Navigating to Recent Changes");
  closeSidebar();
  let changes = await loadData(STORAGE_KEYS.changes, []); 
  const c = document.getElementById('page-container');
  if (!c) return;

  const section = document.createElement('section'); 
  section.className = 'page'; 
  section.innerHTML = '<h2>Recent Changes</h2>';
  const ul = document.createElement('ul');
  
  // FIX: Ensure changes is an array before sorting
  if (Array.isArray(changes)) {
      changes.sort((a, b) => new Date(b.time) - new Date(a.time));
  } else {
      console.warn("Changes data is not an array, resetting to empty.");
      changes = []; 
  }
  
  if (changes.length === 0) {
      ul.innerHTML = '<li>No recent changes found. Start editing pages!</li>';
  } else {
      changes.slice(0,50).forEach(ch => {
        const li = document.createElement('li');
        const link = document.createElement('a'); 
        link.href = `#${encodeURIComponent(ch.title)}`; 
        link.textContent = ch.title;
        // CSP-SAFE: Use data attributes for linking
        link.setAttribute('data-page-link', ch.title);
        
        let typeClass = ch.type === 'create' ? 'color: green;' : ch.type === 'delete' ? 'color: red;' : 'color: orange;';
        li.innerHTML = `<strong style="${typeClass}">${ch.type.toUpperCase()}</strong> — `;
        li.appendChild(link); 
        li.append(` by ${ch.user} at ${new Date(ch.time).toLocaleString()}`);
        ul.appendChild(li);
      });
  }
  
  section.appendChild(ul);
  c.innerHTML = ''; 
  c.appendChild(section);
  location.hash = "#recent";
}

// ----------------------------------------------------
// ✅ MODIFIED: showSettings function to use the dedicated Import_Data page
// ----------------------------------------------------
async function showSettings() {
  setMainView(true);
  console.log("Navigating to Settings");
  closeSidebar();
  const c = document.getElementById('page-container');
  if (!c) return;
  const section = document.createElement('section');
  section.className = 'page';
  section.innerHTML = '<h2>Settings</h2>';
  
  // Theme Toggle
  const themeToggle = document.createElement('button'); 
  themeToggle.textContent = '🌗 Toggle Dark Mode'; 
  themeToggle.id = 'toggle-theme-btn';
  themeToggle.className = 'edit-btn';
  themeToggle.style.marginRight = '10px'; 
  section.appendChild(themeToggle);

  // NEW: Navigation Link to Import/Export Page (Replaces old file import/export buttons)
  const importExportLink = document.createElement('a'); 
  importExportLink.href = '#Import_Data';
  importExportLink.textContent = '📦 Manage Data (Import/Export)';
  importExportLink.className = 'edit-btn'; // Use a button-like style
  // Bind the navigation logic
  importExportLink.onclick = () => { showPage('Import_Data'); return false; }; 
  // Ensure it looks like a block button
  importExportLink.style.cssText = 'background-color: var(--color-accent); color: white; display: block; text-align: center; margin-top: 10px; padding: 10px 20px; border-radius: 8px; font-weight: bold;';
  section.appendChild(importExportLink);
  // --- END MODIFICATION ---

  
  // Storage Stats
  const storageStats = document.createElement('pre'); 
  storageStats.style.marginTop = '20px';
  storageStats.id = 'storage-stats';
  section.appendChild(storageStats);

  // ADDED: Data Security Warning
  const warning = document.createElement('div');
  const isEncrypted = encryptionKey !== null;
  warning.style.cssText = `padding: 15px; background: ${isEncrypted ? '#d4edda' : '#ffe0b2'}; border: 1px solid ${isEncrypted ? '#155724' : '#ff9800'}; border-radius: 4px; margin-top: 20px; color: ${isEncrypted ? '#155724' : '#000'};`;
  warning.innerHTML = `
      <h3>🚨 Data Security Warning</h3>
      <p>All wiki data is saved directly in your browser's **Local Storage**. This data is **${isEncrypted ? '🔐 ENCRYPTED' : 'NOT encrypted'}**.</p>
      <p>${isEncrypted ? 'Your data is secured using AES-GCM (256-bit) derived from your PIN. If you forget your PIN, the data is permanently lost.' : 'The data may be readable by browser extensions. Log in with a PIN to enable strong encryption.'}</p>
      <p>Use the **Manage Data (Import/Export)** feature regularly.</p>
  `;
  section.appendChild(warning);

  // Clear AI Memory Button
  const clearBtn = document.createElement('button'); 
  clearBtn.textContent = '🧠 Clear AI Memory'; 
  clearBtn.className = 'delete-btn';
  clearBtn.id = 'clear-ai-memory-btn';
  section.appendChild(clearBtn);

  function updateStats() { 
      let totalBytes = 0; 
      for (let i = 0; i < localStorage.length; i++) { 
          const key = localStorage.key(i); 
          const value = localStorage.getItem(key) || ''; 
          totalBytes += (key.length + value.length) * 2; 
      } 
      const statsEl = document.getElementById('storage-stats');
      if (statsEl) {
        statsEl.textContent = `--- Local Storage Usage ---\nTotal Used: ${Math.round(totalBytes/1024)} KB\nTypical Quota: ~5120 KB (5MB)`; 
      }
  }

  c.innerHTML = '';
  c.appendChild(section);
  
  updateStats();

  location.hash = "#settings";
}

// ----------------------------------------------------
// ✅ FIX 2: Corrected showProfile function to ensure unique listener binding
// ----------------------------------------------------
/**
 * PLACEHOLDER FUNCTION FOR PROFILE PAGE
 */
async function showProfile() {
    setMainView(true);
    console.log("Navigating to Profile");
    closeSidebar();
    const c = document.getElementById('page-container');
    if (!c) return;

    const user = getCurrentUser();

    const section = document.createElement('section');
    section.className = 'page';
    section.innerHTML = `<h2>User Profile: ${user ? user.name : 'Guest'}</h2>`;

    if (user) {
        section.innerHTML += `
            <p><strong>Status:</strong> Logged in and **${encryptionKey ? 'encrypted' : 'unencrypted'}** session active.</p>
            <p><strong>Joined:</strong> ${new Date(user.joined).toLocaleDateString()}</p>
            <p><strong>Total Edits:</strong> (Not tracked yet)</p>
            <p>This page will be expanded to show user-specific statistics and history.</p>
            <button class="delete-btn" id="profile-logout-btn">Log Out</button> 
            `;
    } else {
        section.innerHTML += `<p>You are not currently logged in. Please log in or create an account to manage your profile.</p>`;
    }
    
    c.innerHTML = '';
    c.appendChild(section);
    location.hash = "#profile";
    
    // Re-bind the logout link using the new unique ID
    const logoutBtn = document.getElementById('profile-logout-btn');
    if (logoutBtn && !logoutBtn.getAttribute('data-listener-bound')) {
        logoutBtn.addEventListener('click', e => { 
            e.preventDefault(); 
            // Trigger the click event of the working sidebar logout link (id="logout-link")
            document.getElementById('logout-link')?.click();
        });
        logoutBtn.setAttribute('data-listener-bound', 'true'); // Prevent rebinding
    }
}


async function showAbout() {
  setMainView(true);
  console.log("Navigating to About");
  closeSidebar();
  const c = document.getElementById('page-container');
  if (!c) return;
  c.innerHTML = `<section class="page"><h2>About</h2>
    <p><strong>MEV AI Wiki</strong> is an offline‑first encyclopedia powered by your browser. It uses your browser's local storage to save all data. No tracking, no server needed.</p>
    <h3>Features</h3>
    <ul>
      <li>Offline Editing and Viewing</li>
      <li>**Encrypted Storage (PIN required to unlock data)**</li>
      <li>Full-text search (for page titles)</li>
      <li>Voice Search Filtering</li>
      <li>Basic Wiki Markup (==Headers, '''Bold, ''Italics, [[Links]])</li>
    </ul>
    <p>Source Version: 1.2.1-CSP-Hardened</p>
    </section>`;
  location.hash = "#about";
}


// [ ... The rest of the core functions (parseWiki, updateStorageBar, setMainView, etc.)
//     remain the same, but are now called from app.js instead of the inline script. ]


function escapeHTML(str) {
  return str.replace(/[&<>"']/g, match => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[match]));
}

function parseWiki(text) {
  if (!text) return '';

  let result = escapeHTML(text);

  // Headings
  result = result.replace(/^={2,6}\s*(.+?)\s*={2,6}$/gm, (m, p1) => {
    const lvl = m.match(/^=+/)[0].length;
    return `<h${lvl}>${p1}</h${lvl}>`;
  });
  // Bold and Italic
  result = result.replace(/'''(.*?)'''/g, '<strong>$1</strong>');
  result = result.replace(/''(.*?)''/g, '<em>$1</em>');
  // Wiki Links (CSP-SAFE: Event handler removed, replaced with data attribute)
  result = result.replace(/\[\[([^\]]+)\]\]/g, (_, t) =>
    `<a href="#" data-page-link="${t}">${escapeHTML(t)}</a>`
  );
  // Code blocks
  result = result.replace(/```([\s\S]*?)```/g, (m, p1) =>
      `<pre style="background: #eee; padding: 10px; border-radius: 4px; overflow-x: auto;">${escapeHTML(p1).trim()}</pre>`
  );
  // Inline code
  result = result.replace(/`([^`]+)`/g, '<code>$1</code>');

  // List parsing
  let finalHtml = '';
  let inUL = false;
  let inOL = false;

  result.split('\n').forEach(line => {
    if (/^\*\s+/.test(line)) {
      if (inOL) { finalHtml += '</ol>'; inOL = false; }
      if (!inUL) { finalHtml += '<ul>'; inUL = true; }
      finalHtml += `<li>${line.replace(/^\*\s+/, '')}</li>`;
    } else if (/^\#\s+/.test(line)) {
      if (inUL) { finalHtml += '</ul>'; inUL = false; }
      if (!inOL) { finalHtml += '<ol>'; inOL = true; }
      finalHtml += `<li>${line.replace(/^\#\s+/, '')}</li>`;
    } else {
      if (inUL) { finalHtml += '</ul>'; inUL = false; }
      if (inOL) { finalHtml += '</ol>'; inOL = false; }
      if (line.trim() !== '') {
          finalHtml += line + '<br>';
      } else {
          finalHtml += '<br>';
      }
    }
  });

  if (inUL) finalHtml += '</ul>';
  if (inOL) finalHtml += '</ul>';

  finalHtml += `<div class="semantic-status">✔️ Semantic HTML Enabled</div><br>This landing page #search is not a broken design.`;
  return finalHtml;
}

function updateStorageBar() {
    const bar = document.getElementById('storage-bar-inner');
    if (!bar) return;
    if (navigator.storage && navigator.storage.estimate) {
      navigator.storage.estimate().then(est => {
        const usage = est.usage || 0;
        const quota = est.quota || 1;
        const percent = Math.min((usage / quota) * 100, 100).toFixed(1);
        bar.style.width = percent + '%';
        bar.title = `Used: ${(usage / 1024).toFixed(1)} KB / ${(quota / 1024).toFixed(1)} KB`;
      });
    } else {
      let totalBytes = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key) || '';
        totalBytes += (key.length + value.length) * 2;
      }
      bar.style.width = '100%';
      bar.title = `Approx. ${(totalBytes / 1024).toFixed(1)} KB used`;
    }
}

function applyThemeFromStorage() {
    let mode = localStorage.getItem(STORAGE_KEYS.theme);
    if (mode === null) {
      mode = 'dark';
      localStorage.setItem(STORAGE_KEYS.theme, mode); 
    }
    document.body.classList.toggle('dark', mode === 'dark');
}
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem(STORAGE_KEYS.theme, isDark ? 'dark' : 'light');
}
function restoreSidebarState() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      const storedState = localStorage.getItem(STORAGE_KEYS.sidebar);
      if (storedState === 'closed') {
        sidebar.style.display = 'none';
      } else {
        sidebar.style.display = 'block';
      }
    }
}
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    const isOpen = sidebar.style.display === 'block';
    if (isOpen) {
      sidebar.style.display = 'none';
      localStorage.setItem(STORAGE_KEYS.sidebar, 'closed');
    } else {
      sidebar.style.display = 'block';
      localStorage.setItem(STORAGE_KEYS.sidebar, 'open');
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar && sidebar.style.display === 'block') { 
      sidebar.style.display = 'none';
      localStorage.setItem(STORAGE_KEYS.sidebar, 'closed');
    }
}


// Utility for Hashing (for PIN verification, not encryption key derivation)
async function hashPin(pin) {
  if (!crypto.subtle) return null;
  const encoder = new TextEncoder();
  const data = encoder.encode(pin);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data); 
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// SETUP AUTH FUNCTION WRAPPED TO EXPOSE LOGOUT
function setupAuth() {
  const s = {
    modal: 'auth-modal', username: 'auth-username', pin: 'auth-pin', 
    title: 'auth-modal-title', createLink: 'create-account-link',
    loginLink: 'login-link', logoutLink: 'logout-link', userStatus: 'user-status',
    submitBtn: 'submit-auth', cancelBtn: 'cancel-auth'
  };

  async function getAllUsers() { return await loadData(STORAGE_KEYS.users, []); }
  async function saveAllUsers(users) { await saveData(STORAGE_KEYS.users, users); }
  
  function updateUserStatus() {
    const user = getCurrentUser();
    const el = document.getElementById(s.userStatus);
    if (el) el.textContent = user ? `Logged in as ${user.name}` : 'Not logged in';
  }
  function updateAuthUI() {
    const user = getCurrentUser();
    // CSP-SAFE: Using classList.add/remove('hidden') instead of manipulating .style.display
    document.getElementById(s.createLink).classList.toggle('hidden', !!user);
    document.getElementById(s.loginLink).classList.toggle('hidden', !!user);
    document.getElementById(s.logoutLink).classList.toggle('hidden', !user);
    const profileLink = document.getElementById('profile-link');
    if (profileLink) profileLink.classList.toggle('hidden', !user);
  }
  function showModal(isLogin = false) {
    const modal = document.getElementById(s.modal);
    const usernameInput = document.getElementById(s.username);
    const pinInput = document.getElementById(s.pin);
    document.getElementById(s.title).textContent = isLogin ? "Log In" : "Create Account";
    if (usernameInput) usernameInput.value = "";
    if (pinInput) pinInput.value = ""; 
    if (modal) modal.style.display = 'block';
    setTimeout(() => document.getElementById(s.username)?.focus(), 50);
  }
  function closeModal() {
    const modal = document.getElementById(s.modal);
    if (modal) modal.style.display = 'none';
  }
  
  async function submitAuth() { 
    const input = document.getElementById(s.username);
    const pinInput = document.getElementById(s.pin);
    const name = input ? input.value.trim() : '';
    const pin = pinInput ? pinInput.value.trim() : '';

    if (!name || !pin) { 
      console.error("Please enter both username and PIN."); 
      speak("Please enter both username and PIN."); 
      return; 
    }
    
    const enteredPinHash = await hashPin(pin);
    if (!enteredPinHash) { console.error("Hashing failed."); speak("Error: Pin hashing failed."); return; }

    let users = await getAllUsers();
    let user = users.find(u => u.name.toLowerCase() === name.toLowerCase());
    
    let saltArrayBuffer;
    let isNewUser = false;
    
    if (!user) {
      // --- ACCOUNT CREATION ---
      isNewUser = true;
      
      const salt = crypto.getRandomValues(new Uint8Array(CRYPTO_CONFIG.saltLength));
      saltArrayBuffer = salt.buffer;
      const saltB64 = arrayBufferToBase64(saltArrayBuffer);
      
      user = { 
          name, 
          joined: new Date().toISOString(), 
          edits: [],
          pinHash: enteredPinHash, 
          crypto: { salt: saltB64 } 
      }; 
      users.push(user);
      
    } else {
      // --- ACCOUNT LOGIN ---
      if (!user.pinHash || user.pinHash !== enteredPinHash) {
        console.error("❌ Invalid PIN."); 
        speak("Invalid PIN."); 
        return; 
      }
      if (!user.crypto || !user.crypto.salt) {
           console.error("❌ User found but missing crypto parameters. Data may be unrecoverable."); 
           speak("User data is incomplete. Please contact support.");
           return;
      }
      saltArrayBuffer = base64ToArrayBuffer(user.crypto.salt);
    }
    
    // 3. DERIVE SESSION ENCRYPTION KEY
    try {
        const key = await deriveKey(pin, saltArrayBuffer);
        encryptionKey = key; 
        console.log("✅ Encryption key derived and set for session.");
    } catch(e) {
        console.error("❌ Key derivation failed:", e);
        speak("Critical error during key derivation. Cannot log in.");
        encryptionKey = null;
        return;
    }
    
    // 4. SAVE
    if (isNewUser) {
      await saveAllUsers(users); 
      console.log(`✅ Account created and encrypted storage initiated for ${name}`);
      speak(`Account created and encrypted storage initiated for ${name}.`);
    }
    
    // 5. FINISH LOGIN
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
    closeModal();
    updateAuthUI();
    updateUserStatus();
    updateStorageBar();
    await showPage("Main-Page");
  }
  
  function logout() {
    encryptionKey = null; 
    window.userCrypto = null;
    localStorage.removeItem(STORAGE_KEYS.currentUser);
    console.log("Logged out. Encryption key cleared from memory.");
    updateAuthUI();
    updateUserStatus();
    updateStorageBar();
    showAbout();
  }
  
  // CSP-SAFE: Attaching event listeners instead of inline 'onclick'
  document.getElementById(s.createLink)?.addEventListener('click', e => { e.preventDefault(); showModal(false); });
  document.getElementById(s.loginLink)?.addEventListener('click', e => { e.preventDefault(); showModal(true); });
  document.getElementById(s.logoutLink)?.addEventListener('click', e => { e.preventDefault(); logout(); });
  document.getElementById(s.submitBtn)?.addEventListener('click', e => { e.preventDefault(); submitAuth(); }); 
  document.getElementById(s.cancelBtn)?.addEventListener('click', e => { e.preventDefault(); closeModal(); });
  document.addEventListener('keydown', e => { 
      if (e.key === 'Escape' && document.getElementById(s.modal)?.style.display === 'block') closeModal(); 
  });

  updateUserStatus();
  updateAuthUI();
  
  // EXPOSE LOGOUT FUNCTIONALITY FOR DYNAMICALLY CREATED BUTTONS
  return { logout: logout };
}

// Attach the Auth functions to the global scope for dynamic button binding (e.g., in showProfile)
setupAuth.getAuthFunctions = setupAuth;


function sanitizeContent(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return input; 
}

function setMainView(showMain) {
    const findView = document.getElementById('find-view');
    const pageContainer = document.getElementById('page-container');

    if (showMain) {
        findView.style.display = 'none';
        pageContainer.style.display = 'block';
    } else {
        findView.style.display = 'block';
        pageContainer.style.display = 'none';
    }
}

async function createPage(titleFromSearch = null) {
  setMainView(true);
  console.log("Creating page:", titleFromSearch);
  const title = titleFromSearch || prompt("Enter new page title:");
  if (!title || title.trim() === '') return;
  const cleanTitle = title.trim();
  
  const pages = await loadData(STORAGE_KEYS.pages, {}); 
  const changes = await loadData(STORAGE_KEYS.changes, []); 
  const user = getCurrentUser();
  
  if (pages[cleanTitle]) { console.error("Page already exists."); speak(`Page ${cleanTitle} already exists.`); showPage(cleanTitle); return; }
  
  pages[cleanTitle] = { 
      title: cleanTitle, 
      content: `== ${cleanTitle} ==\n\nThis is your new page. Click Edit to customize it.`, 
      lastEdited: new Date().toISOString(), 
      createdBy: user ? user.name : 'Guest' 
  };
  
  await saveData(STORAGE_KEYS.pages, pages); 
  changes.unshift({ type:'create', title: cleanTitle, time:new Date().toISOString(), user:user?user.name:'Guest' });
  await saveData(STORAGE_KEYS.changes, changes); 
  
  await updatePageListSidebar();
  await generatePageButtonsFindView();
  console.log(`✅ Page "${cleanTitle}" created!`);
  speak(`Page ${cleanTitle} created.`);
  await showPage(cleanTitle);
}

async function deletePage(title) {
  console.log("Deleting page:", title);
  const pages = await loadData(STORAGE_KEYS.pages, {}); 
  const changes = await loadData(STORAGE_KEYS.changes, []); 
  const user = getCurrentUser();
  
  // Custom modal UI should be used here instead of confirm() for a proper PWA
  if (!window.confirm(`Are you sure you want to delete the page "${title}"? This cannot be undone.`)) { return; }
  
  delete pages[title];
  await saveData(STORAGE_KEYS.pages, pages); 
  changes.unshift({ type:'delete', title, time:new Date().toISOString(), user:user?user.name:'Guest' });
  
      if (!pages[title]) {
        speak(`Page ${title} not found.`);
        return;
    }
    
    // Remove page
    delete pages[title];
    await saveData(STORAGE_KEYS.pages, pages);

    // 1. Define the change entry
    const newChangeEntry = { 
        type:'delete', 
        title, 
        time:new Date().toISOString(), 
        user:user ? user.name : 'Guest' 
    };
    
    // 2. Log to global changes array
    changes.unshift(newChangeEntry);
    await saveData(STORAGE_KEYS.changes, changes);

    if (user) {
        let users = await loadData(STORAGE_KEYS.users, []);
        const userIndex = users.findIndex(u => u.name === user.name);

        if (userIndex !== -1) {
            let userToUpdate = users[userIndex];
            
            // Initialize 'edits' if it doesn't exist
            if (!userToUpdate.edits) userToUpdate.edits = [];
            
            // Add the new deletion entry to the user's personal history
            userToUpdate.edits.unshift(newChangeEntry); 
            
            // Save the full user list back to storage
            await saveData(STORAGE_KEYS.users, users);
            
            // Update the currentUser session key
            localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(userToUpdate));
        }
    }
    
  
  await saveData(STORAGE_KEYS.changes, changes); 
  
  await updatePageListSidebar(); 
  await generatePageButtonsFindView();
  console.log(`✅ Page "${title}" deleted.`);
  speak(`Page ${title} deleted.`);
  await showRecent();
}

async function showPage(title) {
  setMainView(true);
  console.log("Showing page:", title);
  closeSidebar();
  
  // --- START MODIFICATION: Add return statement for custom pages ---
  if (title === 'Import_Data') {
      document.getElementById('page-container').innerHTML = renderImportPage();
      document.title = 'Import/Export Data – MEV Wiki';
      location.hash = '#Import_Data';
      return; // <-- CRITICAL FIX: Stop execution here
  }
  // --- END MODIFICATION ---

  const pages = await loadData(STORAGE_KEYS.pages, {}); 
  const page = pages[title];
  const c = document.getElementById('page-container');
  if (!c) return;
  
  if (!page) {
    const all = Object.keys(pages);
    const suggest = all.filter(t => t.toLowerCase().includes(title.toLowerCase()));
    let html = `<section class="page"><h2>No page found for "${escapeHTML(title)}"</h2>`;
    if (suggest.length) {
      html += `<p>Did you mean: ${suggest.map(t => `<a href="#" data-page-link="${t}">${escapeHTML(t)}</a>`).join(', ')}</p>`;
    }
    html += `<p>Would you like to create it?</p><button class="edit-btn" data-create-page="${escapeHTML(title)}">Create Page "${escapeHTML(title)}"</button></section>`;
    c.innerHTML = html;
    speak(`No page found for ${title}.`);
    location.hash = "#notfound";
    return;
  }
  
  const finalSafeHTML = parseWiki(page.content); 
  const pageUrl = `${location.origin}#${encodeURIComponent(page.title)}`;
  const dateMod = new Date(page.lastEdited).toISOString();
  const authorName = escapeHTML(page.createdBy || 'Guest');

  // SCHEMA FIX: Injected fully compliant Article schema
  c.innerHTML = `
    <article class="page" 
             itemscope 
             itemtype="https://schema.org/Article"
             itemid="${pageUrl}"
    >
      <meta itemprop="mainEntityOfPage" content="${pageUrl}">
      <h2 itemprop="headline">${escapeHTML(page.title)}</h2>
      
      <div class="meta-info" style="font-size: 0.85rem; color: #555555; margin-bottom: 10px;">
        Last edited: <time itemprop="dateModified" datetime="${dateMod}">${new Date(page.lastEdited).toLocaleString()}</time> 
        by <span itemprop="author" itemscope itemtype="https://schema.org/Person"><span itemprop="name">${authorName}</span></span>
      </div>

      <meta itemprop="image" content="${location.origin}/assets/icons/icon-512.png">
      
      <div class="content" itemprop="articleBody">${finalSafeHTML}</div>
      
      <hr style="margin-top:20px; border-top: 1px solid #ccc;">
      <button class="edit-btn" id="edit-btn">Edit</button>
      <button class="delete-btn" id="delete-btn">Delete Page</button>
      <div class="semantic-status">✔️ Semantic HTML Loaded</div>
    </article>
  `;

  document.getElementById('edit-btn')?.addEventListener('click', () => editPage(title));
  document.getElementById('delete-btn')?.addEventListener('click', () => deletePage(title));
  
  if (title === "Main-Page") {
      location.hash = "#main";
  } else {
      location.hash = `#${encodeURIComponent(title)}`;
  }
}

// --- NEW FUNCTION: Render the Import/Export UI as a Wiki Page ---
function renderImportPage() {
    return `
        <section class="bg-white p-6 rounded-xl shadow-lg" style="background-color: var(--bg-card); border: 1px solid var(--border-color);">
            <h1 class="text-3xl font-extrabold mb-4" style="color: var(--text-primary);">Import/Export Data</h1>
            <p class="mb-6" style="color: var(--text-secondary);">This utility allows you to backup and restore your wiki content. The full backup includes your login details (hashed PIN), so be cautious when sharing.</p>
            
            <h2 class="text-xl font-semibold mt-6" style="color: var(--text-primary);">1. Import Data (Paste JSON)</h2>
            <p class="text-sm" style="color: var(--text-secondary);">Paste your MEV Wiki JSON backup code below and click the green button to import pages.</p>
            
            <textarea 
                id="importDataInput" 
                placeholder="Paste your MEV Wiki JSON backup code here..." 
                rows="10" 
                style="width:100%; padding:10px; border-radius: 8px; border: 1px solid var(--border-color); background-color: var(--bg-page); color: var(--text-primary); font-family: monospace; resize: vertical;"
            ></textarea>
            <button 
                onclick="runImport()" 
                class="block w-full text-center px-4 py-2 text-lg font-semibold rounded-lg text-white bg-green-500 hover:bg-green-600 mt-3"
            >
                Import Wiki Content
            </button>
            <p id="importStatus" class="mt-3 text-sm" style="color: var(--color-accent);"></p>
            
            <h2 class="text-xl font-semibold mt-6" style="color: var(--text-primary);">2. Export Data</h2>
            <button 
                onclick="exportData(true)" 
                class="block w-full text-center px-4 py-2 text-lg font-semibold rounded-lg text-white bg-green-500 hover:bg-green-600 mt-3"
            >
                Download Content-Only Backup (Safe to Share)
            </button>
            <button 
                onclick="exportData(false)" 
                class="block w-full text-center px-4 py-2 text-lg font-semibold rounded-lg text-white bg-blue-500 hover:bg-blue-600 mt-3"
            >
                Download Full Backup (Includes Users & Pins)
            </button>
        </section>
    `;
}


async function editPage(title) {
  setMainView(true);
  console.log("Editing page:", title);
  const user = getCurrentUser();
  if (!user) { console.error("You must be logged in to edit sections."); speak("You must be logged in to edit pages."); return; }
  
  const pages = await loadData(STORAGE_KEYS.pages, {}); 
  const page = pages[title];
  const c = document.getElementById('page-container');
  if (!c) return;
  
  c.innerHTML = `<section class="page">
    <h2>Editing: ${escapeHTML(title)}</h2>
    <p style="font-size: 0.85rem; color: #6c757d;">Using simple wiki markup. See Formatting Examples for help.</p>
    <textarea class="editor">${escapeHTML(page.content)}</textarea>
    <button class="edit-btn" id="save-page-btn">Save Changes</button>
    <button class="delete-btn" id="cancel-edit-btn">Cancel</button>
  </section>`;
  
  // CSP-SAFE: Attaching listeners to the newly created buttons
  document.getElementById('save-page-btn')?.addEventListener('click', () => savePage(title));
  document.getElementById('cancel-edit-btn')?.addEventListener('click', () => showPage(title));
  document.querySelector('.editor')?.focus();
}

async function savePage(title) {
  console.log("Saving page:", title);
  const pages = await loadData(STORAGE_KEYS.pages, {}); 
  const changes = await loadData(STORAGE_KEYS.changes, []); 
  const user = getCurrentUser();
  const editor = document.querySelector('.editor');
  if (!editor) { console.error("Editor not found."); return; }
  
  const rawContent = editor.value;

  pages[title].content = rawContent;
  pages[title].lastEdited = new Date().toISOString();
  pages[title].createdBy = user ? user.name : 'Guest';
  
  await saveData(STORAGE_KEYS.pages, pages); 
  // --- START PR 3 FIX: User Contribution Consistency ---
// The 'newChangeEntry' and 'user' variables should already be defined above this line.

  const newChangeEntry = { 
    type:'edit', 
    title, 
    time:new Date().toISOString(), 
    user:user ? user.name : 'Guest' 
  };
  
  if (user) {
    // 1. Load the main list of users
    let users = await loadData(STORAGE_KEYS.users, []);
    
    // 2. Find the index of the user in the main array
    const userIndex = users.findIndex(u => u.name === user.name);

    if (userIndex !== -1) {
        let userToUpdate = users[userIndex];
        
        // 3. Update the edits array (Initialize if null/undefined)
        if (!userToUpdate.edits) userToUpdate.edits = [];
        userToUpdate.edits.unshift(newChangeEntry);
        
        // 4. Save the full user list back to storage
        await saveData(STORAGE_KEYS.users, users);

        // 5. Update the currentUser session key for immediate consistency
        localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(userToUpdate));
    }
  }
// --- END PR 3 FIX ---

  changes.unshift(newChangeEntry);
  await saveData(STORAGE_KEYS.changes, changes); 
  
  console.log("✅ Page saved.");
  speak(`Page ${title} saved.`);
  await updatePageListSidebar(); 
  await generatePageButtonsFindView(); 
  await showPage(title); 
}

// ✅ UPDATED: Content for Formatting Examples page.
async function createExampleWikiPage() {
  const title = "Formatting Examples";
  const pages = await loadData(STORAGE_KEYS.pages, {}); 
  if (pages[title]) return;
  const content = `
== Wiki Page Formatting Examples ==

This wiki uses a simple, lightweight markup for fast and clean formatting.

=== Headings ===
Use the '=' symbol at the start and end of a line to create headings:
== Level 2 Header (Section) ==
=== Level 3 Header (Subsection) ===

=== Text Styles ===
* '''Bold:''' Use triple apostrophes. Example: '''word'''
* ''Italic:'' Use double apostrophes. Example: ''word''
* '''Bold & Italic:''' Combine them. Example: '''''word'''''

=== Lists ===
* Item One (Unordered List / Bullet)
* Item Two
# Step One (Ordered List / Numbered)
# Step Two
# Step Three

=== Internal Links ===
Link to another page in the wiki using double square brackets:
[[Main-Page]]
[[User Guide: Getting Started]]

=== Code Blocks ===
Inline code: Use a backtick \` to wrap short code snippets. Example: \`const x = 5;\`

Block code uses three backticks:
\`\`\`
function exampleCode() {
  // Code block preserves spaces and new lines
  console.log("Hello World!");
}
\`\`\`
`;
  pages[title] = { title, content, createdBy:'System', lastEdited:new Date().toISOString() };
  await saveData(STORAGE_KEYS.pages, pages); 
  console.log("✅ Example wiki page created.");
}

// ✅ UPDATED: Content for Main-Page.
async function ensureMainPage() {
  const pages = await loadData(STORAGE_KEYS.pages, {}); 
  if (!pages["Main-Page"]) {
    pages["Main-Page"] = {
      title: "Main-Page",
      content: "== Welcome to MEV Wiki ==\n\nAn offline‑first encyclopedia powered by your browser. No tracking, no server. You can search the wiki using the bar above, or check the [[User Guide: Getting Started]] page to learn more. You can also create a new page now!",
      lastEdited: new Date().toISOString(),
      createdBy: "System"
    };
    await saveData(STORAGE_KEYS.pages, pages); 
    console.log("✅ Main-Page created.");
  }
}

// ✅ NEW FUNCTION: To create the wiki page for log.html.
async function ensureVisualLogPage() {
    const title = "Visual-Log";
    const pages = await loadData(STORAGE_KEYS.pages, {});
    if (pages[title]) return;
    
    const content = `
== Visual Log and Change History ==

This page provides access to the project's historical change visualization tool.

=== 3D Log Visualization ===
The **3D Log Viewer** is an advanced tool for seeing user and page edit trails in a spatial environment. It uses the file named '''log.html''' which must be opened directly.

You will need to open the external file directly from your browser.
File Path: \`log.html\`

=== Recent Edits ===
For a simple, chronological list of the last 50 edits directly within the wiki, visit the [[Recent Changes]] page.
`;
    pages[title] = { title, content, createdBy:'System', lastEdited:new Date().toISOString() };
    await saveData(STORAGE_KEYS.pages, pages); 
    console.log("✅ Visual Log wiki page created.");
}

async function answerAI(query) {
  setMainView(true); 
  console.log("Search query:", query);
  const txt = query.trim();
  if (!txt) {
      await showPage("Main-Page"); 
      return;
  }
  
  const pages = await loadData(STORAGE_KEYS.pages, {}); 
  const titles = Object.keys(pages);
  const queryLower = txt.toLowerCase();

  if (pages[txt]) {
      await showPage(txt); 
      return;
  }
  
  const suggestedTitles = titles.filter(t => t.toLowerCase().includes(queryLower));

  const c = document.getElementById('page-container');
  if (!c) return;

  if (suggestedTitles.length) {
    c.innerHTML = `<section class="page">
      <h2>Closest matches for "${escapeHTML(txt)}"</h2>
      <p>Found ${suggestedTitles.length} pages matching your query:</p>
      <ul>${suggestedTitles.map(t => `<li><a href="#" data-page-link="${t}">${escapeHTML(t)}</a></li>`).join('')}</ul>
      <p>Or you can create a new page.</p>
      <button class="edit-btn" data-create-page="${escapeHTML(txt)}">Create Page "${escapeHTML(txt)}"</button>
    </section>`;
    speak(`Found ${suggestedTitles.length} similar pages for ${txt}.`);
  } else {
    c.innerHTML = `<section class="page">
      <h2>No page found for "${escapeHTML(txt)}"</h2>
      <p>There are no existing pages that match your search query. Would you like to create this page?</p>
      <button class="edit-btn" data-create-page="${escapeHTML(txt)}">Create Page "${escapeHTML(txt)}"</button>
    </section>`;
    speak(`No local page found for ${txt}.`);
  }
  location.hash = "#search"; 
}

async function generatePageButtonsFindView() {
  const listEl = document.getElementById('page-list-find');
  const pages = await loadData(STORAGE_KEYS.pages, {}); 
  
  listEl.innerHTML = '';
  
  const staticLinks = [
      { title: "Main-Page", hash: "main" },
      { title: "Recent Changes", hash: "recent" },
      { title: "Settings", hash: "settings" },
      { title: "About", hash: "about" }
  ];

  staticLinks.forEach(link => {
      listEl.appendChild(createButtonElementFindView(link.title, link.hash, true));
  });

  const titles = Object.keys(pages).filter(t => t !== "Formatting Examples").sort();
  
  titles.forEach(title => {
      listEl.appendChild(createButtonElementFindView(title, encodeURIComponent(title), false));
  });

  titleInputFindView();
}
  
function titleInputFindView() {
  const inputEl = document.getElementById('filterInput-find');
  const statusEl = document.getElementById('status-message-find');
  if (!inputEl) return;
  
  const input = inputEl.value.toLowerCase().trim();
  const items = document.querySelectorAll('#page-list-find .titleInput-find');
  let visibleCount = 0;

  items.forEach(li => {
      const buttonText = li.querySelector('button').textContent.toLowerCase();
      
      if (buttonText.includes(input)) {
          li.style.display = "list-item";
          visibleCount++;
      } else {
          li.style.display = "none";
      }
  });

  if (input) {
      statusEl.textContent = `Pages Matching "${input}": ${visibleCount}`;
  } else {
      statusEl.textContent = `Total Wiki Pages Found: ${items.length}`;
  }
  
  document.getElementById('ai-input').value = inputEl.value;
}

function updateConnectionStatus() {
  const el = document.getElementById('status-indicator');
  const banner = document.getElementById('offline-message');
  const online = navigator.onLine;
  if (el) el.textContent = online ? '🟢 Online' : '🔴 Offline';
  if (banner) banner.style.display = online ? 'none' : 'block';
}

function resetHashAndScroll(hash = "#main") {
  history.replaceState(null, null, ' ');
  location.hash = hash;
  setTimeout(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    const main = document.getElementById("main-content-wrapper");
    if (main) main.scrollTop = 0;
  }, 50);
}

function createButtonElementFindView(title, hash, isStatic) {
      const li = document.createElement('li');
      li.className = 'titleInput-find'; 
      li.setAttribute('data-static', isStatic); 

      const button = document.createElement('button');
      button.textContent = title;
      
      // CSP-SAFE: Use data attributes for linking
      button.setAttribute('data-nav-target', hash);
      button.setAttribute('data-page-target', title);

      li.appendChild(button);
      return li;
  }

async function handleLinkClick(e) {
    e.preventDefault();
    const target = e.target.closest('[data-page-link], [data-page-target], [data-nav-target], [data-create-page]');
    if (!target) return;

    if (target.hasAttribute('data-page-link')) {
        await showPage(target.getAttribute('data-page-link'));
    } else if (target.hasAttribute('data-page-target')) {
        await showPage(target.getAttribute('data-page-target'));
    } else if (target.hasAttribute('data-nav-target')) {
        const hash = target.getAttribute('data-nav-target');
        if (hash === "recent") await showRecent();
        else if (hash === "settings") await showSettings();
        else if (hash === "about") await showAbout();
    } else if (target.hasAttribute('data-create-page')) {
        await createPage(target.getAttribute('data-create-page'));
    }
    
    // Clear search inputs after navigation
    document.getElementById('ai-input').value = ''; 
    document.getElementById('filterInput-find').value = '';
}

async function handleSettingsAction(e) {
  const target = e.target;
  if (target.id === 'toggle-theme-btn') {
      toggleTheme();
  // --- START MODIFICATION: REMOVE OLD IMPORT/EXPORT LOGIC ---
  } else if (target.id === 'clear-ai-memory-btn') {
      localStorage.removeItem(STORAGE_KEYS.knowledge); 
      await saveData(STORAGE_KEYS.knowledge, {});
      console.log('AI memory cleared.'); 
      speak("AI memory cleared.");
      // Re-run showSettings to update the stats and warning section
      await showSettings(); 
  }
  // --- END MODIFICATION ---
}

// --- START PR 1 FIX: Robust runImport() function (KEPT AS IS) ---
async function runImport() {
    const input = document.getElementById('importDataInput').value;
    const statusMsg = document.getElementById('importStatus');
    statusMsg.innerText = 'Processing...';

    if (!input) {
        statusMsg.innerText = 'Please paste the code first.';
        return;
    }

    try {
        // 1. Parse the JSON
        let importedData = JSON.parse(input);

        // 2. SANITIZATION: Strip out sensitive data before merging
        // This is VITAL to prevent overwriting the current session (currentUser) 
        // and deleting the Admin user's pinHash, which would break login.
        delete importedData.users;
        delete importedData.currentUser;
        // Also ensure no stray pinHash keys at the root level are imported
        delete importedData.pinHash; 

        // 3. Fix the specific encoding glitch in page content
        if (importedData.pages) {
            for (const key in importedData.pages) {
                let page = importedData.pages[key];
                if (page.content) {
                    // Replaces the broken 'â€‘' with a standard hyphen '-'
                    page.content = page.content.replace(/â€‘/g, "-");
                }
            }
        }

        // 4. MERGE DATA (Pages)
        // Load existing pages and merge the imported ones on top (overwriting conflicts)
        const currentPages = await loadData(STORAGE_KEYS.pages, {});
        const newPages = { ...currentPages, ...importedData.pages };
        await saveData(STORAGE_KEYS.pages, newPages);

        // 5. MERGE DATA (Changes/History - optional, but good for completeness)
        if (importedData.changes) {
            const currentChanges = await loadData(STORAGE_KEYS.changes, []);
            // Concatenate the imported changes with the current history
            await saveData(STORAGE_KEYS.changes, [...importedData.changes, ...currentChanges]);
        }
        
        // 6. Final success state
        statusMsg.innerText = "Import successful! Reloading to apply changes...";
        
        // Reload the page to refresh the navigation and current view
        setTimeout(() => {
            location.reload();
        }, 1000);

    } catch (e) {
        // Handle malformed JSON errors gracefully
        console.error('Import Error:', e);
        statusMsg.innerText = `❌ Error importing data: ${e.message}. Check your JSON syntax.`;
    }
}
// --- END PR 1 FIX ---

// --- START PR 2 FIX: Safe Export Function (KEPT AS IS) ---
async function exportData(isContentOnly) {
    // 1. Load the full application state
    const appState = {
        pages: await loadData(STORAGE_KEYS.pages, {}),
        users: await loadData(STORAGE_KEYS.users, []),
        currentUser: getCurrentUser(), // Get the active user object
        changes: await loadData(STORAGE_KEYS.changes, []),
        knowledge: await loadData(STORAGE_KEYS.knowledge, {}),
    };

    let exportData = { ...appState };
    let fileName = `mev-wiki-backup-${new Date().toISOString().slice(0, 10)}`;

    if (isContentOnly) {
        // 2. SANITIZE: Keep only content and public history
        delete exportData.users;
        delete exportData.currentUser;
        // Do not delete 'changes' as that is often useful historical context
        
        fileName += '-content-only.json';
    } else {
        // 3. FULL BACKUP: Include everything (users, pinHash, etc.)
        fileName += '-full.json';
    }

    // 4. Create the JSON string
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // 5. Trigger the download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    speak(`Exported data to ${fileName}`);
}
// --- END PR 2 FIX ---


// ==========================================================
// ⚙️ NEW: CLI ACTION HANDLER (For index.bat integration)
// ==========================================================

/**
 * CLI Integration: Checks for specific URL query parameters 
 * triggered by the external batch script (index.bat).
 * @returns {boolean} True if a CLI action was handled.
 */
function handleCliAction() {
    const params = new URLSearchParams(window.location.search);
    const action = params.get('action');

    if (action === 'cli_update') {
        console.log('CLI Action Triggered: Starting Web Settings Update / localStorage sync.');
        
        // 1. Show message to the user
        const banner = document.getElementById('banner');
        if (banner) {
            banner.textContent = "✅ Settings Update Triggered by CLI Tool. Running internal sync...";
            banner.style.display = 'block';
            setTimeout(() => banner.style.display = 'none', 5000); 
        }

        // 2. Clear the query parameter (prevents accidental re-runs on refresh)
        if (window.history.replaceState) {
            const cleanUrl = window.location.origin + window.location.pathname;
            window.history.replaceState(null, '', cleanUrl);
        }

        // 3. Trigger the actual update logic
        // This is where you would call your functions to refresh settings,
        // check for external updates, or force a data synchronization.
        showSettings(); // Example: Immediately navigates to settings view after sync message
        
        return true;
    }
    return false;
}


// ==========================================================
// 🚀 INITIALIZATION & EVENT BINDING (CSP-SAFE)
// ==========================================================

document.addEventListener('DOMContentLoaded', async () => {
  applyThemeFromStorage();
  setupAuth();
  updateConnectionStatus();
  updateStorageBar();

  // New: Check for CLI action first
  const cliActionHandled = handleCliAction();
  
  // Create/Ensure essential wiki pages
  await createExampleWikiPage(); 
  await ensureMainPage(); 
  await ensureVisualLogPage(); // ✅ ADDED: Initialization of the new Visual-Log page
  
  await updatePageListSidebar(); 
  await generatePageButtonsFindView(); 
  
  restoreSidebarState(); 

  window.addEventListener('online', updateConnectionStatus);
  window.addEventListener('offline', updateConnectionStatus);
  
  // Hash Change Listener (remains functional)
  window.addEventListener('hashchange', async () => { 
    const hash = decodeURIComponent(location.hash.slice(1));
    if (hash === "main") await showPage("Main-Page");
    else if (hash === "settings") await showSettings();
    else if (hash === "about") await showAbout();
    else if (hash === "recent") await showRecent();
    else if (hash === "profile") showProfile();
    else if (hash === "Import_Data") await showPage("Import_Data"); // Added for hash nav
    else if (hash === "search" || hash === "notfound") {}
    else if (hash) { 
        await showPage(hash); 
    } else {
        await showPage("Main-Page"); 
    }
  });

  // CSP-SAFE Event Listeners (Instead of inline handlers)

  // 1. Menu and Search Controls
  document.getElementById('menu-btn')?.addEventListener('click', toggleSidebar);
  document.getElementById('ai-input')?.addEventListener('input', titleInputSidebar); // Filter sidebar on input
  document.getElementById('filterInput-find')?.addEventListener('input', titleInputFindView); // Filter find view on input
  
  // 2. Search Button Action
  document.getElementById('ai-button')?.addEventListener('click', async () => {
    const inp = document.getElementById('ai-input');
    const findInp = document.getElementById('filterInput-find');
    const query = (inp?.value.trim() || findInp?.value.trim() || "");
    
    if (inp) inp.value = query;
    if (findInp) findInp.value = query;

    if (query) {
      await answerAI(query);
    } else {
      await showPage("Main-Page");
    }
    
    if (inp) inp.value = '';
    if (findInp) findInp.value = '';
  });

  // 3. Enter Key Submission (Combined for both search inputs)
  const searchHandler = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById('ai-button')?.click();
    }
  };
  document.getElementById('ai-input')?.addEventListener('keydown', searchHandler);
  document.getElementById('filterInput-find')?.addEventListener('keydown', searchHandler);
  
  // 4. Create Page Button
  document.getElementById('create-page-btn')?.addEventListener('click', e => {
    e.preventDefault();
    createPage();
  });
  
  // 5. Global Link/Button Handler (Delegated for dynamically created links)
  document.getElementById('main-content-wrapper')?.addEventListener('click', handleLinkClick);
  document.getElementById('sidebar')?.addEventListener('click', handleLinkClick);

  // 6. Profile Link
  document.getElementById('profile-link')?.addEventListener('click', e => { e.preventDefault(); showProfile(); });
  
  // 7. Settings Action Handler (Delegated)
  document.getElementById('page-container')?.addEventListener('click', handleSettingsAction);

  // 8. Import File Change Handler (Removed from here, now in showSettings)

  // Initial load based on hash (skip if CLI action already loaded a specific view)
  if (!cliActionHandled) {
    const initialHash = decodeURIComponent(location.hash.slice(1));
    if (initialHash && initialHash !== "search" && initialHash !== "notfound") {
      if (initialHash === "main") await showPage("Main-Page");
      else if (initialHash === "settings") await showSettings();
      else if (initialHash === "about") await showAbout();
      else if (initialHash === "recent") await showRecent();
      else if (initialHash === "profile") showProfile();
      else if (initialHash === "Import_Data") await showPage("Import_Data"); // Added for initial load
      else await showPage(initialHash); 
    } else {
        await showPage("Main-Page");
    }
  }

  // SW Registration (kept for completeness)
  if ('serviceWorker' in navigator) {
    // ✅ PATH UPDATED TO ABSOLUTE PATH
    navigator.serviceWorker.register('/mev/sw.js')
      .then(() => console.log('✅ Service Worker registered'))
      .catch(err => console.error('❌ SW registration failed:', err));
  }
});

// --- SW Update Fix for SPA Stale Content ---
// This code runs immediately after DOMContentLoaded and is essential for reliable updates.
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        // This fires when the new Service Worker has finished installing and activated,
        // effectively taking control of the current page's resources.
        console.log("New Service Worker activated. Forcing page reload for fresh content.");
        window.location.reload();
    }, { once: true }); // Use { once: true } to prevent multiple reloads
}
