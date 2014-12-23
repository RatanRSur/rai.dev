var ratanrsur = angular.module('ratanrsur', []);


ratanrsur.controller('htmlCtrl', function ($scope) {
    $scope.horizDivs=100;
    $scope.getNumber = function(num) {
        return new Array(num);
    }
    $scope.getWidth = function(){
        return window.innerWidth;
    };
    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        $scope.window_width = newValue;
    });
    $scope.getHeight= function(){
        return window.innerHeight;
    };
    $scope.$watch($scope.getHeight,function(newValue, oldValue) {
        $scope.window_height = newValue;
    });
    $scope.cellSide=$scope.getWidth()/$scope.horizDivs;
    $scope.vertDivs=Math.floor($scope.getHeight()/$scope.cellSide);

    window.onresize = function(){
        $scope.cellSide=$scope.getWidth()/$scope.horizDivs;
        $scope.vertDivs=Math.floor($scope.getHeight()/$scope.cellSide);
        $scope.$apply();
    };


});
