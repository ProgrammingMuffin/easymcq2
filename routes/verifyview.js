const express = require('express');
const router = express.Router();
const session = require('../session');



router.get("/:testid", (req, res) => {
    if(!session.isLogged(req, "user")) {
        res.redirect("../../login/user");
    }
    var testid = parseInt(req.params.testid);
    res.render("verify", {
        test_id: testid
    });
});

module.exports = router;