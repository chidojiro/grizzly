import {
  SearchQueryRequestPayload,
  SearchAutoCompleteRequestPayload,
  SearchQueryResponsePayload,
  SearchAutoCompleteResponsePayload,
  FilterInfo,
} from 'types';
import axios from 'axios';
import { Price } from 'components/Main/Results/Item/Price';

const get = (payload: SearchQueryRequestPayload): Promise<SearchQueryResponsePayload> => {
  return axios.post('http://jsonapi.sajari.net/sajari.api.pipeline.v1.Query/Search', payload).then(({ data }) => data);
};

const getSuggestions = (payload: SearchAutoCompleteRequestPayload): Promise<SearchAutoCompleteResponsePayload> => {
  return axios.post('http://jsonapi.sajari.net/sajari.api.pipeline.v1.Query/Search', payload).then(({ data }) => data);
};

const getPriceFilterInfo = async (payload: SearchQueryRequestPayload) => {
  const data = await SearchApis.get(payload);

  const buckets = (data?.searchResponse?.aggregateFilters?.count as any)?.buckets?.buckets;

  if (!buckets)
    return {
      label: 'Price',
      name: 'price',
      options: [],
    } as FilterInfo;

  const ranges = Object.keys(buckets)
    .map(key => {
      const [, rangeString] = key.split('_');

      if (!buckets[key]?.count) return [];

      return rangeString.split('-');
    })
    .filter(v => v.length)
    .sort((a, b) => +a[0] - +b[0]);

  const options = ranges.map(range => {
    const [from, to] = range;

    return {
      label: (
        <span>
          <Price price={+from} />
          {to === '*' ? (
            '+'
          ) : (
            <span>
              {' '}
              to <Price price={+to} />
            </span>
          )}
        </span>
      ),
      value: `[${from.includes('.') ? from : from + '.00'} TO ${to}]`,
    };
  });

  return {
    label: 'Price',
    name: 'price',
    options,
  } as FilterInfo;
};

export const SearchApis = { get, getSuggestions, getPriceFilterInfo };
