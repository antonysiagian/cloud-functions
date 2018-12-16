const base64 = require('base-64')
const utf8 = require('utf8')
const uuidv4 = require('uuid/v4')
const date = require('date-and-time')

const EXPIRY_DURATION_IN_MINUTES = process.env.EXPIRY_DURATION_IN_MINUTES || '10';

const clientService = require('./client.service')
const activeTokenService = require('./activetoken.service')
const logger = require('./util.logger')


const auth = {

    getExpiryTime(dateToAdd = new Date()){
        return date.addMinutes(dateToAdd, EXPIRY_DURATION_IN_MINUTES)
    },
    createNewActiveToken(findResult){
        dateStartTime = new Date();
        return {'clientId': findResult.clientId, 'uuid': uuidv4(), 'startTime': dateStartTime, 'expiryTime': auth.getExpiryTime(dateStartTime), 'refreshToken': uuidv4()}
    },
    constructResponseFromNewToken(newToken){
        return {token: newToken.uuid, refreshToken: newToken.refreshToken, startTime: newToken.startTime, expiryTime: newToken.expiryTime}
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
                            .then(resolveThePromise(auth.constructResponseFromNewToken(newActiveToken)))
                            .catch(err => {
                                logger.logOnError(`Fail to insert active token`, err)
                                reject(err)
                            })
                    }else{
                        logger.logOnError(`Could not find token`, findResult)
                        reject('Could not find client')
                    }
                })
                .catch(err => {
                    reject('Could not find client')
                })
        })
    }, 

    isAuth: (bearer) => {
        return new Promise((resolve, reject) => {
            activeTokenService.findActiveToken(bearer)
                .then((activeToken) => {
                    if(activeToken){
                        resolve(auth.constructResponseFromNewToken(activeToken))
                    }else{
                        logger.log('No Active token found')
                        reject('no active token found')
                    }
                }).catch( err => reject(`token not found: ${err}`))
        })
    }

} 

module.exports = auth;
