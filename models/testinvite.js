const Sequelize = require('sequelize');

module.exports = (orm) => {
    //Answer DB model
    return orm.define('TestInvite', {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        test_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    }, {
        freezeTableName: true, //otherwise table names will be made plural
        timestamps: false //createdat field
    })
}