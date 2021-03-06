
angular.module('App')
	.controller('managerController',function($state,$scope,$rootScope,$firebase,$stateParams,$location, toaster, UserManagment){
        console.log('controller: managerController');
        $scope.UserManagment = UserManagment;
        $scope.signOut = function () {
            UserManagment.signOut();
            $state.go('signin');
        };

        $scope.click = function(event){
			$rootScope.Revent = $firebase(new Firebase("https://nuames-tsa.firebaseio.com/Events/"+event)).$asArray();
			console.log("https://nuames-tsa.firebaseio.com/Events/"+event);
			$location.path("/manager/event/"+event);
		};
		$scope.profile = function(){
			$location.path("/manager/profile");
		};
		$scope.admin = function(){
			$location.path("/manager/admin");
		};
		$scope.addUserToEvent = function(id, event){ //May be used by several child scopes 
            console.group('AddUsertoEvent');
			/*
			//add user to event.members
			var eventRef = new Firebase('https://nuames-tsa.firebaseio.com/Events/');
			var e = eventRef.child(event).child('members').child(id).set(id); //Adds a copy to the Events section

            var memberRef = new Firebase('https://nuames-tsa.firebaseio.com/users/'); //Adds a copy to the Member
			var t = memberRef.child(id).child('events').child(event).set(event);
            */
            console.log('User UID: ',UserManagment.currentuser.uid);
            console.log('Event:', event);
            UserManagment.addEvent(UserManagment.currentuser.uid, event);

            toaster.pop('success', "Added", "This user was Added to the event");
            console.groupEnd();
		};
		$scope.removeUserFromEvent = function(id, event){
			//remove user from event.members
            /*
			var eventRef = new Firebase('https://nuames-tsa.firebaseio.com/Events/');  //Removes the event from the event section
			var e = eventRef.child(event).child('members').child(id).set({});
            
			var memberRef = new Firebase('https://nuames-tsa.firebaseio.com/Members/'); //Removes the event from the member section
			var t = memberRef.child(id).child('events').child(event).set({});
*/
            console.group('removeUserFromEvent');
            console.log('UID:',id);
            console.log("Event:",event);
            UserManagment.removeEvent(id,event);
			toaster.pop('error', "Remove", "This user was removed from the event");
            console.groupEnd();
		};
		$scope.goToEvent = function(event){
			$location.path("/manager/event/" + event);
		}
	})
	.directive('accordian', function(){ //Allows the accordian style navbar
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			// scope: {}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			// templateUrl: '',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				$("h3").click(function(){
					$(".accordian ul").slideUp(); //Hide All
					if(!$(this).next().is(":visible")) //Open 1
					{
						$(this).next().slideDown();
					}
				});
			}
		};
	});