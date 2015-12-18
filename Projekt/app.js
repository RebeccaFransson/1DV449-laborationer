"use strict";
  var express = require('express');
  var app = express();
  var path = require('path');
  app.use(express.static(path.join(__dirname, 'javascript')));
  var http = require('http').Server(app);
  var request = require('request');
  var io = require('socket.io')(http);

  var T = new Twit({
    consumer_key:         'iK4ua1CRwXVjDUgxC13Q0pBnE',
    consumer_secret:      'VYAbXKA7ff13WXmzzFKrwzEWKxuQmt2MJY7EYfxbIHyCQSF73x'
})

  io.on('connection', function(socket){
    socket.on('message', function(msg){
      console.log('message: ' + msg);
      request('https://api.spotify.com/v1/users/'+msg, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body);
          io.emit('back to klient', body);
        }
      });
    });
  });

  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
    /*res.setHeader("Access-Control-Allow-Origin", "*");
    req.on('data', function(data){
      console.log(data);
    })

    res.send(sendBack);*/

  });



  http.listen(8080, function () {
    console.log('Example app listening at port 8080');
  });
