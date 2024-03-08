const { DataTypes } = require('sequelize');
const { sequelize } = require('../Db/dbClient');

const Product = sequelize.define('product', {
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    customerId: {
        type: DataTypes.INTEGER,
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
});

module.exports = { Product };
