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
 * @param {Object} param.auth
 * @param {String} param.auth.username Valid Orthanc Server username
 * @param {String} param.auth.password Valide Orthanc Server password
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
    this.auth = {
      username: (param.auth!==undefined && typeof param.auth === 'object' && typeof param.auth.username === 'string' ? param.auth.username : ''),
      password: (param.auth!==undefined && typeof param.auth === 'object' && typeof param.auth.password === 'string' ? param.auth.password : '')
    };

    /**
     * @see Instances
     */
    this.instances = {
        getAll: function() {return instances.getAll(self)},
        get: function(id) {return instances.get(self, id)},
        //anonymize: function() {//TODO},
        getContent: function(id, group, element, index) {return instances.getContent(self, id, group, element, index)},
        export: function(id) {return instances.export(self, id)},
        getFile: function(id) {return instances.getFile(self, id)},
        getAllFrames: function(id) {return instances.getAllFrames(self, id)},
        getFrame: function(id, frameNumber, frameFormat) {return instances.getFrame(self, id, frameNumber, frameFormat)},
        getImage: function(id, imageFormat) {return instances.getImage(self, id, imageFormat)},
        //modify: function(id) {//TODO},
        getModule: function(id, simplify) {return instances.getModule(self, id, simplify)},
        getPatient: function(id) {return instances.getPatient(self, id)},
        getSeries: function(id) {return instances.getSeries(self, id)},
        getTags: function(id, simplify) {return instances.getTags(self, id, simplify)},
        getStatistics: function(id) {return instances.getStatistics(self, id)},
        getStudy: function(id) {return instances.getStudy(self, id)}
    };
    /**
     * @see Series
     */
    this.series = {
        getAll: function() {return series.getAll(self)},
        get: function(id) {return series.get(self, id)},
        //anonymize: function() {//TODO},
        getArchive: function(id) {return series.getArchive(self, id)},
        getInstances: function(id) {return series.getInstances(self, id)},
        getMedia: function(id) {return series.getMedia(self, id)},
        //modify: function() {//TODO},
        getModule: function(id, simplify) {return series.getModule(self, id, simplify)},
        getPatient: function(id) {return series.getPatient(self, id)},
        getSharedTags: function(id, simplify) {return series.getSharedTags(self, id, simplify)},
        getStatistics: function(id) {return series.getStatistics(self, id)},
        getStudy: function(id) {return series.getStudy(self, id)}
    };
    /**
     * @see Studies
     */
    this.studies = {
        getAll: function() {return studies.getAll(self)},
        get: function(id) {return studies.get(self, id)},
        //anonymize: function() {//TODO},
        getArchive: function(id) {return studies.getArchive(self, id)},
        getInstances: function(id) {return studies.getInstances(self, id)},
        getMedia: function(id) {return studies.getMedia(self, id)},
        //modify: function() {//TODO},
        getModule: function(id, simplify) {return studies.getModule(self, id, simplify)},
        getModulePatient: function(id, simplify) {return studies.getModulePatient(self, id, simplify)},
        getPatient: function(id) {return studies.getPatient(self, id)},
        getSeries: function(id) {return studies.getSeries(self, id)},
        getSharedTags: function(id, simplify) {return studies.getSharedTags(self, id, simplify)},
        getStatistics: function(id) {return studies.getStatistics(self, id)}
    };
    /**
     * @see Patients
     */
    this.patients = {
        getAll: function() {return patients.getAll(self)},
        get: function(id) {return patients.get(self, id)},
        //anonymize: function() {//TODO},
        getArchive: function(id) {return patients.getArchive(self, id)},
        getInstances: function(id) {return patients.getInstances(self, id)},
        getMedia: function(id) {return patients.getMedia(self, id)},
        //modify: function() {//TODO},
        getModule: function(id, simplify) {return patients.getModule(self, id, simplify)},
        getProtected: function(id) {return patients.getProtected(self, id)},
        setProtected: function(id, protected) {return patients.setProtected(self, id, protected)},
        getSeries: function(id) {return patients.getSeries(self, id)},
        getSharedTags: function(id, simplify) {return patients.getSharedTags(self, id, simplify)},
        getStatistics: function(id) {return patients.getStatistics(self, id)},
        getStudies: function(id) {return patients.getStudies(self, id)}
    };
    /**
     * @see Tools
     */
    this.tools = {
        now: function() {return tools.now(self)},
        reset: function() {return tools.reset(self)},
        lookup: function(uuid) {return tools.lookup(self, uuid)},
        dicomConformance: function() {return tools.dicomConformance(self)},
        generateUid: function(level) {return tools.generateUid(self, level)},
        //executeScript: function() {//TODO},
        //createDicom: function() {//TODO},
    };
    /**
     * @see System
     */
    this.system = {
        system: function() {return system.system(self)}
    };
    /**
     * @see Changes
     */
    this.changes = {
        getChanges: function(params) {return changes.getChanges(self, params)},
        deleteChanges: function() {return changes.deleteChanges(self)}
    };
    /**
     * @see Exports
     */
    this.exports = {
        getExports: function(params) {return exports.getExports(self, params)},
        deleteExports: function() {return exports.deleteExports(self)}
    };
    /**
     * @see Statistics
     */
    this.statistics = {
        //getStatistics: function() {//TODO}
    };
    /**
     * @see Plugins
     */
    this.plugins = {
        //getAll: function() {//TODO},
        //get: function(id) {//TODO},
        //getExplorerJs: function() {//TODO}
    };
    /**
     * @see Peers
     */
    this.peers = {
      //getAll: function() {//TODO},
      //getPeer: function() {//TODO},
      //deletePeer: function() {//TODO},
      //addPeer: function() {//TODO}
    };
    /**
     * @see Modalities
     */
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
}

module.exports = Client;
