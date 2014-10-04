angular.module('App')
	.controller('sponsorController',function($scope, $rootScope, $firebase){
		console.log('Controller: SponsorController');
		$scope.Sponsors = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/Sponsors/')).$asArray();
	})
	.directive('sponsor',function(){
		return{
			link: function(scope, elem, attrs) {
		    	//$(elem).css
		    }
	    }
	});