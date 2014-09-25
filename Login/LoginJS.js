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
		};

		/*
			Firebase supplies a "simple login" which allows users to login with Facebook, Twitter, Google, Github or Username and Password.
			We are only using Facebook and Google.
		*/

		//FACEBOOK Login
		$scope.loginWithFacebook = function() {
		    authClient.$login("facebook").then( // Asyncronus call

		    	function(user) { //Successful Login
			    	$rootScope.isLoggedIn = true; // changes the main menuBar from  "Sign in" to "{{Users Name}}"

			    	for (var i = members.length - 1; i >= 0; i--) { // finds the user in our firebase
			    		if(members[i].id == user.id){
		    				console.log("FOUND"); //debug
		    				var u = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/Members/'+members[i].$id)).$asObject(); 
		    				
		    				u.$bindTo($rootScope,"user"); //3-way data binding
		    				$location.path("/manager"); //change location
		    				return; //kill loop and function
		    			}
			    	}
			    	
			    	//if the user is not in the database, then then we append the new user to our members database but do not 
			    	//give them membership access.

			    	var newUser = {
			    		displayName:user.displayName,
			    		id:user.id,
			    		picture:user.thirdPartyUserData.picture.data.url
			    	}; //this object helps keep the users from Google and Facebook the same.

			    	members.$add(newUser); //Append to database
			  	}, 

			  	function(error) { //Login Failed
			    	console.error("Facebook Login: " + error);
				}	
			);
		};

		//GOOGLE Login
		//See Facebook Login for more detailed explanation
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
			    	}
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
		};

		var verifyUser = function (id) {
			for (var i = members.length - 1; i >= 0; i--) {
	    		if(members[i].id == user.id){
    				var k = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/Members/'+members[i].$id)).$asObject();
    				k.member = true;
    				k.$save();
    				break;
    			}
	    	}
		};
		var declineUser = function(user){ //Removes User from firebase
			Members.$remove(user);
		}
	});

