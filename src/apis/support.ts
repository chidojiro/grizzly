import { Client, SearchResponse } from '@sajari/sdk-js/dist/index';
import { defaultTracking } from 'consts';

const collection = 'grizzly-support';
const project = '1623269058042651642';

const client = new Client(project, collection);
const queryPipeline = client.pipeline('website');

const get = (q: string): Promise<[SearchResponse, Record<string, string>]> => {
  return queryPipeline.search(
    {
      fields: '',
      q,
      resultsPerPage: '5',
      page: '1',
      buckets: '',
      count: '',
      countFilters: '',
      filter: '',
      max: '',
      min: '',
    },
    defaultTracking
  );
};

export const SupportApis = { get };
