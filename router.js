const controller = require('./controller')

const router = {
    paths: [
        {
            path: '/',
            method: 'GET', 
            handler: controller.getToken
        }
    ]
}

module.exports.router = router;