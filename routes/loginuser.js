const express = require('express');
const router = express.Router();
const model = require('../model');
const sha256 = require('sha256');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const session = require('../session');

dotenv.config();

const User = model.User;

const getUsers = (email, password) => {
    return User.count({where: {email: email, password: password}});
}

const getUserID = (email) => {
    return User.findOne({where: {email: email}});
}


router.post("/login", (req, res) => {
    if(session.isLogged(req, "user")) {
        res.redirect("../../user/dashboard");
    }
    var email = req.body.email;
    var password = req.body.password;
    var hashed_pass = sha256(password);
    getUsers(email, hashed_pass).then((count) => {
        if(count == 1){
            getUserID(email).then(user => {
                jwt_hash = jwt.sign({user_id: user.get('user_id')}, process.env.JWT_SECRET);
                res.cookie("jwttoken", jwt_hash, {httpOnly: true}); //make a HTTPONLY cookie
                res.redirect("/user/dashboard");
            })
        } else {
            res.status(200).send("Invalid Credentials");
        }
    })
})

module.exports = router;