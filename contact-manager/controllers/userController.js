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
        const {userName, email, password} = req.body;
        if(!userName || !password || !email){
            res.status(400);
            throw new Error("All fields are mandatory");
        }

        const userAvailable = await User.findOne({email: email});
        if(userAvailable){
            console.log("Email already registered!");
            throw new Error("Email already registered!");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            userName,
            email,
            password: hashedPassword,
        });

        if(user){
            console.log(`User created ${user}`);
            res.status(201).json({
                    id: user.id,
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
                        id: user.id,
                        userName: user.userName,
                        email: user.email,
                    }
                },
                "ntr0pie123",
                { expiresIn: "15m" }
            );
            console.log({status: "Login Succesful", accessToken: atk});
            res.status(200).json({status: "Login Succesful", accessToken: atk});
        } else {
            console.log("Email or password isn't valid");
            res.status(401).json("Email or password isn't valid");
        }
    }
);

//@desc Current user info
//@route /api/users/current
//@access private
const currentUser = asyncHandler(
    async(req, res) => {
        res.status(200).json(req.user);
    }
);

module.exports = {
    registerUser, loginUser, currentUser
};