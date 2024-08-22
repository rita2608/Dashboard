const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
// const express = require('express');
const cors = require('cors');
// const app = express();
const app = express();

app.use(cors({ origin: 'https://dashboard-api-three.vercel.app/' }));

const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://db_user_read:LdmrVA5EDEv4z3Wr@cluster0.n10ox.mongodb.net/RQ_Analytics?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
