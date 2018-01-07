import {Client} from "./client";
import {handleError} from "./errors";

export const getExports = (client: Client, params?: {last: boolean , since: number , limit: number}): Promise<any> => {
  const qp:any = {};
  if (params.last) {
    qp.last = params.last;
  }
  else {
    qp.since = params.since ? params.since : 0;
    qp.limit = params.limit ? params.limit : 100;
  }
  return client.axios.get(`/exports`, { params: qp })
    .then(res => res.data)
    .catch(handleError);
};

export const deleteExports = (client: Client): Promise<null> => {
  return client.axios.delete('/orthancExports')
    .then(() => null)
    .catch(handleError);
};