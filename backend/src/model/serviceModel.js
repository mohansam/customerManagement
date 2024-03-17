const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../Db/dbClient');

const Service = sequelize.define('service', {
    serviceId: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(), // Automatically generate a UUID for new records
        primaryKey: true,
    },
    customerId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    serviceDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    serviceType: {
        type: DataTypes.STRING, // Assuming parts replaced will be stored as a string, adjust as necessary
        allowNull: false,
    },
    isServiceCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    partsReplaced: {
        type: DataTypes.STRING, // Assuming parts replaced will be stored as a string, adjust as necessary
        allowNull: true,
    },
    amountCharged: {
        type: DataTypes.DECIMAL, // Assuming amount charged is a decimal value, adjust as necessary
        allowNull: true, // Assuming this can be null, adjust as necessary
    },
    customerRemarks: {
        type: DataTypes.TEXT, // Assuming customer remarks will be stored as text, adjust as necessary
        allowNull: true, // Assuming this can be null, adjust as necessary
    },
});

module.exports = { Service };
