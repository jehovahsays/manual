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
header( 'Host: index' );
header( 'description: index' );
header( 'keywords: index' );
header( 'Vary: Accept-Encoding' );
header( 'Expires: 0' );
header( 'Referrer-Policy:  no-referrer' );
//include './index.js');
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
session_start();
gethostname();
$_SESSION['username'] = 'Developer';
$username = getenv('POST') ?: getenv('POST');
$username = getenv('USERNAME') ?: getenv('USER');
$ip = $localIp = gethostbyname(gethostname());
$handle = fopen("./sql.log", "a"); //open log file
foreach($_POST as $variable => $value) { 
fwrite($handle, "$username searched for" . "\n" . $value . "\r\n");
}
fwrite($handle, "C:\\$ip\r\n \r\n");
	fclose($handle);
	
/*
 * Easy PHP Tail 
 * by: Thomas Depole
 * v1.0
 * 
 * just fill in the varibles bellow, open in a web browser and tail away 
 */
$logFile = "./sql.log"; // local path to log file
$interval = 500; //how often it checks the log file for changes, min 100
$textColor = "green"; //use CSS color

// Don't have to change anything bellow
if(!$textColor) $textColor = "green";
if($interval < 10000)  $interval = 10000; 
if(isset($_GET['getLog'])){
	echo file_get_contents($logFile);    	
}else{
?>
<!DOCTYPE html>
<head>	
<html lang="en">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width">
<meta http-equiv="Cache-Control" content="no-store, no-cache, private, max-age=0" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<meta name="theme-color" content="black" />

<link rel="stylesheet" href="./index.css">
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js" type="text/javascript"></script>
	<script>
		setInterval(readLogFile, <?php echo $interval; ?>);
		window.onload = readLogFile; 
		var pathname = window.location.pathname;
		var scrollLock = true;
		
		$(document).ready(function(){
			$('.disableScrollLock').click(function(){
				$("html,body").clearQueue()
				$(".disableScrollLock").hide();
				$(".enableScrollLock").show();
				scrollLock = false;
			});
			$('.enableScrollLock').click(function(){
				$("html,body").clearQueue()
				$(".enableScrollLock").hide();
				$(".disableScrollLock").show();
				scrollLock = true;
			});
		});
		function readLogFile(){
			$.get(pathname, { getLog : "true" }, function(data) {
				data = data.replace(new RegExp("\n", "g"), "<br />");
		        $("#log").html(data);
		        
		        if(scrollLock == true) { $('html,body').animate({scrollTop: $("#scrollLock").offset().top}, <?php echo $interval; ?>) };
		    });
		}
	</script>
	</head>	
	<body bgcolor="white">
	<h4><?php echo $logFile; ?></h4>
		
		<div id="log">
			
		</div>

		<div id="scrollLock">
			
		<input class="disableScrollLock" type="button" value="Disable Scroll Lock" /> 
			</br>	
	<form action="/loopback.index.php?action=post" method="post">
       <input type="text" name="username" placeholder="C:\loopback.index.php"\>	 
</form></br>
		<input class="enableScrollLock" style="display: none;" type="button" value="Enable Scroll Lock" />		
		</div>
		</br>
	
	</body>
</html>

<?php  };
?>
