const express = require('express');
const router = express.Router();
const session = require('../session');
const model = require('../model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();

var QuestionPool = model.QuestionPool;
var Question = model.Question;
var Test = model.Test;
var UserQuestions = model.UserQuestions

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const generateUserQuests = (res, test_id, user_id) => {
    var num_easy = 0;
    var num_medium = 0;
    var num_hard = 0;
    var easy = [];
    var medium = [];
    var hard = [];
    var easy_index = [];
    var medium_index = [];
    var hard_index = [];
    var easy_filtered = [];
    var medium_filtered = [];
    var hard_filtered = [];
    Test.findOne({where: {test_id: test_id}})
    .then((test) => {
        num_easy = parseInt(test.get('easy'));
        num_medium = parseInt(test.get('medium'));
        num_hard = parseInt(test.get('hard'));
        QuestionPool.findAll({include: [{model: Question, as: 'Question'}]})
        .then((quests) => {
            quests.forEach((quest) => {
                // console.log(quest.get('quest_id') + "->" + quest.get('Question').get('type')); //for debugging purposes only
                type = quest.get('Question').get('type');
                quest_id = quest.get('quest_id');
                if(type == 1) {
                    easy.push(quest_id);
                } else if(type == 2) {
                    medium.push(quest_id);
                } else if(type == 3) {
                    hard.push(quest_id);
                }
            });
            while(num_easy > 0) {
                i = getRndInteger(0, easy.length-1);
                if(easy_index.indexOf(i) == -1) {
                    num_easy--;
                    easy_index.push(i);
                }
            }
            while(num_medium > 0) {
                i = getRndInteger(0, medium.length-1);
                if(medium_index.indexOf(i) == -1) {
                    num_medium--;
                    medium_index.push(i);
                }
            }
            while(num_hard > 0) {
                i = getRndInteger(0, hard.length-1);
                if(hard_index.indexOf(i) == -1) {
                    num_hard--;
                    hard_index.push(i);
                }
            }
            for(i=0;i<easy_index.length;i++){
                easy_filtered.push(easy[easy_index[i]]);
            }
            for(i=0;i<medium_index.length;i++){
                medium_filtered.push(medium[medium_index[i]]);
            }
            for(i=0;i<hard_index.length;i++){
                hard_filtered.push(hard[hard_index[i]]);
            }
            quest_list = [...easy_filtered, ...medium_filtered, ...hard_filtered];
            quest_list.forEach(qid => {
                UserQuestions.create({test_id: test_id, user_id: user_id, quest_id: qid})
                .then(() => {
                    res.redirect("../../test/" + test_id + "/1");
                })
            })
        });
    });
}


router.get("/generate/:testid", (req, res) => {
    if(!session.isLogged(req, "user")) {
        res.redirect("../../login/user");
    }
    var test_id = parseInt(req.params.testid);
    var jwttoken = req.cookies.jwttoken;
    var user_id = parseInt(jwt.verify(jwttoken, process.env.JWT_SECRET).user_id);
    generateUserQuests(res, test_id, user_id);
});

module.exports = router;