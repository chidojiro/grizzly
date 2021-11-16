import {
  SearchQueryRequestPayload,
  SearchAutoCompleteRequestPayload,
  SearchQueryResponsePayload,
  SearchAutoCompleteResponsePayload,
} from 'types';
import axios from 'axios';

const get = (payload: SearchQueryRequestPayload): Promise<SearchQueryResponsePayload> => {
  return axios.post('http://jsonapi.sajari.net/sajari.api.pipeline.v1.Query/Search', payload).then(({ data }) => data);
};

const getSuggestions = (payload: SearchAutoCompleteRequestPayload): Promise<SearchAutoCompleteResponsePayload> => {
  return axios.post('http://jsonapi.sajari.net/sajari.api.pipeline.v1.Query/Search', payload).then(({ data }) => data);
};

export const SearchApis = { get, getSuggestions };
