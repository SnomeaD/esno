'use strict';
const path = require('path');
const express = require('express');
const getGuildToonsController = require(path.resolve('controllers','getGuildToons'));
const getToonController = require(path.resolve('controllers','getToon'));
const router = express.Router();

module.exports = router;

router.get('/bnet/guild/:server/:name', getGuildToonsController);
router.get('/bnet/toon/:server/:name', getToonController);
module.exports = router;


router.get('*', function (req, res) {
    res.sendFile(path.resolve('dist', 'index.html'));
});
