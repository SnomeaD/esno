'use strict';
const path = require('path');
const express = require('express');
const getProgressController = require(path.resolve('controllers','getProgress'));
const getGuildToonsController = require(path.resolve('controllers','getGuildToons'));
const getToonController = require(path.resolve('controllers','getToons'));
const router = express.Router();

module.exports = router;

router.get('/progress/:server/:name', getProgressController);
router.get('/guild/:server/:name', getGuildToonsController);
router.get('/character/:server/:name', getToonController);

module.exports = router;
