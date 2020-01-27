const express = require('express');
const Sequelize = require('sequelize');
const VARS = require('../VARS')();
const router = express.Router();
const model = require('../model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const session = require('../session');

dotenv.config();

const UserQuestions = model.UserQuestions;
const Question = model.Question;
const QuestionLibrary = model.QuestionLibrary;
const Answer = model.Answer;



//get the quest_id
const getQuestionID = (quest_num, test_id, user_id) => {
    return UserQuestions.findAll({where: {test_id: test_id, user_id: user_id}});
}

const getQuestionText = (quest_id) => {
    return QuestionLibrary.findOne({where: {quest_id: quest_id}, include: [{model: Question, as: 'Question'}]});
}

//get the answers
const getAnswers = (quest_id) => {
    return QuestionLibrary.findAll({where: {quest_id: quest_id}, include: [{model: Answer, as: 'Answer'}, {model: Question, as: 'Question'}]});
}


router.get("/:testid", (req, res) => {
    if(!session.isLogged(req, "user")) {
        res.redirect("../../login/user");
    }
    var test_id = parseInt(req.params.testid);
    var quest_num = parseInt(req.params.quest);
    var jwt_token = jwt.verify(req.cookies.jwttoken, process.env.JWT_SECRET);
    var user_id = jwt_token.user_id;
    var quest_list = [];
    var i = 0;
    getQuestionID(quest_num, test_id, user_id).then(questions => {
        questions.forEach((question, index) => {
            getQuestionText(question.get('quest_id')).then(quest => {
                getAnswers(quest.get('quest_id')).then(answers => {
                    i++;
                    answer_array = [];
                    answers.forEach(answer => {
                        answer_array.push({
                            ans_id: answer.get('Answer').get('ans_id'),
                            answer: answer.get('Answer').get('answer')
                        });
                    });
                    quest_list.push({
                        quest_id: quest.get('Question').get('quest_id'),
                        question: quest.get('Question').get('question'),
                        answers: answer_array
                    });
                    if(i == questions.length) {
                        res.render("test", {
                            test_id: test_id,
                            questions: quest_list
                        });
                    }
                });
            });
        });
        // getQuestionText(quest.get('quest_id')).then(question => {
        //     console.log(question.get('Question'));
        //     console.log("\n\n\n");
        //     getAnswers(quest.get('quest_id')).then((answer) => {
        //         answer.forEach(ans => {
        //             answer_array.push({answer: ans.get('Answer').get('answer')})
        //         })
        //     res.render("test", {
        //             quest_num: quest_num,
        //             question: question.get('Question').get('question'),
        //             answers: answer_array
        //         })
        //     })
        // })
    })
});

module.exports = router;