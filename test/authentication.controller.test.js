const assert = require('assert')
const dispatcher = require('../dispatcher')
const testUtil = require('./util.test')
const logger = require('../util.logger')

describe('This is a test for authentication controller', () => {

    it('should return 404 status code, since no handler found', (done) => {
        let response = testUtil.createMockResponse();
        dispatcher.dispatch(testUtil.createMockRequestFor404Response(), response);
        assert.strictEqual('404', response.statusCode)
        done()
    })

    it('should return 405 status code, since no request method handler found',(done) => {
        let response = testUtil.createMockResponse();
        dispatcher.dispatch(testUtil.createMockRequestNoRequestMethodFound(), response);
        assert.strictEqual('405', response.statusCode)
        done()
    })

    it('should return 415 status code, since no content type found',(done) => {
        let response = testUtil.createMockResponse();
        dispatcher.dispatch(testUtil.createRequestWithoutContentType(), response);
        assert.strictEqual('415', response.statusCode);
        done()
    })

    it('should return the controller response', (done) => {
        let response = testUtil.createMockResponse();
        dispatcher.dispatch(testUtil.createSuccessGetTokenRequest(), response);

        response.onComplete()
            .then((backendResponse) => {
                logger.trace('Success getting backend response', backendResponse)
                assert.strictEqual('200', backendResponse.statusCode)

                let isAuthRequest = testUtil.createSuccessIsAuthTokenRequest(backendResponse.jsonResponse.token)
                let isAuthResponse = testUtil.createMockResponse()
                
                dispatcher.dispatch(isAuthRequest, isAuthResponse)

                isAuthResponse.onComplete().then((isAuthResponse) => {
                    logger.trace('isAuthResponse', isAuthResponse)
                    assert.strictEqual(isAuthResponse.jsonResponse.token, backendResponse.jsonResponse.token)
                    done()
                })
            })
            .catch(onError => {
                logger.log('response error', onError)
                assert.strictEqual(1, 0) //should be error
                done();
            })
    })
})