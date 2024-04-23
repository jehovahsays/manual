<?php
gethostname();
$ip = $localIp = gethostbyname(gethostname());
// open log use "a" to write and grow 
// log no deletion or use "r+" writes 
// 1 line to the log it also deletes log
$handle = fopen("./compression/compression.html", "a"); //open log use "a" to write and grow log no deletion or use "r+" writes 1 line to the log it also deletes log
// the user post becomes $value
foreach($_POST as $variable => $value) { 
fwrite($handle, "root@localhost:~# searched for" . "\n" . "<a href=\"" . $value . ".html" . "\">$value</a></br></br>" . "\r\n");
$handle = fopen("./compression/$value.html", "a");
fwrite($handle, "root@localhost:~# searched for" . "\n" . $value . "\r\n");
}
fclose($handle);
?>
<?php
$ip = $localIp = gethostbyname(gethostname());
$handle = fopen("./compression.log", "a"); //open log file
foreach($_POST as $variable => $value) { //loop through POST vars
fwrite($handle, $variable . "+" . $value . "\r\n");
}
fwrite($handle, "IP: $ip \r\n \r\n");
fclose($handle);
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
header( 'Host: root@localhost' );
header( 'description: root@localhost description of compression' );
header( 'keywords: root@localhost,compression keywords' );
header( 'Vary: Accept-Encoding' );
header( 'Expires: 0' );
header( 'Referrer-Policy:  no-referrer' );
?>
<!DOCTYPE html>
<head>	
<html lang="en-US">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Cache-Control" content="no-store, no-cache, private, max-age=0" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<meta name="author" content="root@localhost"/>
<meta name="description" content="root@localhost description of compression"/>
<meta name="keywords" content="root@localhost,compression keywords"/>
<meta itemprop="name" content="root@localhost"/>
<meta itemprop="description" content="root@localhost"/>
<META NAME="ROBOTS" CONTENT="INDEX, FOLLOW">
<link rel="stylesheet" href="./compression.css"></link>
<title>chat</title>
</head>
<body bgcolor="gray">
<p style="color:green">
<script src="./compression.js" type="text/javascript"></script>
<a href="./about.html">About compression</a>
<br>
<br>
<a href="./sitemapofcompression.php">Sitemap of compression</a>
<br>
<br>
<a href="./compression/compression.html">compression pages created</a>
<br>
<div class="form">
<iframe frameborder="0" height="175" src="./compression.tail.php" width="300"></iframe>	
</br>
<form action="./index.php?action=post" method="post">	 
<input type="text" name="username" class="usernameInput" style="height: 50px;"  style="text-align:left;" type="text" maxlength="14" autocomplete="false" placeholder="type in chat" />
<br>
form of compression
<br>
</form>
</div>
</body>	
</html> 
