const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const authRouters = require('./routes/auth.routes');
const userRouters = require('./routes/user.routes');

// Create express app
const app = express();

// Middleware
app.use(cors()); // Activer CORS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRouters);
app.use('/api/user', userRouters);

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.log(err);
    });

// Create server port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});