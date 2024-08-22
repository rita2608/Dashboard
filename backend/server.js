const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

app.use(express.json());

// Import routes
const analyticsRoutes = require('./routes/analytics');
app.use('/api', analyticsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
