const request = require('request');

/**
 * @namespace
 * @private
 */
const Studies = {
    /**
     * Get all studies
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @returns {Promise} The expected result is an array containing Strings
     */
    getAll: function(client) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/studies',
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
     * Get the study with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     * @returns {Promise} The expected result is a JSON object
     */
    get: function(client, id) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/studies/' + id,
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
     * @todo Implementation of the function
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     */
    anonymize: function(client, id) {
        //TODO
    },
    /**
     * Get a zipped archive containing the study with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     * @returns {Promise} The expected response is a Buffer
     */
    getArchive: function(client, id) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/studies/' + id + '/archive',
                auth: client.auth
            })
            .on('response', function(response) {
                if(response.statusCode != 200) {
                    reject(new Error(response.statusCode + " " + response.statusMessage));
                }
                else {
                    const chunks = [];
                    response.on('data', function(data) {
                        chunks.push(data);
                    });
                    response.on('end', function() {
                        resolve(Buffer.concat(chunks), parseInt(response.headers['content-length']));
                    });
                }
            })
            .on('error', function(error) {
                reject(error);
            });
        });
    },
    /**
     * Get all the instances of the study with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     * @returns {Promise} The expected response is an array of JSON objects
     */
    getInstances: function(client, id) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/studies/' + id + '/instances',
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
     * Get a zipped archive containing the study with the given id for media storage with DICOMDIR
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     * @returns {Promise} The expected response is a Buffer
     */
    getMedia: function(client, id) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/studies/' + id + '/media',
                auth: client.auth
            })
            .on('response', function(response) {
                if(response.statusCode != 200) {
                    reject(new Error(response.statusCode + " " + response.statusMessage));
                }
                else {
                    const chunks = [];
                    response.on('data', function(data) {
                        chunks.push(data);
                    });
                    response.on('end', function() {
                        resolve(Buffer.concat(chunks), parseInt(response.headers['content-length']));
                    });
                }
            })
            .on('error', function(error) {
                reject(error);
            });
        });
    },
    /**
     * @todo Implementation of the function
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     */
    modify: function(client, id) {
        //TODO
    },
    /**
     * @todo Improve the documentation of this function
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     * @param {Boolean} [simplify=false] Specify whether or not the output should be simplified
     * @returns {Promise} The expected response is a JSON object
     */
    getModule: function(client, id, simplify) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/studies/' + id + '/module' + (simplify === true?'?simplify':''),
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
     * @todo Improve the documentation of this function
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     * @param {Boolean} [simplify=false] Specify whether or not the output should be simplified
     * @returns {Promise} The expected response is a JSON object
     */
    getModulePatient: function(client, id, simplify) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/studies/' + id + '/module-patient' + (simplify === true?'?simplify':''),
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
     * Get the parent Patient of the study with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     * @returns {Promise} The expected result is an array of JSON objects
     */
    getPatient: function(client, id) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/studies/' + id + '/patient',
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
     * Get all the series of the study with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     * @returns {Promise} The expected result is an array of JSON objects
     */
    getSeries: function(client, id) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/studies/' + id + '/series',
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
     * Get the shared tags of the study with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     * @param {Boolean} [simplify=false] Specify whether or not the output should be simplified
     * @returns {Promise} The expected response is a JSON object
     */
    getSharedTags: function(client, id, simplify) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/studies/' + id + '/shared-tags' + (simplify === true?'?simplify':''),
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
     * Get some general informations about the study with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted study
     * @returns {Promise} The expected response is a JSON object
     */
    getStatistics: function(client, id) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/studies/' + id + '/statistics',
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

module.exports = Studies;