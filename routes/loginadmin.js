const express = require('express');
const router = express.Router();
const model = require('../model');
const sha256 = require('sha256');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const session = require('../session');

dotenv.config();

const Admin = model.Admin;

const getAdmins = (email, password) => {
    return Admin.count({where: {email: email, password: password}});
}


router.post("/login", (req, res) => {
    if(session.isLogged(req, "admin")) {
        res.redirect("../../admin/dashboard");
    }
    var email = req.body.email;
    var password = req.body.password;
    var hashed_pass = sha256(password);
    getAdmins(email, hashed_pass).then((count) => {
        if(count == 1){
                jwt_hash = jwt.sign({email: email}, process.env.JWT_SECRET);
                res.cookie("admintoken", jwt_hash, {httpOnly: true}); //make a HTTPONLY cookie
                res.redirect("/admin/dashboard");
        } else {
            res.status(200).send("Invalid Credentials");
        }
    })
})

module.exports = router;