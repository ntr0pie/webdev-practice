const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const tokenValidator = asyncHandler(async(req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, "ntr0pie123", (err, decoded) => {
            if(err){
                console.log(err);
                res.status(401);
                throw new Error("User is not authorized");
            }
            req.user = decoded.user;  
            next();
        });

        if(!token){
            res.status(401);
            throw new Error("Token Missing || User not authorized");
        }
    }
    else{
        console.log("Please login");
        throw new Error("Please login");
    }
});

module.exports = tokenValidator;