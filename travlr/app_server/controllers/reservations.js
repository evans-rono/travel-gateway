// app_server/controllers/reservations.js
const Trip = require('../../app_api/models/travlr');

const reservationsList = (req, res) => {
  res.render('reservations', {
    title: 'Travlr Getaways | Reservations',
    pageHeader: {
      title:     'My Reservations',
      strapline: 'View and manage your bookings'
    }
  });
};

const reservationDetail = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      code: req.params.code.toUpperCase()
    }).lean();

    if (!trip) {
      return res.status(404).render('error', { message: 'Trip not found.' });
    }

    res.render('reservation-form', {
      title: `Book: ${trip.name}`,
      pageHeader: { title: 'Complete Your Booking' },
      trip: trip
    });

  } catch (error) {
    res.status(500).render('error', { message: 'Unable to load reservation.' });
  }
};

module.exports = { reservationsList, reservationDetail }; 
