<?php
// php emulates a Vim text editor using webpage username input form
// pho emulates Vim script below using $handle,fopen,foreach,fwrite, and fclose.
// php handle opens folder named BLOB and creates file.
$handle = fopen("./manual/en/manual.html", "a"); //open log use "a" to write and grow log no deletion or use "r+" writes 1 line to the log it also deletes log
// php interprets webpage input data $_POST as $variable => $value.
foreach($_POST as $variable => $value) { 
fwrite($handle, "<a href=" . "\"" . "./" . $value . ".html" . "\"" . ">" . $value ."</a></br></br>" . "\r\n");
$handle = fopen("./manual/en/$value.html", "a");
fwrite($handle, "\n" . $value . "\r\n");
}
fclose($handle);
?>
<?php
// php confirms connection collects ip.
//$handle = $ip = $localIp = gethostbyname(gethostname());
// php handle opens file.
$handle = fopen("./manual/manual.log", "a");
// php $foreach interprets user data from input form text and defines it as $_POST as $variable => $value.
foreach($_POST as $variable => $value) { 
fwrite($handle, "\n" . $value . "\r\n");
}
// php closes open file after edit.
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
header( 'Host: manual' );
header( 'description: manual' );
header( 'keywords: manual' );
header( 'Vary: Accept-Encoding' );
header( 'Expires: 0' );
header( 'Referrer-Policy:  no-referrer' );
header("Location: ./manual/index.html#en/manual"); 
?>

