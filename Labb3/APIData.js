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
                APIData.response(xml);
              }
       });
  },

  response: function(data){
    var mylatlong = Array();
    $(data).find('message').each(function(){
            var message = $(this);
            var title = message.children('title');
            var subCategory = message.children('subcategory');
            var description = message.children('description');
            var latitude = message.children('latitude');
            var longitude = message.children('longitude');

            var html = '<div class="message"><h3>' + title.text() + '</h3>       <p> ' + subCategory.text() + '</p><p>' + description.text() + '</p><div>';
            //var tit = document.createElement('h3').appendChild(document.createTextNode(title.text()));
            //var cat = document.createElement('p').appendChild(document.createTextNode(subCategory.text()));
            //var des = document.createElement('p').appendChild(document.createTextNode(description.text()));
            //var div = document.createElement('div').setAttribute('class', 'message');
            //div.appendChild(title);
            document.querySelector('#list').innerHTML += html;
            var latlong = {lat: parseInt(latitude.text()), lng: parseInt(longitude.text())};
            //Map.createMarker(latlong);
            //mylatlong.push(latlong);
        });

        Map.mapStart(mylatlong);
  }

}

window.onload = APIData.APIDataStart;
