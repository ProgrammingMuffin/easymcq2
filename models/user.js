const Sequelize = require('sequelize');

module.exports = (orm) => {
    return orm.define('User', {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        DOB: {
            type: Sequelize.DATE,
            allowNull: false
        },
        college_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        degree: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
}