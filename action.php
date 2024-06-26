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
header( 'Host: index' );
header( 'description: index' );
header( 'keywords: index' );
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
	echo "<meta name='viewport' content='width=device-width'><a href='./en/$value.html'>$value</a>";
	exit();
	}
}

    foreach($_POST as $variable => $value) 
{
	$value = str_replace(' ', '_', $value);
	$handle = fopen("./en/" . $value . ".html", "a");
	fwrite($handle, 
	  "<!DOCTYPE html>"
	. "<html>"
	. "<head>"
	. "<meta "
	. "name=\"viewport\""
	. "content=\"width=device-width\">"
	. "<style>"
	. "/* mobile */"
	. "p {"
	. "width:100%; "
	. "height:100%;"
	. "position: fixed;"
	. "padding: 0;"
	. "margin-top: 200px;"
	. "top: 0px;"
	. "left: 0px;"
	. "}"
	. "</style>"
	. "<title>"
	. $value
	. "</title>"
	. "</head>"
	. "<body>"
	. "<a href="
	. "\""
	. "../../index.html"
	. "\""
	. "><button>return to homepage</button></a><br><br>"
	. "<a href="
	. "\""
	. "./txt/edit.html"
	. "\""
	. ">"
	. "<button>view this acticle</button></a>"
	. "<br><br>" 
	. "<a href="
	. "\"" 
	. "../delete.php?action=delete&filename=./en/" 
	. $value 
	. ".html" 
	. "\"" 
	. "><button>delete this page</button></a>"
	. "<div class=\"p\">"
	. "<p contenteditable=\"true\">"
	. "click here to define the keyword\n"
	. $value
	. "</p>"
	. "</div>"
	. "</body>"
	. "<html>");
}	
	foreach($_POST as $variable => $value) 
{
	$value = str_replace(' ', '_', $value);
	$handle = fopen("./index.html", "a");
	fwrite($handle, 
	  "<a href=" 
	. "\"" 
	. "./en/" 
	. $value 
	. ".html" 
	. "\"" 
	. "class=" 
	. "\"" 
	. "edges" 
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
	$handle = fopen("./js/merge.js", "a");
	// load the data and delete the line from the array 
	$lines = file('./js/merge.js'); 
	$last = sizeof($lines) - 1 ; 
	unset($lines[$last]); 
	// write the new data to the file 
	file_put_contents('./js/merge.js', $lines); 
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
	
	echo "<meta name='viewport' content='width=device-width'>successfully created <a href='./en/$value.html'>$value</a>";
	
foreach($_POST as $variable => $value) 
{
	$handle = fopen("./en/txt/edit.html", "a");
	// load the data and delete the line from the array 
	$lines = file('./en/txt/edit.html'); 
	$last = sizeof($lines) - 1 ; 
	unset($lines[$last]); 
	// write the new data to the file 
	file_put_contents('./en/txt/edit.html', $lines); 

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
	."../../js/edit.js"
	."\""
	."></script>"
	."\r\n");
	
	$handle = fopen("./en/txt/".$value.".txt", "a");
	fwrite($handle,
     "\n" 
	.$value
    ."\r\n");	
	
	echo "<body onload='loadout()'><script>function loadout(){window.location.href = './en/txt/edit.html'}</script>";	
}	
fclose($handle);
exit();
?>