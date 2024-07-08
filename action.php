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
$answer1 = $_POST['secure-form-answer-Human'];        
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
	//echo "<meta name='viewport' content='width=device-width'><a href='./index.html#$value'>$value</a>";
	//echo "<script> var msg = new SpeechSynthesisUtterance(' i remember hearing.. the word $value.. before.'); window.speechSynthesis.speak(msg); </script>";
	echo "<body onload='loadout()'><script>function loadout(){window.location.href = './index.html#intelligence'}</script>";
	exit();
	}
}

foreach($_POST as $variable => $value) 
{ 
    $value = str_replace(' ', '_', $value);	
	$handle = fopen("./en/edit.html", "a");
	// load the data and delete the line from the array 
	$lines = file('./en/edit.html'); 
	$last = sizeof($lines) - 1 ; 
	unset($lines[$last]); 
	// write the new data to the file 
	file_put_contents('./en/edit.html', $lines); 
	
	fwrite($handle, 	
	"\n"
	."<li><a data-page="
	."\""
	.$value
	."\""
	.">"
	.$value
	."</a></li>\n</ul>"
	."<script type="
	."\""
	."text/javascript" 
	."\""
	."src="
	."\""
	."../js/edit.js"
	."\""
	."></script>"
	."\r\n");
	
	$handle = fopen("./en/".$value.".txt", "a");
	fwrite($handle,
	"\n" 
	.$value
    ."\r\n");	
	
}	
	
	foreach($_POST as $variable => $value) 
{	
    $value = str_replace(' ', '_', $value);		
	$handle = fopen("./js/tagcloudlog.js", "a");
	// load the data and delete the line from the array 
	$lines = file('./js/tagcloudlog.js'); 
	$last = sizeof($lines) - 1 ; 
	unset($lines[$last]); 
	// write the new data to the file 
	file_put_contents('./js/tagcloudlog.js', $lines); 
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


foreach($_POST as $variable => $value) 
{
	$handle = fopen("./js/chatbot.js", "a");
	// load the data and delete the line from the array 
	$lines = file('./js/chatbot.js'); 
	$last = sizeof($lines) - 1 ; 
	unset($lines[$last]); 
	// write the new data to the file 
	file_put_contents('./js/chatbot.js', $lines); 
	fwrite($handle, 	
	  "\""
	. $value
	. "\""
	. ","
	. "\n"
	. "];return responses[Math.floor(Math.random() * responses.length)];};");
}
 //echo "<meta name='viewport' content='width=device-width'>successfully created <br> <a href='./index.html#$value'>$value</a>";
 echo "<body onload='loadout()'><script>function loadout(){window.location.href = './index.html#intelligence'}</script>";
 //echo "<script> var msg = new SpeechSynthesisUtterance('i never heard. that word before!.. i will remember. the word $value for further analysis'); window.speechSynthesis.speak(msg); </script>";		
fclose($handle);
exit();
?>