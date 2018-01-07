import {Client} from "./client";
import {handleError} from "./errors";

export const getStatistics = (client: Client): Promise<any> => {
  return client.axios.get('/statistics')
    .then(res => res.data)
    .catch(handleError);
};