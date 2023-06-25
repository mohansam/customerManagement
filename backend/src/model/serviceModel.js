const { DataTypes } = require('sequelize');
const { sequelize } = require('../Db/dbClient');

const Service = sequelize.define('service', {
    serviceId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    serviceDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    isServiceCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    isFreeService: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});

module.exports = { Service };
