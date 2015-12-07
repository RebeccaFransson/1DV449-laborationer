<?php
//http://api.sr.se/api/v2/traffic/areas?latitude=60&longitude=18
echo "<pre>";
require_once('homeController.php');
error_reporting(E_ALL);
ini_set('display_errors', 'On');

new homeController();

echo "</pre>";
