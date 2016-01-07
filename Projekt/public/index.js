"use strict";


var start = {
  users: [],
  start: function(){
/*
    socket.on('newAnswer', function(user){
    console.log(user);
      start.users.push(user);
      if(start.users.length >= 3){//antalet apier som används
        start.users.sort(function(a,b){return a.hasname-b.hasname});
        console.log(start.users);
        start.outputResult(start.users.sort());
      }
    });
*/
  },

  inputResults: function(form){
    $.ajax({
      type: 'GET',
      data: form.InputName.value,
      url: 'http://localhost:8080/inputname',
          success: function(data) {
              console.log('success');
              data.sort(function(a,b){return a.hasname-b.hasname});
              start.outputResult(data.sort());
          }
    });
    start.users = [];
    document.querySelector("#result").querySelector("ul").innerHTML = "";
  },

  outputResult: function(outputArray){
    for (var i = 0; i < outputArray.length; i++) {
      var li = document.createElement("li");
      var h3 = document.createElement("h2");
      var p = document.createElement("p");
      if(!outputArray[i].hasname){
        h3.appendChild(document.createTextNode(outputArray[i].from));
        p.appendChild(document.createTextNode("Användarnamnet är ledigt"));
        li.appendChild(h3);
        li.appendChild(p);
        li.className = "available";
        document.querySelector("#result").querySelector("ul").appendChild(li);
      }else{
        h3.appendChild(document.createTextNode(outputArray[i].from));
        var a = document.createElement("a");
        a.setAttribute("href", outputArray[i].url);
        a.appendChild(document.createTextNode(outputArray[i].url));
        p.appendChild(a);
        li.appendChild(h3);
        li.appendChild(p);
        li.className = "occupied";
        document.querySelector("#result").querySelector("ul").appendChild(li);
      }
    }
    window.scrollBy(0, document.body.scrollHeight);
  }

};
window.onload = start.start();
