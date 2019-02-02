const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

const activeToken = sequelize.define('active_tokens', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    clientId: {
        type: Sequelize.STRING
    },
    uuid: {
        type: Sequelize.STRING
    },
    startTime: {
        type: Sequelize.DATE
    },
    expiryTime: {
        type: Sequelize.DATE
    },
    refreshToken: {
        type: Sequelize.STRING
    }
});

module.exports = activeToken;