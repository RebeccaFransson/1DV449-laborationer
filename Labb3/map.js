"use strict";
var Map = {


  mapStart: function(markers) {
    var map = new google.maps.Map(document.getElementById("map"), {mapTypeId: google.maps.MapTypeId.ROADMAP});
    //skapar och öppnar ett info-fönster
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

        //klick-event till en marker
        (function (marker, data) {
            google.maps.event.addListener(marker, "click", function (e) {
                infoWindow.setContent('<div class="marker"><h3><a>'+ data.title +'</a></h3>'+ data.description +' <p>'+ data.date +'</p><i>'+ data.subcategory.text() +'</i></div>');
                infoWindow.open(map, marker);
            });
        })(marker, data);
         map.fitBounds(bounds);
    }

    document.getElementById("list").addEventListener("click", function(e){
      for (var i = 0; i < markers.length; i++) {
        if(markers[i].title == e.target.innerHTML){
          console.log(marker.title);
        }
          markers[i].setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(function() {
            marker.setAnimation(null);
          }, 1450);
      }


    });

  },

  emptyMap: function(){
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 61.02, lng: 14.38},
      zoom: 6
    });
  }
}
