const sequelize = require('../sequelize')

describe('Test sequelize connection', () => {
    it('should print a connection', (done) => {
        sequelize
            .authenticate()
            .then(() => {
                done();
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
                done();
            });
    })
})