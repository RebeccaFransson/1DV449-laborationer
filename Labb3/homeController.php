<?php
require_once('startView.php');
require_once('trafficModel.php');

class homeController{
  public function homeController(){
    $model = new trafficModel();
    new startView($model);

  }
}
