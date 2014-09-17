angular.module('App')
	.controller('sponsorController',function(){
		console.log('Controller: SponsorController');
	})
	.directive('sponsor',function(){
		return{
			link: function(scope, elem, attrs) {
		    	//$(elem).css
		    }
	    }
	});