
<?php
	gethostname();
	$ip = $localIp = gethostbyname(gethostname());
	$webpage = ($_SERVER['REQUEST_METHOD']);
	foreach($_POST as $variable => $value) {
		$handle = fopen("./output.json", "a");
		fwrite($handle, 
		 "{"
		."\""
		."en"
		."\""
		."{"
		."\""
		."manual"
		."\""
		.":"
		."{"
		."\"". $value."\"".":"."\""."en/".$value."\""."}}}"); 
	    header( 'Location: ./json-builder.html' );
		fclose($handle);
	}
?>