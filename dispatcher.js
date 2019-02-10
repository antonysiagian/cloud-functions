const router = require('./router').router;
const logger = require('./util.logger');

module.exports.dispatch = (httpRequest, httpResponse) => {

    let isPathExist = false;
    let contentTypeNotFound = false;
    let contentType = httpRequest.get('content-type');

    logger.info(`A new request accepted ${httpRequest.path} : ${httpRequest.method} : ${contentType}`, httpRequest);

    for (const pathInRouter of router.paths) {
        if (pathInRouter.path === httpRequest.path) {
            if (pathInRouter.method === httpRequest.method) {
                if (pathInRouter.contentType === contentType) {
                    return pathInRouter.handler(httpRequest, httpResponse)
                } else {
                    contentTypeNotFound = true;
                }
            }
            isPathExist = true;
        }
    }

    if (isPathExist) {
        if (contentTypeNotFound) {
            logger.info('Content type is not found', httpRequest);
            httpResponse.status('415').end()
        } else {
            logger.info('New request arrive and does not have any method handler', httpRequest);
            httpResponse.status('405').end()
        }
    } else {
        logger.info('New request arrive and does not have any endpoint handler', httpRequest);
        httpResponse.status('404').end()
    }
};