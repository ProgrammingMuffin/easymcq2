const Sequelize = require('sequelize');

module.exports = (orm) => {
    //Answer DB model
    return orm.define('QuestionPool', {
        test_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        quest_id: {
            type: Sequelize.BIGINT,
            primaryKey: true
        }
}, {
    freezeTableName: true, //otherwise table names will be made plural
    timestamps: false //createdat field
})
}