<?php
/**
 *
 */
class View
{
  private static $Url = 'View::URL';
  private static $SendUrl = 'View::SendURL';
  private $MovieAndTime = '';
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
        '.$this->MovieAndTime.'
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
  //skriver ut alla filmen som går den bra dagen
  public function setResult($movieAndTimeArray)
  {
    if($movieAndTimeArray != null){
      $this->MovieAndTime = '<ul>';
      foreach ($movieAndTimeArray as $movieAndTimeObj) {
        $this->MovieAndTime .= '<li> Filmen '.$movieAndTimeObj->getMovie().' visas kl '.$movieAndTimeObj->getMovieTime().' på '. $movieAndTimeObj->getDay();
      }
      $this->MovieAndTime .= '</ul>';
    }else{
      $this->MovieAndTime .= 'Inga filmer är tillgängliga denna dagen';
    }

  }
}
