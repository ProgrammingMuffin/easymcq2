const Sequelize = require('sequelize');

const modelAnswer = require('./models/answer');
const modelAnswerImage = require('./models/answerimage');
const modelQuestion = require('./models/question');
const modelQuestionImage = require('./models/questionimage');
const modelQuestionLibrary = require('./models/questionlibrary');
const modelTest = require('./models/test');
const modelUser = require('./models/user');
const modelUserQuestions = require('./models/userquestions');
const modelTestInvite = require('./models/testinvite');
const modelQuestionPool = require('./models/questionpool');
const modelAdmin = require('./models/admin');
const modelUserAnswers = require('./models/useranswers');
const modelScoreboard = require('./models/scoreboard');
const dotenv = require('dotenv');


dotenv.config();

const orm = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

const mAnswer = modelAnswer(orm);
const mUserQuestions = modelUserQuestions(orm);
const mQuestionLibrary = modelQuestionLibrary(orm);
const mQuestion = modelQuestion(orm);
const mTestInvite = modelTestInvite(orm);
const mTest = modelTest(orm);
const mUser = modelUser(orm);
const mQuestionImage = modelQuestionImage(orm);
const mAnswerImage = modelAnswerImage(orm);
const mQuestionPool = modelQuestionPool(orm);
const mAdmin = modelAdmin(orm);
const mUserAnswers = modelUserAnswers(orm);
const mScoreboard = modelScoreboard(orm);


mQuestionLibrary.belongsTo(mAnswer, {as: 'Answer', foreignKey: 'ans_id'});
mAnswer.belongsTo(mQuestionLibrary, {as: 'QuestionLibrary', foreignKey: 'ans_id'});
mQuestionLibrary.belongsTo(mQuestion, {as: 'Question', foreignKey: 'quest_id'});
mTestInvite.belongsTo(mTest, {as: 'Test', foreignKey: 'test_id'});
mQuestionPool.belongsTo(mQuestion, {as: 'Question', foreignKey: 'quest_id'});
mUserAnswers.belongsTo(mQuestion, {as: 'Question', foreignKey: 'quest_id'});
mUserAnswers.belongsTo(mAnswer, {as: 'Answer', foreignKey: 'ans_id'});


module.exports.Answer = mAnswer;
module.exports.AnswerImage = mAnswerImage;
module.exports.Question = mQuestion;
module.exports.QuestionImage = mQuestionImage;
module.exports.QuestionLibrary = mQuestionLibrary
module.exports.Test = mTest;
module.exports.User = mUser;
module.exports.UserQuestions = mUserQuestions;
module.exports.TestInvite = mTestInvite;
module.exports.QuestionPool = mQuestionPool;
module.exports.Admin = mAdmin;
module.exports.UserAnswers = mUserAnswers;
module.exports.Scoreboard = mScoreboard;