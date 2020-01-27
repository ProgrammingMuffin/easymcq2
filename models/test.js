const Sequelize = require('sequelize');

module.exports = (orm) => {
    return orm.define('Test', {
        test_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        test_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        proctor: {
            type: Sequelize.STRING
        },
        duration: {
            type: Sequelize.SMALLINT
        },
        sched_start: {
            type: Sequelize.TIME
        },
        sched_end: {
            type: Sequelize.TIME
        },
        easy: {
            type: Sequelize.SMALLINT
        },
        medium: {
            type: Sequelize.SMALLINT
        },
        hard: {
            type: Sequelize.SMALLINT
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
}