<?php
session_start();
gethostname();
$_SESSION['username'] = 'Developer';
$username = getenv('POST') ?: getenv('POST');
$username = getenv('USERNAME') ?: getenv('USER');
$ip = $localIp = gethostbyname(gethostname());
$handle = fopen("./sql.log", "r+"); //open log file
foreach($_POST as $variable => $value) { 
fwrite($handle, "$username searched for" . "\n" . $value . "\r\n");
}
fwrite($handle, "C:\\$ip\r\n \r\n");
	fclose($handle);
?>
