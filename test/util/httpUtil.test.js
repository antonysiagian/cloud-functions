const httpUtil = require('../../domains/util/httpUtil')
const assert = require('assert')


describe("This is test for testing of httpUtil", () => {

    it('Test when request header is empty', () => {
        assert.equal(null, httpUtil.getAuthToken(''))
    });

    it('Test when auth header consist of basic is not empty', ()=>{
        assert.equal('lkmasdlkamd', httpUtil.getAuthToken('Basic lkmasdlkamd'))
    })

    it('Test when auth header is correct', ()=>{
        assert.equal('d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw=', httpUtil.getAuthToken('Basic d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw='))
    })

    it('Test when auth header is too long with space' , ()=>{
        assert.equal(null, httpUtil.getAuthToken('Basic d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw= d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw='))
    })

    it('Test when auth header is too long without space', ()=>{
        assert.equal(null, httpUtil.getAuthToken('Basic d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw=d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw=d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw=d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw='))
    })
})