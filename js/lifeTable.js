var ratanrsur = angular.module('ratanrsur', []);

var adjacent=[[-1,-1],[-1,0],[-1,1]
             ,[0,-1]        ,[0,1]
             ,[1,-1],[1,0],[1,1]];
var neighbors=0;

ratanrsur.controller('lifeTable', function ($scope) {
    //WINDOW GENERATION
    $scope.horizDivs=75;
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
    $scope.vertDivs=Math.floor($scope.getHeight()/$scope.cellSide*.6);

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
    //runs once, declaring initial arrays and
    //setting off the iterate function that updates the board
    $scope.$watch('$viewContentLoaded', function() {
        $scope.cellSide=$scope.getWidth()/$scope.horizDivs;
        $scope.vertDivs=Math.floor($scope.getHeight()/$scope.cellSide*3/4);
        $scope.gridIndex= 0;
        $scope.isAlive  = [[],[]];
        $scope.isAlive[$scope.gridIndex]=new Array($scope.vertDivs);
        $scope.isAlive[1-$scope.gridIndex]=new Array($scope.vertDivs);
        for(i=0;i<2;i++){
            for(j=0;j<$scope.vertDivs;j++){
                $scope.isAlive[i][j]=new Array($scope.horizDivs);
            }
        }
        setInterval($scope.iterate,500);
    });

    //iterate
    $scope.iterate=function(){
        for($scope.r=0;$scope.r<$scope.vertDivs;$scope.r++){

            for($scope.c=0;$scope.c<$scope.horizDivs;$scope.c++){
                if($scope.r==0 || $scope.c==0 || $scope.r == $scope.vertDivs-1 || $scope.c == $scope.horizDivs-1){
                    $scope.isAlive[$scope.gridIndex][$scope.r][$scope.c]=false;
                }else{
                    neighbors=0;
                    for(n=0;n<8;n++){
                        if($scope.isAlive[1-$scope.gridIndex][$scope.r+adjacent[n][0]][$scope.c+adjacent[n][1]]){
                            neighbors++;
                        }
                    }
                    if(neighbors<2){
                        $scope.isAlive[$scope.gridIndex][$scope.r][$scope.c]=false;
                    }else if(neighbors>3){
                        $scope.isAlive[$scope.gridIndex][$scope.r][$scope.c]=false;
                    }else if(neighbors==3){
                        $scope.isAlive[$scope.gridIndex][$scope.r][$scope.c]=true;
                    }else{
                        $scope.isAlive[$scope.gridIndex][$scope.r][$scope.c]=$scope.isAlive[1-$scope.gridIndex][$scope.r][$scope.c];
                    }
                }
            }
        }
        $scope.gridIndex=1-$scope.gridIndex;
        $scope.$apply();
    };
    //Drawer Stuff
    $scope.drawerOpen=false;
    $scope.menuItem=['Ratan Rai Sur','','']
    $scope.activeItem=[false,false,false]
    $scope.firstTime=true;
    $scope.clickIndex=-1;
//     $scope.$watchGroup('activeItem', function(newValue, oldValue) {
    $scope.$watchGroup(['activeItem[0]', 'activeItem[1]', 'activeItem[2]'], function(newValue, oldValue) {

        if($scope.firstTime){
            $scope.firstTime=false//watch gets called on page load, this voids that call
        }else{
            console.log($scope.clickIndex);
            if($scope.drawerOpen==false){
                $scope.drawerOpen=true
                $scope.menuItem[1]='Work'
                $scope.menuItem[2]='Life'
            }else{
               if($scope.activeItem[0]){
                   if(oldValue[0]){
                       $scope.menuItem[1]=''
                       $scope.menuItem[2]=''
                       for (i=0;i<3;i++){
                           $scope.activeItem[i]=false;
                       }
                   }else{
                       $scope.activeItem[1]=false;
                       $scope.activeItem[2]=false;
                   }
               }
            }
        }
//             if($scope.clickIndex==0){
//                 $scope.activeItem[0]=false;
//                 $scope.menuItem[1]='';
//                 $scope.menuItem[2]='';
//                 console.log(1);
//             }else if ($scope.clickIndex==0 && oldValue[0]==false){
//                 $scope.menuItem[1]='Work'
//                 console.log(2);
//                 $scope.menuItem[2]='Life'
//                 for(i=0;i<3;i++){
//                     $scope.activeItem[i]=false;
//                 }
//                 $scope.activeItem[$scope.clickIndex]=true;
//             }
//         }
    });
});
