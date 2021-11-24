import { SearchQueryRequestPayload } from './../types/search';
import axios from 'axios';

const get = (payload: SearchQueryRequestPayload) => {
  return axios.post('https://jsonapi.sajari.net/sajari.api.pipeline.v1.Query/Search', payload).then(({ data }) => data);
};

const AutocompleteApis = { get };

export default AutocompleteApis;
