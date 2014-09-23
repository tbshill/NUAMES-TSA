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
		];
		$('.og-box').click(function(){
			$('.og-box').css('height',"200px");
			$(this).css('height',"auto");
			$(this).child('.preview').css('width',$( window ).width());
		});
	})

	//This directive will be replaced with this JS: http://tympanus.net/Tutorials/ThumbnailGridExpandingPreview/

