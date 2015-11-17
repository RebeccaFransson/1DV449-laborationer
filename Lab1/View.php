<?php
/**
 *
 */
class View
{
  private static $Url = 'View::URL';
  private static $SendUrl = 'View::SendURL';
  private static $BookUrl = 'TimeAndDay';

  private $outcome = '';
  public function start(){
    echo '
    <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Scraper</title>
        </head>
      <body>
      <form method="post" >
        <input type="text" name="'.self::$Url.'" placeholder=" Skriv din url ">
        <input type="submit" name="' . self::$SendUrl . '" value="Scrape the shit out of it!" />
        </form>
        '.$this->outcome.'
      </body>
      </html>
    ';
  }
  //är knappen klickad på skicka med urlen som användaren skrivit in
  public function getIsURLGiven()
  {
    if(isset($_POST[self::$SendUrl])){
      return $_POST[self::$Url];
    }else {
      return null;
    }
  }
  public function userWannaBook()
  {
    if(isset($_GET[self::$BookUrl])){
      return $_GET[self::$BookUrl];
    }else {
      return null;
    }
  }
  //skriver ut alla filmen som går den bra dagen
  public function setResult($movieAndTimeArray)
  {
    if($movieAndTimeArray != null){
      $this->outcome = '<ul>';
      foreach ($movieAndTimeArray as $movieAndTimeObj) {
        $this->outcome .= '<li> Filmen '.$movieAndTimeObj->getMovie().' visas kl '.$movieAndTimeObj->getMovieTime().' på '. $movieAndTimeObj->getDay() .'        <a href="?'.self::$BookUrl.'='.$movieAndTimeObj->getMovieTime().$movieAndTimeObj->getDay().'">Leta upp bord till dennna filmen</a>';
      }
      $this->outcome .= '</ul>';
    }else{
      $this->outcome .= 'Inga filmer är tillgängliga denna dagen ';
    }

  }
  public function chooseResturant($resturant)
  {
    if ($resturant != null) {
      $this->outcome = '<ul>';
      foreach ($resturant as $time) {
        $this->outcome .= '<li>Ett bord efter filmen är tillgängligt kl '.$time.'</li>';
        }
      $this->outcome .= '</ul>';
    }else{
      $this->outcome = 'Tyvärr finns det inga bord tillgängliga efter denna film';
    }
  }
}
