import {Client} from "./client";
import {handleError} from "./errors";

export const getAll = (client: Client): Promise<string[]> => {
  return client.axios.get('/queries')
    .then(res => res.data)
    .catch(handleError);
};

export const get = (client: Client, id: string): Promise<any> => {
  return client.axios.get(`/queries/${id}`)
    .then(res => res.data)
    .catch(handleError);
};

export const remove = (client: Client, id: string): Promise<any> => {
  return client.axios.delete(`/queries/${id}`)
    .then(res => res.data)
    .catch(handleError);
};

export const answers = (client: Client, id: string): Promise<number[]> => {
  return client.axios.get(`/queries/${id}/answers`)
    .then(res => res.data)
    .catch(handleError);
};

export const answerContent = (client: Client, id: string, index: number, simplify: boolean = false): Promise<any> => {
  return client.axios.get(`/queries/${id}/answers/${index}/content${simplify ? '?simplify' : ''}`)
    .then(res => res.data)
    .catch(handleError);
};

export const answerRetrieve = (client: Client, id: string, index: number, aet: string): Promise<any> => {
  const data = new FormData();
  data.append('AET', aet);
  return client.axios.post(`/queries/${id}/answers/${index}/retrieve`, data)
    .then(res => res.data)
    .catch(handleError);
};

export const getLevel = (client: Client, id: string): Promise<string> => {
  return client.axios.get(`/queries/${id}/level`)
    .then(res => res.data)
    .catch(handleError);
};

export const getModality = (client: Client, id: string): Promise<string> => {
  return client.axios.get(`/queries/${id}/modality`)
    .then(res => res.data)
    .catch(handleError);
};

export const getQuery = (client: Client, id: string, simplify: boolean = false): Promise<any> => {
  return client.axios.get(`/queries/${id}/query${simplify ? '?simplify' : ''}`)
    .then(res => res.data)
    .catch(handleError);
};

export const retrieve = (client: Client, id: string, aet: string): Promise<any> => {
  const data = new FormData();
  data.append('AET', aet);
  return client.axios.post(`/queries/${id}/retrieve`, data)
    .then(res => res.data)
    .catch(handleError);
};