const express = require('express');
const router = express.Router();
const model = require('../model');
const session = require('../session');
const Json2csvParser = require("json2csv").Parser;
const fs = require('fs');


const Scoreboard = model.Scoreboard;
const Test = model.Test;
const User = model.User;


const getScores = (res) => {
    var results = [];
    Scoreboard.findAll({include: [{model: Test, as: 'Test'}, {model: User, as: 'User'}]})
    .then(values => {
        values.forEach(value => {
            results.push({test_name: value.get('Test').test_name, name: value.get('User').name, score: value.get('score')});
        });
        // console.log(JSON.stringify(results));
        // const json2csvParser = new Json2csvParser({ header: true});
        // jsonData = JSON.stringify(results);
        // const csv = json2csvParser.parse(jsonData);
        // console.log(csv);
        // fs.writeFileSync("mc.csv", csv, function(error) {
        // if (error) throw error;
        //     console.log("Write to bezkoder_mysql_fs.csv successfully!");
        // });
        // res.download('mc.csv');
        const jsonData = JSON.parse(JSON.stringify(results));
            console.log("jsonData", jsonData);
            const json2csvParser = new Json2csvParser({ header: true});
            const csv = json2csvParser.parse(jsonData);
            console.log(csv);
            fs.writeFileSync("mc.csv", csv, function(error) {
                if (error) throw error;
                console.log("Write to bezkoder_mysql_fs.csv successfully!");
              });
            res.download('mc.csv');
    })
}


router.get("/show", (req, res) => {
    getScores(res);
});

module.exports = router;