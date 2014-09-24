/**
 * Created by tobinegbert on 9/18/14.
 */
angular.module('App').controller('designBrief', ['$scope', '$interval',
    function($scope, $interval) {
        $scope.design_brief = 0;
        var stop;
        $scope.start = function() {
                if (angular.isDefined(stop)) return;

            stop = $interval(function(){
                if($scope.design_brief >= 0){
                    $scope.design_brief = $scope.design_brief + 37
                }
            }, 1000)
        };
        $scope.stopFight = function() {
            if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;
            }
        };
        $scope.resetFight = function() {
            $scope.design_brief = 0;
        };
    }
]);