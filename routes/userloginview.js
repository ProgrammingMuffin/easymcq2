const express = require('express');
const router = express.Router();


router.get("/user", (req, res) => {
    if(typeof(req.cookies.jwttoken) == "undefined") {
        res.render("loginuser");
    } else {
        res.redirect("../../user/dashboard");
    }
});

module.exports = router;