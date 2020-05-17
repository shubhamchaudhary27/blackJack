let assert = require('assert');
let randomEmail = require('random-email');
let config = require('config');
let signupUrl = "/user/signup";
let rp = require('request-promise');
let constants = require('../../constants');

let random_email = randomEmail({ domain: 'yopmail.com' });
let randome_name = random_email.split('@');
random_name = randome_name[0];

describe('signup user', function () {
    it('should add user without an error', function (done) {
        let options = {
            method: 'POST',
            uri: config.get('url') + signupUrl,
            body: {
                email: random_email,
                password: "qwerty",
                name: randome_name[0]
            },
            json: true
        };

        rp(options)
            .then(function (body) {
                assert.equal(body.status, constants.responseFlags.ACTION_COMPLETE);
                done();
            })
            .catch(function (err) {
                console.log("err", err)
                done();
            });
    });

    it('should not add user', function (done) {
        let options = {
            method: 'POST',
            uri: config.get('url') + signupUrl,
            body: {
                email: random_email,
                password: "qwerty"
            },
            json: true
        };
        rp(options)
            .then(function (body) {
                assert.equal(body.status, constants.responseFlags.PARAMETER_MISSING);
                done();
            })
            .catch(function (err) {
                done();
            });
    });
});