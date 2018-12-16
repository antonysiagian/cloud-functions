const logger = require('./util.logger')
const constants = require('./constant')

const MAX_LENGTH_AUTH = 100;
const BASIC_AUTH_KEYWORD = "Basic"

module.exports.getAuthToken = (fullAuthToken) => {
    
    if(fullAuthToken 
        && fullAuthToken.length < MAX_LENGTH_AUTH
        && fullAuthToken.indexOf(BASIC_AUTH_KEYWORD) === 0 
        && (split = fullAuthToken.split(constants.STRING_EMTPY)) 
        && split.length === 2){
        return split[1];
    }
    
}