const { Sequelize } = require('sequelize');

const { DATABASE_URL } = process.env;

// Set up the connection to PlanetScaleDB
const sequelize = new Sequelize(DATABASE_URL);

module.exports = { sequelize };
