var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
  const { fullName, email, phone, guests, tripCode } = req.body;
  
  if (!fullName || !email || !phone || !guests || !tripCode) {
    return res.status(400).json({ message: 'All fields required' });
  }
  
  // Mock successful booking
  res.status(201).json({ 
    message: 'Booking confirmed successfully!',
    reservation: { 
      id: Date.now(),
      fullName, 
      email, 
      phone,
      guests,
      tripCode,
      bookingDate: new Date()
    }
  });
});

module.exports = router;