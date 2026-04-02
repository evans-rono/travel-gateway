// app_api/controllers/authentication.js
const passport = require('passport');
const jwt      = require('jsonwebtoken');
const User     = require('../models/user');

// ── Helper — generate a JWT token ────────────────────────
const generateToken = (user) => {
  return jwt.sign(
    {
      sub:   user._id,    // subject — who the token belongs to
      email: user.email,
      role:  user.role,
      name:  user.name
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
};

// ── POST /api/register ────────────────────────────────────
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ email: email?.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create new user — password is hashed by the pre-save hook
    const user  = await User.create({ name, email, password, role: 'admin' });
    const token = generateToken(user);

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email,
        role:  user.role
      }
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation failed',
        errors:  Object.values(error.errors).map(e => e.message)
      });
    }
    res.status(500).json({
      message: 'Registration failed',
      error:   error.message
    });
  }
};

// ── POST /api/login ───────────────────────────────────────
const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    // Server error
    if (err) return next(err);

    // Wrong credentials
    if (!user) {
      return res.status(401).json({
        message: info?.message || 'Login failed'
      });
    }

    // Success — generate and return token
    const token = generateToken(user);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email,
        role:  user.role
      }
    });

  })(req, res, next);
};

// ── GET /api/me ───────────────────────────────────────────
// Returns the currently logged-in user's profile
// This route is protected — requires a valid JWT
const getProfile = (req, res) => {
  res.status(200).json({
    user: {
      id:    req.user._id,
      name:  req.user.name,
      email: req.user.email,
      role:  req.user.role
    }
  });
};

module.exports = { register, login, getProfile };