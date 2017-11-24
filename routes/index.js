'use strict';
const path = require('path');
const express = require('express');
const getProgressController = require(path.resolve('controllers','getProgress'));
const getGuildToonsController = require(path.resolve('controllers','getGuildToons'));
const getToonController = require(path.resolve('controllers','getToon'));
const router = express.Router();

module.exports = router;

router.get('/bnet/progress/:server/:name', getProgressController);
router.get('/bnet/guild/:server/:name', getGuildToonsController);
router.get('/bnet/toon/:server/:name', getToonController);
module.exports = router;


router.get('*', function (req, res) {
    res.sendFile(path.resolve('public', 'index.html'));
});
