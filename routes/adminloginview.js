const express = require('express');
const router = express.Router();


router.get("/admin", (req, res) => {
    if(typeof(req.cookies.admintoken) == "undefined") {
        res.render("adminlogin");
    } else {
        res.redirect("../../admin/dashboard");
    }
});

module.exports = router;