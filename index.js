const authController = require('./authentication.controller');
const CONSTANTS = require('./constant');
const logger = require('./util.logger')

exports.auth = (req, res) => {

    const contentType = req.get(CONSTANTS.CONTENT_TYPE);
    const requestMethod = req.method;
    const authorization = req.get(CONSTANTS.AUTHORIZATION);
    const query = req.query;

    logger.log('PATH: ', req.path)//default value null, if exists /path
    logger.log('Request method: ', req.method) //"GET", "POST", "PUT"
    logger.log('Content Type: ', contentType) // application/json
    logger.log('Authorization', authorization)// null or Basic AMRNCHHZHHAQPEDMASLKMDELKASD==
    logger.log('Http Query', query) // type object{}

    if(CONSTANTS.HTTP_METHOD_POST === requestMethod){
        authController.getToken(req, res);
    }else{
        res.status(CONSTANTS.HTTP_RESPONSE_CODE_METHOD_NOT_FOUND).end();
    }
}