const request = require('request');

/**
 * @namespace
 * @private
 */
const Queries = {
  /**
   * Get all queries
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @returns {Promise} The expected response is an array containing Strings
   */

  getAll: function(client) {
    return new Promise((resolve, reject) => {
      request
        .get({
            url: client.url + '/queries',
            auth: client.auth
          },
          (error, response, body) => {
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
   * Get the query with the given id
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of the query instance
   * @returns {Promise} The expected result is a JSON object
   */
  get: function(client, id) {
    return new Promise((resolve, reject) => {
      request
        .get({
            url: client.url + '/queries/' + id,
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
   * Remove the query with the given id
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of the targeted query
   * @returns {Promise} The expected result is a JSON object
   */
  remove: function(client, id) {
    return new Promise((resolve, reject) => {
      request
        .delete({
            url: client.url + '/queries/' + id,
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
   * List answers of the query with the given id
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of targeted the query
   * @returns {Promise} The expected response is an array containing Integer
   */
  answers: function(client, id) {
    return new Promise((resolve, reject) => {
      request
        .get({
            url: client.url + '/queries/' + id + '/answers',
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
   * Get content of the answer index of the query with the given id
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of the targeted query
   * @param {Number} index Index of the targeted answer
   * @param {Boolean} [simplify=false] Specify whether or not the output should be simplified
   * @returns {Promise} The expected result is a JSON object
   */
  answerContent: function(client, id, index, simplify) {
    return new Promise((resolve, reject) => {
      request
        .get({
            url: client.url + '/queries/' + id + '/answers/' + index + '/content' + (simplify === true?'?simplify':''),
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
   * Send answer to aet of the query with the given id
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of the targeted query
   * @param {Number} index Index of the targeted answer
   * @param {String} aet AET of the targeted modality
   * @returns {Promise} The expected result is a JSON object
   */
  answerRetrieve: function(client, id, index, aet) {
    return new Promise((resolve, reject) => {
      request
        .post({
            url: client.url + '/queries/' + id + '/answers/' + index + '/retrieve',
            auth: client.auth,
            formData: {
              AET: aet
            },
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
   * Get the level of the query with the given id
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of the targeted query
   * @returns {Promise} The expected result is a String
   */
  getLevel: function(client, id) {
    return new Promise((resolve, reject) => {
      request
        .get({
            url: client.url + '/queries/' + id + '/level',
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
   * Get the level of the query with the given id
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of the targeted query
   * @returns {Promise} The expected result is a String
   */
  getModality: function(client, id) {
    return new Promise((resolve, reject) => {
      request
        .get({
            url: client.url + '/queries/' + id + '/modality',
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
   * Get the content of the query with the given id
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of the targeted query
   * @param {Boolean} [simplify=false] Specify whether or not the output should be simplified
   * @returns {Promise} The expected response is a JSON Object
   */
  getQuery: function(client, id, simplify) {
    return new Promise((resolve, reject) => {
      request
        .get({
            url: client.url + '/queries/' + id + '/query' + (simplify === true?'?simplify':''),
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
   * Send all results of the queries with the given id to the modality with the given aet
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of the targeted query
   * @param {String} aet AET of the targeted modality
   * @returns {Promise} The expected response is a JSON object
   */
  retrieve: function(client, id, aet) {
    return new Promise((resolve, reject) => {
      request
        .post({
            url: client.url + '/queries/' + id + '/retrieve',
            auth: client.auth,
            formData: {
              AET: aet
            },
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
};

module.exports = Queries;