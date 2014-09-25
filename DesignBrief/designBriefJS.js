/**
 * Created by tobinegbert on 9/18/14.
 */
angular.module('App').controller('designBrief', ['$scope', '$interval',
    function($scope, $interval) {
        $scope.design_brief = 0;
        var stop;
        $scope.start = function() {
                if (angular.isDefined(stop)) return;

            var alertOn = true;

            stop = $interval(function(){

                if($scope.design_brief >= 0){
                    $scope.design_brief = $scope.design_brief + 17;

                    if (alertOn && $scope.design_brief >= 1 && $scope.design_brief <= 99) {
                        alertOn = false;
                        $(document).ready(function(){
                            $('h3').text('Stuff').css('color', 'black')
                        })
                    } alertOn = true;
                    if (alertOn && $scope.design_brief >= 100 && $scope.design_brief <= 199) {
                        $(document).ready(function () {
                            $('h3').css('color', 'white')
                        });
                    }
                        alertOn = true;
                    if(alertOn && $scope.design_brief >= 200 && $scope.design_brief <= 299){
                        $(document).ready(function(){
                            $('h3').text('We will change the background here')
                        });
                        alertOn = false;
                    }
                    alertOn = true;
                    if(alertOn && $scope.design_brief >= 300 && $scope.design_brief <= 399) {
                        $(document).ready(function(){
                            $('h3').fadeIn().css('color', 'purple')
                        })
                    }

                }
            }, 500)
        };
        $scope.stopFight = function() {
            if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;
            }
        };
        $scope.resetFight = function() {
            $scope.design_brief = 0;
            $(document).ready(function(){
                $('h3').css('color', 'black').text('Ignore Me')
            })
        };
    }
]);