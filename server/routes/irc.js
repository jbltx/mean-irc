'use strict';

// The Package is past automatically as first parameter
module.exports = function(Irc, app, auth, database) {

  var irc = require('irc');
  var http = require('http').Server(app);
  //var io = require('socket.io')(http);
  var client;
  var channel;
  var PORT = 8989;
  http.listen(PORT, function () {
    console.log('IRC socket initialized on port ' + PORT );
  });

  var Connect = function (req, res, next) {
    channel = req.body.channel;
    client = new irc.Client(req.body.hostname, req.body.login, {
        port: req.body.port,
        channels: [req.body.channel],
    });
    client.connect(function(){
      client.join(req.body.channel, function () {
        res.json({
          status: 'connected', 
          hostname: req.body.hostname,
          port: req.body.port,
          channel: req.body.port,
          nickname: req.body.login
        });
       /* io.on('connection', function (socket) {
          console.log(req.body.login + ' is now connected to ' + req.body.hostname);
          
          client.addListener('message'+channel, function (from, message) {
              socket.emit('chatMsg', from + ': ' + message);
              console.log(from, message);
          });

        });*/
      });
    });
  };

  var SendMessage = function (req, res, next) {
    if(channel) {
      client.say(channel, req.body.message);
      res.json({
        status: 'sent',
        author: '???',
        message: req.body.message
      });
    }
    else{
      res.json({
        status: 'error',
        error: 'the user didn\'t join a specific channel.'
      });
    }
  };



  app.post('/irc/client/connect', auth.requiresLogin, Connect);

  app.post('/irc/client/message',  auth.requiresLogin, SendMessage);
};