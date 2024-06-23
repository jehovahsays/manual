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
				exit();
				} 
				
				$handle = fopen("./en/" . $value . ".html", "a");
				fwrite($handle, 
				"\n" 
				. "<!DOCTYPE html>"
				. "<html lang=\"en\">"
				. "<head>"
				. "<meta "
				. "name=\"viewport\""
				. "content=\"width=device-width\">"
				. ""
				. "<title>"
				. $value
				. "</title>"
				. ""
				. "<link "
				. "rel=\"stylesheet\" "
				. "href=\"./css/merge.css\" />"
				. "</link>"
				. ""
				. "</head>"
				. "<body>"
				. "<center>"
				. "<fieldset>"
				. "<legend>"
				. "<a"
				. "href=\"./$value.html\">"
				. $value
				. "</a>"
				. "</legend>"
				. ""
				. "<form "
				. "class=\"form-group\""
				. "action=\"../action.php\""
				. "method=\"post\">"
				. ""
				. "<input "
				. "type=\"text\""
				. "class=\"form-control\""
				. "id=\"secure-form-answer-Human\""
				. "type=\"text\""
				. "name=\"secure-form-answer\""
				. "maxlength=\"40\""
				. "autocomplete=\"true\""
				. "autocorrect=\"off\""
				. "autocapitalize=\"off\""
				. "spellcheck=\"true\""
				. "placeholder=\"what word defines this word\""
				. "required>"
				. "<noscript>"
				. "<label"
				. "for=\"secure-form-answer-Human\">"
				. "Human"
				. "</label>"
				. "</noscript>"
				. "</form>"
				. "<br>"
				. ""
				. "<a "
				. "href=\"../index.html\">"
				. "return to homepage"
				. "</a>"
				. ""
				. "<br><br>"
				. "<a href=\"../delete.php?action=delete&filename=./en/$value.html\">"
				. "delete this page"
				. "</a>"
				. ""
				. "<br><br>"
				. ""
				. "<article>"
				. "$value definitions go here"
				. "</article>"
				. ""
				. "</fieldset>"
				. "</center>"
				. "</body>"
				. "</html>"
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
			. "edges" 
			. "\"" 
			. "><button class="
			. "\"" 
			. "core"
			. "\"" 
			. ">" 
			. $value 
			. "</button>" 
			. "</a><br>"
	    	. "\r\n");
			
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

			$handle = fopen("./js/chatbot.js", "a");
			// load the data and delete the line from the array 
			$lines = file('./js/chatbot.js'); 
			$last = sizeof($lines) - 1 ; 
			unset($lines[$last]); 
			// write the new data to the file 
			file_put_contents('./js/chatbot.js', $lines); 
			foreach($_POST as $variable => $value) {
				$value = str_replace(' ', '_', $value);
				fwrite($handle, 	
				"\""
				. $value
				. "💡"
				. "\""
				. ","
				. "\n"
                . "];return responses[Math.floor(Math.random() * responses.length)];}window.onblur = function (tabs) {alert('switch tabs alert');};");
			}			
			echo "<meta name='viewport' content='width=device-width'>successfully created <a href='./en/$value.html'>$value</a>";
		}
fclose($handle);
?>