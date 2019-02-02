const Op = require('sequelize').Op;
const activeToken = require('./activetoken');

module.exports.insertActiveToken = (newActiveToken) => {
    return activeToken.upsert(newActiveToken);
};

module.exports.removeActiveToken = (bearer) => {
    return this.findActiveToken(bearer).then( data => {
        data.destroy();
    })
};

module.exports.removeAll = () => {
    return activeToken.destroy({
        where: {
            uuid: {
              [Op.ne]: null
            }
        }
    });
};

module.exports.findActiveToken = (bearer) => {
    return activeToken.findOne({
        where: {
            uuid: {
                [Op.eq]: bearer
            }
        }
    })
};