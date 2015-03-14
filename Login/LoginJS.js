angular.module('App')
	.controller('signinController', function($scope, UserManagment){
		console.log('controller: signinController');
        $scope.state = "login";
        $scope.loginForm = function(){
            $scope.state = "login";
        };
        $scope.signupForm = function () {
            $scope.state = "signup";
        };
        $scope.Login = function () {
            console.log("Login:", $scope.login);
            UserManagment.loginUser($scope.login);
        };
        $scope.Signup= function(){
            console.log("Sign Up:", $scope.signup);
            //$scope.state = 'signup';
            UserManagment.createUser($scope.signup);
        };
		//var members = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/Members')).$asArray();
		//var newMembers = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/newUsers')).$asArray();
        /*
		$scope.createUser = function(){
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
				    };
				    members.$add(newUser);
				    members.$save();
				  }
				});
				members.$add(userData.uid);
				members.$save();
			  }
			});
		};
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
		};


        var declineUser = function(user){ //Removes User from firebase
			Members.$remove(user);
		}
		*/
	})
    .factory('UserManagment',function($location){
        var managment = {};
        var ref = new Firebase('https://nuames-tsa.firebaseio.com');
        var usersRef = new Firebase('https://nuames-tsa.firebaseio.com/users/');
        var onComplete = function(error){
            if(error){
                console.warn("Syncronization Failed!!!");
            }else{
                console.log("Syncronization Successful");
            }
        };

        managment.isLoggedIn     = false;
        managment.currentuser    = {};
        managment.curentuser_ref = "";

        managment.createUser = function (patronData){
            console.log("Create User:" + patronData);
            ref.createUser({email:patronData.email, password:patronData.password} ,function(error, userData){
                if(error){
                    console.warn("Error creating User:" +error);
                }else{
                    console.log("Successfully Created user:", userData);
                    var userTeplate = {
                        username: patronData.username,
                        password: patronData.password,
                        email   : patronData.email,
                        display : patronData.display,
                        member  : false,
                        admin   : false
                    };
                    userRef.child(userData.uid).set(userTeplate, onComplete(error));
                }
            });
        };
        managment.loginUser = function (patronData) {
            console.log("Logging in:", patronData);
            ref.authWithPassword({email:patronData.email, password:patronData.password},function(error, userData){
                if(error){
                    console.warn("Login Failed:",error);
                }else{
                    console.log("Authenticated successfully with:", userData);
                    for(var i = 0; i<members.length; i++){
                        if(userData.uid == members[i].uid){ //This condition no longer works
                            console.log("Found user:", userData.uid);

                            managment.curentuser_ref = "https://nuames-tsa.firebseio.com/users/"+userData.uid;
                            managment.currentuser = new Firebase(managment.curentuser_ref);
                            managment.isLoggedIn = true;
                            $location.path("/manager");
                            return;
                        }
                    }
                }
            });
        };
        managment.deleteUser = function(uid){
            usersRef.remove(uid);
        };
        managment.promoteAdmin = function(uid){
          usersRef.child(uid).update({admin:true},onComplete(error));
        };
        managment.demoteAdmin = function(uid){
            usersRef.child(uid).update({admin:false},onComplete(error));
        };
        managment.promoteOfficer = function(uid){
            usersRef.child(uid).update({officer:true},onComplete(error));
        };
        managment.demoteOfficer = function(uid){
            usersRef.child(uid).update({officer:false},onComplete(error));
        };

        managment.signOut = function(){
            managment.isLoggedIn = false;
            managment.currentuser = {};
            $location.path("/");
        };
        managment.editUser = function(newData){
          managment.currentuser.update(newData, onComplete(error));
        };
        managment.addEvent = function(uid, event){
            console.log("add Event",event);

        };
        managment.rememberMe = function(){
          console.log("rememberME");
        };

        return managment;
    });
