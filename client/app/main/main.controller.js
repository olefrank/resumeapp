'use strict';

angular.module('resumeApp')
    .controller('MainCtrl', function ($scope, $http) {
        $scope.scrape = {};

        $http.get('/api/scrape').success(function(data) {
            $scope.scrape = data;
        });
    });
