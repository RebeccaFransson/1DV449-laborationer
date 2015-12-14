"use strict";
var Map = {


  mapStart: function(markers) {

              var mapOptions = {
                  //center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
                  zoom: 5,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
              };
              var map = new google.maps.Map(document.getElementById("map"), mapOptions);

              //Create and open InfoWindow.
              var infoWindow = new google.maps.InfoWindow();
              var bounds = new google.maps.LatLngBounds();

              for (var i = 0; i < markers.length; i++) {
                  var data = markers[i];
                  var myLatlng = new google.maps.LatLng(data.lat, data.lng);
                  bounds.extend(myLatlng);
                  var marker = new google.maps.Marker({
                      position: myLatlng,
                      map: map,
                      title: data.title
                  });

                  //Attach click event to the marker.
                  (function (marker, data) {
                      google.maps.event.addListener(marker, "click", function (e) {
                          //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                          infoWindow.setContent('<div class="marker"><h3>'+ data.title +'</h3>'+ data.description +' <p>'+ data.date +'</p><i>'+ data.subcategory.text() +'</i></div>');
                          infoWindow.open(map, marker);
                      });
                  })(marker, data);
                   map.fitBounds(bounds);
              }

  }
}
