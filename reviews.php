
<?php
		foreach($_POST as $variable => $value) {
		$handle = fopen("./en/reviews.html", "a");
		fwrite($handle, "\n" . $value . "</br>" . "\r\n");
	    header( 'Location: ./en/reviews.html' );
		fclose($handle);
	}
?>