'use strict';

/* Controllers */

const guildControllers = angular.module('guildControllers', []);
guildControllers.controller('guildController', ['$scope', '$http','battleNetService',
    function($scope,$http,battleNetService) {
        if (!Array.prototype.find) {
            Object.defineProperty(Array.prototype, 'find', {
                enumerable: false,
                configurable: true,
                writable: true,
                value: function(predicate) {
                    if (this === null) {
                        throw new TypeError('Array.prototype.find called on null or undefined');
                    }
                    if (typeof predicate !== 'function') {
                        throw new TypeError('predicate must be a function');
                    }
                    let list = Object(this);
                    let length = list.length >>> 0;
                    let thisArg = arguments[1];
                    let value;
                    for (let i = 0; i < length; i++) {
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


        battleNetService.getGuildToons('sargeras','Les Sapins de la Horde')
            // then() called when son gets back
            .then(function(data) {
                $scope.toonsData = [];
                // promise fulfilled
                data.members.forEach( function (member){
                if(member.rank <= 3 || member.rank === 8) {
                    battleNetService.getToon(member.character.realm, member.character.name)
                        .then(toonInfo => {
                            $scope.toonsData.push(toonInfo);
                        }).catch(error => {
                            console.log(error);
                    });
                }
            }, function(error) {
                // promise rejected, could log the error with: console.log('error', error);
                $scope.error = error;
            });
        });
    }]);