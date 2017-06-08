'use strict';

/* Controllers */

var historyControllers = angular.module('historyControllers', []);
historyControllers.controller('historyController', ['$scope', '$http','battleNetService',
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
    let achievement = {
    6/Level 10
    7/Level 20
    8/Level 30
    9/Level 40
    10/Level 50
    11/Level 60
    12/Level 70
    13/Level 80
    4828/Level 85
    6193/Level 90
    9060/Level 100
    10671/Level 110
    557/superior
    556/epic
    5373/cataclysmically-superior
    5372/cataclysmically-epic
    6348/mystically-superior
    6349/mystically-epic
    9707/savagely-superior
    9708/savagely-epic
    10764/brokenly-superior
    10765/brokenly-epic
    }
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