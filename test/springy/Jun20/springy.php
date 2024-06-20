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
header( 'Host: handle' );
header( 'description: handle' );
header( 'keywords: handle' );
header( 'Vary: Accept-Encoding' );
header( 'Expires: 0' );
header( 'Referrer-Policy:  same-origin' );
header( 'Accept-Language: en-US,en;q=0.5' );
header( 'Connection: Keep-alive' );
gethostname();
$ip = $localIp = gethostbyname(gethostname());
$ip = $handle = "handle"; 
            $answer1 = $_POST['secure-form-answer'];        
            $totalCorrect = 1;           
            if ($answer1 == "Human") { $totalCorrect++; }            
            echo "<div id='results'>$totalCorrect /  1 correct</div>";
            //The halting problem
	    foreach($_POST as $variable => $value) {
			$value = str_replace(' ', '_', $value);	
			// checking whether file exists or not 		
			$file_pointer = "./en/" . $value . ".html"; 						
			if (file_exists($file_pointer))  
			{ 		
			echo "The file $file_pointer already exists <br>"; 
			echo "<meta name='viewport' content='width=device-width'><a href='./en/$value.html' class='handle'>$value</a>";
			exit;
			} 				
$handle = fopen("./springy.html", "a");
// load the data and delete the line from the array 
$lines = file('./springy.html'); 
$last = sizeof($lines) - 1 ; 
unset($lines[$last]); 
// write the new data to the file 
file_put_contents('./springy.html', $lines); 
foreach($_POST as $variable => $value) {
    $value = str_replace(' ', '_', $value);
	fwrite($handle, 	
	  "\""
	. $value 
	. "\""
    . ","
    . "]};</script>");
		echo "<meta name='viewport' content='width=device-width'>successfully created <a href='./en/$value.html'>$value</a>";
	}
}
fclose($handle);
?>