'use strict';

/* Controllers */

const progressControllers = angular.module('progressControllers', []);
progressControllers.controller('progressController', ['$scope', '$http','battleNetService',
    function($scope,$http,battleNetService) {
        if (!Array.prototype.find) {
            Object.defineProperty(Array.prototype, 'find', {
                enumerable: false,
                configurable: true,
                writable: true,
                value: function(predicate) {
                    if (this == null) {
                        throw new TypeError('Array.prototype.find called on null or undefined');
                    }
                    if (typeof predicate !== 'function') {
                        throw new TypeError('predicate must be a function');
                    }
                    var list = Object(this);
                    var length = list.length >>> 0;
                    var thisArg = arguments[1];
                    var value;
                    for (var i = 0; i < length; i++) {
                        if (i in list) {
                            value = list[i];
                            if (predicate.call(thisArg, value, i, list)) {
                                return value;
                            }
                        }
                    }
                    return undefined;
                }
            });
        }
        if (!Array.prototype.includes) {
            Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
                'use strict';
                var O = Object(this);
                var len = parseInt(O.length) || 0;
                if (len === 0) {
                    return false;
                }
                var n = parseInt(arguments[1]) || 0;
                var k;
                if (n >= 0) {
                    k = n;
                } else {
                    k = len + n;
                    if (k < 0) {k = 0;}
                }
                var currentElement;
                while (k < len) {
                    currentElement = O[k];
                    if (searchElement === currentElement ||
                        (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
                        return true;
                    }
                    k++;
                }
                return false;
            };
        }
        function getSummary(raidData){
            let response = {
                'numberOfBosses': raidData.bosses.length,
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
            for(let bossId in raidData.bosses) {
                if(isDeadThisWeek(raidData.bosses[bossId].lfrTimestamp)){
                    response.lfr.kill += 1;
                }
                if(isDeadThisWeek(raidData.bosses[bossId].normalTimestamp)){
                    response.nm.kill += 1;
                }
                if(isDeadThisWeek(raidData.bosses[bossId].heroicTimestamp)){
                    response.hm.kill += 1;
                }
                if(isDeadThisWeek(raidData.bosses[bossId].mythicTimestamp)){
                    response.mm.kill += 1;
                }
            }
            response.lfr.status =  defineStatus(response.lfr.kill,response.numberOfBosses);
            response.nm.status =  defineStatus(response.nm.kill,response.numberOfBosses);
            response.hm.status =  defineStatus(response.hm.kill,response.numberOfBosses);
            response.mm.status =  defineStatus(response.mm.kill,response.numberOfBosses);
            return response;
        }
        function isDeadThisWeek(timestamp){
            // If we are Wednesday or past, don't take last wednesday but this Wednesday
            if(3 <= moment().day()){
                if(moment(timestamp).isAfter(moment().day(3).hour(9).minute(0).second(0))){
                    return true
                }
                return false;
            }else{
                if(moment(timestamp).isAfter(moment().day(-4).hour(9).minute(0).second(0))){
                    return true;
                }
            }
            return false;
        }
        function findById(id){
            return function findId(array){
                return array.id===id;
            }
        }
        function defineStatus(kill,total){
            if(kill === total){
                return "status-completed";
            }else if(kill === 0){
                return "status-incomplete";
            }else{
                return "status-in-progress";
            }
        }
        const toons = [
            // {server:'sargeras', name:'Snomead'},
            // {server:'sargeras', name:'Snominette'},
            // {server:'sargeras', name:'Sno'},
            // {server:'sargeras', name:'Snômead'},
            // {server:'sargeras', name:'Snomeadine'},
            // {server:'nerzhul',  name:'Snomead'},
            // {server:'sargeras', name:'Snoméàd'},
            // {server:'sargeras', name:'Dromead'},
            // {server:'sargeras', name:'Snomeadée'},
            // {server:'sargeras', name:'Snømead'},
            // {server:'sargeras', name:'Snomeadille'},
            // {server:'sargeras', name:'Snommead'},
            {server:'sargeras', name:'Snomead'}
        ];
        $scope.toonsData = [];
        toons.forEach( function (toon){
            battleNetService.getProgress(toon.server,toon.name)
            // then() called when son gets back
                .then(function(data) {
                    // promise fulfilled
                    let toon = {
                        'name' : data.name,
                        'realm' : data.realm,
                        'staticThumbnail' : 'https://render-api-eu.worldofwarcraft.com/static-render/eu/' + data.thumbnail,
                        'thumbnail' : 'http://render-eu.worldofwarcraft.com/character/' + data.thumbnail,
                        'class': data.class,
                        'averageItemLevel': data.items.averageItemLevel,
                        'averageItemLevelEquipped': data.items.averageItemLevelEquipped,
                    }
                    toon.progress = [];
                    let raids = [8026,8440,8025,8524];
                    for(let i =0; i< raids.length;i++){
                        let raid = data.progression.raids.find(findById(raids[i]));
                        raid.summary = getSummary(data.progression.raids.find(findById(raids[i])));
                        toon.progress.push(raid);
                    }
                    $scope.toonsData.push(toon);
                }, function(error) {
                    // promise rejected, could log the error with: console.log('error', error);
                    $scope.error = error;
                });
        });
    }]);