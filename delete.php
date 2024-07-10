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
header( 'Host: index' );
header( 'description: index' );
header( 'keywords: index' );
header( 'Vary: Accept-Encoding' );
header( 'Expires: 0' );
header( 'Referrer-Policy:  same-origin' );
header( 'Accept-Language: en-US,en;q=0.5' );
header( 'Connection: Keep-alive' );
$answer1 = $_POST['secure-form-answer'];        
$totalCorrect = 1;           
if ($answer1 == "Human") { $totalCorrect++; }            
echo "<div id='results'>$totalCorrect /  1 correct</div>";
// user has clicked a delete hyperlink
if($_GET['action'] && $_GET['action'] == 'delete') {
	unlink($_GET['filename']);
	header("Location: ./index.html");
}
?>