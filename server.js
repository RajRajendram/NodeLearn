const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const {connectDB} = require('./config/db');


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

//Routes


// Connect to MongoDB
connectDB();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});