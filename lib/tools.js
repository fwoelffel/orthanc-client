const request = require('request');

/**
 * @namespace
 * @private
 */
const Tools =  {
    /**
     * Returns the current datetime in the ISO 8601 format
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @returns {Promise} The expected response is a String
     */
    now: function(client) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/tools/now',
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
                    resolve(body);
                }
            });
        });
    },
    /**
     * Hot restart of Orthanc, the configuration file will be read again
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @returns {Promise} The expected response is an empty JSON object
     */
    reset: function(client) {
        return new Promise((resolve, reject) => {
        request
            .post({
                url: client.url + '/tools/reset',
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
    },
    /**
     * Map DICOM UIDs to Orthanc identifiers
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {UUID} uuid UUID which will be used to perform the lookup
     * @returns {Promise} The expected result is an array containing a JSON object
     */
    lookup: function(client, uuid) {
        return new Promise((resolve, reject) => {
        request
            .post({
                url: client.url + '/tools/lookup',
                formData: {
                    UUID: uuid
                },
                auth: client.auth
            }, function(error, response, body) {
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
    },
    /**
     * DICOM conformance statement of this version of Orthanc
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @returns {Promise} The expected result is a String
     */
    dicomConformance: function(client) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/tools/dicom-conformance',
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
                    resolve(body);
                }
            });
        });
    },
    /**
     * Generates an UUID
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} level argument among "patient", "study", "series" and "instance"
     * @returns {Promise} The expected result is a String
     */
    generateUid: function(client, level) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/tools/generate-uid',
                qs: {
                    level: level
                },
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
                    resolve(body);
                }
            });
        });
    }
};

module.exports = Tools;