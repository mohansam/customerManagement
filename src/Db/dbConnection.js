const { sequelize } = require('./dbClient');

let dbConnection = false;
const connectToDb = async () => {
    if (dbConnection) return '';
    await sequelize.authenticate();
    dbConnection = true;
    return '';
};

module.exports = { connectToDb };
