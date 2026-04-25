// Router for travel page
var express = require('express');
var router = express.Router();
var controller = require('../controllers/travel');
//GET travel page
router.get('/', controller.travel);
// expose the travel controller
module.exports = router;