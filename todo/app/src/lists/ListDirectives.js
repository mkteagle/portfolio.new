(function(){
    'use strict';

    angular.module('listDirectives', [])
        .directive('editInPlace', editInPlace)
        .directive('liNonefound', liNonefound) // td-nonefound
        //.directive('tdAddlistbutton', tdAddlistbutton) //td-addlistbutton
        //.directive('tdItem', tdItem)
        //.controller('tdItemController', tdItemController);

    function editInPlace() {
        return {
            restrict: 'E',
            scope: {value: '='},
            template: '<span class="todoName" ng-click="edit()" ng-bind="value | capitalize: true" ng-keypress="$event.which === 13 && finished()"></span><input class="todoField" type="text" ng-model="value">',
            link: function ($scope, element, attrs) {
                // Let's get a reference to the input element, as we'll want to reference it.
                var inputElement = angular.element(element.children()[1]);

                // This directive should have a set class so we can style it.
                element.addClass('edit-in-place');

                // Initially, we're not editing.
                $scope.editing = false;
                $scope.finished = function () {
                    $scope.editing = false;
                    element.removeClass('active');
                };
                // ng-dblclick handler to activate edit-in-place
                $scope.edit = function () {
                    $scope.editing = true;

                    // We control display through a class on the directive itself. See the CSS.
                    element.addClass('active');

                    // And we must focus the element.
                    // `angular.element()` provides a chainable array, like jQuery so to access a native DOM function,
                    // we have to reference the first element in the array.
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
            template: '<i>No items in this list</i>'
        };
    }

    //function tdAddlistbutton() {
    //    return {
    //        restrict: 'E', // <td-addlistbutton>
    //        replace: true,
    //        template: '<button class="btn btn-xs btn-success" ng-click="hc.addList()">add list</button>'
    //    };
    //}
    //
    //function tdItem() {
    //    return {
    //        scope: {}, // "isolate scope"
    //        restrict: 'A',
    //        templateUrl: 'templates/tdItem.html',
    //        bindToController: {
    //            item: '=', // item and index parameters are passed straight in from HTML directive
    //            index: '='
    //        },
    //        controller: 'tdItemController as tc'
    //    };
    //}

    //function tdItemController() {
    //    var tc = this;
    //    //tc.index++;
    //}

}());
