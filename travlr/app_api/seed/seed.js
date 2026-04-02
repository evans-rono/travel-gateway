// app_api/seed/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const dns      = require('dns');
const fs       = require('fs');
const path     = require('path');
const Trip     = require('../models/travlr');

// Work around local resolver issues with mongodb+srv lookups on some networks.
const dnsServers = (process.env.DNS_SERVERS || '8.8.8.8,1.1.1.1')
  .split(',')
  .map((server) => server.trim())
  .filter(Boolean);
dns.setServers(dnsServers);

// Read the JSON seed data
const tripsData = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../../data/trips.json'),
    'utf-8'
  )
);

// Connect and seed
const seedDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing trips to avoid duplicates
    await Trip.deleteMany({});
    console.log('Existing trips cleared.');

    // Insert all trips from JSON file
    const inserted = await Trip.insertMany(tripsData);
    console.log(`Successfully seeded ${inserted.length} trips.`);

    // Show what was inserted
    inserted.forEach(trip => {
      console.log(`  ✓ ${trip.code} — ${trip.name} ($${trip.perPerson})`);
    });

  } catch (error) {
    console.error('Seeding failed:', error.message);
  } finally {
    // Always disconnect when done
    await mongoose.disconnect();
    console.log('Database disconnected. Seeding complete.');
  }
};

seedDB();