'use strict';
/* App Module */
var esnoApp = angular.module('esnoApp', [
  'ngRoute',
  'ui.bootstrap',
  'indexControllers',
  'toonControllers',
  'progressControllers',
  'headerControllers',
  'guildControllers',
  'battleNetServices',
  'components',
  'filters'
]);
esnoApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'partials/index',
        controller: 'indexController'
    }).
    when('/toon/:realm/:toonName', {
        templateUrl: 'partials/toon',
        controller: 'toonController'
    }).
    when('/progress', {
        templateUrl: 'partials/progress',
        controller: 'progressController'
    }).
    when('/guild', {
        templateUrl: 'partials/guild',
        controller: 'guildController'
    }).
    otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
}]);