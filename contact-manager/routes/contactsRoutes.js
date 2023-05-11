const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactsController');
const tokenValidator = require('../middleware/tokenValidationHandler');

router.use(tokenValidator); // Auth MW
router.route('/')
    .get(contactController.getAllContacts)
    .post(contactController.createContact);

router.route('/:id')
    .get(contactController.getContact)
    .put(contactController.updateContact)
    .delete(contactController.deleteContact);

module.exports = router;