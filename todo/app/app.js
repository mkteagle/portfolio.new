(function () {
    'use strict';
    var translations = {
        Archived: 'Archive List',
        Items: 'Archive Items',
        Delete: 'Delete List',
        Contact: 'Contact Me',
        Copyright: 'Copyright',
        ToDo: 'New ToDo...',
        List: 'New List...',
        AI: 'Archived Items',
        About: 'About My App',
        EnglishBu: 'English',
        FrenchBu: 'français',
        GermanBu: 'Deutsche',
        SpanishBu: 'Español',
        NoItems: 'No Items in this List',
        Unarchive: 'Unarchive Item(s)',
        HomeBu: 'Home',
        AboutBu: 'About',
        ArchiveBu: 'Archived'
    };
    var translationsDE = {
        Archived: 'archivieren Liste',
        Items: 'Archiv Artikel',
        Delete: 'Löschen Liste',
        Contact: 'Kontaktiere mich',
        Copyright: 'Copyright',
        ToDo: 'Neu ToDo...',
        List: 'neue Liste...',
        AI: 'Archivierte Artikel',
        About: 'Über Meine App',
        EnglishBu: 'English',
        FrenchBu: 'français',
        GermanBu: 'Deutsche',
        SpanishBu: 'Español',
        NoItems: 'Keine Einträge in dieser Liste',
        Unarchive: 'Dearchivieren(r) Artikel',
        HomeBu: 'Zuhause',
        AboutBu: 'Etwa',
        ArchiveBu: 'archiviert'
    };
    var translationsFR = {
        Archived: 'Les Archives liste',
        Items: 'Les Archives Articles',
        Delete: 'Effacer liste',
        Contact: 'Le Contact Moi',
        Copyright: 'droits dauteur',
        ToDo: 'Nouveau ToDo...',
        List: 'nouvelle liste...',
        AI: 'Articles archivés',
        About: 'A propos de My App',
        EnglishBu: 'English',
        FrenchBu: 'français',
        GermanBu: 'Deutsche',
        SpanishBu: 'Español',
        NoItems: "Pas d'éléments dans cette liste",
        Unarchive: 'Désarchiver article(s)',
        HomeBu: 'Accueil',
        AboutBu: 'sur',
        ArchiveBu: 'archivé'
    };
    var translationsES = {
        Archived: 'Archivo lista',
        Items: 'Archivo de Artículos',
        Delete: 'Borrar lista',
        Contact: 'Contáctame',
        Copyright: 'Derechos de autor',
        ToDo: 'Nueva ToDo...',
        List: 'Nueva lista...',
        AI: 'Contenido archivado',
        About: 'Acerca de Mi App',
        EnglishBu: 'English',
        FrenchBu: 'français',
        GermanBu: 'Deutsche',
        SpanishBu: 'Español',
        NoItems: 'No hay artículos en esta lista',
        Unarchive: 'Artículo Desarchivar(s)',
        HomeBu: 'Casa',
        AboutBu: 'Acerca de',
        ArchiveBu: 'archivado'
    };
    angular
        .module('starterApp', ['ngMaterial', 'ui.router', 'listService', 'navController', 'listDirectives', 'listFilter', 'listController', 'ngAnimate', 'pascalprecht.translate'])
        .config(["$stateProvider", "$urlRouterProvider", "$mdThemingProvider", "$mdIconProvider", '$translateProvider',
            function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider, $translateProvider) {
                $translateProvider
                    .translations('en', translations)
                    .translations('de', translationsDE)
                    .translations('fr', translationsFR)
                    .translations('es', translationsES)
                    .preferredLanguage('en');
                $translateProvider.useSanitizeValueStrategy(null);
                //$translateProvider.useLocalStorage();
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