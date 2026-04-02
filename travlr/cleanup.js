const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./app_api/models/user');

async function cleanup() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const result = await User.deleteOne({ email: 'admin@travlr.com' });
    console.log('Deleted:', result);
    
    await mongoose.disconnect();
    console.log('Disconnected');
  } catch (error) {
    console.error('Error:', error);
  }
}

cleanup();
