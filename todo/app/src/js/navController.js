(function(){
    'use strict';

    angular.module('navController', ["ngAnimate"])
        .controller('navController', navController);

    navController.$inject = ["$location"];

    function navController($location)
    {
        var nav = this;
        nav.isActive = isActive;
        function isActive(viewLocation) {
            return viewLocation === $location.path();
        }
    }

}());