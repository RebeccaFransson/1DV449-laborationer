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
                /*$(xml).find('message').each(function(){
                  if(cat){
                    if($(this).children('category').text() == e.target.id){
                      allArray.push($(this));
                    }else if($(this)){
                      allArray.push($(this))
                    }
                  }else{
                    allArray.push($(this))
                  }
                });*/

                APIData.response(xml, cat);
              }
       });
  },

  response: function(data, cat){
    document.querySelector('#list').innerHTML = '';
    var allData = Array();

    $(data).find('message').each(function(){
      if($(this).children('category').text() == cat){
        console.log('cat vald'+cat);
      }
      //TODO: skriv ut de valda kategorierna
            var title = $(this).children('title').text();
            var subCategory = $(this).children('subcategory');
            var description = $(this).children('description').text();
            var latitude = parseInt($(this).children('latitude').text());
            var longitude = parseInt($(this).children('longitude').text());
            var date = $(this).children('createddate').text().slice(0, 10);

            if(!description){
              description = 'Ingen beskrivning';
            }
            var html = '<div class="message"><h3>' + title + '</h3>'+date+'</div>';
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
