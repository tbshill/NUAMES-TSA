angular.module('App')
	.controller('managerSponsorsController', function($scope,$rootScope,$firebase, toaster){
		console.log('managerSponsorsController');
		$scope.Sponsors = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/Sponsors/')).$asArray();

		$scope.sponsorPost = function(){
			toaster.pop('success',"Posted","")
			$scope.Sponsors.$add($scope.sponsor);
			$scope.sponsor = {};
		}
	});