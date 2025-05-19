const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

const userRoutes = require('./routes/contactRoutes'); 
app.use('/api/users', userRoutes);

module.exports = app;
