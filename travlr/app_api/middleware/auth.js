// app_api/middleware/auth.js
const passport = require('passport');

// Middleware that protects a route with JWT verification
const requireAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {

    if (err)   return next(err);

    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized — valid token required'
      });
    }

    // Attach user to request so controllers can access it
    req.user = user;
    next();

  })(req, res, next);
};

// Middleware that restricts to admin role only
const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      message: 'Forbidden — admin access required'
    });
  }
  next();
};

module.exports = { requireAuth, requireAdmin };