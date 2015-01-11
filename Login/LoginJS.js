angular.module('App')
	.controller('signinController', function($scope, $rootScope, $firebase,$location){
		console.log('controller: signinController');

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


		//GOOGLE Login
		//See Facebook Login for more detailed explanation
		$scope.loginWithGoogle = function(){
			console.log(document.cookie);
			console.log(members.length);
			var ref = new Firebase("https://nuames-tsa.firebaseio.com");
			ref.authWithOAuthPopup("google", function(error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);
			  } else {
			    console.log("Authenticated successfully with payload:", authData);
			    console.log(authData.google.email);
			    document.cookie="uid=" + authData.google.id;
			    document.cookie="name=" + authData.google.displayName;
			    document.cookie="expires=" + authData.expires;
			    console.log(document.cookie);
			    for(i = 0; i < members.length; i++) {
			    	if(members[i].id == authData.google.id) {
			    		document.cookie="loggedin=true";
			    		document.cookie="uid=" + authData.google.id;
			    		document.cookie="name=" + authData.google.displayName;
			    		document.cookie="expires=" + authData.expires;
			    		console.log("Heya--you're all logged in!");
			    		var u = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/Members/'+members[i].$id)).$asObject(); 
		    			u.$bindTo($rootScope,"user"); //3-way data binding
		    			$location.path("/manager"); //change location
		    			$rootScope.isLoggedIn = true;
		    			return; //kill loop and function
			    	}
			    }
			    console.log("done looking.");
			  }
			}, {scope:"email"});
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

