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
        $("table").each(function() {
	        var $this = $(this);
	        var newrows = [];
	        $this.find("tr").each(function(){
	            var i = 0;
	            $(this).find("td").each(function(){
	                i++;
	                if(newrows[i] === undefined) { newrows[i] = $("<tr></tr>"); }
	                newrows[i].append($(this));
	            });
	        });
	        $this.find("tr").remove();
	        $.each(newrows, function(){
	            $this.append(this);
	        });
	    });
	})
	.directive('flipTable', function(){
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
				$('.table').each(function() {
			        var $this = $(this);
			        var newrows = [];
			        $this.find("tr").each(function(){
			            var i = 0;
			            $(this).find("td").each(function(){
			                i++;
			                if(newrows[i] === undefined) { newrows[i] = $("<tr></tr>"); }
			                newrows[i].append($(this));
			            });
			        });
			        $this.find("tr").remove();
			        $.each(newrows, function(){
			            $this.append(this);
			        });
			    });
			}
		};
	});