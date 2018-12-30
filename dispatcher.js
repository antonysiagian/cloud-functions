const router = require('./router').router;

module.exports.dispatch = (httpRequest, httpResponse) => {
    
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