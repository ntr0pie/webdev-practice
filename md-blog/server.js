const express = require('express');
const app = express();
const port = process.env.PROCESS || 3000;
app.set('view engine', 'ejs');

// Routes
app.use('/articles', require('./routes/articles')); // Articles

app.get('/', (req, res) => {
    const articles = [
    {
        title: 'Test Article',
        createdAt: new Date(),
        description: 'Test description',
    },
    {
        title: 'Test Article 1',
        createdAt: new Date(),
        description: 'Test description 1',
    },];
    res.render('index', {
        articles: articles,
    });
})

app.listen(port, () => {
    console.log(`[Server] Listening to port ${port}`);
})