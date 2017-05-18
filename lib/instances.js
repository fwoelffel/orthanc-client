const request = require('request');

/**
 * @namespace
 * @private
 */
const Instances = {
  /**
   * Get all instances
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @returns {Promise} The expected response is an array containing Strings
   */
  getAll: function(client) {
    return new Promise((resolve, reject) => {
      request
        .get({
            url: client.url + '/instances',
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
   * Get the instance with the given id
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of the targeted instance
   * @returns {Promise} The expected result is a JSON object
   */
  get: function(client, id) {
    return new Promise((resolve, reject) => {
      request
        .get({
            url: client.url + '/instances/' + id,
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
   * Add the new DICOM file given as a Buffer
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {Buffer} buffer The DICOM file which will be uploaded
   * @returns {Promise} The expected result is a JSON object
   */
  add: function(client, buffer) {
    return new Promise((resolve, reject) => {
      request
        .post({
            url: client.url + '/instances',
            body: buffer,
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
   * @param {String} id Id of the targeted instance
   */
  anonymize: function(client, id) {
    //TODO
  },
  /**
   * Get raw access to DICOM tags. If both group and element are provided, get raw access to the value of the targeted DICOM tag. If index is also provided, get raw access to the targeted DICOM sequence value.
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of the targeted instance
   * @param {String} [group] Group number of the targeted element
   * @param {String} [element] Element number of the targeted value
   * @param {Number} [index] Index number of the targeted sequence value
   * @returns {Promise} The expected value is either an array containing Strings, either a String (if group and element are both provided)
   */
  getContent: function(client, id, group, element, index) {
    return new Promise((resolve, reject) => {
      let url = client.url + '/instances/' + id + '/content/';
      if(group != undefined && typeof group === 'string') {
        if(element != undefined && typeof element === 'string') {
          url += group + '-' + element;
          if(index != undefined && typeof index === 'number') {
            url += '/' + index;
          }
        }
      }
      request
        .get({
            url: url,
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
              if('application/json' === response.headers['content-type']) {
                resolve(JSON.parse(body))
              }
              else {
                resolve(body);
              }
            }
          });
    });
  },
  /**
   * Write the DICOM file in the filesystem where Orthanc is running
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of the targeted instance
   * @returns {Promise} The expected response is an empty JSON object
   */
  export: function(client, id) {
    return new Promise((resolve, reject) => {
      request
        .post({
            url: client.url + '/instances/' + id + '/export/',
            formData: {
              file: id + '.dcm'
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
              resolve(JSON.parse(body));
            }
          });
    });
  },
  /**
   * Get the .dcm file of the instance with the given id
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of the targeted instance
   * @returns {Promise} The expected response is a Buffer
   */
  getFile: function(client, id) {
    return new Promise((resolve, reject) => {
      request
        .get({
          url: client.url + '/instances/' + id + '/file',
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
   * Get an array containing all the frames index of the instance with the given id
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of the targeted instance
   * @returns {Promise} The expected response is an array containing Numbers
   */
  getAllFrames: function(client, id) {
    return new Promise((resolve, reject) => {
      request
        .get({
            url: client.url + '/instances/' + id + '/frames',
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
   * Get the frameNumber'th frame of the instance with the given id
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of the targeted instance
   * @param {Number} frameNumber Index of the targeted frame
   * @param {String} [frameFormat=preview] Wanted format for the targeted frame. Must be image-int16, image-uint16, image-uint8, matlab or preview
   */
  getFrame: function(client, id, frameNumber, frameFormat) {
    return new Promise((resolve, reject) => {
      if (frameFormat === undefined) {
        frameFormat = 'preview';
      }
      request
        .get({
          url: client.url + '/instances/' + id + '/frames/' + frameNumber + '/' + frameFormat,
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
   * Get the image of the instance with the given id
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of the targeted instance
   * @param {String} [imageFormat=preview] Wanted format for the targeted frame. Must be image-int16, image-uint16, image-uint8, matlab or preview
   */
  getImage: function(client, id, imageFormat) {
    return new Promise((resolve, reject) => {
      if (imageFormat === undefined) {
        imageFormat = 'preview';
      }
      request
        .get({
          url: client.url + '/instances/' + id + '/' + imageFormat,
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
   * @param {String} id Id of the targeted instance
   */
  modify: function(client, id) {
    //TODO
  },
  /**
   * @todo Improve the documentation of this function
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of the targeted instance
   * @param {Boolean} [simplify=false] Specify whether or not the output should be simplified
   * @returns {Promise} The expected response is a JSON object
   */
  getModule: function(client, id, simplify) {
    return new Promise((resolve, reject) => {
      request
        .get({
            url: client.url + '/instances/' + id + '/module' + (simplify === true?'?simplify':''),
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
   * Get the parent Patient of the instance with the given id
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of the targeted instance
   * @returns {Promise} The expected result is a JSON objects
   */
  getPatient: function(client, id) {
    return new Promise((resolve, reject) => {
      request
        .get({
            url: client.url + '/instances/' + id + '/patient',
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
   * Get the parent Series of the instance with the given id
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of the targeted instance
   * @returns {Promise} The expected result is a JSON objects
   */
  getSeries: function(client, id) {
    return new Promise((resolve, reject) => {
      request
        .get({
            url: client.url + '/instances/' + id + '/series',
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
   * Get the tags of the instance with the given id
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of the targeted instance
   * @param {Boolean} [simplify=false] Specify whether or not the output should be simplified
   * @returns {Promise} The expected response is a JSON object
   */
  getTags: function(client, id, simplify) {
    return new Promise((resolve, reject) => {
      request
        .get({
            url: client.url + '/instances/' + id + '/tags' + (simplify === true?'?simplify':''),
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
   * Get some general informations about the instance with the given id
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of the targeted instance
   * @returns {Promise} The expected response is a JSON object
   */
  getStatistics: function(client, id) {
    return new Promise((resolve, reject) => {
      request
        .get({
            url: client.url + '/instances/' + id + '/statistics',
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
   * Get the parent Study of the instance with the given id
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @param {String} id Id of the targeted instance
   * @returns {Promise} The expected result is a JSON objects
   */
  getStudy: function(client, id) {
    return new Promise((resolve, reject) => {
      request
        .get({
            url: client.url + '/instances/' + id + '/study',
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

module.exports = Instances;