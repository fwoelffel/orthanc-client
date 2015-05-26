var request = require('request');
var q = require('q');

/**
 * @namespace
 * @private
 */
var Series = {
    /**
     * Get all series
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @returns {Promise} The expected result is an array containing Strings
     */
    getAll: function(client) {
        var deferred = q.defer();
        request
            .get(client.url + '/series',
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * Get the series with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted series
     * @returns {Promise} The expected result is a JSON object
     */
    get: function(client, id) {
        var deferred = q.defer();
        request
            .get(client.url + '/series/' + id,
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * @todo Implementation of the function
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted series
     */
    anonymize: function(client, id) {
        //TODO
    },
    /**
     * Get a zipped archive containing the series with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted series
     * @returns {Promise} The expected response is a Buffer
     */
    getArchive: function(client, id) {
        var deferred = q.defer();
        request
            .get(client.url + '/series/' + id + '/archive')
            .auth(client.auth.username, client.auth.password, false)
            .on('response', function(response) {
                if(response.statusCode != 200) {
                    deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                }
                else {
                    var chunks = [];
                    response.on('data', function(data) {
                        chunks.push(data);
                    });
                    response.on('end', function() {
                        deferred.resolve(Buffer.concat(chunks), parseInt(response.headers['content-length']));
                    });
                }
            })
            .on('error', function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    },
    /**
     * Get all the instances of the series with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted series
     * @returns {Promise} The expected response is an array of JSON objects
     */
    getInstances: function(client, id) {
        var deferred = q.defer();
        request
            .get(client.url + '/series/' + id + '/instances',
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * Get a zipped archive containing the series with the given id for media storage with DICOMDIR
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted series
     * @returns {Promise} The expected response is a Buffer
     */
    getMedia: function(client, id) {
        var deferred = q.defer();
        request
            .get(client.url + '/series/' + id + '/media')
            .auth(client.auth.username, client.auth.password, false)
            .on('response', function(response) {
                if(response.statusCode != 200) {
                    deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                }
                else {
                    var chunks = [];
                    response.on('data', function(data) {
                        chunks.push(data);
                    });
                    response.on('end', function() {
                        deferred.resolve(Buffer.concat(chunks), parseInt(response.headers['content-length']));
                    });
                }
            })
            .on('error', function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    },
    /**
     * @todo Implementation of the function
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted series
     */
    modify: function(client, id) {
        //TODO
    },
    /**
     * @todo Improve the documentation of this function
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted series
     * @param {Boolean} [simplify=false] Specify whether or not the output should be simplified
     * @returns {Promise} The expected response is a JSON object
     */
    getModule: function(client, id, simplify) {
        var deferred = q.defer();
        request
            .get(client.url + '/series/' + id + '/module' + (simplify === true?'?simplify':''),
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * Get the parent Patient of the series with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted series
     * @returns {Promise} The expected result is an array of JSON objects
     */
    getPatient: function(client, id) {
        var deferred = q.defer();
        request
            .get(client.url + '/series/' + id + '/patient',
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * Get the shared tags of the series with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted series
     * @param {Boolean} [simplify=false] Specify whether or not the output should be simplified
     * @returns {Promise} The expected response is a JSON object
     */
    getSharedTags: function(client, id, simplify) {
        var deferred = q.defer();
        request
            .get(client.url + '/series/' + id + '/shared-tags' + (simplify === true?'?simplify':''),
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * Get some general informations about the series with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted series
     * @returns {Promise} The expected response is a JSON object
     */
    getStatistics: function(client, id) {
        var deferred = q.defer();
        request
            .get(client.url + '/series/' + id + '/statistics',
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * Get the parent Study of the series with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted series
     * @returns {Promise} The expected result is an array of JSON objects
     */
    getStudy: function(client, id) {
        var deferred = q.defer();
        request
            .get(client.url + '/series/' + id + '/study',
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    }
}

module.exports = Series;