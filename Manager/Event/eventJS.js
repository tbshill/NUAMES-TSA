/*
	TODO:
		1. Create list of members // separate controller?
		2. Publish posts
		3. Chat like feature
		4. Manage Funds
*/

angular.module('App') // links to App
	.controller('eventController',function($firebase,$rootScope,$scope, $stateParams,$location, toaster){

		console.log($stateParams);
		$scope.evnt = $stateParams.event;
		$scope.eventMembers = [];
		
		var eventMembersRef = new Firebase('https://nuames-tsa.firebaseio.com/Events/'+$scope.evnt+"/members");
		var m = new Firebase('https://nuames-tsa.firebaseio.com/Members/');
		eventMembersRef.once('value',function(dataSnapshot){
				console.log(dataSnapshot.val());

				dataSnapshot.forEach(function(childSnapshot){
					var k = new Firebase('https://nuames-tsa.firebaseio.com/Members/'+childSnapshot.val()+'/displayName');
					k.once('value',function(ds){
						$scope.eventMembers.push(ds.val());
					});
				});
			});

		$scope.purchase = function(){
			console.log('purchase');
			console.log($scope.newPurchase);
		};
		$scope.posts = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/Events/'+$scope.evnt+'/Posts')).$asArray();
		$scope.post = function(event){
			$scope.posts.$add({
				name: $rootScope.user.displayName,
				data: $scope.postData
<<<<<<< HEAD

			});
			$scope.postData = "";

=======
			})
>>>>>>> FETCH_HEAD
		}
	})
	.controller('allEventsController', function($firebase,$rootScope,$scope, $stateParams,$location){
		console.log('allEventsController');
		$scope.openPDF = function(event){
			window.location.href = "/Manager/Event/EventPDF/"+event+".pdf"; //The server needs /TSA/Manager/... - I will talk to zach to see if I can fix this -Braden
		}
	});