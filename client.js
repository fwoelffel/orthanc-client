var instances = require('./lib/instances');
var series = require('./lib/series');
var studies = require('./lib/studies');
var patients = require('./lib/patients');
var tools = require('./lib/tools');
var system = require('./lib/system');
var changes = require('./lib/changes');
var exports = require('./lib/exports');
/**
 * Creates a new Client
 * @class
 * @param {Object} param
 * @param {String} [param.url=http://localhost:8042] Orthanc REST API's URL
 * @param {Object} [param.auth]
 * @param {String} [param.auth.user] Valid Orthanc Server username
 * @param {String} [param.auth.pass] Valid Orthanc Server password
 */
var Client = function(param) {

    var self = this;

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
    this.auth = param.auth;
    if('undefined' !== typeof this.auth && ('string' !== typeof this.auth.user || 'string' !== typeof this.auth.pass)) {
        if('string' === typeof this.auth.username || 'string' === typeof this.auth.password) {
            this.auth = {
                user: this.auth.username,
                pass: this.auth.password
            }
        }
        else {
            throw new Error('Invalid credentials');
        }
    }

    /**
     * Operations over instances
     */
    this.instances = {
        /**
         * Get all instances
         * @returns {Promise} The expected response is an array containing Strings
         */
        getAll: function() {return instances.getAll(self)},
        /**
         * Get the instance with the given id
         * @param {String} id Id of the targeted instance
         * @returns {Promise} The expected result is a JSON object
         */
        get: function(id) {return instances.get(self, id)},
        /**
         * Add the new DICOM file given as a Buffer
         * @param {Buffer} buffer The DICOM file which will be uploaded
         * @returns {Promise} The expected result is a JSON object
         */
        add: function(buffer) {return instances.add(self, buffer)},
        //anonymize: function() {//TODO},
        /**
         * Get raw access to DICOM tags. If both group and element are provided, get raw access to the value of the targeted DICOM tag. If index is also provided, get raw access to the targeted DICOM sequence value.
         * @param {String} id Id of the targeted instance
         * @param {String} [group] Group number of the targeted element
         * @param {String} [element] Element number of the targeted value
         * @param {Integer} [index] Index number of the targeted sequence value
         * @returns {Promise} The expected value is either an array containing Strings, either a String (if group and element are both provided)
         */
        getContent: function(id, group, element, index) {return instances.getContent(self, id, group, element, index)},
        /**
         * Write the DICOM file in the filesystem where Orthanc is running
         * @param {String} id Id of the targeted instance
         * @returns {Promise} The expected response is an empty JSON object
         */
        export: function(id) {return instances.export(self, id)},
        /**
         * Get the .dcm file of the instance with the given id
         * @param {String} id Id of the targeted instance
         * @returns {Promise} The expected response is a Buffer
         */
        getFile: function(id) {return instances.getFile(self, id)},
        /**
         * Get an array containing all the frames index of the instance with the given id
         * @param {String} id Id of the targeted instance
         * @returns {Promise} The expected response is an array containing Integers
         */
        getAllFrames: function(id) {return instances.getAllFrames(self, id)},
        /**
         * Get the frameNumber'th frame of the instance with the given id
         * @param {String} id Id of the targeted instance
         * @param {Integer} frameNumber Index of the targeted frame
         * @param {String} [frameFormat=preview] Wanted format for the targeted frame. Must be image-int16, image-uint16, image-uint8, matlab or preview
         */
        getFrame: function(id, frameNumber, frameFormat) {return instances.getFrame(self, id, frameNumber, frameFormat)},
        /**
         * Get the image of the instance with the given id
         * @param {String} id Id of the targeted instance
         * @param {String} [imageFormat=preview] Wanted format for the targeted frame. Must be image-int16, image-uint16, image-uint8, matlab or preview
         */
        getImage: function(id, imageFormat) {return instances.getImage(self, id, imageFormat)},
        //modify: function(id) {//TODO},
        /**
         * @todo Improve the documentation of this function
         * @param {String} id Id of the targeted instance
         * @param {Boolean} [simplify=false] Specify whether or not the output should be simplified
         * @returns {Promise} The expected response is a JSON object
         */
        getModule: function(id, simplify) {return instances.getModule(self, id, simplify)},
        /**
         * Get the parent Patient of the instance with the given id
         * @param {String} id Id of the targeted instance
         * @returns {Promise} The expected result is a JSON objects
         */
        getPatient: function(id) {return instances.getPatient(self, id)},
        /**
         * Get the parent Series of the instance with the given id
         * @param {String} id Id of the targeted instance
         * @returns {Promise} The expected result is a JSON objects
         */
        getSeries: function(id) {return instances.getSeries(self, id)},
        /**
         * Get the tags of the instance with the given id
         * @param {String} id Id of the targeted instance
         * @param {Boolean} [simplify=false] Specify whether or not the output should be simplified
         * @returns {Promise} The expected response is a JSON object
         */
        getTags: function(id, simplify) {return instances.getTags(self, id, simplify)},
        /**
         * Get some general informations about the instance with the given id
         * @param {String} id Id of the targeted instance
         * @returns {Promise} The expected response is a JSON object
         */
        getStatistics: function(id) {return instances.getStatistics(self, id)},
        /**
         * Get the parent Study of the instance with the given id
         * @param {String} id Id of the targeted instance
         * @returns {Promise} The expected result is a JSON objects
         */
        getStudy: function(id) {return instances.getStudy(self, id)}
    };
    /**
     * Operations over series
     */
    this.series = {
        /**
         * Get all series
         * @returns {Promise} The expected result is an array containing Strings
         */
        getAll: function() {return series.getAll(self)},
        /**
         * Get the series with the given id
         * @param {String} id Id of the targeted series
         * @returns {Promise} The expected result is a JSON object
         */
        get: function(id) {return series.get(self, id)},
        //anonymize: function() {//TODO},
        /**
         * Get a zipped archive containing the series with the given id
         * @param {String} id Id of the targeted series
         * @returns {Promise} The expected response is a Buffer
         */
        getArchive: function(id) {return series.getArchive(self, id)},
        /**
         * Get all the instances of the series with the given id
         * @param {String} id Id of the targeted series
         * @returns {Promise} The expected response is an array of JSON objects
         */
        getInstances: function(id) {return series.getInstances(self, id)},
        /**
         * Get a zipped archive containing the series with the given id for media storage with DICOMDIR
         * @param {String} id Id of the targeted series
         * @returns {Promise} The expected response is a Buffer
         */
        getMedia: function(id) {return series.getMedia(self, id)},
        //modify: function() {//TODO},
        /**
         * @todo Improve the documentation of this function
         * @param {String} id Id of the targeted series
         * @param {Boolean} [simplify=false] Specify whether or not the output should be simplified
         * @returns {Promise} The expected response is a JSON object
         */
        getModule: function(id, simplify) {return series.getModule(self, id, simplify)},
        /**
         * Get the parent Patient of the series with the given id
         * @param {String} id Id of the targeted series
         * @returns {Promise} The expected result is an array of JSON objects
         */
        getPatient: function(id) {return series.getPatient(self, id)},
        /**
         * Get the shared tags of the series with the given id
         * @param {String} id Id of the targeted series
         * @param {Boolean} [simplify=false] Specify whether or not the output should be simplified
         * @returns {Promise} The expected response is a JSON object
         */
        getSharedTags: function(id, simplify) {return series.getSharedTags(self, id, simplify)},
        /**
         * Get some general informations about the series with the given id
         * @param {String} id Id of the targeted series
         * @returns {Promise} The expected response is a JSON object
         */
        getStatistics: function(id) {return series.getStatistics(self, id)},
        /**
         * Get the parent Study of the series with the given id
         * @param {String} id Id of the targeted series
         * @returns {Promise} The expected result is an array of JSON objects
         */
        getStudy: function(id) {return series.getStudy(self, id)}
    };
    /**
     * Operations over studies
     */
    this.studies = {
        /**
         * Get all studies
         * @returns {Promise} The expected result is an array containing Strings
         */
        getAll: function() {return studies.getAll(self)},
        /**
         * Get the study with the given id
         * @param {String} id Id of the targeted study
         * @returns {Promise} The expected result is a JSON object
         */
        get: function(id) {return studies.get(self, id)},
        //anonymize: function() {//TODO},
        /**
         * Get a zipped archive containing the study with the given id
         * @param {String} id Id of the targeted study
         * @returns {Promise} The expected response is a Buffer
         */
        getArchive: function(id) {return studies.getArchive(self, id)},
        /**
         * Get all the instances of the study with the given id
         * @param {String} id Id of the targeted study
         * @returns {Promise} The expected response is an array of JSON objects
         */
        getInstances: function(id) {return studies.getInstances(self, id)},
        /**
         * Get a zipped archive containing the study with the given id for media storage with DICOMDIR
         * @param {String} id Id of the targeted study
         * @returns {Promise} The expected response is a Buffer
         */
        getMedia: function(id) {return studies.getMedia(self, id)},
        //modify: function() {//TODO},
        /**
         * @todo Improve the documentation of this function
         * @param {String} id Id of the targeted study
         * @param {Boolean} [simplify=false] Specify whether or not the output should be simplified
         * @returns {Promise} The expected response is a JSON object
         */
        getModule: function(id, simplify) {return studies.getModule(self, id, simplify)},
        /**
         * @todo Improve the documentation of this function
         * @param {String} id Id of the targeted study
         * @param {Boolean} [simplify=false] Specify whether or not the output should be simplified
         * @returns {Promise} The expected response is a JSON object
         */
        getModulePatient: function(id, simplify) {return studies.getModulePatient(self, id, simplify)},
        /**
         * Get the parent Patient of the study with the given id
         * @param {String} id Id of the targeted study
         * @returns {Promise} The expected result is an array of JSON objects
         */
        getPatient: function(id) {return studies.getPatient(self, id)},
        /**
         * Get all the series of the study with the given id
         * @param {String} id Id of the targeted study
         * @returns {Promise} The expected result is an array of JSON objects
         */
        getSeries: function(id) {return studies.getSeries(self, id)},
        /**
         * Get the shared tags of the study with the given id
         * @param {String} id Id of the targeted study
         * @param {Boolean} [simplify=false] Specify whether or not the output should be simplified
         * @returns {Promise} The expected response is a JSON object
         */
        getSharedTags: function(id, simplify) {return studies.getSharedTags(self, id, simplify)},
        /**
         * Get some general informations about the study with the given id
         * @param {String} id Id of the targeted study
         * @returns {Promise} The expected response is a JSON object
         */
        getStatistics: function(id) {return studies.getStatistics(self, id)}
    };
    /**
     * Operations over patients
     */
    this.patients = {
        /**
         * Get all patients
         * @returns {Promise} The expected result is an array containing Strings
         */
        getAll: function() {return patients.getAll(self)},
        /**
         * Get the patient with the given id
         * @param {String} id Id of the targeted patient
         * @returns {Promise} The expected result is a JSON object
         */
        get: function(id) {return patients.get(self, id)},
        //anonymize: function() {//TODO},
        /**
         * Get a zipped archive containing the patient with the given id
         * @param {String} id Id of the targeted patient
         * @returns {Promise} The expected response is a Buffer
         */
        getArchive: function(id) {return patients.getArchive(self, id)},
        /**
         * Get all the instances of the patient with the given id
         * @param {String} id Id of the targeted patient
         * @returns {Promise} The expected response is an array of JSON objects
         */
        getInstances: function(id) {return patients.getInstances(self, id)},
        /**
         * Get a zipped archive containing the patient with the given id for media storage with DICOMDIR
         * @param {String} id Id of the targeted patient
         * @returns {Promise} The expected response is a Buffer
         */
        getMedia: function(id) {return patients.getMedia(self, id)},
        //modify: function() {//TODO},
        /**
         * @todo Improve the documentation of this function
         * @param {String} id Id of the targeted patient
         * @param {Boolean} [simplify=false]
         * @returns {Promise} The expected response is a JSON object
         */
        getModule: function(id, simplify) {return patients.getModule(self, id, simplify)},
        /**
         * Get the protection against recycling status
         * @param {String} id Id of the targeted patient
         * @returns {Promise} The expected result is a Boolean
         */
        getProtected: function(id) {return patients.getProtected(self, id)},
        /**
         * Set the protection against recycling status
         * @param {String} id Id of the targeted patient
         * @param {Boolean} protect Specify whether or not the patient should be protected against recycling
         * @returns {Promise} The expected response is empty
         */
        setProtected: function(id, protect) {return patients.setProtected(self, id, protect)},
        /**
         * Get all the series of the patient with the given id
         * @param {String} id Id of the targeted patient
         * @returns {Promise} The expected result is an array of JSON objects
         */
        getSeries: function(id) {return patients.getSeries(self, id)},
        /**
         * Get the shared tags of the patient with the given id
         * @param {String} id Id of the targeted patient
         * @param {Boolean} [simplify=false]
         * @returns {Promise} The expected response is a JSON object
         */
        getSharedTags: function(id, simplify) {return patients.getSharedTags(self, id, simplify)},
        /**
         * Get some general informations about the patient with the given id
         * @param {String} id Id of the targeted patient
         * @returns {Promise} The expected response is a JSON object
         */
        getStatistics: function(id) {return patients.getStatistics(self, id)},
        /**
         * Get all the studies of the patient with the given id
         * @param {String} id Id of the targeted patient
         * @returns {Promise} The expected response is an array of JSON objects
         */
        getStudies: function(id) {return patients.getStudies(self, id)}
    };
    /**
     * Tools operations
     */
    this.tools = {
        /**
         * Returns the current datetime in the ISO 8601 format
         * @returns {Promise} The expected response is a String
         */
        now: function() {return tools.now(self)},
        /**
         * Hot restart of Orthanc, the configuration file will be read again
         * @returns {Promise} The expected response is an empty JSON object
         */
        reset: function() {return tools.reset(self)},
        /**
         * Map DICOM UIDs to Orthanc identifiers
         * @param {UUID} uuid UUID which will be used to perform the lookup
         * @returns {Promise} The expected result is an array containing a JSON object
         */
        lookup: function(uuid) {return tools.lookup(self, uuid)},
        /**
         * DICOM conformance statement of this version of Orthanc
         * @returns {Promise} The expected result is a String
         */
        dicomConformance: function() {return tools.dicomConformance(self)},
        /**
         * Generates an UUID
         * @param {String} level argument among "patient", "study", "series" and "instance"
         * @returns {Promise} The expected result is a String
         */
        generateUid: function(level) {return tools.generateUid(self, level)}
        //executeScript: function() {//TODO},
        //createDicom: function() {//TODO},
    };
    /**
     * System operations
     */
    this.system = {
        /**
         * Get some information about the Orthanc Server
         * @returns {Promise} The expected response is a JSON object
         */
        system: function() {return system.system(self)}
    };
    /**
     * Operations over changes logs
     */
    this.changes = {
        /**
         * Get changes logs
         * @param {Object} [params] last, "limit" and "since" arguments
         * @param {Boolean} [params.last=false] Specify whether or not only the last change should be returned
         * @param {Integer} [params.since=0] Set the sequence number since which changes should be returned
         * @param {Integer} [params.limit=100] Set the returned changes limit. Default and maximum values are the same : 100
         * @returns {Promise} The expected response is a JSON object
         */
        getChanges: function(params) {return changes.getChanges(self, params)},
        /**
         * Delete changes logs
         * @returns {Promise} The expected response is empty
         */
        deleteChanges: function() {return changes.deleteChanges(self)}
    };
    /**
     * Operations over exports logs
     */
    this.exports = {
        /**
         * Get exports logs. For medical traceability, Orthanc stores a log of all the resources that have been exported to remote modalities.
         * @param {Object} [params] last, "limit" and "since" arguments
         * @param {Boolean} [params.last=false] Specify whether or not only the last export should be returned
         * @param {Integer} [params.since=0] Set the sequence number since which exports should be returned
         * @param {Integer} [params.limit=100] Set the returned exports limit. Default and maximum values are the same : 100
         * @returns {Promise} The expected response is a JSON object
         */
        getExports: function(params) {return exports.getExports(self, params)},
        /**
         * Delete exports logs
         * @returns {Promise} The expected response is empty
         */
        deleteExports: function() {return exports.deleteExports(self)}
    };

    this.statistics = {
        //getStatistics: function() {//TODO}
    };
    this.plugins = {
        //getAll: function() {//TODO},
        //get: function(id) {//TODO},
        //getExplorerJs: function() {//TODO}
    };
    this.peers = {
      //getAll: function() {//TODO},
      //getPeer: function() {//TODO},
      //deletePeer: function() {//TODO},
      //addPeer: function() {//TODO}
    };
    this.modalities = {
        //getAll: function() {//TODO},
        //get: function() {//TODO},
        //delete: function() {//TODO},
        //add: function() {//TODO},
        //echo: function() {//TODO},
        //find: function() {//TODO},
        //findPatient: function() {//TODO},
        //findSeries: function() {//TODO},
        //findStudy: function() {//TODO},
        //store: function() {//TODO}
    }
};

module.exports = Client;
