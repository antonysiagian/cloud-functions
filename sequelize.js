
const Sequelize = require('sequelize');

const hostName = process.env.INSTANCE_HOST_NAME || 'localhost';
const dbUser = process.env.SQL_USER || 'root';
const dbPassword = process.env.SQL_PASSWORD || 'master';
const dbName = process.env.SQL_NAME || 'app';


const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: hostName,
  logging: false,
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 2,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

module.exports = sequelize;