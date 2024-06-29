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
header( 'Host: database' );
header( 'description: database' );
header( 'keywords: database' );
header( 'Vary: Accept-Encoding' );
header( 'Expires: 0' );
header( 'Referrer-Policy:  same-origin' );
header( 'Accept-Language: en-US,en;q=0.5' );
header( 'Connection: Keep-alive' );
$answer1 = $_POST['secure-form-answer'];        
$totalCorrect = 1;           
if ($answer1 == "Human") { $totalCorrect++; }            
echo "<div id='results'>$totalCorrect /  1 correct</div>";
foreach($_POST as $variable => $value) 
{
	$value = str_replace(' ', '_', $value);	
	$file_pointer = "./en/" . $value . ".html"; 						
	if (file_exists($file_pointer))  
	{ 		
	echo "The file $file_pointer already exists <br>"; 
	//echo "<meta name='viewport' content='width=device-width'><a href='./en/$value.html'>$value</a>";
	echo "<body onload='loadout()'><script>function loadout(){window.location.href = './en/database.html'}</script>";		
	exit();
	}
}

    foreach($_POST as $variable => $value) 
{
	$value = str_replace(' ', '_', $value);
	$handle = fopen("./en/" . $value . ".html", "a");
	fwrite($handle, 
     "<!DOCTYPE html>\n<html>\n<head>"
	."<meta name="
	."\""
    ."viewport"
	."\""
    ."content="
	."\""
    ."width=device-width"
	."\""
    .">\n"
    ."<style>fieldset{position:absolute;width:100%;height: 100%;}</style>\n<title>$value</title>\n</head>\n<body>"
    ."<script> var msg = new SpeechSynthesisUtterance('$value'); window.speechSynthesis.speak(msg); </script>\n"
    ."<fieldset>\n<legend>$value</legend>\n</fieldset>\n</body>\n<html>");
}	
	foreach($_POST as $variable => $value) 
{
	$value = str_replace(' ', '_', $value);
	$handle = fopen("./en/database.html", "a");
	fwrite($handle, 
	  "<a href=" 
	. "\"" 
	. "../index.html#en/" 
	. $value  
	. "\"" 
	. "class=" 
	. "\"" 
	. "titleInput" 
	. "\"" 
	. ">" 
	. "<button>"
	. $value
    . "</button>"	
	. "</a>"
	. "\r\n");
}

foreach($_POST as $variable => $value) 
{
	$value = str_replace(' ', '_', $value);
	$handle = fopen("./index.htm", "a");
	fwrite($handle, 
	  "<a href=" 
	. "\"" 
	. "./index.html#en/" 
	. $value  
	. "\"" 
	. "class=" 
	. "\"" 
	. "titleInput" 
	. "\"" 
	. ">" 
	. "<button>"
	. $value
    . "</button>"	
	. "</a>"
	. "\r\n");
}
	
	foreach($_POST as $variable => $value) 
{	
    $value = str_replace(' ', '_', $value);		
	$handle = fopen("./js/tagcloud.js", "a");
	// load the data and delete the line from the array 
	$lines = file('./js/tagcloud.js'); 
	$last = sizeof($lines) - 1 ; 
	unset($lines[$last]); 
	// write the new data to the file 
	file_put_contents('./js/tagcloud.js', $lines); 
	$value = str_replace(' ', '_', $value);
	fwrite($handle, 	
	  "\""
	. $value 
	. "\""
	. ","
	. "\n"
	. "];var tc = TagCloud('.content', texts);console.log(tc);");
}
	
	foreach($_POST as $variable => $value) 
{    
    $value = str_replace(' ', '_', $value);	
	$handle = fopen("./js/chatbot.js", "a");
	// load the data and delete the line from the array 
	$lines = file('./js/chatbot.js'); 
	$last = sizeof($lines) - 1 ; 
	unset($lines[$last]); 
	// write the new data to the file 
	file_put_contents('./js/chatbot.js', $lines); 
	$value = str_replace(' ', '_', $value);
	fwrite($handle, 	
	  "\""
	. $value
	. "\""
	. ","
	. "\n"
	. "];return responses[Math.floor(Math.random() * responses.length)];}window.onblur = function (tabs) {alert('switch tabs alert');};");
}	

foreach($_POST as $variable => $value) 
{    
    $value = str_replace(' ', '_', $value);	
	$handle = fopen("./js/search.json", "a");
	// load the data and delete the line from the array 
	$lines = file('./js/search.json'); 
	$last = sizeof($lines) - 1 ; 
	unset($lines[$last]); 
	// write the new data to the file 
	file_put_contents('./js/search.json', $lines); 
	$value = str_replace(' ', '_', $value);
	fwrite($handle, 
      ","	
	. "\""
	. $value
	. "\""	
	. ":"
	. "\""
	. "en/"
	. $value
    . "\""
	. "\n"
    . "}}}");
}
	
//echo "<meta name='viewport' content='width=device-width'>successfully created <a href='./#en/$value.html'>$value</a>";
echo "<body onload='loadout()'><script>function loadout(){window.location.href = './en/database.html'}</script>";		
fclose($handle);
exit();
?>