<?php
session_start();
gethostname();
$_SESSION['username'] = 'Developer';
$username = getenv('POST') ?: getenv('POST');
$username = getenv('USERNAME') ?: getenv('USER');
$ip = $localIp = gethostbyname(gethostname());
$handle = fopen("./index.log", "a"); //open log use "a" to write and grow log no deletion or use "r+" writes 1 line to the log it also deletes log
foreach($_POST as $variable => $value) { 
fwrite($handle, "$username searched for" . "\n" . $value . "\r\n");
}
fclose($handle);
?> 

