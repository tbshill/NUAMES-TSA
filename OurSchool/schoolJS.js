angular.module('App')
	.controller('schoolController',function($scope,$firebase,toaster){
		console.log('controller: schoolController');
			$(".flexBox").click(function(){  //Debug
    		console.log('click');
    		
    	});

			$scope.schoolEvents = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/SchoolEvents/')).$asArray();
		
})
.directive('myPreivew',function(){
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
		link: function($scope, iElem, iAttrs, controller) {
			$(iElem).click(function(){
				$('.og-box').find('div').hide();
				$('.og-box').css('height',"200px");
				$(iElem).find('div').show();
				$(iElem).css('height',"600px");
        	});
		}
	};
});  