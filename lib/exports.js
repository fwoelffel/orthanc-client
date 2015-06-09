var request = require('request');
var q = require('q');

/**
 * @namespace
 * @private
 */
var Exports = {
    /**
     * Get exports logs. For medical traceability, Orthanc stores a log of all the resources that have been exported to remote modalities.
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {Object} [params] last, "limit" and "since" arguments
     * @param {Boolean} [params.last=false] Specify whether or not only the last export should be returned
     * @param {Integer} [params.since=0] Set the sequence number since which exports should be returned
     * @param {Integer} [params.limit=100] Set the returned exports limit. Default and maximum values are the same : 100
     * @returns {Promise} The expected response is a JSON object
     */
    getExports: function(client, params) {
        var deferred = q.defer();
        if(params === undefined){
            params = {};
        }
        if(params.last === undefined || typeof params.last !== 'boolean' || params.last === false) {
            params.last = undefined;
        }
        if(params.last === undefined || !params.last) {
            if (params.limit === undefined || typeof params.limit !== 'number') params.limit = 0;
            if (params.since === undefined || typeof params.since !== 'number') params.since = undefined;
        }
        request
            .get({
                url: client.url + '/exports',
                qs: params,
                auth: client.auth
            },
            function(error, response, body) {
                if (error) {
                    deferred.reject(error);
                }
                else if (response.statusCode != 200) {
                    deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                }
                else {
                    deferred.resolve(JSON.parse(body));
                }
            });
        return deferred.promise;
    },
    /**
     * Delete exports logs
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @returns {Promise} The expected response is empty
     */
    deleteExports: function(client) {
        var deferred = q.defer();
        request
            .del({
                url: client.url + '/exports',
                auth: client.auth
            },
            function(error, response, body) {
                if (error) {
                    deferred.reject(error);
                }
                else if (response.statusCode != 200) {
                    deferred.reject(new Error(response.statusCode + " " + response.statusMessage));
                }
                else {
                    deferred.resolve(body);
                }
            });
        return deferred.promise;
    }
};

module.exports = Exports;