var express    = require('express');
var router     = express.Router();
var controller = require('../controllers/reservations');

router.get('/',     controller.reservationsList);
router.get('/:code', controller.reservationDetail);
module.exports = router; 
