var express    = require('express');
var router     = express.Router();
var controller = require('../controllers/auth');

router.get('/login', controller.login);
router.get('/signup', controller.signup);

module.exports = router;