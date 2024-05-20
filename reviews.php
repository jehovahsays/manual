
<?php
	gethostname();
	$ip = $localIp = gethostbyname(gethostname());
	$webpage = ($_SERVER['REQUEST_METHOD']);
	foreach($_POST as $variable => $value) {
		$handle = fopen("./en/reviews.html", "a");
		fwrite($handle, "\n" . $value . "</br>" . "\r\n");
	    header( 'Location: ./en/reviews.html' );
		fclose($handle);
	}
?>