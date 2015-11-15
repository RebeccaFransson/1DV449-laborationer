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
  private $view;

//Har vi tagit emot en post och fått en url så körs appen igång
  public function __construct($View){
    $this->view = $View;
    if($this->view->getIsURLGiven() != null){
      $this->startURL = $this->view->getIsURLGiven();
      $this->dom = new DOMDocument();
      $movies = new Movies($this->dom, $this->startURL);
      $this->start($movies);
    }
    //$this->startURL = 'http://localhost:8080';
  }

/*Applikationen börjar med att hämta alla länkar på sidan
Dem länkarna läggs i en array, därefter hämtas url till den första länken
Med den första länken hämtar vi ut den dagen som passar alla
Med den andra länken hämtar vi ut vilka filmer som går den dagen och vilka tider
Men den informationen skickar vi det vidare till vyn osm visar allt i en lista*/
  private function start($movies){
    $firstPage = file_get_contents($this->startURL);
    if($this->dom->loadHTML($firstPage)){
      $xPath = new DOMXPath($this->dom);

      //Alla länkar på sidan
      $linksNodeList = $xPath->query('//a');
      $linksArray = Array();
      foreach ($linksNodeList as $link) {
        array_push($linksArray, $link);
      }
      //Hämtar de dagar som passar sällskapet
      $theGoodDays = $this->calenderStart($linksArray[0]->getAttribute("href"));
      //Hämtar Filmerna, tiden och dagen som går någon av dem bra dagarna
      $movieAndTimeArray = $movies->start($theGoodDays, $linksArray[1]->getAttribute("href"));
      $this->view->setResult($movieAndTimeArray);
    }else{
      echo "gick inte att hämta första sidan";
    }
  }

//Får in en url för att ta reda på vilka dagar alla i sällskapet kan
  private function calenderStart($calenderURL){
    $url = $this->startURL . $calenderURL;
    $calenderPage = file_get_contents($url);
    $theGoodDays;

    if($this->dom->loadHTML($calenderPage)){
      $xPath = new DOMXPath($this->dom);
      //Tar ut allas personliga kalendrar
      $links = $xPath->query('//a');
      $allPersonsAgendas = Array();
      foreach ($links as $item) {
        //för varje person lägg till dem i ett objekt som sedan samlas i en array
        $personAgenda = $this->getPersonAgenda($item->getAttribute("href"), $url);
        array_push($allPersonsAgendas, $personAgenda);
      }
      $theGoodDays = $this->compareDays($allPersonsAgendas);
    }else{
      echo "gick inte att hämta kalender sidan";
    }
    return $theGoodDays;
  }
//får in en personsUrl och tar reda på vilka dagar personen kan och samlar det i ett objekt(dag, OK)
  private function getPersonAgenda($urlToPersonCalender, $url){
      $calenderPersonPage = file_get_contents($url .'/'. $urlToPersonCalender);
      if($this->dom->loadHTML($calenderPersonPage)){
        $xPath = new DOMXPath($this->dom);

        $daysArray = Array();
        $daysList = $xPath->query('//tbody/tr//td');
        foreach ($daysList as $day) {
          $okDay = false;
          if(strtolower($day->nodeValue) == 'ok'){
            $okDay = true;
          }
          array_push($daysArray, $okDay);
        }
        $personCalender = new PersonCalender($daysArray);
      }else{
        echo "gick inte att hämta kalender sidan";
      }
      return $personCalender;
  }

//jämför sällskapets dagar med varandra för att få reda på vilken/vilka dag/dagar som passar bäst
//, läggs en ny dag tills då är det bara att kopiera denna koden och ändra get-day
  private function compareDays($allPersonsAgendas){
      $theGoodDay = Array(null);
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
