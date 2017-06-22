'use strict';
const path = require('path');
const express = require('express');
const request = require("request");
const getProgressController = require(path.resolve('controllers','getProgress'));
const router = express.Router();
const config = require('../config/config.js');

module.exports = router;

/* GET users listing. */
router.get('/progress/:server/:name', getProgressController);
/* GET users listing. */
router.get('/character/:server/:name', function(req, res, next) {
    const bnet = require('battlenet-api')();
    bnet.wow.character.aggregate({
        origin: 'eu',
        realm: encodeURIComponent(req.params.server),
        name: encodeURIComponent(req.params.name),
        fields: ['guild', 'appareance']
    }, {
        apikey: config.bnet.apikey
    }, function(error, body, response) {
        if(!error && !body.status){
            res.jsonp(body)
        }else{
            res.send('Unable to connect to the api');
        }
    });
});

/* GET users listing. */
router.get('/progress_old/:server/:name', function(req, res, next) {
    var moment = require('moment');
    var bnet = require('battlenet-api')();

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

    function getDifficulty(name) {
        var regex = /(?:\()([A-z]*)/g;
        var result = regex.exec(name);
        var difficulty = 'nm';
        if(result && result[1]){
            switch (result[1]){
                case 'Raid':
                    difficulty = 'lfr';
                    break;
                case 'Normal':
                    difficulty = 'nm';
                    break;
                case 'Heroic':
                    difficulty = 'hm';
                    break;
                case 'Mythic':
                    difficulty = 'mm';
                    break;
                default:
                    difficulty = 'nm';
            }
        }
        return difficulty;
    }
    function getName(name){
        var regex = /([A-z ']*)((?: victories \()|(?: kills \()|(?: redemptions \()|(?: destructions \()|(?: defeats \())/g;
        var result = regex.exec(name);
        return (result && result[1]?result[1]:name);
    }
    function getInstanceName(name){
        var regex = /(?:\(Mythic )([A-z ]*)/g;
        var result = regex.exec(name);
        return (result && result[1]?result[1]:name);
    }
    function enhanceBossData(bossData,isDungeon){
        var difficulty = getDifficulty(bossData.name);
        if((isDungeon && 'mm' === difficulty) || !isDungeon){
            return {
                'id' : bossData.id,
                'quantity': bossData.quantity,
                'difficulty' : difficulty,
                'down': isDeadThisWeek(bossData.lastUpdated)
            };
        }
    }

    function findById(id){
        return function findId(array){
            return array.id===id;
        }
    }

    bnet.wow.character.aggregate({
        origin: 'eu',
        realm: encodeURIComponent(req.params.server),
        name: encodeURIComponent(req.params.name),
        fields: ['statistics', 'items']
    }, {
        apikey: config.bnet.apikey
    }, function(error, statisticsData, response) {
        if(!error && !statisticsData.status){
            var bossData = statisticsData.statistics.subCategories.find(findById(14807)).subCategories.find(findById(15264)).statistics;
            var mythicDungeon = {};
            for(var i=10878; i<=10910;i++){
                var boss = bossData.find(findById(i));
                if(boss){
                    var bossStatistics = enhanceBossData(boss,true);
                    if(bossStatistics){
                        if(mythicDungeon[getInstanceName(boss.name)]){
                            mythicDungeon[getInstanceName(boss.name)].push(bossStatistics);
                        }else{
                            mythicDungeon[getInstanceName(boss.name)]=[bossStatistics];
                        }
                    }
                }
            }
            var emeraldNightmare = {};
            for(var i=10911; i<=10939;i++){
                var boss = bossData.find(findById(i));
                if(boss){
                    var bossStatistics = enhanceBossData(boss);
                    if(emeraldNightmare[getName(boss.name)]){
                        emeraldNightmare[getName(boss.name)].push(bossStatistics);
                    }else{
                        emeraldNightmare[getName(boss.name)]=[bossStatistics];
                    }
                }
            }
            var nighthold = {};
            for(var i=10940; i<=10980;i++){
                var boss = bossData.find(findById(i));
                if(boss){
                    var bossStatistics = enhanceBossData(boss);
                    if(nighthold[getName(boss.name)]){
                        nighthold[getName(boss.name)].push(bossStatistics);
                    }else{
                        nighthold[getName(boss.name)]=[bossStatistics];
                    }
                }
            }
            var trialOfValor = {};
            for(var i=11407; i<=11418;i++){
                var boss = bossData.find(findById(i));
                if(boss){
                    var bossStatistics = enhanceBossData(boss);
                    if(trialOfValor[getName(boss.name)]){
                        trialOfValor[getName(boss.name)].push(bossStatistics);
                    }else{
                        trialOfValor[getName(boss.name)]=[bossStatistics];
                    }
                }
            }

            res.jsonp({
                'status':'ok',
                'name' : statisticsData.name,
                'realm' : statisticsData.realm,
                'staticThumbnail' : 'https://render-api-eu.worldofwarcraft.com/static-render/eu/' + statisticsData.thumbnail,
                'thumbnail' : 'http://render-eu.worldofwarcraft.com/character/' + statisticsData.thumbnail,
                'class': statisticsData.class,
                'averageItemLevel': statisticsData.items.averageItemLevel,
                'averageItemLevelEquipped': statisticsData.items.averageItemLevelEquipped,
                'progress' : {
                    'mythicDungeon' : mythicDungeon,
                    'emeraldNightmare' : emeraldNightmare,
                    'trialOfValor' : trialOfValor,
                    'nighthold' : nighthold
                }
            });
        }else{
            if(statisticsData && statisticsData.status){
                res.jsonp({
                    'status':'nok',
                    'reason': statisticsData.reason});
            }else{
                res.jsonp({
                    'status':'nok',
                    'reason': 'Unable to connect to the api'});
            }
        }
    });
});

module.exports = router;
