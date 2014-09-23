//I dont have any thing here yet

angular.module('App')
.controller('homeController', function(){
	$('#volume').click(function(){
	   $('video')[0].muted ^= 1;
	   $(this).toggleClass('glyphicon-volume-off glyphicon-volume-up');
	});	
});
