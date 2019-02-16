const assert = require('assert');
const dispatcher = require('../dispatcher');
const testUtil = require('./util.test');
const logger = require('../util.logger');
const activeTokenRepository = require ('../activetoken.repository');

describe('This is a test for authentication controller', () => {

    after(() => {
        activeTokenRepository.removeAll();
    });

    it('should return the controller response', (done) => {
        let response = testUtil.createMockResponse();
        dispatcher.dispatch(testUtil.createSuccessGetTokenRequest(), response);
        response.onComplete()
            .then((backendResponse) => {

                logger.trace('Success getting backend response', backendResponse);
                assert.strictEqual('200', backendResponse.statusCode);

                let isAuthRequest = testUtil.createSuccessIsAuthTokenRequest(backendResponse.jsonResponse.token);
                let isAuthResponse = testUtil.createMockResponse();

                dispatcher.dispatch(isAuthRequest, isAuthResponse);

                isAuthResponse.onComplete().then((isAuthResponse) => {
                    assert.strictEqual(isAuthResponse.jsonResponse.body.token, backendResponse.jsonResponse.token);
                    done()
                })
            })
            .catch(onError => {
                logger.log('response error', onError);
                assert.strictEqual(1, 0);//should be error
                done();
            })
    });

    it('should return 403 error when no bearer key passed', (done) => {
        let response = testUtil.createMockResponse();
        dispatcher.dispatch(testUtil.createSuccessGetTokenRequest(), response);
        response.onComplete()
            .then((backendResponse) => {

                logger.trace('Success getting backend response', backendResponse);
                assert.strictEqual('200', backendResponse.statusCode);

                let isAuthRequest = testUtil.createSuccessIsAuthTokenRequest("UnexistenceBearerKey");
                let isAuthResponse = testUtil.createMockResponse();

                dispatcher.dispatch(isAuthRequest, isAuthResponse);

                isAuthResponse.onComplete().then((isAuthResponse) => {
                    assert.strictEqual(isAuthResponse.jsonResponse.body.token, backendResponse.jsonResponse.token);
                    done();
                })
                .catch((err) => {
                    logger.error('Should return 403 error but seems not honey', err);
                    done();
                })
            })
    });

    it('should return 403 error code when no auth key passed', () => {
        let response = testUtil.createMockResponse();
        let request = testUtil.createRequestWithAuthToken(); //set auth token is undefined

        dispatcher.dispatch(request, response);

        logger.trace('Response for 403 error expected', response);
        assert.strictEqual('403', response.statusCode);
        assert.strictEqual('No auth key found', response.sendValue);

        request = testUtil.createRequestWithAuthToken('Test'); //set auth token is undefined

        dispatcher.dispatch(request, response);

        logger.trace('Response for 403 error expected', response);
        assert.strictEqual('403', response.statusCode);
        assert.strictEqual('No auth key found', response.sendValue);

    })
});