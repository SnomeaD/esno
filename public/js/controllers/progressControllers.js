'use strict';

/* Controllers */

const progressControllers = angular.module('progressControllers', []);
progressControllers.controller('progressController', ['$scope', '$http','battleNetService',
    function($scope,$http,battleNetService) {
        function defineStatus(kill,total){
            if(kill === total){
                return "status-completed";
            }else if(kill === 0){
                return "status-incomplete";
            }else{
                return "status-in-progress";
            }
        }
        function getSummary(bossesData){
            let response = {
                'numberOfBosses': 0,
                'lfr': {
                    'kill':0,
                },
                'nm': {
                    'kill':0,
                },
                'hm': {
                    'kill':0,
                },
                'mm': {
                    'kill':0,
                }
            };
            for(let boss in bossesData) {
                if(bossesData.hasOwnProperty(boss)){
                    response['numberOfBosses'] += 1;
                    for(let detail in bossesData[boss]) {
                        if(bossesData[boss].hasOwnProperty(detail)) {
                            if(bossesData[boss][detail].down){
                                response[bossesData[boss][detail].difficulty].kill += 1;
                            }
                        }
                    }
                }
            }
            response.lfr.status =  defineStatus(response.lfr.kill,response.numberOfBosses);
            response.nm.status =  defineStatus(response.nm.kill,response.numberOfBosses);
            response.hm.status =  defineStatus(response.hm.kill,response.numberOfBosses);
            response.mm.status =  defineStatus(response.mm.kill,response.numberOfBosses);
            return response;
        }
        const toons = [
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
                        data.progress.summary = {};
                        data.progress.summary.emeraldNightmare = getSummary(data.progress.emeraldNightmare);
                        data.progress.summary.trialOfValor = getSummary(data.progress.trialOfValor);
                        data.progress.summary.nighthold = getSummary(data.progress.nighthold);
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