"use strict";
var Map = {


  mapStart: function(markers) {

              var mapOptions = {
                  center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
                  zoom: 5,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
              };
              var map = new google.maps.Map(document.getElementById("map"), mapOptions);

              //Create and open InfoWindow.
              var infoWindow = new google.maps.InfoWindow();

              for (var i = 0; i < markers.length; i++) {
                  var data = markers[i];
                  var myLatlng = new google.maps.LatLng(data.lat, data.lng);
                  var marker = new google.maps.Marker({
                      position: myLatlng,
                      map: map,
                      title: data.title
                  });

                  //Attach click event to the marker.
                  (function (marker, data) {
                      google.maps.event.addListener(marker, "click", function (e) {
                          //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                          infoWindow.setContent("<div style = 'width:200px;min-height:40px'>" + data.description + "</div>");
                          infoWindow.open(map, marker);
                      });
                  })(marker, data);
              }

}
