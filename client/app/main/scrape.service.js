'use strict';

angular.module('resumeApp')
    .factory('Scrape', function ($resource) {
        return $resource('/api/scrape',
            {
                get: { method: 'GET' }
            }
        );
    });
