const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const MONGODB_URI= "mongodb+srv://db_user_read:LdmrVA5EDEv4z3Wr@cluster0.n10ox.mongodb.net/RQ_Analytics?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

app.use(express.json());

// Import routes
const analyticsRoutes = require('./routes');
app.use('/api', analyticsRoutes);

// Export the Express app as a module for Vercel
module.exports = app;

