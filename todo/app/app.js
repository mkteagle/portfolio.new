(function () {
    'use strict';
    var translations = {
        Archived: 'Archive',
        Items: 'Archive Items',
        Delete: 'Delete',
        Contact: 'Contact Me'
    };
    var translationsDE = {
        Archived: 'Archiv',
        Items: 'Archiv Artikel',
        Delete: 'Löschen',
        Contact: 'Kontaktiere mich'
    };
    var translationsFR = {
        Archived: 'Les Archives',
        Items: 'Articles',
        Delete: 'Effacer',
        Contact: 'Le Contact Moi'
    };
    var translationsES = {
        Archived: 'Archive',
        Items: 'Items',
        Delete: 'Delete',
        Contact: 'Contact',
        Me: ''
    };
    angular
        .module('starterApp', ['ngMaterial', 'ui.router', 'listService', 'navController', 'listDirectives', 'listFilter', 'listController', 'ngAnimate', 'pascalprecht.translate'])
        .config(["$stateProvider", "$urlRouterProvider", "$mdThemingProvider", "$mdIconProvider", '$translateProvider',
            function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider, $translateProvider) {
                $translateProvider
                    .translations('en', translations)
                    .translations('de', translationsDE)
                    .translations('de', translationsFR)
                    .translations('de', translationsES)
                    .preferredLanguage('en');
                // define all app states (pages)
                $stateProvider
                    .state("home", {
                        url: "/home",
                        templateUrl: "src/templates/home.html",
                        controller: "ListController as ul"
                    })
                    .state("about", {
                        url: "/about",
                        templateUrl: "src/templates/about.html"
                    })
                    .state("archived", {
                        url: "/archived",
                        templateUrl: "src/templates/archived.html",
                    });

                // if none of the above states are matched, use this as the fallback
                $urlRouterProvider.otherwise("/home");

                $mdIconProvider
                    .defaultIconSet("./assets/svg/avatars.svg", 128)
                    .icon("menu", "./assets/svg/menu.svg", 24)
                    .icon("share", "./assets/svg/share.svg", 24)
                    .icon("google_plus", "./assets/svg/google_plus.svg", 512)
                    .icon("hangouts", "./assets/svg/hangouts.svg", 512)
                    .icon("twitter", "./assets/svg/twitter.svg", 512)
                    .icon("phone", "./assets/svg/phone.svg", 512);

                $mdThemingProvider.theme('default')
                    .primaryPalette('blue-grey')
                    .accentPalette('deep-orange');
            }]);
}());