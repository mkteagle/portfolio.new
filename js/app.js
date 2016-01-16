var client_id = 'f2beafa78b1e469db9a0155caa23f710';
var user_id = '2156602';
var app = angular.module('myApp', ['ngMaterial', 'blogDirective', 'ngAnimate']);
app.factory("InstagramAPI", ['$http', function($http) {
    return {
        fetchPhotos: function(callback){
            var endpoint = "https://api.instagram.com/v1/users/" + user_id + "/media/recent/?";
            endpoint += "?count=99";
            endpoint += "&client_id=" + client_id;
            endpoint += "&callback=JSON_CALLBACK";
            $http.jsonp(endpoint).success(function(response){
                callback(response.data);
            });
        }
    }
}]);
app.controller('MainCtrl', function ($scope) {
        $scope.slides = [
            {image: '../portfolio.new/img/mtn-background.jpg', description: 'Image 00'},
            {image: '../portfolio.new/img/mtn-background2.jpg', description: 'Image 01'},
            {image: '../portfolio.new/img/mtn-bg.png', description: 'Image 02'},
            {image: '../portfolio.new/img/mtn-background3.jpg', description: 'Image 03'},
            {image: '../portfolio.new/images/img04.jpg', description: 'Image 04'}
        ];

        $scope.direction = 'left';
        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index) {
            $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function () {
            $scope.direction = 'left';
            $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        };

        $scope.nextSlide = function () {
            $scope.direction = 'right';
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        };
    })
    .animation('.slide-animation', function () {
        return {
            beforeAddClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    var finishPoint = element.parent().width();
                    if(scope.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    var startPoint = element.parent().width();
                    if(scope.direction === 'right') {
                        startPoint = -startPoint;
                    }

                    TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
                }
                else {
                    done();
                }
            }
        };
    });
app.directive("clickToTag", function () {
    var mtDate = '<md-datepicker ng-model="view.editableValue">' + '</md-datepicker>';
    var mtText = '<input type="text" ng-list = " " ng-trim="false" class="small-12.columns" ng-model="view.editableValue">';
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

$(document).ready(function() {
    $('.chaffle').chaffle({
        speed: 50,
        time: 140
    });
});
