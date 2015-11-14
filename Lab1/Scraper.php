<?php
/*
echo "<pre>";
print_r();
echo"</pre>";
*/
require_once('PersonCalender.php');
require_once('Movies.php');

class Scraper{
  private $startURL = '';
  private $dom;

  public function Scraper(){
    //en if sats om användaren har klickat på skcika
    $this->startURL = 'http://localhost:8080';
    $this->dom = new DOMDocument();
    $movies = new Movies($this->dom, $this->startURL);
    $this->start($movies);
  }

  private function start($movies){
    $firstPage = file_get_contents($this->startURL);

    if($this->dom->loadHTML($firstPage)){
      $xPath = new DOMXPath($this->dom);
      $linksNodeList = $xPath->query('//a');//allt som fins i a-taggen
      $linksArray = Array();
      /*
      foreach ($linksNodeList as $link) {
        array_push($linksArray, $link);
      }
      $theGoodDays = $this->calenderStart($linksArray[0]->getAttribute("href"));
      */
      $theGoodDays = Array('Fredag');
      //$movieURL = $this->startURL . $linksArray[1]->getAttribute("href");

      $movies->start($theGoodDays, '/cinema');
    }else{
      echo "gick inte att hämta första sidan";
    }
  }

  private function calenderStart($calenderURL){
    $url = $this->startURL . $calenderURL;
    $calenderPage = file_get_contents($url);

    if($this->dom->loadHTML($calenderPage)){
      $xPath = new DOMXPath($this->dom);
      $links = $xPath->query('//a');
      $allPersonsAgendas = Array();

      foreach ($links as $item) {
        $personAgenda = $this->getPersonAgenda($item->getAttribute("href"), $url);//allas agendor i en array
        array_push($allPersonsAgendas, $personAgenda);
      }
      $theGoodDays = $this->compareDays($allPersonsAgendas);
      return $theGoodDays;
    }else{
      return null;
      echo "gick inte att hämta kalender sidan";
    }
  }

  private function getPersonAgenda($urlToPersonCalender, $url){
      $calenderPersonPage = file_get_contents($url .'/'. $urlToPersonCalender);
      //lägg en person i ett object(namn, dag, OK)
      if($this->dom->loadHTML($calenderPersonPage)){
        $xPath = new DOMXPath($this->dom);
        $nameNodeList = $xPath->query('//h2');//får en lista av namn
        $nameArray = Array();
        foreach ($nameNodeList as $name) {
          array_push($nameArray, $name);
        }
        $personCalender = new PersonCalender($nameArray[0]->nodeValue);
        $daysArray = Array();

        $daysList = $xPath->query('//tbody/tr//td');
        foreach ($daysList as $day) {
          $okDay = false;
          if(strtolower($day->nodeValue) == 'ok'){
            $okDay = true;
          }
          array_push($daysArray, $okDay);
        }
        $personCalender->setDays($daysArray);
      }else{
        echo "gick inte att hämta kalender sidan";
      }
      return $personCalender;
  }

  private function compareDays($allPersonsAgendas){
      $theGoodDay = Array();
      if(
      $allPersonsAgendas[0]->getFri() == $allPersonsAgendas[1]->getFri() &&
      $allPersonsAgendas[0]->getFri() == $allPersonsAgendas[2]->getFri() &&
      $allPersonsAgendas[1]->getFri() == $allPersonsAgendas[2]->getFri()
      ){
        array_push($theGoodDay, 'Fredag');
      }
      if(
      $allPersonsAgendas[0]->getSat() == $allPersonsAgendas[1]->getSat() &&
      $allPersonsAgendas[0]->getSat() == $allPersonsAgendas[2]->getSat() &&
      $allPersonsAgendas[1]->getSat() == $allPersonsAgendas[2]->getSat()
      ){
        array_push($theGoodDay,  'Lördag');
      }
      if(
      $allPersonsAgendas[0]->getSun() == $allPersonsAgendas[1]->getSun() &&
      $allPersonsAgendas[0]->getSun() == $allPersonsAgendas[2]->getSun() &&
      $allPersonsAgendas[1]->getSun() == $allPersonsAgendas[2]->getSun()
      ){
        array_push($theGoodDay, 'Söndag');
      }
      return $theGoodDay;
  }

}
