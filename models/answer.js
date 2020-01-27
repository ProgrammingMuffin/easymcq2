const Sequelize = require('sequelize');

module.exports = (orm) => {
    //Answer DB model
    return orm.define('Answer', {
    ans_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    answer: {
        type: Sequelize.STRING,
        allowNull: false
    },
    correct: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
}, {
    freezeTableName: true, //otherwise table names will be made plural
    timestamps: false //createdat field
})
}