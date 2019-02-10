const assert = require('assert');
const dispatcher = require('../dispatcher');
const testUtil = require('./util.test');
const activeTokenRepository = require ('../activetoken.repository');

describe('This is a test for authentication controller', () => {

    after(() => {
        activeTokenRepository.removeAll();
    });

    it('should return 404 status code, since no handler found', (done) => {
        let response = testUtil.createMockResponse();
        dispatcher.dispatch(testUtil.createMockRequestFor404Response(), response);
        assert.strictEqual('404', response.statusCode);
        done()
    });

    it('should return 405 status code, since no request method handler found', (done) => {
        let response = testUtil.createMockResponse();
        dispatcher.dispatch(testUtil.createMockRequestNoRequestMethodFound(), response);
        assert.strictEqual('405', response.statusCode);
        done()
    });

    it('should return 415 status code, since no content type found', (done) => {
        let response = testUtil.createMockResponse();
        dispatcher.dispatch(testUtil.createRequestWithoutContentType(), response);
        assert.strictEqual('415', response.statusCode);
        done()
    });

});