<?php
require_once('startView.php');
require_once('trafficModel.php');

class homeController{


  public function homeController(){
    $view = new startView();

    $model = new trafficModel($view->getSelectedData());
    $view->startHTML($model);


    //är datan äldre än fem min hämta ny annars cachad
  }
}
