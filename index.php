<?php
gethostname();
$ip = $localIp = gethostbyname(gethostname());
// open log use "a" to write and grow 
// log no deletion or use "r+" writes 
// 1 line to the log it also deletes log
$ip = $handle = fopen("./localhost/localhost.html", "a"); //open log use "a" to write and grow log no deletion or use "r+" writes 1 line to the log it also deletes log
// the user post becomes $value
foreach($_POST as $variable => $value) { 
fwrite($ip = $handle, "</br><button class='button' type='button' onclick='alert('Connection Established')>" . "\n" . "<a href=\"" . $value . ".html" . "\">$value</a></button></br></br>" . "\r\n");
$handle = fopen("./localhost/$value.html", "a");
fwrite($ip = $handle, "<meta name=" . "\"" . "viewport" . "\"" . "content=" . "\"" . "width=device-width," . "initial-scale=1.0" . "\"" . ">" . "\n" . $value . "\r\n");
}
fclose($ip = $handle);
?>
<?php
$ip = $localIp = gethostbyname(gethostname());
$ip = $handle = fopen("./localhost/localhost.log", "a"); //open log file
foreach($_POST as $variable => $value) { 
fwrite($ip = $handle, "\n" . "\n" . $value . "\r\n" . "IP: 127.0.0.1 PORT:80" . "\n" . "Conection Established \r\n \r\n");
}
fclose($ip = $handle);
?>
<?php
header_remove( 'X-Powered-By' );
header( 'Cache-control: none, no-cache, private, max-age=0' );
header( 'Pragma: no-cache' );
header( 'Content-Type-Options: nosniff' );
header( 'X-Content-Type-Options: nosniff' );
header( 'XSS-Protection: 1; mode=block' );
header( 'X-XSS-Protection: 1; mode=block' );
header( 'Vary: Accept-Encoding' );
header( 'viewport: width=device-width, initial-scale=1.0' );
header( 'Accept-Language: en-US,en;q=0.5' );
header( 'Connection: Keep-alive' );
header( 'Host: localhost' );
header( 'description: localhost' );
header( 'keywords: localhost' );
header( 'Vary: Accept-Encoding' );
header( 'Expires: 0' );
header( 'Referrer-Policy:  no-referrer' );
?>
<!DOCTYPE html>
<head>	
<html lang="en">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Cache-Control" content="no-store, no-cache, private, max-age=0" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<meta name="author" content="localhost"/>
<meta name="description" content="localhost"/>
<meta name="keywords" content="localhost"/>
<meta itemprop="name" content="localhost"/>
<meta itemprop="description" content="root@localhost"/>
<META NAME="ROBOTS" CONTENT="INDEX, FOLLOW">
<link rel="stylesheet" href="./localhost.css"></link>
<title>localhost</title>
</head>
<button class="button" type="button" onclick="alert('Connection Established')">
<!<body bgcolor="gray">
<p style="color:green">
<script src="./localhost.js" type="text/javascript"></script>
<a href="./about.html">About localhost</a>
<br>
<br>
<a href="./sitemap.xml.php">Sitemap of localhost</a>
<br>
<br>
<a href="./localhost/localhost.html">localhost pages created</a>
<br>
<br>
<iframe frameborder="0" width="270" height="200" src="./localhost.tail.php">
</br>
<br>
</iframe>	
</br>
<form action="./index.php?action=post" method="post">	 
<input type="text" name="username" class="usernameInput" style="height: 50px;"  style="text-align:left;" type="text" maxlength="14" autocomplete="false" placeholder="type in chat" />
</form>
<br>
</button>
</body>	
</html> 
