angular.module('App')
	.controller('chapterController', function(parallaxHelper,$scope,$interval){
		console.log('controller: chapterController');	
		
		var topOffset = $(".nav").height() + $('subnav').height(); //this needs to be changed if we change the height of the menuBar
		var scrollSpeed = 1000;// adjusts the auto-scrolling speed

		$scope.groupPhoto = parallaxHelper.createAnimator(-0.7);
		
		//Auto Scrolling
		$("#leadershipBTN").click(function () { 
	        $('html, body').animate({
	        	scrollTop: $("#leadership").offset().top - topOffset
	        }, scrollSpeed);
    	});
    	$("#eventsBTN").click(function () {
	        $('html, body').animate({
	        	scrollTop: $("#eventScreen").offset().top - topOffset
	        }, scrollSpeed);
    	});
    	$("#administrationBTN").click(function () {
	        $('html, body').animate({
	        	scrollTop: $("#administration").offset().top - topOffset
	        }, scrollSpeed);
    	});
    	$("#timelineBTN").click(function () {
	        $('html, body').animate({
	        	scrollTop: $("#timeline").offset().top - topOffset
	        }, scrollSpeed);
    	});
    	$("#topBTN").click(function () {
	        $('html, body').animate({
	        	scrollTop: $("#top").offset().top - topOffset
	        }, scrollSpeed);
    	});

    	$(".screen").css({"min-height" : $( window ).height() - topOffset + 'px'}); //is this line nessisary?
    	$( window ).resize(function() { // resize
			$(".screen").css({"min-height" : $( window ).height() - topOffset + 'px'});
		});
	});