const CONTROLLER = require('./controller')
const logger = require ('./util.logger')

const router = {
    paths: [
        {
            path: '/',
            method: 'GET', 
            handler: CONTROLLER.getToken
        }
    ]
}

module.exports.handleRequest = (httpRequest, httpResponse) => {
    
    let isPathExist = false;
    
    for(const pathInRouter of router.paths){
        if(pathInRouter.path === httpRequest.path){
            if(pathInRouter.method === httpRequest.method){
                return pathInRouter.handler(httpRequest, httpResponse)
            }
            isPathExist = true;
        }
    }

    if(isPathExist){
        httpResponse.status('405').end();
    }else{
        httpResponse.status('404').end();
    }
}