/*
	TODO:
		1. Create list of members // separate controller?
		2. Publish posts
		3. Chat like feature
		4. Manage Funds
		5. 
*/

angular.module('App') // links to App
	.controller('eventController',function($firebase,$rootScope,$scope, $stateParams,$location){

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
	.controller('allEventsController', function($firebase,$rootScope,$scope, $stateParams,$location){
		console.log('allEventsController');
		$scope.openPDF = function(event){
			window.location.href = "/Manager/Event/EventPDF/"+event+".pdf"; //The server needs /TSA/Manager/... - I will talk to zach to see if I can fix this -Braden
		}
	});