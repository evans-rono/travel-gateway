// app_api/routes/index.js
const express    = require('express');
const router     = express.Router();
const tripsCtrl  = require('../controllers/trips');
const authCtrl   = require('../controllers/authentication');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// ── Auth Routes — public (no token needed) ────────────────
router.post('/register', authCtrl.register);
router.post('/login',    authCtrl.login);

// ── Profile Route — protected ─────────────────────────────
router.get('/me', requireAuth, authCtrl.getProfile);

// ── Trip Routes ───────────────────────────────────────────
// GET is public — customers can browse trips
// POST, PUT, DELETE are protected — admins only
router
  .route('/trips')
  .get(tripsCtrl.getAllTrips)                          // public
  .post(requireAuth, requireAdmin, tripsCtrl.createTrip); // protected

router
  .route('/trips/:tripCode')
  .get(tripsCtrl.getTripByCode)                           // public
  .put(requireAuth,    requireAdmin, tripsCtrl.updateTrip)   // protected
  .delete(requireAuth, requireAdmin, tripsCtrl.deleteTrip);  // protected

module.exports = router;