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
        type: DataTypes.STRING,
        allowNull: false,
    },
    isServiceCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    partsReplaced: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    serviceEngineer: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    amountCharged: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    customerRemarks: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

module.exports = { Service };
