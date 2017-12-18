'use strict';

const config = require('../config/config.js');
const blizzard = require('blizzard.js').initialize({ apikey: config.bnet.apikey });

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
    function hasChallengingLoot(achievements){
        return achievements.find(findValue(11611));
    }
    function getAudit(items){
        const LEGENDARY_ILVL = 970;
        const SOCKETED = 1808;
        let legendary = 0;

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
                //Check legendary items
                if(items[key].hasOwnProperty('quality') && items[key].quality === 5){
                    legendary+=1;
                    if(items[key].itemLevel < LEGENDARY_ILVL){
                        audit.problems.push({'icon': items[key].icon,'name': items[key].name, slot:key, 'message': 'Legendary not upgraded', 'type': 'danger'});
                    }
                }
                //Check socket
                if(items[key].hasOwnProperty('bonusLists') && items[key].bonusLists.find(findValue(SOCKETED))){
                    if(items[key].hasOwnProperty('tooltipParams') && items[key].tooltipParams.hasOwnProperty('gem0')){
                        if(gemLow.indexOf(items[key].tooltipParams.gem0)>= 0){
                            audit.problems.push({'icon': items[key].icon,'name': items[key].name, slot:key, 'message': 'Low gem', 'type': 'warning'});
                        }else if(gemHigh.indexOf(items[key].tooltipParams.gem0) === -1 && gemEpic.indexOf(items[key].tooltipParams.gem0) === -1){
                            audit.problems.push({'icon': items[key].icon,'name': items[key].name, slot:key, 'message': 'No or unknown gem', 'type': 'danger'});
                        }
                    }else{
                        audit.problems.push({'icon': items[key].icon,'name': items[key].name, slot:key, 'message': 'No gem', 'type': 'danger'});
                    }
                }

                //Check enchant
                const slotWithEnchant = ['neck','back','finger1','finger2'];
                if(slotWithEnchant.indexOf(key) >= 0){
                    if(items[key].hasOwnProperty('tooltipParams') && items[key].tooltipParams.hasOwnProperty('enchant')){
                        if(enchantLow.indexOf(items[key].tooltipParams.enchant) >= 0){
                            audit.problems.push({'icon': items[key].icon,'name': items[key].name, slot:key, 'message': 'Low enchant', 'type': 'warning'});
                        }else if(enchantHigh.indexOf(items[key].tooltipParams.enchant) === -1){
                            audit.problems.push({'icon': items[key].icon,'name': items[key].name, slot:key, 'message': 'No or unknown enchant', 'type': 'danger'});
                        }
                    }else{
                        audit.problems.push({'icon': items[key].icon,'name': items[key].name, slot:key, 'message': 'No enchant', 'type': 'danger'});
                    }
                }
            }
        }
        if(legendary < 2){
            audit.problems.push({'icon': 'inv_misc_necklace15',slot:'legendary', 'message': "Not enough: "+legendary, 'type': 'danger'});
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
    function getTraitsCount(items){
        let total = 0;
        if(items.hasOwnProperty('mainHand') && items.mainHand.hasOwnProperty('artifactTraits')) {
            items.mainHand.artifactTraits.forEach(function (trait) {
                total += trait.rank;
            });
        }
        if(items.hasOwnProperty('offHand') && items.offHand.hasOwnProperty('artifactTraits')){
            items.offHand.artifactTraits.forEach(function(trait){
                total += trait.rank;
            });
        }
        total -= items.mainHand.relics.length;
        return total;
    }
    blizzard.wow.character(['achievements', 'items','talents'], { realm: req.params.server, name: req.params.name, origin: config.bnet.region })
        .then(response => {
            let toonInfo = response.data;
            let toon = {
                'name': toonInfo.name,
                'realm': toonInfo.realm,
                'staticThumbnail': 'https://render-api-eu.worldofwarcraft.com/static-render/eu/' + toonInfo.thumbnail,
                'thumbnail': 'http://render-eu.worldofwarcraft.com/character/' + toonInfo.thumbnail,
                'class': toonInfo.class,
                'averageItemLevel' : toonInfo.items.averageItemLevel,
                'averageItemLevelEquipped' : toonInfo.items.averageItemLevelEquipped,
                'challengingLook' : hasChallengingLoot(toonInfo.achievements.achievementsCompleted),
                'audit' : getAudit(toonInfo.items),
                'artifactTrait' : getTraitsCount(toonInfo.items),
                'spec': getSpec(toonInfo.talents),
                'iconPath': 'https://render-eu.worldofwarcraft.com/icons/56/',
            };
            res.jsonp(toon);
        }).catch(error => {
        console.log(error);
        res.status(error.response.status).jsonp({status: error.response.status , message: error.response.statusText});
    });
};