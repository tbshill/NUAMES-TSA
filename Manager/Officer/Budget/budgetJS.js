angular.module('App')
	.controller('budgetController', function($scope,$rootScope,$firebase,toaster){
		console.log('budgetController');
		$scope.purchases = $firebase(new Firebase('https://nuames-tsa.firebaseio.com/Purchases')).$asArray();
		$scope.approve = function(id){
			var ref = new Firebase('https://nuames-tsa.firebaseio.com/Purchases/');
			ref.child(id).update({approved:true});
		}
		$scope.unApprove = function(id){
			var ref = new Firebase('https://nuames-tsa.firebaseio.com/Purchases/');
			ref.child(id).update({approved:false});
		}
		$scope.deletePurchase = function(id){
			var ref = new Firebase('https://nuames-tsa.firebaseio.com/Purchases/');
			ref.child(id).set({});
		}
	})