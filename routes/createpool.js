const express = require('express');
const router = express.Router();
const model = require('../model');
const session = require('../session');


const QuestionPool = model.QuestionPool;


const createQuestionPool = (res, test_id, quest_list) => {
    promises = [];
    quest_list.forEach((quest_id) => {
        promises.push(QuestionPool.create({test_id: test_id, quest_id: parseInt(quest_id)}));
    });
    Promise.all(promises).then(() => {
        res.send("Added all questions to questionpool<br/><a href='/admin/dashboard/' >Go to Dashboard</a>");
    })
}


router.post("/createpool/test/:testid", (req, res) => {
    if(!session.isLogged(req, "admin")) {
        res.redirect("../../login/admin");
    }
    var test_id = parseInt(req.params.testid);
    var quest_list = req.body.questions;
    createQuestionPool(res, test_id, quest_list);
});


module.exports = router;