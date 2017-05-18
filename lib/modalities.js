const request = require('request');

/**
 * @namespace
 * @private
 */
const Modalities = {
  /**
   * Get all modalities
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @returns {Promise} The expected response is an array containing Strings
   */
  getAll: function(client) {
    return new Promise((resolve, reject) => {
      request
        .get({
            url: client.url + '/modalities',
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
   * Get the modality with the given id
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of the targeted modality
   * @returns {Promise} The expected result is a JSON object
   */
  get: function(client, id) {
    return new Promise((resolve, reject) => {
      request
        .get({
            url: client.url + '/modalities/' + id,
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
   * Add the modality with the the given id
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id will assign to the modality
   * @param {Array} params Array with the parameters of the modality [aet, ip, port]
   * @returns {Promise} The expected result is an empty JSON object
   */
  add: function(client, id, params) {
    return new Promise((resolve, reject) => {
      request
        .put({
            url: client.url + '/modalities/' + id,
            auth: client.auth,
            json: true,
            body: params
          },
          (error, response, body) => {
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
   * Remove the modality with the the given id
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of the targeted modality
   * @returns {Promise} The expected result is an empty JSON object
   */
  remove: function(client, id) {
    return new Promise((resolve, reject) => {
      request
        .delete({
            url: client.url + '/modalities/' + id,
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
              resolve(body);
            }
          });
    });
  },
  /**
   * Send ECHO SCU request to the modality with the given id
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id The id of the targeted modality
   * @returns {Promise} The expected response is an empty JSON Object
   */
  echo: function(client, id) {
    return new Promise((resolve, reject) => {
      request
        .post({
            url: client.url + '/modalities/' + id + '/echo',
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
   * Send C-FIND SCU request to the modality with the given id
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id The id of the targeted modality
   * @param {Object} query The query object {Level: '': Query: {}}
   * @returns {Promise} The expected response is an JSON Object
   */
  query: function(client, id, query) {
    return new Promise((resolve, reject) => {
      request
        .post({
            url: client.url + '/modalities/' + id + '/query',
            auth: client.auth,
            body: query,
            json: true
          },
          (error, response, body) => {
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
};

module.exports = Modalities;