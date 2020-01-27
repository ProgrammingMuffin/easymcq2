//This file deals with only rendering the front-end of the apply site.
//The action file is in applyaction.js

const express = require('express');
const router = express.Router();
const model = require('../model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const session = require('../session');

dotenv.config();

const Test = model.Test;
const TestInvite = model.TestInvite;

const getUserTestCount = (test_id, user_id) => {
    return TestInvite.count({where: {test_id: test_id, user_id: user_id}});
}

const getTests = () => {
    var current_time = Math.floor(Date.now() / 1000);
    console.log(current_time);
    return Test.findAll();
}

router.get("/", (req, res) => {
    if(!session.isLogged(req, "user")) {
        res.redirect("../../login/user");
    }
    var tests = [];
    var jwt_token = jwt.verify(req.cookies.jwttoken, process.env.JWT_SECRET);
    var user_id = jwt_token.user_id;
    getTests().then((testlist) => {
        testlist.forEach((test, i) => {
            getUserTestCount(test.get('test_id'), user_id).then(count => {
                if(count == 0){
                    tests.push({test_id: test.get('test_id'), name: test.get('test_name'), duration: test.get('duration')});
                }
                if(i == (testlist.length-1)){
                    res.render("apply", {
                        tests: tests
                    })
                }
            })
        });
    })
});

module.exports = router;