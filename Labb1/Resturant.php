<?php
class Resturant{
  public function start($dom, $startURL, $time, $day){
        $resturantPage = file_get_contents($startURL);
        if($dom->loadHTML($resturantPage)){
            $xPath = new DOMXPath($dom);
            $tableNodeList = $xPath->query('//input[@value]');
            $tableTimeArray = Array();
            $rightTime = $this->getTime($time);
            foreach ($tableNodeList as $time) {
              if(substr($time->getAttribute('value'), 0, 3) == substr($day, 0, 3) &&
              intval(substr($time->getAttribute('value'), -4, -2)) == $rightTime){
              array_push($tableTimeArray, substr($time->getAttribute('value'), -4, -2));
              }
            }
            return $tableTimeArray;
        }else{
          echo "gick tyvärr inte att nå sidan ".$startURL;
        }
  }
  private function getTime($time){
    $newTime = $time+2;
    $adds = -1;
    if($newTime > 23){
      while ($newTime > 23) {
        $newTime--;
        $adds++;
      }
      return $adds;
    }
    return $newTime;
  }

}
