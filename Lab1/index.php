<?php


$data = file_get_contents('http://localhost:8080/');

$dom = new DOMDocument();
if($dom->loadHTML($data)){
  $xPath = new DOMXPath($dom);
  $list = $xPath->query('//a');
  //var_dump($list);

  foreach ($list as $item) {
    echo $item->nodeValue ."  -->  ". $item->getAttribute("href") ."<br><br>";
  }
}else{
  echo "Fel av instläsning av html";
}
//var_dump($dom);
