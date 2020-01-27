const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const modelQuestionLibrary = require('../models/questionlibrary');
const modelAnswer = require('../models/answer');
const VARS = require('../VARS')();


const orm = new Sequelize(VARS.db, VARS.username, VARS.password, {
    host: VARS.host,
    dialect: VARS.dialect
});


const QuestionLibrary = modelQuestionLibrary(orm);
const Answer = modelAnswer(orm);


// Answer.belongsToMany(QuestionLibrary, {through: 'ans_id', foreignKey: 'ans_id'});


const getAnswers = (quest_id) => {
    return QuestionLibrary.findAll({where: {quest_id: quest_id}})
}


router.get("/getans/:questid", (req, res) => {
    var quest_id = req.params.questid;
    var ans_ids = [];
    getAnswers(quest_id).then((answers) => {
        answers.forEach(ans => {
            ans_ids.push(ans.get('ans_id'));
        })
        res.send(ans_ids);
    });
});


module.exports = router;