const activeTokenRepository = require('../activetoken.repository');
const assert = require('assert');
const logger = require('../util.logger');

describe('This test is used to identify behavior of repository', () => {

    let activeToken = {
        id: -1,
        clientId: 'test',
        uuid: 'sampleOfUUID',
        startTime: new Date(),
        expiryTime: new Date(),
        refreshToken: 'refreshToken'
    };

    let insertPromise = null;

    before(() => {
        insertPromise = activeTokenRepository.createActiveToken(activeToken);
    });

    after(() => {
        activeTokenRepository.removeAll();
    });

    it('will create a new record of activeToken', (done) => {
        insertPromise
            .then(() => {
                let findPromise = activeTokenRepository.findActiveToken('sampleOfUUID');
                findPromise.then((val) => {
                    logger.info('Returned token from repository', val);
                    assert.strictEqual(val.id, activeToken.id);
                    done();
                })
            })
    });

    it('will try to find non existent token', (done) => {
        insertPromise.then(() => {
            let findPromise = activeTokenRepository.findActiveToken('nonexistentToken');
            findPromise.then((data) => {
                logger.info('Find promise result', data);
                done();
            });
        })
    });

});