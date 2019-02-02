const Op = require('sequelize').Op;

const activeToken = require('./activetoken')

module.exports.insertActiveToken = (newActiveToken) => {
    return activeToken.upsert(newActiveToken);
}

module.exports.findActiveToken = (bearer) => {
    return activeToken.findOne({
        where: {
            uuid: {
                [Op.eq]: bearer
            }
        }
    })
}