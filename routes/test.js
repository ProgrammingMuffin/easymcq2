const express = require('express');
const Sequelize = require('sequelize');
const VARS = require('../VARS')();
const router = express.Router();
const model = require('../model');
const http = require('http');
const request = require('sync-request');

const orm = new Sequelize(VARS.db, VARS.username, VARS.password, {
    host: VARS.host,
    dialect: VARS.dialect
})


const UserQuestions = model.UserQuestions;
const Question = model.Question;
const QuestionLibrary = model.QuestionLibrary;
const Answer = model.Answer;
const QuestionImage = model.QuestionImage;
const AnswerImage = model.AnswerImage;


const getQuestionID = (test_id, user_id, quest_num) => {
    console.log(process.env.DB_PASSWORD)
    return UserQuestions.findOne({
        where: {
            test_id: test_id, 
            user_id: user_id
        }, 
        offset: quest_num,
        limit: 1
    });
}

//function for rendering the details into a HTML page.
const renderPage = (req, res, quest_id, question, answer_list) => {
    var ans_list = [];
    answer_list.forEach(ans => {
        ans_list.push(JSON.parse(ans));
    });
    res.render("test", {
        test_id: req.params.testid,
        quest_num: req.params.quest,
        quest_id: quest_id,
        question: question,
        answers: ans_list
    });
}

//HTTP Request to get the answer texts
const httpAnswerText = (req, res, quest_id, question, ans_list) => {
    var final_res = "";
    var final = "";
    var answer_list = [];
    var i = 1;

    ans_list.forEach(ans => {
        http.get("http://localhost:3001/service/getanstext/" + ans, (response) => {
            response.on('data', (chunk) => {
                final += chunk;
            })
            response.on('end', () => {
                final_res += final;
                answer_list.push(final)
                final = "";
                if(i == ans_list.length){
                    renderPage(req, res, quest_id, question, answer_list);
                }
                i++;
            })
        })
    })
}

//HTTP Request to get the answer IDs
const httpAnswerIDs = (req, res, quest_id, question) => {
    http.get("http://localhost:3001/service/getans/" + quest_id, (response) => {
        var final_res = ""
        response.on('data', (chunk) => {
            final_res += chunk;
        })
        response.on('end', () => {
            ans_list = JSON.parse(final_res);
            httpAnswerText(req, res, quest_id, question, ans_list);
        })
    })
}

//HTTP Request to get the question text
const httpQuestion = (req, res, quest_id) => {
    http.get("http://localhost:3001/service/getquest/" + quest_id, (response) => {
        var final_res = ""
        response.on('data', (chunk) => {
            final_res += chunk;
        })
        response.on('end', (chunk) => {
            question = final_res;
            httpAnswerIDs(req, res, quest_id, question);
        })
    });
}


router.get("/:testid/:quest", (req, res) => {
    var test_id = parseInt(req.params.testid);
    var quest_num = parseInt(req.params.quest) - 1;
    var quest_id = 161;

    UserQuestions.findOne({offset: quest_num, limit: 1}).then(question => {
        httpQuestion(req, res, question.get('quest_id'));
    })

    // httpQuestion(req, res, 161);
});

module.exports = router;