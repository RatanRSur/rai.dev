var ratanrsur = angular.module('ratanrsur', []);

var adjacent=[[-1,-1],[-1,0],[-1,1]
             ,[0,-1]        ,[0,1]
             ,[1,-1],[1,0],[1,1]];
var neighbors=0;

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
        $scope.isAlive[$scope.gridIndex][$scope.r]=new Array($scope.c);
        $scope.isAlive[1-$scope.gridIndex][$scope.r]=new Array($scope.c);
        for(i=0;i<2;i++){
            for(j=0;j<$scope.vertDivs;j++){
                $scope.isAlive[i][j]=new Array($scope.horizDivs)
            }
        }
        $scope.$apply();
    };
    //LIFE
    //runs once, setting off the iterate function that updates the board
    $scope.$watch('$viewContentLoaded', function() {
        $scope.isAlive[$scope.gridIndex][$scope.r]=new Array($scope.vertDivs);
        $scope.isAlive[1-$scope.gridIndex][$scope.r]=new Array($scope.vertDivs);
        for(i=0;i<2;i++){
            for(j=0;j<$scope.vertDivs;j++){
                $scope.isAlive[i][j]=new Array($scope.horizDivs)
            }
        }
        setInterval($scope.iterate,3000);
    });

    $scope.gridIndex= 0;
    $scope.isAlive  = [[],[]]
    $scope.iterate=function(){
        for($scope.r=1;$scope.r<$scope.vertDivs-1;$scope.r++){

            for($scope.c=1;$scope.c<$scope.horizDivs-1;$scope.c++){
                neighbors=0;
                for(n=0;n<7;n++){
                    if($scope.isAlive[1-$scope.gridIndex][$scope.r+adjacent[n][1]][$scope.c+adjacent[n][2]]){
                        neighbors++;
                    }
                }
                if(neighbors<2){
                    $scope.isAlive[$scope.gridIndex][$scope.r][$scope.c]=false;
                }else if(neighbors>3){
                    $scope.isAlive[$scope.gridIndex][$scope.r][$scope.c]=false;
                }else if(neighbors==3){
                    $scope.isAlive[$scope.gridIndex][$scope.r][$scope.c]=true;
                }else if(neighbors==2){
                    $scope.isAlive[$scope.gridIndex][$scope.r][$scope.c]=true;
                };
            }
        }
        $scope.gridIndex=1-$scope.gridIndex;
        $scope.$apply();
    };

});
