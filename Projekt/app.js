"use strict";
  var app = require('express')();

  var http = require('http').Server(app);
  var request = require('request');
  var sendBack;

  request('https://api.spotify.com/v1/users/duvel', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      sendBack = body;
    }
  })

  app.get('/', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");

  res.send(sendBack);
  });



  http.listen(8080, function () {
    console.log('Example app listening at port 8080');
  });
