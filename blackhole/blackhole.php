<?php 
/*

Mediawiki Extension:WikiBanHammer

Author: Morgan Shatee Byers

Recreated from PHP scripts found online
Much of the credit goes to everyone below this line.

----------------------------------------------------

Title: Blackhole for Bad Bots
Description: Automatically trap and block bots that don't obey robots.txt rules
Project URL: http://perishablepress.com/blackhole-bad-bots/
Author: Jeff Starr (aka Perishable)
Version: 3.1
License: GPLv2 or later

This program is free software; you can redistribute it and/or modify it under the 
terms of the GNU General Public License as published by the Free Software Foundation; 
either version 2 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
See the GNU General Public License for more details.

Credits: The Blackhole includes customized/modified versions of these fine scripts:
 - Network Query Tool @ http://www.drunkwerks.com/docs/NetworkQueryTool/
 - Kloth.net Bot Trap @ http://www.kloth.net/internet/bottrap.php

*/

$blackhole_badbot = 0;
$blackhole_filename = realpath(getenv('DOCUMENT_ROOT')) .'/blackhole/blackhole.dat';
$blackhole_ipaddress = sanitize($_SERVER['REMOTE_ADDR']);
$blackhole_useragent = sanitize($_SERVER['HTTP_USER_AGENT']);

if (preg_match("/(adsbot-google|googlebot|mediapartners-google)/i", $blackhole_useragent)) {
	header('Location: /', true, 302);
	exit;
}

$blackhole_fp = fopen($blackhole_filename, 'r') or die('<p>Error: Data File</p>');

while ($blackhole_line = fgets($blackhole_fp)) {
	
	$blackhole_ua = explode(' ', $blackhole_line);
	
	if ($blackhole_ua[0] === $blackhole_ipaddress) {
		
		++$blackhole_badbot;
		break;
		
	}
	
}

fclose($blackhole_fp);
unset($blackhole_line);
unset($blackhole_ua);

if ($blackhole_badbot > 0) {
	
	echo '<h1>You have been banned from this domain</h1>';
	echo '<p>If you think there has been a mistake, <a href="https://127.0.0.1">contact the administrator</a> via proxy server.</p>';
	exit;
	
}

unset($blackhole_badbot);
unset($blackhole_filename);
unset($blackhole_ipaddress);

function sanitize($string) {
	$string = trim($string); 
	$string = strip_tags($string);
	$string = htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
	$string = str_replace("\n", "", $string);
	$string = trim($string); 
	return $string;
}

if (realpath(__FILE__) === realpath($_SERVER['SCRIPT_FILENAME'])) exit;
