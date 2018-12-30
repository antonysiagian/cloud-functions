const router = require('./router').router;
const logger = require('./util.logger')

module.exports.dispatch = (httpRequest, httpResponse) => {
    
    let isPathExist = false;
    
    for(const pathInRouter of router.paths){
        if(pathInRouter.path === httpRequest.path){
            if(pathInRouter.method === httpRequest.method){
                logger.info('New Request arrive and will be handled', httpRequest)
                return pathInRouter.handler(httpRequest, httpResponse)
            }
            isPathExist = true;
        }
    }

    if(isPathExist){
        logger.info('New request arrive and does not have any method handler', httpRequest)
        httpResponse.status('405').end()
    }else{
        logger.info('New request arrive and does not have any endpoint handler', httpRequest)
        httpResponse.status('404').end()
    }

}