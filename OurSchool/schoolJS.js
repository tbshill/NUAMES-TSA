angular.module('App')
	.controller('schoolController',function($scope){
		console.log('controller: schoolController');
			$(".flexBox").click(function(){  //Debug
    		console.log('click');
    	});
		$scope.events = [ //From Firebase
			{
				img: 'http://lorempixel.com/300/500/city/9', //lorempixel is like loremipsum text but for images
				title: 'This is Event 1',
				blurb: 'Look at my little blurb about this photo. Try hovering!'
			},
			{
				img: 'http://lorempixel.com/300/500/city/9',
				title: 'Test Event',
				blurb: 'this is a filler for the real events'
			},
			{
				img: 'http://lorempixel.com/300/500/city/9',
				title: 'Test Event',
				blurb: 'this is a filler for the real events'
			},
			{
				img: 'http://lorempixel.com/300/500/city/9',
				title: 'Test Event',
				blurb: 'this is a filler for the real events'
			},
			{
				img: 'http://lorempixel.com/300/500/city/9',
				title: 'Test Event',
				blurb: 'this is a filler for the real events'
			},
			{
				img: 'http://lorempixel.com/300/500/city/9',
				title: 'Test Event',
				blurb: 'this is a filler for the real events'
			},
			{
				img: 'http://lorempixel.com/300/500/city/9',
				title: 'Test Event',
				blurb: 'this is a filler for the real events'
			},
			{
				img: 'http://lorempixel.com/300/500/city/9',
				title: 'Test Event',
				blurb: 'this is a filler for the real events'
			},
		]
	})

	//This directive will be replaced with this JS: http://tympanus.net/Tutorials/ThumbnailGridExpandingPreview/
	.directive("event", function() { //Almost all jquery needs to be done inside of a directive
    	return {
	        restrict: "A",
	        link: function(scope, elem, attrs) {

	            $(elem).click(function() {
	            	if($(this).css("width") != '300px'){
	            		$(this).animate({
	            			width:'300px',
	            		},1000);
	            	}else{
	                	$(this).animate({
	                		width: window.innerWidth.toString(),
	                	},1000);
	            	}
	            });
	            $(elem).hover(function(){
	            	$(this).find(".text").fadeIn(200);
	            },function(){
	            	$(this).find(".text").fadeOut(200);
	            });
	        }
	    }
	});

