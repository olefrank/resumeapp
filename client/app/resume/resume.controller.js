'use strict';

angular.module('resumeApp')
    .controller('ResumeCtrl', function ($scope, $http, $modal) {
        $scope.scrape = {};
        $scope.skillsCollapsed = true;

        $http.get('/api/scrape').success(function (data) {
            $scope.scrape = data;
            console.log(data);
        });

        $scope.openModal = function (data) {

            var modalInstance = $modal.open({
                templateUrl: 'app/resumeModal/modal.tpls.html',
                controller: 'ResumeModalCtrl',
                resolve: {
                    data: function() {
                        return data;
                    }
                }
            });
        };
    });