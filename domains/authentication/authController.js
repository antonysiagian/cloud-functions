const authService = require ('./authService')
const CONST = require('../../constant')
const logger = require('../util/logger')
const httpUtil = require('../util/httpUtil')

module.exports.getToken = (request, response) => {
    try{
        
        const authorization = request.get(CONST.AUTHORIZATION)
        const basicToken = httpUtil.getAuthToken(authorization)

        if(basicToken){
            authService
                .getToken(basicToken)
                    .then((token)=>{
                        response.status(CONST.HTTP_RESPONSE_CODE_SUCCESS).json(token)
                    }).catch(err => {
                        throw err;
                    })
        }else{
            throw "No authKey found";
        }

    }catch(err){
        logger.logOnError(`Error when calling getToken Controller`, err)
        response
            .status(CONST.HTTP_RESPONSE_CODE_INTERNAL_SERVER_ERROR)
            .send(`There is something wrong ${err}`)
    }
    
}