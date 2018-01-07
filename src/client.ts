import * as Axios from 'axios';
import * as instances from './instances';
import * as changes from "./changes";
import * as orthancExports from "./exports";
import * as system from "./system";
import * as statistics from "./statistics";
import * as tools from "./tools";
import * as modalities from "./modalities";
import * as patients from "./patients";
import * as queries from "./queries";
import * as series from "./series";
import * as studies from "./studies";

export interface BasicAuthInterface {
  user: string;
  pass: string;
}

export interface ClientParamsInterface {
  url?: string;
  auth?: BasicAuthInterface
}

export class Client {

  private url: string;
  private auth: BasicAuthInterface | null;
  private axiosInstance: Axios.AxiosInstance;

  constructor (params: ClientParamsInterface = {}) {
    this.url = params.hasOwnProperty('url') ? params.url : 'http://localhost:8042';
    this.auth = params.hasOwnProperty('auth') ? params.auth : null;
    this.axiosInstance = Axios.default.create({
      baseURL: this.url,
      auth: this.auth ? {
        username: this.auth.user,
        password: this.auth.pass
      } : null
    });
  }

  get axios (): Axios.AxiosInstance {
    return this.axiosInstance;
  }

  get instances () {
    return {
      getAll: () => instances.getAll(this),
      get: (id: string) => instances.get(this, id),
      add: (buffer: any) => instances.add(this, buffer),
      getContent: (id, group, element, index) => instances.getContent(this, id, group, element, index),
      export: (id) => instances.exportInstance(this, id),
      getFile: (id) => instances.getFile(this, id),
      getAllFrames: (id) => instances.getAllFrames(this, id),
      getFrame: (id, frameNumber, frameFormat) => instances.getFrame(this, id, frameNumber, frameFormat),
      getImage: (id, imageFormat) => instances.getImage(this, id, imageFormat),
      getModule: (id, simplify) => instances.getModule(this, id, simplify),
      getPatient: (id) => instances.getPatient(this, id),
      getSeries: (id) => instances.getSeries(this, id),
      getTags: (id, simplify) => instances.getTags(this, id, simplify),
      getStatistics: (id) => instances.getStatistics(this, id),
      getStudy: (id) => instances.getStatistics(this, id)
    };
  }

  get changes () {
    return {
      getChanges: () => changes.getChanges(this)
    };
  }

  get exports () {
    return {
      getExports: (params) => orthancExports.getExports(this, params),
      deleteExports: () => orthancExports.deleteExports(this)
    };
  }

  get system () {
    return {
      system: () => system.system(this)
    };
  }

  get statistics () {
    return {
      getStatistics: () => statistics.getStatistics(this)
    };
  }

  get tools () {
    return {
      now: () => tools.now(this),
      reset: () => tools.reset(this),
      lookup: (uuid) => tools.lookup(this, uuid),
      dicomConformance: () => tools.dicomConformance(this),
      generateUid: (level) => tools.generateUid(this, level)
    };
  }

  get modalities () {
    return  {
      getAll: () => modalities.getAll(this),
      get: (id) => modalities.get(this, id),
      add: (id, params) => modalities.add(this, id, params),
      remove: (id) => modalities.remove(this, id),
      echo: (id) => modalities.echo(this, id),
      query: (id, query) => modalities.query(this, id, query)
    };
  }

  get patients () {
    return {
      getAll: () => patients.getAll(this),
      get: (id) => patients.get(this, id),
      getArchive: (id) => patients.getArchive(this, id),
      getInstances: (id) => patients.getInstances(this, id),
      getMedia: (id) => patients.getMedia(this, id),
      getModule: (id, simplify) => patients.getModule(this, id, simplify),
      getProtected: (id) => patients.getProtected(this, id),
      setProtected: (id, protect) => patients.setProtected(this, id, protect),
      getSeries: (id) => patients.getSeries(this, id),
      getSharedTags: (id, simplify) => patients.getSharedTags(this, id, simplify),
      getStatistics: (id) => patients.getStatistics(this, id),
      getStudies: (id) => patients.getStudies(this, id)
    };
  }

  get queries () {
    return {
      getAll: () => queries.getAll(this),
      get: (id) => queries.get(this, id),
      remove: (id) => queries.remove(this, id),
      answers: (id) => queries.answers(this, id),
      answerContent: (id, index, simplify) => queries.answerContent(this, id, index, simplify),
      answerRetrieve: (id, index, aet) => queries.answerRetrieve(this, id, index, aet),
      getLevel: (id) => queries.getLevel(this, id),
      getModality: (id) => queries.getModality(this, id),
      getQuery: (id, simplify) => queries.getQuery(this, id, simplify),
      retrieve: (id, aet) => queries.retrieve(this, id, aet)
    };
  }

  get series () {
    return {
      getAll: () => series.getAll(this),
      get: (id) => series.get(this, id),
      getArchive: (id) => series.getArchive(this, id),
      getInstances: (id) => series.getInstances(this, id),
      getMedia: (id) => series.getMedia(this, id),
      getModule: (id, simplify) => series.getModule(this, id, simplify),
      getPatient: (id) => series.getPatient(this, id),
      getSharedTags: (id, simplify) => series.getSharedTags(this, id, simplify),
      getStatistics: (id) => series.getStatistics(this, id),
      getStudy: (id) => series.getStudy(this, id)
    };
  }

  get studies () {
    return {
      getAll: () => studies.getAll(this),
      get: (id) => studies.get(this, id),
      getArchive: (id) => studies.getArchive(this, id),
      getInstances: (id) => studies.getInstances(this, id),
      getMedia: (id) => studies.getMedia(this, id),
      getModule: (id, simplify) => studies.getModule(this, id, simplify),
      getModulePatient: (id, simplify) => studies.getModulePatient(this, id, simplify),
      getPatient: (id) => studies.getPatient(this, id),
      getSeries: (id) => studies.getSeries(this, id),
      getSharedTags: (id, simplify) => studies.getSharedTags(this, id, simplify),
      getStatistics: (id) => studies.getStatistics(this, id)
    };
  }

}