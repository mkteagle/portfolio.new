(function(){
    'use strict';

    angular.module('listDirectives', [])
        .directive('editInPlace', editInPlace)
        .directive('liNonefound', liNonefound) // td-nonefound


    function editInPlace() {
        return {
            restrict: 'E',
            scope: {value: '='},
            template: '<span class="todoName" ng-click="edit()" ng-bind="value | capitalize: true" ng-keypress="$event.which === 13 && finished()"></span><input class="todoField" type="text" ng-model="value">',
            link: function ($scope, element, attrs) {
                var inputElement = angular.element(element.children()[1]);

                element.addClass('edit-in-place');

                $scope.editing = false;
                $scope.finished = function () {
                    $scope.editing = false;
                    element.removeClass('active');
                };
                $scope.edit = function () {
                    $scope.editing = true;
                    element.addClass('active');
                    inputElement.focus();
                };

                // When we leave the input, we're done editing.
                inputElement.on("blur", function () {
                    $scope.editing = false;
                    element.removeClass('active');
                });

            }
        };
    }
    function liNonefound() {
        return {
            restrict: 'A',
            replace: true,
            template: '<i>{{ "NoItems" | translate }}</i>'
        };
    }
}());
