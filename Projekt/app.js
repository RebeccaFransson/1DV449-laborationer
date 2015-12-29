"use strict";
  var express = require('express');
  var app = express();
  var path = require('path');
  app.use(express.static(path.join(__dirname, 'public')));
  var http = require('http').Server(app);
  var request = require('request');
  var io = require('socket.io')(http);

  var Twitter = require('twitter');

    var client = new Twitter({
      consumer_key: 'iK4ua1CRwXVjDUgxC13Q0pBnE',
      consumer_secret: 'VYAbXKA7ff13WXmzzFKrwzEWKxuQmt2MJY7EYfxbIHyCQSF73x',
      access_token_key: '332782164-5ORdPdHamsBJZ5bhbnE0Oj0VdCImqsdudbLuJdIF',
      access_token_secret: 'eRHoaGh8a3T5mOyoUMkosSIE3bv40ReGT7Ty8SkY0ViU8'
    });




  io.on('connection', function(socket){
    var available = [];
    var occupied = [];

    socket.on('newSearch', function(name){
      var params = {q: name, count: '10'};
      client.get('users/search', params, function(error, tweets, response){
        var user = null;
        if(tweets.length > 0){
          for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].screen_name);
            if(tweets[i].screen_name.toLowerCase() == name.toLowerCase()){
              console.log(tweets[i]);
              user = {from: 'Twitter', name: tweets[i].screen_name, url: tweets[i].url};
            }else{
              user = {from: 'Twitter', name: null}
            }
          }
        }else{
          user = {from: 'Twitter', name: null}
        }
        console.log('nästa'+ user.name);
        io.emit('newAnswer', user);
      });
      request('https://api.spotify.com/v1/users/'+name, function (error, response, answer) {
        if (!error && response.statusCode == 200) {
          var user = JSON.parse(answer);
          if(user.display_name == null){
            user = {from: 'Spotify', name: null};
          }else{
            user = {from: 'Spotify', name: user.display_name, url: user.external_urls.spotify};
          }
        }else{
          user = {from: 'Spotify', name: null};
        }
        io.emit('newAnswer', user);
      });
      request('https://api.tumblr.com/v2/blog/'+name+'.tumblr.com/info?api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4', function (error, response, answer) {
        var user = JSON.parse(answer);
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
