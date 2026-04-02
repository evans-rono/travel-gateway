// app_server/controllers/travel.js
const Trip = require('../../app_api/models/travlr');

const travelList = async (req, res) => {
  try {
    const trips = await Trip.find({}).sort({ start: 1 }).lean();
    res.render('travel', {
      title: 'Travlr Getaways | Travel',
      pageHeader: { title: 'Travel Packages', strapline: 'Find your perfect getaway' },
      trips: trips
    });
  } catch (error) {
    res.status(500).render('error', { message: 'Unable to load travel packages.' });
  }
};

const travelDetail = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      code: req.params.code.toUpperCase()
    }).lean();

    if (!trip) {
      return res.status(404).render('error', { message: 'Trip not found.' });
    }

    res.render('travel-detail', {
      title: `Travlr Getaways | ${trip.name}`,
      trip: trip
    });

  } catch (error) {
    res.status(500).render('error', { message: 'Unable to load trip details.' });
  }
};

module.exports = { travelList, travelDetail };