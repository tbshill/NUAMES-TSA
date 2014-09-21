var app = angular.module('App',['ui.router','ngRoute','firebase']) //Define the angular app
	.controller('mainController',function($rootScope, $firebase,$scope,$location){ //mainController is referenced in index.html
		$rootScope.eventList = [ //just a global list I declare immediately.
			'Animatronics',
			'Architectural Renovation',
			'Biotechnology Design',
			'Career Preparation',
			'Chapter Team',
			'CAD 2D',
			'CAD 3D',
			'CNC',
			'Debating Technological Issues',
			'Desktop Publishing',
			'Digital Video Production',
			'Dragster Design',
			'Engineering Design',
			'Essays on Technology',
			'Extemporaneous Speech',
			'Fashion Design',
			'Flight Endurance',
			'Future Technology Teacher',
			'Manufacturing Prototype',
			'Music Production',
			'On Demand Video',
			'Open Source Software Development',
			'Photographic Technology',
			'Prepared Presentation',
			'Promotional Graphics',
			'SciVis',
			'Structural Engineering',
			'System Control Technology',
			'Technical Sketching and Application',
			'Technology Bowl',
			'Technology Problem Solving',
			'Transportation Modeling',
			'Video Game Design',
			'Webmaster'
		]; //There may be an event or two that we need to edit. I am just waiting on Zach to get the official list of events.

		/*
			These hyper links are done through functions so I can analyse if the screen is portrait or landscape.
			If the screen is landscape nothing happens, but if the screen is portrait, then .container is hidden and the menubar is displayed
		*/

		$scope.gotoSchool = function(){
			$location.path('/school'); //redirects the user on a click.
			if(window.innerHeight>window.innerWidth){ //If window is portrait
				$(".nav").find("li").slideToggle("fast"); //Menu bar animation
				$(".container").slideToggle("slow"); //Container Animation
			}
		};
        $scope.gotoSignUp = function(){
          $location.path('/signup');
          if(window.innerHeight>window.innerWidth){
              $('.nav').find("li").slideToggle("fast");
              $('.container').slideToggle("Slow");
          }
        };


		$scope.gotoChapter = function(){
			$location.path('/chapter');
			if(window.innerHeight>window.innerWidth){
				$(".nav").find("li").slideToggle("fast"); //Menu bar animation
				$(".container").slideToggle("slow"); //Container Animation
			}
		};
		$scope.gotoDesign = function(){
			$location.path('/designbrief');
			if(window.innerHeight>window.innerWidth){
				$(".nav").find("li").slideToggle("fast"); //Menu bar animation
				$(".container").slideToggle("slow"); //Container Animation
			}
		};
		$scope.gotoSponsors = function(){
			$location.path('/sponsors');
			if(window.innerHeight>window.innerWidth){
				$(".nav").find("li").slideToggle("fast"); //Menu bar animation
				$(".container").slideToggle("slow"); //Container Animation
			}
		};
		$scope.gotoSignin = function(){
			$location.path('/signin');
			if(window.innerHeight>window.innerWidth){
				$(".nav").find("li").slideToggle("fast"); //Menu bar animation
				$(".container").slideToggle("slow"); //Container Animation
			}
		};
		$scope.gotoManager = function(){
			$location.path('/manager');
			if(window.innerHeight>window.innerWidth){
				$(".nav").find("li").slideToggle("fast"); //Menu bar animation
				$(".container").slideToggle("slow"); //Container Animation
			}
		};

		$("#logo").click(function(event){
			if(window.innerHeight > window.innerWidth){
				event.preventDefault();
				$(".nav").find("li").slideToggle("fast"); //Menu bar animation
				$(".container").slideToggle("slow"); //Container Animation

			}
		})
	})
	.constant('firebaseURL', 'https://nuames-tsa.firebaseio.com/')// I dont think I ever use this.
	.constant('fbMembersUrl', 'https://nuames-tsa.firebaseio.com/Members') // 
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('home',{
				url:'',
				templateUrl:'Home/home.html'
			})
			.state('chapter',{
				templateUrl:'OurChapter/chapter.html',
				url:'/chapter',
				controller:'chapterController'
			})
			.state('school',{
				templateUrl:'OurSchool/school.html',
				url:'/school',
				controller:'schoolController'
			})
			.state('designbrief',{
				templateUrl:'DesignBrief/designbrief.html',
				url:'/designbrief'
			})
			.state('signin',{
				templateUrl:'Login/signin.html',
				url:'/signin',
				controller: 'signinController'
			})
			.state('sponsors',{
				templateUrl:'Sponsors/sponsors.html',
				url:'/sponsors',
				controller:'sponsorController'
			})
			.state('manager',{
				templateUrl:'Manager/manager.html',
				url:'/manager',
				controller: 'managerController'
			})
			.state('manager.admin',{
				url:'/admin',
				controller:'adminController',
				templateUrl:'Manager/Admin/admin.html'
			})
			.state('manager.event',{
				url:'/event/:event',
				controller:'eventController',
				templateUrl:'Manager/Event/event.html'
			})
			.state('manager.register',{
				url:'/profile/register',
				controller:'registerController',
				templateUrl:'Manager/Profile/register.html'
			})
			.state('manager.attendance',{
				url:'/officer/attendance',
				controller:'attendanceController',
				templateUrl:'Manager/officer/attendance.html'
			})
	});