import {Client} from "./client";
import {handleError} from "./errors";

export const now = (client: Client): Promise<string> => {
  return client.axios.get('/tools/now')
    .then(res => res.data)
    .catch(handleError);
};

export const reset = (client: Client): Promise<any> => {
  return client.axios.post('/tools/reset')
    .then(res => res.data)
    .catch(handleError);
};

export const lookup = (client: Client, uuid: string): Promise<any> => {
  const data = new FormData();
  data.append('UUID', uuid);
  return client.axios.post('/tools/lookup', data)
    .then(res => res.data)
    .catch(handleError);
};

export const dicomConformance = (client: Client): Promise<string> => {
  return client.axios.get('/tools/dicom-conformance')
    .then(res => res.data)
    .catch(handleError);
};

export const generateUid = (client: Client, level: string): Promise<string> => {
  return client.axios.get('/tools/generate-uid', { params: { level } })
    .then(res => res.data)
    .catch(handleError);
};