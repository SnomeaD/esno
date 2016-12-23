'use strict';

/* Controllers */

var headerControllers = angular.module('headerControllers', []);

headerControllers.controller('headerNavController', ['$scope', '$route',
    function($scope, $route) 
    { 
        $scope.isActive = function (route) { 
            return $route.current && route === $route.current.controller;
        };
    
    }]);
