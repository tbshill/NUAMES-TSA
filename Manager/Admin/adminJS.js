angular.module('App')
	.controller('adminController', function($firebase,$scope,$rootScope){
		$scope.newMembers = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/newUsers')).$asArray();
		$scope.members = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/Members')).$asArray();
		console.log('controller: adminController');

		$scope.createEvent = function(evnt){
			console.log('Create Event:' + evnt);
		}
		$scope.deleteEvent = function(evnt){
			console.log('Delete Event:' + evnt);
		}
		$scope.editEvent = function(evnt){
			console.log('Edit Event:' +evnt);
		}
		$scope.verifyUser = function (id) {
			//change 'member' to 'true'
			var ref = new Firebase('https://nuames-tsa.firebaseio.com/Members/');
			ref.child(id).update({member:true});

			//Remove member from newMembers
			

		}
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
		}
		
		$scope.makeAdmin = function(id){
			var ref = new Firebase('https://nuames-tsa.firebaseio.com/Members/');
			ref.child(id).update({admin:true});
		}
		
		$scope.demoteAdmin = function(id){
			//change 'admin' to 'false'
			var ref = new Firebase('https://nuames-tsa.firebaseio.com/Members/');
			ref.child(id).update({admin:false});
		}
		$scope.editUser = function(id){
			//Edit user
			console.log('editUser');
		}
		$scope.makeOfficer = function(id){
			var ref = new Firebase('https://nuames-tsa.firebaseio.com/Members/');
			ref.child(id).update({officer:true});
		}
		$scope.demoteOfficer = function(id){
			//change 'admin' to 'false'
			var ref = new Firebase('https://nuames-tsa.firebaseio.com/Members/');
			ref.child(id).update({officer:false});
		}
	}
);