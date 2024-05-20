


<meta name="viewport" content="user-scalable=yes, initial-scale=1.0, maximum-scale=1.0" />

The newest synonym is<br>
<?php
gethostname();
$ip = $localIp = gethostbyname(gethostname());
$line = '<img src="./favicon.ico" class="handle">';
$f = fopen('./index.html', 'r');
$cursor = -1;
fseek($f, $cursor, SEEK_END);
$char = fgetc($f);
//Trim trailing newline characters in the file
while ($char === "
" || $char === "\r") {
   fseek($f, $cursor--, SEEK_END);
   $char = fgetc($f);
}
//Read until the next line of the file begins or the first newline char
while ($char !== false && $char !== "
" && $char !== "\r") {
   //Prepend the new character
   $line = $char . $line;
   fseek($f, $cursor--, SEEK_END);
   $char = fgetc($f);
}
echo $line;
?>
<?php
$pathLen = 0;

function prePad($level)
{
  $ss = "";

  for ($ii = 0;  $ii < $level;  $ii++)
  {
    $ss = $ss . "|&nbsp;&nbsp;";
  }

  return $ss;
}

function myScanDir($dir, $level, $rootLen)
{
  global $pathLen;

  if ($handle = opendir($dir)) {

    $allFiles = array();

    while (false !== ($entry = readdir($handle))) {
      if ($entry != "." && $entry != "..") {
        if (is_dir($dir . "./en/" . $entry))
        {
          $allFiles[] = "D: " . $dir . "./en/" . $entry;
        }
        else
        {
          $allFiles[] = "F: " . $dir . "./en/" . $entry;
        }
      }
    }
    closedir($handle);

    natsort($allFiles);

    foreach($allFiles as $value)
    {
      $displayName = substr($value, $rootLen + 4);
      $fileName    = substr($value, 3);
      $linkName    = str_replace(" ", "", substr($value, $pathLen + 3));
      if (is_dir($fileName)) {
        echo prePad($level) . $linkName . "<br>\n";
        myScanDir($fileName, $level + 1, strlen($fileName));
      } else {
        echo prePad($level) . "<a href=\"" . $linkName . "\" style=\"text-decoration:none;\">" . $displayName . "</a><br>\n";
      }
    }
  }
}

?>
<?php

  $root = './en/';
  
   echo "<br>synonym list<br></p>";

  $pathLen = strlen($root);

  myScanDir($root, 0, strlen($root)); 
  
?>

