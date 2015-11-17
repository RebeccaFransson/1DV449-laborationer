<?php
require_once('Scraper.php');
require_once('View.php');
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 'Off');
echo "<pre>";
$view = new View();

$scraper = new Scraper($view);
$view->start();
echo "</pre>";
