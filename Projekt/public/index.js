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
      socket.on('searchAnswers', function(answer){
        console.log(answer);
        if(answer.display_name == null){
          console.log('användarnamnet ledigt');
          $('#available').append(answer);
        }else{
          console.log('användarnamnet upptaget');
          $('#occupied').append(answer.display_name.toString());
        }
      });
}
function searchResults(form) {
    var name = form.InputName.value;
    socket.emit('newSearch', name);
}
