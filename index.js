const authController = require('./domains/authentication/authController');
const CONSTANTS = require('./constant');
const logger = require('./domains/util/logger')

exports.auth = (req, res) => {

    const contentType = req.get(CONSTANTS.CONTENT_TYPE);
    const requestMethod = req.method;
    const authorization = req.get(CONSTANTS.AUTHORIZATION);
    
    logger.log('PATH: ', req.path)
    logger.log('Request method: ', req.method)
    logger.log('Content Type: ', contentType)
    logger.log('Authorization', authorization)

    if(CONSTANTS.HTTP_METHOD_POST === requestMethod){
        authController.getToken(req, res);
    }else{
        res.status(CONSTANTS.HTTP_RESPONSE_CODE_METHOD_NOT_FOUND).end();
    }
}