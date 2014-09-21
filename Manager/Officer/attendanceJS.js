angular.module('App')
	.controller('attendanceController',function($scope,$rootScope,$firebase,$stateParams,$location){
		console.log('attendance Controller');
		$scope.members = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/Members')).$asArray();

		var currentDate = new Date();
		var day = currentDate.getDate();
		var month = currentDate.getMonth() + 1;
		var year = currentDate.getFullYear();

		var fullDate= month+'-'+day+'-'+year;

		$scope.markPresent = function(id){
			var ref = new Firebase('https://nuames-tsa.firebaseio.com/Attendance/'+fullDate);
			ref.child(id).update({present:true});

			var asdf = new Firebase('https://nuames-tsa.firebaseio.com/Members/'+id+'/Attendance/'+fullDate);
			asdf.update({present:true});
		};
		$scope.markAbsent = function(id){
			var ref = new Firebase('https://nuames-tsa.firebaseio.com/Attendance/'+fullDate);
			ref.child(id).update({present:false});

			var asdf = new Firebase('https://nuames-tsa.firebaseio.com/Members/'+id+'/Attendance/'+fullDate);
			asdf.update({present:false});
		};
		//var t = new Firebase('https://nuames-tsa.firebaseio.com/Members/'+$rootScope.user.$id+'/Attendance/'+fullDate+'/present');
	});