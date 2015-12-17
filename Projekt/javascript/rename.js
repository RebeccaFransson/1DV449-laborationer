"use strict";


  window.onload = function(){
      /*xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
          }
        };
      xhttp.open("GET", "app.js", true);
      xhttp.send();*/

      $.ajax({
            type: "GET",
            url: "http://localhost:8080/",
            //data: 'hi!',
            success: function(data) {
                //show content
                console.log(data)
            },
  });
}
