// Requirements
const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const oaiRouter = require('./routes/oaiRoutes');
// dotenv.config();

// Working variables
const port = 3000;
const app = express();

// Middleware Functions 
// Body parser init
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Frontend public assets
app.use(express.static(path.join(__dirname, 'public')));

// OpenAI init
app.use('/openai', oaiRouter);

app.listen(port, () => {
    console.log(`Server listening to port: ${port}`);
})

