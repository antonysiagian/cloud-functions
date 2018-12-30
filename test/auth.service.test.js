const assert = require('assert')
const authService = require('../authentication.service')
const logger = require('../util.logger')

describe('This is tests for authService', () => {

    const webAppToken = `d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw=` //web_app:web_app_credential
    it ('should return a new token and the token must be authenticated', (done) => {
        
        authService.getToken(webAppToken)

        .then(result => {

            assert.notEqual(null, result.token)
            assert.notEqual(null, result.startTime)
            assert.notEqual(null, result.expiryTime)
            assert.notEqual(null, result.refreshToken)

            authService.isAuth(result.token)
                .then((isAuthResult) => {
                    assert.notEqual(null, isAuthResult.token)
                    assert.notEqual(null, isAuthResult.startTime)
                    assert.notEqual(null, isAuthResult.expiryTime)
                    assert.notEqual(null, result.refreshToken)
                    done();
                })
                .catch(err => logger.logOnError('Error when calling is auth', err))
            }
        ).catch((err) => {
            logger.logOnError(`Error on get token`, err);
        });
        
    })

    it('should not return any token because no app registered', (done) => {
        authService.getToken('TestNoToken').then(
            result => {
                //should not go to here
                assert.equal(1, 0)
            }
        ).catch(err => {
            assert.equal('Could not find client', err)
            done()
        })
    })

});