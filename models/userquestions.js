const Sequelize = require('sequelize');

module.exports = (orm) => {
    return orm.define('UserQuestions', {
        test_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        quest_id: {
            type: Sequelize.BIGINT,
            primaryKey: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })
}