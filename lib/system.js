var request = require('request');
var q = require('q');

/**
 * @namespace
 * @private
 */
var System = {
    /**
     * Get some information about the Orthanc Server
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @returns {Promise} The expected response is a JSON object
     */
    system: function(client) {
        var deferred = q.defer();
        request
            .get({
                url: client.url + '/system',
                auth: client.auth
            },
            function(error, response, body) {
                if (error) {
                    deferred.reject(error);
                }
                else if (response.statusCode != 200) {
                    deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                }
                else {
                    deferred.resolve(JSON.parse(body));
                }
            });
        return deferred.promise;
    }
};

module.exports = System;