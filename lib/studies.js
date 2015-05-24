var request = require('request');
var q = require('q');

/**
 * @namespace
 */
var Studies = {
    /**
     * Get all studies
     * @param {Client} client Client which will be used to perform the request
     * @returns {Promise} The expected result is an array containing Strings
     */
    getAll: function(client) {
        var deferred = q.defer();
        request
            .get(client.url + '/studies',
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * Get the study with the given id
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     * @returns {Promise} The expected result is a JSON object
     */
    get: function(client, id) {
        var deferred = q.defer();
        request
            .get(client.url + '/studies/' + id,
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
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     */
    anonymize: function(client, id) {
        //TODO
    },
    /**
     * Get a zipped archive containing the study with the given id
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     * @returns {Promise} The expected response is a Buffer
     */
    getArchive: function(client, id) {
        var deferred = q.defer();
        request
            .get(client.url + '/studies/' + id + '/archive')
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
     * Get all the instances of the study with the given id
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     * @returns {Promise} The expected response is an array of JSON objects
     */
    getInstances: function(client, id) {
        var deferred = q.defer();
        request
            .get(client.url + '/studies/' + id + '/instances',
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * Get a zipped archive containing the study with the given id for media storage with DICOMDIR
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     * @returns {Promise} The expected response is a Buffer
     */
    getMedia: function(client, id) {
        var deferred = q.defer();
        request
            .get(client.url + '/studies/' + id + '/media')
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
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     */
    modify: function(client, id) {
        //TODO
    },
    /**
     * @todo Improve the documentation of this function
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     * @param {Boolean} [simplify=false] Specify whether or not the output should be simplified
     * @returns {Promise} The expected response is a JSON object
     */
    getModule: function(client, id, simplify) {
        var deferred = q.defer();
        request
            .get(client.url + '/studies/' + id + '/module' + (simplify === true?'?simplify':''),
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * @todo Improve the documentation of this function
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     * @param {Boolean} [simplify=false] Specify whether or not the output should be simplified
     * @returns {Promise} The expected response is a JSON object
     */
    getModulePatient: function(client, id, simplify) {
        var deferred = q.defer();
        request
            .get(client.url + '/studies/' + id + '/module-patient' + (simplify === true?'?simplify':''),
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * Get the parent Patient of the study with the given id
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     * @returns {Promise} The expected result is an array of JSON objects
     */
    getPatient: function(client, id) {
        var deferred = q.defer();
        request
            .get(client.url + '/studies/' + id + '/patient',
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * Get all the series of the study with the given id
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     * @returns {Promise} The expected result is an array of JSON objects
     */
    getSeries: function(client, id) {
        var deferred = q.defer();
        request
            .get(client.url + '/studies/' + id + '/series',
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * Get the shared tags of the study with the given id
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     * @param {Boolean} [simplify=false]
     * @returns {Promise} The expected response is a JSON object
     */
    getSharedTags: function(client, id, simplify) {
        var deferred = q.defer();
        request
            .get(client.url + '/studies/' + id + '/shared-tags' + (simplify === true?'?simplify':''),
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * Get some general informations about the study with the given id
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     * @returns {Promise} The expected response is a JSON object
     */
    getStatistics: function(client, id) {
        var deferred = q.defer();
        request
            .get(client.url + '/studies/' + id + '/statistics',
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    }
}

module.exports = Studies;