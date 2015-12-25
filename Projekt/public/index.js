"use strict";
    var socket = io();

var start = {
  users: [],
  start: function(){
    socket.on('newAnswer', function(user){
      start.users.push(user);
      if(start.users.length >= 2){//antalet apier som används
        console.log(start.users);
        for (var i = 0; i < start.users.length; i++) {
          var li = document.createElement("li");
          var h3 = document.createElement("h3");
          var p = document.createElement("p");
          if(start.users[i].name == null){
            h3.appendChild(document.createTextNode(start.users[i].from));
            p.appendChild(document.createTextNode("Användarnamnet är ledigt"));
            li.appendChild(h3);
            li.appendChild(p);
            li.className = "available";
            document.querySelector("#result").querySelector("ul").appendChild(li);
          }else{
            h3.appendChild(document.createTextNode(start.users[i].from));
            var a = document.createElement("a");
            a.setAttribute("href", start.users[i].url);
            a.appendChild(document.createTextNode(start.users[i].url));
            p.appendChild(a);
            li.appendChild(h3);
            li.appendChild(p);
            li.className = "occupied";
            document.querySelector("#result").querySelector("ul").appendChild(li);
          }
        }

      }
    });
  },

  searchResults: function(form){
    start.users = [];
    socket.emit('newSearch', form.InputName.value);
    }

};
window.onload = start.start();
