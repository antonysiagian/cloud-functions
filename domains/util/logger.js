const circularJson = require('circular-json')

module.exports.logOnError = (messagePrefix, ...err) => {
    console.error(`${messagePrefix} : ${circularJson.stringify(err)}`)
}

module.exports.log = (messagePrefix, ...objects) => {
    console.log(`${messagePrefix} : ${circularJson.stringify(objects)}`)
}