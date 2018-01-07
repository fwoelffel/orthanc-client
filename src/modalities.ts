import {Client} from "./client";
import {handleError} from "./errors";

export const getAll = (client: Client): Promise<string[]> => {
  return client.axios.get('/modalities')
    .then(res => res.data)
    .catch(handleError);
};

export const get = (client: Client, id: string): Promise<any> => {
  return client.axios.get(`/modalities/${id}`)
    .then(res => res.data)
    .catch(handleError);
};

export const add = (client: Client, id: string, params: {aet: string, ip: string, port: string | number}): Promise<any> => {
  return client.axios.put(`/modalities/${id}`, params)
    .then(res => res.data)
    .catch(handleError);
};

export const remove = (client: Client, id: string): Promise<any> => {
  return client.axios.delete(`/modalities/${id}`)
    .then(res => res.data)
    .catch(handleError);
};

export const echo = (client: Client, id: string): Promise<any> => {
  return client.axios.post(`/modalities/${id}/echo`)
    .then(res => res.data)
    .catch(handleError);
};

export const query = (client: Client, id: string, query: any): Promise<any> => {
  return client.axios.post(`/modalities/${id}/query`, query)
    .then(res => res.data)
    .catch(handleError);
};
