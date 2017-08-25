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
        }
    }
    function hasChallengingLoot(achievements){
        return achievements.find(findValue(11611));
    }
    function getAudit(){
        return true;
    }
    function getTraitsCount(items){
        let total = 0;
        items.mainHand.artifactTraits.forEach(function(trait){
            total += trait.rank;
        });
        total -= items.mainHand.relics.length;
        return total;
    }
    blizzard.wow.character(['achievements', 'items'], { realm: req.params.server, name: req.params.name, origin: config.bnet.region })
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
            };
            res.jsonp(toon);
        }).catch(error => {
        console.log(error);
        res.status(error.response.status).jsonp({status: error.response.status , message: error.response.statusText});
    });
};