const Sequelize = require('sequelize');

module.exports = (orm) => {
    //Answer DB model
    return orm.define('Scoreboard', {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        test_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        score: {
            type: Sequelize.MEDIUMINT
        }
}, {
    freezeTableName: true, //otherwise table names will be made plural
    timestamps: false //createdat field
})
}