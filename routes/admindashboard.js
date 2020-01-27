const express = require('express');
const router = express.Router();
const session = require('../session');


router.get("/dashboard", (req, res) => {
    if(!session.isLogged(req, "admin")){
        res.redirect("../../login/admin");
    }
    res.render("admindashboard");
});

module.exports = router;