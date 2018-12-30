const authService = require ('./authentication.service')
const CONST = require('./constant')
const logger = require('./util.logger')
const httpUtil = require('./util.http')

module.exports.getToken = (request, response) => {
    try{
        const authorization = request.get(CONST.AUTHORIZATION)
        const basicToken = httpUtil.getAuthToken(authorization)
        if(basicToken){
            authService
                .getToken(basicToken)
                    .then((token) => {
                        response
                            .status(CONST.HTTP_RESPONSE_CODE_SUCCESS)
                            .json(token)
                    }).catch(err => {
                        logger.logOnError('Error on getToken', err)
                        throw err;
                    })
        }else{
            throw "No authkey found";
        }
    }catch(err){
        logger.logOnError(`Error when calling getToken Controller`, err)
        response
            .status(CONST.HTTP_RESPONSE_CODE_INTERNAL_SERVER_ERROR)
            .send(`There is something wrong ${err}`)
    }
    
}

module.exports.isAuth = (request, response) => {
    try{
        const bearer = request.get(CONST.BEARER)
        const bearerKey = httpUtil.getBearerToken(bearer)
        if(bearerKey){
            authService.isAuth(bearerKey)
                .then((token) => {
                    if(token){
                        response
                            .status(CONST.HTTP_RESPONSE_CODE_SUCCESS)
                            .json(token)
                    }else{
                        response
                            .status(CONST.HTTP_RESPONSE_CODE_NO_RESPONSE)
                            .send('Token is not found')
                    }
                })
                .catch(err => {
                    logger.logOnError('Error on retrieving active token', err)
                    throw err
                })
        }else{
            throw 'No bearer key found'
        }
    }catch(err){
        logger.logOnError('Error when calling isAuth', err)
        response
            .status(CONST.HTTP_RESPONSE_CODE_INTERNAL_SERVER_ERROR)
            .send(`There is something wrong ${err}`)
    }
}