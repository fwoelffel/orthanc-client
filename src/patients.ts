import {Client} from "./client";
import {handleError} from "./errors";

export const getAll = (client: Client): Promise<string[]> => {
  return client.axios.get('/patients')
    .then(res => res.data)
    .catch(handleError);
};

export const get = (client: Client, id: string): Promise<any> => {
  return client.axios.get(`/patients/${id}`)
    .then(res => res.data)
    .catch(handleError);
};

export const getArchive = (client: Client, id: string): Promise<any> => {
  return client.axios.get(`/patients/${id}/archive`)
    .then(res => res.data)
    .catch(handleError);
};

export const getInstances = (client: Client, id: string): Promise<any[]> => {
  return client.axios.get(`/patients/${id}/instances`)
    .then(res => res.data)
    .catch(handleError);
};

export const getMedia = (client: Client, id: string): Promise<any> => {
  return client.axios.get(`/patients/${id}/media`)
    .then(res => res.data)
    .catch(handleError);
};

export const getModule = (client: Client, id: string, simplify: boolean = false): Promise<any> => {
  return client.axios.get(`/patients/${id}/module${simplify ? '?simplify' : ''}`)
    .then(res => res.data)
    .catch(handleError);
};

export const getProtected = (client: Client, id: string): Promise<boolean> => {
  return client.axios.get(`/patients/${id}/protected`)
    .then(res => res.data)
    .catch(handleError);
};

export const setProtected = (client: Client, id: string, protect: boolean): Promise<null> => {
  const data = new FormData();
  data.append('protect', protect ? '1' : '0');
  return client.axios.put(`/patients/${id}/protected`, data)
    .then(() => null)
    .catch(handleError);
};

export const getSeries = (client: Client, id: string): Promise<any[]> => {
  return client.axios.get(`/patients/${id}/series`)
    .then(res => res.data)
    .catch(handleError);
};

export const getSharedTags = (client: Client, id: string, simplify: boolean = false): Promise<any> => {
  return client.axios.get(`/patients/${id}/shared-tags${simplify ? '?simplify' : ''}`)
    .then(res => res.data)
    .catch(handleError);
};

export const getStatistics = (client: Client, id: string): Promise<any> => {
  return client.axios.get(`/patients/${id}/statistics`)
    .then(res => res.data)
    .catch(handleError);
};

export const getStudies = (client: Client, id: string): Promise<any[]> => {
  return client.axios.get(`/patients/${id}/studies`)
    .then(res => res.data)
    .catch(handleError);
};

// export const anonymize = (client: Client): Promise<any> => {};

// export const modify = (client: Client): Promise<any> => {};