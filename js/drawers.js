ratanrsur.controller('drawers', function ($scope) {
    $scope.menuItem="yo"
    $scope.drawerOpen=false;
    $scope.$watch($scope.drawerOpen, function(newValue, oldValue){
        if ($scope.drawerOpen){
            $scope.menuItem="Resume";
        }else{
            $scope.menuItem="no";
        }
    });
});
