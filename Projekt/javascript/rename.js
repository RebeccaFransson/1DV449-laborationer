"use strict";
    var socket = io();

  window.onload = function(){

      /*xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
          }
        };
      xhttp.open("GET", "app.js", true);
      xhttp.send();*/
      socket.on('back to klient', function(msg){
        $('#result').append(msg);
      });
}
function testResults (form) {
    var name = form.InputName.value;
    socket.emit('message', name);
}
