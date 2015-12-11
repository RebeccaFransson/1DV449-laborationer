<?php


class startView{
  private static $category = 'View::Category';
  private static $Send = 'View::Send';

  public function startHTML($model){
      echo '
      <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <link rel="stylesheet" type="text/css" href="style.css">
            <title>Scraper</title>
          </head>
        <body>
          <div id="wrap">
          <form method="post" >
            <input type="radio" name="' . self::$category .'" value="4" checked>Alla kategorier
            <input type="radio" name="' . self::$category .'" value="0" >Vägtrafik
            <input type="radio" name="' . self::$category .'" value="1" >Kollektivtrafik
            <input type="radio" name="' . self::$category .'" value="2" >Planerad störning
            <input type="radio" name="' . self::$category .'" value="3" >Övrigt
            <input type="submit" name="' . self::$Send .'" value="Hämta händelser" />
          </form>
            <div id="list">
              '.$model->getMessages().'
            </div>
            <div id="map">

            </div>
          </div>
          <script src="http://maps.googleapis.com/maps/api/js"></script>
          <script src="map.js"></script>
        </body>
        </html>
      ';
    }

    public function getIsSelected()
    {
      return isset($_POST[self::$Send]);
    }
    public function getSelectedData()
    {
      if($this->getIsSelected()){
        return $_POST[self::$category];
      }
      return null;
    }

}
