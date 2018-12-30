const assert = require('assert')
const dispatcher = require('../dispatcher')
const testUtil = require('./util.test')
const logger = require('../util.logger')

describe('This is a test for authentication controller', () => {

    it('should return 404 status code, since no handler found', () => {
        let response = testUtil.createMockResponse();
        dispatcher.dispatch(testUtil.createMockRequestFor404Response(), response);
        assert.equal('404', response.statusCode)  
    })

    it('should return 405 status code, since no request method handler found',() => {
        let response = testUtil.createMockResponse();
        dispatcher.dispatch(testUtil.createMockRequestNoRequestMethodFound(), response);
        assert.equal('405', response.statusCode)  
    })

    it('should return the controller response', (done) => {
        let response = testUtil.createMockResponse();
        dispatcher.dispatch(testUtil.createSuccessGetTokenRequest(), response);

        response.onComplete()
            .then((backendResponse) => {
                logger.trace('Success getting backend response', backendResponse)
                assert.equal('200', backendResponse.statusCode)

                let isAuthRequest = testUtil.createSuccessIsAuthTokenRequest(backendResponse.jsonResponse.token)
                let isAuthResponse = testUtil.createMockResponse()
                
                dispatcher.dispatch(isAuthRequest, isAuthResponse)

                isAuthResponse.onComplete().then((isAuthResponse)=>{
                    logger.trace('isAuthResponse', isAuthResponse)
                    assert.equal(isAuthResponse.jsonResponse.token, backendResponse.jsonResponse.token)
                    done()
                })
            })
            .catch(onError => {
                logger.log('response error', onError)
                assert.equal(1, 0) //should be error
            })
    })

})