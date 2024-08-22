// const express = require('express');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// mongoose.connect('mongodb+srv://db_user_read:LdmrVA5EDEv4z3Wr@cluster0.n10ox.mongodb.net/RQ_Analytics?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected...'))
// .catch(err => console.log(err));

// app.use(express.json());

// // Import routes
// const analyticsRoutes = require('./routes');
// app.use('/api', analyticsRoutes);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const app = express();
const routes = require('./routes/analytics'); // Adjusted to point to the analytics route
const port = process.env.PORT || 3000;

app.use(express.json());

// Use your routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// 404 handling
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
