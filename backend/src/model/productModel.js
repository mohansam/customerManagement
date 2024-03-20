const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../Db/dbClient');

const Product = sequelize.define('product', {
    productId: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(), // Automatically generate a UUID for new records
        primaryKey: true,
    },
    customerId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dateOfInstallation: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    warranty: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pump: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    membrane: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    powerSupply: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    modeOfPurchase: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nextScheduledMaintenance: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    reminderDays: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

module.exports = { Product };
