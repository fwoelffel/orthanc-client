const request = require('request');

/**
 * @namespace
 * @private
 */
const System = {
    /**
     * Get some information about the Orthanc Server
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @returns {Promise} The expected response is a JSON object
     */
    system: function(client) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/system',
                auth: client.auth
            },
            function(error, response, body) {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode != 200) {
                    reject(new Error(response.statusCode + " " + response.statusMessage));
                }
                else {
                    resolve(JSON.parse(body));
                }
            });
        });
    }
};

module.exports = System;