const dispatcher = require('./dispatcher')

exports.functions = (req, res) => {
    dispatcher.dispatch(req, res);
}