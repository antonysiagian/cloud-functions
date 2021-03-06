const authService = require('./authentication.service');
const CONST = require('./constant');
const logger = require('./util.logger');
const token = require('./token');

module.exports.getToken = (request, response) => {
    try {

        const authorization = request.get(CONST.AUTHORIZATION);
        const basicToken = token.getAuthToken(authorization);

        if (basicToken) {
            authService
                .getToken(basicToken)
                    .then((token) => {
                        response
                            .status(CONST.HTTP_RESPONSE_CODE_SUCCESS)
                            .json(token)
                    }).catch(err => {
                        throw err;
                    });
        } else {
            response
                .status(CONST.HTTP_RESPONSE_CODE_UNAUTHORISED)
                .send("No auth key found");
        }
    } catch (err) {
        logger.error(`Error when calling getToken Controller`, err);
        response
            .status(CONST.HTTP_RESPONSE_CODE_INTERNAL_SERVER_ERROR)
            .send(`There is something wrong ${err}`)
    }
};

module.exports.isAuth = (request, response) => {
    try {
        const bearer = request.get(CONST.AUTHORIZATION);
        const bearerKey = token.getBearerToken(bearer);
        if (bearerKey) {
            authService.isAuth(bearerKey)
                .then((token) => {
                    if (token) {
                        response
                            .status(CONST.HTTP_RESPONSE_CODE_SUCCESS)
                            .json(token)
                    } else {
                        response
                            .status(CONST.HTTP_RESPONSE_CODE_UNAUTHORISED)
                            .send('Token is not found')
                    }
                })
                .catch(err => {
                    logger.error('Error on retrieving active token', err);
                    throw err;
                })
        } else {
            logger.error('Bearer not found honey', bearer);
            response
                .status(CONST.HTTP_RESPONSE_CODE_UNAUTHORISED)
                .send('Bearer not found honey!');
        }
    } catch (err) {
        logger.error('Error when calling isAuth', err);
        response
            .status(CONST.HTTP_RESPONSE_CODE_INTERNAL_SERVER_ERROR)
            .send(`There is something wrong ${err}`)
    }
};