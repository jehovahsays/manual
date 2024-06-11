<?php
   // user has clicked a delete hyperlink
   if($_GET['action'] && $_GET['action'] == 'delete') {
       unlink($_GET['filename']);
       header("Location: ./index.html");
       exit();
   }
?>
