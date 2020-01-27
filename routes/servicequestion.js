const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const modelQuestion = require('../models/question');
const VARS = require('../VARS')();


const orm = new Sequelize(VARS.db, VARS.username, VARS.password, {
    host: VARS.host,
    dialect: VARS.dialect
});


const Question = modelQuestion(orm);


const getQuestion = (quest_id) => {
    return Question.findOne({where: {quest_id: quest_id}})
}


router.get("/getquest/:questid", (req, res) => {
    var quest_id = req.params.questid;
    var question = "";
    getQuestion(quest_id).then((quest) => {
        question = quest.get('question');
        res.send(question);
    })
});


module.exports = router;