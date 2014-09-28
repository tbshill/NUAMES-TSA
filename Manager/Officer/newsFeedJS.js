angular.module('App')
	.controller('newsFeedController',function($scope,$firebase,toaster){
		console.log('newFeedController');

		$scope.schoolEvents = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/SchoolEvents/')).$asArray();
		$scope.schoolPost = function(){
			toaster.pop('success',"Posted","")
			$scope.schoolEvents.$add($scope.schoolEvent);
			$scope.schoolEvent = {};
		}
	})