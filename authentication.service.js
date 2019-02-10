const base64 = require('base-64');
const utf8 = require('utf8');

const clientRepository = require('./client.repository');
const activeTokenRepository = require('./activetoken.repository');
const logger = require('./util.logger');
const CONSTANT = require('./constant');
const token = require('./token')

const auth = {
    getToken: (authorisationCredential) => {

        const bytes = utf8.encode(authorisationCredential);
        let params = base64.decode(bytes).split(":");

        return new Promise((resolve, reject) => {
            clientRepository.findByClientIdAndCredential(params[0], params[1])
                .then(client => {
                    if (client) {
                        const newActiveToken = token.createActiveToken(client);
                        const response = token.constructResponseFromToken(newActiveToken);
                        activeTokenRepository.createActiveToken(newActiveToken)
                            .then(resolve(response))
                            .catch(err => {
                                logger.error(`Fail to insert active token`, err);
                                reject(err);
                            })
                    } else {
                        logger.error(`Client not found`, ['Client is', client]);
                        reject('Client not found')
                    }
                })
                .catch(err => {
                    logger.error(CONSTANT.TECHNICAL_ERROR_PREFIX, ['err is', err]);
                    reject(CONSTANT.TECHNICAL_ERROR_PREFIX + err);
                })
        })
    },

    isAuth: (bearer) => {
        let result = {auth: false};
        return new Promise((resolve, reject) => {
            activeTokenRepository.findActiveToken(bearer)
                .then((activeToken) => {
                    if (activeToken) {
                        if (activeToken.expiryTime > new Date()) {
                            result.auth = true;
                            result.message = 'Token is active';
                            result.body = token.constructResponseFromToken(activeToken);
                            resolve(result);
                        } else {
                            logger.info('Token expiry', activeToken);
                            result.message = 'Token expiry';
                            resolve(result);
                        }
                    } else {
                        logger.info('No token found', bearer);
                        result.message = 'Token not found';
                        resolve(result);
                    }
                }).catch(err => {
                    logger.error(CONSTANT.TECHNICAL_ERROR_PREFIX, bearer, err);
                    result.message = CONSTANT.TECHNICAL_ERROR_PREFIX + err;
                    reject(result);
                })
        })
    }
};

module.exports = auth;
