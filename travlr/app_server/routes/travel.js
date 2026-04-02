var express    = require('express');
var router     = express.Router();
var controller = require('../controllers/travel');

router.get('/', controller.travelList);
router.get('/:code', controller.travelDetail);

module.exports = router;