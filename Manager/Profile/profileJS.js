angular.module("App")
	.controller('profileController', function($scope, $rootScope,$firebase){
		console.log('controller: profileController');
		
		$scope.editProfile = function(profile){
			console.log('New Profile: '+profile);
		}
		$scope.registerEvent = function(evnt){
			console.log('Register Event:' + evnt);
		}
		$scope.dropEvent = function(evnt){
			console.log('Drop Event:' + evnt);
		}
		$scope.editEvent = function(evnt){
			
		}
	});