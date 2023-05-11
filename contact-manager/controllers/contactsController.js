const asyncHandler = require('express-async-handler');
const { emit } = require('../models/contactModel');
const Contact = require('../models/contactModel');

// @desc Create contact
// @route POST /api/contacts
// @access private 
const createContact = asyncHandler(async(req, res) => {
    const {name, phone, email} = req.body;
    if(!name || !phone || !email){
        res.status(400);
        throw new Error('All fields are mandatory');
    }
    const contact = await Contact.create({
        user_id: req.user.id,
        name: name, 
        phone: phone,
        email: email,
    });
    res.status(200).json(contact);
});

// @desc Get all contacts
// @route GET /api/contacts
// @access private 
const getAllContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

// @desc Get 'id' contact
// @route GET /api/contacts/:id
// @access private 
const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.find({_id: req.params.id});
    // const contact = await Contact.find({user_id: req.user.id, _id: new ObjectId(req.params.id)});
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id != req.user.id){
        res.status(403);
        throw new Error("User not authorized to read");
    }
    
    res.status(200).json(contact);
});

// @desc Update 'id' contact
// @route GET /api/contacts/:id
// @access private 
const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id != req.user.id){
        res.status(403);
        throw new Error("User not authorized to update");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true} 
    );
    res.status(200).json(updatedContact);
});

// @desc Delete 'id' contact
// @route DELETE /api/contacts/:id
// @access public 
const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id != req.user.id){
        res.status(403);
        throw new Error("User not authorized to delete");
    }
    await contact.deleteOne();
    res.status(200).json(contact);
});

module.exports = {
    createContact,  // C
    getAllContacts, // R
    getContact,     // R
    updateContact,  // U
    deleteContact   // D
};