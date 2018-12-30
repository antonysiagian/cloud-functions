const base64 = require('base-64')
const utf8 = require('utf8')
const uuidv4 = require('uuid/v4')
const date = require('date-and-time')

const EXPIRY_DURATION_IN_MINUTES = process.env.EXPIRY_DURATION_IN_MINUTES || '10';

const clientService = require('./client.service')
const activeTokenService = require('./activetoken.service')
const logger = require('./util.logger')


const auth = {

    calculateExpiryTime(dateToAdd = new Date()){
        return date.addMinutes(dateToAdd, EXPIRY_DURATION_IN_MINUTES)
    },
    createNewActiveToken(client){
        dateStartTime = new Date();
        return {'clientId': client.clientId, 'uuid': uuidv4(), 'startTime': dateStartTime, 'expiryTime': auth.calculateExpiryTime(dateStartTime), 'refreshToken': uuidv4()}
    },
    constructResponseFromToken(token){
        return {token: token.uuid, refreshToken: token.refreshToken, startTime: token.startTime, expiryTime: token.expiryTime}
    },
    getToken: (authorisationCredential) => {

        const bytes = utf8.encode(authorisationCredential)
        let params = base64.decode(bytes).split(":")
        
        return new Promise((resolveThePromise, reject) => {
            clientService.findByClientIdAndCredential(params[0], params[1])
                .then(findResult => {
                    if(findResult){
                        const newActiveToken = auth.createNewActiveToken(findResult);
                        activeTokenService.insertActiveToken(newActiveToken)
                            .then(resolveThePromise(auth.constructResponseFromToken(newActiveToken)))
                            .catch(err => {
                                logger.logOnError(`Fail to insert active token`, err)
                                reject(err)
                            })
                    }else{
                        logger.logOnError(`Could not find token`, ['Find Result is', findResult])
                        reject('Could not find client')
                    }
                })
                .catch(err => {
                    logger.logOnError('Could not find client', ['err is', err])
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
                            logger.log('Token expiry', activeToken)
                            resolve(false)
                        }
                    }else{
                        logger.log('No token found', bearer)
                        resolve(false)
                    }
                }).catch( err => {
                    logger.logOnError('Something wrong when looking for activeToken', bearer)
                    reject(false)
                })
        })
    }

} 

module.exports = auth;
