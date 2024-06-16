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
header( 'Location: ./index.html' );
            $answer1 = $_POST['secure-form-answer'];        
            $totalCorrect = 0;           
            if ($answer1 == "Human") { $totalCorrect++; }            
            echo "<div id='results'>$totalCorrect /  1 correct</div>";
	foreach($_POST as $variable => $value) {
    $value = str_replace(' ', '_', $value);			
	$handle = fopen("./en/" . $value . ".html", "a");
	fwrite($handle, "\n" 
	. "<!DOCTYPE html>" 
	. "<meta name=" . "\"" . "viewport" . "\"" . "content=" . "\"" . "user-scalable=yes, initial-scale=1.0, maximum-scale=1.0" . "\"" . "/>" 
	. "<title>" . $value . "</title>"
    . $value	
	. "<br><br><form action=\"../action.php\" method=\"post\">\n" 
	. "<input id=\"secure-form-answer-Human\" type=\"text\" name=\"secure-form-answer\" \n"
	. "onkeypress=\"return event.charCode != 32\" \n" 
	. "style=\"width: 150px;height: 30px;\" maxlength=\"40\" autocomplete=\"true\" \n"
	. "autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"true\" \n"
	. "placeholder=\"what word defines this word\">\n"
	. "<noscript><label for="
	. "\""
	. "secure-form-answer-Human"
	. "\""
	. ">Human</label></noscript>"
	. "</form>\n" 
	. "\n" 
	. "<br><a href=" . "\"" . "../delete.php?action=delete&filename=./en/" . $value . ".html" . "\"" . ">delete this page</a>"
	. "<center>\n" 
	. "<br><a href=\"../index.html\"class=\"handle\">return to homepage</a></br>\n" 
	. "\n"
    . "\r\n");
$handle = fopen("./index.html", "a");
	fwrite($handle, "<a href=" . "\"" . "./en/" . $value . ".html" . "\"" . "class=" . "\"" . "handle" . "\"" . "><button>" . $value . "</button>" . "</a></br>" . "\r\n");
}
fclose($handle);
?>