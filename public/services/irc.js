'use strict';

angular.module('mean.irc').factory('Irc', ['$http',
  function($http) {
    return {
      name: 'IRC',
      sendClientMsg: function (msg) {
      	return $http.post('/irc/client/message', {message: msg});
      },
      connectToServer: function (credentials) {
      	return $http.post('/irc/client/connect', credentials);
      }
    };
  }
]);
