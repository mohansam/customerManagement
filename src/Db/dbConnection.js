const { sequelize } = require('./dbClient');

let dbConnection = false;
const connectToDb = async () => {
    if (dbConnection) return '';
    await sequelize.authenticate();
    //   await sequelize.sync({ alter: false });
    dbConnection = true;
    return '';
};

module.exports = { connectToDb };
