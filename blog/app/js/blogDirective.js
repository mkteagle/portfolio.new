(function() {
    'use strict';
    angular.module('blogDirective', [])
        .directive("clickToTag", function () {
            var editorTemplate = '' +
                '<div class="click-to-tag">' +
                '<div ng-hide="view.editorEnabled">' +
                '{{view.value}} ' +
                '<md-button class="md-primary" ng-click="enableEditor()">Edit</md-button>' +
                '</div>' +
                '<div ng-show="view.editorEnabled">' +
                '<md-datepicker ng-show="view.date" ng-model="view.editableValue">' + '</md-datepicker>' +
                '<input type="text" ng-hide="view.date" ng-list = " " ng-trim="false" class="small-12.columns" ng-model="view.editableValue">' +
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
                    tag: "=",
                    date: "="
                },
                link: function (scope, element, attrs) {
                    var value = (scope.date ? scope.date : scope.tag);
                    scope.view = {
                        value: value,
                        editableValue: value,
                        editorEnabled: false,
                        date: scope.date,
                        tag: scope.tag
                    };

                    scope.enableEditor = function () {
                        scope.view.editorEnabled = true;
                        scope.view.editableValue = scope.view.value;
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
        })
    //.directive("clickToDate", function () {
    //
    //    var editorTemplate = '' +
    //        '<div class="click-to-date">' +
    //        '<div ng-hide="view.editorEnabled">' +
    //        '{{value}} ' +
    //        '<md-button class="md-primary" ng-click="enableEditor()">Edit</md-button>' +
    //        '</div>' +
    //        '<div ng-show="view.editorEnabled">' +
    //        '<md-datepicker  ng-model="view.editableValue">' + '</md-datepicker>' +
    //        '<md-button class="md-primary" ng-click="save()">Save</md-button>' +
    //        '   or   ' +
    //        '<md-button class="md-warn" ng-click="disableEditor()">cancel</md-button>' +
    //        '</div>' +
    //        '</div>';
    //    return {
    //        restrict: "A",
    //        replace: true,
    //        template: editorTemplate,
    //        scope: {
    //            value: "=clickToDate"
    //        },
    //        link: function (scope, element, attrs) {
    //            scope.view = {
    //                editableValue: scope.value,
    //                editorEnabled: false
    //            };
    //
    //            scope.enableEditor = function () {
    //                scope.view.editorEnabled = true;
    //                scope.view.editableValue = scope.value;
    //                setTimeout(function () {
    //                    element.find('input')[0].focus();
    //                });
    //            };
    //
    //            scope.disableEditor = function () {
    //                scope.view.editorEnabled = false;
    //            };
    //
    //            scope.save = function () {
    //                scope.value = scope.view.editableValue;
    //                scope.disableEditor();
    //            };
    //        }
    //    };
    //});

}());


