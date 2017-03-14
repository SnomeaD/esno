'use strict';

/* Controllers */

var weeklyProgressControllers = angular.module('weeklyProgressControllers', []);
weeklyProgressControllers.controller('weeklyProgressController', ['$scope', '$http','battleNetService',
  function($scope,$http,battleNetService) {
    var toons = [
        {server:'sargeras', name:'Snomead'},
        {server:'sargeras', name:'Snominette'},
        {server:'sargeras', name:'Sno'},
        {server:'sargeras', name:'Snômead'},
        {server:'sargeras', name:'Snomeadine'},
        {server:'nerzhul', name:'Snomead'},
        {server:'sargeras', name:'Snoméàd'},
        {server:'sargeras', name:'Dromead'},
        {server:'sargeras', name:'Snomeadée'},
        {server:'sargeras', name:'Snømead'},
        {server:'sargeras', name:'Snomeadille'},
        {server:'sargeras', name:'Snommead'},
        {server:'sargeras', name:'Snomeadh'}
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