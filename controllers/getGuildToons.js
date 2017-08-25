const config = require('../config/config.js');
const blizzard = require('blizzard.js').initialize({ apikey: config.bnet.apikey });

module.exports = function(req, res, next) {
    blizzard.wow.guild(['members'], { realm: req.params.server, guildName: req.params.guildName, origin: config.bnet.region })
        .then(response => {
            res.jsonp(response.data);
        }).catch(error => {
        console.log(error);
        res.status(error.response.status).jsonp({status: error.response.status , message: error.response.statusText});
    });
};