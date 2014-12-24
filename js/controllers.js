var ratanrsur = angular.module('ratanrsur', []);

var neighbor=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];


ratanrsur.controller('tableCtrl', function ($scope) {
    //WINDOW GENERATION
    $scope.horizDivs=40;
    $scope.getNumber = function(num) {
        return new Array(num);
    }
    $scope.getWidth = function(){
        return window.innerWidth;
    };
    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        $scope.window_width = newValue;
//         console.log(newValue,oldValue);
    });
    $scope.getHeight= function(){
        return window.innerHeight;
    };
    $scope.$watch($scope.getHeight,function(newValue, oldValue) {
        $scope.window_height = newValue;
    });
    $scope.cellSide=$scope.getWidth()/$scope.horizDivs;
    $scope.vertDivs=Math.floor($scope.getHeight()/$scope.cellSide*3/4);

    window.onresize = function(){
        $scope.cellSide=$scope.getWidth()/$scope.horizDivs;
        $scope.vertDivs=Math.floor($scope.getHeight()/$scope.cellSide*3/4);
        $scope.$apply();
    };
    //LIFE
    //runs once, setting off the iterate function that updates the board
//     $scope.$watch($scope.horizDivs, function(newValue,oldValue){
//         console.log(newValue,oldValue);
        setInterval($scope.iterate,1000);
//     });

    $scope.isAlive= [[],[]];

    $scope.gridIndex=1;
    $scope.iterate=function(){
        for($scope.r=0;$scope.r<$scope.vertDivs-5;$scope.r++){
            for($scope.c=0;$scope.c<$scope.horizDivs-5;$scope.c++){
                for(n=0;n<8;n++){
//                     console.log($scope.r,$scope.c);
                    $scope.isAlive[$scope.gridIndex][$scope.r]=[];
                    $scope.isAlive[$scope.gridIndex][$scope.r][$scope.c]=true;
//                     console.log($scope.isAlive[$scope.gridIndex][$scope.r][$scope.c]);
//                     $scope.isAlive[$scope.gridIndex][$scope.r][$scope.c]=true;
//                     if(grid[gridIndex][r+neighbor[n][1]][c+neighbor[n][2]]){};
                }
            }
        };
        $scope.gridIndex=1-$scope.gridIndex;
        console.log();
        $scope.$apply;
    };

});
