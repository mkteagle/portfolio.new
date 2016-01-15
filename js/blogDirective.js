(function() {
    'use strict';
    angular.module('blogDirective', [])
        .directive('menuDir', menuDir)
        .directive("clickToTag", function () {
            var editorTemplate = '' +
                '<div class="click-to-tag">' +
                '<div ng-hide="view.editorEnabled">' +
                '{{view.value}} ' +
                '<md-button class="md-primary" ng-click="view.enableEditor()">Edit</md-button>' +
                '</div>' +
                '<div ng-show="view.editorEnabled">' +
                '<md-datepicker ng-show="view.date" ng-model="view.editableValue">' + '</md-datepicker>' +
                '<input type="text" ng-hide="view.date" ng-list = " " ng-trim="false" class="small-12.columns" ng-model="view.editableValue">' +
                '<md-button class="md-primary" ng-click="view.save()">Save</md-button>' +
                ' or ' +
                '<md-button class="md-warn" ng-click="view.disableEditor()">cancel</md-button>' +
                '</div>' +
                '</div>';

            return {
                restrict: "A",
                replace: true,
                template: editorTemplate,
                bindToController: {
                    tag: "=",
                    date: "="
                },
                controllerAs: 'view',
                controller: function () {
                    var view = this;
                    view.value = view.editableValue = (view.date ? view.date : view.tag);
                    view.editorEnabled = false;

                    view.enableEditor = function () {
                        view.editorEnabled = true;
                        view.editableValue = view.value;
                        //setTimeout(function () {
                        //    element.find('input')[0].focus();
                        //});
                    };

                    view.disableEditor = function () {
                        view.editorEnabled = false;
                    };

                    view.save = function () {
                        view.value = view.editableValue;
                        view.disableEditor();
                    };

                }
            };
        });
        function menuDir() {
            return {
                restrict: "E",
                template: '<div class="menu-li"><a href="#" class="chaffle" data-lang="en">' + 'ABOUT' + '</a>' +
                '</div>' + '<div class="menu-li"><a href="#" class="chaffle" data-lang="en">' + 'BLOG' + '</a>' +
                '</div>' + '<div class="menu-li"><a href="#" class="chaffle" data-lang="en">' + 'PORTFOLIO' + '</a>' +
                '</div>' + '<div class="menu-li"><a href="#" class="chaffle" data-lang="en">' + 'RESUME' + '</a>' +
                '</div>' + '<div class="menu-li"><a href="#" class="chaffle" data-lang="en">' + 'CONTACT' + '</a>' +'</div>'
            }
        }
}());


