(function(){
    'use strict';

    angular.module('navController', ["ngAnimate"])
        .controller('navController', navController);

    navController.$inject = ["$location", "$translate"];

    function navController($location, $translate)
    {
        var nav = this;
        nav.isActive = isActive;
        nav.changeLanguage = changeLanguage;
        function changeLanguage (langKey) {
            $translate.use(langKey);
        }
        function isActive(viewLocation) {
            return viewLocation === $location.path();
        }

    }

}());