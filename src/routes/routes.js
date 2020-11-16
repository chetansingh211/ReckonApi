const express = require('express');
const router = express.Router();

//Import controllers which hold CRUD methods foreach models
const controllers = require('../controllers/controllers');

//orders
router.get('/', controllers.getNumberRangeInfo);
router.get('/textToSearch', controllers.textToSearch);

module.exports = router;