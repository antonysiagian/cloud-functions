const CONSTANT = require('../constant')

module.exports.createSuccessGetTokenRequest = () => {
    return {
        path: '/token',
        method: 'GET',
        get(param) {
            if (param === CONSTANT.AUTHORIZATION) {
                return "Basic d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw="
            } else if (param === CONSTANT.CONTENT_TYPE) {
                return CONSTANT.CONTENT_TYPE_APPLICATION_JSON;
            } else {
                return param
            }
        }
    }
}

module.exports.createRequestWithoutContentType = () => {
    return {
        path: '/token',
        method: 'GET',
        get(param) {
            if (param === CONSTANT.AUTHORIZATION) {
                return "Basic d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw="
            } else if (param === CONSTANT.CONTENT_TYPE) {
                return null;
            } else {
                return param
            }
        }
    }
}

module.exports.createSuccessIsAuthTokenRequest = (bearerKey) => {
    return {
        path: '/auth',
        method: 'GET',
        get(param) {
            if (param === CONSTANT.AUTHORIZATION) {
                return `Bearer ${bearerKey}`
            } else if (param === CONSTANT.CONTENT_TYPE) {
                return CONSTANT.CONTENT_TYPE_APPLICATION_JSON;
            } else {
                return param
            }
        }
    }
}

module.exports.createMockRequestNoRequestMethodFound = () => {
    return {
        path: '/token',
        method: 'POST',
        get(param) {
            if (param === CONSTANT.CONTENT_TYPE) {
                return CONSTANT.CONTENT_TYPE_APPLICATION_JSON;
            }
        }
    }
}

module.exports.createMockRequestFor404Response = () => {
    return {
        path: '/SampleOf404Path',
        method: 'GET',
        get(param) {
            if (param === CONSTANT.CONTENT_TYPE) {
                return CONSTANT.CONTENT_TYPE_APPLICATION_JSON;
            }
        }
    }
}

module.exports.createMockResponse = () => {
    return {
        sendValue: "",
        statusCode: "",
        jsonResponse: "",
        resolveResponse(param) {
            return param
        },
        rejectResponse(param) {
            return param
        },
        send(responseToSend) {
            this.sendValue = responseToSend
            this.resolveResponse(this)
            return this
        },
        status(newStatusCode) {
            this.statusCode = newStatusCode
            return this
        },
        end() {
            //nothing todo here
            this.resolveResponse(this)
            return this
        },
        reset() {
            this.sendValue = ""
            this.statusCode = ""
            this.jsonResponse = ""
            return this
        },
        json(jsonResponse) {
            this.jsonResponse = jsonResponse
            this.resolveResponse(this)
            return this
        },
        onComplete() {
            return new Promise((resolve, reject) => {
                this.resolveResponse = resolve
                this.rejectResponse = reject
            })
        }
    }
}