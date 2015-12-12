"use strict";
  var app = require('express')();

  var http = require('http').Server(app);
  var io = require('socket.io')(http);


  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  });

  io.sockets.on('connection', function(socket){
    console.log('ny');
    socket.emit('startApp');
  });

  http.listen(8080, function () {
    console.log('Example app listening at port 8080');
  });
