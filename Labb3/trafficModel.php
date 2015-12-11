<?php

class trafficModel{
  private $dataUrl = 'http://api.sr.se/api/v2/traffic/messages';
  private $data;
  private $dataArray = Array();

  public function __construct($selectedData){
    $this->data = new SimpleXMLElement(file_get_contents($this->dataUrl));

    if($selectedData == null || $selectedData == 4){
      $this->dataArray = $this->data->messages->message;
    }else{
      foreach ($this->data->messages->message as $key) {
        if($key->category == $selectedData){
          array_push($this->dataArray, $key);
        }
      }
    }
  }

  public function getMessages(){
    $messages = '';
    if(count($this->dataArray) == 0){
      $messages .= 'Det saknas händelser för denna kategorin';
    }
    foreach ($this->dataArray as $key) {
      $messages .= '<div class="message"><h1>'.$key->title.'</h1>'.$key->exactlocation.'<p>'.$key->category.'</p>'.$key->description.'</div>';
    }
    return $messages;
  }

  public function getMap(){

  }

}
