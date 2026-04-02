// app_api/controllers/trips.js
const Trip = require('../models/travlr');

// ─────────────────────────────────────────────
// GET /api/trips
// Returns all trips as JSON
// ─────────────────────────────────────────────
const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find({}).sort({ start: 1 }).lean();

    if (!trips || trips.length === 0) {
      return res.status(404).json({
        message: 'No trips found'
      });
    }

    res.status(200).json(trips);

  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving trips',
      error:   error.message
    });
  }
};

// ─────────────────────────────────────────────
// GET /api/trips/:tripCode
// Returns one trip by its code
// ─────────────────────────────────────────────
const getTripByCode = async (req, res) => {
  try {
    const trip = await Trip
      .findOne({ code: req.params.tripCode.toUpperCase() })
      .lean();

    if (!trip) {
      return res.status(404).json({
        message: `Trip with code ${req.params.tripCode} not found`
      });
    }

    res.status(200).json(trip);

  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving trip',
      error:   error.message
    });
  }
};

// ─────────────────────────────────────────────
// POST /api/trips
// Creates a new trip
// ─────────────────────────────────────────────
const createTrip = async (req, res) => {
  try {
    // Check if a trip with this code already exists
    const existing = await Trip.findOne({
      code: req.body.code?.toUpperCase()
    });

    if (existing) {
      return res.status(400).json({
        message: `Trip with code ${req.body.code} already exists`
      });
    }

    // Create new trip from request body
    const newTrip = await Trip.create({
      code:        req.body.code,
      name:        req.body.name,
      length:      req.body.length,
      start:       req.body.start,
      resort:      req.body.resort,
      perPerson:   req.body.perPerson,
      image:       req.body.image,
      description: req.body.description
    });

    res.status(201).json(newTrip); // 201 = Created

  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation failed',
        errors:  Object.values(error.errors).map(e => e.message)
      });
    }

    res.status(500).json({
      message: 'Error creating trip',
      error:   error.message
    });
  }
};

// ─────────────────────────────────────────────
// PUT /api/trips/:tripCode
// Updates an existing trip
// ─────────────────────────────────────────────
const updateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode.toUpperCase() }, // find by code
      {                                             // fields to update
        name:        req.body.name,
        length:      req.body.length,
        start:       req.body.start,
        resort:      req.body.resort,
        perPerson:   req.body.perPerson,
        image:       req.body.image,
        description: req.body.description
      },
      {
        new:       true,  // return the UPDATED document, not the old one
        runValidators: true // run schema validators on the update
      }
    ).lean();

    if (!updatedTrip) {
      return res.status(404).json({
        message: `Trip with code ${req.params.tripCode} not found`
      });
    }

    res.status(200).json(updatedTrip);

  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation failed',
        errors:  Object.values(error.errors).map(e => e.message)
      });
    }

    res.status(500).json({
      message: 'Error updating trip',
      error:   error.message
    });
  }
};

// ─────────────────────────────────────────────
// DELETE /api/trips/:tripCode
// Deletes a trip by its code
// ─────────────────────────────────────────────
const deleteTrip = async (req, res) => {
  try {
    const deleted = await Trip.findOneAndDelete({
      code: req.params.tripCode.toUpperCase()
    });

    if (!deleted) {
      return res.status(404).json({
        message: `Trip with code ${req.params.tripCode} not found`
      });
    }

    res.status(200).json({
      message: `Trip ${req.params.tripCode} successfully deleted`,
      deleted: deleted
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error deleting trip',
      error:   error.message
    });
  }
};

module.exports = {
  getAllTrips,
  getTripByCode,
  createTrip,
  updateTrip,
  deleteTrip
};