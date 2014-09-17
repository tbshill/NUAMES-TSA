angular.module('App')
	.controller('eventController',function($firebase,$rootScope,$scope, $stateParams){
		console.log($stateParams);
		$scope.evnt = $stateParams.event;
		$scope.ref = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/Events/'+$scope.evnt)).$asObject();
		$scope.eventMembers = [];
		var eventMembersRef = new Firebase('https://nuames-tsa.firebaseio.com/Events/'+$scope.evnt+"/members");
		eventMembersRef.once('value',function(dataSnapshot){
				dataSnapshot.forEach( function(childSnapshot){
					var a = new Firebase('https://nuames-tsa.firebaseio.com/Members/');
					var mem = a.child(childSnapshot.val());
					$scope.eventMembers.push(mem);
					console.log($scope.eventMembers);

				});
			});

		$scope.purchase = function(){
			console.log('purchase');
			console.log($scope.newPurchase);
		}
	})