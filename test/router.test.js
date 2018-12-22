const assert = require('assert')
const router = require('../router')

describe('This is a test for router handler', () => {

    const mockRequest = {   
            path: '/', 
            method: 'GET'
        }

    const mockRequestNoRequestMethodFound = {   
            path: '/', 
            method: 'POST'
        }

    const mockRequestFor404Response = {   
            path: '/SampleOf404Path', 
            method: 'GET'
        }

    const mockResponse = {
        sendValue: "",
        statusCode: "",
        send: (responseToSend) => {
            mockResponse.sendValue = responseToSend;
            return mockResponse;
        },
        status: (newStatusCode) => {
            mockResponse.statusCode = newStatusCode;
            return mockResponse;
        },
        end: ()=>{
            //nothing todo here
            return mockResponse;
        },
        reset: () => {
            mockResponse.sendValue = "";
            mockResponse.statusCode = "";
        }
    }

    it('should return 404 status code, since no handler found', () => {
        router.handleRequest(mockRequestFor404Response, mockResponse);
        assert.equal('404', mockResponse.statusCode)  
    })

    it('should return 405 status code, since no request method handler found',() => {
        router.handleRequest(mockRequestNoRequestMethodFound, mockResponse);
        assert.equal('405', mockResponse.statusCode)  
    })

    it('should return controller response', () => {
        router.handleRequest(mockRequest, mockResponse);
        assert.equal('200', mockResponse.statusCode)
    })

})