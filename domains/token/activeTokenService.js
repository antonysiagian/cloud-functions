const activeToken = require('./activeToken')
const Op = require('sequelize').Op;

module.exports.insertActiveToken = (newActiveToken) => {
    return activeToken.upsert(newActiveToken);
} 

module.exports.findActiveToken = (bearer) => {
    return activeToken.findOne({where: {uuid: {
        [Op.eq]: bearer
    }}})
}