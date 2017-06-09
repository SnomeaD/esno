'use strict';
/* App Module */
var esnoApp = angular.module('esnoApp', [
  'ngRoute',
  'ui.bootstrap',
  'indexControllers',
  'checkToonControllers',
  'weeklyProgressControllers',
  'historyControllers',
  'progressControllers',
  'headerControllers',
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
    when('/checktoonform', {
        templateUrl: 'partials/checktoonform',
        controller: 'checkToonFormController'
    }).
    when('/checktoon/:server/:toonname', {
        templateUrl: 'partials/checktoon',
        controller: 'checkToonController'
    }).
    when('/checktoons', {
        templateUrl: 'partials/weeklyprogress',
        controller: 'checkToonsController'
    }).
    when('/weeklyprogress', {
        templateUrl: 'partials/weeklyprogress',
        controller: 'weeklyProgressController'
    }).
    when('/history', {
        templateUrl: 'partials/history',
        controller: 'historyController'
    }).
    when('/progress', {
        templateUrl: 'partials/progress',
        controller: 'progressController'
    }).
    otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
}]);