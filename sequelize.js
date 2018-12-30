
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'local'
const sp = process.env.INSTANCE_HOST_NAME || '/tmp/mysql.sock'; //mysqladmin variables
const dbUser = process.env.SQL_USER || 'root';
const dbPassword = process.env.SQL_PASSWORD || 'master';
const dbName = process.env.SQL_NAME || 'app';

let mysqlSocket = sp;
if(env !== 'local'){
  mysqlSocket = `/cloudsql/${sp}`
}

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  logging: false,
  dialect: 'mysql',
  operatorsAliases: false,
  dialectOptions: {
    socketPath: mysqlSocket,
  },

  pool: {
    max: 2,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

module.exports = sequelize;