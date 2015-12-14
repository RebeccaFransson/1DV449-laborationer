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
    var allData = Array();
    $(data).find('message').each(function(){
            var message = $(this);
            var title = message.children('title').text();
            var subCategory = message.children('subcategory');
            var description = message.children('description').text();
            var latitude = parseInt(message.children('latitude').text());
            var longitude = parseInt(message.children('longitude').text());
            var date = message.children('createddate').text().slice(0, 10);
            
            if(!description){
              description = 'Ingen beskrivning';
            }
            var html = '<div class="message"><h3>' + title + '</h3></div>';
            //var tit = document.createElement('h3').appendChild(document.createTextNode(title.text()));
            //var cat = document.createElement('p').appendChild(document.createTextNode(subCategory.text()));
            //var des = document.createElement('p').appendChild(document.createTextNode(description.text()));
            //var div = document.createElement('div').setAttribute('class', 'message');
            //div.appendChild(title);
            document.querySelector('#list').innerHTML += html;
            var info = {"title": title,
                        "lat": latitude,
                        "lng": longitude,
                        "description": description,
                        "subcategory": subCategory,
                        "date": date};

            allData.push(info);
        });

        Map.mapStart(allData);
  }

}

window.onload = APIData.APIDataStart;
