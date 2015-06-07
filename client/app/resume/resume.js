'use strict';

angular.module('resumeApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('resume', {
                url: '/',
                templateUrl: 'app/resume/resume.html',
                controller: 'ResumeCtrl'
            });
    });