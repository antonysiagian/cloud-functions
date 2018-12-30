const dispatcher = require('./dispatcher')

exports.security = (req, res) => {
    dispatcher.dispatch(req, res);
}