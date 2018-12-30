const controller = require('./controller')

const router = {
    paths: [
        {
            path: '/token',
            method: 'GET', 
            handler: controller.getToken
        },
        {
            path: '/auth',
            method: 'GET', 
            handler: controller.isAuth
        }
    ]
}

module.exports.router = router;