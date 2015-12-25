"use strict";
  var express = require('express');
  var app = express();
  var path = require('path');
  app.use(express.static(path.join(__dirname, 'public')));
  var http = require('http').Server(app);
  var request = require('request');
  var io = require('socket.io')(http);

  io.on('connection', function(socket){
    var available = [];
    var occupied = [];
    socket.on('newSearch', function(name){
      request('https://api.spotify.com/v1/users/'+name, function (error, response, answer) {
        if (!error && response.statusCode == 200) {
          var user = JSON.parse(answer);
          if(user.display_name == null){
            user = {from: 'Spotify', name: null}
          }else{
            user = {from: 'Spotify', name: user.display_name, url: user.external_urls.spotify};
          }
          io.emit('newAnswer', user);
        }
      });
      request('https://api.tumblr.com/v2/blog/'+name+'.tumblr.com/info?api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4', function (error, response, answer) {
        var user = JSON.parse(answer);
        console.log('hej');
        if (!error && response.statusCode == 200) {
          user = {from: 'tumblr', name: user.response.blog.name, url: user.response.blog.url};
        }else{
          user = {from: 'tumblr', name: null}
        }
        io.emit('newAnswer', user);
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
