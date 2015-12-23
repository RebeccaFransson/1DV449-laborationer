"use strict";
  var express = require('express');
  var app = express();
  var path = require('path');
  app.use(express.static(path.join(__dirname, 'public')));
  var http = require('http').Server(app);
  var request = require('request');
  var io = require('socket.io')(http);

  /*var tumblr = require('tumblr');
  var oauth = {
    consumer_key: 'avwTdMYR35LgQzXppcZ5CwDaw0kk7Tkl2dW32o2iAJDVjNeiNA',
    consumer_secret: '4ZrZHwyRB9MN6lMbPEQtUQZ0zq0pjqFysgWAc4vYfZDDnr7ITf',
    token: 'sCLnwPeYuryE4t1bjORd8KvVMUkE3EWQnKeGgm3sDeVZwKe9fM',
    token_secret: 'bn50egKvgSuUy3SdxctOETXcOoGyPbaYvxoOpzZCp8eVTfc5Pq'
  };

  var user = new tumblr.User(oauth);

  user.info(function(error, response) {
    if (error) {
      throw new Error(error);
    }

    console.log(response.user);
  });*/

    /*var T = new Twit({
    consumer_key:         'iK4ua1CRwXVjDUgxC13Q0pBnE',
    consumer_secret:      'VYAbXKA7ff13WXmzzFKrwzEWKxuQmt2MJY7EYfxbIHyCQSF73x'
})*/

  io.on('connection', function(socket){
    var answers = [];
    socket.on('newSearch', function(msg){
      console.log('message: ' + msg);
      request('https://api.spotify.com/v1/users/'+msg, function (error, response, answer) {
        if (!error && response.statusCode == 200) {
          console.log(answer);
          answers.push(JSON.parse(answer));
          //io.emit('searchAnswers', JSON.parse(answer));
        }
      });
      request('https://api.tumblr.com/v2/blog/'+msg+'.tumblr.com/info?api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4', function (error, response, answer) {
      if (!error && response.statusCode == 200) {
        console.log(answer);
        answers.push(JSON.parse(answer));
      }
    });
    io.emit('searchAnswers', answers);
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
