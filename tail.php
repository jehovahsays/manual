<?php
$logFile = "./main.log"; // local path to log file
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
<head>	
<link rel="stylesheet" href="./tail.css"></link>
<title>log</title>
</head>
<body> 
	<script src="./main.js" type="text/javascript"></script>
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
	<body>
		<h4><?php echo $logFile; ?></h4>
		<div id="log">
			
		</div>
</br>
		<div id="scrollLock"> <input class="disableScrollLock" type="button" value="Disable Scroll Lock" /> <input class="enableScrollLock" style="display: none;" type="button" value="Enable Scroll Lock" /></div>	
</body>	
</html> 
<?php  } ?>