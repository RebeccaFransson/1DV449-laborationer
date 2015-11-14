<?php
//check?day=01&movie=02
class Movies{
  private $dom;
  private $startURL;

  public function Movies($dom, $url)
  {
    $this->dom = $dom;
    $this->startURL = $url;
  }

  public function start($theGoodDays, $movieURL){
    $cinemaPage = file_get_contents($this->startURL . $movieURL);
    if($this->dom->loadHTML($cinemaPage)){
      $xPath = new DOMXPath($this->dom);
      $movieList = $xPath->query('//select[@name = "movie"]/option[@value]');
      $okMovie;
      for ($i = 1; $i = count($theGoodDays); $i++) {
        echo "<h2>".$theGoodDays[$i]."</h2>";
        foreach ($movieList as $movie) {
          //var_dump($movie->nodeValue);
          $okMovie = $this->getOkMovies($movie->getAttribute("value"), $i, $movieURL);
          if($okMovie != null){
            echo "Filmen ".$movie->nodeValue." klockan ".$okMovie." pa ".$theGoodDays[$i]."<br><br>";
          }

        }
      }

    }else{
      echo "gick inte att nå ". $this->startURL . $movieURL;
    }
  }
  private function getOkMovies($movie, $day, $movieURL){
    $question = "/check?day=0".$day."&movie=".$movie;
    var_dump($question);
    $moviesAndDays = file_get_contents($this->startURL . $movieURL . $question);
    if($this->dom->loadHTML($moviesAndDays)){
      foreach (json_decode($moviesAndDays) as $movie) {
        var_dump($movie, $question, $moviesAndDays);
        if($movie->status == 1){
          var_dump($movie->time);
          return $movie->time;
        }else{
          return null;
        }
      }
    }else{
      echo "gick inte att nå ". $this->startURL . $movieURL . $question;
    }
  }
}
