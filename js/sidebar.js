
    var app = angular.module('MyApp');
    app.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $mdUtil, $log) {

        $scope.toggleRight = buildToggler('right');
        $scope.leftOpen = true;

        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildToggler(navID) {
            var debounceFn =  $mdUtil.debounce(function(){
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            },300);

            return debounceFn;
        }

    });
    app.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {

    });
    app.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        };
    });