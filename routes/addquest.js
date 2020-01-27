const express = require('express');
const router = express.Router();
const session = require('../session');


router.get("/", (req, res) => {
    if(!session.isLogged(req, "admin")){
        res.redirect("../../login/admin");
    }
    res.render("addquest");
});


module.exports = router;