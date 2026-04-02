var express    = require('express');
var router     = express.Router();
var controller = require('../controllers/news');

router.get('/', controller.newsList);
module.exports = router; 
