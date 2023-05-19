const express = require('express');
const slugify = require('slugify');
const Article = require('../models/articleModel');
const cdp = require('dompurify');
const {JSDOM} = require('jsdom');
const domPurify = cdp(new JSDOM().window);
const {marked} = require('marked');

const createArticle = async (req, res) => {
    if (req.body.markdown){
        sanitzedHtml = domPurify.sanitize(marked(req.body.markdown));
    }
    let article = new Article({
        title: req.body.title,
        description: req.body.description, 
        markdown: req.body.markdown,
        sanitzedHtml: sanitzedHtml
    });
    try {
        article = await article.save();
        console.log("Created new article: ", article);
        res.redirect(`/articles/${article.slug}`);
    } catch (error) {
        console.log(error);
        res.render('articles/new', {article: article});
    }
};

const getArticleById = async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug});
    if(!article){
        console.log("Article not found");
        res.redirect('/');
    }
    res.render('articles/show', {article: article});
};

const renderEditForm = async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug});
    if (!article){
        console.log("Article not found");
        res.redirect('/');
    }
    console.log("Edit mode:", article);
    res.render('articles/edit', {article: article});
};

const updateArticle = async (req, res) => {
    try {
        const {title, description, markdown} = req.body;
        const article = await Article.findOne({slug: req.params.slug});
        if (markdown){
            sanitzedHtml = domPurify.sanitize(marked(markdown));
        }

        // Update slug if new title != old title
        if(title != article.title){
            slug = slugify(title, {lower: true, strict: true});
        }
        else{
            slug = article.slug;
        }

  

        const updatedArticle = await Article.updateOne(
            {
                slug: req.params.slug
            },
            {
                title: title, 
                description: description, 
                markdown: markdown,
                slug: slug,
                sanitzedHtml: sanitzedHtml
            });
        console.log("Updated article: ", updatedArticle);
        res.redirect(`/articles/${slug}`);
    } catch (error) {
        console.log(error);
        res.render('articles/edit', {article: req.body});
    }
};

const deleteArticle = async (req, res) => {
    try {
        const deletedArticle = await Article.findOneAndDelete({slug: req.params.slug});
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
