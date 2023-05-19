const express = require('express');
const Article = require('../models/articleModel');

const createArticle = async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description, 
        markdown: req.body.markdown
    });
    try {
        article = await article.save();
        console.log("Created new article: ", article);
        res.redirect(`/articles/${article.id}`);
    } catch (error) {
        console.log(error);
        res.render('articles/new', {article: article});
    }
};

const getArticleById = async (req, res) => {
    const article = await Article.findById(req.params.id);
    if(!article){
        console.log("Article not found");
        res.redirect('/');
    }
    res.render('articles/show', {article: article});
};

const renderEditForm = async (req, res) => {
    const article = await Article.findById(req.params.id);
    if (!article){
        console.log("Article not found");
        res.redirect('/');
    }
    console.log("Edit mode:", article);
    res.render('articles/edit', {article: article});
};

const updateArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        const {title, description, markdown} = req.body;
        const updatedArticle = await Article.findByIdAndUpdate(
            articleId, 
            {
                title: title, 
                description: description, 
                markdown: markdown 
            });
        console.log("Updated article: ", updatedArticle);
        res.redirect(`/articles/${articleId}`);
    } catch (error) {
        console.log(error);
        res.render('articles/edit', {article: req.body});
    }
};

const deleteArticle = async (req, res) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);
        console.log("Deleted article: ", deletedArticle);
        res.redirect('/');
    } catch (error) {
        console.log(error)
        res.redirect('/');
    }


};

module.exports = {
    createArticle, 
    getArticleById,
    renderEditForm,
    updateArticle,
    deleteArticle
};
