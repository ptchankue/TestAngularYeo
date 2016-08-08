'use strict';

/**
 * @ngdoc directive
 * @name testWebAppApp.directive:notes.directive
 * @description
 * # notes.directive
 */
angular.module('testWebAppApp')
  .directive('myNoteDirective', function () {
    return {
      templateUrl: 'views/directives/notes.html',
      restrict: 'E',
      // link: function postLink(scope, element, attrs) {
      //   element.text('this is the notes.directive directive');
      // }
    };
  });
