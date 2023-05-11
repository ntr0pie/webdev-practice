const asyncHandler = require('express-async-handler');
const { emit } = require('../models/contactModel');
const Contact = require('../models/contactModel');

// @desc Create contact
// @route POST /api/contacts
// @access public 
const createContact = asyncHandler(async(req, res) => {
    console.log('The request body is', req.body);
    const {name, phone, email} = req.body;
    if(!name || !phone || !email){
        res.status(400);
        throw new Error('All fields are mandatory');
    }
    const contact = Contact.create({
        name: name, 
        phone: phone,
        email: email
    });
    res.status(200).json({message: `Created contact: ${name}, ${phone}, ${email}`});
});

// @desc Get all contacts
// @route GET /api/contacts
// @access public 
const getAllContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find()
    res.status(200).json(contacts);
});

// @desc Get 'id' contact
// @route GET /api/contacts/:id
// @access public 
const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

// @desc Update 'id' contact
// @route GET /api/contacts/:id
// @access public 
const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
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
    res.status(200).json(contact);
    await contact.deleteOne();
});

module.exports = {
    createContact,  // C
    getAllContacts, // R
    getContact,     // R
    updateContact,  // U
    deleteContact   // D
};