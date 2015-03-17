var app = angular.module('App',['ui.router','ngRoute','firebase','duParallax','toaster','specialDirectives']) //Define the angular app
	.controller('mainController',function($scope, $rootScope, UserManagment){ //mainController is referenced in index.html

        $scope.UserManagment = UserManagment;

        $rootScope.eventList = [ //just a global list I declare immediately.
			'Animatronics',
			'Architectural Renovation',
			'Biotechnology Design',
			'Career Preparation',
			'Chapter Team',
			'Children Story',
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
			'VEX Robotics',
			'Webmaster'
		]; //There may be an event or two that we need to edit. I am just waiting on Zach to get the official list of events.

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
				controller:'homeController',
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
            .state('chat',{
                templateUrl:'Chat/chat.html',
                url:'/chat'
            })

			//Admin
			.state('manager.admin',{
				url:'/admin',
				controller:'adminController',
				templateUrl:'Manager/Admin/admin.html'
			})
			.state('manager.eventsManager',{
				url:'/admin/events',
				controller:'eventManagerController',
				templateUrl:'Manager/Admin/events.html'
			})

			//Event
			.state('manager.allEvents',{
				url:'/event/all',
				controller:'allEventsController',
				templateUrl:'Manager/Event/allEvents.html'
			})
			.state('manager.event',{
				url:'/event/:event',
				controller:'eventController',
				templateUrl:'Manager/Event/event.html'
			})

			//Profile
			.state('manager.register',{
				url:'/profile/register',
				controller:'registerController',
				templateUrl:'Manager/Profile/register.html'
			})
            .state('manager.contact',{
                url:'/profile/contact',
                controller:'contactController',
                templateUrl:'Manager/Profile/contact.html'
            })
			.state('manager.messages',{
				url:'/profile/messages',
				controller:'messagingController',
				templateUrl:'Manager/Profile/messaging.html'
			})

			//Officer
			.state('manager.attendance',{
				url:'/officer/attendance',
				controller:'attendanceController',
				templateUrl:'Manager/officer/attendance.html'
			})
			.state('manager.sponsors',{
				url:'/officer/sponsors',
				controller:'managerSponsorsController',
				templateUrl:'Manager/officer/Sponsors/sponsors.html'
			})
			.state('manager.budget',{
				url:'/officer/budget',
				controller:'budgetController',
				templateUrl:'Manager/Officer/Budget/budget.html'
			})
			.state('manager.newsFeed',{
				url:'/officer/news',
				controller:'newsFeedController',
				templateUrl:'Manager/officer/newsFeed.html'
			});
	})
	.filter('reverse', function() {
		return function(items) {
			return items.slice().reverse();
		};
	});