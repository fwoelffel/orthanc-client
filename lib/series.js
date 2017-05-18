const request = require('request');

/**
 * @namespace
 * @private
 */
const Series = {
    /**
     * Get all series
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @returns {Promise} The expected result is an array containing Strings
     */
    getAll: function(client) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/series',
                auth: {
                    user: client.auth.username,
                    password: client.auth.password
                }
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
     * Get the series with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted series
     * @returns {Promise} The expected result is a JSON object
     */
    get: function(client, id) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/series/' + id,
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
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/series/' + id + '/archive',
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
     * Get all the instances of the series with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted series
     * @returns {Promise} The expected response is an array of JSON objects
     */
    getInstances: function(client, id) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/series/' + id + '/instances',
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
     * Get a zipped archive containing the series with the given id for media storage with DICOMDIR
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted series
     * @returns {Promise} The expected response is a Buffer
     */
    getMedia: function(client, id) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/series/' + id + '/media',
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
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/series/' + id + '/module' + (simplify === true?'?simplify':''),
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
     * Get the parent Patient of the series with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted series
     * @returns {Promise} The expected result is an array of JSON objects
     */
    getPatient: function(client, id) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url:client.url + '/series/' + id + '/patient',
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
     * Get the shared tags of the series with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted series
     * @param {Boolean} [simplify=false] Specify whether or not the output should be simplified
     * @returns {Promise} The expected response is a JSON object
     */
    getSharedTags: function(client, id, simplify) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/series/' + id + '/shared-tags' + (simplify === true?'?simplify':''),
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
     * Get some general informations about the series with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted series
     * @returns {Promise} The expected response is a JSON object
     */
    getStatistics: function(client, id) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/series/' + id + '/statistics',
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
     * Get the parent Study of the series with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted series
     * @returns {Promise} The expected result is an array of JSON objects
     */
    getStudy: function(client, id) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/series/' + id + '/study',
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

module.exports = Series;