const EXPIRY_DURATION_IN_MINUTES = process.env.EXPIRY_DURATION_IN_MINUTES || '10';
const uuidv4 = require('uuid/v4');
const date = require('date-and-time');
const CONSTANT  = require ('./constant');

const MAX_LENGTH_AUTH = 100;
const BASIC_AUTH_KEYWORD = "Basic";


module.exports.createActiveToken = (client) => {
    let dateStartTime = new Date();
    let expiryTime  = this.calculateExpiryTime(dateStartTime);
    return {
        'clientId': client.clientId,
        'uuid': uuidv4(),
        'startTime': dateStartTime,
        'expiryTime': expiryTime,
        'refreshToken': uuidv4()
    }
};

module.exports.calculateExpiryTime = (dateToAdd = new Date()) => {
    return date.addMinutes(dateToAdd, EXPIRY_DURATION_IN_MINUTES)
};

module.exports.constructResponseFromToken = (token) => {
    return {
        token: token.uuid,
        refreshToken: token.refreshToken,
        startTime: token.startTime,
        expiryTime: token.expiryTime
    }
};

module.exports.getAuthToken = (fullAuthToken) => {
    if (fullAuthToken
        && fullAuthToken.length < MAX_LENGTH_AUTH
        && fullAuthToken.indexOf(BASIC_AUTH_KEYWORD) === 0
        && (split = fullAuthToken.split(CONSTANT.STRING_EMTPY))
        && split.length === 2) {
        return split[1];
    }
};

module.exports.getBearerToken = (bearerToken) => {
    if (bearerToken
        && bearerToken.length < MAX_LENGTH_AUTH
        && bearerToken.indexOf(CONSTANT.BEARER) === 0
        && (split = bearerToken.split(CONSTANT.STRING_EMTPY))
        && split.length === 2) {
        return split[1];
    }
};

