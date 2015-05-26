var request = require('request');
var q = require('q');

/**
 * @namespace
 * @private
 */
var Tools =  {
    /**
     * Returns the current datetime in the ISO 8601 format
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @returns {Promise} The expected response is a String
     */
    now: function(client) {
        var deferred = q.defer();
        request
            .get(client.url + '/tools/now',
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * Hot restart of Orthanc, the configuration file will be read again
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @returns {Promise} The expected response is an empty JSON object
     */
    reset: function(client) {
        var deferred = q.defer();
        request
            .post(client.url + '/tools/reset',
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * Map DICOM UIDs to Orthanc identifiers
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {UUID} uuid UUID which will be used to perform the lookup
     * @returns {Promise} The expected result is an array containing a JSON object
     */
    lookup: function(client, uuid) {
        var deferred = q.defer();
        request
            .post({
                url: client.url + '/tools/lookup',
                formData: {
                    UUID: uuid
                }
            }, function(error, response, body) {
                deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);;
        return deferred.promise;
    },
    /**
     * DICOM conformance statement of this version of Orthanc
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @returns {Promise} The expected result is a String
     */
    dicomConformance: function(client) {
        var deferred = q.defer();
        request
            .get({
                url: client.url + '/tools/dicom-conformance'
            },
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * Generates an UUID
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} level argument among "patient", "study", "series" and "instance"
     * @returns {Promise} The expected result is a String
     */
    generateUid: function(client, level) {
        var deferred = q.defer();
        request
            .get({
                url: client.url + '/tools/generate-uid',
                qs: {
                    level: level
                }
            },
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    }
}

module.exports = Tools;