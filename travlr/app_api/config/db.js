// app_api/config/db.js
const mongoose = require('mongoose');
const dns = require('dns');

// Work around local resolver issues with mongodb+srv lookups on some networks.
const dnsServers = (process.env.DNS_SERVERS || '8.8.8.8,1.1.1.1')
  .split(',')
  .map((server) => server.trim())
  .filter(Boolean);
dns.setServers(dnsServers);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1); // stop the app if DB connection fails
  }
};

module.exports = connectDB;