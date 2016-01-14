"use strict";
/*REQUIRES*/
  var express = require('express');
  var app = express();
  var path = require('path');
  app.use(express.static(path.join(__dirname, 'public')));
  var http = require('http').Server(app);
  var request = require('request');
  var Twitter = require('twitter');
  var Promise = require("es6-promise").Promise

    var twitterClient = new Twitter({
      consumer_key: 'iK4ua1CRwXVjDUgxC13Q0pBnE',
      consumer_secret: 'VYAbXKA7ff13WXmzzFKrwzEWKxuQmt2MJY7EYfxbIHyCQSF73x',
      access_token_key: '332782164-5ORdPdHamsBJZ5bhbnE0Oj0VdCImqsdudbLuJdIF',
      access_token_secret: 'eRHoaGh8a3T5mOyoUMkosSIE3bv40ReGT7Ty8SkY0ViU8'});

//START-SIDA
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  });

/*MOTTAGIT ETT ANVÄNDARNAMN
Kör promise på mina api-anrop så att alla anrop kommit tillbaka innan data skcikas till klienten*/
  app.get('/inputname', function(req, res){
    var name = req._parsedOriginalUrl.query;
    Promise.all([getAPI.twitter(name),
                getAPI.spotify(name),
                getAPI.tumblr(name)]).then(function(data){
                  res.send(JSON.stringify(data));
    });
  });

/*HÄMTA DATA FRÅN APIERNA*/
  var getAPI = {
    twitter: function(name){
      return new Promise(function(resolve, reject) {
        var params = {q: '@'+name, count: '1'};
        twitterClient.get('users/search', params, function(error, tweets, response){
          var user = {from: 'Twitter', hasname: false, signup: 'https://twitter.com/signup'}
          if(!error && response.statusCode == 200){
            if(tweets.length > 0){
                user = (tweets[0].screen_name.toLowerCase() == name.toLowerCase()) ? {from: 'Twitter', hasname: true, name: tweets[0].screen_name, url: 'https://twitter.com/'+tweets[0].screen_name} : user;
            }
          }else{
            user = {from: 'tTitter', hasname: true, error: true, message: 'The third-party server gave a error'};
          }
          resolve(user);
        });
      });
    },

    spotify: function(name){
      return new Promise(function(resolve, reject) {
        request('https://api.spotify.com/v1/users/'+name, function (error, response, answer) {
          if (!error && response.statusCode == 200) {
            var userInfo = JSON.parse(answer);
            var user = {from: 'Spotify', hasname: true, name: userInfo.display_name, url: userInfo.external_urls.spotify};
          }else if(response.statusCode == 404 || response.statusCode == 400){
            var user = {from: 'Spotify', hasname: false, signup: 'https://www.spotify.com/se/signup/'};
          }else{
            var user = {from: 'Spotify', hasname: true, error: true, message: 'The third-party server gave a error'};
          }
          resolve(user);
        });
      });
    },

    tumblr: function(name){
      return new Promise(function(resolve, reject) {
        request('https://api.tumblr.com/v2/blog/'+name+'.tumblr.com/info?api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4', function (error, response, answer) {
          var userInfo = JSON.parse(answer);
          if (!error && response.statusCode == 200) {
              var user = {from: 'tumblr', hasname: true, name: userInfo.response.blog.name, url: userInfo.response.blog.url};
          }else if(response.statusCode == 404){
            var user = {from: 'tumblr', hasname: false, signup: 'www.tumblr.com/register'};
          }else{
            var user = {from: 'tumblr', hasname: true, error: true, message: 'The third-party server gave a error'};
          }
          resolve(user);
        });
      });
    }
};

  http.listen(8000, function () {
    console.log('Example app listening at port 8000');
  });
