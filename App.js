var app = angular.module('App',['ui.router','ngRoute','firebase',])
	.controller('mainController',function($rootScope, $firebase,$scope,$location){
		$rootScope.eventList = [
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
			'Webmaster',
		];
		$rootScope.debug = true;

		$scope.gotoSchool = function(){
			$location.path('/school');
			if(window.innerHeight>window.innerWidth){ //If window is portrait
				$(".nav").find("li").slideToggle("fast"); //Menu bar animation
				$(".container").slideToggle("slow"); //Container Animation
			}
		}
		$scope.gotoChapter = function(){
			$location.path('/chapter');
			if(window.innerHeight>window.innerWidth){
				$(".nav").find("li").slideToggle("fast"); //Menu bar animation
				$(".container").slideToggle("slow"); //Container Animation
			}
		}
		$scope.gotoDesign = function(){
			$location.path('/designbrief');
			if(window.innerHeight>window.innerWidth){
				$(".nav").find("li").slideToggle("fast"); //Menu bar animation
				$(".container").slideToggle("slow"); //Container Animation
			}
		}
		$scope.gotoSponsors = function(){
			$location.path('/sponsors');
			if(window.innerHeight>window.innerWidth){
				$(".nav").find("li").slideToggle("fast"); //Menu bar animation
				$(".container").slideToggle("slow"); //Container Animation
			}
		}
		$scope.gotoSignin = function(){
			$location.path('/signin');
			if(window.innerHeight>window.innerWidth){
				$(".nav").find("li").slideToggle("fast"); //Menu bar animation
				$(".container").slideToggle("slow"); //Container Animation
			}
		}
		$scope.gotoManager = function(){
			$location.path('/manager');
			if(window.innerHeight>window.innerWidth){
				$(".nav").find("li").slideToggle("fast"); //Menu bar animation
				$(".container").slideToggle("slow"); //Container Animation
			}
		}

		$("#logo").click(function(event){
			if(window.innerHeight > window.innerWidth){
				event.preventDefault();
				$(".nav").find("li").slideToggle("fast"); //Menu bar animation
				$(".container").slideToggle("slow"); //Container Animation

			}
		})
	})
	.constant('firebaseURL', 'https://nuames-tsa.firebaseio.com/')
	.constant('fbMembersUrl', 'https://nuames-tsa.firebaseio.com/Members')
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('home',{
				url:'',
				templateUrl:'Home/home.html',
			})
			.state('chapter',{
				templateUrl:'OurChapter/chapter.html',
				url:'/chapter',
				controller:'chapterController',
			})
			.state('school',{
				templateUrl:'OurSchool/school.html',
				url:'/school',
				controller:'schoolController',
			})
			.state('designbrief',{
				templateUrl:'DesignBrief/designbrief.html',
				url:'/designbrief',
			})
			.state('signin',{
				templateUrl:'Login/signin.html',
				url:'/signin',
				controller: 'signinController',
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
	});