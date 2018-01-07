import {Client} from "./client";
import {handleError} from "./errors";

export const getAll = (client: Client): Promise<string[]> => {
  return client.axios.get<string[]>('/instances')
    .then(res => res.data)
    .catch(handleError);
};

export const get = (client: Client, id: string): Promise<any> => {
  return client.axios.get<any>(`/instances/${id}`)
    .then(res => res.data)
    .catch(handleError);
};

export const add = (client: Client, buffer: any): Promise<any> => {
  return client.axios.post('/instances', buffer)
    .then(res => res.data)
    .catch(handleError);
};

export const getContent = (client: Client, id: string, group?: string, element?: string, index?: number): Promise<string[] | string> => {
  let url = `/instances/${id}/content`;
  if ('string' === typeof group && 'string' === typeof element) {
    url = `${url}/${group}-${element}`;
    if (Number.isInteger(index)) {
      url = `${url}/${index}`;
    }
  }
  return client.axios.get(url)
    .then(res => res.data)
    .catch(handleError);
};

export const exportInstance = (client: Client, id: string): Promise<any> => {
  const data = new FormData();
  data.append('file', `${id}.dcm`);
  return client.axios.post(`/instances/${id}/export`, data)
    .then(res => res.data)
    .catch(handleError);
};

/**
 * @todo Test the response handling
 */
export const getFile = (client: Client, id: string): Promise<any> => {
  return client.axios.get(`/instances/${id}/file`)
    .then(res => res.data)
    .catch(handleError);
};

export const getAllFrames = (client: Client, id: string): Promise<number[]> => {
  return client.axios.get(`/instances/${id}/frames`)
    .then(res => res.data)
    .catch(handleError);
};

/**
 * @todo Test the response handling
 */
export const getFrame = (client: Client, id: string, frameNumber: number, frameFormat: string = 'preview'): Promise<any> => {
  return client.axios.get(`/instances/${id}/frames/${frameNumber}/${frameFormat}`)
    .then(res => res.data)
    .catch(handleError);
};

/**
 * @todo Test the response handling
 */
export const getImage = (client: Client, id: string, imageFormat: string = 'preview'): Promise<any> => {
  return client.axios.get(`/instances/${id}/${imageFormat}`)
    .then(res => res.data)
    .catch(handleError);
};

export const getModule = (client: Client, id: string, simplify: boolean = false): Promise<any> => {
  return client.axios.get(`/instances/${id}/module${simplify ? '?simplify': ''}`)
    .then(res => res.data)
    .catch(handleError);
};

export const getPatient = (client: Client, id: string): Promise<any> => {
  return client.axios.get(`/instances/${id}/patient`)
    .then(res => res.data)
    .catch(handleError);
};

export const getSeries = (client: Client, id: string): Promise<any> => {
  return client.axios.get(`/instances/${id}/series`)
    .then(res => res.data)
    .catch(handleError);
};

export const getTags = (client: Client, id: string, simplify: boolean = false): Promise<any> => {
  return client.axios.get(`/instances/${id}/tags${simplify ? '?simplify': ''}`)
    .then(res => res.data)
    .catch(handleError);
};

export const getStatistics = (client: Client, id: string): Promise<any> => {
  return client.axios.get(`/instances/${id}/statistics`)
    .then(res => res.data)
    .catch(handleError);
};

export const getStudy = (client: Client, id: string): Promise<any> => {
  return client.axios.get(`/instances/${id}/study`)
    .then(res => res.data)
    .catch(handleError);
};

// TODO
// const anonymize = (client: Client, id: string): Promise<any> => {}
// const modify = (client: Client, id: string): Promise<any> => {}