"use strict";
var Map = {

  globalMap: null,
  globalMarkers: Array(),

  makeMap: function(){
    Map.globalMap = new google.maps.Map(document.getElementById("map"), {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: {lat: 61.02, lng: 14.38},
      zoom: 5});
  },

  mapStart: function(markersInfo) {
    //skapar och öppnar ett info-fönster
    for (var i = 0; i < Map.globalMarkers.length; i++) {
      console.log('tabort');
        Map.globalMarkers[i].setMap(null);
    }
    Map.globalMarkers = [];

    var infoWindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();
    //var markers = Array();

    for (var i = 0; i < markersInfo.length; i++) {
        var data = markersInfo[i];
        var myLatlng = new google.maps.LatLng(data.latitude, data.longitude);
        bounds.extend(myLatlng);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: Map.globalMap,
            title: data.title
        });
        Map.globalMarkers.push(marker);

        //klick-event till en marker
        var newDate;

        (function (marker, data) {
            google.maps.event.addListener(marker, "click", function (e) {
              newDate = new Date(parseInt(data.createddate.slice(6,20)));
              infoWindow.setContent('<div class="marker"><h3><a>'+ data.title +'</a></h3>'+ data.description +' <p>'+ newDate.getDate()+'/'+newDate.getDay()+' - '+newDate.getFullYear()+'</p><i>'+ data.subcategory +'</i></div>');
              infoWindow.open(Map.globalMap, marker);
            });
        })(marker, data);
         Map.globalMap.fitBounds(bounds);
    }

    document.getElementById("list").addEventListener("click", function(e){
      for (var i = 0; i < Map.globalMarkers.length; i++) {
        if(Map.globalMarkers[i].title == e.target.innerHTML){
          var temp = Map.globalMarkers[i];
          Map.globalMarkers[i].setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(function() {
            temp.setAnimation(null);
          }, 1450, markers[i]);
        }
      }
    });

  }
}
