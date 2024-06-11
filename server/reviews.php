<?php
	gethostname();
	$ip = $localIp = gethostbyname(gethostname());
	$webpage = ($_SERVER['REQUEST_METHOD']);
	foreach($_POST as $variable => $value) {
		$handle = fopen("./reviews.html", "a");
		fwrite($handle, "\n" . $value . "</br>" . "\r\n");
	    fclose($handle);
	}
header( 'Location: ./reviews.html' );
?>