const assert = require('assert');

const token = require('../token');

describe("This is test for testing of httpUtil", () => {

    it('Test when request header is empty', () => {
        assert.strictEqual(undefined, token.getAuthToken(''))
    });

    it('Test when auth header consist of basic is not empty', () => {
        assert.strictEqual('lkmasdlkamd', token.getAuthToken('Basic lkmasdlkamd'))
    });

    it('Test when auth header is correct', () => {
        assert.strictEqual('d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw=', token.getAuthToken('Basic d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw='))
    });

    it('Test when auth header is too long with space', () => {
        assert.strictEqual(undefined, token.getAuthToken('Basic d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw= d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw='))
    });

    it('Test when auth header is too long without space', () => {
        assert.strictEqual(undefined, token.getAuthToken('Basic d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw=d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw=d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw=d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw='))
    });

    it('Test get bearer token', () => {
        assert.strictEqual('SampleOFBearerToken', token.getBearerToken('Bearer SampleOFBearerToken'))
    });
})