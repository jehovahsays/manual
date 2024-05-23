<?php
header( 'Location: ./index.html' );
gethostname();
$ip = $localIp = gethostbyname(gethostname());
$ip = $handle = "handle"; 
$ip = $handle = fopen("./index.html", "a");
foreach($ip = $_POST as $variable => $value) {
	$value = str_replace(' ', '_', $value);
	fwrite($ip = $handle, "<a href=" . "\"" . "./brain/" . $value . ".html" . "\"" . "class=" . "\"" . "handle" . "\"" . "><fieldset><legend><center>" . $value . "</center></legend></fieldset></a></br>" . "\r\n");
	$ip = $handle = fopen("./brain/" . $value . ".html", "a");
	fwrite($ip = $handle, "\n" 
	. "<!DOCTYPE html>" 
	. "<meta name=" . "\"" . "viewport" . "\"" . "content=" . "\"" . "user-scalable=yes, initial-scale=1.0, maximum-scale=1.0" . "\"" . "/>" 
	. "<title>" . $value . "</title>" . "</br>"
	. "<br>\n" 
	. "<form action=\"../index.php\" method=\"post\">\n" 
	. "<input id=\"input\" type=\"text\" name=\"title\" \n"
	. "onkeypress=\"return event.charCode != 32\" \n" 
	. "class=\"{{ \App\getAllClasses()['text'] }}\" \n"
	. "class=\"create\" style=\"create\"  class=\"titleInput\" \n"
	. "style=\"height: 30px;\" maxlength=\"30\" autocomplete=\"true\" \n"
	. "autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"true\" \n"
	. "placeholder=\"create page\">\n"
	. "</form>\n");
}
fclose($ip = $handle);
?>