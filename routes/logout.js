const express = require('express');
const router = express.Router();


router.get("/", (req, res) => {
    res.clearCookie("jwttoken");
    res.clearCookie("admintoken");
    res.redirect("/");
})

module.exports = router;