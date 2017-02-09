const request = require('request');

/**
 * @namespace
 * @private
 */
const Patients = {
    /**
     * Get all patients
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @returns {Promise} The expected result is an array containing Strings
     */
    getAll: function(client) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/patients',
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
     * Get the patient with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted patient
     * @returns {Promise} The expected result is a JSON object
     */
    get: function(client, id) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/patients/' + id,
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
     * @param {String} id Id of the targeted patient
     */
    anonymize: function(client, id) {
        //TODO
    },
    /**
     * Get a zipped archive containing the patient with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted patient
     * @returns {Promise} The expected response is a Buffer
     */
    getArchive: function(client, id) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/patients/' + id + '/archive',
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
     * Get all the instances of the patient with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted patient
     * @returns {Promise} The expected response is an array of JSON objects
     */
    getInstances: function(client, id) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/patients/' + id + '/instances',
                auth: client.auth
            },
            function(error, response, body) {
                if (error)  {
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
     * Get a zipped archive containing the patient with the given id for media storage with DICOMDIR
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted patient
     * @returns {Promise} The expected response is a Buffer
     */
    getMedia: function(client, id) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/patients/' + id + '/media',
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
     * @param {String} id Id of the targeted patient
     */
    modify: function(client, id) {
        //TODO
    },
    /**
     * @todo Improve the documentation of this function
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted patient
     * @param {Boolean} [simplify=false]
     * @returns {Promise} The expected response is a JSON object
     */
    getModule: function(client, id, simplify) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/patients/' + id + '/module' + (true === simplify?'?simplify':''),
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
     * Get the protection against recycling status
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted patient
     * @returns {Promise} The expected result is a Boolean
     */
    getProtected: function(client, id) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/patients/' + id + '/protected',
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
                    resolve(1 === body);
                }
            });
        });
    },
    /**
     * Set the protection against recycling status
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted patient
     * @param {Boolean} protect Specify whether or not the patient should be protected against recycling
     * @returns {Promise} The expected response is empty
     */
    setProtected: function(client, id, protect) {
        return new Promise((resolve, reject) => {
        request
            .put({
                url: client.url + '/patients/' + id + '/protected',
                formData: {
                    protected: (protect?1:0)
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
    },
    /**
     * Get all the series of the patient with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted patient
     * @returns {Promise} The expected result is an array of JSON objects
     */
    getSeries: function(client, id) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/patients/' + id + '/series',
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
     * Get the shared tags of the patient with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted patient
     * @param {Boolean} [simplify=false]
     * @returns {Promise} The expected response is a JSON object
     */
    getSharedTags: function(client, id, simplify) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/patients/' + id + '/shared-tags' + (simplify === true?'?simplify':''),
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
     * Get some general informations about the patient with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted patient
     * @returns {Promise} The expected response is a JSON object
     */
    getStatistics: function(client, id) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/patients/' + id + '/statistics',
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
     * Get all the studies of the patient with the given id
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {String} id Id of the targeted patient
     * @returns {Promise} The expected response is an array of JSON objects
     */
    getStudies: function(client, id) {
        return new Promise((resolve, reject) => {
        request
            .get({
                url: client.url + '/patients/' + id + '/studies',
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

module.exports = Patients;