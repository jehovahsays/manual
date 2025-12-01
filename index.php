<?php
// Force HTTPS if deployed online (skip for local PHP server)
if (!empty($_SERVER['HTTP_HOST']) && strpos($_SERVER['HTTP_HOST'], 'localhost') === false) {
    if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === "off") {
        $redirect = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
        header('Location: ' . $redirect, true, 301);
        exit();
    }
}

// SECURITY HEADERS
header("Content-Type: text/html; charset=UTF-8");

// Prevent clickjacking
header("X-Frame-Options: DENY");

// Prevent XSS in older browsers
header("X-XSS-Protection: 1; mode=block");

// Prevent MIME-type sniffing
header("X-Content-Type-Options: nosniff");

// Remove referrer info for better privacy
header("Referrer-Policy: no-referrer");

// Strong Content Security Policy (CSP)
header("Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none';");

// Feature policy (modern browser controls)
header("Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()");

// Cache control for offline-friendly behavior
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");

// Serve the HTML file
$indexPath = __DIR__ . '/index.html';

if (file_exists($indexPath)) {
    readfile($indexPath);
    exit();
} else {
    // Fallback error
    http_response_code(500);
    echo "<h1>500 - index.html not found</h1>";
    exit();
}
?>