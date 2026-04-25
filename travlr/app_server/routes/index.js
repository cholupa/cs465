var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main');
/* GET home page. via the main router targeting index*/
router.get('/', ctrlMain.index);
// expose the main controller
module.exports = router;
