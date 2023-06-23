const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2');

const { DB_USER_NAME, DB_PWD, DB_HOST, DB_NAME } = process.env;

// Set up the connection to PlanetScaleDB
const sequelize = new Sequelize({
    dialect: 'mysql',
    dialectModule: mysql2,
    host: DB_HOST,
    port: 3306,
    database: DB_NAME,
    username: DB_USER_NAME,
    password: DB_PWD,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true,
        },
    },
});

module.exports = { sequelize };
