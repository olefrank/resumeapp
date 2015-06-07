'use strict';

describe('Controller: ResumeModalCtrl', function () {

    // load the controller's module
    beforeEach(module('resumeApp'));

    var ResumeModalCtrl, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ResumeModalCtrl = $controller('ResumeModalCtrl', {
            $scope: scope
        });
    }));

    it('should ...', function () {
        expect(1).toEqual(1);
    });
});
