angular.module('App')
	.controller('eventManagerController', function($scope,$rootScope,$firebase,toaster){
		console.log('eventManagerController');
		$scope.clearPosts = function(event){
			console.log(event);
			var eventRef = new Firebase('https://nuames-tsa.firebaseio.com/Events/');  //Removes the event from the event section
			var e = eventRef.child(event).child('Posts').set({});
		}
	});