angular.module('App')
	.controller('chapterController', function($scope,$interval){
		console.log('controller: chapterController');	
		
		var topOffset = 100;

		$("#leadershipBTN").click(function () {
	        $('html, body').animate({
	        	scrollTop: $("#leadership").offset().top - topOffset
	        }, 1000);
    	});
    	$("#eventsBTN").click(function () {
	        $('html, body').animate({
	        	scrollTop: $("#eventScreen").offset().top - topOffset
	        }, 1000);
    	});
    	$("#administrationBTN").click(function () {
	        $('html, body').animate({
	        	scrollTop: $("#administration").offset().top - topOffset
	        }, 1000);
    	});
    	$("#timelineBTN").click(function () {
	        $('html, body').animate({
	        	scrollTop: $("#timeline").offset().top - topOffset
	        }, 1000);
    	});
    	$("#topBTN").click(function () {
	        $('html, body').animate({
	        	scrollTop: $("#top").offset().top - topOffset
	        }, 1000);
    	});
    	$(".screen").css({"height" : $( window ).height()-120 +'px'});
    	
    	$interval(function(){
    		$scope.teamImg = 'http://nuamestsa.com/TSA/imgs/black_linen_v2.png';
    	},5000)
	});
