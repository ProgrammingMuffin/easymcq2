const Sequelize = require('sequelize');

module.exports = (orm) => {
    return orm.define('Admin', {
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
}