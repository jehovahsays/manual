<?php
gethostname();
$ip = $localIp = gethostbyname(gethostname());
// open log use "a" to write and grow 
// log no deletion or use "r+" writes 
// 1 line to the log it also deletes log
$handle = fopen("./pagescreated.html", "a"); //open log use "a" to write and grow log no deletion or use "r+" writes 1 line to the log it also deletes log
// the user post becomes $value
foreach($_POST as $variable => $value) { 
fwrite($handle, "root@localhost:~# searched for" . "\n" . "<a href=\"" . $value . ".html" . "\">$value</a></br></br>" . "\r\n");
$handle = fopen("./pagescreated/$value.html", "a");
fwrite($handle, "root@localhost:~# searched for" . "\n" . $value . "\r\n");
}
fclose($handle);
?>
<?php
$ip = $localIp = gethostbyname(gethostname());
$handle = fopen("./log/ip.log", "a"); //open log file
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
header( 'description: root@localhost' );
header( 'keywords: root@localhost' );
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
<meta name="description" content="root@localhost"/>
<meta name="keywords" content="root@localhost"/>
<meta itemprop="name" content="root@localhost"/>
<meta itemprop="description" content="root@localhost"/>
<META NAME="ROBOTS" CONTENT="INDEX, FOLLOW">
<link rel="stylesheet" href="./css/main.css"></link>
<title>chat</title>
</head>
<body>
<script src="./js/jquery-3.7.1.min.js" type="text/javascript"></script>
<iframe src="./tail.php" width="100%" height="250px">
</iframe>
<br>	
<div class="form">
<form action="./index.php?action=post" method="post">	 
<input type="text" name="username" class="usernameInput" style="height: 50px;"  style="text-align:left;" type="text" maxlength="14" autocomplete="false" placeholder="type in chat" />
</form>
</div>
<br>
<a href="./pagescreated.html">pages created</a>
<br>
<br>
<a href="./sitemap.php">Sitemap</a>
<br>
<br>
<a href="./read/about.txt">About</a>
</body>	
</html> 
