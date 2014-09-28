'use strict';

var Module = require('meanio').Module;

var Irc = new Module('irc');

Irc.register(function(app, auth, database) {

  Irc.routes(app, auth, database);

  Irc.menus.add({
    title: 'IRC',
    link: 'irc help page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Irc.aggregateAsset('css', 'irc.css');

  return Irc;
});
