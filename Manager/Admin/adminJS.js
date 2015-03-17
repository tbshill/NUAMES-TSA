angular.module('App')
	.controller('adminController', function(UserManagment,$firebase,$scope,$rootScope, toaster){
        console.log('controller: adminController');

        $scope.UserManagment = UserManagment;
        console.log($scope.UserManagment.userslist);
	});
