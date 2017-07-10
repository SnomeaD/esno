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

module.exports = router;
