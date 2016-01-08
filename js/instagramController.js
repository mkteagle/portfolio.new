(function(){
    'use strict';
    var client_id = 'f2beafa78b1e469db9a0155caa23f710';
    var user_id = '2156602';
    angular.module('instagramController', [])
        .controller('instagramController', instagramController)
        .factory("InstagramAPI", ['$http', function($http) {
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

    function instagramController($scope, InstagramAPI)
    {
        $scope.layout = 'grid';
        $scope.data = {};
        $scope.pics = [];

        InstagramAPI.fetchPhotos(function(data){
            $scope.pics = data;
        });
    }
}());