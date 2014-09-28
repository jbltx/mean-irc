'use strict';

angular.module('mean.irc')
.controller('IrcController', ['$scope', 'Global', 'Irc',
  function ($scope, Global, Irc) {
    $scope.global = Global;
    $scope.package = {
      name: 'IRC'
    };
  }
])
.controller('IrcClientController', ['$scope', 'Global', 'Irc', 
	function ($scope, Global, Irc) {
		$scope.global = Global;
		$scope.custom = true;
		$scope.info = '';

		if($scope.info === '') {
			angular.element('#informations').hide();
		}
		else {
			angular.element('#informations').show();
		}
		$scope.toggleCustom = function () {
			$scope.custom = $scope.custom === false ? true: false;
		};

		$scope.sendMessage = function () {
			if($scope.message !== undefined) {
				var sendService = Irc.sendClientMsg($scope.message);
				sendService.success(function (data) {
					angular.element('#chat').append(data+'\n');
					angular.element('#message').val('');				
				});
				sendService.error(function (status, error) {
					console.log(status + ' / ' + error);
				});
			}
		};

		$scope.connect = function () {
			if ($scope.hostname !== undefined && $scope.port !== undefined && $scope.channel !== undefined && $scope.login !== undefined) {
				var credentials = {};
				credentials.hostname = $scope.hostname;
				credentials.port = $scope.port;
				credentials.channel = $scope.channel;
				credentials.login = $scope.login;
				//var addon = $scope.addon;
				var connectionService = Irc.connectToServer(credentials);
				connectionService.success(function (data) {
					console.log(data);
				});
				connectionService.error(function (status, error) {
					console.log(status + ' / ' + error);
				});
			}else {
				console.log('please fill all fields.');
			}
		};
}]);