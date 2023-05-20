const { Router } = require('express');
const express = require('express');
const Article = require('../models/articleModel');
const {
    createArticle, 
    getArticleById, 
    renderEditForm, 
    updateArticle,
    deleteArticle
} = require('../controllers/articlesController');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article()});
})

router.get('/:slug', getArticleById);

router.delete('/:slug', deleteArticle);

router.post('/save', createArticle);

router.get('/edit/:slug', renderEditForm);

router.put('/:slug', updateArticle);

module.exports = router;