const CONST = require('../constant')

module.exports.createSuccessGetTokenRequest = () => {
    return {   
        path: '/', 
        method: 'GET',
        get(param) { 
            if(param === CONST.AUTHORIZATION){
                return "Basic d2ViX2FwcDp3ZWJfYXBwX2NyZWRlbnRpYWw="
            }else{
                return param
            }
        }
    }
}

module.exports.createMockRequestNoRequestMethodFound = () => {
    return {   
        path: '/', 
        method: 'POST'  
    }
}   

module.exports.createMockRequestFor404Response = () => {
    return {   
        path: '/SampleOf404Path', 
        method: 'GET'
    }
}

module.exports.createMockResponse = () => {
    return {
        sendValue: "",
        statusCode: "",
        jsonResponse: "",
        resolveResponse(param){
            return param
        },
        rejectResponse(param){
            return param
        },
        send(responseToSend){
            this.sendValue = responseToSend
            this.resolveResponse(this)
            return this
        },
        status(newStatusCode) {
            this.statusCode = newStatusCode
            return this
        },
        end(){
            //nothing todo here
            this.resolveResponse(this)
            return this
        },
        reset(){
            this.sendValue = ""
            this.statusCode = ""
            this.jsonResponse = ""
            return this
        },
        json(jsonResponse){
            this.jsonResponse = jsonResponse
            this.resolveResponse(this)
            return this
        },
        onComplete(){
            return new Promise((resolve, reject) => {
                this.resolveResponse = resolve
                this.rejectResponse = reject
            })
        }
    }
}