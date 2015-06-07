'use strict';

angular.module('resumeApp')
    .controller('AdminCtrl', function ($scope, $http, Auth, User, ngNotifier) {

        // Use the User $resource to fetch all users
        $scope.users = User.query();

        $scope.delete = function(user) {
            User.remove({ id: user._id });
            angular.forEach($scope.users, function(u, i) {
                if (u === user) {
                    $scope.users.splice(i, 1);
                }
            });
        };

        $scope.scrape = function() {
            $http.post('/api/scrape', {})
                .success(function(data, status, headers, config) {
                    ngNotifier.notifySuccess('LinkedIn has been scraped');
                    console.log(data);
                }).
                error(function(data, status, headers, config) {
                    ngNotifier.notifyError('There was an error! Please review you server log files');
                    console.log(data);
                });
        };

    });
