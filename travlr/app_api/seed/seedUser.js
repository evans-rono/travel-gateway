// app_api/seed/seedUser.js
require('dotenv').config();
const mongoose = require('mongoose');
const User     = require('../models/user');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB...');

    // Remove existing admin
    await User.deleteOne({ email: 'admin@travlr.com' });

    // Create admin user — password is auto-hashed by pre-save hook
    const admin = await User.create({
      name:     'Travlr Admin',
      email:    'admin@travlr.com',
      password: 'Admin1234!',
      role:     'admin'
    });

    console.log(`Admin created: ${admin.email}`);
    console.log('Login credentials:');
    console.log('  Email:    admin@travlr.com');
    console.log('  Password: Admin1234!');

  } catch (error) {
    console.error('Error seeding admin:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Done.');
  }
};

seedAdmin();