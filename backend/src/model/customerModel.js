const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../Db/dbClient');

const Customer = sequelize.define('customer', {
    customerId: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(), // Automatically generate a UUID for new records
        primaryKey: true,
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
