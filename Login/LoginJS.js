angular.module('App')
	.controller('signinController', function($scope, $rootScope, $firebase,$location){
		console.log('controller: signinController');

		var members = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/Members')).$asArray();
		var newMembers = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/newUsers')).$asArray();
		
		$scope.createUser = function(){
			
			console.log("HelloWorld");
			var ref = new Firebase("https://nuames-tsa.firebaseio.com");
			ref.createUser({
			  email    : $scope.email,
			  password : $scope.password
			}, function(error, userData) {
			  if (error) {
			    console.log("Error creating user:", error);
			  } else {
			    console.log("Successfully created user account with uid:", userData);
				ref.authWithPassword({
				  email    : $scope.email,
				  password : $scope.password
				}, function(error, authData) {
				  if (error) {
				    console.log("Login Failed!", error);
				  } else {
				    console.log("Authenticated successfully with payload:", authData);
				    newUser = {
				    	"email":authData.password.email,
				    	"uid":authData.uid,
				    	"displayName":$scope.name
				    }
				    members.$add(newUser);
				    members.$save();
				  }
				});


				members.$add(userData.uid);
				members.$save();
			  }
			});
		}
		$scope.loginUser = function(){
			var ref = new Firebase("https://nuames-tsa.firebaseio.com");
			ref.authWithPassword({
			  email    : $scope.email,
			  password : $scope.password
			}, function(error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);
			  } else {
			    console.log("Authenticated successfully with payload:", authData);
			     for(i = 0; i<members.length; i++){
			     	if(authData.uid == members[i].uid){
			     		var u = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/Members/'+members[i].$id)).$asObject(); 
		    			u.$bindTo($rootScope,"user"); //3-way data binding
		    			$location.path("/manager"); //change location
		    			$rootScope.isLoggedIn = true;
		    			return; //kill loop and function
			     	}
			     }
			  }
			});
		}
		var declineUser = function(user){ //Removes User from firebase
			Members.$remove(user);
		}
	});

