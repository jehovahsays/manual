<?php
header_remove( 'X-Powered-By' );
header( 'Cache-control: none, no-cache, private, max-age=0' );
header( 'Pragma: no-cache' );
header( 'Content-Type-Options: nosniff' );
header( 'X-Content-Type-Options: nosniff' );
header( 'XSS-Protection: 1; mode=block' );
header( 'X-XSS-Protection: 1; mode=block' );
header( 'Vary: Accept-Encoding' );
header( 'viewport: width=device-width' );
header( 'Accept-Language: en-US,en;q=0.5' );
header( 'Connection: Keep-alive' );
header( 'Host: 127.0.0.1' );
header( 'description: 127.0.0.1' );
header( 'keywords: 127.0.0.1' );
header( 'Vary: Accept-Encoding' );
header( 'Expires: 0' );
header( 'Referrer-Policy:  no-referrer' );
//header( 'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload' );
//header( 'Public-Key-Pins: pin-sha256="";' );
//header( 'Content-Security-Policy: default-src "self";');
//include(realpath(getenv('DOCUMENT_ROOT')) .'/blackhole/blackhole.php');
//header( 'Strict-Transport-Security: max-age=0; includeSubDomains; preload' );
//header( 'google-site-verification: ' );
//header( 'msvalidate.01: ' );
//header( 'norton-safeweb-site-verification: ' );
//header( 'wot-verification: ' );
//header( 'Expect-CT:  enforce,max-age=30,report-uri=""' );
?>
<!DOCTYPE html>
<head>	
<html lang="en">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width">
<meta http-equiv="Content-Security-Policy" content="
default-src 'self' ; 
script-src 'self' 'unsafe-inline' 'unsafe-eval' ; 
style-src 'self' 'unsafe-inline' ; 
img-src data: ; 
font-src 'self' ; 
connect-src ; 
frame-src 'self' ;"/>
<meta http-equiv="Cache-Control" content="no-store, no-cache, private, max-age=0" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<meta name="google-site-verification" content=""/>
<meta name="msvalidate.01" content=""/>
<meta name="norton-safeweb-site-verification" content=""/>
<meta name="wot-verification" content=""/>
<meta name="author" content=""/>
<meta name="description" content=""/>
<meta name="keywords" content=""/>
<meta itemprop="name" content=""/>
<meta itemprop="description" content=""/>
<meta itemprop="image" content=""/>
<link rel="shortcut icon" href="/favicon.ico"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:site" content=""/>
<meta name="twitter:creator" content=""/>
<meta name="twitter:title" content=""/>
<meta name="twitter:description" content=""/>
<meta name="twitter:image" content=""/>
<meta name="twitter:url" content=""/>
<meta name="theme-color" content="black" />
</head>

