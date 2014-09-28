'use strict';

var client, channel, irc;

var Connect = function (req, res, next) {
  channel = req.body.channel;
  client = new irc.Client(req.body.hostname, req.body.login, {
      port: req.body.port,
      channels: [req.body.channel],
    });
    client.connect(function(){
      client.join(req.body.channel, function () {
        res.send('ok');
      });
    });
};

var SendMessage = function (req, res, next) {
  if(channel) {
    client.say(channel, req.body.message);
    res.send('well sent.');
  }
  else{
    res.send(300);
  }
};

module.exports = function(Irc, app, auth, database) {
  app.post('/irc/client/connect', auth.requiresLogin, Connect);

  app.post('/irc/client/message',  auth.requiresLogin, SendMessage);
};
