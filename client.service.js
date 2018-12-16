const Op = require('sequelize').Op

const client = require('./client')

module.exports.findByClientIdAndCredential = (clientId, clientCredential) => {
    return client.findOne({where: {
        clientId: {
            [Op.eq]: clientId
        },
        clientCredential: {
            [Op.eq]: clientCredential
        }
    }});
}