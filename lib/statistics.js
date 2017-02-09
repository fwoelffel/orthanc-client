const request = require('request');

/**
 * @namespace
 * @private
 */
const Statistics = {
  /**
   * Get statistics of the orthanc instance
   * @private
   * @param {Client} client Client which will be used to perform the request
   * @returns {Promise} The expected response is an JSON Object
   */
  getStatistics(client){
    return new Promise((resolve, reject) => {
      request
        .get({
            url: client.url + '/statistics',
            auth: client.auth,
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
  }
};

module.exports = Statistics;