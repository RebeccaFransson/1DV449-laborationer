"use strict";
var APIData = {

  APIDataStart: function(){
    $.ajax({
            type: 'GET',
            url: "http://api.sr.se/api/v2/traffic/messages?format=json&pagination=false",//?pagination=false
            dataType: "json",
            complete: function(data){
                var parsedData = JSON.parse(data.responseText);

                var storage = localStorage['storage'];
                storage = xml;

                if(storage){
                  console.log(storage);
                }
                //är informationen redan sparad?
                //kolla om den är för gammal
                //spara till storage
                if(data.status == 200){
                  document.getElementById("cat").addEventListener("click", function(e){
                    APIData.response(parsedData, e.target.id);
                  });
                  APIData.response(parsedData, null);
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
        Map.emptyMap();
      }else{
        markerData.sort(function(a,b){
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        for (var i = 0; i < unorganisedData.length; i++) {
          document.querySelector('#list').innerHTML += '<h3 class="message">' + unorganisedData[i].title + '</h3>';//flytta upp
        }
        Map.mapStart(unorganisedData);
      }
  }
}

window.onload = APIData.APIDataStart;
