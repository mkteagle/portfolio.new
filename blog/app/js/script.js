/**
 * Created by i68066 on 12/7/15.
 */
var app = angular.module('myApp', ['ngMaterial', 'hc.marked', 'users']);
    app.config(function($mdThemingProvider, $mdIconProvider){

    $mdIconProvider
        .defaultIconSet("./assets/svg/avatars.svg", 128)
        .icon("menu"       , "./assets/svg/menu.svg"        , 24)
        .icon("share"      , "./assets/svg/share.svg"       , 24)
        .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
        .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
        .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
        .icon("phone"      , "./assets/svg/phone.svg"       , 512);

    $mdThemingProvider.theme('default')
        .primaryPalette('pink')
        .accentPalette('blue');

});
    app.controller("LocationFormCtrl", function ($scope) {
        $scope.date = {
            post: new Date()
        };
        $scope.subject = {
            title: ''
        };
        $scope.author = {
            name: "Michael Teagle",
            url: './michael-teagle.html',
            src: 'http://www.gravatar.com/avatar/3f47c28141ef251e1e9caa51830090c1?s=250&d=mm&r=x'
        };
        $scope.message = {
            new: 'Bacon ipsum dolor amet ham hock meatball turducken, doner swine shankle kielbasa. Pig shankle beef ribs jerky sirloin. Hamburger bresaola boudin, tail shankle pork biltong meatloaf swine rump kevin flank porchetta t-bone. Corned beef brisket turducken, sirloin pork chop meatball tongue jerky tenderloin ham hock. Spare ribs short loin alcatra leberkas picanha shank bresaola ham sausage corned beef pancetta landjaeger. Venison jerky corned beef pork chop swine capicola doner biltong. Shoulder boudin sausage filet mignon shank alcatra.Andouille filet mignon turducken biltong, fatback t-bone short ribs. Turducken shankle chuck drumstick. Cow tenderloin swine, prosciutto meatball pancetta jerky beef flank. Beef ham hock bacon t-bone short ribs. Drumstick biltong hamburger meatloaf pork pancetta. Tail drumstick pork loin hamburger beef.Ribeye ball tip bacon cow boudin shank. Porchetta cupim tri-tip short ribs, tongue jowl frankfurter pork belly chuck shoulder tenderloin corned beef beef ribs short loin. Capicola bresaola kielbasa jerky meatloaf. Prosciutto alcatra jowl, ball tip flank t-bone fatback kevin spare ribs sausage pork loin sirloin beef. Flank beef ribs swine bresaola pork.T-bone strip steak venison ham hock, hamburger pancetta leberkas tail biltong chicken. Pastrami pork belly t-bone jowl brisket, tri-tip sirloin shankle corned beef tongue. Ham hock porchetta prosciutto jowl spare ribs ham. Beef ribs pig tri-tip chicken pancetta. Ball tip shank doner ribeye chuck andouille.Pork chop tail shoulder meatloaf pork loin beef. Fatback alcatra tail brisket cupim pork belly kielbasa corned beef shank. Turkey venison meatloaf kielbasa pork loin pork chop pork rump sirloin andouille salami ham hock pastrami. Tongue shankle rump ball tip, chicken t-bone pork chop pork loin jowl landjaeger beef ribs drumstick short ribs turducken. Beef ribs fatback turkey, filet mignon chuck pig t-bone ham hock short loin flank alcatra. Tri-tip filet mignon beef, biltong porchetta swine ham t-bone ball tip jowl brisket chuck doner andouille.Does your lorem ipsum text long for something a little meatier? Give our generator a try… it’s tasty!'
        };
        $scope.file = {
            name: 'None'
        };
        $scope.tags = '';
        $scope.obj = {};
        $scope.countOf = function(text) {
            var s = text ? text.split(/\s+/) : 0; // it splits the text on space/tab/enter
            return s ? s.length : '';
        };
    });
    app.directive('footer', function () {
        return {
            restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: true,
            templateUrl: "./js/directives/footer.html",
            controller: ['$scope', '$filter', function ($scope, $filter) {
                // Your behaviour goes here :)
            }]
        }
    });
    app.directive("clickToTag", function () {
        var editorTemplate = '' +
            '<div class="click-to-tag">' +
            '<div ng-hide="view.editorEnabled">' +
            '{{value}} ' +
            '<md-button class="md-primary" ng-click="enableEditor()">Edit</md-button>' +
            '</div>' +
            '<div ng-show="view.editorEnabled">' +
            '<input type="text" ng-list = " " ng-trim="false" class="small-12.columns" ng-model="view.editableValue">' +
            '<md-button class="md-primary" ng-click="save()">Save</md-button>' +
            ' or ' +
            '<md-button class="md-warn" ng-click="disableEditor()">cancel</md-button>' +
            '</div>' +
            '</div>';

        return {
            restrict: "A",
            replace: true,
            template: editorTemplate,
            scope: {
                value: "=clickToTag"
            },
            link: function (scope, element, attrs) {
                scope.view = {
                    editableValue: scope.value,
                    editorEnabled: false
                };

                scope.enableEditor = function () {
                    scope.view.editorEnabled = true;
                    scope.view.editableValue = scope.value;
                    setTimeout(function () {
                        element.find('input')[0].focus();
                    });
                };

                scope.disableEditor = function () {
                    scope.view.editorEnabled = false;
                };

                scope.save = function () {
                    scope.value = scope.view.editableValue;
                    scope.disableEditor();
                };

            }
        };
    });
    app.directive("clickToDate", function () {

        var editorTemplate = '' +
            '<div class="click-to-date">' +
            '<div ng-hide="view.editorEnabled">' +
            '{{value}} ' +
            '<md-button class="md-primary" ng-click="enableEditor()">Edit</md-button>' +
            '</div>' +
            '<div ng-show="view.editorEnabled">' +
            '<md-datepicker ng-model="view.editableValue">' + '</md-datepicker>' +
            '<md-button class="md-primary" ng-click="save()">Save</md-button>' +
            '   or   ' +
            '<md-button class="md-warn" ng-click="disableEditor()">cancel</md-button>' +
            '</div>' +
            '</div>';
        return {
            restrict: "A",
            replace: true,
            template: editorTemplate,
            scope: {
                value: "=clickToDate"
            },
            link: function (scope, element, attrs) {
                scope.view = {
                    editableValue: scope.value,
                    editorEnabled: false
                };

                scope.enableEditor = function () {
                    scope.view.editorEnabled = true;
                    scope.view.editableValue = scope.value;
                    setTimeout(function () {
                        element.find('input')[0].focus();
                    });
                };

                scope.disableEditor = function () {
                    scope.view.editorEnabled = false;
                };

                scope.save = function () {
                    scope.value = scope.view.editableValue;
                    scope.disableEditor();
                };
            }
        };
    });