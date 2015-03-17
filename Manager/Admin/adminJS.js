angular.module('App')
	.controller('adminController', function(UserManagment,$firebase,$scope,$rootScope, toaster){
        console.log('controller: adminController');

        $scope.UserManagment = UserManagment;
        console.log($scope.UserManagment.userslist);

		$scope.verifyUser = function (id) {
			//change 'member' to 'true'
			var ref = new Firebase('https://nuames-tsa.firebaseio.com/Members/');
			ref.child(id).update({member:true});

			//Remove member from newMembers
		};
		$scope.unVerifyUser = function(id){
			//change 'admin' to 'false'
			var ref = new Firebase('https://nuames-tsa.firebaseio.com/Members/');
			ref.child(id).update({member:false});
		};
		$scope.deleteUser = function(id){
			//Delete from events
			var memberEvents = new Firebase('https://nuames-tsa.firebaseio.com/Members/'+id+'/events');
			memberEvents.once('value',function(dataSnapshot){
				dataSnapshot.forEach( function(childSnapshot){
					var eventToRemoveFrom = childSnapshot.val();

					var eventRef = new Firebase('https://nuames-tsa.firebaseio.com/Events/');
					var e = eventRef.child(eventToRemoveFrom).child('members').child(id).set({});
				});
			});

			//Delete user
			var memberRef = new Firebase('https://nuames-tsa.firebaseio.com/Members');
			memberRef.child(id).remove();
			toaster.pop('error', "Deleted User", "This user was removed from the event");
		};
		
		$scope.makeAdmin = function(id){

		};
		
		$scope.demoteAdmin = function(id){

		};
		$scope.editUser = function(id){
			//Edit user
			console.log('editUser');
		};
		$scope.makeOfficer = function(id){
			var ref = new Firebase('https://nuames-tsa.firebaseio.com/Members/');
			ref.child(id).update({officer:true});
		};
		$scope.demoteOfficer = function(id){
			//change 'admin' to 'false'
			UserManagment.demoteOfficer(id);
		};
	});
