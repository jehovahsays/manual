<?php
session_start();
gethostname();
$_SESSION['username'] = 'Developer';
$username = getenv('POST') ?: getenv('POST');
$username = getenv('USERNAME') ?: getenv('USER');
$ip = $localIp = gethostbyname(gethostname());
$handle = fopen("./sql.log", "a"); //open log use "a" to write and grow log no deletion or use "r+" writes 1 line to the log it also deletes log
foreach($_POST as $variable => $value) { 
fwrite($handle, "$username searched for" . "\n" . $value . "\r\n");
}
fwrite($handle, "C:\\$ip\r\n \r\n");
	fclose($handle);
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
        if (is_dir($dir . "/" . $entry))
        {
          $allFiles[] = "D: " . $dir . "/" . $entry;
        }
        else
        {
          $allFiles[] = "F: " . $dir . "/" . $entry;
        }
      }
    }
    closedir($handle);

    natsort($allFiles);

    foreach($allFiles as $value)
    {
      $displayName = substr($value, $rootLen + 4);
      $fileName    = substr($value, 3);
      $linkName    = str_replace(" ", "%20", substr($value, $pathLen + 3));
      if (is_dir($fileName)) {
        echo prePad($level) . $linkName . "<br>\n";
        myScanDir($fileName, $level + 1, strlen($fileName));
      } else {
        echo prePad($level) . "<a href=\"" . $linkName . "\" style=\"text-decoration:none;\">" . $displayName . "</a><br>\n";
      }
    }
  }
}

date_default_timezone_set("America/New_York");
    echo "The time is " . date("h:i:sa");
	echo "</br>";	
    echo $date = date('l, F jS Y' . "</br>");
	echo "</br></br>";

  $root = './';

  $pathLen = strlen($root);

  myScanDir($root, 0, strlen($root)); 
  ?> 

