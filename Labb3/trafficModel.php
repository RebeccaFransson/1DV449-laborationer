<?php

class trafficModel{
  private $data = 'http://api.sr.se/api/v2/traffic/messages';

  public function __construct(){
    $this->data = new SimpleXMLElement(file_get_contents($this->data));
  }

  public function getMessages(){
    $messages = '<div id="list">';
    foreach ($this->data->messages->message as $key) {
      $messages .= '<div class="message"><h1>'.$key->title.'</h1>'.$key->exactlocation.'<p>'.$key->subcategory.'</p></div>';
    }
    return $messages .'</div>';
  }

}
