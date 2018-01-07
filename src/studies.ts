import {Client} from "./client";
import {handleError} from "./errors";

export const getAll = (client: Client): Promise<string[]> => {
  return client.axios.get('/studies')
    .then(res => res.data)
    .catch(handleError);
};

export const get = (client: Client, id: string): Promise<any> => {
  return client.axios.get(`/studies/${id}`)
    .then(res => res.data)
    .catch(handleError);
};

export const getArchive = (client: Client, id: string): Promise<any> => {
  return client.axios.get(`/studies/${id}/archive`)
    .then(res => res.data)
    .catch(handleError);
};

export const getInstances = (client: Client, id: string): Promise<any[]> => {
  return client.axios.get(`/studies/${id}/instances`)
    .then(res => res.data)
    .catch(handleError);
};

export const getMedia= (client: Client, id: string): Promise<any> => {
  return client.axios.get(`/studies/${id}/media`)
    .then(res => res.data)
    .catch(handleError);
};

export const getModule = (client: Client, id: string, simplify: boolean = false): Promise<any> => {
  return client.axios.get(`/studies/${id}/module${simplify ? '?simplify' : ''}`)
    .then(res => res.data)
    .catch(handleError);
};

export const getModulePatient= (client: Client, id: string, simplify: boolean = false): Promise<any> => {
  return client.axios.get(`/studies/${id}/module-patient${simplify ? '?simplify' : ''}`)
    .then(res => res.data)
    .catch(handleError);
};

export const getPatient = (client: Client, id: string): Promise<any> => {
  return client.axios.get(`/studies/${id}/patient`)
    .then(res => res.data)
    .catch(handleError);
};

export const getSeries = (client: Client, id: string): Promise<any[]> => {
  return client.axios.get(`/studies/${id}/series`)
    .then(res => res.data)
    .catch(handleError);
};

export const getSharedTags = (client: Client, id: string, simplify: boolean = false): Promise<any> => {
  return client.axios.get(`/studies/${id}/shared-tags${simplify ? '?simplify' : ''}`)
    .then(res => res.data)
    .catch(handleError);
};

export const getStatistics = (client: Client, id: string): Promise<any> => {
  return client.axios.get(`/studies/${id}/statistics`)
    .then(res => res.data)
    .catch(handleError);
};

// export const anonymize = (client: Client) => Promise<any> => {};
// export const modify = (client: Client) => Promise<any> => {};