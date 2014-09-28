'use strict';

angular.module('mean.irc').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('irc help page', {
      url: '/irc/help',
      templateUrl: 'irc/views/index.html'
    })
    .state('irc client page', {
    	url: '/irc/client',
    	templateUrl: 'irc/views/client.html'
    })
    .state('irc server page', {
    	url: 'irc/server',
    	templateUrl: 'irc/views/server.html'
    });
  }
]);
