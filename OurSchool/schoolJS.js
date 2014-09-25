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
				title: 'Test Event 2',
				blurb: 'this is a filler for the real events'
			},
			{
				img: 'http://lorempixel.com/300/500/city/9',
				title: 'Test Event 3',
				blurb: 'this is a filler for the real events'
			},
			{
				img: 'http://lorempixel.com/300/500/city/9',
				title: 'Test Event 4',
				blurb: 'this is a filler for the real events'
			},
			{
				img: 'http://lorempixel.com/300/500/city/9',
				title: 'Test Event 5',
				blurb: 'this is a filler for the real events'
			},
			{
				img: 'http://lorempixel.com/300/500/city/9',
				title: 'Test Event 6',
				blurb: 'this is a filler for the real events'
			},
			{
				img: 'http://lorempixel.com/300/500/city/9',
				title: 'Test Event 7',
				blurb: 'this is a filler for the real events'
			},
			{
				img: 'http://lorempixel.com/300/500/city/9',
				title: 'Test Event 8',
				blurb: 'this is a filler for the real events'
			},
		];
		$('.og-box').click(function(){
			$('.og-box').css('height','200px');
			$('.og-box').find('div').hide();
			$(this).find('div').show();
			$(this).css('height','400px');
		})
});
	//This directive will be replaced with this JS: http://tympanus.net/Tutorials/ThumbnailGridExpandingPreview/

