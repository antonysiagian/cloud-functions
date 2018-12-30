const assert = require('assert')
const dispatcher = require('../dispatcher')
const utilTest = require('./util.test')
const logger = require('../util.logger')

describe('This is a test for dispatcher', () => {

    it('should return 404 status code, since no handler found', () => {
        let response = utilTest.createMockResponse();
        dispatcher.dispatch(utilTest.createMockRequestFor404Response(), response);
        assert.equal('404', response.statusCode)  
    })

    it('should return 405 status code, since no request method handler found',() => {
        let response = utilTest.createMockResponse();
        dispatcher.dispatch(utilTest.createMockRequestNoRequestMethodFound(), response);
        assert.equal('405', response.statusCode)  
    })

    it('should return the controller response', () => {
        let response = utilTest.createMockResponse();
        dispatcher.dispatch(utilTest.createSuccessGetTokenRequest(), response);

        response.onComplete()
            .then((backendResponse) => {
                logger.log('Success getting backend response', backendResponse)
                assert.equal('200', backendResponse.statusCode)
            })
            .catch(onError => {
                logger.log('response error', onError)
                assert.equal(1, 0) //should be error
            })
    })

})