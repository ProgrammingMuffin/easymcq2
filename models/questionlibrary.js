const Sequelize = require('sequelize');

module.exports = (orm) => {
    return orm.define('QuestionLibrary', {
        quest_id: {
            type: Sequelize.BIGINT,
            primaryKey: true
        },
        ans_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            references: {
                model: 'Answer',
                key: 'ans_id'
            }
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        nest: true,
        raw: true
    })
}