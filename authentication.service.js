const EXPIRY_DURATION_IN_MINUTES = process.env.EXPIRY_DURATION_IN_MINUTES || '10';
const base64 = require('base-64')
const utf8 = require('utf8')
const uuidv4 = require('uuid/v4')
const date = require('date-and-time')

const clientService = require('./client.service')
const activeTokenService = require('./activetoken.service')
const logger = require('./util.logger')

const auth = {

    calculateExpiryTime(dateToAdd = new Date()){
        return date.addMinutes(dateToAdd, EXPIRY_DURATION_IN_MINUTES)
    },
    createActiveToken(client){
        dateStartTime = new Date();
        return {'clientId': client.clientId, 'uuid': uuidv4(), 'startTime': dateStartTime, 'expiryTime': auth.calculateExpiryTime(dateStartTime), 'refreshToken': uuidv4()}
    },
    constructResponseFromToken(token){
        return {token: token.uuid, refreshToken: token.refreshToken, startTime: token.startTime, expiryTime: token.expiryTime}
    },
    getToken: (authorisationCredential) => {

        const bytes = utf8.encode(authorisationCredential)
        let params = base64.decode(bytes).split(":")
        
        return new Promise((resolve, reject) => {
            clientService.findByClientIdAndCredential(params[0], params[1])
                .then(client => {
                    if(client){
                        const newActiveToken = auth.createActiveToken(client);
                        activeTokenService.insertActiveToken(newActiveToken)
                            .then(resolve(auth.constructResponseFromToken(newActiveToken)))
                            .catch(err => {
                                logger.error(`Fail to insert active token`, err)
                                reject(err)
                            })
                    }else{
                        logger.error(`Could not find token`, ['Client is', client])
                        reject('Could not find client')
                    }
                })
                .catch(err => {
                    logger.error('Could not find client', ['err is', err])
                    reject('Could not find client')
                })
        })
    }, 

    isAuth: (bearer) => {
        return new Promise((resolve, reject) => {
            activeTokenService.findActiveToken(bearer)
                .then((activeToken) => {
                    if(activeToken){
                        if(activeToken.expiryTime > new Date()){
                            resolve(auth.constructResponseFromToken(activeToken))
                        }else{
                            logger.info('Token expiry', activeToken)
                            resolve(false)
                        }
                    }else{
                        logger.error('No token found', bearer)
                        resolve(false)
                    }
                }).catch( err => {
                    logger.error('Something wrong when looking for activeToken', bearer, err)
                    reject(false)
                })
        })
    }

} 

module.exports = auth;
