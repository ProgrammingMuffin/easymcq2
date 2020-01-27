const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const model = require('../model');
const session = require('../session');


const Question = model.Question;


const getQuestions = () => {
    return Question.findAll();
}

const resolveType = (type) => {
    if(type == 1) {
        return "easy";
    } else if(type == 2) {
        return "medium";
    } else if(type == 3) {
        return "hard";
    }
}

router.get("/test/:testid/selectquest", (req, res) => {
    if(!session.isLogged(req, "admin")) {
        res.redirect("../../login/admin");
    }
    var test_id = parseInt(req.params.testid);
    var question_list = [];
    getQuestions().then((questions) => {
        questions.forEach(quest => {
            question_list.push({
                quest_id: quest.get('quest_id'),
                question: quest.get('question'),
                type: resolveType(quest.get('type'))
            });
        });
        res.render("selectquest", {
            test_id: test_id,
            questions: question_list
        })
    });
});


module.exports = router;