var express = require('express');
var router = express.Router();

// Mock authentication - in production, use proper user validation
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  
  // Mock successful login
  res.status(200).json({ 
    message: 'Login successful',
    user: { email }
  });
});

router.post('/signup', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }
  
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }
  
  // Mock successful signup
  res.status(201).json({ 
    message: 'Account created successfully',
    user: { name, email }
  });
});

module.exports = router;