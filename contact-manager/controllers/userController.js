const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const contactModel = require('../models/contactModel');

//@desc Register a user
//@route /api/users/register
//@access public
const registerUser = asyncHandler(
    async(req, res) => {
        const {username, email, password} = req.body;
        if(!username || !password || !email){
            res.status(400);
            throw new Error("All fields are mandatory");
        }

        const userAvailable = await User.findOne({email: email});
        if(userAvailable){
            throw new Error("User already registered!");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        if(user){
            console.log(`User created ${user}`);
            res.status(201).json({
                    _id: user.id,
                    email: user.email
                });
        }
        else{
            res.status(400);
            throw new Error("User data is not valid");
        }
    }
);

//@desc Login user
//@route /api/users/login
//@access public
const loginUser = asyncHandler(
    async(req, res) => {
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400);
            throw new Error("All fields are mandatory");
        }
        const user = await User.findOne({email: email});
        // Check if correct password
        if(user && (await bcrypt.compare(password, user.password))){
            const atk = jwt.sign(
                {
                    user: {
                        _id: user.id,
                        username: user.username,
                        email: user.email,
                    }
                },
                process.env.ATK_SECRET,
                { expiresIn: "1m" }
            );
            res.status(200).json({status: "Login Succesful", accessToken: atk});
        } else {
            res.status(401).json("Email or password isn't valid");
        }
    }
);

//@desc Current user info
//@route /api/users/current
//@access public
const currentUser = asyncHandler(
    async(res, req) => {
        res.status(200).json("Current user");
    }
);

module.exports = {
    registerUser, loginUser, currentUser
};