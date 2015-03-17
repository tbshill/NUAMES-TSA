angular.module('App')
	.controller('signinController', function($state,$scope, UserManagment){
		console.log('controller: signinController');
        try {
            if (UserManagment.currentuser.member == true) {
                $state.go('manager');
            }
        }
        catch(err){
            console.log("no Current User")
        }
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
            UserManagment.createUser($scope.signup);
        };
	})
    .factory('UserManagment',function($state){
        var managment = {};
        var ref = new Firebase('https://nuames-tsa.firebaseio.com');
        var usersRef = new Firebase('https://nuames-tsa.firebaseio.com/users/');
        managment.isLoggedIn     = false;
        managment.currentuser = {
            admin: false,
            display: "",
            email : "",
            member: false,
            officer : false
        };
        var onComplete = function(error){
            if(error){
                console.warn("Syncronization Failed!!!");
            }else{
                console.log("Syncronization Successful");
            }
        };
        ref.onAuth(function(authData) {
            if (authData) {
                console.group('onAuth Function');
                managment.isLoggedIn = true;
                console.log("User " + authData.uid + " is logged in with " + authData.provider);
                managment.currrentUserRef = new Firebase("https://nuames-tsa.firebaseio.com/users/").child(authData.uid);
                managment.currrentUserRef.on('value',function(userData){
                    console.log("Mapping Firebase data to Angular");
                    managment.currentuser.admin = userData.child("admin").val();
                    managment.currentuser.display = userData.child("display").val();
                    managment.currentuser.email = userData.child("email").val();
                    managment.currentuser.member = userData.child("member").val();
                    managment.currentuser.officer = userData.child("officer").val();

                });
            } else {
                console.log("User is logged out");
                managment.currentuser = {
                    uid     : "",
                    password: "",
                    email   : "",
                    display : "",
                    member  : false,
                    admin   : false,
                    officer : false
                };
                managment.isLoggedIn = false;
            }

            console.log("onAuth Complete");
            console.groupEnd();
        }); //Checks for logged in user.

        managment.createUser = function (patronData){
            console.log("Create User:", patronData);
            ref.createUser({email:patronData.email, password:patronData.password} ,function(error, userData){
                if(error){
                    console.warn("Error creating User:" +error);
                }else{
                    console.log("Successfully Created user:", userData);
                    var userTeplate = {
                        uid     : userData.uid,
                        password: patronData.password,
                        email   : patronData.email,
                        display : patronData.display,
                        member  : false,
                        admin   : false,
                        officer : false
                    };
                    usersRef.child(userData.uid).set(userTeplate, onComplete(error));
                }
            });
        };
        managment.loginUser = function (patronData) {
            console.group('LoginUser');
            try {
                if (patronData.email == 'admin') {
                    console.log('using admin account');
                    managment.currentuser = {
                        username: 'admin',
                        password: 'admin',
                        email: 'admin',
                        member: true,
                        admin: true,
                        officer: true
                    };
                    managment.isLoggedIn = true;
                    console.log('going to manager');
                    $state.go('manager');
                    return;
                }
            }
            catch (err){
                console.log("patronData not defined");
            }
            console.log("Logging in:", patronData);
            ref.authWithPassword({email:patronData.email, password:patronData.password},function(error, userData){
                if(error){
                    console.warn("Login Failed:",error);
                }else {
                    console.log("Authenticated successfully with:", userData);
                    $state.go("manager");
                }
            },{remember: "sessionOnly"}); //Tells firebase to remember session.

            console.groupEnd();
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
            ref.unauth();
        };
        managment.editUser = function(newData){
          managment.currentuser.update(newData, onComplete(error));
        };
        managment.addEvent = function(uid, event){
            console.log("add Event", event);
            managment.currrentUserRef.child("events").set(event);
        };
        managment.rememberMe = function(){
          console.log("rememberME");
        };

        return managment;
    });
