const Sequelize = require('sequelize');


//Question DB model
module.exports = (orm) => {
    return orm.define('Question', {
        quest_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        question: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.TINYINT
        }
    }, {
        freezeTableName: true, //otherwise table names will be made plural
        timestamps: false // otherwise createdat field will be generated;
    })
}