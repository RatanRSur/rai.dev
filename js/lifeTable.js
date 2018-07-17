var ratanrsur = angular.module('ratanrsur', []);

var adjacent = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
];
var neighbors = 0;

ratanrsur.controller('lifeTable', function($scope) {
    //WINDOW GENERATION
    $scope.horizDivs = 60;
    $scope.getNumber = function(num) {
        return new Array(num);
    }
    $scope.getWidth = function() {
        return window.innerWidth;
    };
    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        $scope.window_width = newValue;
    });
    $scope.getHeight = function() {
        return window.innerHeight;
    };
    $scope.$watch($scope.getHeight, function(newValue, oldValue) {
        $scope.window_height = newValue;
    });
    $scope.cellSide = $scope.getWidth() / $scope.horizDivs;
    $scope.vertDivs = Math.floor($scope.getHeight() / $scope.cellSide * .6);

    window.onresize = function() {
        $scope.cellSide = $scope.getWidth() / $scope.horizDivs;
        $scope.vertDivs = Math.floor($scope.getHeight() / $scope.cellSide * 3 / 4);
        $scope.isAlive[$scope.gridIndex][$scope.r] = new Array($scope.c);
        $scope.isAlive[1 - $scope.gridIndex][$scope.r] = new Array($scope.c);
        for (i = 0; i < 2; i++) {
            for (j = 0; j < $scope.vertDivs; j++) {
                $scope.isAlive[i][j] = new Array($scope.horizDivs)
            }
        }
        $scope.$apply();
    };

    //LIFE
    //runs once, declaring initial arrays and
    //setting off the iterate function that updates the board
    $scope.$watch('$viewContentLoaded', function() {
        $scope.cellSide = $scope.getWidth() / $scope.horizDivs;
        $scope.vertDivs = Math.floor($scope.getHeight() / $scope.cellSide * 3 / 4);
        $scope.gridIndex = 0;
        $scope.isAlive = [
            [],
            []
        ];
        $scope.isAlive[$scope.gridIndex] = new Array($scope.vertDivs);
        $scope.isAlive[1 - $scope.gridIndex] = new Array($scope.vertDivs);
        for (i = 0; i < 2; i++) {
            for (j = 0; j < $scope.vertDivs; j++) {
                $scope.isAlive[i][j] = new Array($scope.horizDivs);
            }
        }
        setInterval($scope.iterate, 400);
    });

    //function to check if any neighbor conditions are met
    var neighborCond = function(nNeighbors, array) {
        for (i = 0; i < array.length; i++) {
            if (nNeighbors == array[i]) {
                return true;
            }
        }
        return false;
    }

    var notValid = function() {
        var totalBoxes = 0;
        for (i = 0; i < 3; i++) {
            totalBoxes += $scope.numBoxes[i]
        }
        if (totalBoxes == 9) {
            return false;
        } else {
            return true;
        }
    }

    //wrap index from one side to the other
    var wrap = function(index, arrayLen) {
        if (index < 0) {
            return index + arrayLen;
        } else if (index >= arrayLen) {
            return index - arrayLen
        } else {
            return index;
        }
    }

    //iterate
    $scope.iterate = function() {
        for ($scope.r = 0; $scope.r < $scope.vertDivs; $scope.r++) {
            for ($scope.c = 0; $scope.c < $scope.horizDivs; $scope.c++) {
                neighbors = 0;
                for (n = 0; n < 8; n++) {
                    if ($scope.isAlive[1 - $scope.gridIndex][wrap($scope.r + adjacent[n][0], $scope.vertDivs)][wrap($scope.c + adjacent[n][1], $scope.horizDivs)]) {
                        neighbors++;
                    }
                }
                if (notValid()) {
                    //Everything Freezes
                    $scope.isAlive[$scope.gridIndex][$scope.r][$scope.c] = $scope.isAlive[1 - $scope.gridIndex][$scope.r][$scope.c];
                } else if (neighborCond(neighbors, $scope.boxNums[0])) {
                    //Born
                    $scope.isAlive[$scope.gridIndex][$scope.r][$scope.c] = true;
                } else if (neighborCond(neighbors, $scope.boxNums[1])) {
                    //Dies
                    $scope.isAlive[$scope.gridIndex][$scope.r][$scope.c] = false;
                } else if (neighborCond(neighbors, $scope.boxNums[2])) {
                    //Persists
                    $scope.isAlive[$scope.gridIndex][$scope.r][$scope.c] = $scope.isAlive[1 - $scope.gridIndex][$scope.r][$scope.c];
                }
            }
        }
        $scope.gridIndex = 1 - $scope.gridIndex;
        $scope.$apply();
    };
    //Drawer Stuff
    $scope.drawerOpen = true;
    $scope.menuItem = ['Ratan Rai Sur', 'Work', 'Life']
    $scope.activeItem = [false, false, false]
    $scope.firstTime = true;
    $scope.clickIndex = -1;
    $scope.getClick = function() {
        return $scope.clickIndex;
    }

    $scope.$watch('getClick()', function(newValue, oldValue) {
        //         console.log(newValue,oldValue);
        if ($scope.clickIndex == 0) {

            $scope.activeItem[1] = false;
            $scope.activeItem[2] = false;
            if ($scope.drawerOpen) {
                if (oldValue == 1 || oldValue == 2) {
                    $scope.clickIndex = -1;
                } else {
                    $scope.drawerOpen = false;
                    $scope.menuItem[1] = ''
                    $scope.menuItem[2] = ''
                    $scope.activeItem[0] = false;
                    $scope.clickIndex = -1;
                }
            } else {
                $scope.menuItem[1] = 'Work'
                $scope.menuItem[2] = 'Life'
                $scope.drawerOpen = true;
                $scope.clickIndex = -1;
            }
        }
        if ($scope.clickIndex == 1) {
            $scope.activeItem[0] = false;
            $scope.activeItem[2] = false;
        }
        if ($scope.clickIndex == 2) {
            $scope.activeItem[0] = false;
            $scope.activeItem[1] = false;
        }
    }, true);

    //Life parameter stuff
    $scope.paramText = ['Born with: ', 'Dies with: ', 'Persists with: '];
    $scope.numBoxes = [1,
        7,
        1
    ];
    $scope.boxNums = [
        [3],
        [0, 1, 4, 5, 6, 7, 8],
        [2]
    ]
    $scope.checkedBox = [
        [true],
        [true, true, true, true, true, true, true],
        [true]
    ]

    $scope.numFalse = function(array) {
        var falses = 0
        for (i = 0; i < array.length; i++) {
            for (j = 0; j < array[i].length; j++) {
                if (array[i][j] == false) {
                    falses++
                }
            }
        }
        return falses;
    }

    $scope.newBoolIndex = function(newArray, oldArray) {
        for (i = 0; i < newArray.length; i++) {
            for (j = 0; j < newArray[i].length; j++) {
                if (newArray[i][j] != oldArray[i][j]) {
                    return [i, j]
                }
            }
        }
    }


    Array.prototype.insert = function(index, item) {
        this.splice(index, 0, item);
    };

    Array.prototype.remove = function(from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };

    $scope.$watch('checkedBox', function(newValue, oldValue) {
        if ($scope.numFalse(newValue) - 1 == $scope.numFalse(oldValue)) {
            var clickedRow = $scope.newBoolIndex(newValue, oldValue)[0]
            var clickedVal = $scope.boxNums[$scope.newBoolIndex(newValue, oldValue)[0]][$scope.newBoolIndex(newValue, oldValue)[1]]
            for (i = 0; i < 3; i++) {
                if (i == clickedRow) {
                    //skip

                } else {
                    //increment the number of boxes
                    $scope.numBoxes[i]++;
                    //add the freed number to the display list for the other rows
                    if ($scope.boxNums[i].length == 0) {
                        $scope.boxNums[i].push(clickedVal);
                        $scope.checkedBox[i].push(false);
                    } else {
                        for (j = $scope.boxNums[i].length - 1; j >= 0; j--) {
                            if ($scope.boxNums[i][j] < clickedVal) {
                                $scope.boxNums[i].insert(j + 1, clickedVal);
                                $scope.checkedBox[i].insert(j + 1, false);
                                break;
                            } else if (j == 0) {
                                $scope.boxNums[i].insert(0, clickedVal);
                                $scope.checkedBox[i].insert(0, false);
                                break;
                            }
                        }
                    }
                }
            }
        } else if ($scope.numFalse(newValue) + 1 == $scope.numFalse(oldValue)) {
            var clickedRow = $scope.newBoolIndex(newValue, oldValue)[0]
            var clickedVal = $scope.boxNums[$scope.newBoolIndex(newValue, oldValue)[0]][$scope.newBoolIndex(newValue, oldValue)[1]]
            for (i = 0; i < 3; i++) {
                if (i == clickedRow) {
                    //skip
                } else {
                    //decrement the number of boxes
                    $scope.numBoxes[i]--;
                    if ($scope.checkedBox[i].length == 1) {
                        $scope.boxNums[i] = [];
                        $scope.checkedBox[i] = [];
                    } else {
                        for (j = 0; j < $scope.boxNums[i].length; j++) {
                            if ($scope.boxNums[i][j] == clickedVal) {
                                $scope.boxNums[i].remove(j, j);
                                $scope.checkedBox[i].remove(j, j);
                                break;
                            }
                        }
                    }
                }
            }
        }
    }, true);

    //presets
    $scope.presets = [{
        option: "Game of Life"
    }, {
        option: "Clovers"
    }, {
        option: "Amoeba"
    }]

    $scope.$watch('selected', function(newValue, oldValue) {
        console.log($scope.selected)
        if ($scope.selected.option == "Game of Life") {
            $scope.numBoxes = [1, 7, 1];
            $scope.boxNums = [
                [3],
                [0, 1, 4, 5, 6, 7, 8],
                [2]
            ]
            $scope.checkedBox = [
                [true],
                [true, true, true, true, true, true, true],
                [true]
            ]
        } else if ($scope.selected.option == 'Clovers') {
            $scope.numBoxes = [2, 6, 1]
            $scope.boxNums = [
                [0, 7],
                [1, 3, 4, 5, 6, 8],
                [2]
            ]
            $scope.checkedBox = [
                [true, true],
                [true, true, true, true, true, true],
                [true]
            ]
        } else if ($scope.selected.option == 'Amoeba') {
            $scope.numBoxes = [5, 2, 2]
            $scope.boxNums = [
                [4, 5, 6, 7, 8],
                [1, 3],
                [0, 2]
            ]
            $scope.checkedBox = [
                [true, true, true, true, true],
                [true, true],
                [true, true]
            ]
        }
    });

    //color stuff
    $scope.colorVal = "LightBlue"
    $scope.colorStyle = function() {
        if ($scope.colorVal != '') {
            return '' + $scope.colorVal
        } else {
            return "White"
        }
    }
    $scope.style = ".alive{background-color:" + $scope.colorStyle() + "}.aliveActive{background-color:" + $scope.colorStyle() + "}.active{color:" + $scope.colorStyle() + "}"
    $scope.$watch('colorVal', function(newValue, oldValue) {
        $scope.style = ".alive{background-color:" + $scope.colorStyle() + "}.aliveActive{background-color:" + $scope.colorStyle() + "}.active{color:" + $scope.colorStyle() + "}"
    });
});
