'use strict';

// 4App

angular.module('resumeApp')
    .directive('contactMe', function () {
        return {
            templateUrl: 'app/contact-me/contact-me.html',
            restrict: 'EA',
            link: function (scope, element, attrs) {

            }
        };
    });