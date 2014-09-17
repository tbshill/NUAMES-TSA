angular.module('App')
	.controller('signinController', function($scope, $rootScope, $firebase,$firebaseSimpleLogin,$location){
		console.log('controller: signinController');
		$rootScope.isLoggedIn = false;

		var authClient = $firebaseSimpleLogin(new Firebase("https://nuames-tsa.firebaseio.com/Members"));
		var members = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/Members')).$asArray();
		var newMembers = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/newUsers')).$asArray();
		
		var addUser = function(user){
			user.$bindTo($rootScope,'user');
			members.$add(user);
			newMembers.$add({id:user.id, name:user.displayName});
		}

		//FACEBOOK Login
		$scope.loginWithFacebook = function() {
		    authClient.$login("facebook").then(
		    	function(user) { //Successful Login
			    	$rootScope.isLoggedIn = true;
			    	for (var i = members.length - 1; i >= 0; i--) {
			    		if(members[i].id == user.id){
		    				console.log("FOUND");
		    				var u = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/Members/'+members[i].$id)).$asObject();
		    				u.$bindTo($rootScope,"user");
		    				$location.path("/manager");
		    				return;
		    			}
			    	};
			    	
			    	var newUser = {
			    		displayName:user.displayName,
			    		id:user.id,
			    		picture:user.thirdPartyUserData.picture.data.url
			    	};
			    	members.$add(newUser);
			  	}, 

			  	function(error) { //Login Failed
			    	console.error("Facebook Login: " + error);
				}	
			);
		}

		//GOOGLE Login
		$scope.loginWithGoogle = function(){
			authClient.$login('google').then(
				function(user){
			    	$rootScope.isLoggedIn = true;
			    	for (var i = members.length - 1; i >= 0; i--) {
			    		if(members[i].id == user.id){
		    				console.log("FOUND");
		    				var u = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/Members/'+members[i].$id)).$asObject();
		    				u.$bindTo($rootScope,"user");
		    				$location.path("/manager");
		    				return;
		    			}
			    	};
					var newUser = {
			    		displayName:user.displayName,
			    		id:user.id,
			    		picture:user.thirdPartyUserData.picture
			    	};
			    	members.$add(newUser);
				},
				function(error){
					console.error("Google Login:"+error)
				}
			);
		}
		
		var verifyUser = function (id) { //Needs Fixed
			for (var i = members.length - 1; i >= 0; i--) {
	    		if(members[i].id == user.id){
    				var k = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/Members/'+members[i].$id)).$asObject();
    				k.member = true;
    				k.$save();
    				break;
    			}
	    	};
		}
		var declineUser = function(user){ //Removes User from the New
			newMembers.$remove(user);
			Members.$remove(user); //Might Not Work
		}
	})