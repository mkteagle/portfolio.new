(function(){
    'use strict';
    var access_token = '2156602.f2beafa.46ba0be4b8f049fb82ddb1552e658e87';
    var app = angular.module('myApp', []);
    app.factory("InstagramAPI", ['$http', function($http) {
            return {
                fetchPhotos: function(callback){
                    var endpoint = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + access_token + "&callback=JSON_CALLBACK";
                    console.log(endpoint);
                    $http.jsonp(endpoint).success(function(response) {
                        callback(response.data);
                    });
                }
            }
        }]);
    app.controller('instagramController', function($scope, InstagramAPI){
        $scope.pics = [];
        $scope.have = [];
        $scope.getMore = function() {
            InstagramAPI.fetchPhotos(function(data) {
                for(var i=0; i<data.length; i++) {
                    if (typeof $scope.have[data[i].id]==="undefined") {
                        $scope.pics.push(data[i]) ;
                        $scope.have[data[i].id] = "1";
                    }
                }
            });
        };
        $scope.getMore();
    });
}());