const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const model = require('../model');
const jwt = require('jsonwebtoken');
const session = require('../session');


dotenv.config();

const TestInvite = model.TestInvite;
const Test = model.Test;

const getUserTests = (user_id) => {
    return TestInvite.findAll({where: {user_id: user_id}, include: [{model: Test, as: 'Test'}]});
}

router.get("/dashboard", (req, res) => {
    //Early exit code if user isn't logged in
    if(!session.isLogged(req, "user")) {
        res.redirect("../../login/user");
    }
    
    var jwt_decrypt = jwt.verify(req.cookies.jwttoken, process.env.JWT_SECRET);
    var user_id = jwt_decrypt.user_id;
    var test_array = []


    getUserTests(user_id).then((testlist) => {
        testlist.forEach(test => {
            var test_details = test.get('Test');
            test_array.push({test_id: test_details.get('test_id'), 
            name: test_details.get('test_name'), 
            duration: test_details.get('duration')});
        })
        res.render('dashboard', {
            tests: test_array
        });
    });
});

module.exports = router;