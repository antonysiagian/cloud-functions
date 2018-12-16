const client = require('./client')
const Op = require('sequelize').Op;

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