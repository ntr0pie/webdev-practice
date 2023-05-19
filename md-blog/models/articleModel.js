const mongoose = require('mongoose');
const slugify = require('slugify');

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
    },
    slug: {
        type: String, 
        required: true, 
        unique: true
    },
    sanitzedHtml: {
        type: String, 
        required: true
    }
});

articleSchema.pre('validate', function(next){

    if(this.title){
        this.slug = slugify(this.title, {lower: true, strict: false});
    }
    next();
})

module.exports = mongoose.model('Article', articleSchema);