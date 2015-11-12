<?php
class PersonCalender{
  private $name = '';
  private $friday = false;
  private $satday = false;
  private $sunday = false;

  public function PersonCalender($Name){
    $this->name = $Name;
  }
  public function setDays($dayArray){
    $this->friday = $dayArray[0];
    $this->satday = $dayArray[1];
    $this->sunday = $dayArray[2];
  }

  public function getName(){
    return $this->name;
  }
  public function getFri(){
    return $this->friday;
  }
  public function getSat(){
    return $this->satday;
  }
  public function getSun(){
    return $this->sunday;
  }
}
