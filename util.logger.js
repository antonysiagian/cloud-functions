const circularJson = require('circular-json')

const LEVEL_ERROR = 3;
const LEVEL_INFO = 2;
const LEVEL_DEBUG = 1;
const LEVEL_TRACE = 0;

module.exports.trace = (messagePrefix, ...objects) => {
    console.log(`TRACE ${messagePrefix} : ${circularJson.stringify(objects)}`)
}

module.exports.debug = (messagePrefix, ...objects) => {
    console.log(`DEBUG ${messagePrefix} : ${circularJson.stringify(objects)}`)
}

module.exports.error = (messagePrefix, ...err) => {
    console.error(`ERROR ${messagePrefix} : ${circularJson.stringify(err)}`)
}

module.exports.info = (messagePrefix, ...objects) => {
    console.log(`INFO ${messagePrefix} : ${circularJson.stringify(objects)}`)
}