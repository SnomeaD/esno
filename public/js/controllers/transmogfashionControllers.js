'use strict';

/* Controllers */

var transmogfashionControllers = angular.module('transmogfashionControllers', []);

transmogfashionControllers.controller('transmogfashionController', ['$scope', '$routeParams', '$http','battleNetService',
    function($scope, $routeParams, $http,battleNetService) {
        // This service's function returns a promise, but we'll deal with that shortly
        battleNetService.getFashion()
        // then() called when son gets back
            .then(function(data) {
                // promise fulfilled
                if ('ok' === data.status) {
                    $scope.toon = data;
                } else {
                    $scope.error = data.reason;
                }
            }, function(error) {
                // promise rejected, could log the error with: console.log('error', error);
                $scope.error = error;
            });
    }]);