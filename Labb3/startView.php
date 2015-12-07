<?php

class startView{
  public function __construct($model){
      echo '
      <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <link rel="stylesheet" type="text/css" href="style.css">
            <title>Scraper</title>
          </head>
        <body>
        '.$model->getMessages().'
        </body>
        </html>
      ';
    }

}
