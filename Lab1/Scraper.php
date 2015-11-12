<?php
require_once('PersonCalender.php');

class Scraper{
  private $url = '';
  private $dom;

  public function Scraper(){
    //en if sats om användaren har klickat på skcika
    $this->url = 'http://localhost:8080';
    $this->dom = new DOMDocument();
    $this->start();
  }

  private function start(){
    $firstPage = file_get_contents($this->url);

    if($this->dom->loadHTML($firstPage)){
      $xPath = new DOMXPath($this->dom);
      $links = $xPath->query('//a');//allt som fins i a-taggen
      $this->calenderStart($links[0]->getAttribute("href"));
    }else{
      echo "gick inte att hämta första sidan";
    }
  }

  private function calenderStart($calenderURL){
    $this->url = $this->url . $calenderURL;
    $calenderPage = file_get_contents($this->url);

    if($this->dom->loadHTML($calenderPage)){
      $xPath = new DOMXPath($this->dom);
      $links = $xPath->query('//a');
      $allPersonsAgendas = Array();

      foreach ($links as $item) {
        $personAgenda = $this->getPersonAgenda($item->getAttribute("href"));//allas agendor i en array
        array_push($allPersonsAgendas, $personAgenda);
      }
      /*echo "<pre>";
      print_r($allPersonsAgendas);
      echo"</pre>";*/
      $theGoodDay = $this->compareDays($allPersonsAgendas);

    }else{
      echo "gick inte att hämta kalender sidan";
    }
  }

  private function getPersonAgenda($urlToPersonCalender){
      $calenderPersonPage = file_get_contents($this->url .'/'. $urlToPersonCalender);
      //lägg en person i ett object(namn, dag, OK)
      if($this->dom->loadHTML($calenderPersonPage)){
        $xPath = new DOMXPath($this->dom);
        $nameList = $xPath->query('//h2');//får en lista av namn
        $personCalender = new PersonCalender($nameList[0]->nodeValue);
        $daysArray = Array();
        //$personArray = Array();

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
      //array_push($personArray, $personCalender);
      return $personCalender;
  }

  private function compareDays($allPersonsAgendas){
    //for ($i = 0; $i < count($allPersonsAgendas); $i++) {
      //$onePerson = $allPersonsAgendas[$i];
      echo "<pre>";
      print_r($allPersonsAgendas);
      echo"</pre>";
      if(
      $allPersonsAgendas[0]->getFri() == $allPersonsAgendas[1]->getFri() &&
      $allPersonsAgendas[0]->getFri() == $allPersonsAgendas[2]->getFri() &&
      $allPersonsAgendas[1]->getFri() == $allPersonsAgendas[2]->getFri()
      ){
        echo "Alla kan Fredag";
      }
      if(
      $allPersonsAgendas[0]->getSat() == $allPersonsAgendas[1]->getSat() &&
      $allPersonsAgendas[0]->getSat() == $allPersonsAgendas[2]->getSat() &&
      $allPersonsAgendas[1]->getSat() == $allPersonsAgendas[2]->getSat()
      ){
        echo "Alla kan Lör";
      }
      if(
      $allPersonsAgendas[0]->getSun() == $allPersonsAgendas[1]->getSun() &&
      $allPersonsAgendas[0]->getSun() == $allPersonsAgendas[2]->getSun() &&
      $allPersonsAgendas[1]->getSun() == $allPersonsAgendas[2]->getSun()
      ){
        echo "Alla kan Sön";
      }

  }

}
