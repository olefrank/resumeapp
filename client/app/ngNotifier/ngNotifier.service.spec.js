'use strict';

describe('Service: ngNotifier', function () {

    // load the service's module
    beforeEach(module('resumeApp'));

    // instantiate service
    var ngNotifier;
    beforeEach(inject(function (_ngNotifier_) {
        ngNotifier = _ngNotifier_;
    }));

    it('should do something', function () {
        expect(!!ngNotifier).toBe(true);
    });

});
