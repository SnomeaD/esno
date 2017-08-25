'use strict';

/* Controllers */

const toonControllers = angular.module('toonControllers', []);
toonControllers.controller('toonController', ['$scope', '$http','battleNetService','$routeParams',
    function($scope,$http,battleNetService, $routeParams) {
        battleNetService.getToon($routeParams.realm, $routeParams.toonName)
            .then(toonInfo => {
                $scope.toons = toonInfo;
            }).catch(error => {
            console.log(error);
            res.status(error.response.status).jsonp({status: error.response.status , message: error.response.statusText});
        });

    }]);