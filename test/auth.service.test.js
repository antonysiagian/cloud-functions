const uuid = require('uuid').v4;
const dateAndTime = require('date-and-time');

const assert = require('assert');
const authService = require('../authentication.service');
const logger = require('../util.logger');
const activeTokenRepository = require('../activetoken.repository');

describe('This is tests for authService', () => {

    after(() => {
        activeTokenRepository.removeAll();
    });

    const webAppToken = `d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw=`; //web_app:web_app_credential
    it('should return a new token and the token must be authenticated', (done) => {

        authService.getToken(webAppToken)

            .then(result => {

                    assert.notStrictEqual(null, result.token)
                    assert.notStrictEqual(null, result.startTime)
                    assert.notStrictEqual(null, result.expiryTime)
                    assert.notStrictEqual(null, result.refreshToken)

                    authService.isAuth(result.token)
                        .then((isAuthResult) => {
                            assert.notStrictEqual(null, isAuthResult.token);
                            assert.notStrictEqual(null, isAuthResult.startTime);
                            assert.notStrictEqual(null, isAuthResult.expiryTime);
                            assert.notStrictEqual(null, result.refreshToken);
                            done();
                        })
                        .catch(err => logger.error('Error when calling is auth', err))
                }
            ).catch((err) => {
            logger.error(`Error on get token`, err);
        });
    });

    it('should not return any token because no app registered', (done) => {
        authService.getToken('TestNoToken').then(
            result => {
                //should not go to here
                assert.strictEqual(1, 0)
            }
        ).catch(err => {
            assert.strictEqual('Could not find client', err)
            done()
        })
    });

    it('should return token is expired', (done) => {
        let activeToken = authService.createActiveToken({clientId: uuid()});
        //set token to expiry
        activeToken.startTime = dateAndTime.addMinutes(activeToken.startTime, -10)
        activeToken.expiryTime = dateAndTime.addMinutes(activeToken.expiryTime, -10)

        activeTokenRepository.insertActiveToken(activeToken)
            .then(() => {
                authService.isAuth(activeToken.uuid)
                    .then(result => {
                        logger.trace('activeToken should be expired', activeToken)
                        assert.strictEqual(false, result, 'the token should be expiry');
                        done();
                    })
                    .catch(err => {
                        logger.error('Active token is error', err)
                        assert.strictEqual(1, 0, 'should not go here');
                        done();
                    })
            })
    });
});