angular.module('specialDirectives',[])
	.directive('flipCircle',function(){
		// Runs during compile
		return {
			name: 'flipCircle',
			// priority: 1,
			// terminal: true,
			 scope: {
			 	title: '@',
			 	paragraph: '@',
			 	img:'@'
			 }, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			 restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			template: '<div class="ch-item" style="background-image:url({{img}});"><div class="ch-info-wrap"><div class="ch-info"><div class="ch-info-front" style="background-image:url({{img}});"></div><div class="ch-info-back"><h3>{{title}}</h3><p>{{paragraph}}</p></div></div></div></div>',
			//templateUrl: 'flipCircleTemplate.html',
			replace: true,
			//transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				angular.element(document).find('head').prepend("<style type='text/css'>.ch-item {width: 240px;height: 240px;border-radius: 50%; display:block; position: relative;box-shadow: 0 1px 2px rgba(0,0,0,0.1);cursor: default;}.ch-info-wrap{position: absolute;width: 200px;height: 200px;border-radius: 50%;perspective: 800px;-webkit-transition: all .4s ease-in-out;-moz-transition: all .4s ease-in-out;-ms-transition: all .4s ease-in-out;-o-transition: all .4s ease-in-out;transition: all .4s ease-in-out;top: 20px;left: 20px;background: #f9f9f9 url(../images/bg.jpg);box-shadow: 0 0 0 20px rgba(255,255,255,0.2), inset 0 0 3px rgba(115,114, 23, 0.8);}.ch-info{position: absolute;width: 200px;height: 200px;border-radius: 50%;-webkit-transition: all .4s ease-in-out;-moz-transition: all .4s ease-in-out;-ms-transition: all .4s ease-in-out;-o-transition: all .4s ease-in-out;transition: all .4s ease-in-out;-webkit-transform-style: preserve-3d;-moz-transform-style: preserve-3d;-ms-transform-style: preserve-3d;-o-transform-style: preserve-3d;transform-style: preserve-3d;}.ch-info > div {display: block;position: absolute;width: 100%;height: 100%;border-radius: 50%;background-position: center center;backface-visibility: hidden;-webkit-backface-visibility: hidden;}.ch-info .ch-info-back {-webkit-transform: rotate3d(0,1,0,180deg);-moz-transform: rotate3d(0,1,0,180deg);-ms-transform: rotate3d(0,1,0,180deg);-o-transform: rotate3d(0,1,0,180deg);transform: rotate3d(0,1,0,180deg);background: #000;}.ch-img-1 { background-image: url('/imgs/stardust.png');}.ch-img-2 { background-image: url('/imgs/img1.jpg');}.ch-info h3 {color: #fff;text-transform: uppercase;letter-spacing: 2px;font-size: 14px;margin: 0 26px;padding: 40px 0 0 0;height: 90px;font-family: 'Open Sans', Arial, sans-serif;text-shadow: 0 0 1px #fff, 0 1px 2px rgba(0,0,0,0.3);}.ch-info p {color: #fff;padding: 10px 5px;font-style: italic;margin: 0 30px;font-size: 12px;border-top: 1px solid rgba(255,255,255,0.5);}.ch-info p a {display: block;color: rgba(255,255,255,0.7);font-style: normal;font-weight: 700;text-transform: uppercase;font-size: 9px;letter-spacing: 1px;padding-top: 4px;font-family: 'Open Sans', Arial, sans-serif;}.ch-info p a:hover {color: rgba(255,242,34, 0.8);}.ch-item:hover .ch-info-wrap {box-shadow: 0 0 0 0 rgba(255,255,255,0.8), inset 0 0 3px rgba(115,114, 23, 0.8);}.ch-item:hover .ch-info {-webkit-transform: rotate3d(0,1,0,-180deg);-moz-transform: rotate3d(0,1,0,-180deg);-ms-transform: rotate3d(0,1,0,-180deg);-o-transform: rotate3d(0,1,0,-180deg);transform: rotate3d(0,1,0,-180deg);transform: rotate3d(0,1,0,-180deg);}</style>");
			}
		};
	});