const express = require('express');
const dotenv = require('dotenv');
const {connectDB} = require('./config/db');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

//Use the cors middleware to allow cors-origin request
app.use(cors());

//Routes
app.use('/api/v1/users', userRoutes);

// Connect to MongoDB
connectDB();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});