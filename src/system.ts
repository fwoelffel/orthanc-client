import {Client} from './client';
import {handleError} from "./errors";

export const system = (client: Client): Promise<any> => {
  return client.axios.get('/system')
    .then(res => res.data)
    .catch(handleError);
};