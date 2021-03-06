'use strict';

describe('Directive: notes.directive', function () {

  // load the directive's module
  beforeEach(module('testWebAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<notes.directive></notes.directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the notes.directive directive');
  }));
});
