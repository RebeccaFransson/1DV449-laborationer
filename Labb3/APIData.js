"use strict";
var APIData = {

  APIDataStart: function(){
    Map.makeMap();
    $.ajax({
            type: 'GET',
            url: "http://api.sr.se/api/v2/traffic/messages?format=json&pagination=false",//
            dataType: "json",
            complete: function(data){
              if(data.status == 200){
                var parsedData = JSON.parse(data.responseText);

                //har vi internet?
                if(!localStorage.getItem('storage')){//inget cashat
                  localStorage.setItem('storage', JSON.stringify({savedData: parsedData, timestamp: (new Date().getTime()+900000)}));
                }else{//finns något cashat
                  var parsedStoredTime = JSON.parse(localStorage.getItem('storage')).timestamp;

                  if(parsedStoredTime < (new Date().getTime())){
                    localStorage.setItem('storage', JSON.stringify({savedData: parsedData, timestamp: (new Date().getTime()+900000)}));
                  }
                }
                document.getElementById("cat").addEventListener("click", function(e){
                  APIData.response(JSON.parse(localStorage.getItem('storage')).savedData, e.target.id);
                });
                APIData.response(JSON.parse(localStorage.getItem('storage')).savedData, null);
              }
              }
       });
  },

  response: function(data, cat){
    document.querySelector('#list').innerHTML = '';
    var markerData = Array(), unorganisedData = Array();
    for (var i = 0; i < data.messages.length; i++) {
      if(!data.messages[i].description){
        data.messages[i].description = 'Ingen beskrivning';
      }
      if(cat == null || cat == 4){
        unorganisedData.push(data.messages[i]);
      }else{
        if(data.messages[i].category == cat){
          unorganisedData.push(data.messages[i]);
        }
      }
    }
      if(unorganisedData.length == 0){
        document.querySelector('#list').innerHTML = '<div class="message"><h3>Ingen händelse inom denna kategori</h3></div>';
      }else{
        markerData.sort(function(a,b){
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        for (var i = 0; i < unorganisedData.length; i++) {
          document.querySelector('#list').innerHTML += '<h3 class="message">' + unorganisedData[i].title + '</h3>';//flytta upp
        }
      }
      Map.mapStart(unorganisedData);
  }
}

window.onload = APIData.APIDataStart;
