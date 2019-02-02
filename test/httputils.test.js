const httpUtil = require('../util.http')
const assert = require('assert')


describe("This is test for testing of httpUtil", () => {

    it('Test when request header is empty', () => {
        assert.strictEqual(undefined, httpUtil.getAuthToken(''))
    });

    it('Test when auth header consist of basic is not empty', () => {
        assert.strictEqual('lkmasdlkamd', httpUtil.getAuthToken('Basic lkmasdlkamd'))
    })

    it('Test when auth header is correct', () => {
        assert.strictEqual('d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw=', httpUtil.getAuthToken('Basic d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw='))
    })

    it('Test when auth header is too long with space', () => {
        assert.strictEqual(undefined, httpUtil.getAuthToken('Basic d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw= d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw='))
    })

    it('Test when auth header is too long without space', () => {
        assert.strictEqual(undefined, httpUtil.getAuthToken('Basic d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw=d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw=d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw=d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw='))
    })

    it('Test get bearer token', () => {
        assert.strictEqual('SampleOFBearerToken', httpUtil.getBearerToken('Bearer SampleOFBearerToken'))
    })
})