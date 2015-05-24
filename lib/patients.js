var request = require('request');
var q = require('q');

/**
 * @namespace
 */
var Patients = {
    /**
     * Get all patients
     * @param {Client} client Client which will be used to perform the request
     * @returns {Promise} The expected result is an array containing Strings
     */
    getAll: function(client) {
        var deferred = q.defer();
        request
            .get(client.url + '/patients',
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * Get the patient with the given id
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted patient
     * @returns {Promise} The expected result is a JSON object
     */
    get: function(client, id) {
        var deferred = q.defer();
        request
            .get(client.url + '/patients/' + id,
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
     * @param {String} id Id of the targeted patient
     */
    anonymize: function(client, id) {
        //TODO
    },
    /**
     * Get a zipped archive containing the patient with the given id
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted patient
     * @returns {Promise} The expected response is a Buffer
     */
    getArchive: function(client, id) {
        var deferred = q.defer();
        request
            .get(client.url + '/patients/' + id + '/archive')
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
     * Get all the instances of the patient with the given id
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted patient
     * @returns {Promise} The expected response is an array of JSON objects
     */
    getInstances: function(client, id) {
        var deferred = q.defer();
        request
            .get(client.url + '/patients/' + id + '/instances',
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * Get a zipped archive containing the patient with the given id for media storage with DICOMDIR
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted patient
     * @returns {Promise} The expected response is a Buffer
     */
    getMedia: function(client, id) {
        var deferred = q.defer();
        request
            .get(client.url + '/patients/' + id + '/media')
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
     * @param {String} id Id of the targeted patient
     */
    modify: function(client, id) {
        //TODO
    },
    /**
     * @todo Improve the documentation of this function
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted patient
     * @param {Boolean} [simplify=false]
     * @returns {Promise} The expected response is a JSON object
     */
    getModule: function(client, id, simplify) {
        var deferred = q.defer();
        request
            .get(client.url + '/patients/' + id + '/module' + (simplify === true?'?simplify':''),
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * Get the protection against recycling status
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted patient
     * @returns {Promise} The expected result is a Boolean
     */
    getProtected: function(client, id) {
        var deferred = q.defer();
        request
            .get(client.url + '/patients/' + id + '/protected',
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve((body === 1?true:false));
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * Set the protection against recycling status
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted patient
     * @param {Boolean} protect Specify whether or not the patient should be protected against recycling
     * @returns {Promise} The expected response is empty
     */
    setProtected: function(client, id, protect) {
        var deferred = q.defer();
        request
            .put({
                url: client.url + '/patients/' + id + '/protected',
                formData: {
                    protected: (protect?1:0)
                }
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
     * Get all the series of the patient with the given id
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted patient
     * @returns {Promise} The expected result is an array of JSON objects
     */
    getSeries: function(client, id) {
        var deferred = q.defer();
        request
            .get(client.url + '/patients/' + id + '/series',
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * Get the shared tags of the patient with the given id
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted patient
     * @param {Boolean} [simplify=false]
     * @returns {Promise} The expected response is a JSON object
     */
    getSharedTags: function(client, id, simplify) {
        var deferred = q.defer();
        request
            .get(client.url + '/patients/' + id + '/shared-tags' + (simplify === true?'?simplify':''),
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * Get some general informations about the patient with the given id
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted patient
     * @returns {Promise} The expected response is a JSON object
     */
    getStatistics: function(client, id) {
        var deferred = q.defer();
        request
            .get(client.url + '/patients/' + id + '/statistics',
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    },
    /**
     * Get all the studies of the patient with the given id
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted patient
     * @returns {Promise} The expected response is an array of JSON objects
     */
    getStudies: function(client, id) {
        var deferred = q.defer();
        request
            .get(client.url + '/patients/' + id + '/studies',
            function(error, response, body) {
                if (error) deferred.reject(error);
                else if (response.statusCode != 200) deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                else deferred.resolve(body);
            })
            .auth(client.auth.username, client.auth.password, false);
        return deferred.promise;
    }
}

module.exports = Patients;