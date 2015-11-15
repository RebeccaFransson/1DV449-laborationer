<?php
require_once('MovieAndTime.php');
class Movies{
  private $dom;
  private $startURL;

  public function __construct($dom, $url){
    $this->dom = $dom;
    $this->startURL = $url;
  }

/*får in dem bra dagarna och url för att kunna skrapa bio-sidan
Hämtar alla filmerna, namnen och värdet dem Har
Ger tillbaka en array med film-objekt (namn, tid, dag)
*/
  public function start($theGoodDays, $movieURL){
    $cinemaPage = file_get_contents($this->startURL . $movieURL);
    $endResult = Array();
    if($this->dom->loadHTML($cinemaPage)){
      $xPath = new DOMXPath($this->dom);
      $movieList = $xPath->query('//select[@name = "movie"]/option[@value]');
      $okMovie;
      //För varje bra-dag som finns så ta reda på vilka filmer som går den dagen och vilken tid
      for ($i = 1; $i < count($theGoodDays); $i++) {
        foreach ($movieList as $movie) {
          $okMovies = $this->getOkMovies($movie->getAttribute("value"), $i, $movieURL);
          foreach ($okMovies as $okMovie) {
            array_push($endResult, new MovieAndTime($movie->nodeValue, $okMovie, $theGoodDays[$i]));
          }
        }
      }
    }else{
      echo "gick inte att nå ". $this->startURL . $movieURL;
    }
    return $endResult;
  }

  //Hämtar ut ett json objekt som vi sedan lägger i en array som vi ger tillbaka
  private function getOkMovies($movie, $day, $movieURL){
    $question = "/check?day=0".$day."&movie=".$movie;
    $moviesAndDays = file_get_contents($this->startURL . $movieURL . $question);
    $okMovies = Array();
    if($this->dom->loadHTML($moviesAndDays)){
      foreach (json_decode($moviesAndDays) as $movie) {
        if($movie->status == 1){
          array_push($okMovies, $movie->time);
        }
      }
      return $okMovies;
    }else{
      echo "gick inte att nå ". $this->startURL . $movieURL . $question;
    }
  }
}
