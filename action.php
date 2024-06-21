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
            //The halting problem
	    foreach($_POST as $variable => $value) {
			$value = str_replace(' ', '_', $value);	
			// checking whether file exists or not 		
			$file_pointer = "./en/" . $value . ".html"; 						
			if (file_exists($file_pointer))  
			{ 		
			echo "The file $file_pointer already exists <br>"; 
			echo "<meta name='viewport' content='width=device-width'><a href='./en/$value.html'>$value</a>";
			exit;
			} 			
			$handle = fopen("./en/" . $value . ".html", "a");
			fwrite($handle, 
			"\n" 
			. "<meta name="
			. "\""
			. "viewport"
			. "\"" 
			. "content="
			. "\"" 
			. "width=device-width"
			. "\"" 
			. ">"	
			. "<title>" 
			. $value 
			. "</title>"	
			. "<script src="
			. "\""
			. "../js/jquery-3.7.1.min.js"
			. "\""
			. "></script>"
			. "<script src="
			. "\"" 
			. "../js/bootstrap.js"
			. "\"" 
			. "></script>"
			. "<link href="
			. "\"" 
			. "../css/bootstrap.css"
			. "\"" 
			. "rel="
			. "\"" 
			. "stylesheet"
			. "\"" 
			. "></link>"
			. "<nav class="
			. "\"" 
			. "navbar navbar-inverse"
			. "\"" 
			. ">"
			. "<div class="
			. "\"" 
			. "container-fluid"
			. "\"" 
			. ">"
			. "<div class="
			. "\"" 
			. "navbar-header"
			. "\"" 
			. ">"
			. "<button type="
			. "\"" 
			. "button"
			. "\"" 
			. "class="
			. "\"" 
			. "navbar-toggle"
			. "\"" 
			. " data-toggle="
			. "\"" 
			. "collapse"
			. "\"" 
			. "data-target="
			. "\"" 
			. "#myNavbar"
			. "\"" 
			. ">"
			. "<span class="
			. "\"" 
			. "icon-bar"
			. "\"" 
			. "></span>"
			. "<span class="
			. "\"" 
			. "icon-bar"
			. "\"" 
			. "></span>"
			. "<span class="
			. "\"" 
			. "icon-bar"
			. "\"" 
			. "></span>"
			. "</button>"
			. "<a class="
			. "\""
			. "navbar-brand"
			. "\""
			. "href="
			. "\""
			. "./$value.html"
			. "\""
			. ">"
			. $value
			. "</a>"
			. "<form "
			. "class="
			. "\"" 
			. "form-group"
			. "\"" 
			. "action="
			. "\"" 
			. "../action.php"
			. "\"" 
			. "method="
			. "\"" 
			. "post"
			. "\"" 
			. ">"
			. "<input "
			. "type="
			. "\"" 
			. "text"
			. "\"" 
			. "class="
			. "\"" 
			. "form-control"
			. "\"" 
			. "id="
			. "\"" 
			. "secure-form-answer-Human"
			. "\"" 
			. "type="
			. "\"" 
			. "text"
			. "\"" 
			. "name="
			. "\"" 
			. "secure-form-answer"
			. "\"" 	 
			. "maxlength="
			. "\"" 
			. "40"
			. "\"" 
			. "autocomplete="
			. "\"" 
			. "true"
			. "\"" 
			. "autocorrect="
			. "\"" 
			. "off"
			. "\""
			. "autocapitalize="
			. "\"" 
			. "off"
			. "\"" 
			. "spellcheck="
			. "\"" 
			. "true"
			. "\"" 
			. "placeholder="
			. "\"" 
			. "what word defines this word"
			. "\""
            . "required"			
			. ">"
			. "<noscript><label"
			. "for="
			. "\"" 
			. "secure-form-answer-Human"
			. "\"" 
			. ">"
			. "Human"
			. "</label></noscript></form>"
			. "<center><article>Keyword definitions go here</article></center>"
			. "</div></ul>"
			. "<ul class="
			. "\"" 
			. "nav navbar-nav navbar-right"
			. "\"" 
			. ">"
			. "<div class="
			. "\"" 
			. "collapse navbar-collapse"
			. "\"" 
			. " id="
			. "\"" 
			. "myNavbar"
			. "\"" 
			. ">"
			. "<center>"
			. "<button class="
			. "\"" 
			. "form-group"
			. "\"" 
			. ">"
			. "</form>"
			. "<a href="
			. "\"" 
			. "../index.html"
			. "\"" 
			. ">return to homepage</a>"
			. "</button>"
			. "<br><br><a href=" 
			. "\"" 
			. "../delete.php?action=delete&filename=./en/" 
			. $value 
			. ".html" 
			. "\"" 
			. ">delete this page</a>"
			. "</center>" 
			. "\n"
			. "\r\n");
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
			. "edge" 
			. "\"" 
			. "><button>" 
			. $value 
			. "</button>" 
			. "</a>"
			. "recent edits "
			. "<a href="
			. "\""
			. "./en/"
			. $value
			. ".html"
			. "\""
			. ">"
			. $value
			. "</a></br>" 		
			. "\r\n");
			$handle = fopen("./orbital.html", "a");
			// load the data and delete the line from the array 
			$lines = file('./orbital.html'); 
			$last = sizeof($lines) - 1 ; 
			unset($lines[$last]); 
			// write the new data to the file 
			file_put_contents('./orbital.html', $lines); 
			foreach($_POST as $variable => $value) {
			$value = str_replace(' ', '_', $value);
			fwrite($handle, 	
			"\""
			. $value 
			. "\""
			. ","
			. "\n"
			. "];var tc = TagCloud('.content', texts);console.log(tc);</script>");
			echo "<meta name='viewport' content='width=device-width'>successfully created <a href='./en/$value.html'>$value</a>";
			}
		}
fclose($handle);
?>