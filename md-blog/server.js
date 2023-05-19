const express = require('express');
const connectDb = require('./config/dbConnect');
const mongoose = require('mongoose');
const articleRoutes = require('./routes/articlesRoute');
const Article = require('./models/articleModel');
const methodOverride = require('method-override');

// Config
const app = express();
const port = process.env.PROCESS || 3000;
connectDb(); // Database

app.set('view engine', 'ejs'); // Template engine

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.use('/articles', articleRoutes); // Articles Routes
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'});
    res.render('articles/index', {
        articles: articles,
    });
})

// Start Server
app.listen(port, () => {
    console.log(`[Server] Listening to port ${port}`);
})