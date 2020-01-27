const express = require('express');
const router = express.Router();
const model = require('../model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const session = require('../session');


dotenv.config();


const Test = model.Test;

const createTest = (res, testname, proctor, duration, sched_start, sched_end, easy, medium, hard) => {
    Test.create({
        test_name: testname, 
        proctor: proctor, 
        duration: duration, 
        sched_start: sched_start, 
        sched_end: sched_end,
        easy: easy,
        medium: medium,
        hard: hard
    }).then((test) => {
        // res.redirect("../admin/test/" + test.get('test_id') + "/selectquest");
        res.status(200).send(test.get('test_id') + "");
    });
}


router.post("/create", (req, res) => {
    if(!session.isLogged(req, "admin")) {
        res.redirect("../../login/admin");
    }
    var testname = req.body.testname;
    var proctor = req.body.proctor;
    var duration = parseInt(req.body.duration);
    var sched_start = parseInt(req.body.sched_start);
    var sched_end = parseInt(req.body.sched_end);
    var easy = parseInt(req.body.easy);
    var medium = parseInt(req.body.medium);
    var hard = parseInt(req.body.hard);
    createTest(res, testname, proctor, duration, sched_start, sched_end, easy, medium, hard);
})

module.exports = router;