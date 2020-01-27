const Sequelize = require('sequelize');

module.exports = (orm) => {
    return orm.define('UserAnswers', {
        test_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        quest_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        ans_id: {
            type: Sequelize.BIGINT,
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
}