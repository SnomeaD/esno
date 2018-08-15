'use strict';

const config = require('../config/config.js');
const blizzard = require('blizzard.js').initialize({ apikey: config.bnet.apikey });
const axios = require('axios');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

module.exports = function(req, res, next) {
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
    function findValue(value){
        return function findValue(element){
            return element===value;
        };
    }
    function getAudit(items){
        const SOCKETED = 1808;
        let heartOfAzeroth = 0;
        let azeriteEmpoweredItem = 0;

        const gemLow = [130215, 130216, 130217, 130218];
        const gemHigh = [130219, 130220, 130221, 130222, 130246, 130247, 130248];
        const gemEpic = [151583,151584,151585,151580];
        const enchantLow = [5423, 5424, 5425, 5426, //ringEnchantLow
            5431, 5432, 5433, 5895]; //backEnchantLow
        const enchantHigh = [5891, 5437, 5438, 5889, 5439, 5890, //neckEnchantHigh
            5427, 5428, 5429, 5430, //ringEnchantHigh
            5434, 5435, 5436]; //backEnchantHigh
        let audit = {problems:[]};
        for(let key in items){
            if(items[key].hasOwnProperty('name')){
                //Check heartOfAzeroth items
                if(items[key].hasOwnProperty('quality') && items[key].quality === 6){
                    heartOfAzeroth = true;
                }
                //Check socket
                if(items[key].hasOwnProperty('bonusLists') && items[key].bonusLists.find(findValue(SOCKETED))){
                    if(items[key].hasOwnProperty('tooltipParams') && items[key].tooltipParams.hasOwnProperty('gem0')){
                        if(gemLow.indexOf(items[key].tooltipParams.gem0)>= 0){
                            audit.problems.push({'icon': items[key].icon,'name': items[key].name, 'slot':key, 'message': 'Low gem', 'type': 'warning'});
                        }else if(gemHigh.indexOf(items[key].tooltipParams.gem0) === -1 && gemEpic.indexOf(items[key].tooltipParams.gem0) === -1){
                            audit.problems.push({'icon': items[key].icon,'name': items[key].name, 'slot':key, 'message': 'No or unknown gem', 'type': 'danger'});
                        }
                    }else{
                        audit.problems.push({'icon': items[key].icon,'name': items[key].name, 'slot':key, 'message': 'No gem', 'type': 'danger'});
                    }
                }

                //Check enchant
                const slotWithEnchant = ['finger1', 'finger2', 'mainHand', 'offHand'];
                if(slotWithEnchant.indexOf(key) >= 0){
                    if(items[key].hasOwnProperty('tooltipParams') && items[key].tooltipParams.hasOwnProperty('enchant')){
                        if(enchantLow.indexOf(items[key].tooltipParams.enchant) >= 0){
                            audit.problems.push({'icon': items[key].icon,'name': items[key].name, 'slot':key, 'message': 'Low enchant', 'type': 'warning'});
                        }else if(enchantHigh.indexOf(items[key].tooltipParams.enchant) === -1){
                            audit.problems.push({'icon': items[key].icon,'name': items[key].name, 'slot':key, 'message': 'No or unknown enchant', 'type': 'danger'});
                        }
                    }else{
                        audit.problems.push({'icon': items[key].icon,'name': items[key].name, 'slot':key, 'message': 'No enchant', 'type': 'danger'});
                    }
                }
                //Check azeriteEmpoweredItem
                if(items[key].hasOwnProperty('azeriteEmpoweredItem') && items[key].azeriteEmpoweredItem.hasOwnProperty('azeritePowers') && items[key].azeriteEmpoweredItem.azeritePowers.length > 0){
                    azeriteEmpoweredItem++;
                }
            }
        }
        if(!heartOfAzeroth){
            audit.problems.push({'icon': 'inv_misc_necklace15','slot':'neck', 'message': 'Heart of Azeroth not equiped', 'type': 'danger'});
        }
        console.log(azeriteEmpoweredItem);
        if(azeriteEmpoweredItem < 3){
                audit.problems.push({
                    'icon': 'inv_heartofazeroth',
                    'slot':'azeriteEmpoweredItem',
                    'message': 'Not enough azerite empowered item (' + azeriteEmpoweredItem + ')',
                    'type': 'danger'
                });
            }
        return audit;
    }
    function getSpec(talents){
        let result = {};
        talents.forEach(function(talent){
            if(talent.hasOwnProperty('selected') && talent.selected){
                result = {name: talent.spec.name,
                        role: talent.spec.role,
                        icon: talent.spec.icon
                };
            }
        });
        return result;
    }
    function getAzeriteLevel(items){
        if(items.hasOwnProperty('neck') && items.neck.id === 158075) {
            return items.neck.azeriteItem.azeriteLevel;
        }
        return 0;
    }
    function getToon(realm,name,origin){
        return  blizzard.wow.character(['achievements', 'items','talents', 'progression'], { realm, name, origin })
            .then(response => {
                let toonInfo = response.data;
                let toon = {
                    'name': toonInfo.name,
                    'realm': toonInfo.realm,
                    'level': toonInfo.level,
                    'staticThumbnail': 'https://render-api-eu.worldofwarcraft.com/static-render/eu/' + toonInfo.thumbnail,
                    'thumbnail': 'http://render-eu.worldofwarcraft.com/character/' + toonInfo.thumbnail,
                    'class': toonInfo.class,
                    'averageItemLevel': toonInfo.items.averageItemLevel,
                    'averageItemLevelEquipped': toonInfo.items.averageItemLevelEquipped,
                    'audit': getAudit(toonInfo.items),
                    'azerite': getAzeriteLevel(toonInfo.items),
                    'spec': getSpec(toonInfo.talents),
                    'iconPath': 'https://render-eu.worldofwarcraft.com/icons/56/',
                    'progression': toonInfo.progression
                };
                return axios.get('https://raider.io/api/v1/characters/profile?region=' + origin + '&realm=' + realm + '&name=' + name + '&fields=mythic_plus_scores')
                    .then(response => {
                        toon.mmScore = response.data.mythic_plus_scores && response.data.mythic_plus_scores.all;
                        return toon;
                    })
                    .catch(_ => {
                        toon.mmScore = 0;
                        return toon;
                    });
            })
    }
    let origin = config.bnet.region;
    let realm = req.params.server;
    let name = req.params.name;
    myCache.get(origin + '-' + realm + '-' + name, function( err, cachedToon ) {
        if (!err) {
            if (cachedToon === undefined) {
                console.log(cachedToon + ' / ' + name);
                getToon(realm, name, origin).then(toon => {
                    myCache.set( origin + '-' + realm + '-' + name, toon);
                    console.log('live: '+ origin + '-' + realm + '-' + name);
                    res.jsonp(toon);
                }).catch(error => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        res.status(error.response.status).jsonp({
                            status: error.response.status,
                            message: error.response.headers
                        });
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                        res.status(500).jsonp({status: 500, message: error.response.request});
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        res.status(500).jsonp({status: 500, message: error});
                    }
                });
            } else {
                console.log('Cache:' + origin + '-' + realm + '-' + name);
                res.jsonp(cachedToon);
            }
        }else{
            console.log(err);
        }
    });
};