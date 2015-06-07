'use strict';

angular.module('resumeApp')
    .factory('ngNotifier', function (ngToastr) {
        function notifySuccess(msg) {
            ngToastr.success(msg);
        }

        function notifyError(msg) {
            ngToastr.error(msg);
        }

        function notifyInfo(msg){
            ngToastr.info(msg);
        }

        // Public API here
        return {
            notifySuccess: notifySuccess,
            notifyError: notifyError,
            notifyInfo: notifyInfo
        };
    });
