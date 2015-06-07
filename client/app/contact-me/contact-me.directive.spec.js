'use strict';

describe('Directive: contactMe', function () {

  // load the directive's module and view
  beforeEach(module('4App'));
  beforeEach(module('app/contact-me/contact-me.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<contact-me></contact-me>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the contactMe directive');
  }));
});