'use strict';

const got = require('got');
const util = require('util');
const should = require('should');

const smtpConfig = require('./smtpConfig');
const smtpServerUrl = util.format('http://%s:%s', smtpConfig.host, smtpConfig.port);

module.exports.validateEmail = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            const messages = await got({
                method: 'GET',
                url: smtpServerUrl + '/api/v1/messages',
                timeout: 2000
            });

            if (messages === '[]') {
                reject(new Error('The SMTP server did not get the email...'));
            } else {
                should(JSON.parse(messages).length).eql(1);
                const email = JSON.parse(messages)[0];
                console.log(email);
                resolve(email);
            }
        }, 1000);
    });
};

module.exports.clearAllOldMails = () => {
    return got({
        method: 'DELETE',
        url: smtpServerUrl + '/api/v1/messages',
        timeout: 2000
    });
};