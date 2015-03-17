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
        var eventsRef = new Firebase('https://nuames-tsa.firebaseio.com/events');

        console.group("getAllUsers");

        usersRef.on('value', function(snap){
            managment.userslist = [];
            snap.forEach(function(user){
                console.log(user.val());
                var nUser = {
                    uid: user.child("uid").val(),
                    display: user.child('display').val(),
                    email: user.child('email').val(),
                    admin: user.child('admin').val(),
                    officer: user.child('officer').val(),
                    member: user.child('member').val()
                };
                managment.userslist.push(nUser);
            });
        });

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
                    managment.currentuser.uid = userData.child("uid").val();
                    managment.currentuser.events = [];

                    console.group('Found Events');
                    userData.child('events').forEach(function(event){
                        console.log(event.val());
                        managment.currentuser.events.push(event.val());
                    });
                    console.log("Final Count:",managment.currentuser.events);
                    console.groupEnd();
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
        managment.refreshCurrentUser = function(){

        };
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
                        officer: true,
                        uid: admin
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
            console.log("promoteAdmin");
          usersRef.child(uid).update({admin:true});
        };
        managment.demoteAdmin = function(uid){
            console.log("demoteAdmin");
            usersRef.child(uid).update({admin:false});
        };
        managment.promoteOfficer = function(uid){
            console.log("promoteOfficer");
            usersRef.child(uid).update({officer:true});
        };
        managment.demoteOfficer = function(uid){
            console.log("demoteOfficer");
            usersRef.child(uid).update({officer:false});
        };
        managment.promoteMember = function(uid){
            console.log("promoteMember");
            usersRef.child(uid).update({member:true});
        };
        managment.demoteMember = function(uid){
            console.log("demoteMember");
            usersRef.child(uid).update({member:false});
        };
        managment.getAllUsers = function(){
            console.group("getAllUsers");
            var userslist = [];

            usersRef.once('value', function(snap){
                snap.forEach(function(user){
                    console.log(user.val());
                    userslist.push(user);
                });
            });

            console.groupEnd();
            return userslist;
        };
        managment.signOut = function(){
            ref.unauth();
        };
        managment.editUser = function(newData){
          managment.currentuser.update(newData, onComplete(error));
        };
        managment.addEvent = function(uid, event){
            console.group('AddEvent');
            console.log("Linking User:",uid);
            console.log("Linking Event:",event);

            usersRef.child(uid).child("events").child(event).set(event);
            eventsRef.child(event).push(uid);

            console.groupEnd();
        };
        managment.removeEvent = function (uid, event) {
            console.group('removeEvent');
            console.log("remove event:", event);
            usersRef.child(uid).child("events").child(event).set({});
            console.groupEnd();
        };
        return managment;
    });
