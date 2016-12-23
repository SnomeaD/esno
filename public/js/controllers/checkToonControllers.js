'use strict';

/* Controllers */

var checkToonControllers = angular.module('checkToonControllers', []);

checkToonControllers.controller('checkToonFormController', ['$scope', '$window',
  function($scope,$window) {
    $scope.checkToon = function(toon){
        $window.location.href = '/checktoon/'+toon.server+'/'+toon.name;
    }
  }]);

checkToonControllers.controller('checkToonController', ['$scope', '$routeParams', '$http','battleNetService',
  function($scope, $routeParams, $http,battleNetService) {
    // This service's function returns a promise, but we'll deal with that shortly
    battleNetService.getProgress($routeParams.server,$routeParams.toonname)
        // then() called when son gets back
        .then(function(data) {
            // promise fulfilled
            if ('ok' === data.status) {
                $scope.toon=data;
            } else {
                $scope.error = data.reason;
            }
        }, function(error) {
            // promise rejected, could log the error with: console.log('error', error);
            $scope.error = error;
        });
  }]);
checkToonControllers.controller('checkToonsController', ['$scope', '$http','battleNetService',
  function($scope,$http,battleNetService) {
    var toons = [
        {'server':'sargeras','name':'Snomead'},
        {'server':'sargeras','name':'Snominette'},
        {'server':'sargeras', name:'Sno'},
        {'server':'sargeras', name:'Snômead'},
        {'server':'sargeras', name:'Snomeadine'},
        {'server':'nerzhul', name:'Snomead'},
        {'server':'sargeras', name:'Snoméàd'},
        {'server':'sargeras', name:'Dromead'},
        {'server':'sargeras', name:'Snomeadée'},
        {'server':'sargeras', name:'Snomaed'},
        {'server':'sargeras', name:'Snomeadille'},
        {'server':'sargeras', name:'Snommead'}
    ];
    $scope.toonsData = [];
    $scope.currentPage = 1;
    $scope.pageSize = 4;
    toons.forEach( function (toon){
        battleNetService.getProgress(toon.server,toon.name)
        // then() called when son gets back
        .then(function(data) {
            // promise fulfilled
            if ('ok' === data.status) {
                $scope.toonsData.push(data);
            } else {
                $scope.error = data.reason;
            }
        }, function(error) {
            // promise rejected, could log the error with: console.log('error', error);
            $scope.error = error;
        });
    });
  }]);