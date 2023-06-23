const { DataTypes } = require('sequelize');
const { sequelize } = require('../Db/dbClient');

const Customer = sequelize.define('customer', {
    customerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customerAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customerMobileNum: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = { Customer };
