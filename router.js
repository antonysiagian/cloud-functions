const controller = require('./controller');
const CONSTANT = require('./constant');

const router = {
    paths: [
        {
            path: '/token',
            method: 'POST',
            contentType: CONSTANT.CONTENT_TYPE_APPLICATION_JSON,
            handler: controller.getToken
        },
        {
            path: '/auth',
            method: 'GET',
            contentType: CONSTANT.CONTENT_TYPE_APPLICATION_JSON,
            handler: controller.isAuth
        }
    ]
};

module.exports.router = router;