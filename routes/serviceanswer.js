const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const modelAnswer = require('../models/answer');
const VARS = require('../VARS')();


const orm = new Sequelize(VARS.db, VARS.username, VARS.password, {
    host: VARS.host,
    dialect: VARS.dialect
});

const Answer = modelAnswer(orm);


const getAnswer = (ans_id) => {
    return Answer.findOne({where: {ans_id: ans_id}});
    // return QuestionLibrary.findAll({where: {quest_id: quest_id}})
}


router.get("/getanstext/:ansid", (req, res) => {
    var ans_id = req.params.ansid;
    getAnswer(ans_id).then(answer => {
        res.send({ans_id: ans_id, answer: answer.get('answer')});
    })
})


module.exports = router;