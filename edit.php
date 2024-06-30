<?php
foreach($_POST as $variable => $value) 
{	
$handle = fopen("./en/index.txt", "a");
	fwrite($handle, "$value"
	 . "\r\n");
}
echo "<body onload='loadout()'><script>function loadout(){window.location.href = './en/index.txt'}</script>";
echo "<script> var msg = new SpeechSynthesisUtterance('page edited'); window.speechSynthesis.speak(msg); </script>";		
fclose($handle);
exit();
?>
