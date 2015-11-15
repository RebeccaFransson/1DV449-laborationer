<?php
class MovieAndTime{
  private $movie = '';
  private $movieTime = '';
  private $day = '';

  public function __construct($Movie, $MovieTime, $Day){
    $this->movie = $Movie;
    $this->movieTime = $MovieTime;
    $this->day = $Day;
  }

  public function getMovie(){
    return $this->movie;
  }
  public function getMovieTime(){
    return $this->movieTime;
  }
  public function getDay(){
    return $this->day;
  }
}
