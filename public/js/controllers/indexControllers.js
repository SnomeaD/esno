'use strict';

/* Controllers */

let indexControllers = angular.module('indexControllers', []);

indexControllers.controller('indexController', ['$scope', '$http',
  function($scope,$http) {
    $scope.error='Hello from indexController';
  }]);
