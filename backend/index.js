const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI,, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

app.use(express.json());

// Import routes
const analyticsRoutes = require('./routes/analytics');
app.use('/', analyticsRoutes);

// Export the Express app as a module for Vercel
module.exports = app;

