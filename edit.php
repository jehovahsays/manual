
<?php
	foreach($_POST as $variable => $value) 
	{
		$handle = fopen("./en/edit.html", "a");
		fwrite($handle, "\n" . $value . "</br>" . "\r\n");
	    header( 'Location: ./en/edit.html' );
		fclose($handle);
	}
?>