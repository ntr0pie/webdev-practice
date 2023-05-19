const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is mandatory"],
    },
    description: {
        type: String, 
    },
    markdown: {
        type: String,
        required: [true, "Markdown is mandatory"],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Article', articleSchema);

