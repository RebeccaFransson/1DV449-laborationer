"use strict";
var APIData = {

  APIDataStart: function(){
    $.ajax({
            type: 'GET',
            url: "http://api.sr.se/api/v2/traffic/messages",
            dataType: "json",
            complete: function(data){
                var parsed = JSON.parse(JSON.stringify(data));
                var xml = parsed.responseText;
                var catArray = Array();
                var allArray = Array();
                var cat;
                document.getElementById("cat").addEventListener("click", function(e){
                  cat = e.target.id;
                  APIData.response(xml, cat);
                });
                APIData.response(xml, cat);
              }
       });
  },

  response: function(data, cat){
    document.querySelector('#list').innerHTML = '';
    var markerData = Array();
    var unorganisedData = Array();
    $(data).find('message').each(function(){
      if(cat == undefined || cat == null || cat == 4){
        unorganisedData.push($(this));
      }else{
        if($(this).children('category').text() == cat){
          unorganisedData.push($(this));
        }
      }
      });

        for(var i = 0; i < unorganisedData.length; i++){
          var title = unorganisedData[i].children('title').text();
          var subCategory = unorganisedData[i].children('subcategory');
          var description = unorganisedData[i].children('description').text();
          var latitude = parseFloat(unorganisedData[i].children('latitude').text());
          var longitude = parseFloat(unorganisedData[i].children('longitude').text());
          var date = unorganisedData[i].children('createddate').text();//.slice(0, 10)

          if(!description){
            description = 'Ingen beskrivning';
          }
          var marker = {"title": title,
                      "lat": latitude,
                      "lng": longitude,
                      "description": description,
                      "subcategory": subCategory,
                      "date": date};

          markerData.push(marker);
        }

        if(unorganisedData.length == 0){
          document.querySelector('#list').innerHTML = '<div class="message"><h3>Ingen händelse inom denna kategori</div>';
          Map.emptyMap();
        }else{
          markerData.sort(function(a,b){
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
          for (var i = 0; i < markerData.length; i++) {
            document.querySelector('#list').innerHTML += '<h3 class="message">' + markerData[i].title + '</h3>';
          }
          Map.mapStart(markerData);
        }
  }

}

window.onload = APIData.APIDataStart;
