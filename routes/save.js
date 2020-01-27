const express = require('express');
const router = express.Router();
const model = require('../model');
const session = require('../session');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();

var UserAnswer = model.UserAnswers;

const UpdateUserAnswer = (res, test_id, user_id, quest_id, ans_id) => {
    UserAnswer.count({where: {test_id: test_id, user_id: user_id, quest_id: quest_id}})
    .then(count => {
        if(count == 0) {
            UserAnswer.create({test_id: test_id, user_id: user_id, quest_id: quest_id, ans_id: ans_id});
        } else {
            console.log(ans_id, test_id);
            UserAnswer.update({ans_id: ans_id}, {where: {test_id: test_id, user_id: user_id, quest_id: quest_id}})
            .then((res) => {
                console.log("updated: " + res);
                console.log(test_id);
                console.log(user_id);
            });
        }
    })
    // console.log("test_id: " + test_id);
    // console.log("user_id: " + user_id);
    // console.log("quest_id: " + quest_id);
    // console.log("ans_id: " + ans_id);
}


router.post("/", (req, res) => {
    var test_id = parseInt(req.body.test_id);
    var ans_id = req.body.ans_id;
    var quest_id = req.body.quest_id;
    var jwttoken = req.cookies.jwttoken;
    var user_id = parseInt(jwt.verify(jwttoken, process.env.JWT_SECRET).user_id);
    UpdateUserAnswer(res, test_id, user_id, quest_id, ans_id);
});


module.exports = router;