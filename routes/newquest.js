const express = require('express');
const Sequelize = require('sequelize');
const VARS = require('../VARS')();
const router = express.Router();
const multer = require('multer');
const model = require('../model');
const fs = require('fs'); //for the file moving stuff..
const path = require('path'); //file extension
const session = require('../session');

// REUSABLE MODULES (LATER TO BE PUSHED TO A SEPERATE FILE)

const moveFileToDir = (file_path, new_file_path) => {
    fs.rename(file_path, new_file_path, ()=>{});
}

const Answer = model.Answer;
const Question = model.Question;
const QuestionLibrary = model.QuestionLibrary;
const AnswerImage = model.AnswerImage;
const QuestionImage = model.QuestionImage;

//returns answer id if new answer is created.
const newAnswer = (inputanswer, correct_flag) => {
        return Answer.create({answer: inputanswer, correct: correct_flag}); // return a promise
}

const newAnswerTransaction = (answers, correct_answer, files) => {
        answers.forEach((ans) => {
            if(ans == correct_answer){
                flag = 1;
            } else {
                flag = 0;
            }
            ans_list.push(newAnswer(ans, flag));
        })
        return ans_list
}

const pushQuestionLibrary = (quest_id, ans_id) => {
    QuestionLibrary.create({quest_id: quest_id, ans_id: ans_id});
}

const addQuestionImage = (quest_id, img) => {
    new_name = "q" + quest_id + path.extname(img.originalname);
    moveFileToDir(img.path, "uploads/images/" + new_name)
    QuestionImage.create({quest_id: quest_id, imagename: new_name});
}

const addAnswerImage = (ans_id, img) => {
    new_name = "a" + ans_id + path.extname(img.originalname);
    moveFileToDir(img.path, "uploads/images/" + new_name);
    return AnswerImage.create({ans_id: ans_id, imagename: new_name});
}

//returns question id if the new question is created
const newQuest = (inputquestion, answers, correct_answer, files) => {
    Question.create({question: inputquestion, type: 0}).then((quest_id) => {
        files.forEach(img => {
            if(img.fieldname == 'questimg'){
                addQuestionImage(quest_id.get('quest_id'), img)
            }
        })
        answers.forEach(answer => {
            i = 1;
            if(answer == correct_answer){
                flag = 1;
            } else {
                flag = 0;
            }
            newAnswer(answer, flag).then(result => {
                pushQuestionLibrary(quest_id.get('quest_id'), result.get('ans_id'));
                files.forEach(img => {
                    if(img.fieldname == ("" + i)){
                        console.log(result.get('ans_id'));
                        setTimeout(()=>{
                            addAnswerImage(result.get('ans_id'), img).then(() => {
                            console.log("successfully uploaded image: " + result.get('ans_id'));
                        }) }, 100);
                    }
                })
                i++;
            });
        })
    }).catch((err) => {
        console.log("Error: " + err)
        return false;
    })
}

router.post("/newquest", (req, res) => {
    if(!session.isLogged(req, "admin")) {
        res.redirect("../../login/admin");
    }
    newQuest(req.body.question, req.body.answers, req.body.correct, req.files);
    res.status(200).send("Question Added!");
});

module.exports = router;