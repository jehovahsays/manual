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
header( 'Host: handle' );
header( 'description: handle' );
header( 'keywords: handle' );
header( 'Vary: Accept-Encoding' );
header( 'Expires: 0' );
header( 'Referrer-Policy:  same-origin' );
header( 'Accept-Language: en-US,en;q=0.5' );
header( 'Connection: Keep-alive' );
header( 'Location: ./index.html' );
gethostname();
$ip = $localIp = gethostbyname(gethostname());
$ip = $handle = "handle"; 
$ip = $handle = "filterInput"; 
$ip = $handle = fopen("./index.html", "a");
foreach($ip = $_POST as $variable => $value) {
    $value = str_replace(' ', '_', $value);
	fwrite($ip = $handle, "<a href=" . "\"" . "./" . "browser.html#en" . "/" . $value . "\"" . "class=" . "\"" . "handle" . "\"" . "><button>" . $value . "</button></a></br>" . "\r\n");
	$ip = $handle = fopen("./en/" . $value . ".html", "a");
	fwrite($ip = $handle, "\n" 
	. "<!DOCTYPE html>" 
	. "<meta name=" . "\"" . "viewport" . "\"" . "content=" . "\"" . "user-scalable=yes, initial-scale=1.0, maximum-scale=1.0" . "\"" . "/>" 
	. "<title>" . $value . "</title>" . "</br>"
	. "<br>\n" 
	. "<form action=\"../index.php\" method=\"post\">\n" 
	. "<input id=\"input\" type=\"text\" name=\"title\" \n"
	. "onkeypress=\"return event.charCode != 32\" \n" 
	. "style=\"height: 30px;\" maxlength=\"30\" autocomplete=\"true\" \n"
	. "autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"true\" \n"
	. "placeholder=\"create page\">\n"
	. "</form>\n" 
	. "\n" 
	. "<br><a href=" . "\"" . "../delete.php?action=delete&filename=./en/" . $value . ".html" . "\"" . ">delete this page</a>"
	. "<center>\n" 
	. "<ul id=\"list\">\n" 
	. "<a href=\"../index.html\"class=\"handle\">index</a></br>\n" 
	. "\n"
	. $value . "\r\n");
	$answer1 = $_POST['create-pages'];        
	$totalCorrect = 0;           
	if ($answer1 == "create pages") { $totalCorrect++; }            
	header( 'Location: ./index.html' );
}
fclose($ip = $handle);
?>