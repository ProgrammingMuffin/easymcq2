const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const model = require('../model');
const session = require('../session');


const Question = model.Question;
const Answer = model.Answer;
const QuestionLibrary = model.QuestionLibrary;


const createQuestion = (res, question, answers, correct, level) => {
    Question.create({question: question, type: level})
    .then((quest) => {
        answers.forEach((answer, index) => {
            if(index == (correct - 1)){
                correct_flag = 1;
            } else {
                correct_flag = 0;
            }
            Answer.create({answer: answer, correct: correct_flag})
            .then((ans) => {
                console.log(quest.get('quest_id'));
                console.log(ans.get('ans_id'));
                QuestionLibrary.create({quest_id: quest.get('quest_id'), ans_id: ans.get('ans_id')})
                .then(() => {
                    res.status(200).send("Question Successfully Added!");
                })
            })
        })
    })
}

router.post("/newquest", (req, res) => {
    if(!session.isLogged(req, "admin")) {
        res.redirect("../../login/admin");
    }
    var question = req.body.question;
    var answers = req.body.answers;
    var correct = req.body.correct;
    var level = req.body.level; //complexity of question
    createQuestion(res, question, answers, correct, level);
})

module.exports = router;