const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');

// Init Database
connectDb();

// Init Server
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Body parser
app.use('/api/contacts', require('./routes/contactsRoutes')); // Contacts API
app.use('/api/users', require('./routes/userRoutes'));
app.use(require('./middleware/errorHandler')); // Error Handler

// Start Server
app.listen(port, () => {
    console.log(`[Server] Listening: port ${port}`);
});

