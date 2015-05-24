/**
 * Creates a new Client
 * @class
 * @param {Object} param
 * @param {String} [param.url=http://localhost:8042] Orthanc REST API's URL
 * @param {Object} param.auth
 * @param {String} param.auth.username Valid Orthanc Server username
 * @param {String} param.auth.password Valide Orthanc Server password
 */
var Client = function(param) {

    /**
     * Orthanc REST API's url
     * @type {String}
     */
    this.url = param.url || 'http://localhost:8042';

    /**
     * Orthanc REST API's user credentials
     * @type {Object}
     * @property {String} username Username which will be used by the client to authenticate against Orthanc server
     * @property {String} password Password which will be used by the client to authenticate against Orthanc server
     */
    // TODO Check if param.auth exists
    this.auth = {
        username: param.auth.username || '',
        password: param.auth.password || ''
    };

}