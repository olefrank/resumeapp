'use strict';

angular.module('resumeApp')
  .controller('ResumeModalCtrl', function ($scope, $modalInstance, data) {

        // determins color ('primary', 'info', 'warning' ...)
        $scope.panelType = data.panelType;

        // fields
        $scope.title = data.data.title || "";
        $scope.company = data.data.company || "";
        $scope.start = data.data.start || "";
        $scope.end = data.data.end || "";
        $scope.description = data.data.description || "";
        $scope.school = data.data.school || "";
        $scope.degree = data.data.degree || "";
        $scope.major = data.data.major || "";
        $scope.activities = data.data.activities || "";
        $scope.cause = data.data.cause || "";

        // on modal close
        $scope.close = function () {
            $modalInstance.close();
        };
  });
