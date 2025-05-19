const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 81;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/wealthnx-website";

mongoose.connect(MONGO_URI, {
})
  .then(() => {
    console.log(' MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on:${PORT}`);
    });
  })
  .catch(err => {
    console.error(' MongoDB connection error:', err.message);
    process.exit(1);
  });
