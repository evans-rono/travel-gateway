// app_api/models/travlr.js
const mongoose = require('mongoose');

// Schema — defines what every trip document must look like
const tripSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Trip code is required'],
      unique: true,
      trim: true,
      uppercase: true
    },
    name: {
      type: String,
      required: [true, 'Trip name is required'],
      trim: true
    },
    length: {
      type: String,
      required: [true, 'Trip length is required']
    },
    start: {
      type: Date,
      required: [true, 'Start date is required']
    },
    resort: {
      type: String,
      required: [true, 'Resort name is required'],
      trim: true
    },
    perPerson: {
      type: Number,
      required: [true, 'Per person price is required'],
      min: [0, 'Price cannot be negative']
    },
    image: {
      type: String,
      required: [true, 'Image filename is required']
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    }
  },
  {
    timestamps: true // automatically adds createdAt and updatedAt fields
  }
);

// Model — the interface for querying the 'trips' collection
const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;