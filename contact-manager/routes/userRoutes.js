const express = require('express');
const tokenValidator = require('../middleware/tokenValidationHandler');
const {registerUser, loginUser, currentUser} = require('../controllers/userController');
const router = express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.get('/current', tokenValidator, currentUser);

module.exports = router;