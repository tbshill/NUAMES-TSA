/*
	TODO:
		1. Create list of members // separate controller?
		2. Publish posts
		3. Chat like feature
		4. Manage Funds
*/

angular.module('App') // links to App
	.controller('eventController',function(UserManagment,$firebase,$rootScope,$scope, $stateParams,$location, toaster){

		console.log($stateParams);
		$scope.evnt = $stateParams.event;
		var eventMembersUid = UserManagment.getEventMembers($stateParams.event);
		$scope.purchases = $firebase(new Firebase('nuames-tsa.firebaseio.com/Events/'+$scope.evnt+'/purchase')).$asArray();
		$scope.masterpurchases= $firebase(new Firebase('nuames-tsa.firebaseio.com/Purchases')).$asArray();
        $scope.eventMembers = [];

        for(member in eventMembersUid){
            new Firebase('nuames-tsa.firebaseio.com/users/'+member+'display');
        }

		$scope.purchase = function(){
			
			//create an Id
			var currentDate = new Date();
			var day = currentDate.getDate();
			var month = currentDate.getMonth() + 1;
			var year = currentDate.getFullYear();
			var time = currentDate.getTime();

			var timestmp = day+''+month+year+time;
			var id = $rootScope.eventList.indexOf($scope.evnt)+'-'+timestmp;


			$scope.newPurchase.id = id;

			console.log($scope.newPurchase);
			
			$scope.purchases.$add($scope.newPurchase);
			
			$scope.newPurchase.event = $scope.evnt;
			
			$scope.masterpurchases.$add($scope.newPurchase);
			toaster.pop('success','Purchase requested','');


			$scope.newPurchase = {}; //Reset

		};

		$scope.posts = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/Events/'+$scope.evnt+'/Posts')).$asArray();
		$scope.post = function(event){
			$scope.posts.$add({
				name: UserManagment.currentuser.display,
				data: $scope.postData
				});
			$scope.postData = "";
			};
	})
	.controller('allEventsController', function($firebase,$rootScope,$scope, $stateParams,$location){
		console.log('allEventsController');
		$scope.openPDF = function(event){
			window.location.href = "/Manager/Event/EventPDF/"+event+".pdf"; //The server needs /TSA/Manager/... - I will talk to zach to see if I can fix this -Braden
		}
	});