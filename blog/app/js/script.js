/**
 * Created by i68066 on 12/7/15.
 */
var app = angular.module('myApp', ['ngMaterial', 'hc.marked', 'blogs']);
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