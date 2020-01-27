const express = require('express');
const router = express.Router();
const model = require('../model');
const session = require('../session');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();


const Scoreboard = model.Scoreboard;
const UserAnswers = model.UserAnswers;
const Answer = model.Answer;
const Question = model.Question;

const evaluate = (res, test_id, user_id) => {
    UserAnswers.findAll({where: {test_id: test_id, user_id: user_id}, include: [{model: Question, as: 'Question'}, {model: Answer, as: 'Answer'}]})
    .then((results) => {
        score = 0;
        results.forEach(answer => {
            correct_flag = answer.get('Answer').get('correct');
            type = answer.get('Question').get('type');
            if(correct_flag == true) {
                if(type == 1){
                    multiplier = process.env.EASY;
                } else if(type == 2) {
                    multiplier = process.env.MEDIUM;
                } else if(type == 3) {
                    multiplayer = process.env.HARD;
                }
                score += parseInt(multiplier);
            }
        })
        // console.log(score);
        Scoreboard.create({user_id: user_id, test_id: test_id, score: score}).then(() => {
            res.status(200).send("Test Submitted successfully! You may logout now!");
        });
    })
}


router.get("/:testid", (req, res) => {
    if(!session.isLogged(req, "user")){
        res.redirect("../login/user");
    }
    var test_id = parseInt(req.params.testid);
    var user_id = parseInt(jwt.verify(req.cookies.jwttoken, process.env.JWT_SECRET).user_id);
    evaluate(res, test_id, user_id);
});

module.exports = router;