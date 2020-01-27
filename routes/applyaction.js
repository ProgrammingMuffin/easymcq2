
const express = require('express');
const router = express.Router();
const model = require('../model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const session = require('../session');

dotenv.config();

const TestInvite = model.TestInvite;

const inviteUserToTest = (test_id, user_id) => {
    return TestInvite.create({test_id: test_id, user_id: user_id});
}

router.get("/test/:testid", (req, res) => {
    if(!session.isLogged(req, "user")) {
        res.redirect("../../login/user");
    }
    var test_id = req.params.testid;
    var jwt_token = jwt.verify(req.cookies.jwttoken, process.env.JWT_SECRET);
    var user_id = jwt_token.user_id;
    inviteUserToTest(test_id, user_id).then(() => {
        res.send("successfully applied to test!");
    }).catch((err) => {
        res.send("couldn't apply to test! " + err);
    })
})

module.exports = router;