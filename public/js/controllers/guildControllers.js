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

        battleNetService.getGuildToons(guild.server,guild.guildName)
            // then() called when son gets back
            .then(function(data) {
                // promise fulfilled
                data.members.forEach( function (member){
                if(member.rank <= 3 || member.rank === 8) {
                    let toon = {
                        'name': member.character.name,
                        'realm': member.character.realm,
                        'staticThumbnail': 'https://render-api-eu.worldofwarcraft.com/static-render/eu/' + member.character.thumbnail,
                        'thumbnail': 'http://render-eu.worldofwarcraft.com/character/' + member.character.thumbnail,
                        'class': member.character.class,
                        'spec': member.character.spec.name,
                        'specIcon': member.character.spec.icon,
                        'role': member.character.spec.role,
                    };
                    battleNetService.getToon(member.character.realm, member.character.name)
                        .then(toonInfo => {
                            toon.averageItemLevel = toonInfo.items.averageItemLevel;
                            toon.averageItemLevelEquipped = toonInfo.items.averageItemLevelEquipped;

                            return true;
                        }).catch(error => {
                            console.log(error);
                            res.status(error.response.status).jsonp({status: error.response.status , message: error.response.statusText});
                    });
                    $scope.toonsData.push(toon);
                }
            }, function(error) {
                // promise rejected, could log the error with: console.log('error', error);
                $scope.error = error;
            });
    }]);