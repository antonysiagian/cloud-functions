const Sequelize = require('sequelize')
const sequelize = require('../../sequelize')

const client = sequelize.define('clients', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    clientId: {
        type: Sequelize.STRING,
    },
    clientCredential: {
        type: Sequelize.STRING
    }
});

module.exports = client;