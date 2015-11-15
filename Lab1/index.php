<?php
require_once('Scraper.php');

require_once('View.php');
error_reporting(E_ALL);
ini_set('display_errors', 'On');
echo "<pre>";
$view = new View();

$scraper = new Scraper($view);
$view->start();
echo "</pre>";
