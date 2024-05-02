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
header( 'Host: tail' );
header( 'description: tail' );
header( 'keywords: tail' );
header( 'Vary: Accept-Encoding' );
header( 'Expires: 0' );
header( 'Referrer-Policy:  no-referrer' );

gethostname();
$ip = $localIp = gethostbyname(gethostname());
// open log use "a" to write and grow 
// log no deletion or use "r+" writes 
// 1 line to the log it also deletes log
$ip = $handle = fopen("./manual/manual.log", "a"); //open log use "a" to write and grow log no deletion or use "r+" writes 1 line to the log it also deletes log
// the user post becomes $value
foreach($_POST as $variable => $value) { 
fwrite($ip = $handle, "\n" . $value . "\r\n");
}
fclose($ip = $handle);

$logFile = "./manual/manual.log"; // local path to log file
$interval = 1000; //how often it checks the log file for changes, min 100
$textColor = "green"; //use CSS color
// Don't have to change anything bellow
if(!$textColor) $textColor = "green";
if($interval < 100)  $interval = 100; 
if(isset($_GET['getLog'])){
	echo file_get_contents($logFile);
}else{
?>

<!DOCTYPE html>
<!--
secured 
 -->
<html lang="en">
	<head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge;chrome=1">
        <meta name="apple-mobile-web-app-capable" content="yes">
      <meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Cache-Control" content="private, no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
        <link rel="icon" type="image/png" href="favicon.ico">
		<link rel="stylesheet" href="./manual/tail.css"></link>
		<title>tail</title>
</head>
	<script src="./manual/tail.js" type="text/javascript"></script>
<body bgcolor="gray">
<p style="color:green">
<br><br>
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

	
	<h4><?php echo $logFile; ?></h4>
		<div id="log">
			
		</div>
</br>
		<div id="scrollLock"> <input class="disableScrollLock" type="button" value="Disable Scroll Lock" /> <input class="enableScrollLock" style="display: none;" type="button" value="Enable Scroll Lock" /></div>	
</body>	
</html> 				
<?php  } ?>